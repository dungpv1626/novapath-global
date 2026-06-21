export const runtime = 'edge'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const secret = process.env.AUTH_SECRET || 'novapath-admin-secret-key-2026-change-in-prod'
  const password = 'novapath2026'

  // Step 1: test DB lookup
  let user: any = null
  let dbError: string | null = null
  try {
    user = await db.adminUser.findUnique({ where: { email: 'admin@novapath.vn' } })
  } catch (e: any) {
    dbError = e?.message ?? String(e)
  }

  // Step 2: test HMAC
  let hmacHex = ''
  let hmacError: string | null = null
  try {
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(password))
    hmacHex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch (e: any) {
    hmacError = e?.message ?? String(e)
  }

  const STORED = '30d442804a532955bbaa787fd0a7a9cc0241133efff8b72e8902ca66103d5c05'

  return NextResponse.json({
    userFound: !!user,
    userEmail: user?.email ?? null,
    dbError,
    hmacHex,
    hmacMatch: hmacHex === STORED,
    storedHex: STORED,
    secretFirst8: secret.slice(0, 8),
    secretLen: secret.length,
    hmacError,
  })
}
