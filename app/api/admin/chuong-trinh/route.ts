import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await db.program.findMany({ orderBy: [{ tab: 'asc' }, { order: 'asc' }] }))
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  const item = await db.program.create({
    data: {
      title: data.title,
      tag: data.tag,
      tab: data.tab ?? 'dai-hoc',
      rating: Number(data.rating ?? 4.9),
      reviews: data.reviews ?? '0',
      duration: data.duration,
      note: data.note,
      price: data.price,
      priceUnit: data.priceUnit ?? 'năm',
      image: data.image ?? '',
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
