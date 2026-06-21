'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface HeroProps {
  title?: string
  subtitle?: string
  statVisa?: number
  statSchools?: number
  statYears?: number
}

export default function Hero({ title, subtitle, statVisa, statSchools, statYears }: HeroProps) {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = statsRef.current
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
    <section className="relative bg-navy text-[#e6eefb] overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(1100px 540px at 78% -8%,rgba(56,189,248,.20),transparent 60%),radial-gradient(820px 520px at 8% 108%,rgba(29,95,224,.34),transparent 60%)' }} />

      <div className="relative max-w-[1280px] mx-auto px-[clamp(20px,5vw,56px)] grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[48px] items-center"
        style={{ paddingBlock: 'clamp(64px,8vw,110px)' }}>

        {/* Copy */}
        <div className="reveal">
          <span className="inline-flex items-center gap-[9px] bg-white/8 border border-white/16 text-[#dce8fb] text-[13.5px] font-medium px-4 py-2 rounded-[999px] mb-[26px]">
            <b className="text-sky-brand font-bold">★ 4.9/5</b> từ hơn 5.000 học viên & phụ huynh
          </span>

          <h1 className="tracking-[-0.025em] mb-[22px]" style={{ fontSize: 'clamp(36px,5.4vw,62px)', color: 'white' }}>
            {title ?? 'Chinh phục giấc mơ du học Trung Quốc'}
          </h1>

          <p className="text-[#aebfda] max-w-[50ch] mb-[34px]" style={{ fontSize: 'clamp(16px,1.5vw,19px)' }}>
            {subtitle ?? 'NOVAPATH GLOBAL chuyên tư vấn du học Trung Quốc: chọn trường, làm hồ sơ, săn học bổng và đào tạo tiếng Trung — minh bạch, tận tâm, đúng lộ trình.'}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/lien-he" className="inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] transition-all duration-[250ms]">
              Nhận tư vấn miễn phí <ArrowRight size={17} />
            </Link>
            <Link href="/du-hoc-trung-quoc" className="inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] border-[1.5px] border-white/28 text-white hover:border-white hover:-translate-y-[3px] transition-all duration-[250ms]">
              Khám phá chương trình
            </Link>
          </div>

          <div ref={statsRef} className="flex gap-[34px] flex-wrap">
            {[
              { count: String(statVisa ?? 98), suffix: '%', label: 'Tỷ lệ đậu visa' },
              { count: String(statSchools ?? 500), suffix: '+', label: 'Trường đối tác TQ' },
              { count: String(statYears ?? 12), suffix: '+', label: 'Năm kinh nghiệm' },
            ].map((s) => (
              <div key={s.label} className="relative pl-[18px] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:rounded-[3px] before:bg-sky-brand">
                <div className="font-[family-name:var(--font-head)] font-bold text-[30px] text-white leading-none" data-count={s.count} data-suffix={s.suffix}>0</div>
                <div className="text-[13.5px] text-[#9fb2d6] mt-[6px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="reveal reveal-d2 relative hidden lg:block">
          {/* Image container — fixed height so fill works */}
          <div className="relative w-full rounded-[28px] overflow-hidden shadow-[0_48px_96px_-32px_rgba(0,0,0,0.7)]" style={{ height: '520px' }}>
            <Image
              src="/images/hero-banner-v2.jpg"
              alt="Học bổng du học Trung Quốc cùng NOVAPATH GLOBAL"
              fill
              className="object-cover object-right"
              priority
            />
            {/* subtle vignette bottom */}
            <div className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{ background: 'linear-gradient(to top, rgba(15,31,61,0.3) 0%, transparent 50%)' }} />
          </div>
          {/* Glow */}
          <div className="absolute -right-[20px] -bottom-[30px] w-[60%] h-[50%] -z-10 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(56,189,248,.35),transparent 70%)', filter: 'blur(40px)' }} />
          {/* Float cards */}
          <div className="absolute top-[28px] -left-[24px] bg-white text-ink rounded-[16px] px-[18px] py-[14px] shadow-[0_24px_60px_-28px_rgba(15,40,95,0.40)] flex items-center gap-3 animate-[floaty_4.5s_ease-in-out_infinite_0.6s]">
            <span className="w-[42px] h-[42px] rounded-[12px] bg-ic-green-bg text-ic-green-fg grid place-items-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[15px] leading-[1.1]">Hồ sơ đã nộp</div>
              <div className="text-[12px] text-muted">Đại học Phúc Đán</div>
            </div>
          </div>
          <div className="absolute bottom-[48px] -right-[20px] bg-white text-ink rounded-[16px] px-[18px] py-[14px] shadow-[0_24px_60px_-28px_rgba(15,40,95,0.40)] flex items-center gap-3 animate-[floaty_4.5s_ease-in-out_infinite]">
            <span className="w-[42px] h-[42px] rounded-[12px] bg-ic-amber-bg text-ic-amber-fg grid place-items-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2 15 8.5 22 9.3l-5 4.7L18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5z"/></svg>
            </span>
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[15px] leading-[1.1]">Học bổng 50%</div>
              <div className="text-[12px] text-muted">vừa được cấp 🎉</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
