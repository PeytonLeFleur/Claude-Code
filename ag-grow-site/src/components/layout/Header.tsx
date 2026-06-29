import { useEffect, useState } from 'react'
import { BUSINESS } from '../../lib/content'
import { Logo } from './Logo'

const NAV = [
  { label: 'Programs', href: '#programs' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Service Area', href: '#service-area' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link for whichever section is in view.
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-moss-950/85 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-moss-50">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-600 leading-none">
            Ag Grow <span className="text-moss-300">Plus</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-sm font-500 transition-colors hover:text-moss-50 ${
                  isActive ? 'text-moss-50' : 'text-moss-100/80'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-moss-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden text-sm font-600 text-moss-100 transition-colors hover:text-moss-300 lg:block"
          >
            {BUSINESS.phone}
          </a>
          <a
            href="#quote"
            className="hidden rounded-full bg-moss-400 px-5 py-2.5 text-sm font-600 text-moss-950 transition-all hover:bg-moss-300 hover:shadow-lg hover:shadow-moss-400/20 sm:block"
          >
            Get a Quote
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-moss-50 md:hidden"
          >
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mx-4 mt-3 flex flex-col gap-1 rounded-2xl border border-white/10 bg-moss-900/95 p-3 backdrop-blur-md md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-moss-100 transition-colors hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-moss-400 px-4 py-3 text-center font-600 text-moss-950"
          >
            Get a Quote
          </a>
        </nav>
      )}
    </header>
  )
}
