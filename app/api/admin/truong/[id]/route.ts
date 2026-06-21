export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json() as any
  const item = await db.university.update({
    where: { id },
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
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.university.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
