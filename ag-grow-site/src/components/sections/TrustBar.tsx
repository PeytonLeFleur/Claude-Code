import { TRUST_POINTS } from '../../lib/content'

/**
 * Infinite horizontal marquee of source-backed proof points. Pure CSS animation
 * (paused under prefers-reduced-motion). Bridges the dark hero into the page.
 */
export function TrustBar() {
  // Duplicate the list so the track can loop seamlessly.
  const items = [...TRUST_POINTS, ...TRUST_POINTS]

  return (
    <section
      aria-label="Why customers choose Ag Grow Plus"
      className="relative border-y border-white/10 bg-moss-900 py-4 overflow-hidden"
    >
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((point, i) => (
          <div key={i} className="flex items-center gap-10" aria-hidden={i >= TRUST_POINTS.length}>
            <span className="flex items-center gap-2.5 text-sm font-600 text-moss-100/80">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-moss-400" />
              {point}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
