'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls, textareaCls } from '../_components/FormCard'
import ImageUpload from '../_components/ImageUpload'
interface University { id: string; slug: string; name: string; nameEn: string; city: string; rank: number; established: number; students: string; programs: string; tuition: string; highlights: string; img: string; description: string; order: number; createdAt: Date; updatedAt: Date }

interface Props { university?: University }

export default function UniversityForm({ university }: Props) {
  const router = useRouter()
  const isEdit = !!university
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    slug: university?.slug ?? '',
    name: university?.name ?? '',
    nameEn: university?.nameEn ?? '',
    city: university?.city ?? '',
    rank: university?.rank?.toString() ?? '',
    established: university?.established?.toString() ?? '',
    students: university?.students ?? '',
    programs: university ? JSON.parse(university.programs).join('\n') : '',
    tuition: university?.tuition ?? '',
    highlights: university ? JSON.parse(university.highlights).join('\n') : '',
    img: university?.img ?? '',
    description: university?.description ?? '',
    order: university?.order?.toString() ?? '0',
  })

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        programs: form.programs.split('\n').map((s: string) => s.trim()).filter(Boolean),
        highlights: form.highlights.split('\n').map((s: string) => s.trim()).filter(Boolean),
      }
      const res = await fetch(isEdit ? `/api/admin/truong/${university!.id}` : '/api/admin/truong', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Lỗi lưu trường')
      router.push('/admin/truong')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin trường">
        <Field label="Tên trường (tiếng Việt)">
          <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Đại học Thanh Hoa" />
        </Field>
        <Field label="Tên tiếng Anh">
          <input className={inputCls} value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} required placeholder="Tsinghua University" />
        </Field>
        <Field label="Slug (URL)">
          <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="dai-hoc-thanh-hoa" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Thành phố">
            <input className={inputCls} value={form.city} onChange={(e) => set('city', e.target.value)} required placeholder="Bắc Kinh" />
          </Field>
          <Field label="Xếp hạng (số)">
            <input className={inputCls} type="number" value={form.rank} onChange={(e) => set('rank', e.target.value)} required placeholder="1" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Năm thành lập">
            <input className={inputCls} type="number" value={form.established} onChange={(e) => set('established', e.target.value)} placeholder="1911" />
          </Field>
          <Field label="Số sinh viên">
            <input className={inputCls} value={form.students} onChange={(e) => set('students', e.target.value)} placeholder="36.000+" />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Chương trình & Học phí">
        <Field label="Học phí">
          <input className={inputCls} value={form.tuition} onChange={(e) => set('tuition', e.target.value)} placeholder="26.000 – 40.000 NDT/năm" />
        </Field>
        <Field label="Chương trình đào tạo" hint="Mỗi chương trình một dòng">
          <textarea className={textareaCls} value={form.programs} onChange={(e) => set('programs', e.target.value)} rows={4} placeholder={"Kỹ thuật\nCông nghệ thông tin\nKiến trúc"} />
        </Field>
        <Field label="Điểm nổi bật" hint="Mỗi điểm một dòng">
          <textarea className={textareaCls} value={form.highlights} onChange={(e) => set('highlights', e.target.value)} rows={4} placeholder={"Top 25 thế giới\nHọc bổng chính phủ TQ"} />
        </Field>
      </FormCard>

      <FormCard title="Mô tả & Ảnh">
        <Field label="Mô tả ngắn">
          <textarea className={textareaCls} value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} />
        </Field>
        <ImageUpload
          label="Ảnh trường"
          value={form.img}
          onChange={(url) => set('img', url)}
          aspectRatio="landscape"
        />
        <Field label="Thứ tự hiển thị">
          <input className={inputCls} type="number" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </Field>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        <button type="button" onClick={() => router.push('/admin/truong')} className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors">Huỷ</button>
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm trường'}
        </button>
      </div>
    </form>
  )
}
