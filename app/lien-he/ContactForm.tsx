'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', program: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json() as { error?: string }
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', program: '', message: '' })
      } else {
        setErrorMsg(data.error || 'Lỗi không xác định.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Không thể kết nối máy chủ. Vui lòng thử lại.')
      setStatus('error')
    }
  }

  const inputClass = "w-full px-4 py-[14px] border-[1.5px] border-line rounded-[13px] font-[family-name:var(--font-body)] text-[15.5px] text-ink bg-bg-soft focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_#e7effd] outline-none transition-all"

  return (
    <div className="bg-white border border-line rounded-[22px] p-[clamp(28px,3.5vw,44px)] shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)]">
      {status === 'success' ? (
        <div className="flex items-center gap-4 bg-[#e3f6ec] text-[#0f7a4a] rounded-[13px] p-[14px_18px] font-semibold">
          <CheckCircle size={24} className="flex-shrink-0" />
          Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {status === 'error' && (
            <div className="bg-[#fde7ee] text-[#d6486f] rounded-[13px] p-[14px_18px] mb-5 font-semibold">{errorMsg}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-[family-name:var(--font-head)] font-semibold text-[14px] mb-2" htmlFor="name">Họ và tên *</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-head)] font-semibold text-[14px] mb-2" htmlFor="phone">Số điện thoại *</label>
              <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} placeholder="0912 345 678" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-[family-name:var(--font-head)] font-semibold text-[14px] mb-2" htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="email@gmail.com" />
          </div>

          <div className="mb-4">
            <label className="block font-[family-name:var(--font-head)] font-semibold text-[14px] mb-2" htmlFor="program">Quan tâm đến</label>
            <select id="program" name="program" value={form.program} onChange={handleChange} className={inputClass}>
              <option value="">-- Chọn dịch vụ --</option>
              <option>Du học Trung Quốc</option>
              <option>Học bổng CSC / Khổng Tử</option>
              <option>Khóa học tiếng Trung</option>
              <option>Tư vấn trường đại học</option>
              <option>Hỗ trợ visa</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-[family-name:var(--font-head)] font-semibold text-[14px] mb-2" htmlFor="message">Câu hỏi của bạn</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} className={inputClass + ' resize-y min-h-[120px]'} placeholder="Mô tả ngắn về mục tiêu và câu hỏi của bạn..." />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-[10px] font-[family-name:var(--font-head)] font-semibold text-[15px] px-[26px] py-[15px] rounded-[999px] bg-primary text-white shadow-[0_14px_28px_-12px_rgba(29,95,224,0.7)] hover:-translate-y-[3px] hover:shadow-[0_20px_36px_-14px_rgba(29,95,224,0.75)] disabled:opacity-60 disabled:translate-y-0 transition-all duration-[250ms]"
          >
            {status === 'loading' ? 'Đang gửi...' : (<>Gửi đăng ký <ArrowRight size={17} /></>)}
          </button>
          <p className="text-[13px] text-muted mt-3 text-center">Thông tin của bạn được bảo mật tuyệt đối.</p>
        </form>
      )}
    </div>
  )
}
