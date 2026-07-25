import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Service-role client for the console's server-side write routes. This key
// bypasses RLS, so it must NEVER be exposed to the browser — only ever
// instantiated inside Route Handlers / Server Actions.
export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local.',
    )
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
