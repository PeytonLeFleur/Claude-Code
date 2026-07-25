import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'
import { ANTE_CENTS, DEFAULT_BUYIN_CENTS } from '@/lib/domain/money'

export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const action = body?.action

  const sb = createServiceClient()

  if (action === 'start') {
    const seasonId = body?.seasonId
    if (!seasonId) return Response.json({ error: 'seasonId required' }, { status: 400 })
    const { data, error } = await sb
      .from('nights')
      .insert({
        season_id: seasonId,
        label: typeof body?.label === 'string' ? body.label : null,
        status: 'live',
        revealed: false,
        ante_cents: Number.isInteger(body?.anteCents) ? body.anteCents : ANTE_CENTS,
        buyin_cents: Number.isInteger(body?.buyinCents) ? body.buyinCents : DEFAULT_BUYIN_CENTS,
        dealer_seat: 0,
        hand_counter: 0,
      })
      .select('*')
      .single()
    if (error) return Response.json({ error: error.message }, { status: 500 })
    await logEvent(sb, { night_id: data.id, type: EVENT_TYPES.NIGHT_STARTED, payload: { label: data.label } })
    return Response.json({ night: data })
  }

  if (action === 'reveal') {
    const nightId = body?.nightId
    if (!nightId) return Response.json({ error: 'nightId required' }, { status: 400 })
    const { data, error } = await sb
      .from('nights')
      .update({ revealed: true, status: 'closed', ended_at: new Date().toISOString() })
      .eq('id', nightId)
      .select('*')
      .single()
    if (error) return Response.json({ error: error.message }, { status: 500 })
    await logEvent(sb, { night_id: nightId, type: EVENT_TYPES.NIGHT_REVEALED, payload: {} })
    return Response.json({ night: data })
  }

  return Response.json({ error: 'unknown action' }, { status: 400 })
}
