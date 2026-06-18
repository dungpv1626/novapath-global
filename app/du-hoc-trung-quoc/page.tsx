export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import FAQ from '@/components/ui/FAQ'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import ProgramTabs from '@/components/ui/ProgramTabs'
import CourseCard from '@/components/ui/CourseCard'
import RevealProvider from '@/components/RevealProvider'
import { ArrowRight, Phone } from 'lucide-react'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Du học Trung Quốc — NOVAPATH GLOBAL',
  description: 'Tư vấn du học Trung Quốc trọn gói: chọn trường, hồ sơ, học bổng và visa cùng NOVAPATH GLOBAL.',
}

const TAB_OPTIONS = [
  { value: 'dai-hoc', label: 'Đại học', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg> },
  { value: 'thac-si', label: 'Thạc sĩ', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M12 2 15 8.5 22 9.3l-5 4.7L18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5z"/></svg> },
  { value: 'tieng-du-bi', label: 'Tiếng & Dự bị', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg> },
  { value: 'trung-hoc', label: 'Trung học', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M3 9 12 3l9 6v11H3z"/><path d="M9 21V13h6v8"/></svg> },
]

const faqs = [
  { q: 'Chi phí du học Trung Quốc khoảng bao nhiêu?', a: 'Học phí đại học công lập thường từ 15.000–35.000 NDT/năm (tương đương 50–120 triệu đồng). Chi phí sinh hoạt trung bình 2.500–4.000 NDT/tháng tùy thành phố. Tổng chi phí cả năm phổ biến từ 120–200 triệu đồng.' },
  { q: 'Tôi cần HSK mấy để vào đại học Trung Quốc?', a: 'Tùy trường và ngành. Ngành học bằng tiếng Trung thường yêu cầu HSK 4–5. Ngành học bằng tiếng Anh chỉ cần IELTS/TOEFL. Nhiều trường có chương trình tiếng dự bị 1 năm cho học viên HSK thấp.' },
  { q: 'Xin visa du học Trung Quốc có khó không?', a: 'Tỷ lệ đậu visa X1 (sinh viên dài hạn) của học viên NOVAPATH đạt 98%. Chúng tôi hỗ trợ toàn bộ quy trình từ chuẩn bị hồ sơ tài chính, luyện phỏng vấn đến nộp hồ sơ tại lãnh sự quán.' },
  { q: 'NOVAPATH hỗ trợ sau khi sang Trung Quốc không?', a: 'Có. Chúng tôi đón sân bay, hỗ trợ thủ tục nhập học, tìm nhà ở ngoại trú (nếu cần), kết nối cộng đồng người Việt tại địa phương và hỗ trợ khi có vấn đề phát sinh.' },
]

export default async function ChinaPage() {
  const [cities, allPrograms] = await Promise.all([
    db.city.findMany({ orderBy: { order: 'asc' } }),
    db.program.findMany({ orderBy: [{ tab: 'asc' }, { order: 'asc' }] }),
  ])

  const tabs = TAB_OPTIONS.map((t) => ({
    label: t.label,
    icon: t.icon,
    content: allPrograms
      .filter((p) => p.tab === t.value)
      .map((p) => (
        <CourseCard
          key={p.id}
          tag={p.tag}
          rating={p.rating.toString()}
          reviews={p.reviews}
          title={p.title}
          duration={p.duration}
          note={p.note}
          price={p.price}
          priceUnit={p.priceUnit}
          img={p.image || undefined}
        />
      )),
  }))

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Du học Trung Quốc' }]}
        title="Du học Trung Quốc — cơ hội trong tầm tay"
        description="Nền giáo dục top đầu châu Á, chi phí hợp lý và kho học bổng dồi dào. NOVAPATH GLOBAL đồng hành cùng bạn từ chọn trường đến ngày nhập học."
      />

      {/* Cities */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Thành phố du học</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Các thành phố <span className="text-primary">du học</span> hàng đầu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((c, i) => (
              <Link key={c.id} href="/truong-dai-hoc"
                className={`group relative rounded-[22px] overflow-hidden shadow-[0_16px_40px_-24px_rgba(15,40,95,0.28)] hover:-translate-y-2 hover:shadow-[0_34px_64px_-28px_rgba(15,40,95,0.42)] transition-all duration-300 bg-navy block reveal ${i % 4 > 0 ? `reveal-d${i % 4}` : ''}`}>
                {c.image ? (
                  <Image src={c.image} alt={c.name} width={400} height={340} className="w-full h-[340px] object-cover" unoptimized={c.image.startsWith('/')} />
                ) : (
                  <div className="w-full h-[340px] bg-gradient-to-br from-primary to-navy" />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(7,18,40,.9) 8%,rgba(7,18,40,.15) 55%,transparent)' }} />
                <div className="absolute left-0 right-0 bottom-0 p-[22px] z-10 text-white">
                  <h3 className="text-white text-[21px] mb-1">{c.name}</h3>
                  <div className="text-[13.5px] text-[#bcd0f0]">{c.meta}</div>
                </div>
                <span className="absolute top-[18px] right-[18px] w-[42px] h-[42px] rounded-[12px] bg-white/16 backdrop-blur-sm grid place-items-center text-white z-10 translate-y-[-6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Bậc học</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Chương trình theo <span className="text-primary">cấp độ</span></h2>
          </div>
          <ProgramTabs tabs={tabs} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[46px] reveal">
            <Eyebrow center>Giải đáp</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Câu hỏi <span className="text-primary">thường gặp</span></h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Sẵn sàng chinh phục du học Trung Quốc?"
              desc="Nhận tư vấn miễn phí từ chuyên gia để tìm lộ trình phù hợp nhất với bạn."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Đăng ký tư vấn <ArrowRight size={17} /></Button>
                  <Button href="tel:19006868" variant="accent"><Phone size={17} /> Gọi 1900 6868</Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
