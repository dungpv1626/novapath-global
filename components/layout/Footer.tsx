'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <footer className="bg-navy text-[#a9bcdc]" style={{ paddingTop: 'clamp(56px,7vw,84px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-[40px] pb-[50px] border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-[18px]">
              <Image src="/logo.png" alt="NOVAPATH GLOBAL" width={160} height={52} className="h-[52px] w-auto brightness-0 invert" />
            </Link>
            <p className="text-[15px] text-[#9fb2d6] max-w-[34ch] mb-[22px]">
              Người bạn đồng hành tin cậy, biến giấc mơ du học Trung Quốc thành hiện thực với lộ trình minh bạch và tận tâm.
            </p>
            <ul className="grid gap-3">
              <li className="flex gap-3 items-start text-[14.5px]">
                <MapPin size={18} className="text-sky-brand flex-shrink-0 mt-[2px]" />
                Tầng 12, Toà nhà Sunrise, Q.1, TP.HCM
              </li>
              <li className="flex gap-3 items-start text-[14.5px]">
                <Mail size={18} className="text-sky-brand flex-shrink-0 mt-[2px]" />
                tuvan@novapath.vn
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-[16px] mb-5 font-[family-name:var(--font-head)]">Liên kết nhanh</h4>
            <ul className="grid gap-3">
              {[['/', 'Trang chủ'], ['/du-hoc-trung-quoc', 'Du học Trung Quốc'], ['/ve-chung-toi', 'Về chúng tôi'], ['/tin-tuc', 'Tin tức'], ['/lien-he', 'Liên hệ']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-[14.5px] text-[#9fb2d6] hover:text-white hover:pl-1 transition-all">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-[16px] mb-5 font-[family-name:var(--font-head)]">Dịch vụ</h4>
            <ul className="grid gap-3">
              {[['/du-hoc-trung-quoc', 'Du học Trung Quốc'], ['/truong-dai-hoc', 'Trường đại học'], ['/hoc-bong', 'Học bổng'], ['/khoa-hoc-tieng-trung', 'Khóa học tiếng Trung'], ['/tin-tuc', 'Tin tức']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-[14.5px] text-[#9fb2d6] hover:text-white hover:pl-1 transition-all">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-[16px] mb-5 font-[family-name:var(--font-head)]">Đăng ký nhận tin</h4>
            <p className="text-[14.5px] mb-4 text-[#9fb2d6]">Nhận thông tin học bổng & hội thảo du học mới nhất qua email.</p>
            {sent ? (
              <p className="text-green-400 text-sm font-semibold">Đăng ký thành công! Cảm ơn bạn.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="news-form">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                <button type="submit" aria-label="Đăng ký">
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-5 py-[26px] text-[14px] text-[#8095ba] flex-wrap">
          <span>© 2026 NOVAPATH GLOBAL. Bảo lưu mọi quyền.</span>
          <div className="flex gap-[22px] flex-wrap">
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
