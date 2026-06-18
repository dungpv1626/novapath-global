'use client'

import { useEffect } from 'react'

export default function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')

    if (prefersReduced || !('IntersectionObserver' in window) || !revealEls.length) {
      revealEls.forEach((el) => el.classList.add('in'))
      return
    }

    // Pre-mark elements already in the initial viewport BEFORE enabling hiding,
    // so they never flash invisible.
    const vh = window.innerHeight
    revealEls.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect()
      if (top < vh * 0.92 && bottom > 0) el.classList.add('in')
    })

    // Now enable the hide-then-reveal system for below-fold elements
    document.documentElement.classList.add('js-reveal')

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
    revealEls.forEach((el) => { if (!el.classList.contains('in')) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return <>{children}</>
}
