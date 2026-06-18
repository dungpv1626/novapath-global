import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    color: 'bg-ic-blue-bg text-ic-blue-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>,
    title: 'Tư vấn chọn trường',
    desc: 'Định hướng ngành học, chọn trường phù hợp năng lực và ngân sách dựa trên dữ liệu thực tế.',
    href: '/du-hoc-trung-quoc',
  },
  {
    color: 'bg-ic-amber-bg text-ic-amber-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M12 2 15 8.5 22 9.3l-5 4.7L18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5z"/></svg>,
    title: 'Săn học bổng',
    desc: 'Đội ngũ chuyên gia giúp bạn tiếp cận và chinh phục các suất học bổng giá trị mỗi năm.',
    href: '/hoc-bong',
  },
  {
    color: 'bg-ic-green-bg text-ic-green-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    title: 'Hỗ trợ visa A–Z',
    desc: 'Chuẩn bị hồ sơ tài chính, luyện phỏng vấn và theo sát đến khi visa được cấp.',
    href: '/du-hoc-trung-quoc',
  },
]

export default function HomeFeatures() {
  return (
    <section className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] -mt-[58px] relative z-[5]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <article key={f.title} className={`bg-white border border-line rounded-[22px] p-[34px_30px] shadow-[0_16px_40px_-24px_rgba(15,40,95,0.28)] hover:-translate-y-2 hover:shadow-[0_32px_60px_-28px_rgba(15,40,95,0.36)] transition-all duration-300 reveal ${i === 1 ? 'reveal-d1' : i === 2 ? 'reveal-d2' : ''}`}>
            <span className={`w-[60px] h-[60px] rounded-[17px] grid place-items-center mb-5 ${f.color}`}>{f.icon}</span>
            <h3 className="text-[21px] mb-[10px]">{f.title}</h3>
            <p className="text-muted text-[15.5px]">{f.desc}</p>
            <Link href={f.href} className="inline-flex items-center gap-[7px] mt-[18px] font-[family-name:var(--font-head)] font-semibold text-[14px] text-primary group">
              Tìm hiểu thêm <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
