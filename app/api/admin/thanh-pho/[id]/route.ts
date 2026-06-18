export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

interface Props { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Props) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json() as any
  const item = await db.city.update({
    where: { id },
    data: {
      name: data.name,
      meta: data.meta,
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
  await db.city.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
