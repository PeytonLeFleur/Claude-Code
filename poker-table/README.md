# Basement Poker — Live Analytics (Phase 0)

A realtime wall-TV dashboard + manual-entry console for basement poker night, built
on **Next.js (App Router) + Supabase**. This is **Phase 0** of a larger build: no
cameras yet — the operator enters hands, buy-ins, and stack counts on a laptop, and
the TV updates live. The database schema and RLS embargo are already the full design,
so the later phases (card vision, chip-tray money layer, streaming overlay) slot in
without a migration.

## What it does

- **`/tv`** — glanceable dark dashboard for the wall TV. Season standings, tonight's
  net per player, a live stack-race chart, last hand, hands/hour, fold streaks, and
  the 7‑2 ledger. Public data only, updates in realtime.
- **`/console`** — password-gated operator surface. Start a season/night, seat
  players, record buy-ins & rebuys, open hands (dealer button auto-rotates), record
  results and 7‑2 invoices, snapshot chip stacks, log transfers, mark the night
  revealed, and compute settle-up (the minimal "who pays whom" graph).

## Architecture in one breath

- **Append-only event log** (`events`): every state change writes a projection row
  **and** an event. Corrections append new events; history is never mutated.
- **Leak-proofing via RLS, not UI**: hole-card data lives in embargoed tables gated
  by `nights.revealed`. The TV's anon key physically cannot read them (nor are they
  in the realtime publication) until you reveal the night — a one-line flip.
- **Dumb TV client**: standings / net / stack-race are Postgres views + one RPC; the
  TV refetches them on each realtime change.
- **Money is integer cents everywhere.** Net P&L = latest chip stack − amount bought
  in (stacks are manual snapshots in Phase 0, chip-tray vision in Phase 2).

## Setup

**1. Create a Supabase project** (free tier) at [supabase.com](https://supabase.com).
From **Settings → API** copy the Project URL, the `anon` key, and the `service_role` key.

**2. Configure env**

```bash
cd poker-table
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

| Variable | Where it goes |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key (safe in the browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key — **server-only, never public** |
| `CONSOLE_OPERATOR_PASSWORD` | the shared password to open `/console` |
| `CONSOLE_COOKIE_SECRET` | a long random string that signs the session cookie |

**3. Apply the schema.** With the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref <your-ref>
supabase db push          # runs supabase/migrations/0001…0008 in order
```

Then load the demo data (optional, but makes the dashboard show something immediately):
paste `supabase/seed.sql` into the Supabase SQL editor, or:

```bash
psql "<your-db-connection-string>" -f supabase/seed.sql
```

**4. Run it**

```bash
npm run dev
```

- TV: <http://localhost:3000/> (redirects to `/tv`)
- Console: <http://localhost:3000/console> (enter the operator password)

For game night, run it on the basement machine and open the wall-TV browser fullscreen
at `http://<machine-ip>:3000/tv`. (Supabase is cloud, so realtime needs internet — if
the Wi-Fi drops, live updates pause.)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with oxlint |

## Layout

```
poker-table/
├── supabase/
│   ├── migrations/        # 0001…0008: tables, embargo tables, indexes, views, functions, RLS, realtime
│   └── seed.sql           # demo season, players, 2 hands, snapshots, an embargoed hole card
└── src/
    ├── app/
    │   ├── tv/            # the wall-TV dashboard (realtime, anon key)
    │   ├── console/       # operator surface (login + guarded (app) route group)
    │   └── api/console/   # write routes (service-role, one projection + event per action)
    ├── components/{tv,console,ui}
    └── lib/
        ├── supabase/      # browser (anon) + server (service-role) clients + row types
        ├── domain/        # money, events, settle-up (minimal payment graph)
        ├── realtime/      # useLiveNight subscription hook
        └── auth/          # operator password + cookie session
```

## Verifying it works

1. After seed, `/tv` shows standings and Peyton's 7‑2 hand.
2. In `/console`, open a hand, record a winner, and watch `/tv` update **without a
   refresh**.
3. Query `hole_cards` with the anon key before reveal → 0 rows; hit **Mark revealed**
   → rows appear. (This embargo is validated against Postgres RLS.)
4. Open a night's **Settle up** → nets sum to zero and the payment graph shows ≤ n−1
   payments.

## Roadmap (later phases)

1. One hole-card pod + board camera → automatic card reads.
2. Pods at every seat + fold buttons → full auto hand histories.
3. Chip-tray vision + bank tray → the money layer becomes automatic (swap the
   `stack_race` function body; the schema already has `tray_snapshots`).
4. Streaming overlay, AI recap, season awards.
