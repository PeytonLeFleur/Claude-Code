'use client'

import { useMemo } from 'react'
import { Card, Empty } from '@/components/ui'
import { formatUSD } from '@/lib/domain/money'
import type { StackRacePoint } from '@/lib/supabase/types'

type RacePoint = StackRacePoint & { display_name: string; captured_at: string }

const LINE_COLORS = ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c', '#22d3ee', '#f87171', '#4ade80', '#c084fc']

// Lightweight hand-rolled SVG line chart — no chart library, self-contained.
export function StackRaceChart({ points }: { points: RacePoint[] }) {
  const model = useMemo(() => buildModel(points), [points])

  return (
    <Card title="Stack Race" className="h-full">
      {!model ? (
        <Empty>No stack snapshots yet — record a stack count on the console.</Empty>
      ) : (
        <div>
          <svg viewBox={`0 0 ${model.w} ${model.h}`} className="w-full" role="img" aria-label="Stack race over time">
            {model.gridY.map((gy) => (
              <line key={gy.y} x1={0} x2={model.w} y1={gy.y} y2={gy.y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            ))}
            {model.series.map((s, i) => (
              <g key={s.playerId}>
                <path d={s.path} fill="none" stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
                <circle cx={s.last.x} cy={s.last.y} r={3.5} fill={LINE_COLORS[i % LINE_COLORS.length]} />
              </g>
            ))}
          </svg>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {model.series.map((s, i) => (
              <div key={s.playerId} className="flex items-center gap-2 text-sm">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: LINE_COLORS[i % LINE_COLORS.length] }} />
                <span className="text-white/70">{s.name}</span>
                <span className="tnum text-white/40">{formatUSD(s.lastStack)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

interface Model {
  w: number
  h: number
  gridY: { y: number }[]
  series: {
    playerId: string
    name: string
    path: string
    last: { x: number; y: number }
    lastStack: number
  }[]
}

function buildModel(points: RacePoint[]): Model | null {
  if (points.length === 0) return null

  const w = 600
  const h = 260
  const pad = 8

  // Distinct capture timestamps become the x-axis steps.
  const times = Array.from(new Set(points.map((p) => p.captured_at))).sort()
  if (times.length < 1) return null
  const xFor = (t: string) => {
    const idx = times.indexOf(t)
    const denom = Math.max(times.length - 1, 1)
    return pad + (idx / denom) * (w - pad * 2)
  }

  const stacks = points.map((p) => p.stack_cents)
  const min = Math.min(...stacks)
  const max = Math.max(...stacks)
  const range = Math.max(max - min, 100)
  const yFor = (c: number) => pad + (1 - (c - min) / range) * (h - pad * 2)

  const byPlayer = new Map<string, { name: string; pts: { t: string; c: number }[] }>()
  for (const p of points) {
    if (!p.player_id) continue
    const entry = byPlayer.get(p.player_id) ?? { name: p.display_name, pts: [] }
    entry.pts.push({ t: p.captured_at, c: p.stack_cents })
    byPlayer.set(p.player_id, entry)
  }

  const series = Array.from(byPlayer.entries()).map(([playerId, { name, pts }]) => {
    const ordered = pts.sort((a, b) => a.t.localeCompare(b.t))
    const coords = ordered.map((pt) => ({ x: xFor(pt.t), y: yFor(pt.c) }))
    const path = coords.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ')
    return {
      playerId,
      name,
      path,
      last: coords[coords.length - 1],
      lastStack: ordered[ordered.length - 1].c,
    }
  })

  const gridY = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ y: pad + f * (h - pad * 2) }))
  return { w, h, gridY, series }
}
