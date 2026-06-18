export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Trường đại học Trung Quốc — NOVAPATH GLOBAL',
  description: 'Danh sách các trường đại học hàng đầu Trung Quốc, ngành học và xếp hạng.',
}

export default async function UniversitiesPage() {
  const universities = await db.university.findMany({ orderBy: { order: 'asc' } })

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Trường đại học' }]}
        title="Trường đại học hàng đầu Trung Quốc"
        description="Khám phá 500+ trường đối tác của NOVAPATH GLOBAL — từ Thanh Hoa, Bắc Kinh đến các trường chuyên ngành nổi tiếng toàn cầu."
      />

      {/* Why China universities */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Tại sao chọn TQ</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Lý do chọn <span className="text-primary">đại học Trung Quốc</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Xếp hạng thế giới cao', desc: '7 trường top 100 thế giới (QS 2025). ĐH Thanh Hoa xếp hạng 25 toàn cầu.' },
              { icon: '💰', title: 'Học bổng dồi dào', desc: 'Hơn 50.000 suất học bổng cho sinh viên quốc tế mỗi năm — bao gồm CSC, Khổng Tử và học bổng trường.' },
              { icon: '🌏', title: 'Cơ hội nghề nghiệp', desc: 'Bằng từ trường top TQ được công nhận toàn cầu. Thị trường việc làm rộng lớn với nhiều tập đoàn đa quốc gia.' },
            ].map((c, i) => (
              <div key={c.title} className={`bg-white border border-line rounded-[22px] p-8 reveal reveal-d${i}`}>
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-[20px] mb-3">{c.title}</h3>
                <p className="text-muted text-[15.5px]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University grid */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Đối tác tuyển sinh</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Trường đại học <span className="text-primary">top đầu</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {universities.map((u, i) => {
              const programs: string[] = JSON.parse(u.programs)
              return (
                <Link key={u.slug} href={`/truong-dai-hoc/${u.slug}`}
                  className={`bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 flex flex-col reveal ${i % 3 > 0 ? `reveal-d${i % 3}` : ''}`}>
                  <div className="relative h-[200px]">
                    <Image src={u.img} alt={u.name} fill className="object-cover" unoptimized={u.img.startsWith('/')} />
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold font-[family-name:var(--font-head)] px-3 py-1 rounded-[999px] uppercase tracking-[0.06em]">
                      #{u.rank}
                    </span>
                  </div>
                  <div className="p-[22px] flex flex-col flex-1">
                    <div className="flex items-center gap-[6px] text-muted text-[13px] mb-2">
                      <MapPin size={13} className="text-primary" /> {u.city}
                    </div>
                    <h3 className="text-[19px] mb-1">{u.name}</h3>
                    <p className="text-[13.5px] text-muted mb-4">{u.nameEn}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {programs.slice(0, 3).map((p) => (
                        <span key={p} className="text-[12px] bg-primary-soft text-primary px-2 py-1 rounded-[999px]">{p}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-line">
                      <span className="text-[13px] text-muted">{u.tuition}</span>
                      <span className="inline-flex items-center gap-1 font-[family-name:var(--font-head)] font-semibold text-[13.5px] text-primary">
                        Chi tiết <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Chưa biết chọn trường nào?"
              desc="Chuyên gia NOVAPATH sẽ phân tích hồ sơ và tư vấn trường phù hợp nhất với bạn — miễn phí."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Tư vấn chọn trường <ArrowRight size={17} /></Button>
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
