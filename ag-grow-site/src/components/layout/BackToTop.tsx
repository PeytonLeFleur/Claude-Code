import { useEffect, useState } from 'react'

/**
 * Back-to-top button. Appears after the user scrolls past one viewport.
 * Positioned to clear the mobile contact bar. Keyboard-accessible and
 * reduced-motion-aware.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed right-5 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-moss-900/90 text-moss-50 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-moss-800 md:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        ↑
      </span>
    </button>
  )
}
