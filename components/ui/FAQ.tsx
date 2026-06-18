'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface FAQItem { q: string; a: string }

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <div className="grid gap-[14px] max-w-[860px] mx-auto">
      {items.map((item, i) => (
        <div
          key={i}
          className={`bg-white border rounded-[13px] overflow-hidden transition-shadow duration-[250ms] ${open === i ? 'shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] border-transparent' : 'border-line'}`}
        >
          <button
            className="flex items-center justify-between gap-[18px] w-full px-6 py-5 font-[family-name:var(--font-head)] font-semibold text-[17px] text-ink text-left"
            onClick={() => toggle(i)}
          >
            {item.q}
            <span className={`flex-shrink-0 w-[30px] h-[30px] rounded-[8px] grid place-items-center transition-all duration-300 ${open === i ? 'bg-primary text-white rotate-45' : 'bg-primary-soft text-primary'}`}>
              <Plus size={16} />
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-[350ms] ease-in-out"
            style={{ maxHeight: open === i ? '500px' : '0' }}
          >
            <p className="px-6 pb-[22px] text-muted text-[15.5px]">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
