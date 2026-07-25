import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'

// Chip-to-chip transfer between two players (settle-up moves, side bets, etc.).
export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const nightId = body?.nightId
  const fromPlayerId = body?.fromPlayerId ?? null
  const toPlayerId = body?.toPlayerId ?? null
  const amountCents = body?.amountCents
  if (!nightId || !Number.isInteger(amountCents) || amountCents <= 0) {
    return Response.json({ error: 'nightId and positive amountCents required' }, { status: 400 })
  }

  const sb = createServiceClient()
  const { error } = await sb.from('transfers').insert({
    night_id: nightId,
    kind: 'transfer',
    from_player_id: fromPlayerId,
    to_player_id: toPlayerId,
    amount_cents: amountCents,
    note: typeof body?.note === 'string' ? body.note : null,
  })
  if (error) return Response.json({ error: error.message }, { status: 500 })

  await logEvent(sb, {
    night_id: nightId,
    type: EVENT_TYPES.TRANSFER,
    payload: { fromPlayerId, toPlayerId, amountCents },
  })
  return Response.json({ ok: true })
}
