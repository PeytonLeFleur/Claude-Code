'use client'

import { useCallback, useEffect, useState } from 'react'
import { formatUSD, formatDelta } from '@/lib/domain/money'
import type { SettleResult } from '@/lib/domain/settle'

export function SettleView({ nightId }: { nightId: string }) {
  const [result, setResult] = useState<SettleResult | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const compute = useCallback(async () => {
    setBusy(true)
    setErr(null)
    try {
      const res = await fetch('/api/console/settle', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nightId }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setResult((await res.json()) as SettleResult)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }, [nightId])

  useEffect(() => {
    void compute()
  }, [compute])

  return (
    <div className="space-y-6">
      <button
        className="rounded-lg border border-white/15 px-4 py-2 text-white hover:bg-white/5 disabled:opacity-40"
        disabled={busy}
        onClick={compute}
      >
        {busy ? 'Computing…' : 'Recompute'}
      </button>

      {err ? <p className="text-red-400">{err}</p> : null}

      {result ? (
        <>
          {!result.balanced ? (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200">
              Books don&apos;t balance by {formatUSD(Math.abs(result.imbalanceCents))} — check final
              chip counts before paying out.
            </div>
          ) : (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200">
              Balanced. {result.payments.length} payment{result.payments.length === 1 ? '' : 's'} settle the night.
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <section>
              <h3 className="mb-2 text-xs tracking-widest text-white/40 uppercase">Net</h3>
              <ul className="space-y-1">
                {[...result.nets]
                  .sort((a, b) => b.netCents - a.netCents)
                  .map((n) => (
                    <li key={n.playerId} className="flex justify-between">
                      <span className="text-white">{n.name}</span>
                      <span className={`tnum ${n.netCents >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatDelta(n.netCents)}
                      </span>
                    </li>
                  ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-xs tracking-widest text-white/40 uppercase">Payments</h3>
              {result.payments.length === 0 ? (
                <p className="text-white/40">Nothing to settle.</p>
              ) : (
                <ul className="space-y-1">
                  {result.payments.map((p, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-white">
                        {p.fromName} <span className="text-white/40">pays</span> {p.toName}
                      </span>
                      <span className="tnum text-white">{formatUSD(p.amountCents)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      ) : null}
    </div>
  )
}
