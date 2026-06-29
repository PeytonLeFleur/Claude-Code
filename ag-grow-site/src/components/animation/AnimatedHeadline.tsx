import { useRef, type ElementType } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** Trigger on scroll instead of immediately on mount. */
  onScroll?: boolean
}

/**
 * Word-by-word kinetic reveal. Splits on spaces, wraps each word in an
 * overflow-hidden mask, and slides words up with a stagger.
 */
export function AnimatedHeadline({ text, as: Tag = 'h2', className, onScroll }: Props) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')

  useGSAP(
    () => {
      const inner = ref.current!.querySelectorAll('.word-inner')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(inner, { y: 0, opacity: 1 })
        return
      }
      gsap.fromTo(
        inner,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.06,
          ease: 'power4.out',
          scrollTrigger: onScroll
            ? { trigger: ref.current, start: 'top 82%' }
            : undefined,
          delay: onScroll ? 0 : 0.15,
        },
      )
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <span className="word-inner inline-block">{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
