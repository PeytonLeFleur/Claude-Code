'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getBrowserClient } from '@/lib/supabase/browser'
import type {
  FoldStreakRow,
  HandsPerHourRow,
  LastHandRow,
  Night,
  Player,
  Season,
  StackRacePoint,
  StandingRow,
  TonightNetRow,
} from '@/lib/supabase/types'

export interface SevenTwoLedgerRow {
  night_id: string
  player_id: string
  collected_cents: number
  paid_cents: number
  net_cents: number
}

export interface LiveNightState {
  loading: boolean
  error: string | null
  night: Night | null
  season: Season | null
  players: Player[]
  tonightNet: TonightNetRow[]
  standings: StandingRow[]
  handsPerHour: HandsPerHourRow | null
  lastHand: LastHandRow | null
  foldStreaks: FoldStreakRow[]
  sevenTwoLedger: SevenTwoLedgerRow[]
  stackRace: (StackRacePoint & { display_name: string; captured_at: string })[]
}

const EMPTY: LiveNightState = {
  loading: true,
  error: null,
  night: null,
  season: null,
  players: [],
  tonightNet: [],
  standings: [],
  handsPerHour: null,
  lastHand: null,
  foldStreaks: [],
  sevenTwoLedger: [],
  stackRace: [],
}

// Subscribes to the current live night and refetches the projection views on any
// realtime change. The TV client stays dumb: views + one RPC do the aggregation.
export function useLiveNight(): LiveNightState {
  const [state, setState] = useState<LiveNightState>(EMPTY)
  const nightIdRef = useRef<string | null>(null)
  const seasonIdRef = useRef<string | null>(null)

  const fetchAll = useCallback(async () => {
    const sb = getBrowserClient()
    try {
      // Pick the most recent live night (fall back to the most recent night).
      const { data: nights, error: nightErr } = await sb
        .from('nights')
        .select('*')
        .order('status', { ascending: true }) // 'closed' < 'live'; prefer live via next sort
        .order('started_at', { ascending: false })
        .limit(20)
      if (nightErr) throw nightErr

      const nightList = (nights ?? []) as Night[]
      const night = nightList.find((n) => n.status === 'live') ?? nightList[0] ?? null
      if (!night) {
        setState({ ...EMPTY, loading: false })
        return
      }
      nightIdRef.current = night.id
      seasonIdRef.current = night.season_id

      const [
        seasonRes,
        playersRes,
        tonightRes,
        standingsRes,
        hphRes,
        lastRes,
        foldRes,
        ledgerRes,
        raceRes,
      ] = await Promise.all([
        sb.from('seasons').select('*').eq('id', night.season_id).single(),
        sb.from('players').select('*').eq('active', true).order('display_name'),
        sb.from('v_tonight_net').select('*').eq('night_id', night.id),
        sb.from('v_standings').select('*').eq('season_id', night.season_id),
        sb.from('v_hands_per_hour').select('*').eq('night_id', night.id).maybeSingle(),
        sb.from('v_last_hand').select('*').eq('night_id', night.id).maybeSingle(),
        sb.from('v_fold_streaks').select('*').eq('night_id', night.id),
        sb.from('v_seven_two_ledger').select('*').eq('night_id', night.id),
        sb.rpc('stack_race', { p_night: night.id }),
      ])

      setState({
        loading: false,
        error: null,
        night,
        season: (seasonRes.data as Season) ?? null,
        players: (playersRes.data ?? []) as Player[],
        tonightNet: (tonightRes.data ?? []) as TonightNetRow[],
        standings: (standingsRes.data ?? []) as StandingRow[],
        handsPerHour: (hphRes.data as HandsPerHourRow) ?? null,
        lastHand: (lastRes.data as LastHandRow) ?? null,
        foldStreaks: (foldRes.data ?? []) as FoldStreakRow[],
        sevenTwoLedger: (ledgerRes.data ?? []) as SevenTwoLedgerRow[],
        stackRace: (raceRes.data ?? []) as LiveNightState['stackRace'],
      })
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load live data.',
      }))
    }
  }, [])

  useEffect(() => {
    void fetchAll()

    const sb = getBrowserClient()
    let timer: ReturnType<typeof setTimeout> | null = null
    const scheduleRefetch = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => void fetchAll(), 250) // debounce bursts of changes
    }

    const channel = sb.channel('live-night')
    for (const table of [
      'nights',
      'hands',
      'hand_players',
      'transfers',
      'bonuses',
      'tray_snapshots',
      'night_seats',
    ]) {
      channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        scheduleRefetch,
      )
    }
    channel.subscribe()

    return () => {
      if (timer) clearTimeout(timer)
      void sb.removeChannel(channel)
    }
  }, [fetchAll])

  return state
}
