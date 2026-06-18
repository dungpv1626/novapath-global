import Image from 'next/image'
import Link from 'next/link'
import { Clock, Shield, ArrowRight } from 'lucide-react'

interface CourseCardProps {
  tag: string
  rating: string
  reviews: string
  title: string
  duration: string
  note: string
  price: string
  priceUnit: string
  href?: string
  img?: string
  imgAlt?: string
}

export default function CourseCard({ tag, rating, reviews, title, duration, note, price, priceUnit, href = '/lien-he', img, imgAlt }: CourseCardProps) {
  return (
    <article className="bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 flex flex-col">
      <div className="relative h-[200px]">
        {img ? (
          <Image src={img} alt={imgAlt || title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-soft to-bg-soft-2" />
        )}
        <span className="absolute top-[14px] left-[14px] bg-white text-primary font-[family-name:var(--font-head)] font-bold text-[11px] tracking-[0.06em] uppercase px-3 py-[6px] rounded-[999px] z-10">
          {tag}
        </span>
      </div>
      <div className="p-[22px] flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[13px] text-muted mb-[10px]">
          <span className="text-accent tracking-[1px]">★★★★★</span>
          {rating} ({reviews} đánh giá)
        </div>
        <h3 className="text-[19px] mb-[10px] leading-[1.25]">{title}</h3>
        <div className="flex gap-[18px] text-[13.5px] text-muted mb-4 flex-wrap">
          <span className="inline-flex items-center gap-[6px]"><Clock size={15} className="text-primary" />{duration}</span>
          <span className="inline-flex items-center gap-[6px]"><Shield size={15} className="text-primary" />{note}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-line">
          <span className="font-[family-name:var(--font-head)] font-bold text-[20px] text-primary">
            {price}<small className="text-[12px] text-muted font-medium">/{priceUnit}</small>
          </span>
          <Link href={href} className="inline-flex items-center gap-[7px] font-[family-name:var(--font-head)] font-semibold text-[13.5px] text-ink hover:text-primary group transition-colors">
            Tư vấn <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
