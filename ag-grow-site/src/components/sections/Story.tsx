import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { ABOUT } from '../../lib/content'

export function Story() {
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Subtle parallax on the accent image (#9 depth).
      gsap.fromTo(
        img.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-moss-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image with parallax */}
          <ScrollReveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <img
                ref={img}
                src="/images/lawn-care.jpg"
                alt="Close-up of healthy, well-maintained turf"
                loading="lazy"
                className="absolute inset-0 h-[116%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/50 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/10 bg-moss-900/95 px-6 py-4 backdrop-blur-sm sm:right-6">
              <div className="font-display text-3xl font-600 text-moss-300">1998</div>
              <div className="text-xs text-moss-100/60">Serving Central Iowa since</div>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <div>
            <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
              Our story
            </span>
            <AnimatedHeadline
              onScroll
              as="h2"
              text={ABOUT.heading}
              className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-600 leading-tight text-moss-50"
            />
            <ScrollReveal stagger={0.1} className="mt-6 space-y-4">
              {ABOUT.body.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-moss-100/70">
                  {p}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal stagger={0.08} className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5">
              {ABOUT.pillars.map((pillar) => (
                <div key={pillar.label} className="border-l-2 border-moss-400/40 pl-4">
                  <div className="font-display text-xl font-600 text-moss-50">
                    {pillar.value}
                  </div>
                  <div className="mt-0.5 text-sm text-moss-100/60">{pillar.label}</div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
