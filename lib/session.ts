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

// PBKDF2 of 'novapath2026' with AUTH_SECRET+'novapath-auth-v2', 100000 iter, SHA-256
const STORED_HEX = 'e3f51271d7e88b13849241ef2443a68d9d9f806c8cfb50f1c08718583e269f97'

export async function verifyPassword(password: string): Promise<boolean> {
  const enc = new TextEncoder()
  const keyMat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(getSecret() + 'novapath-auth-v2').buffer as ArrayBuffer, iterations: 100000, hash: 'SHA-256' },
    keyMat,
    256
  )
  const hex = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('')
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
