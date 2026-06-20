'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls } from '../_components/FormCard'
import ImageUpload from '../_components/ImageUpload'
interface City { id: string; name: string; meta: string; image: string; order: number; createdAt: Date; updatedAt: Date }

interface Props { city?: City }

export default function CityForm({ city }: Props) {
  const router = useRouter()
  const isEdit = !!city
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: city?.name ?? '',
    meta: city?.meta ?? '',
    image: city?.image ?? '',
    order: city?.order?.toString() ?? '0',
  })

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(isEdit ? `/api/admin/thanh-pho/${city!.id}` : '/api/admin/thanh-pho', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi lưu')
      router.push('/admin/thanh-pho')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin thành phố">
        <Field label="Tên thành phố">
          <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Bắc Kinh" />
        </Field>
        <Field label="Các trường tiêu biểu">
          <input className={inputCls} value={form.meta} onChange={(e) => set('meta', e.target.value)} required placeholder="ĐH Thanh Hoa · Bắc Kinh · BLCU" />
        </Field>
        <ImageUpload
          label="Ảnh thành phố"
          value={form.image}
          onChange={(url) => set('image', url)}
          aspectRatio="portrait"
          hint="Ảnh dọc tỉ lệ 4:5 hoặc 3:4 trông đẹp nhất"
        />
        <Field label="Thứ tự hiển thị">
          <input className={inputCls} type="number" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </Field>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        <button type="button" onClick={() => router.push('/admin/thanh-pho')} className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors">Huỷ</button>
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm thành phố'}
        </button>
      </div>
    </form>
  )
}
