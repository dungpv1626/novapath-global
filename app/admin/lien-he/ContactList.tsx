'use client'

import { useState } from 'react'
import { Mail, Phone, CheckCircle, Circle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Submission {
  id: string
  name: string
  phone: string
  email: string
  program?: string | null
  message?: string | null
  read: boolean
  createdAt: string
}

export default function ContactList({ submissions }: { submissions: Submission[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function toggleRead(id: string, current: boolean) {
    setLoading(id)
    await fetch(`/api/admin/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !current }),
    })
    setLoading(null)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm('Xoá yêu cầu này?')) return
    setLoading(id)
    await fetch(`/api/admin/contact/${id}`, { method: 'DELETE' })
    setLoading(null)
    router.refresh()
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-12 text-center">
        <Mail size={40} className="text-[#c5d2e8] mx-auto mb-3" />
        <p className="text-[#5b6b86]">Chưa có yêu cầu tư vấn nào.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {submissions.map((s) => (
        <div
          key={s.id}
          className={`bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-5 flex gap-4 items-start transition-opacity ${loading === s.id ? 'opacity-50' : ''} ${!s.read ? 'border-l-4 border-[#1d5fe0]' : ''}`}
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#e7effd] text-[#1d5fe0] flex items-center justify-center font-[family-name:var(--font-head)] font-bold text-[16px] shrink-0">
            {s.name.charAt(0)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#0a1b3d]">{s.name}</span>
              {!s.read && (
                <span className="bg-[#1d5fe0] text-white text-[10px] font-bold px-2 py-0.5 rounded-[999px]">MỚI</span>
              )}
              {s.program && (
                <span className="bg-[#e7effd] text-[#1d5fe0] text-[11px] font-semibold px-2 py-0.5 rounded-[999px]">{s.program}</span>
              )}
            </div>
            <div className="flex gap-4 text-[13px] text-[#5b6b86] flex-wrap mb-2">
              <span className="flex items-center gap-1"><Phone size={12} /> {s.phone}</span>
              <span className="flex items-center gap-1"><Mail size={12} /> {s.email}</span>
              <span>{new Date(s.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {s.message && (
              <p className="text-[14px] text-[#374151] bg-[#f7f9fc] rounded-[10px] px-3 py-2">{s.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => toggleRead(s.id, s.read)}
              title={s.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
              className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[#e7effd] transition-colors text-[#5b6b86] hover:text-[#1d5fe0]"
            >
              {s.read ? <CheckCircle size={16} className="text-[#1c9b63]" /> : <Circle size={16} />}
            </button>
            <button
              onClick={() => handleDelete(s.id)}
              title="Xoá"
              className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[#fde7ee] transition-colors text-[#5b6b86] hover:text-[#d6486f]"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
