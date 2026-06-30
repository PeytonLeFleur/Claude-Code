import { useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
}

/** Button that subtly pulls toward the cursor on hover. */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
  }

  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  const shared = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  }

  return href ? (
    <a href={href} {...shared}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} {...shared}>
      {children}
    </button>
  )
}
