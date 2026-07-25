import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'

interface SeatInput {
  seat: number
  playerId?: string
  newName?: string
}

// Seats players for a night. Creates new players on the fly when `newName` is
// given, then replaces the night's seat map.
export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const nightId = body?.nightId
  const seats: SeatInput[] = Array.isArray(body?.seats) ? body.seats : []
  if (!nightId || seats.length === 0) {
    return Response.json({ error: 'nightId and seats required' }, { status: 400 })
  }

  const sb = createServiceClient()
  const rows: { night_id: string; seat: number; player_id: string }[] = []

  for (const s of seats) {
    let playerId = s.playerId
    if (!playerId && s.newName?.trim()) {
      const { data, error } = await sb
        .from('players')
        .insert({ display_name: s.newName.trim() })
        .select('id')
        .single()
      if (error) return Response.json({ error: error.message }, { status: 500 })
      playerId = data.id
    }
    if (!playerId) continue
    rows.push({ night_id: nightId, seat: s.seat, player_id: playerId })
  }

  // Replace the seat map for a clean reseat.
  const { error: delErr } = await sb.from('night_seats').delete().eq('night_id', nightId)
  if (delErr) return Response.json({ error: delErr.message }, { status: 500 })
  const { error: insErr } = await sb.from('night_seats').insert(rows)
  if (insErr) return Response.json({ error: insErr.message }, { status: 500 })

  await logEvent(sb, {
    night_id: nightId,
    type: EVENT_TYPES.PLAYERS_SEATED,
    payload: { count: rows.length },
  })
  return Response.json({ ok: true, seated: rows.length })
}
