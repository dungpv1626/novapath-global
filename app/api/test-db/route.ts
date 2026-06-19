export const runtime = 'edge'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const count = await db.city.count()
    return NextResponse.json({ ok: true, cityCount: count })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err), stack: err?.stack?.slice(0, 500) }, { status: 500 })
  }
}
