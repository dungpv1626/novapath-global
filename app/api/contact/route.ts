import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown> as Record<string, unknown>
    const { name, phone, email, program, message } = body

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Vui lÃ²ng Ä‘iá»n Ä‘áº§y Ä‘á»§ thÃ´ng tin báº¯t buá»™c.' }, { status: 400 })
    }

    // TODO: Gá»­i email qua Resend/Nodemailer
    // await sendEmail({ to: 'tuvan@novapath.vn', subject: `ÄÄƒng kÃ½ tÆ° váº¥n: ${name}`, body: ... })

    console.log('[Contact Form]', { name, phone, email, program, message, at: new Date().toISOString() })

    return NextResponse.json({ success: true, message: 'Cáº£m Æ¡n báº¡n Ä‘Ã£ Ä‘Äƒng kÃ½! ChÃºng tÃ´i sáº½ liÃªn há»‡ trong 24 giá».' })
  } catch {
    return NextResponse.json({ error: 'ÄÃ£ xáº£y ra lá»—i. Vui lÃ²ng thá»­ láº¡i.' }, { status: 500 })
  }
}
