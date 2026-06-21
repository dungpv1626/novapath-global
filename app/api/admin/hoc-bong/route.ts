export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await db.scholarship.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json() as any as any
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
