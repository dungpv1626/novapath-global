import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export default function Eyebrow({ children, center, onNavy }: { children: ReactNode; center?: boolean; onNavy?: boolean }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 font-[family-name:var(--font-head)] font-semibold text-[13px] tracking-[0.14em] uppercase mb-[18px]',
      onNavy ? 'text-sky-brand' : 'text-primary',
      center && 'justify-center',
    )}>
      <span className={cn('w-[26px] h-[2px] rounded-[2px] flex-shrink-0', onNavy ? 'bg-sky-brand' : 'bg-primary')} />
      {children}
    </div>
  )
}
