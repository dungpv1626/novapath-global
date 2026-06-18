export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await db.city.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json() as any as any
  const item = await db.city.create({
    data: {
      name: data.name,
      meta: data.meta,
      image: data.image ?? '',
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
