import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'
import { logEvent } from '@/lib/console/events'
import { EVENT_TYPES } from '@/lib/domain/events'

export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  if (!name) return Response.json({ error: 'name required' }, { status: 400 })

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('seasons')
    .insert({ name, status: 'active' })
    .select('*')
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })

  await logEvent(sb, { type: EVENT_TYPES.SEASON_STARTED, payload: { name } })
  return Response.json({ season: data })
}
