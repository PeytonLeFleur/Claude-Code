-- Demo data so /tv shows something the moment you open it.
-- Idempotent-ish: truncates the domain tables first, then reinserts.

truncate table events, bonuses, transfers, tray_snapshots, board_cards, hole_cards,
               hand_players, hands, night_seats, nights, seasons, players restart identity cascade;

-- Players
insert into players (id, display_name, nickname) values
  ('11111111-1111-1111-1111-111111111111', 'Peyton', 'The Host'),
  ('22222222-2222-2222-2222-222222222222', 'Deuce',  null),
  ('33333333-3333-3333-3333-333333333333', 'Mikey',  'Fish'),
  ('44444444-4444-4444-4444-444444444444', 'Sal',    'The Rock'),
  ('55555555-5555-5555-5555-555555555555', 'Rico',   'Suave');

-- Season
insert into seasons (id, name, status) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Summer Basement 2026', 'active');

-- Night (live, not revealed)
insert into nights (id, season_id, label, status, revealed, ante_cents, buyin_cents, dealer_seat, hand_counter, started_at) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'Night 1 — Jul 25', 'live', false, 5, 2000, 2, 2, '2026-07-25 20:00:00+00');

-- Seat map
insert into night_seats (night_id, seat, player_id) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 0, '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1, '22222222-2222-2222-2222-222222222222'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2, '33333333-3333-3333-3333-333333333333'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 3, '44444444-4444-4444-4444-444444444444'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 4, '55555555-5555-5555-5555-555555555555');

-- Buy-ins ($20 each)
insert into transfers (night_id, kind, from_player_id, to_player_id, amount_cents) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'buyin', null, '11111111-1111-1111-1111-111111111111', 2000),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'buyin', null, '22222222-2222-2222-2222-222222222222', 2000),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'buyin', null, '33333333-3333-3333-3333-333333333333', 2000),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'buyin', null, '44444444-4444-4444-4444-444444444444', 2000),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'buyin', null, '55555555-5555-5555-5555-555555555555', 2000);

-- Hand 1: Rico wins a $2.15 pot (no 7-2)
insert into hands (id, night_id, hand_no, dealer_seat, status, pot_cents, winner_player_id, seven_two, verified, opened_at, closed_at) values
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   1, 0, 'closed', 215, '55555555-5555-5555-5555-555555555555', false, true,
   '2026-07-25 20:05:00+00', '2026-07-25 20:09:00+00');

insert into hand_players (hand_id, player_id, seat, dealt_in, folded, is_winner) values
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 0, true, true,  false),
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 1, true, true,  false),
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 2, true, false, false),
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 3, true, true,  false),
  ('c1cccccc-cccc-cccc-cccc-cccccccccccc', '55555555-5555-5555-5555-555555555555', 4, true, false, true);

-- Hand 2: Peyton wins holding 7-2 -> everyone dealt in pays 50c
insert into hands (id, night_id, hand_no, dealer_seat, status, pot_cents, winner_player_id, seven_two, verified, opened_at, closed_at) values
  ('c2cccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   2, 1, 'closed', 180, '11111111-1111-1111-1111-111111111111', true, true,
   '2026-07-25 20:12:00+00', '2026-07-25 20:16:00+00');

insert into hand_players (id, hand_id, player_id, seat, dealt_in, folded, is_winner) values
  ('d2100000-0000-0000-0000-000000000000', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 0, true, false, true),
  ('d2200000-0000-0000-0000-000000000000', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 1, true, true,  false),
  ('d2300000-0000-0000-0000-000000000000', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 2, true, true,  false),
  ('d2400000-0000-0000-0000-000000000000', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 3, true, true,  false),
  ('d2500000-0000-0000-0000-000000000000', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '55555555-5555-5555-5555-555555555555', 4, true, true,  false);

-- 7-2 invoices: each other dealt-in player owes Peyton 50c
insert into bonuses (night_id, hand_id, winner_player_id, payer_player_id, amount_cents, paid) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 50, false),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 50, false),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 50, false),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 50, false);

-- Stack snapshots: an opening round (~even) and a later round (spread out) for the stack race.
insert into tray_snapshots (night_id, hand_id, player_id, stack_cents, captured_at) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 2000, '2026-07-25 20:10:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 2000, '2026-07-25 20:10:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 2000, '2026-07-25 20:10:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 2000, '2026-07-25 20:10:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', '55555555-5555-5555-5555-555555555555', 2000, '2026-07-25 20:10:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 2500, '2026-07-25 21:30:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 1800, '2026-07-25 21:30:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 1700, '2026-07-25 21:30:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 1700, '2026-07-25 21:30:00+00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', '55555555-5555-5555-5555-555555555555', 2300, '2026-07-25 21:30:00+00');

-- Embargo proof: Peyton's actual 7-2 hole cards. Anon queries return 0 rows until
-- nights.revealed flips to true.
insert into hole_cards (hand_player_id, night_id, card1, card2, source) values
  ('d2100000-0000-0000-0000-000000000000', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '7h', '2c', 'manual');

-- A few representative event-log rows.
insert into events (night_id, hand_id, type, payload, created_by) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null, 'night_started', '{"label":"Night 1 — Jul 25"}', 'seed'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c1cccccc-cccc-cccc-cccc-cccccccccccc', 'hand_result', '{"winner":"Rico","pot_cents":215}', 'seed'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c2cccccc-cccc-cccc-cccc-cccccccccccc', 'seven_two_bonus', '{"winner":"Peyton","payers":4}', 'seed');
