'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormCard, { Field, inputCls, textareaCls } from '../_components/FormCard'
import ImageUpload from '../_components/ImageUpload'
import { BlogPost } from '@/lib/generated/prisma/client'

interface Props {
  post?: BlogPost
}

export default function BlogForm({ post }: Props) {
  const router = useRouter()
  const isEdit = !!post
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    slug: post?.slug ?? '',
    title: post?.title ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    category: post?.category ?? '',
    author: post?.author ?? 'NOVAPATH GLOBAL',
    authorRole: post?.authorRole ?? 'Chuyên gia Du học',
    coverImage: post?.coverImage ?? '',
    readTime: post?.readTime ?? '5 phút đọc',
    published: post?.published ?? false,
  })

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(isEdit ? `/api/admin/blog/${post!.id}` : '/api/admin/blog', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi lưu bài viết')
      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Thông tin cơ bản">
        <Field label="Tiêu đề bài viết">
          <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="VD: 10 lý do nên du học Trung Quốc" />
        </Field>
        <Field label="Slug (URL)" hint="Chữ thường, không dấu, dùng dấu gạch ngang">
          <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="10-ly-do-nen-du-hoc-trung-quoc" />
        </Field>
        <Field label="Tóm tắt">
          <textarea className={textareaCls} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} required placeholder="Mô tả ngắn xuất hiện ở trang danh sách..." rows={3} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Danh mục">
            <input className={inputCls} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Du học, Học bổng, Tiếng Trung..." />
          </Field>
          <Field label="Thời gian đọc">
            <input className={inputCls} value={form.readTime} onChange={(e) => set('readTime', e.target.value)} placeholder="5 phút đọc" />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Nội dung bài viết" description="Hỗ trợ Markdown: **đậm**, *nghiêng*, ## Tiêu đề, - danh sách">
        <textarea
          className="w-full border border-[#e3eaf5] rounded-[10px] px-4 py-2.5 text-[14px] font-mono outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all resize-y bg-white"
          value={form.content}
          onChange={(e) => set('content', e.target.value)}
          required
          rows={20}
          placeholder="Viết nội dung bài viết bằng Markdown..."
        />
      </FormCard>

      <FormCard title="Tác giả & Ảnh bìa">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tên tác giả">
            <input className={inputCls} value={form.author} onChange={(e) => set('author', e.target.value)} />
          </Field>
          <Field label="Chức danh tác giả">
            <input className={inputCls} value={form.authorRole} onChange={(e) => set('authorRole', e.target.value)} />
          </Field>
        </div>
        <ImageUpload
          label="Ảnh bìa"
          value={form.coverImage}
          onChange={(url) => set('coverImage', url)}
          aspectRatio="landscape"
        />
      </FormCard>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 flex items-center justify-between">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set('published', !form.published)}
            className={`w-12 h-6 rounded-[999px] transition-colors relative ${form.published ? 'bg-[#1d5fe0]' : 'bg-[#d0daea]'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
          <span className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d]">
            {form.published ? 'Đã đăng (công khai)' : 'Nháp (chưa hiện)'}
          </span>
        </label>
        <div className="flex items-center gap-3">
          {error && <p className="text-[#d6486f] text-[13px]">{error}</p>}
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-5 py-[10px] rounded-[10px] border border-[#e3eaf5] text-[14px] font-[family-name:var(--font-head)] font-medium text-[#5b6b86] hover:bg-[#f3f7fd] transition-colors"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-[10px] rounded-[10px] bg-[#1d5fe0] text-white text-[14px] font-[family-name:var(--font-head)] font-semibold hover:bg-[#1546b0] disabled:opacity-60 transition-colors"
          >
            {loading ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Tạo bài viết'}
          </button>
        </div>
      </div>
    </form>
  )
}
