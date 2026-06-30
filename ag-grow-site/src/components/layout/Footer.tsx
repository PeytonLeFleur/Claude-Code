import { BUSINESS, SERVICES } from '../../lib/content'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-moss-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-moss-50">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-600">
                Ag Grow <span className="text-moss-300">Plus</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-moss-100/55">
              Professional lawn care, mowing, leaf removal, and snow removal for Newton & the
              surrounding area since {BUSINESS.since}.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-700 uppercase tracking-widest text-moss-100/40">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-moss-100/70 transition-colors hover:text-moss-300"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-700 uppercase tracking-widest text-moss-100/40">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Programs', href: '#programs' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Service Area', href: '#service-area' },
                { label: 'Request a Quote', href: '#quote' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-moss-100/70 transition-colors hover:text-moss-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-700 uppercase tracking-widest text-moss-100/40">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-moss-100/70">
              <li>
                <a href={BUSINESS.phoneHref} className="hover:text-moss-300">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={BUSINESS.emailHref} className="hover:text-moss-300">
                  {BUSINESS.email}
                </a>
              </li>
              <li>{BUSINESS.mailing}</li>
              <li className="pt-2 text-moss-100/50">{BUSINESS.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-moss-100/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. Serving Central Iowa since{' '}
            {BUSINESS.since}.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-moss-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-moss-300">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
