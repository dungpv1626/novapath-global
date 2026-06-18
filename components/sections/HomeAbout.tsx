import Image from 'next/image'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { ArrowRight, Phone, Check } from 'lucide-react'

const checks = [
  'Lộ trình cá nhân hóa theo năng lực và mục tiêu nghề nghiệp',
  'Minh bạch chi phí — không phát sinh phụ phí ẩn',
  'Đồng hành cả sau khi nhập học: nhà ở, việc làm, hòa nhập',
]

export default function HomeAbout() {
  return (
    <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,5vw,72px)] items-center">
        {/* Media */}
        <div className="relative reveal">
          <Image
            src="/images/team-novapath.jpg"
            alt="Đội ngũ NOVAPATH"
            width={800}
            height={430}
            className="w-full h-[430px] rounded-[22px] object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80"
            alt="Tư vấn du học"
            width={400}
            height={210}
            className="absolute -right-[18px] -bottom-[30px] w-[46%] h-[210px] rounded-[18px] border-[6px] border-white shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] object-cover hidden sm:block"
          />
          <div className="absolute -left-[22px] top-[34px] bg-primary text-white rounded-[18px] p-[18px_22px] shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] text-center">
            <div className="font-[family-name:var(--font-head)] font-bold text-[38px] leading-none">12+</div>
            <div className="text-[12.5px] opacity-90 mt-1 max-w-[90px]">năm kinh nghiệm</div>
          </div>
        </div>

        {/* Content */}
        <div className="reveal reveal-d1">
          <Eyebrow>Về NOVAPATH GLOBAL</Eyebrow>
          <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">
            Người bạn đồng hành <span className="text-primary">tin cậy</span> trên hành trình du học Trung Quốc
          </h2>
          <p className="text-muted mt-4 mb-0" style={{ fontSize: 'clamp(16px,1.5vw,19px)' }}>
            Hơn một thập kỷ, chúng tôi đã giúp hàng nghìn học sinh, sinh viên Việt Nam hiện thực hóa ước mơ học tập tại các trường đại học hàng đầu Trung Quốc.
          </p>
          <ul className="grid gap-[14px] my-[26px]">
            {checks.map((c) => (
              <li key={c} className="flex gap-[13px] items-start font-medium">
                <span className="flex-shrink-0 w-[26px] h-[26px] rounded-[8px] bg-primary-soft text-primary grid place-items-center mt-[1px]">
                  <Check size={15} strokeWidth={2.4} />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-[26px] flex-wrap">
            <Link href="/ve-chung-toi" className="inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] transition-all duration-[250ms]">
              Câu chuyện của chúng tôi <ArrowRight size={17} />
            </Link>
            <div className="flex items-center gap-[13px]">
              <span className="w-[48px] h-[48px] rounded-[14px] bg-primary-soft text-primary grid place-items-center flex-shrink-0">
                <Phone size={22} />
              </span>
              <div>
                <div className="text-[12.5px] text-muted">Gọi tư vấn ngay</div>
                <div className="font-[family-name:var(--font-head)] font-bold text-[18px]">1900 6868</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
