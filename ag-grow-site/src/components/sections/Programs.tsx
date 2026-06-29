import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { PROGRAMS } from '../../lib/content'

export function Programs() {
  return (
    <section id="programs" className="relative bg-moss-50 py-24 text-moss-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-700 uppercase tracking-widest text-moss-500">
            Program options at a glance
          </span>
          <AnimatedHeadline
            onScroll
            as="h2"
            text="Two programs. One healthy lawn."
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight"
          />
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-lg text-moss-800/70">
              Choose the program that matches your expectations — then let us manage the
              timing and chemistry all season long.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PROGRAMS.map((program, i) => {
            const highlighted = program.badge != null
            return (
              <ScrollReveal
                key={program.id}
                delay={i * 0.12}
                className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
                  highlighted
                    ? 'border-moss-900 bg-moss-900 text-moss-50 shadow-2xl shadow-moss-900/20 lg:-translate-y-3'
                    : 'border-moss-200 bg-white hover:border-moss-300 hover:shadow-xl'
                }`}
              >
                {program.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-moss-400 px-4 py-1 text-xs font-700 uppercase tracking-wide text-moss-950">
                    {program.badge}
                  </span>
                )}

                <h3 className="font-display text-2xl font-600">{program.name}</h3>
                <p
                  className={`mt-1 text-sm font-600 uppercase tracking-wide ${
                    highlighted ? 'text-moss-300' : 'text-moss-500'
                  }`}
                >
                  {program.subtitle}
                </p>
                <p
                  className={`mt-4 text-[15px] leading-relaxed ${
                    highlighted ? 'text-moss-100/80' : 'text-moss-800/70'
                  }`}
                >
                  {program.description}
                </p>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {program.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-[15px]">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs ${
                          f.included
                            ? highlighted
                              ? 'bg-moss-400 text-moss-950'
                              : 'bg-moss-100 text-moss-600'
                            : 'bg-transparent text-moss-400/50 line-through'
                        }`}
                      >
                        {f.included ? '✓' : '–'}
                      </span>
                      <span
                        className={
                          f.included
                            ? highlighted
                              ? 'text-moss-50'
                              : 'text-moss-900'
                            : highlighted
                              ? 'text-moss-100/40'
                              : 'text-moss-800/40'
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-600 transition-all ${
                    highlighted
                      ? 'bg-moss-400 text-moss-950 hover:bg-moss-300'
                      : 'bg-moss-900 text-moss-50 hover:bg-moss-800'
                  }`}
                >
                  Get a quote for {program.name === 'Base Program' ? 'Base' : 'Turf Protection'}
                  <span>→</span>
                </a>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-moss-800/60">
            Every quote is based on your actual lawn square footage — measured on-site, not
            estimated. Aeration available as an add-on with either program.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
