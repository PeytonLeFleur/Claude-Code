import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'
import { SEVEN_TWO_BONUS_CENTS } from '@/lib/domain/money'
import type { NightSeat } from '@/lib/supabase/types'

export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const action = body?.action
  const sb = createServiceClient()

  if (action === 'open') {
    const nightId = body?.nightId
    if (!nightId) return Response.json({ error: 'nightId required' }, { status: 400 })

    const { data: night, error: nErr } = await sb
      .from('nights')
      .select('id, dealer_seat, hand_counter')
      .eq('id', nightId)
      .single()
    if (nErr) return Response.json({ error: nErr.message }, { status: 500 })

    const { data: seatData, error: sErr } = await sb
      .from('night_seats')
      .select('*')
      .eq('night_id', nightId)
      .order('seat')
    if (sErr) return Response.json({ error: sErr.message }, { status: 500 })
    const seats = (seatData ?? []) as NightSeat[]
    if (seats.length === 0) return Response.json({ error: 'no players seated' }, { status: 400 })

    const handNo = night.hand_counter + 1
    const dealerSeat = night.dealer_seat ?? seats[0].seat
    const dealerIdx = Math.max(0, seats.findIndex((s) => s.seat === dealerSeat))
    const nextDealer = seats[(dealerIdx + 1) % seats.length].seat

    const { data: hand, error: hErr } = await sb
      .from('hands')
      .insert({ night_id: nightId, hand_no: handNo, dealer_seat: dealerSeat, status: 'open' })
      .select('*')
      .single()
    if (hErr) return Response.json({ error: hErr.message }, { status: 500 })

    const handPlayers = seats.map((s) => ({
      hand_id: hand.id,
      player_id: s.player_id,
      seat: s.seat,
      dealt_in: true,
      is_winner: false,
    }))
    const { error: hpErr } = await sb.from('hand_players').insert(handPlayers)
    if (hpErr) return Response.json({ error: hpErr.message }, { status: 500 })

    await sb.from('nights').update({ hand_counter: handNo, dealer_seat: nextDealer }).eq('id', nightId)
    await logEvent(sb, { night_id: nightId, hand_id: hand.id, type: EVENT_TYPES.HAND_OPENED, payload: { handNo } })
    return Response.json({ hand })
  }

  if (action === 'result') {
    const handId = body?.handId
    const winnerPlayerId = body?.winnerPlayerId ?? null
    const potCents = Number.isInteger(body?.potCents) ? body.potCents : null
    const sevenTwo = body?.sevenTwo === true
    const foldedIds: string[] = Array.isArray(body?.foldedPlayerIds) ? body.foldedPlayerIds : []
    if (!handId) return Response.json({ error: 'handId required' }, { status: 400 })

    const { data: hand, error: getErr } = await sb
      .from('hands')
      .select('id, night_id')
      .eq('id', handId)
      .single()
    if (getErr) return Response.json({ error: getErr.message }, { status: 500 })

    // Close + verify the hand (Phase 0 records the final result in one step).
    const { error: updErr } = await sb
      .from('hands')
      .update({
        status: 'closed',
        verified: true,
        pot_cents: potCents,
        winner_player_id: winnerPlayerId,
        seven_two: sevenTwo,
        closed_at: new Date().toISOString(),
      })
      .eq('id', handId)
    if (updErr) return Response.json({ error: updErr.message }, { status: 500 })

    // Fold flags: default everyone to not-folded, then mark the folders.
    await sb.from('hand_players').update({ folded: false }).eq('hand_id', handId)
    if (foldedIds.length > 0) {
      await sb.from('hand_players').update({ folded: true }).eq('hand_id', handId).in('player_id', foldedIds)
    }
    if (winnerPlayerId) {
      await sb.from('hand_players').update({ is_winner: true }).eq('hand_id', handId).eq('player_id', winnerPlayerId)
    }

    // 7-2: every other dealt-in player owes the winner 50c.
    if (sevenTwo && winnerPlayerId) {
      const { data: dealt } = await sb
        .from('hand_players')
        .select('player_id')
        .eq('hand_id', handId)
        .eq('dealt_in', true)
      const payers = (dealt ?? []).map((d) => d.player_id).filter((id: string) => id !== winnerPlayerId)
      if (payers.length > 0) {
        await sb.from('bonuses').insert(
          payers.map((payerId: string) => ({
            night_id: hand.night_id,
            hand_id: handId,
            winner_player_id: winnerPlayerId,
            payer_player_id: payerId,
            amount_cents: SEVEN_TWO_BONUS_CENTS,
          })),
        )
        await logEvent(sb, {
          night_id: hand.night_id,
          hand_id: handId,
          type: EVENT_TYPES.SEVEN_TWO_BONUS,
          payload: { winnerPlayerId, payers: payers.length },
        })
      }
    }

    await logEvent(sb, {
      night_id: hand.night_id,
      hand_id: handId,
      type: EVENT_TYPES.HAND_RESULT,
      payload: { winnerPlayerId, potCents, sevenTwo },
    })
    await logEvent(sb, { night_id: hand.night_id, hand_id: handId, type: EVENT_TYPES.HAND_VERIFIED, payload: {} })
    return Response.json({ ok: true })
  }

  return Response.json({ error: 'unknown action' }, { status: 400 })
}
