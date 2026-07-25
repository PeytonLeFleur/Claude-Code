'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr(null)
    try {
      const res = await fetch('/api/console/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) throw new Error('Wrong password')
      router.push('/console')
      router.refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h1 className="text-xl font-semibold text-white">Console access</h1>
        <p className="mt-1 text-sm text-white/40">Enter the operator password.</p>
        <input
          type="password"
          autoFocus
          className="mt-4 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err ? <p className="mt-2 text-sm text-red-400">{err}</p> : null}
        <button className="mt-4 w-full rounded-lg bg-emerald-500 py-2 font-medium text-black hover:bg-emerald-400 disabled:opacity-40" disabled={busy}>
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </main>
  )
}
