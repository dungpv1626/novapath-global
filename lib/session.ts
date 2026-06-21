import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'novapath-admin-session'
const SESSION_MAX_AGE = 30 * 24 * 60 * 60

function toBase64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function fromBase64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64.length % 4 ? '='.repeat(4 - b64.length % 4) : ''
  return Uint8Array.from(atob(b64 + pad), (c) => c.charCodeAt(0))
}

function getSecret(): string {
  return process.env.AUTH_SECRET || 'novapath-admin-secret-key-2026-change-in-prod'
}

async function hmacKey(usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usage
  )
}

// HMAC-SHA256(password, FIXED_PW_KEY) — fixed internal key, independent of AUTH_SECRET env var
const FIXED_PW_KEY = 'novapath-pw-v1'
const STORED_HEX = 'afd01acaba50d9c49757e65abe7a6ad61ef3d85cc360fae04d3c99814feba605'

export async function verifyPassword(password: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(FIXED_PW_KEY),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(password))
  const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
  return hex === STORED_HEX
}

export async function createSessionToken(userId: string, email: string): Promise<string> {
  const payload = { sub: userId, email, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE }
  const data = toBase64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await hmacKey(['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return `${data}.${toBase64url(sig)}`
}

async function verifyToken(token: string): Promise<{ sub: string; email: string } | null> {
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return null
    const data = token.slice(0, dot)
    const sigBytes = fromBase64url(token.slice(dot + 1))
    const key = await hmacKey(['verify'])
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes.buffer as ArrayBuffer, new TextEncoder().encode(data))
    if (!valid) return null
    const payload = JSON.parse(new TextDecoder().decode(fromBase64url(data))) as { sub: string; email: string; exp: number }
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    return { sub: payload.sub, email: payload.email }
  } catch {
    return null
  }
}

export async function getSession(req: NextRequest): Promise<{ userId: string; email: string } | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = await verifyToken(token)
  if (!payload) return null
  return { userId: payload.sub, email: payload.email }
}

export { COOKIE_NAME, SESSION_MAX_AGE }
