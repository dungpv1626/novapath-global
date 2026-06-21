'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, GraduationCap, Award, BookOpen,
  Users, Settings, LogOut, Globe, Layers, MapPin, MessageSquare,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/lien-he', label: 'Liên hệ tư vấn', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog / Tin tức', icon: FileText },
  { href: '/admin/truong', label: 'Trường đại học', icon: GraduationCap },
  { href: '/admin/hoc-bong', label: 'Học bổng', icon: Award },
  { href: '/admin/chuong-trinh', label: 'Chương trình', icon: Layers },
  { href: '/admin/thanh-pho', label: 'Thành phố', icon: MapPin },
  { href: '/admin/khoa-hoc', label: 'Khóa học tiếng Trung', icon: BookOpen },
  { href: '/admin/team', label: 'Đội ngũ', icon: Users },
  { href: '/admin/settings', label: 'Cài đặt trang', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(item: typeof navItems[0]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <aside className="w-[240px] shrink-0 bg-[#0a1b3d] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Image src="/logo.png" alt="NOVAPATH" width={120} height={34} className="h-[34px] w-auto brightness-0 invert" />
        <p className="text-[11px] text-[#7f93b8] mt-1 font-[family-name:var(--font-body)]">Admin CMS</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-[10px] text-[13.5px] font-[family-name:var(--font-head)] font-medium transition-colors ${
                active
                  ? 'bg-[#1d5fe0] text-white'
                  : 'text-[#9fb2d6] hover:bg-white/8 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-[10px] rounded-[10px] text-[13.5px] font-[family-name:var(--font-head)] font-medium text-[#9fb2d6] hover:bg-white/8 hover:text-white transition-colors"
        >
          <Globe size={16} />
          Xem website
        </Link>
        <button
          onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/admin/login' }}
          className="flex items-center gap-3 px-3 py-[10px] rounded-[10px] text-[13.5px] font-[family-name:var(--font-head)] font-medium text-[#9fb2d6] hover:bg-white/8 hover:text-white transition-colors w-full text-left"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
