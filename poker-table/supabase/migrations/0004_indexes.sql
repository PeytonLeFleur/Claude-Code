-- Indexes for the hot read paths.
create index on nights (season_id);
create index on night_seats (night_id);
create index on hands (night_id, hand_no);
create index on hand_players (hand_id);
create index on hand_players (player_id);
create index on transfers (night_id);
create index on transfers (to_player_id);
create index on bonuses (night_id);
create index on bonuses (hand_id);
create index on events (night_id, id);
create index on events (hand_id);
create index on tray_snapshots (night_id, player_id, captured_at desc);
create index on hole_cards (night_id);
create index on board_cards (night_id);
