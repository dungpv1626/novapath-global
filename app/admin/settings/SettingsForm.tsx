'use client'

import { useState } from 'react'
import FormCard, { Field, inputCls, textareaCls } from '../_components/FormCard'
interface SiteSettings { id: string; heroTitle: string; heroSubtitle: string; statVisa: number; statSchools: number; statYears: number; phone: string; email: string; facebook: string; instagram: string; youtube: string; updatedAt: Date }

interface Props { settings: SiteSettings | null }

export default function SettingsForm({ settings }: Props) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    heroTitle: settings?.heroTitle ?? 'Chinh phục giấc mơ du học Trung Quốc',
    heroSubtitle: settings?.heroSubtitle ?? '',
    statVisa: settings?.statVisa?.toString() ?? '98',
    statSchools: settings?.statSchools?.toString() ?? '500',
    statYears: settings?.statYears?.toString() ?? '12',
    phone: settings?.phone ?? '1900 6868',
    email: settings?.email ?? 'tuvan@novapath.vn',
    facebook: settings?.facebook ?? '#',
    instagram: settings?.instagram ?? '#',
    youtube: settings?.youtube ?? '#',
  })

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi lưu cài đặt')
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Hero section" description="Nội dung hiển thị ở phần đầu trang chủ">
        <Field label="Tiêu đề chính">
          <input className={inputCls} value={form.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} />
        </Field>
        <Field label="Mô tả">
          <textarea className={textareaCls} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} rows={3} />
        </Field>
      </FormCard>

      <FormCard title="Thống kê" description="Các con số hiển thị dưới hero">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Tỷ lệ đậu visa (%)">
            <input className={inputCls} type="number" value={form.statVisa} onChange={(e) => set('statVisa', e.target.value)} />
          </Field>
          <Field label="Trường đối tác">
            <input className={inputCls} type="number" value={form.statSchools} onChange={(e) => set('statSchools', e.target.value)} />
          </Field>
          <Field label="Năm kinh nghiệm">
            <input className={inputCls} type="number" value={form.statYears} onChange={(e) => set('statYears', e.target.value)} />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Thông tin liên hệ">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Số điện thoại">
            <input className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="Email">
            <input className={inputCls} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Facebook URL">
            <input className={inputCls} value={form.facebook} onChange={(e) => set('facebook', e.target.value)} placeholder="https://facebook.com/..." />
          </Field>
          <Field label="Instagram URL">
            <input className={inputCls} value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="YouTube URL">
            <input className={inputCls} value={form.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtube.com/..." />
          </Field>
        </div>
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-end gap-3">
        {error && <p className="text-[#d6486f] text-[13px] mr-auto">{error}</p>}
        {saved && <p className="text-[#1c9b63] text-[13px] mr-auto font-medium">✓ Đã lưu thành công</p>}
        <button type="submit" disabled={loading} className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors">
          {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>
    </form>
  )
}
