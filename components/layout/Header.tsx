'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/du-hoc-trung-quoc', label: 'Du học Trung Quốc' },
  { href: '/truong-dai-hoc', label: 'Trường đại học' },
  { href: '/hoc-bong', label: 'Học bổng' },
  { href: '/khoa-hoc-tieng-trung', label: 'Khóa học tiếng Trung' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={`sticky top-0 z-[1000] bg-white/86 backdrop-blur-[14px] border-b border-transparent transition-all duration-300 ${scrolled ? 'shadow-[0_8px_30px_-18px_rgba(15,40,95,0.3)] border-line' : ''}`}
    >
      <nav className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] flex items-center justify-between h-[76px] gap-6" aria-label="Điều hướng chính">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[11px] font-[family-name:var(--font-head)] font-bold text-[21px] text-ink tracking-[-0.02em]">
          <Image src="/logo.png" alt="NOVAPATH GLOBAL" width={160} height={46} className="h-[46px] w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0">
          {navLinks.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-[family-name:var(--font-head)] font-medium text-[14px] px-[11px] py-2 rounded-[10px] transition-colors whitespace-nowrap
                  ${active ? 'text-primary' : 'text-ink hover:text-primary hover:bg-primary-soft'}`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-[11px] right-[11px] bottom-1 h-[2px] bg-primary rounded-[2px]" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-[14px]">
          <Link href="/lien-he" className="hidden [@media(min-width:1161px)]:inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[14px] px-[18px] py-[12px] rounded-[999px] bg-primary text-white whitespace-nowrap shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] hover:shadow-[0_20px_36px_-14px_rgba(29,95,224,0.75)] transition-all duration-300">
            Đăng ký tư vấn <ArrowRight size={16} />
          </Link>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-[46px] h-[46px] rounded-[12px] border border-line bg-white cursor-pointer"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`w-5 h-[2px] bg-ink rounded-[2px] transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`w-5 h-[2px] bg-ink rounded-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[2px] bg-ink rounded-[2px] transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[76px] bg-white shadow-lg border-b border-line transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] z-[999] max-h-[calc(100vh-76px)] overflow-auto ${menuOpen ? 'translate-y-0' : '-translate-y-[130%]'}`}
      >
        <div className="flex flex-col gap-1 px-[clamp(20px,5vw,56px)] py-[18px] pb-[26px]">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-[family-name:var(--font-head)] font-medium text-[16px] px-[16px] py-[14px] rounded-[10px] transition-colors ${pathname === l.href ? 'text-primary bg-primary-soft' : 'text-ink hover:text-primary hover:bg-primary-soft'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/lien-he" className="mt-2 inline-flex items-center justify-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white text-center">
            Đăng ký tư vấn <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  )
}
