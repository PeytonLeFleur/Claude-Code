import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'

interface StackInput {
  playerId: string
  stackCents: number
}

// Records a round of chip-stack counts. Manual in Phase 0, chip-tray vision in
// Phase 2. Feeds tonight-net and the stack race.
export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const nightId = body?.nightId
  const handId = body?.handId ?? null
  const stacks: StackInput[] = Array.isArray(body?.stacks) ? body.stacks : []
  if (!nightId || stacks.length === 0) {
    return Response.json({ error: 'nightId and stacks required' }, { status: 400 })
  }

  const rows = stacks
    .filter((s) => s.playerId && Number.isInteger(s.stackCents) && s.stackCents >= 0)
    .map((s) => ({ night_id: nightId, hand_id: handId, player_id: s.playerId, stack_cents: s.stackCents }))
  if (rows.length === 0) return Response.json({ error: 'no valid stacks' }, { status: 400 })

  const sb = createServiceClient()
  const { error } = await sb.from('tray_snapshots').insert(rows)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  await logEvent(sb, { night_id: nightId, hand_id: handId, type: EVENT_TYPES.STACK_SNAPSHOT, payload: { snapshot: rows.length } })
  return Response.json({ ok: true, snapshots: rows.length })
}
