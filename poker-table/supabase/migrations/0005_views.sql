-- Projections the TV reads. Public analytic views run with security_invoker so
-- the querying role's RLS applies (they only touch PUBLIC tables anyway).
-- v_public_events is the ONE exception: it runs as definer to bypass the (empty)
-- anon policy on `events` and instead expose events through a type filter.

-- Total bought in per (night, player).
create view v_player_invested with (security_invoker = on) as
select night_id, to_player_id as player_id, sum(amount_cents)::int as invested_cents
from transfers
where kind in ('buyin', 'rebuy') and to_player_id is not null
group by night_id, to_player_id;

-- Most recent stack snapshot per (night, player).
create view v_latest_stack with (security_invoker = on) as
select distinct on (night_id, player_id)
  night_id, player_id, stack_cents, captured_at
from tray_snapshots
where player_id is not null
order by night_id, player_id, captured_at desc;

-- Tonight net = current stack - amount invested, per seated player.
-- Before any snapshot exists, stack defaults to invested so net starts at 0.
create view v_tonight_net with (security_invoker = on) as
select
  ns.night_id,
  ns.player_id,
  p.display_name,
  coalesce(ls.stack_cents, inv.invested_cents, 0) as stack_cents,
  coalesce(inv.invested_cents, 0) as invested_cents,
  coalesce(ls.stack_cents, inv.invested_cents, 0) - coalesce(inv.invested_cents, 0) as net_cents
from night_seats ns
join players p on p.id = ns.player_id
left join v_latest_stack ls on ls.night_id = ns.night_id and ls.player_id = ns.player_id
left join v_player_invested inv on inv.night_id = ns.night_id and inv.player_id = ns.player_id;

-- Season standings = sum of nightly nets across the season's nights.
create view v_standings with (security_invoker = on) as
select
  n.season_id,
  tn.player_id,
  tn.display_name,
  sum(tn.net_cents)::int as season_net_cents,
  count(distinct tn.night_id)::int as nights_played
from v_tonight_net tn
join nights n on n.id = tn.night_id
group by n.season_id, tn.player_id, tn.display_name;

-- Pace: verified hands and hands/hour for a night.
create view v_hands_per_hour with (security_invoker = on) as
select
  night_id,
  count(*) filter (where verified)::int as hands_verified,
  round(
    count(*) filter (where verified)::numeric
    / greatest(extract(epoch from (now() - min(opened_at))) / 3600.0, 0.05),
    1
  ) as hands_per_hour
from hands
group by night_id;

-- Current consecutive-fold streak per (night, player) over verified hands.
create view v_fold_streaks with (security_invoker = on) as
with ranked as (
  select
    hp.player_id,
    h.night_id,
    coalesce(hp.folded, false) as folded,
    row_number() over (partition by hp.player_id, h.night_id order by h.hand_no desc) as rn
  from hand_players hp
  join hands h on h.id = hp.hand_id and h.verified
),
first_nonfold as (
  select player_id, night_id, min(rn) as rn
  from ranked
  where not folded
  group by player_id, night_id
)
select
  r.night_id,
  r.player_id,
  coalesce(f.rn - 1, max(r.rn))::int as current_streak
from ranked r
left join first_nonfold f on f.player_id = r.player_id and f.night_id = r.night_id
group by r.night_id, r.player_id, f.rn;

-- Last verified hand per night.
create view v_last_hand with (security_invoker = on) as
select distinct on (night_id)
  night_id, id as hand_id, hand_no, winner_player_id, pot_cents, seven_two, closed_at
from hands
where verified
order by night_id, hand_no desc;

-- 7-2 ledger: collected vs paid per (night, player).
create view v_seven_two_ledger with (security_invoker = on) as
select
  night_id,
  player_id,
  sum(collected)::int as collected_cents,
  sum(paid)::int as paid_cents,
  (sum(collected) - sum(paid))::int as net_cents
from (
  select night_id, winner_player_id as player_id, amount_cents as collected, 0 as paid from bonuses
  union all
  select night_id, payer_player_id as player_id, 0 as collected, amount_cents as paid from bonuses
) x
group by night_id, player_id;

-- The ONLY way anon reads the event log: filtered to non-embargoed types.
-- Runs as definer (default) so it can read `events` despite anon having no
-- direct policy on the table. Keep the exclusion list in sync with
-- EMBARGOED_EVENT_TYPES in src/lib/domain/events.ts.
create view v_public_events as
select id, night_id, hand_id, type, payload, corrects, created_at, created_by
from events
where type not in ('__embargoed_placeholder__');

grant select on
  v_player_invested, v_latest_stack, v_tonight_net, v_standings,
  v_hands_per_hour, v_fold_streaks, v_last_hand, v_seven_two_ledger,
  v_public_events
to anon, authenticated;
