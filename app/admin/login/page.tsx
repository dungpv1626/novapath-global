'use client'
export const runtime = 'edge'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json() as { error?: string }
        setError(data.error || 'Email hoặc mật khẩu không đúng')
      }
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f3f7fd] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_24px_60px_-28px_rgba(15,40,95,.18)] p-10">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="NOVAPATH GLOBAL" width={140} height={40} className="h-10 w-auto" />
        </div>
        <h1 className="text-center font-[family-name:var(--font-head)] font-bold text-[22px] text-[#0a1b3d] mb-1">
          Đăng nhập Admin
        </h1>
        <p className="text-center text-[#5b6b86] text-[14px] mb-8">Hệ thống quản trị nội dung NOVAPATH</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-head)] font-medium text-[13px] text-[#0f1f3d]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@novapath.vn"
              className="w-full border border-[#e3eaf5] rounded-[12px] px-4 py-3 text-[15px] font-[family-name:var(--font-body)] outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-head)] font-medium text-[13px] text-[#0f1f3d]">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-[#e3eaf5] rounded-[12px] px-4 py-3 text-[15px] font-[family-name:var(--font-body)] outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all"
            />
          </div>
          {error && (
            <p className="text-[#d6486f] text-[13px] bg-[#fde7ee] px-4 py-2 rounded-[10px]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[15px] py-[14px] rounded-[12px] hover:bg-[#1546b0] disabled:opacity-60 transition-colors"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
