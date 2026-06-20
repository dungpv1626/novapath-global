export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as any
    const { name, phone, email, program, message } = body

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 })
    }

    await db.contactSubmission.create({
      data: { name, phone, email, program: program || null, message: message || null, read: false },
    })

    return NextResponse.json({ success: true, message: 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong 24 giờ.' })
  } catch {
    return NextResponse.json({ error: 'Đã xảy ra lỗi. Vui lòng thử lại.' }, { status: 500 })
  }
}
