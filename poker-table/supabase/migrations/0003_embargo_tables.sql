-- EMBARGOED tables (hole-card-derived data) + the chip-tray money layer.
-- `night_id` is denormalized onto the embargoed tables ON PURPOSE so the RLS
-- policy is a single-table lookup on nights.revealed. Do NOT "normalize it away"
-- — it is load-bearing for the embargo. Phase 0 writes no rows to hole_cards /
-- board_cards; they exist so Phases 1-4 slot in without a migration.

-- HOLE_CARDS  (EMBARGOED until nights.revealed)
create table hole_cards (
  id             uuid primary key default gen_random_uuid(),
  hand_player_id uuid not null references hand_players(id) on delete cascade,
  night_id       uuid not null references nights(id) on delete cascade,
  card1          text, -- e.g. 'As'
  card2          text, -- e.g. '7d'
  source         text not null default 'manual', -- manual | vision
  unique (hand_player_id)
);

-- BOARD_CARDS  (EMBARGOED until reveal — flop/turn/river can leak equity)
create table board_cards (
  id       uuid primary key default gen_random_uuid(),
  hand_id  uuid not null references hands(id) on delete cascade,
  night_id uuid not null references nights(id) on delete cascade,
  street   text not null, -- flop | turn | river
  cards    text[] not null,
  unique (hand_id, street)
);

-- TRAY_SNAPSHOTS  (PUBLIC stack counts; manual in Phase 0, vision in Phase 2)
create table tray_snapshots (
  id          uuid primary key default gen_random_uuid(),
  night_id    uuid not null references nights(id) on delete cascade,
  hand_id     uuid references hands(id) on delete set null,
  player_id   uuid references players(id),
  stack_cents int not null,
  source      text not null default 'manual', -- manual | vision
  captured_at timestamptz not null default now()
);
