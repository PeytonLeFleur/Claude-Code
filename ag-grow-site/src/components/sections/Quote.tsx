import { useState, type FormEvent } from 'react'
import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { BUSINESS, SERVICE_TYPES, SERVICE_AREA } from '../../lib/content'

const FIELD =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-moss-50 placeholder:text-moss-100/35 outline-none transition-colors focus:border-moss-400/60 focus:bg-white/[0.06]'

export function Quote() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const body = [
      `Service: ${get('service')}`,
      `Name: ${get('name')}`,
      `Phone: ${get('phone')}`,
      `Email: ${get('email')}`,
      `Address: ${get('address')}, ${get('city')}, IA`,
      '',
      `Notes: ${get('notes') || '—'}`,
    ].join('\n')

    // No backend in this static build — hand off to the visitor's mail client.
    window.location.href = `${BUSINESS.emailHref}?subject=${encodeURIComponent(
      `Quote request — ${get('service')}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="quote" className="relative overflow-hidden bg-moss-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-moss-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Pitch */}
          <div>
            <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
              Request a quote
            </span>
            <AnimatedHeadline
              onScroll
              as="h2"
              text="Tell us about your property."
              className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight text-moss-50"
            />
            <p className="mt-6 text-lg leading-relaxed text-moss-100/70">
              We’ll measure your actual lawn square footage and send a custom quote —
              typically within 48 hours. No pressure, no obligation.
            </p>

            <dl className="mt-10 space-y-5">
              {[
                { label: 'Call or text', value: BUSINESS.phone, href: BUSINESS.phoneHref },
                { label: 'Email', value: BUSINESS.email, href: BUSINESS.emailHref },
                { label: 'Hours', value: BUSINESS.hours },
                { label: 'Mailing', value: BUSINESS.mailing },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-moss-400/40 pl-4">
                  <dt className="text-xs font-600 uppercase tracking-wide text-moss-100/50">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-moss-50">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-moss-300">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-9">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss-400 text-3xl text-moss-950">
                    ✓
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-600 text-moss-50">
                    Thanks — your email is ready to send.
                  </h3>
                  <p className="mt-3 max-w-sm text-moss-100/70">
                    We’ve opened your mail app with the details filled in. Prefer to talk?
                    Call us anytime at{' '}
                    <a href={BUSINESS.phoneHref} className="text-moss-300 underline">
                      {BUSINESS.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-sm font-600 text-moss-300 hover:text-moss-200"
                  >
                    ← Edit my request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-moss-100/80">
                      What do you need? *
                    </label>
                    <select name="service" required defaultValue="" className={FIELD}>
                      <option value="" disabled>
                        Select a service…
                      </option>
                      {SERVICE_TYPES.map((s) => (
                        <option key={s} value={s} className="bg-moss-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="name" label="Full name *" placeholder="Jane Doe" required />
                    <Input
                      name="phone"
                      label="Phone *"
                      type="tel"
                      placeholder="(641) 555-0123"
                      required
                    />
                  </div>

                  <Input
                    name="email"
                    label="Email *"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />

                  <Input
                    name="address"
                    label="Street address *"
                    placeholder="123 Maple St"
                    required
                  />

                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-moss-100/80">
                      City *
                    </label>
                    <select name="city" required defaultValue="" className={FIELD}>
                      <option value="" disabled>
                        Select your town…
                      </option>
                      {SERVICE_AREA.map((c) => (
                        <option key={c} value={c} className="bg-moss-900">
                          {c}
                        </option>
                      ))}
                      <option value="Other" className="bg-moss-900">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-moss-100/80">
                      Anything else? (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Lawn size, problem areas, timing…"
                      className={FIELD}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-moss-400 px-6 py-4 text-base font-700 text-moss-950 transition-all hover:bg-moss-300 hover:shadow-lg hover:shadow-moss-400/20"
                  >
                    Send my request →
                  </button>
                  <p className="text-center text-xs text-moss-100/40">
                    By submitting you agree to be contacted about your quote. We never share
                    your information.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Input({
  name,
  label,
  type = 'text',
  placeholder,
  required,
}: {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-600 text-moss-100/80">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={FIELD}
      />
    </div>
  )
}
