'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { parseDollarsToCents, DEFAULT_BUYIN_CENTS } from '@/lib/domain/money'
import type { Hand, Player, Season } from '@/lib/supabase/types'

async function postJSON<T = unknown>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

const input =
  'w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder-white/30 focus:border-emerald-400 focus:outline-none'
const btn =
  'rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400 disabled:opacity-40'
const btnGhost =
  'rounded-lg border border-white/15 px-4 py-2 font-medium text-white transition hover:bg-white/5 disabled:opacity-40'

function Err({ msg }: { msg: string | null }) {
  if (!msg) return null
  return <p className="mt-2 text-sm text-red-400">{msg}</p>
}

// ---------------------------------------------------------------------------

export function CreateSeasonForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      await postJSON('/api/console/season', { name })
      setName('')
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex gap-2">
      <input className={input} placeholder="Season name" value={name} onChange={(e) => setName(e.target.value)} />
      <button className={btn} disabled={busy || !name.trim()} onClick={submit}>
        Create
      </button>
      <Err msg={err} />
    </div>
  )
}

export function StartNightForm({ seasons }: { seasons: Season[] }) {
  const router = useRouter()
  const [seasonId, setSeasonId] = useState(seasons[0]?.id ?? '')
  const [label, setLabel] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const { night } = await postJSON<{ night: { id: string } }>('/api/console/night', {
        action: 'start',
        seasonId,
        label: label || null,
      })
      router.push(`/console/night/${night.id}`)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <select className={input + ' max-w-xs'} value={seasonId} onChange={(e) => setSeasonId(e.target.value)}>
        {seasons.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <input className={input + ' max-w-xs'} placeholder="Night label (optional)" value={label} onChange={(e) => setLabel(e.target.value)} />
      <button className={btn} disabled={busy || !seasonId} onClick={submit}>
        Start night
      </button>
      <Err msg={err} />
    </div>
  )
}

export function SeatPlayersForm({
  nightId,
  players,
  currentNames,
}: {
  nightId: string
  players: Player[]
  currentNames: string[]
}) {
  const router = useRouter()
  const [text, setText] = useState(currentNames.join('\n'))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const names = text.split('\n').map((n) => n.trim()).filter(Boolean)
      const byName = new Map(players.map((p) => [p.display_name.toLowerCase(), p.id]))
      const seats = names.map((name, i) => {
        const existing = byName.get(name.toLowerCase())
        return existing ? { seat: i, playerId: existing } : { seat: i, newName: name }
      })
      await postJSON('/api/console/seat', { nightId, seats })
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <textarea
        className={input + ' h-32 font-mono text-sm'}
        placeholder="One player per line, in seat order"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={btn + ' mt-2'} disabled={busy} onClick={submit}>
        Save seats
      </button>
      <Err msg={err} />
    </div>
  )
}

export function BuyInForm({ nightId, players }: { nightId: string; players: Player[] }) {
  const router = useRouter()
  const [playerId, setPlayerId] = useState(players[0]?.id ?? '')
  const [amount, setAmount] = useState((DEFAULT_BUYIN_CENTS / 100).toFixed(2))
  const [kind, setKind] = useState<'buyin' | 'rebuy'>('buyin')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const cents = parseDollarsToCents(amount)
      if (cents == null || cents <= 0) throw new Error('Enter a dollar amount')
      await postJSON('/api/console/buyin', { nightId, playerId, amountCents: cents, kind })
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select className={input + ' max-w-[10rem]'} value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.display_name}
          </option>
        ))}
      </select>
      <select className={input + ' max-w-[7rem]'} value={kind} onChange={(e) => setKind(e.target.value as 'buyin' | 'rebuy')}>
        <option value="buyin">Buy-in</option>
        <option value="rebuy">Rebuy</option>
      </select>
      <input className={input + ' max-w-[7rem]'} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className={btn} disabled={busy || !playerId} onClick={submit}>
        Add
      </button>
      <Err msg={err} />
    </div>
  )
}

export function OpenHandButton({ nightId, disabled }: { nightId: string; disabled?: boolean }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      await postJSON('/api/console/hand', { action: 'open', nightId })
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <button className={btn} disabled={busy || disabled} onClick={submit}>
        Open new hand
      </button>
      <Err msg={err} />
    </div>
  )
}

export function RecordResultForm({
  openHand,
  seatedPlayers,
}: {
  openHand: Hand | null
  seatedPlayers: Player[]
}) {
  const router = useRouter()
  const [winnerId, setWinnerId] = useState(seatedPlayers[0]?.id ?? '')
  const [pot, setPot] = useState('')
  const [sevenTwo, setSevenTwo] = useState(false)
  const [folded, setFolded] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  if (!openHand) {
    return <p className="text-sm text-white/40">Open a hand to record a result.</p>
  }

  function toggleFold(id: string) {
    setFolded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const potCents = pot ? parseDollarsToCents(pot) : null
      if (pot && potCents == null) throw new Error('Bad pot amount')
      await postJSON('/api/console/hand', {
        action: 'result',
        handId: openHand!.id,
        winnerPlayerId: winnerId,
        potCents,
        sevenTwo,
        foldedPlayerIds: Array.from(folded),
      })
      setPot('')
      setSevenTwo(false)
      setFolded(new Set())
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-white/50">Hand #{openHand.hand_no} · dealer seat {openHand.dealer_seat}</div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm text-white/60">Winner</label>
        <select className={input + ' max-w-[12rem]'} value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
          {seatedPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.display_name}
            </option>
          ))}
        </select>
        <input className={input + ' max-w-[8rem]'} placeholder="Pot $" value={pot} onChange={(e) => setPot(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={sevenTwo} onChange={(e) => setSevenTwo(e.target.checked)} />
          Won with 7‑2
        </label>
      </div>
      <div>
        <div className="mb-1 text-xs tracking-widest text-white/40 uppercase">Folded</div>
        <div className="flex flex-wrap gap-2">
          {seatedPlayers.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleFold(p.id)}
              className={`rounded-full border px-3 py-1 text-sm ${folded.has(p.id) ? 'border-red-400/60 bg-red-500/20 text-red-200' : 'border-white/15 text-white/60'}`}
            >
              {p.display_name}
            </button>
          ))}
        </div>
      </div>
      <button className={btn} disabled={busy || !winnerId} onClick={submit}>
        Record result
      </button>
      <Err msg={err} />
    </div>
  )
}

export function SnapshotForm({
  nightId,
  handId,
  seatedPlayers,
}: {
  nightId: string
  handId: string | null
  seatedPlayers: Player[]
}) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const stacks = seatedPlayers
        .map((p) => ({ playerId: p.id, cents: parseDollarsToCents(values[p.id] ?? '') }))
        .filter((s) => s.cents != null && s.cents >= 0)
        .map((s) => ({ playerId: s.playerId, stackCents: s.cents as number }))
      if (stacks.length === 0) throw new Error('Enter at least one stack')
      await postJSON('/api/console/snapshot', { nightId, handId, stacks })
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {seatedPlayers.map((p) => (
          <label key={p.id} className="text-sm text-white/70">
            {p.display_name}
            <input
              className={input + ' mt-1'}
              placeholder="$"
              value={values[p.id] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [p.id]: e.target.value }))}
            />
          </label>
        ))}
      </div>
      <button className={btn} disabled={busy} onClick={submit}>
        Snapshot stacks
      </button>
      <Err msg={err} />
    </div>
  )
}

export function TransferForm({ nightId, players }: { nightId: string; players: Player[] }) {
  const router = useRouter()
  const [fromId, setFromId] = useState(players[0]?.id ?? '')
  const [toId, setToId] = useState(players[1]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      const cents = parseDollarsToCents(amount)
      if (cents == null || cents <= 0) throw new Error('Enter an amount')
      await postJSON('/api/console/transfer', { nightId, fromPlayerId: fromId, toPlayerId: toId, amountCents: cents })
      setAmount('')
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select className={input + ' max-w-[9rem]'} value={fromId} onChange={(e) => setFromId(e.target.value)}>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.display_name}
          </option>
        ))}
      </select>
      <span className="text-white/40">→</span>
      <select className={input + ' max-w-[9rem]'} value={toId} onChange={(e) => setToId(e.target.value)}>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.display_name}
          </option>
        ))}
      </select>
      <input className={input + ' max-w-[7rem]'} placeholder="$" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className={btnGhost} disabled={busy} onClick={submit}>
        Transfer
      </button>
      <Err msg={err} />
    </div>
  )
}

export function RevealButton({ nightId }: { nightId: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [confirm, setConfirm] = useState(false)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      await postJSON('/api/console/night', { action: 'reveal', nightId })
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      {confirm ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">Close the night and reveal hole cards?</span>
          <button className={btn} disabled={busy} onClick={submit}>
            Yes, reveal
          </button>
          <button className={btnGhost} onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button className={btnGhost} onClick={() => setConfirm(true)}>
          Mark revealed
        </button>
      )}
      <Err msg={err} />
    </div>
  )
}

export function MarkBonusPaid({ bonusId, paid }: { bonusId: string; paid: boolean }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function toggle() {
    setBusy(true)
    try {
      await postJSON('/api/console/bonus', { bonusId, paid: !paid })
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      className={`rounded-full px-2.5 py-0.5 text-xs ${paid ? 'bg-emerald-500/20 text-emerald-300' : 'border border-white/15 text-white/50'}`}
      disabled={busy}
      onClick={toggle}
    >
      {paid ? 'paid' : 'mark paid'}
    </button>
  )
}
