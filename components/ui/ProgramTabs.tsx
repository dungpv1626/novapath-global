'use client'

import { useState, ReactNode } from 'react'

interface Tab { label: string; icon: ReactNode; content: ReactNode }

export default function ProgramTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[40px] items-start md:gap-[26px_40px]">
      {/* Tab list */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-[13px] w-full text-left rounded-[13px] px-[18px] py-[17px] font-[family-name:var(--font-head)] font-semibold text-[15.5px] transition-all duration-[250ms] border cursor-pointer
              ${active === i
                ? 'bg-primary text-white border-primary shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)]'
                : 'bg-white text-ink border-line hover:border-primary'
              }`}
          >
            <span className={`w-[34px] h-[34px] rounded-[9px] grid place-items-center flex-shrink-0 transition-all ${active === i ? 'bg-white/20 text-white' : 'bg-primary-soft text-primary'}`}>
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div key={active} className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-[fadeUp_0.5s_ease]">
        {tabs[active].content}
      </div>
    </div>
  )
}
