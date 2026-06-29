import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'
import { FAQS, BUSINESS } from '../../lib/content'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-moss-50 py-24 text-moss-950 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-sm font-700 uppercase tracking-widest text-moss-500">
            Questions, answered
          </span>
          <AnimatedHeadline
            onScroll
            as="h2"
            text="Good to know before you call."
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight"
          />
        </div>

        <ScrollReveal stagger={0.07} className="mt-12 divide-y divide-moss-200">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-10 text-center text-moss-800/70">
            Still have a question?{' '}
            <a href={BUSINESS.phoneHref} className="font-600 text-moss-600 underline">
              Call {BUSINESS.phone}
            </a>{' '}
            or{' '}
            <a href="#quote" className="font-600 text-moss-600 underline">
              request a quote
            </a>
            .
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const panel = useRef<HTMLDivElement>(null)
  const id = question.replace(/\W+/g, '-').toLowerCase()

  // Animate the panel height when it opens/closes (skips under reduced motion).
  const handleToggle = () => {
    onToggle()
    const el = panel.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!isOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }

  return (
    <div>
      <h3>
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-${id}`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-lg font-600 text-moss-950 sm:text-xl">
            {question}
          </span>
          <span
            className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-moss-100 text-moss-600 transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`faq-${id}`}
        ref={panel}
        className="overflow-hidden"
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p className="pb-6 text-[15px] leading-relaxed text-moss-800/80">{answer}</p>
      </div>
    </div>
  )
}
