'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls } from '../_components/FormCard'
import ImageUpload from '../_components/ImageUpload'
const TAB_OPTIONS = [
  { value: 'co-ban', label: 'Cơ bản' },
  { value: 'giao-tiep', label: 'Giao tiếp' },
  { value: 'hsk', label: 'Luyện thi HSK' },
  { value: 'chuyen-nganh', label: 'Chuyên ngành' },
]

interface Course { id: string; slug: string; title: string; level: string; duration: string; price: string; schedule: string; image: string; tag: string; rating: number; students: string; tab: string; order: number; createdAt: Date; updatedAt: Date }

interface Props { course?: Course }

export default function CourseForm({ course }: Props) {
  const router = useRouter()
  const isEdit = !!course
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    slug: course?.slug ?? '',
    title: course?.title ?? '',
    level: course?.level ?? '',
    duration: course?.duration ?? '',
    price: course?.price ?? '',
    schedule: course?.schedule ?? '',
    image: course?.image ?? '',
    tag: course?.tag ?? '',
    rating: course?.rating?.toString() ?? '5.0',
    students: course?.students ?? '',
    tab: course?.tab ?? 'co-ban',
    order: course?.order?.toString() ?? '0',
  })

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(isEdit ? `/api/admin/khoa-hoc/${course!.id}` : '/api/admin/khoa-hoc', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi lưu')
      router.push('/admin/khoa-hoc')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin khóa học">
        <Field label="Tên khóa học">
          <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Tiếng Trung Cơ bản A1-A2" />
        </Field>
        <Field label="Slug (URL)">
          <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="tieng-trung-co-ban" />
        </Field>
        <Field label="Tag / Nhãn ngắn">
          <input className={inputCls} value={form.tag} onChange={(e) => set('tag', e.target.value)} placeholder="Mới khai giảng, Phổ biến..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cấp độ">
            <input className={inputCls} value={form.level} onChange={(e) => set('level', e.target.value)} placeholder="HSK 1-2, Trung cấp..." />
          </Field>
          <Field label="Thời lượng">
            <input className={inputCls} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="3 tháng, 6 buổi/tuần" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Học phí">
            <input className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="2.800.000đ" />
          </Field>
          <Field label="Lịch học">
            <input className={inputCls} value={form.schedule} onChange={(e) => set('schedule', e.target.value)} placeholder="T2-T4-T6, 18h-20h" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Số học viên">
            <input className={inputCls} value={form.students} onChange={(e) => set('students', e.target.value)} placeholder="1.200+" />
          </Field>
          <Field label="Đánh giá (1-5)">
            <input className={inputCls} type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Phân loại & Hiển thị">
        <Field label="Tab thuộc về">
          <select className={inputCls} value={form.tab} onChange={(e) => set('tab', e.target.value)}>
            {TAB_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>
        <ImageUpload
          label="Ảnh khóa học"
          value={form.image}
          onChange={(url) => set('image', url)}
          aspectRatio="landscape"
        />
        <Field label="Thứ tự">
          <input className={inputCls} type="number" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </Field>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        <button type="button" onClick={() => router.push('/admin/khoa-hoc')} className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors">Huỷ</button>
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm khóa học'}
        </button>
      </div>
    </form>
  )
}
