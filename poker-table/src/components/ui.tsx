import type { ReactNode } from 'react'
import { formatDelta } from '@/lib/domain/money'

export function Card({
  title,
  children,
  className = '',
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-black/40 ${className}`}
    >
      {title ? (
        <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium tracking-widest text-white/40 uppercase">{label}</div>
      <div className="tnum mt-1 text-3xl font-semibold text-white">{value}</div>
    </div>
  )
}

/** Green for up, red for down, dimmed at zero. */
export function Money({ cents, className = '' }: { cents: number; className?: string }) {
  const tone = cents > 0 ? 'text-emerald-400' : cents < 0 ? 'text-red-400' : 'text-white/50'
  return <span className={`tnum ${tone} ${className}`}>{formatDelta(cents)}</span>
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="py-6 text-center text-sm text-white/30">{children}</div>
}
