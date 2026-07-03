// RevenueCat -> Supabase entitlement mirror (Deno edge function).
// MONEY PATH (guarded — see project CLAUDE.md). Deploy with real secrets only
// after review: RC_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY are
// function env vars (server-only). The service-role key must NEVER reach the client.
//
// Note: this runs on Deno (Supabase Edge Runtime), not the Expo bundle — it is
// excluded from the app's tsconfig. `jsr:` import + `Deno` globals are expected.
import { createClient } from 'jsr:@supabase/supabase-js';

Deno.serve(async (req) => {
  if (req.headers.get('authorization') !== `Bearer ${Deno.env.get('RC_WEBHOOK_SECRET')}`)
    return new Response('unauthorized', { status: 401 });

  const { event } = await req.json();
  const supa = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const isActive = ['INITIAL_PURCHASE', 'RENEWAL', 'UNCANCELLATION', 'PRODUCT_CHANGE']
    .includes(event.type);

  await supa.from('subscriptions').upsert({
    user_id: event.app_user_id,
    rc_customer_id: event.original_app_user_id,
    entitlement: event.entitlement_ids?.[0] ?? null,
    product_id: event.product_id,
    is_active: isActive,
    expires_at: event.expiration_at_ms
      ? new Date(event.expiration_at_ms).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  });

  return new Response('ok');
});
