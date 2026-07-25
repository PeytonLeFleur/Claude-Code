import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'

export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const nightId = body?.nightId
  const playerId = body?.playerId
  const amountCents = body?.amountCents
  const kind = body?.kind === 'rebuy' ? 'rebuy' : 'buyin'
  if (!nightId || !playerId || !Number.isInteger(amountCents) || amountCents <= 0) {
    return Response.json({ error: 'nightId, playerId, positive amountCents required' }, { status: 400 })
  }

  const sb = createServiceClient()
  const { error } = await sb.from('transfers').insert({
    night_id: nightId,
    kind,
    from_player_id: null, // bank
    to_player_id: playerId,
    amount_cents: amountCents,
  })
  if (error) return Response.json({ error: error.message }, { status: 500 })

  await logEvent(sb, {
    night_id: nightId,
    type: kind === 'rebuy' ? EVENT_TYPES.REBUY : EVENT_TYPES.BUYIN,
    payload: { playerId, amountCents },
  })
  return Response.json({ ok: true })
}
