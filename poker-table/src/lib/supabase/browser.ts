'use client'

import { createBrowserClient } from '@supabase/ssr'

// Anon client used by the TV dashboard (read-only) and realtime subscriptions.
// RLS guarantees this key can never read embargoed hole-card data pre-reveal,
// and can never write anything.
let client: ReturnType<typeof createBrowserClient> | null = null

export function getBrowserClient() {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local.',
    )
  }
  client = createBrowserClient(url, anonKey)
  return client
}
