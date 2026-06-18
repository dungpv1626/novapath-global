import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await db.scholarship.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  const item = await db.scholarship.create({
    data: {
      name: data.name,
      amount: data.amount,
      conditions: JSON.stringify(data.conditions ?? []),
      popular: data.popular ?? false,
      gradient: data.gradient,
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
