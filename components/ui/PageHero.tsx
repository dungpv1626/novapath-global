import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; href?: string }

interface PageHeroProps {
  crumbs?: Crumb[]
  title: string
  description?: string
}

export default function PageHero({ crumbs, title, description }: PageHeroProps) {
  return (
    <section className="relative bg-navy text-white overflow-hidden" style={{ paddingBlock: 'clamp(56px,7vw,92px)' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(800px 400px at 85% -10%,rgba(56,189,248,.22),transparent 60%),radial-gradient(700px 400px at 0% 120%,rgba(29,95,224,.3),transparent 60%)' }} />
      <div className="relative max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        {crumbs && (
          <div className="flex items-center gap-[10px] text-[14px] text-[#9fb2d6] mb-5 flex-wrap">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-[10px]">
                {i > 0 && <ChevronRight size={13} className="opacity-60" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-sky-brand">{c.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-white mb-4" style={{ fontSize: 'clamp(34px,5vw,56px)' }}>{title}</h1>
        {description && <p className="text-[#a9bdde] text-[18px] max-w-[60ch]">{description}</p>}
      </div>
    </section>
  )
}
