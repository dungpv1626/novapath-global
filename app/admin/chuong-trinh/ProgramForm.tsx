'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls } from '../_components/FormCard'
import ImageUpload from '../_components/ImageUpload'
const TAB_OPTIONS = [
  { value: 'dai-hoc', label: 'Đại học' },
  { value: 'thac-si', label: 'Thạc sĩ' },
  { value: 'tieng-du-bi', label: 'Tiếng & Dự bị' },
  { value: 'trung-hoc', label: 'Trung học' },
]

interface Program { id: string; title: string; tag: string; tab: string; rating: number; reviews: string; duration: string; note: string; price: string; priceUnit: string; image: string; order: number; createdAt: Date; updatedAt: Date }

interface Props { program?: Program }

export default function ProgramForm({ program }: Props) {
  const router = useRouter()
  const isEdit = !!program
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: program?.title ?? '',
    tag: program?.tag ?? '',
    tab: program?.tab ?? 'dai-hoc',
    rating: program?.rating?.toString() ?? '4.9',
    reviews: program?.reviews ?? '0',
    duration: program?.duration ?? '',
    note: program?.note ?? '',
    price: program?.price ?? '',
    priceUnit: program?.priceUnit ?? 'năm',
    image: program?.image ?? '',
    order: program?.order?.toString() ?? '0',
  })

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(isEdit ? `/api/admin/chuong-trinh/${program!.id}` : '/api/admin/chuong-trinh', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi lưu')
      router.push('/admin/chuong-trinh')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin chương trình">
        <Field label="Tên chương trình">
          <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Cử nhân Quản trị Kinh doanh — ĐH Phúc Đán" />
        </Field>
        <Field label="Tag / Nhãn ngắn">
          <input className={inputCls} value={form.tag} onChange={(e) => set('tag', e.target.value)} required placeholder="Kinh doanh, Công nghệ, MBA..." />
        </Field>
        <Field label="Tab hiển thị">
          <select className={inputCls} value={form.tab} onChange={(e) => set('tab', e.target.value)}>
            {TAB_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Thời lượng">
            <input className={inputCls} value={form.duration} onChange={(e) => set('duration', e.target.value)} required placeholder="4 năm, 1.5–2 năm..." />
          </Field>
          <Field label="Ghi chú (học bổng, ưu đãi)">
            <input className={inputCls} value={form.note} onChange={(e) => set('note', e.target.value)} placeholder="Học bổng 30%, CSC..." />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Học phí">
            <input className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} required placeholder="~150tr" />
          </Field>
          <Field label="Đơn vị học phí">
            <select className={inputCls} value={form.priceUnit} onChange={(e) => set('priceUnit', e.target.value)}>
              <option value="năm">/ năm</option>
              <option value="khóa">/ khóa</option>
              <option value="tháng">/ tháng</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Số đánh giá">
            <input className={inputCls} value={form.reviews} onChange={(e) => set('reviews', e.target.value)} placeholder="320" />
          </Field>
          <Field label="Điểm đánh giá (1–5)">
            <input className={inputCls} type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Ảnh & Thứ tự">
        <ImageUpload
          label="Ảnh chương trình"
          value={form.image}
          onChange={(url) => set('image', url)}
          aspectRatio="landscape"
        />
        <Field label="Thứ tự hiển thị (trong mỗi tab)">
          <input className={inputCls} type="number" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </Field>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        <button type="button" onClick={() => router.push('/admin/chuong-trinh')} className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors">Huỷ</button>
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm chương trình'}
        </button>
      </div>
    </form>
  )
}
