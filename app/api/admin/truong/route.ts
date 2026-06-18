export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await db.university.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json() as any as any
  const item = await db.university.create({
    data: {
      slug: data.slug,
      name: data.name,
      nameEn: data.nameEn,
      city: data.city,
      rank: Number(data.rank),
      established: Number(data.established),
      students: data.students,
      programs: JSON.stringify(data.programs ?? []),
      tuition: data.tuition,
      highlights: JSON.stringify(data.highlights ?? []),
      img: data.img,
      description: data.description,
      order: Number(data.order ?? 0),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
