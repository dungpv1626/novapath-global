import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ScholarCardProps {
  name: string
  amount: string
  amountUnit?: string
  conditions: string[]
  popular?: boolean
  href?: string
}

export default function ScholarCard({ name, amount, amountUnit, conditions, popular, href = '/lien-he' }: ScholarCardProps) {
  return (
    <div className="relative bg-white border border-line rounded-[22px] p-[32px_28px] shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 overflow-hidden">
      {/* top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-primary to-sky-brand" />
      {popular && (
        <span className="absolute top-[18px] right-[18px] bg-accent text-[#3a2400] font-[family-name:var(--font-head)] font-bold text-[11px] px-[11px] py-[5px] rounded-[999px] uppercase tracking-[0.05em]">
          Phổ biến
        </span>
      )}
      <div className="font-[family-name:var(--font-head)] font-bold text-[34px] text-primary mb-[6px]">
        {amount}{amountUnit && <small className="text-[15px] text-muted font-semibold"> {amountUnit}</small>}
      </div>
      <h3 className="text-[20px] mb-3">{name}</h3>
      <ul className="flex flex-col gap-[10px] mt-[18px] mb-[22px]">
        {conditions.map((c, i) => (
          <li key={i} className="flex gap-[10px] items-start text-[14.5px] text-[#41506b]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-[2px]">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {c}
          </li>
        ))}
      </ul>
      <Link href={href} className="inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white hover:-translate-y-[3px] transition-all duration-[250ms]">
        Tìm hiểu thêm <ArrowRight size={17} />
      </Link>
    </div>
  )
}
