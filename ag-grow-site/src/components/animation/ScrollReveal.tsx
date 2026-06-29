import { useRef, type ReactNode, type ElementType } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  y?: number
  delay?: number
  duration?: number
  /** Stagger direct children instead of revealing the wrapper as one block. */
  stagger?: number
}

/** Fades + lifts content into view on scroll. Respects reduced-motion via CSS fallback. */
export function ScrollReveal({
  children,
  as: Tag = 'div',
  className,
  y = 44,
  delay = 0,
  duration = 0.9,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const targets =
        stagger != null ? (ref.current!.children as unknown as HTMLElement[]) : ref.current
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          delay,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
