import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'
import { computeSettlement, type PlayerNet } from '@/lib/domain/settle'
import type { TonightNetRow } from '@/lib/supabase/types'

// Computes the minimal payment graph for a night from current nets
// (stack - invested) and logs the result. Read-oriented but POST because it
// appends a settle_computed event.
export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const nightId = body?.nightId
  if (!nightId) return Response.json({ error: 'nightId required' }, { status: 400 })

  const sb = createServiceClient()
  const { data, error } = await sb.from('v_tonight_net').select('*').eq('night_id', nightId)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const nets: PlayerNet[] = ((data ?? []) as TonightNetRow[]).map((r) => ({
    playerId: r.player_id,
    name: r.display_name,
    netCents: r.net_cents,
  }))
  const result = computeSettlement(nets)

  await logEvent(sb, {
    night_id: nightId,
    type: EVENT_TYPES.SETTLE_COMPUTED,
    payload: {
      balanced: result.balanced,
      imbalanceCents: result.imbalanceCents,
      payments: result.payments.length,
    },
  })
  return Response.json(result)
}
