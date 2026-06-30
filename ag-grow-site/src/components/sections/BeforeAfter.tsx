import { useRef, useState, useCallback, useEffect } from 'react'
import { ScrollReveal } from '../animation/ScrollReveal'
import { AnimatedHeadline } from '../animation/AnimatedHeadline'

/**
 * Draggable before/after image scrubber. Uses the real Iowa-home photos:
 * an overgrown lawn revealing a freshly cut, striped lawn underneath.
 */
export function BeforeAfter() {
  const wrap = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(55)
  const [width, setWidth] = useState(0)
  const dragging = useRef(false)

  useEffect(() => {
    if (!wrap.current) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [])

  const setFromClientX = useCallback((clientX: number) => {
    const rect = wrap.current!.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(2, Math.min(98, pct)))
  }, [])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return
      setFromClientX(e.clientX)
    }
    const up = () => (dragging.current = false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [setFromClientX])

  return (
    <section className="relative bg-moss-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-700 uppercase tracking-widest text-moss-400">
            See the difference
          </span>
          <AnimatedHeadline
            onScroll
            as="h2"
            text="Drag to see a single visit."
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-600 leading-tight text-moss-50"
          />
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-lg text-moss-100/70">
              Overgrown and uneven on the left. Cut to a healthy 3.5", edged, and striped on
              the right — the same yard, same afternoon.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div
            ref={wrap}
            className="relative mt-12 aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-moss-950"
            onPointerDown={(e) => {
              dragging.current = true
              setFromClientX(e.clientX)
            }}
          >
            {/* After (full, underneath) */}
            <img
              src="/images/after-mow.jpg"
              alt="Freshly mowed and striped lawn"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-moss-400 px-3 py-1 text-xs font-700 uppercase tracking-wide text-moss-950">
              After
            </span>

            {/* Before (clipped overlay) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <img
                src="/images/before-mow.jpg"
                alt="Overgrown lawn before mowing"
                className="absolute inset-0 h-full max-w-none object-cover"
                style={{ width: width || '100%' }}
                draggable={false}
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-moss-950/70 px-3 py-1 text-xs font-700 uppercase tracking-wide text-moss-100 backdrop-blur-sm">
                Before
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 flex w-1 cursor-ew-resize items-center justify-center bg-moss-50"
              style={{ left: `calc(${pos}% - 2px)` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-50 text-moss-950 shadow-lg">
                <span className="text-sm">⟷</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-center text-sm text-moss-100/50">
            Drag the handle, or tap anywhere on the image.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
