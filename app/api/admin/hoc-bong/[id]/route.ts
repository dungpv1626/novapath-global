import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  const item = await db.scholarship.update({
    where: { id },
    data: {
      name: data.name,
      amount: data.amount,
      conditions: JSON.stringify(data.conditions ?? []),
      popular: data.popular ?? false,
      gradient: data.gradient,
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.scholarship.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
