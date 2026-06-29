import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { WHY_TIMING, TIMELINE } from '../../lib/content'

const SEASON_STYLES: Record<string, string> = {
  moss: 'from-moss-500/20 text-moss-300 ring-moss-400/30',
  wheat: 'from-wheat-400/20 text-wheat-400 ring-wheat-400/30',
  sky: 'from-sky-soft/20 text-sky-soft ring-sky-soft/30',
}

export function WhyTiming() {
  return (
    <section className="relative overflow-hidden bg-moss-950 py-24 sm:py-32">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-moss-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: the thesis */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
              Why timing wins
            </span>
            <AnimatedHeadline
              onScroll
              as="h2"
              text="Why individual treatments fail."
              className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight text-moss-50"
            />
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-moss-100/70">
                Anyone can spray a lawn. Results come from doing the right thing at the
                right moment — and never skipping a step. That’s the whole job, and it’s
                what nearly three decades of local experience buys you.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: reasons */}
          <ScrollReveal stagger={0.12} className="grid gap-4 sm:grid-cols-2">
            {WHY_TIMING.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-moss-400/30 hover:bg-white/[0.05]"
              >
                <span className="font-display text-2xl font-600 text-moss-400/40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-600 text-moss-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-moss-100/65">
                  {item.body}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* Seasonal timeline */}
        <div className="mt-24">
          <ScrollReveal>
            <h3 className="text-center font-display text-2xl font-600 text-moss-50 sm:text-3xl">
              A full season, mapped out for you
            </h3>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TIMELINE.map((season, i) => (
              <ScrollReveal
                key={season.season}
                delay={i * 0.12}
                className={`relative rounded-2xl bg-gradient-to-b ${
                  SEASON_STYLES[season.color]
                } to-transparent p-6 ring-1`}
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="font-display text-2xl font-600 text-moss-50">
                    {season.season}
                  </h4>
                  <span className="text-xs font-600 uppercase tracking-wide opacity-80">
                    {season.months}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {season.steps.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-2.5 text-sm text-moss-100/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-current" />
                      {step}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
