export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json() as any
  const item = await db.course.update({
    where: { id },
    data: {
      slug: data.slug, title: data.title, level: data.level,
      duration: data.duration, price: data.price, schedule: data.schedule,
      image: data.image, tag: data.tag, rating: Number(data.rating ?? 5),
      students: data.students, tab: data.tab, order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.course.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
