// Supabase client for auth + entitlement mirror queries. The webhook (server-side,
// service role) is the only writer to `subscriptions`; the client only reads its own
// row via RLS. Anon key only — never the service-role key in the client bundle.
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Fail loudly in dev if unconfigured, but don't crash a web-export type-check.
if (__DEV__ && (!url || !anonKey)) {
  console.warn(
    '[supabase] EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY not set — auth and sync are disabled.',
  );
}

export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'anon', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
