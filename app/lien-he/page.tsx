import type { Metadata } from 'next'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import RevealProvider from '@/components/RevealProvider'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Liên hệ tư vấn — NOVAPATH GLOBAL',
  description: 'Đăng ký nhận tư vấn miễn phí về du học Trung Quốc từ chuyên gia NOVAPATH GLOBAL.',
}

const contactInfo = [
  { icon: <MapPin size={22} />, label: 'Địa chỉ', value: 'Tầng 12, Toà nhà Sunrise, Quận 1, TP.HCM' },
  { icon: <Phone size={22} />, label: 'Hotline', value: '1900 6868 (8:00–20:00)' },
  { icon: <Mail size={22} />, label: 'Email', value: 'tuvan@novapath.vn' },
  { icon: <Clock size={22} />, label: 'Giờ làm việc', value: 'Thứ 2 – Thứ 7: 8:00 – 20:00' },
]

export default function ContactPage() {
  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Liên hệ' }]}
        title="Đăng ký tư vấn miễn phí"
        description="Điền thông tin để nhận tư vấn 1-1 từ chuyên gia NOVAPATH — phân tích hồ sơ và lộ trình du học phù hợp nhất."
      />

      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[clamp(40px,5vw,80px)]">
            {/* Info */}
            <div className="reveal">
              <Eyebrow>Thông tin liên hệ</Eyebrow>
              <h2 className="text-[clamp(28px,3.5vw,40px)] leading-[1.1] mb-5">
                Chúng tôi ở đây để <span className="text-primary">hỗ trợ bạn</span>
              </h2>
              <p className="text-muted mb-8" style={{ fontSize: 'clamp(16px,1.5vw,18px)' }}>
                Đội ngũ tư vấn NOVAPATH luôn sẵn sàng giải đáp mọi thắc mắc về du học Trung Quốc — từ chọn trường, học bổng, hồ sơ đến visa và cuộc sống du học.
              </p>

              <div className="grid gap-5 mb-8">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <span className="w-[48px] h-[48px] rounded-[14px] bg-primary-soft text-primary grid place-items-center flex-shrink-0">
                      {c.icon}
                    </span>
                    <div>
                      <div className="font-[family-name:var(--font-head)] font-semibold text-[14px] text-muted mb-1">{c.label}</div>
                      <div className="font-medium text-[16px]">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-[22px] overflow-hidden bg-bg-soft-2 h-[240px] flex items-center justify-center text-muted text-[14px] border border-line">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-primary" />
                  <p>Tầng 12, Toà nhà Sunrise<br />Quận 1, TP.HCM</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="reveal reveal-d1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { n: '12.500+', l: 'Học viên thành công' },
              { n: '98%', l: 'Tỷ lệ đậu visa' },
              { n: '24h', l: 'Phản hồi sau đăng ký' },
              { n: '500+', l: 'Trường đối tác' },
            ].map((s, i) => (
              <div key={s.l} className={`bg-white border border-line rounded-[22px] p-6 text-center reveal reveal-d${i}`}>
                <div className="font-[family-name:var(--font-head)] font-bold text-[36px] text-primary mb-2">{s.n}</div>
                <div className="text-muted text-[15px]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
