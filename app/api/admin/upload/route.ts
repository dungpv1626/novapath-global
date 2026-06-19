import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { NextRequest, NextResponse } from 'next/server'

// Use edge-safe auth (no Prisma/bcryptjs) — session is JWT-based, no DB needed
const { auth } = NextAuth(authConfig)

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Không có file' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF, AVIF' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Ảnh tối đa 5MB' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  if (process.env.NODE_ENV === 'production') {
    // Cloudflare R2 — read env from the global CF context that next-on-pages
    // populates before every edge handler (Symbol.for("__cloudflare-request-context__"))
    const cfCtx = (globalThis as any)[Symbol.for('__cloudflare-request-context__')]
    const r2 = cfCtx?.env?.IMAGES as any

    if (!r2) {
      return NextResponse.json({ error: 'R2 chưa được cấu hình' }, { status: 500 })
    }
    const bytes = await file.arrayBuffer()
    await r2.put(filename, bytes, { httpMetadata: { contentType: file.type } })
    return NextResponse.json({ url: `${process.env.R2_PUBLIC_URL}/${filename}` })
  } else {
    // Local dev: lưu vào public/images/
    const { writeFile, mkdir } = await import('fs/promises')
    const path = await import('path')
    const uploadDir = path.join(process.cwd(), 'public', 'images')
    await mkdir(uploadDir, { recursive: true })
    const bytes = await file.arrayBuffer()
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes))
    return NextResponse.json({ url: `/images/${filename}` })
  }
}
