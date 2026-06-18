'use client'

import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.querySelectorAll<HTMLElement>('.reveal').forEach((r) => r.classList.add('in'))
      return
    }

    const revealEls = el.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window) || !revealEls.length) {
      revealEls.forEach((r) => r.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    revealEls.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return ref
}
