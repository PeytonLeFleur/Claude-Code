import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { SERVICE_AREA } from '../../lib/content'

/**
 * Stylized coverage hub — Newton at the center, surrounding towns arranged in a
 * ring, with radar-style range rings that draw outward on scroll. This is an
 * abstract coverage diagram (not a literal geographic map); town names are also
 * rendered as text for SEO and screen readers via the sibling list.
 */
export function ServiceAreaMap() {
  const root = useRef<SVGSVGElement>(null)
  const towns = SERVICE_AREA.filter((t) => t !== 'Newton')
  const cx = 200
  const cy = 200
  const r = 150

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.fromTo(
        '.range-ring',
        { scale: 0, opacity: 0, transformOrigin: '200px 200px' },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        },
      )
      gsap.fromTo(
        '.town-node',
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.8)',
          delay: 0.4,
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        },
      )
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      viewBox="-48 -12 496 424"
      className="h-full w-full"
      role="img"
      aria-label="Coverage hub centered on Newton, Iowa, surrounded by the communities we serve"
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#66a05c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#66a05c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={r + 20} fill="url(#hubGlow)" />

      {/* range rings */}
      {[60, 105, 150].map((rr) => (
        <circle
          key={rr}
          className="range-ring"
          cx={cx}
          cy={cy}
          r={rr}
          fill="none"
          stroke="#66a05c"
          strokeOpacity={0.28}
          strokeWidth={1}
          strokeDasharray="3 5"
        />
      ))}

      {/* spokes + town nodes */}
      {towns.map((town, i) => {
        const angle = (i / towns.length) * Math.PI * 2 - Math.PI / 2
        const tx = cx + Math.cos(angle) * r
        const ty = cy + Math.sin(angle) * r
        const labelAnchor = Math.cos(angle) > 0.25 ? 'start' : Math.cos(angle) < -0.25 ? 'end' : 'middle'
        const lx = cx + Math.cos(angle) * (r + 10)
        const ly = cy + Math.sin(angle) * (r + 10)
        return (
          <g key={town} className="town-node">
            <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#66a05c" strokeOpacity={0.12} strokeWidth={1} />
            <circle cx={tx} cy={ty} r={3.5} fill="#97c290" />
            <text
              x={lx}
              y={ly}
              fill="#c4ddc0"
              fontSize="9"
              textAnchor={labelAnchor}
              dominantBaseline="middle"
              className="font-sans"
            >
              {town}
            </text>
          </g>
        )
      })}

      {/* Newton hub */}
      <circle cx={cx} cy={cy} r={7} fill="#45823c">
        <animate attributeName="r" values="7;9;7" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={11} fill="none" stroke="#66a05c" strokeWidth={1.5} />
      <text x={cx} y={cy + 26} fill="#f3f8f2" fontSize="12" fontWeight="600" textAnchor="middle">
        Newton
      </text>
    </svg>
  )
}
