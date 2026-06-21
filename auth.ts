import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { authConfig } from './auth.config'

// Use JWS (signed, not encrypted) to avoid jose's deflate.js which requires
// CompressionStream — a Node.js API unavailable in Cloudflare Workers edge runtime.
const jwtOptions = {
  encode: async ({ token, secret, maxAge }: { token?: Record<string, unknown>; secret: string | string[]; maxAge?: number }) => {
    const s = Array.isArray(secret) ? secret[0] : secret
    const key = new TextEncoder().encode(s)
    return new SignJWT(token ?? {})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + (maxAge ?? 30 * 24 * 60 * 60))
      .sign(key)
  },
  decode: async ({ token, secret }: { token?: string; secret: string | string[] }) => {
    if (!token) return null
    try {
      const s = Array.isArray(secret) ? secret[0] : secret
      const key = new TextEncoder().encode(s)
      const { payload } = await jwtVerify(token, key)
      return payload as Record<string, unknown>
    } catch {
      return null
    }
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  jwt: jwtOptions,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null
        const user = await db.adminUser.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
