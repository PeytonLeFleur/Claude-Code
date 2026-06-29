import { useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'

type Props = {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. Keep small for a premium (not gimmicky) feel. */
  max?: number
}

/**
 * Subtle pointer-driven 3D tilt + lift, with a soft highlight that follows the
 * cursor. Disabled on touch devices and under prefers-reduced-motion. Animation
 * only — carries no content of its own.
 */
export function TiltCard({ children, className = '', max = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: (0.5 - py) * max * 2,
      y: -6,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
      transformOrigin: 'center',
    })
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card relative ${className}`}
    >
      {children}
    </div>
  )
}
