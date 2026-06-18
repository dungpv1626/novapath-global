'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  aspectRatio?: 'landscape' | 'square' | 'portrait'
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Ảnh',
  hint,
  aspectRatio = 'landscape',
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload thất bại')
      onChange(data.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Lỗi upload')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const previewHeight = aspectRatio === 'square' ? 'h-40 w-40' : aspectRatio === 'portrait' ? 'h-48 w-36' : 'h-40 w-full'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-[family-name:var(--font-head)] font-medium text-[#0f1f3d]">
          {label}
          {hint && <span className="ml-2 text-[11px] font-normal text-[#8fa0bc]">{hint}</span>}
        </span>
      </div>

      {/* Preview */}
      {value && (
        <div className={`relative ${previewHeight} rounded-[10px] overflow-hidden border border-[#e3eaf5] bg-[#f3f7fd]`}>
          {value.startsWith('/') || value.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full text-[#d6486f] text-[14px] leading-none flex items-center justify-center shadow hover:bg-white transition-colors"
            title="Xoá ảnh"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 rounded-[10px] border border-[#1d5fe0] text-[#1d5fe0] text-[13px] font-[family-name:var(--font-head)] font-medium hover:bg-[#1d5fe0]/5 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang tải lên...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {value ? 'Đổi ảnh' : 'Chọn ảnh từ máy tính'}
            </>
          )}
        </button>
        <span className="text-[11px] text-[#8fa0bc]">JPG, PNG, WebP — tối đa 5MB</span>
      </div>

      {uploadError && <p className="text-[12px] text-[#d6486f]">{uploadError}</p>}

      {/* URL fallback */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-[#e3eaf5]" />
        <span className="text-[11px] text-[#8fa0bc]">hoặc nhập URL</span>
        <div className="flex-1 h-px bg-[#e3eaf5]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full border border-[#e3eaf5] rounded-[10px] px-4 py-2.5 text-[14px] font-[family-name:var(--font-body)] outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all bg-white"
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
