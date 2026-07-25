import 'server-only'

import type { SupabaseClient } from '@supabase/supabase-js'
import type { EventInput } from '@/lib/domain/events'

// Appends one row to the event log. Callers write the projection change and this
// event together; wrap both in the same logical operation so they don't drift.
export async function logEvent(sb: SupabaseClient, input: EventInput): Promise<void> {
  const { error } = await sb.from('events').insert({
    night_id: input.night_id ?? null,
    hand_id: input.hand_id ?? null,
    type: input.type,
    payload: input.payload ?? {},
    corrects: input.corrects ?? null,
    created_by: input.created_by ?? 'console',
  })
  if (error) throw new Error(`event log failed: ${error.message}`)
}
