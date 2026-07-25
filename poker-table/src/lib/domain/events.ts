// The append-only event log is the spine of the system. Every state change
// writes a projection row AND one of these events in the same transaction.
// Corrections append a new event with `corrects` set — history is never mutated.

export const EVENT_TYPES = {
  SEASON_STARTED: 'season_started',
  NIGHT_STARTED: 'night_started',
  PLAYERS_SEATED: 'players_seated',
  BUYIN: 'buyin',
  REBUY: 'rebuy',
  HAND_OPENED: 'hand_opened',
  HAND_RESULT: 'hand_result',
  SEVEN_TWO_BONUS: 'seven_two_bonus',
  HAND_VERIFIED: 'hand_verified',
  STACK_SNAPSHOT: 'stack_snapshot',
  TRANSFER: 'transfer',
  CORRECTION: 'correction',
  NIGHT_REVEALED: 'night_revealed',
  SETTLE_COMPUTED: 'settle_computed',
} as const

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES]

// Event types that may carry hole-card-derived data in their payload and must
// therefore be filtered out of anything the anon (TV) client can read. Phase 0
// produces none of these, but the guard (v_public_events) exists from day one.
export const EMBARGOED_EVENT_TYPES: EventType[] = []

export interface EventInput {
  night_id?: string | null
  hand_id?: string | null
  type: EventType
  payload?: Record<string, unknown>
  corrects?: number | null
  created_by?: string
}
