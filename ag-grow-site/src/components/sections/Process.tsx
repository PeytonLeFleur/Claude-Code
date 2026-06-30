import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { PROCESS } from '../../lib/content'

/**
 * Pinned horizontal scroll: the section locks and the four steps slide across
 * as the user scrolls. Falls back to a vertical stack on small screens and
 * with reduced motion.
 */
export function Process() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (reduced || !isDesktop) return

      const cards = gsap.utils.toArray<HTMLElement>('.process-card')
      const distance = track.current!.scrollWidth - window.innerWidth
      const end = () => `+=${distance + window.innerHeight * 0.5}`

      const horizontal = gsap.to(track.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end,
          invalidateOnRefresh: true,
        },
      })

      // progress bar tied to the same scroll range
      gsap.to('.process-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: section.current, scrub: true, start: 'top top', end },
      })

      // reveal each card's inner content as it scrolls into the viewport center
      cards.forEach((card) => {
        gsap.from(card.querySelector('.process-inner'), {
          opacity: 0,
          y: 40,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: 'left center',
          },
        })
      })
    },
    { scope: section },
  )

  return (
    <section
      id="how-it-works"
      ref={section}
      className="relative bg-moss-900 md:h-screen md:overflow-hidden"
    >
      <div className="md:flex md:h-full md:items-center">
        <div
          ref={track}
          className="flex flex-col gap-6 px-5 py-20 md:h-full md:w-max md:flex-row md:gap-0 md:px-0 md:py-0"
        >
          {/* Intro panel */}
          <div className="process-card flex flex-none flex-col justify-center md:h-full md:w-screen md:px-[8vw]">
            <div className="process-inner max-w-md">
              <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
                How it works
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-600 leading-tight text-moss-50">
                Four steps. Then we handle the rest.
              </h2>
              <p className="mt-5 text-lg text-moss-100/70">
                You approve once. We take it from there — timing every application to your
                lawn, not the calendar.
              </p>
              <span className="mt-8 hidden items-center gap-2 text-sm text-moss-300 md:inline-flex">
                Scroll to follow the process <span>→</span>
              </span>
            </div>
          </div>

          {/* Step panels */}
          {PROCESS.map((step) => (
            <div
              key={step.step}
              className="process-card flex flex-none flex-col justify-center md:h-full md:w-[60vw] md:px-[6vw] lg:w-[44vw]"
            >
              <div className="process-inner rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <span className="font-display text-7xl font-600 text-moss-400/30">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-3xl font-600 text-moss-50">
                  {step.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-moss-100/70">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 hidden h-1 w-full bg-white/10 md:block">
        <div className="process-progress h-full w-full origin-left scale-x-0 bg-moss-400" />
      </div>
    </section>
  )
}
