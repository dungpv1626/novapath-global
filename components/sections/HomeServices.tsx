import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    color: 'bg-ic-blue-bg text-ic-blue-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>,
    title: 'Du học Trung Quốc',
    desc: 'Tư vấn lộ trình, chọn trường, làm hồ sơ và xin visa trọn gói.',
    href: '/du-hoc-trung-quoc',
  },
  {
    color: 'bg-ic-sky-bg text-ic-sky-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01"/></svg>,
    title: 'Trường đại học',
    desc: 'Danh mục trường top đầu Trung Quốc, ngành học và xếp hạng.',
    href: '/truong-dai-hoc',
  },
  {
    color: 'bg-ic-amber-bg text-ic-amber-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M12 2 15 8.5 22 9.3l-5 4.7L18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5z"/></svg>,
    title: 'Học bổng',
    desc: 'Săn học bổng CSC, học bổng trường và tỉnh/thành.',
    href: '/hoc-bong',
  },
  {
    color: 'bg-ic-green-bg text-ic-green-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
    title: 'Khóa học tiếng Trung',
    desc: 'Lộ trình HSK 1–6, luyện thi và giao tiếp thực tế.',
    href: '/khoa-hoc-tieng-trung',
  },
  {
    color: 'bg-ic-violet-bg text-ic-violet-fg',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[30px] h-[30px]"><path d="M4 4h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4zM19 8h2v10a2 2 0 0 1-2 2M7 8h8M7 12h8M7 16h5"/></svg>,
    title: 'Tin tức',
    desc: 'Cập nhật học bổng, cẩm nang và kinh nghiệm du học.',
    href: '/tin-tuc',
  },
]

export default function HomeServices() {
  return (
    <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        <div className="text-center max-w-[740px] mx-auto mb-[54px] reveal">
          <Eyebrow center>Lĩnh vực của chúng tôi</Eyebrow>
          <h2 className="h-title">5 mảng <span className="text-primary">dịch vụ</span> chính</h2>
          <p className="text-muted mt-4 mx-auto" style={{ fontSize: 'clamp(16px,1.5vw,19px)' }}>
            Hệ sinh thái dịch vụ trọn gói cho hành trình du học Trung Quốc của bạn — từ định hướng đến khi tốt nghiệp.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((s, i) => (
            <Link key={s.title} href={s.href}
              className={`bg-white border border-line rounded-[22px] p-[34px_30px] shadow-[0_16px_40px_-24px_rgba(15,40,95,0.28)] hover:-translate-y-2 hover:shadow-[0_32px_60px_-28px_rgba(15,40,95,0.36)] transition-all duration-300 flex-[0_1_320px] reveal ${i > 0 && i % 3 !== 0 ? `reveal-d${Math.min(i % 3, 4)}` : ''} no-underline`}>
              <span className={`w-[60px] h-[60px] rounded-[17px] grid place-items-center mb-5 ${s.color}`}>{s.icon}</span>
              <h3 className="text-[21px] mb-[10px]">{s.title}</h3>
              <p className="text-muted text-[15.5px]">{s.desc}</p>
              <span className="inline-flex items-center gap-[7px] mt-[18px] font-[family-name:var(--font-head)] font-semibold text-[14px] text-primary group">
                Xem chi tiết <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
