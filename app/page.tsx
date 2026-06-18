export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import RevealProvider from '@/components/RevealProvider'
import Hero from '@/components/sections/Hero'
import HomeFeatures from '@/components/sections/HomeFeatures'
import HomeAbout from '@/components/sections/HomeAbout'
import HomeServices from '@/components/sections/HomeServices'
import HomePrograms from '@/components/sections/HomePrograms'
import HomeSteps from '@/components/sections/HomeSteps'
import HomeStats from '@/components/sections/HomeStats'
import HomeTestimonials from '@/components/sections/HomeTestimonials'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NOVAPATH GLOBAL — Du học Trung Quốc uy tín',
  description: 'NOVAPATH GLOBAL — Tư vấn du học Trung Quốc trọn gói: trường đại học, học bổng, khóa học tiếng Trung.',
}

export default function HomePage() {
  return (
    <RevealProvider>
      <Hero />

      <HomeFeatures />

      {/* Trust band — infinite marquee */}
      <div className="bg-white border-b border-line overflow-hidden" style={{ marginTop: 'clamp(44px,6vw,84px)' }}>
        <div className="flex items-center gap-[30px] py-[26px]">
          <span className="text-[13.5px] text-muted font-semibold whitespace-nowrap shrink-0 pl-[clamp(20px,5vw,56px)]">
            Đối tác tuyển sinh chính thức của 500+ trường:
          </span>
          <div className="flex-1 overflow-hidden min-w-0">
            <div
              className="flex gap-[52px] items-center w-max"
              style={{ animation: 'marquee 18s linear infinite' }}
            >
              {['Thanh Hoa', 'Bắc Kinh', 'Phúc Đán', 'Chiết Giang', 'Nam Kinh', 'Đồng Tế',
                'Thanh Hoa', 'Bắc Kinh', 'Phúc Đán', 'Chiết Giang', 'Nam Kinh', 'Đồng Tế'].map((n, i) => (
                <span key={i} className="text-[15px] font-[family-name:var(--font-head)] font-semibold text-muted whitespace-nowrap">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <HomeAbout />
      <HomeServices />
      <HomePrograms />
      <HomeSteps />
      <HomeStats />
      <HomeTestimonials />

      {/* CTA */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Sẵn sàng bắt đầu hành trình du học?"
              desc="Đăng ký nhận tư vấn miễn phí 1-1 cùng chuyên gia NOVAPATH GLOBAL ngay hôm nay."
              actions={
                <>
                  <Button href="/lien-he" variant="light">
                    Đăng ký tư vấn miễn phí <ArrowRight size={17} />
                  </Button>
                  <Button href="tel:19006868" variant="accent">
                    <Phone size={17} /> Gọi 1900 6868
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
