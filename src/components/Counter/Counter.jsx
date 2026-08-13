import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-white p-6 text-center shadow-card">
      <p className="font-mono-tag text-4xl font-semibold text-primary tabular-nums sm:text-5xl">
        {count}
        {suffix}
      </p>
      <div className="mx-auto mt-3 h-1 w-16 overflow-hidden rounded-full bg-accent">
        <div className="h-full bg-primary" style={{ '--fill': '100%' }} />
      </div>
      <p className="mt-3 font-mono-tag text-xs uppercase tracking-widest text-ink/60">{label}</p>
    </div>
  )
}
