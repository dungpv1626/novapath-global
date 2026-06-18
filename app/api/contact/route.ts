import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, program, message } = body

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 })
    }

    // TODO: Gửi email qua Resend/Nodemailer
    // await sendEmail({ to: 'tuvan@novapath.vn', subject: `Đăng ký tư vấn: ${name}`, body: ... })

    console.log('[Contact Form]', { name, phone, email, program, message, at: new Date().toISOString() })

    return NextResponse.json({ success: true, message: 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong 24 giờ.' })
  } catch {
    return NextResponse.json({ error: 'Đã xảy ra lỗi. Vui lòng thử lại.' }, { status: 500 })
  }
}
