-- Core PUBLIC projection tables + the append-only event log.
-- All money is integer cents.

-- PLAYERS
create table players (
  id           uuid primary key default gen_random_uuid(),
  display_name text not null,
  nickname     text,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- SEASONS
create table seasons (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  status     text not null default 'active', -- active | closed
  started_at timestamptz not null default now(),
  ended_at   timestamptz
);

-- NIGHTS  (`revealed` is the embargo gate for hole-card data)
create table nights (
  id           uuid primary key default gen_random_uuid(),
  season_id    uuid not null references seasons(id) on delete cascade,
  label        text,
  status       text not null default 'live',  -- live | closed
  revealed     boolean not null default false,
  ante_cents   int not null default 5,
  buyin_cents  int not null default 2000,
  dealer_seat  int,
  hand_counter int not null default 0,
  started_at   timestamptz not null default now(),
  ended_at     timestamptz
);

-- NIGHT_SEATS  (seat -> player map for the night; drives dealer rotation)
create table night_seats (
  night_id  uuid not null references nights(id) on delete cascade,
  seat      int  not null,
  player_id uuid not null references players(id),
  primary key (night_id, seat)
);

-- HANDS  (public result data; hole cards live in the embargoed table)
create table hands (
  id               uuid primary key default gen_random_uuid(),
  night_id         uuid not null references nights(id) on delete cascade,
  hand_no          int not null,
  dealer_seat      int not null,
  status           text not null default 'open', -- open | closed | void
  pot_cents        int,
  winner_player_id uuid references players(id),
  seven_two        boolean not null default false,
  verified         boolean not null default false, -- flips the TV recompute
  opened_at        timestamptz not null default now(),
  closed_at        timestamptz,
  unique (night_id, hand_no)
);

-- HAND_PLAYERS  (per-seat facts; nothing hole-card-derived here)
create table hand_players (
  id        uuid primary key default gen_random_uuid(),
  hand_id   uuid not null references hands(id) on delete cascade,
  player_id uuid not null references players(id),
  seat      int not null,
  dealt_in  boolean not null default true, -- paid ante / eligible for 7-2 charge
  folded    boolean,
  is_winner boolean not null default false,
  net_cents int,
  unique (hand_id, player_id)
);

-- TRANSFERS  (money movements: buy-ins, rebuys, chip-to-chip, cashouts, 7-2 pays)
create table transfers (
  id             uuid primary key default gen_random_uuid(),
  night_id       uuid not null references nights(id) on delete cascade,
  kind           text not null, -- buyin | rebuy | transfer | cashout | bonus_pay
  from_player_id uuid references players(id), -- null = bank
  to_player_id   uuid references players(id), -- null = bank
  amount_cents   int not null,
  note           text,
  created_at     timestamptz not null default now()
);

-- BONUSES  (7-2 invoices: 50c from each other dealt-in player to the winner)
create table bonuses (
  id               uuid primary key default gen_random_uuid(),
  night_id         uuid not null references nights(id) on delete cascade,
  hand_id          uuid not null references hands(id) on delete cascade,
  winner_player_id uuid not null references players(id),
  payer_player_id  uuid not null references players(id),
  amount_cents     int not null default 50,
  paid             boolean not null default false,
  created_at       timestamptz not null default now(),
  unique (hand_id, payer_player_id)
);

-- EVENTS  (append-only spine — every state change lands here)
create table events (
  id         bigint generated always as identity primary key,
  night_id   uuid references nights(id) on delete cascade,
  hand_id    uuid references hands(id) on delete set null,
  type       text not null,
  payload    jsonb not null default '{}',
  corrects   bigint references events(id), -- fix-it: supersedes an earlier event
  created_at timestamptz not null default now(),
  created_by text
);
