import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { MagneticButton } from '../animation/MagneticButton'
import { BUSINESS, STATS } from '../../lib/content'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Subtle parallax + slow zoom on the hero image as the user scrolls.
      if (!reduced) {
        gsap.to(bg.current, {
          yPercent: 18,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Fade up the supporting content under the headline.
      gsap.fromTo(
        '.hero-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.5 },
      )

      // Count the stat numbers up once.
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
          const target = Number(el.dataset.value)
          if (!target) return // leave non-numeric stats (e.g. "1998") as-is
          const suffix = el.dataset.suffix ?? ''
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            delay: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.v) + suffix
            },
          })
        })
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Parallax background image */}
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <img
          src="/images/after-mow.jpg"
          alt="Freshly mowed and striped green lawn in front of an Iowa home"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      {/* Tonal gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-moss-950/80 via-moss-950/45 to-moss-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-moss-950/75 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
        <span className="hero-fade mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-moss-300/30 bg-moss-300/10 px-4 py-1.5 text-xs font-600 uppercase tracking-wider text-moss-200 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-moss-300" />
          Serving Newton & Central Iowa since {BUSINESS.since}
        </span>

        <AnimatedHeadline
          as="h1"
          text="A lawn that looks like it’s cared for. Because it is."
          className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-600 leading-[0.98] text-moss-50"
        />

        <p className="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-moss-100/85 sm:text-xl">
          Professional turf management built on proper timing, proven chemistry, and
          structural soil health — plus mowing, leaf removal, and snow removal all year round.
        </p>

        <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-moss-400 px-8 py-4 text-base font-600 text-moss-950 shadow-xl shadow-moss-950/40 transition-colors hover:bg-moss-300"
          >
            Get a Free Quote
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton
            href="#programs"
            className="inline-flex items-center gap-2 rounded-full border border-moss-100/25 px-8 py-4 text-base font-600 text-moss-50 backdrop-blur-sm transition-colors hover:bg-white/5"
          >
            View Lawn Care Programs
          </MagneticButton>
        </div>

        {/* Stat strip */}
        <dl className="hero-fade mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {STATS.map((s) => {
            const numeric = /^\d+$/.test(s.value.replace(/\D/g, '')) && s.value !== '1998'
            const num = Number(s.value.replace(/\D/g, ''))
            const suffix = s.value.replace(/[\d]/g, '')
            return (
              <div key={s.label}>
                <dd
                  className="stat-num font-display text-3xl font-600 text-moss-200 sm:text-4xl"
                  data-value={numeric ? num : ''}
                  data-suffix={suffix}
                >
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs leading-snug text-moss-100/60">{s.label}</dt>
              </div>
            )
          })}
        </dl>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-moss-100/50 sm:flex">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-moss-100/50 to-transparent" />
      </div>
    </section>
  )
}
