export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Về chúng tôi — NOVAPATH GLOBAL',
  description: 'NOVAPATH GLOBAL — hơn 12 năm đồng hành cùng hàng nghìn sinh viên Việt Nam chinh phục giấc mơ du học Trung Quốc.',
}

const values = [
  { icon: '🎯', title: 'Minh bạch', desc: 'Mọi chi phí, quy trình và kết quả đều được thông báo rõ ràng. Không phát sinh phụ phí ẩn.' },
  { icon: '❤️', title: 'Tận tâm', desc: 'Đội ngũ tư vấn luôn sẵn sàng hỗ trợ — kể cả khi bạn đã sang đến Trung Quốc.' },
  { icon: '🌟', title: 'Chuyên nghiệp', desc: 'Cố vấn đều có trình độ tiếng Trung cao (HSK 5–6) và kinh nghiệm thực tế du học TQ.' },
]

export default async function AboutPage() {
  const team = await db.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Về chúng tôi' }]}
        title="Hơn 12 năm vì giấc mơ du học của bạn"
        description="NOVAPATH GLOBAL được thành lập năm 2012 với sứ mệnh giúp sinh viên Việt Nam tiếp cận nền giáo dục đại học Trung Quốc một cách minh bạch và hiệu quả."
      />

      {/* Story */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,5vw,72px)] items-center">
          <div className="relative reveal">
            <Image src="/images/team-novapath.jpg" alt="NOVAPATH team" width={800} height={480} className="w-full h-[480px] rounded-[22px] object-cover" unoptimized />
            <div className="absolute -left-[22px] top-[34px] bg-primary text-white rounded-[18px] p-[18px_22px] shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] text-center">
              <div className="font-[family-name:var(--font-head)] font-bold text-[38px] leading-none">12+</div>
              <div className="text-[12.5px] opacity-90 mt-1 max-w-[90px]">năm kinh nghiệm</div>
            </div>
          </div>
          <div className="reveal reveal-d1">
            <Eyebrow>Câu chuyện của chúng tôi</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1] mb-5">
              Từ một ước mơ nhỏ đến <span className="text-primary">12.500 học viên</span> thành công
            </h2>
            <p className="text-muted mb-5" style={{ fontSize: 'clamp(16px,1.5vw,18px)' }}>
              Năm 2012, người sáng lập NOVAPATH — sau hành trình du học tại Bắc Kinh — nhận ra rằng nhiều bạn trẻ Việt Nam thiếu thông tin chính xác và người dẫn đường đáng tin cậy để chinh phục giấc mơ du học Trung Quốc.
            </p>
            <p className="text-muted mb-6" style={{ fontSize: 'clamp(16px,1.5vw,18px)' }}>
              Từ một văn phòng nhỏ tại TP.HCM, chúng tôi đã đồng hành cùng hơn 12.500 học viên, giúp họ giành 350 tỷ đồng học bổng và có tỷ lệ đậu visa 98%.
            </p>
            <ul className="grid gap-3">
              {['Đội ngũ 30+ chuyên gia, cựu du học sinh', 'Văn phòng tại TP.HCM và Hà Nội', 'Đối tác chính thức của 500+ trường đại học TQ'].map((c) => (
                <li key={c} className="flex items-center gap-3 font-medium">
                  <span className="w-[26px] h-[26px] rounded-[8px] bg-primary-soft text-primary grid place-items-center flex-shrink-0">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Giá trị cốt lõi</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Điều chúng tôi <span className="text-primary">cam kết</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className={`bg-white border border-line rounded-[22px] p-[32px_28px] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] transition-all duration-300 reveal reveal-d${i}`}>
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="text-[20px] mb-3">{v.title}</h3>
                <p className="text-muted text-[15.5px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Đội ngũ</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Những người <span className="text-primary">đồng hành</span> cùng bạn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={m.id} className={`bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 text-center reveal reveal-d${i % 4}`}>
                <Image src={m.image} alt={m.name} width={400} height={280} className="w-full h-[280px] object-cover" unoptimized={m.image.startsWith('/')} />
                <div className="p-[22px]">
                  <h3 className="text-[19px] mb-1">{m.name}</h3>
                  <div className="text-primary text-[14px] font-semibold mb-4">{m.role}</div>
                  <div className="flex justify-center gap-[10px]">
                    {['fb', 'li'].map((s) => (
                      <Link key={s} href="#" className="w-[36px] h-[36px] rounded-[10px] bg-bg-soft text-muted hover:bg-primary hover:text-white grid place-items-center transition-all">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          {s === 'fb' ? <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" /> : <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />}
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Sẵn sàng bắt đầu cùng NOVAPATH?"
              desc="Hơn 12.500 học viên đã tin tưởng chúng tôi. Hãy để chúng tôi đồng hành cùng bạn."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Liên hệ ngay <ArrowRight size={17} /></Button>
                  <Button href="tel:19006868" variant="accent"><Phone size={17} /> 1900 6868</Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
