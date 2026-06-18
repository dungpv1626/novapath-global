import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

interface Props { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Props) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  const item = await db.program.update({
    where: { id },
    data: {
      title: data.title,
      tag: data.tag,
      tab: data.tab,
      rating: Number(data.rating ?? 4.9),
      reviews: data.reviews,
      duration: data.duration,
      note: data.note,
      price: data.price,
      priceUnit: data.priceUnit,
      image: data.image ?? '',
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.program.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
