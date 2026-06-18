import { ReactNode } from 'react'

interface CTABannerProps {
  title: string
  desc: string
  actions: ReactNode
}

export default function CTABanner({ title, desc, actions }: CTABannerProps) {
  return (
    <div className="relative rounded-[22px] overflow-hidden text-white grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[40px] items-center md:gap-[26px_40px]"
      style={{
        background: 'linear-gradient(120deg,#1d5fe0,#1546b0)',
        padding: 'clamp(40px,5vw,64px)',
      }}
    >
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(600px 300px at 90% 0,rgba(255,255,255,.18),transparent 60%)' }} />
      <div className="relative">
        <h2 className="text-white mb-[14px]" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>{title}</h2>
        <p className="text-white/90 text-[17px] max-w-[46ch]">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-4 md:justify-end relative">{actions}</div>
    </div>
  )
}
