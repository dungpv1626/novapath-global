export const runtime = 'edge'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await db.siteSettings.findUnique({ where: { id: 'main' } })
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json() as any as any
  const settings = await db.siteSettings.upsert({
    where: { id: 'main' },
    update: {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      statVisa: Number(data.statVisa),
      statSchools: Number(data.statSchools),
      statYears: Number(data.statYears),
      phone: data.phone,
      email: data.email,
      facebook: data.facebook,
      instagram: data.instagram,
      youtube: data.youtube,
    },
    create: {
      id: 'main',
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      statVisa: Number(data.statVisa),
      statSchools: Number(data.statSchools),
      statYears: Number(data.statYears),
      phone: data.phone,
      email: data.email,
      facebook: data.facebook,
      instagram: data.instagram,
      youtube: data.youtube,
    },
  })
  return NextResponse.json(settings)
}
