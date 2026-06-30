import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { ServiceAreaMap } from './ServiceAreaMap'
import { SERVICE_AREA, BUSINESS } from '../../lib/content'

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="relative overflow-hidden bg-moss-900 py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
              Local knowledge, local crews
            </span>
            <AnimatedHeadline
              onScroll
              as="h2"
              text="Proudly serving Newton & Central Iowa."
              className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight text-moss-50"
            />
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-moss-100/70">
                We know this region’s soil, climate, and turf because we live and work here.
                Lawn-care programs are available across the entire area — mowing, leaf, and
                snow coverage vary by town, so call to confirm.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-moss-400 px-6 py-3 font-600 text-moss-950 transition-colors hover:bg-moss-300"
                >
                  Call {BUSINESS.phone}
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-600 text-moss-50 transition-colors hover:bg-white/5"
                >
                  Not listed? Ask us
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Coverage hub diagram */}
          <div className="mx-auto w-full max-w-md self-center">
            <ServiceAreaMap />
          </div>
        </div>

        {/* Full town list — readable text for SEO + screen readers */}
        <ScrollReveal
          stagger={0.025}
          className="mt-14 flex flex-wrap justify-center gap-2"
        >
          {SERVICE_AREA.map((town) => (
            <span
              key={town}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-moss-100/85"
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-moss-400" />
              {town}
            </span>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
