export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, GraduationCap, DollarSign, ArrowRight, Check, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { db } from '@/lib/db'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const u = await db.university.findUnique({ where: { slug } })
  if (!u) return {}
  return {
    title: `${u.name} — NOVAPATH GLOBAL`,
    description: u.description,
  }
}

export default async function UniversityDetailPage({ params }: Props) {
  const { slug } = await params
  const u = await db.university.findUnique({ where: { slug } })
  if (!u) notFound()

  const programs: string[] = JSON.parse(u.programs)
  const highlights: string[] = JSON.parse(u.highlights)

  return (
    <RevealProvider>
      <PageHero
        crumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Trường đại học', href: '/truong-dai-hoc' },
          { label: u.name },
        ]}
        title={u.name}
        description={u.description}
      />

      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,5vw,72px)] items-start reveal">
            <div>
              <Image src={u.img} alt={u.name} width={800} height={480} className="w-full h-[400px] rounded-[22px] object-cover" unoptimized={u.img.startsWith('/')} />
            </div>
            <div>
              <div className="text-[28px] font-[family-name:var(--font-head)] font-bold text-muted mb-1">{u.nameEn}</div>
              <div className="flex items-center gap-2 text-muted mb-6">
                <MapPin size={16} className="text-primary" /> {u.city} · Top #{u.rank}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <GraduationCap size={20} />, label: 'Xếp hạng', value: `Top #${u.rank}` },
                  { icon: <MapPin size={20} />, label: 'Thành phố', value: u.city },
                  { icon: <DollarSign size={20} />, label: 'Học phí', value: u.tuition },
                ].map((s) => (
                  <div key={s.label} className="bg-bg-soft rounded-[13px] p-4 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] bg-primary-soft text-primary mb-2">{s.icon}</span>
                    <div className="text-[12px] text-muted mb-1">{s.label}</div>
                    <div className="font-[family-name:var(--font-head)] font-bold text-[15px]">{s.value}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-[18px] mb-4">Ngành đào tạo</h3>
              <ul className="grid gap-3 mb-8">
                {programs.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-medium">
                    <span className="w-[26px] h-[26px] rounded-[8px] bg-primary-soft text-primary grid place-items-center flex-shrink-0">
                      <Check size={14} strokeWidth={2.4} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              {highlights.length > 0 && (
                <div className="bg-primary-soft border border-primary/20 rounded-[13px] p-4 mb-8">
                  <div className="font-[family-name:var(--font-head)] font-semibold text-primary mb-2">Điểm nổi bật</div>
                  <ul className="grid gap-2">
                    {highlights.map((h) => (
                      <li key={h} className="text-[14px] text-[#2b3a55] flex gap-2">
                        <span className="text-primary mt-[2px]">✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/lien-he" className="inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] transition-all duration-[250ms]">
                Đăng ký tư vấn ngay <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title={`Muốn học tại ${u.name}?`}
              desc="Nhận tư vấn miễn phí từ chuyên gia NOVAPATH — phân tích hồ sơ và lộ trình phù hợp nhất cho bạn."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Đăng ký tư vấn <ArrowRight size={17} /></Button>
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
