import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import CourseCard from '@/components/ui/CourseCard'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { ArrowRight, Phone } from 'lucide-react'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Khóa học tiếng Trung — NOVAPATH GLOBAL',
  description: 'Lộ trình HSK 1–6, luyện thi và giao tiếp thực tế cùng NOVAPATH GLOBAL.',
}

const hskLevels = [
  { level: 'HSK 1', vocab: '150', time: '3 tháng', color: 'bg-ic-green-bg text-ic-green-fg' },
  { level: 'HSK 2', vocab: '300', time: '3 tháng', color: 'bg-ic-sky-bg text-ic-sky-fg' },
  { level: 'HSK 3', vocab: '600', time: '4 tháng', color: 'bg-ic-blue-bg text-ic-blue-fg' },
  { level: 'HSK 4', vocab: '1.200', time: '4 tháng', color: 'bg-ic-violet-bg text-ic-violet-fg' },
  { level: 'HSK 5', vocab: '2.500', time: '5 tháng', color: 'bg-ic-amber-bg text-ic-amber-fg' },
  { level: 'HSK 6', vocab: '5.000+', time: '5 tháng', color: 'bg-ic-rose-bg text-ic-rose-fg' },
]

export default async function ChineseCoursesPage() {
  const courses = await db.course.findMany({ orderBy: { order: 'asc' } })

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Khóa học tiếng Trung' }]}
        title="Khóa học tiếng Trung chất lượng cao"
        description="Lộ trình học bài bản từ HSK 1 đến HSK 6, giao tiếp thực tế và luyện thi chuyên sâu — cùng giáo viên người Hoa."
      />

      {/* Courses */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Danh sách khóa học</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Chọn khóa học <span className="text-primary">phù hợp</span> với bạn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <div key={c.id} className={`reveal ${i % 3 > 0 ? `reveal-d${i % 3}` : ''}`}>
                <CourseCard
                  tag={c.tag}
                  rating={c.rating.toString()}
                  reviews={c.students}
                  title={c.title}
                  duration={c.duration}
                  note={c.schedule}
                  price={c.price}
                  priceUnit="khóa"
                  img={c.image || undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HSK Roadmap */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Lộ trình học</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Lộ trình <span className="text-primary">HSK 1–6</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            {hskLevels.map((l, i) => (
              <div key={l.level} className={`bg-white border border-line rounded-[22px] p-6 text-center reveal reveal-d${i % 4}`}>
                <span className={`w-[56px] h-[56px] rounded-[16px] grid place-items-center mx-auto mb-4 text-[22px] font-bold font-[family-name:var(--font-head)] ${l.color}`}>
                  {i + 1}
                </span>
                <div className="font-[family-name:var(--font-head)] font-bold text-[18px] mb-1">{l.level}</div>
                <div className="text-muted text-[13px]">{l.vocab} từ</div>
                <div className="text-primary text-[13px] font-semibold mt-1">{l.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Bắt đầu học tiếng Trung ngay hôm nay"
              desc="Học thử miễn phí 1 buổi. Cam kết thi đạt HSK hoặc học lại không mất phí."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Đăng ký học thử <ArrowRight size={17} /></Button>
                  <Button href="tel:19006868" variant="accent"><Phone size={17} /> Tư vấn lộ trình</Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
