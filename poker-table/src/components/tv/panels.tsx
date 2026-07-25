'use client'

import { useEffect, useState } from 'react'
import { Card, Empty, Money } from '@/components/ui'
import { formatUSD } from '@/lib/domain/money'
import type { LiveNightState, SevenTwoLedgerRow } from '@/lib/realtime/useLiveNight'
import type { FoldStreakRow, StandingRow, TonightNetRow } from '@/lib/supabase/types'

export function StandingsBoard({ rows, nameOf }: { rows: StandingRow[]; nameOf: (id: string) => string }) {
  const sorted = [...rows].sort((a, b) => b.season_net_cents - a.season_net_cents)
  return (
    <Card title="Season Standings" className="h-full">
      {sorted.length === 0 ? (
        <Empty>No results yet.</Empty>
      ) : (
        <ol className="space-y-2">
          {sorted.map((r, i) => (
            <li key={r.player_id} className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="tnum w-6 text-right text-white/30">{i + 1}</span>
                <span className="text-lg text-white">{r.display_name || nameOf(r.player_id)}</span>
              </span>
              <Money cents={r.season_net_cents} className="text-lg" />
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}

export function TonightNet({ rows }: { rows: TonightNetRow[] }) {
  const sorted = [...rows].sort((a, b) => b.net_cents - a.net_cents)
  return (
    <Card title="Tonight" className="h-full">
      {sorted.length === 0 ? (
        <Empty>Seat some players to get started.</Empty>
      ) : (
        <ul className="space-y-2">
          {sorted.map((r) => (
            <li key={r.player_id} className="flex items-center justify-between">
              <span className="text-lg text-white">{r.display_name}</span>
              <span className="flex items-baseline gap-3">
                <span className="tnum text-sm text-white/30">{formatUSD(r.stack_cents)}</span>
                <Money cents={r.net_cents} className="text-lg" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function LastHandResult({
  state,
  nameOf,
}: {
  state: LiveNightState
  nameOf: (id: string) => string
}) {
  const h = state.lastHand
  return (
    <Card title="Last Hand" className="h-full">
      {!h ? (
        <Empty>No hands played yet.</Empty>
      ) : (
        <div className="flex h-full flex-col justify-center">
          <div className="text-sm text-white/40">Hand #{h.hand_no}</div>
          <div className="mt-1 text-3xl font-semibold text-white">
            {h.winner_player_id ? nameOf(h.winner_player_id) : 'Split'}
            {h.seven_two ? <span className="ml-2 text-gold">· 7‑2 🎉</span> : null}
          </div>
          <div className="tnum mt-1 text-lg text-emerald-400">
            {h.pot_cents != null ? `${formatUSD(h.pot_cents)} pot` : ''}
          </div>
        </div>
      )}
    </Card>
  )
}

export function HandsPerHour({ state }: { state: LiveNightState }) {
  const hph = state.handsPerHour
  return (
    <Card title="Pace" className="h-full">
      <div className="flex h-full items-center justify-around">
        <div className="text-center">
          <div className="tnum text-4xl font-semibold text-white">{hph?.hands_verified ?? 0}</div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">Hands</div>
        </div>
        <div className="text-center">
          <div className="tnum text-4xl font-semibold text-white">
            {hph ? Number(hph.hands_per_hour).toFixed(1) : '0.0'}
          </div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">Per Hour</div>
        </div>
      </div>
    </Card>
  )
}

export function FoldStreaks({
  rows,
  nameOf,
}: {
  rows: FoldStreakRow[]
  nameOf: (id: string) => string
}) {
  const sorted = [...rows].filter((r) => r.current_streak > 0).sort((a, b) => b.current_streak - a.current_streak).slice(0, 5)
  return (
    <Card title="Fold Streaks" className="h-full">
      {sorted.length === 0 ? (
        <Empty>Nobody's nitting it up… yet.</Empty>
      ) : (
        <ul className="space-y-2">
          {sorted.map((r) => (
            <li key={r.player_id} className="flex items-center justify-between">
              <span className="text-white">{nameOf(r.player_id)}</span>
              <span className="tnum text-lg text-white/70">{r.current_streak} in a row</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function SevenTwoLedger({
  rows,
  nameOf,
}: {
  rows: SevenTwoLedgerRow[]
  nameOf: (id: string) => string
}) {
  const sorted = [...rows].sort((a, b) => b.net_cents - a.net_cents)
  return (
    <Card title="7‑2 Ledger" className="h-full">
      {sorted.length === 0 ? (
        <Empty>No 7‑2 wins yet.</Empty>
      ) : (
        <ul className="space-y-1.5">
          {sorted.map((r) => (
            <li key={r.player_id} className="flex items-center justify-between text-sm">
              <span className="text-white/80">{nameOf(r.player_id)}</span>
              <Money cents={r.net_cents} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function PotAndAnteTimer({ state }: { state: LiveNightState }) {
  const startedAt = state.night?.started_at
  const [elapsed, setElapsed] = useState('0:00')

  useEffect(() => {
    if (!startedAt) return
    const start = new Date(startedAt).getTime()
    const tick = () => {
      const secs = Math.max(0, Math.floor((Date.now() - start) / 1000))
      const h = Math.floor(secs / 3600)
      const m = Math.floor((secs % 3600) / 60)
      const s = secs % 60
      setElapsed(h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startedAt])

  return (
    <Card title="Table" className="h-full">
      <div className="flex h-full items-center justify-around text-center">
        <div>
          <div className="tnum text-3xl font-semibold text-white">{elapsed}</div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">Elapsed</div>
        </div>
        <div>
          <div className="tnum text-3xl font-semibold text-white">
            {state.night ? formatUSD(state.night.ante_cents) : '—'}
          </div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">Ante</div>
        </div>
        <div>
          <div className="tnum text-3xl font-semibold text-white">
            {state.night ? formatUSD(state.night.buyin_cents) : '—'}
          </div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">Buy‑in</div>
        </div>
      </div>
    </Card>
  )
}
