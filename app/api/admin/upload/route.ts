export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createClient } from '@supabase/supabase-js'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024
const BUCKET = 'novapath-images'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Không có file' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: 'Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF, AVIF' }, { status: 400 })
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: 'Ảnh tối đa 5MB' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const sb = createClient(url, key, { auth: { persistSession: false } })

  const bytes = await file.arrayBuffer()
  const { error } = await sb.storage.from(BUCKET).upload(filename, bytes, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return NextResponse.json({ error: `Upload thất bại: ${error.message}` }, { status: 500 })

  const publicUrl = `${url}/storage/v1/object/public/${BUCKET}/${filename}`
  return NextResponse.json({ url: publicUrl })
}
