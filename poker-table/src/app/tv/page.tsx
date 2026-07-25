'use client'

import { useMemo } from 'react'
import { useLiveNight } from '@/lib/realtime/useLiveNight'
import { StackRaceChart } from '@/components/tv/StackRaceChart'
import {
  FoldStreaks,
  HandsPerHour,
  LastHandResult,
  PotAndAnteTimer,
  SevenTwoLedger,
  StandingsBoard,
  TonightNet,
} from '@/components/tv/panels'

export default function TvDashboard() {
  const state = useLiveNight()

  const nameOf = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of state.players) map.set(p.id, p.nickname || p.display_name)
    for (const r of state.tonightNet) map.set(r.player_id, r.display_name)
    return (id: string) => map.get(id) ?? '—'
  }, [state.players, state.tonightNet])

  if (state.error) {
    return (
      <main className="grid min-h-screen place-items-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-red-400">Dashboard offline</h1>
          <p className="mt-2 max-w-md text-white/50">{state.error}</p>
          <p className="mt-4 text-sm text-white/30">
            Check <code className="text-white/60">.env.local</code> and that migrations + seed ran.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-5 lg:p-8">
      <header className="mb-5 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {state.season?.name ?? 'Basement Poker'}
        </h1>
        <div className="flex items-center gap-3 text-sm text-white/40">
          <span>{state.night?.label ?? (state.loading ? 'Loading…' : 'No live night')}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${state.night?.status === 'live' ? 'bg-emerald-400' : 'bg-white/20'}`} />
            {state.night?.revealed ? 'Revealed' : 'Live'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        <div className="lg:col-span-2 lg:row-span-2">
          <StackRaceChart points={state.stackRace} />
        </div>
        <div className="lg:col-span-1 lg:row-span-2">
          <TonightNet rows={state.tonightNet} />
        </div>
        <div className="lg:col-span-1 lg:row-span-2">
          <StandingsBoard rows={state.standings} nameOf={nameOf} />
        </div>

        <div className="lg:col-span-1">
          <LastHandResult state={state} nameOf={nameOf} />
        </div>
        <div className="lg:col-span-1">
          <HandsPerHour state={state} />
        </div>
        <div className="lg:col-span-1">
          <FoldStreaks rows={state.foldStreaks} nameOf={nameOf} />
        </div>
        <div className="lg:col-span-1">
          <SevenTwoLedger rows={state.sevenTwoLedger} nameOf={nameOf} />
        </div>

        <div className="lg:col-span-4">
          <PotAndAnteTimer state={state} />
        </div>
      </div>
    </main>
  )
}
