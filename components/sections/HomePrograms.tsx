import Eyebrow from '@/components/ui/Eyebrow'
import ProgramTabs from '@/components/ui/ProgramTabs'
import CourseCard from '@/components/ui/CourseCard'
import { db } from '@/lib/db'

const TAB_OPTIONS = [
  { value: 'dai-hoc', label: 'Đại học', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg> },
  { value: 'thac-si', label: 'Thạc sĩ', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M12 2 15 8.5 22 9.3l-5 4.7L18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5z"/></svg> },
  { value: 'tieng-du-bi', label: 'Tiếng & Dự bị', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg> },
  { value: 'trung-hoc', label: 'Trung học', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]"><path d="M3 9 12 3l9 6v11H3z"/><path d="M9 21V13h6v8"/></svg> },
]

export default async function HomePrograms() {
  const allPrograms = await db.program.findMany({ orderBy: [{ tab: 'asc' }, { order: 'asc' }] })

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
    <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
          <Eyebrow center>Chương trình tiêu biểu</Eyebrow>
          <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">
            Chương trình du học Trung Quốc <span className="text-primary">đa dạng</span>
          </h2>
        </div>
        <ProgramTabs tabs={tabs} />
      </div>
    </section>
  )
}
