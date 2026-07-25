import { requireOperator } from '@/lib/auth/guard'
import { createServiceClient } from '@/lib/supabase/server'

// Marks a 7-2 invoice paid/unpaid. The chips physically move at the table, so
// this is a ledger flag, not a money movement.
export async function POST(req: Request) {
  const denied = await requireOperator()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const bonusId = body?.bonusId
  const paid = body?.paid !== false
  if (!bonusId) return Response.json({ error: 'bonusId required' }, { status: 400 })

  const sb = createServiceClient()
  const { error } = await sb.from('bonuses').update({ paid }).eq('id', bonusId)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
