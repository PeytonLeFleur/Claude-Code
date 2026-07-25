-- Row-Level Security = the embargo. This is the load-bearing security layer.
--
-- Rules:
--   * anon (TV / browser) gets SELECT-only on PUBLIC tables, and NO write
--     policy anywhere -> anon can never write.
--   * hole_cards / board_cards are readable by anon ONLY after nights.revealed.
--   * events is never anon-readable directly; anon reads v_public_events instead.
--   * service_role (console server routes) bypasses RLS entirely.

alter table players       enable row level security;
alter table seasons       enable row level security;
alter table nights        enable row level security;
alter table night_seats   enable row level security;
alter table hands         enable row level security;
alter table hand_players  enable row level security;
alter table transfers     enable row level security;
alter table bonuses       enable row level security;
alter table events        enable row level security;
alter table hole_cards    enable row level security;
alter table board_cards   enable row level security;
alter table tray_snapshots enable row level security;

-- Base table privileges for the invoker views (RLS still gates the rows).
grant select on
  players, seasons, nights, night_seats, hands, hand_players,
  transfers, bonuses, tray_snapshots, hole_cards, board_cards
to anon, authenticated;

-- Anon may never touch the raw event log; it reads v_public_events (definer).
revoke select on events from anon, authenticated;

-- PUBLIC read policies (rows always visible to anon).
create policy anon_read on players       for select to anon, authenticated using (true);
create policy anon_read on seasons       for select to anon, authenticated using (true);
create policy anon_read on nights        for select to anon, authenticated using (true);
create policy anon_read on night_seats   for select to anon, authenticated using (true);
create policy anon_read on hands         for select to anon, authenticated using (true);
create policy anon_read on hand_players  for select to anon, authenticated using (true);
create policy anon_read on transfers     for select to anon, authenticated using (true);
create policy anon_read on bonuses       for select to anon, authenticated using (true);
create policy anon_read on tray_snapshots for select to anon, authenticated using (true);

-- EMBARGOED read policies: only after the night is revealed.
create policy anon_read_after_reveal on hole_cards for select to anon, authenticated
  using (exists (select 1 from nights n where n.id = hole_cards.night_id and n.revealed));

create policy anon_read_after_reveal on board_cards for select to anon, authenticated
  using (exists (select 1 from nights n where n.id = board_cards.night_id and n.revealed));

-- Note: no INSERT/UPDATE/DELETE policies exist for anon/authenticated on any
-- table, so those roles cannot write. All writes go through service_role in the
-- console's server routes, which bypasses RLS.
