-- MIGRATION (guarded — "danger/money" lane, see project CLAUDE.md).
-- Mirrors RevenueCat entitlement state into Postgres so the app can query and
-- automate on subscription status. RevenueCat stays the source of truth; the
-- webhook (service role) is the ONLY writer. Do not apply to production without
-- an explicit review + "go".

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  rc_customer_id text,
  entitlement text,
  is_active boolean not null default false,
  product_id text,
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy read_own_sub
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Writes come only from the webhook via the service role, never the client.
