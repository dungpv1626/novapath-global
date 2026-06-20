'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls, textareaCls } from '../_components/FormCard'
interface Scholarship { id: string; name: string; amount: string; conditions: string; popular: boolean; gradient: string; order: number; createdAt: Date; updatedAt: Date }

interface Props { scholarship?: Scholarship }

export default function ScholarshipForm({ scholarship }: Props) {
  const router = useRouter()
  const isEdit = !!scholarship
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: scholarship?.name ?? '',
    amount: scholarship?.amount ?? '',
    conditions: scholarship ? JSON.parse(scholarship.conditions).join('\n') : '',
    popular: scholarship?.popular ?? false,
    gradient: scholarship?.gradient ?? 'linear-gradient(135deg,#1d5fe0,#38bdf8)',
    order: scholarship?.order?.toString() ?? '0',
  })

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        conditions: form.conditions.split('\n').map((s: string) => s.trim()).filter(Boolean),
      }
      const res = await fetch(isEdit ? `/api/admin/hoc-bong/${scholarship!.id}` : '/api/admin/hoc-bong', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Lỗi lưu học bổng')
      router.push('/admin/hoc-bong')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin học bổng">
        <Field label="Tên học bổng">
          <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Học bổng Chính phủ Trung Quốc (CSC)" />
        </Field>
        <Field label="Mức hỗ trợ">
          <input className={inputCls} value={form.amount} onChange={(e) => set('amount', e.target.value)} required placeholder="Toàn phần, 50% học phí, 5.000.000đ..." />
        </Field>
        <Field label="Điều kiện" hint="Mỗi điều kiện một dòng">
          <textarea className={textareaCls} value={form.conditions} onChange={(e) => set('conditions', e.target.value)} rows={5} placeholder={"GPA ≥ 3.2/4.0\nTuổi ≤ 35\nSức khỏe tốt"} />
        </Field>
        <Field label="Màu gradient (CSS)" hint="VD: linear-gradient(135deg,#1d5fe0,#38bdf8)">
          <div className="flex gap-3 items-center">
            <input className={inputCls} value={form.gradient} onChange={(e) => set('gradient', e.target.value)} />
            <div className="w-10 h-10 rounded-[10px] shrink-0" style={{ background: form.gradient }} />
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Thứ tự">
            <input className={inputCls} type="number" value={form.order} onChange={(e) => set('order', e.target.value)} />
          </Field>
          <Field label="Đánh dấu phổ biến">
            <button
              type="button"
              onClick={() => set('popular', !form.popular)}
              className={`mt-1 px-4 py-2.5 rounded-[10px] text-[14px] font-[family-name:var(--font-head)] font-medium border transition-colors ${form.popular ? 'bg-[#fdf0d8] border-[#f5a623] text-[#c98208]' : 'bg-white border-[#e3eaf5] text-[#5b6b86]'}`}
            >
              {form.popular ? '★ Phổ biến' : 'Bình thường'}
            </button>
          </Field>
        </div>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        <button type="button" onClick={() => router.push('/admin/hoc-bong')} className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors">Huỷ</button>
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm học bổng'}
        </button>
      </div>
    </form>
  )
}
