import { useEffect, type ReactNode } from 'react'
import { useLenis } from '../../hooks/useLenis'
import { ScrollTrigger } from '../../lib/gsap'

export function PageShell({ children }: { children: ReactNode }) {
  useLenis()

  // Refresh ScrollTrigger once everything (incl. images) has settled.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => window.clearTimeout(id)
  }, [])

  return (
    <main id="main-content" className="relative">
      {children}
    </main>
  )
}
