export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await db.course.findMany({ orderBy: [{ tab: 'asc' }, { order: 'asc' }] }))
}

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json() as any as any
  const item = await db.course.create({
    data: {
      slug: data.slug, title: data.title, level: data.level,
      duration: data.duration, price: data.price, schedule: data.schedule,
      image: data.image, tag: data.tag, rating: Number(data.rating ?? 5),
      students: data.students, tab: data.tab ?? 'co-ban', order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
