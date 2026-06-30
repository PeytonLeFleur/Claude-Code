import { ScrollReveal } from '../animation/ScrollReveal'
import { SNOW_TIERS } from '../../lib/content'

export function SnowBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-moss-900 py-20">
      {/* snow image accent */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/snow-removal.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-moss-950 via-moss-950/85 to-moss-900/70" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-700 uppercase tracking-widest text-sky-soft">
              When winter hits
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,3rem)] font-600 leading-tight text-moss-50">
              Snow removal, priced by the storm.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-moss-100/70">
            Residential and commercial clearing with salt included. Choose per-event or a
            flat seasonal contract, and set your own trigger depth — 1", 2–3", or 4"+.
          </p>
        </div>

        <ScrollReveal stagger={0.1} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SNOW_TIERS.map((tier) => (
            <div
              key={tier.range}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <div className="font-display text-3xl font-600 text-moss-50">{tier.range}</div>
              <div className="mt-1 text-sm font-600 text-sky-soft">{tier.label}</div>
              <p className="mt-3 text-sm text-moss-100/65">{tier.detail}</p>
            </div>
          ))}
        </ScrollReveal>

        <p className="mt-6 text-xs text-moss-100/45">
          Minimum charge applies at the 1–3" tier. Current lawn-care program customers
          receive priority scheduling.
        </p>
      </div>
    </section>
  )
}
