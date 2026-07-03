-- MIGRATION (guarded — "danger/money" lane, see project CLAUDE.md).
-- Per-user cloud backup of the local HiveData snapshot. Local storage stays the
-- source of truth; this is a restore safety net. RLS scopes every row to its
-- owner — a user can only read/write their own backup. Do NOT apply to
-- production without an explicit review + "go".

create table if not exists public.backups (
  user_id uuid primary key references auth.users(id) on delete cascade,
  version int not null default 1,
  saved_at timestamptz,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.backups enable row level security;

create policy backups_select_own
  on public.backups for select
  using (auth.uid() = user_id);

create policy backups_upsert_own
  on public.backups for insert
  with check (auth.uid() = user_id);

create policy backups_update_own
  on public.backups for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
