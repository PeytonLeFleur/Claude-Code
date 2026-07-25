-- Only PUBLIC tables join the realtime publication the TV subscribes to.
-- hole_cards / board_cards are deliberately NEVER published, so embargoed data
-- can never reach a subscriber even mid-hand.
alter publication supabase_realtime add table nights;
alter publication supabase_realtime add table hands;
alter publication supabase_realtime add table hand_players;
alter publication supabase_realtime add table transfers;
alter publication supabase_realtime add table bonuses;
alter publication supabase_realtime add table tray_snapshots;
alter publication supabase_realtime add table night_seats;
