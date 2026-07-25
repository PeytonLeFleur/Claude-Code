-- Stack-race time series for a night. Phase 0 reads manual tray_snapshots;
-- Phase 2 swaps the body to derive from chip-tray vision without touching callers.
create or replace function stack_race(p_night uuid)
returns table (
  captured_at  timestamptz,
  player_id    uuid,
  display_name text,
  stack_cents  int
)
language sql
stable
security invoker
as $$
  select ts.captured_at, ts.player_id, p.display_name, ts.stack_cents
  from tray_snapshots ts
  join players p on p.id = ts.player_id
  where ts.night_id = p_night and ts.player_id is not null
  order by ts.captured_at asc;
$$;

grant execute on function stack_race(uuid) to anon, authenticated;
