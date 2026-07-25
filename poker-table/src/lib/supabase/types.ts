// Hand-written row types for the Phase 0 schema. Kept in sync with
// supabase/migrations/*. Once a live project exists you can regenerate a
// stricter `Database` type with `supabase gen types typescript`.

export interface Player {
  id: string
  display_name: string
  nickname: string | null
  active: boolean
  created_at: string
}

export interface Season {
  id: string
  name: string
  status: 'active' | 'closed'
  started_at: string
  ended_at: string | null
}

export interface Night {
  id: string
  season_id: string
  label: string | null
  status: 'live' | 'closed'
  revealed: boolean
  ante_cents: number
  buyin_cents: number
  dealer_seat: number | null
  hand_counter: number
  started_at: string
  ended_at: string | null
}

export interface NightSeat {
  night_id: string
  seat: number
  player_id: string
}

export interface Hand {
  id: string
  night_id: string
  hand_no: number
  dealer_seat: number
  status: 'open' | 'closed' | 'void'
  pot_cents: number | null
  winner_player_id: string | null
  seven_two: boolean
  verified: boolean
  opened_at: string
  closed_at: string | null
}

export interface HandPlayer {
  id: string
  hand_id: string
  player_id: string
  seat: number
  dealt_in: boolean
  folded: boolean | null
  is_winner: boolean
  net_cents: number | null
}

export type TransferKind = 'buyin' | 'rebuy' | 'transfer' | 'cashout' | 'bonus_pay'

export interface Transfer {
  id: string
  night_id: string
  kind: TransferKind
  from_player_id: string | null
  to_player_id: string | null
  amount_cents: number
  note: string | null
  created_at: string
}

export interface Bonus {
  id: string
  night_id: string
  hand_id: string
  winner_player_id: string
  payer_player_id: string
  amount_cents: number
  paid: boolean
  created_at: string
}

// ---- View / RPC result shapes the TV reads ----

export interface TonightNetRow {
  night_id: string
  player_id: string
  display_name: string
  stack_cents: number
  invested_cents: number
  net_cents: number
}

export interface StandingRow {
  season_id: string
  player_id: string
  display_name: string
  season_net_cents: number
  nights_played: number
}

export interface HandsPerHourRow {
  night_id: string
  hands_verified: number
  hands_per_hour: number
}

export interface FoldStreakRow {
  player_id: string
  current_streak: number
}

export interface LastHandRow {
  night_id: string
  hand_id: string
  hand_no: number
  winner_player_id: string | null
  pot_cents: number | null
  seven_two: boolean
  closed_at: string | null
}

export interface StackRacePoint {
  hand_no: number
  player_id: string
  stack_cents: number
}
