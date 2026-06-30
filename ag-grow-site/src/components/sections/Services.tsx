import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { SERVICES } from '../../lib/content'

export function Services() {
  return (
    <section id="services" className="relative bg-moss-50 py-24 text-moss-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-700 uppercase tracking-widest text-moss-500">
              Everything your property needs
            </span>
            <AnimatedHeadline
              onScroll
              as="h2"
              text="One local team, all four seasons."
              className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight"
            />
          </div>
          <ScrollReveal>
            <p className="max-w-sm text-moss-800/70">
              From spring green-up to the first snowfall, Ag Grow Plus keeps your lawn and
              property handled — so you never have to juggle vendors.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ScrollReveal
              key={service.id}
              delay={(i % 2) * 0.1}
              className="group relative overflow-hidden rounded-3xl bg-moss-900"
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-moss-950/60 px-3 py-1 text-xs font-600 uppercase tracking-wide text-moss-100 backdrop-blur-sm">
                  {service.kicker}
                </span>
              </div>

              {/* body */}
              <div className="relative -mt-16 p-7">
                <h3 className="font-display text-2xl font-600 text-moss-50">
                  {service.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-moss-100/70">
                  {service.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-moss-100/80"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-600 text-moss-300 transition-colors hover:text-moss-200"
                >
                  Request this service
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
