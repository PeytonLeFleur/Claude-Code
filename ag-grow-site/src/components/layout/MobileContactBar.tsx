import { useEffect, useState } from 'react'
import { BUSINESS } from '../../lib/content'

/**
 * Sticky bottom bar on mobile only: tap-to-call + jump to the quote form.
 * Keeps the two primary conversion actions one tap away. Hidden on md+ where
 * the header already exposes both. Appears after the user scrolls past the hero
 * so it never covers the hero CTAs on first paint.
 */
export function MobileContactBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-white/10 bg-moss-950/95 px-3 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={BUSINESS.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-moss-400/40 py-3 text-sm font-600 text-moss-100"
        aria-label={`Call Ag Grow Plus at ${BUSINESS.phone}`}
      >
        <span aria-hidden="true">📞</span> Call now
      </a>
      <a
        href="#quote"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-moss-400 py-3 text-sm font-700 text-moss-950"
      >
        Get a Quote
      </a>
    </div>
  )
}
