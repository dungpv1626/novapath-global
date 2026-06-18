'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { count: '12500', suffix: '+', label: 'Học viên thành công' },
  { count: '98', suffix: '%', label: 'Tỷ lệ đậu visa' },
  { count: '350', suffix: ' tỷ', label: 'Học bổng đã giành (VNĐ)' },
  { count: '20', suffix: '+', label: 'Tỉnh/thành tại TQ' },
]

export default function HomeStats() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const counters = container.querySelectorAll<HTMLElement>('[data-count]')
    if (!('IntersectionObserver' in window)) {
      counters.forEach((el) => { el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '') })
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        const target = parseFloat(el.dataset.count || '0')
        const suffix = el.dataset.suffix || ''
        const dur = 1600
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.round(target * eased).toLocaleString('vi-VN') + suffix
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = Math.round(target).toLocaleString('vi-VN') + suffix
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })
    counters.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-navy" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] grid grid-cols-2 xl:grid-cols-4 gap-[30px]">
        {stats.map((s, i) => (
          <div key={s.label} className={`text-center reveal ${i > 0 ? `reveal-d${i}` : ''}`}>
            <div
              className="font-[family-name:var(--font-head)] font-bold leading-none"
              style={{
                fontSize: 'clamp(40px,5.5vw,58px)',
                background: 'linear-gradient(120deg,#38bdf8,#fff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              data-count={s.count}
              data-suffix={s.suffix}
            >
              0
            </div>
            <div className="mt-[10px] text-[#a9bdde] text-[15px] font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
