'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useCounter() {
  const containerRef = useRef<HTMLElement | null>(null)

  const animateCount = useCallback((el: HTMLElement) => {
    const target = parseFloat(el.dataset.count || '0')
    const suffix = el.dataset.suffix || ''
    const prefix = el.dataset.prefix || ''
    const dur = 1600
    const start = performance.now()
    const dec = (el.dataset.count?.split('.')[1] || '').length

    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = target * eased
      el.textContent =
        prefix +
        (dec ? val.toFixed(dec) : Math.round(val).toLocaleString('vi-VN')) +
        suffix
      if (p < 1) requestAnimationFrame(step)
      else
        el.textContent =
          prefix +
          (dec ? target.toFixed(dec) : Math.round(target).toLocaleString('vi-VN')) +
          suffix
    }
    requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const counters = container.querySelectorAll<HTMLElement>('[data-count]')
    if (!counters.length) return

    if (!('IntersectionObserver' in window)) {
      counters.forEach((el) => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '')
      })
      return
    }

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement)
            cio.unobserve(e.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    counters.forEach((el) => cio.observe(el))
    return () => cio.disconnect()
  }, [animateCount])

  return containerRef
}
