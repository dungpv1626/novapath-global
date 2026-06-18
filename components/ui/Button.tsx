import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'light' | 'accent'

interface ButtonProps {
  href?: string
  variant?: Variant
  onNavy?: boolean
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white border-transparent shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] hover:shadow-[0_20px_36px_-14px_rgba(29,95,224,0.75)]',
  ghost: 'bg-transparent text-ink border-line hover:border-primary hover:text-primary hover:-translate-y-[3px]',
  light: 'bg-white text-navy border-transparent hover:-translate-y-[3px] hover:shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)]',
  accent: 'bg-accent text-[#3a2400] border-transparent hover:-translate-y-[3px] hover:shadow-[0_18px_32px_-14px_rgba(245,166,35,0.7)]',
}

const base = 'inline-flex items-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] border-[1.5px] cursor-pointer transition-all duration-[250ms] whitespace-nowrap'

export default function Button({ href, variant = 'primary', onNavy, children, className, type = 'button', onClick }: ButtonProps) {
  const classes = cn(
    base,
    variantClasses[variant],
    onNavy && variant === 'ghost' && 'text-white border-white/28 hover:border-white hover:text-white',
    className
  )

  if (href) return <Link href={href} className={classes}>{children}</Link>
  return <button type={type} onClick={onClick} className={classes}>{children}</button>
}
