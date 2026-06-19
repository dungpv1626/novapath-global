import type { PrismaClient } from './generated/prisma/client'

// next-on-pages stores the CF request context (env, request, ctx) under this
// global symbol before calling each edge handler. Reading it here is equivalent
// to calling getRequestContext() from @cloudflare/next-on-pages but avoids any
// package import so webpack/esbuild never need to resolve that ESM-only package.
const CF_CTX_SYM = Symbol.for('__cloudflare-request-context__')

let _clientPromise: Promise<PrismaClient> | null = null

async function initClient(): Promise<PrismaClient> {
  if (process.env.NODE_ENV !== 'production') {
    const { PrismaClient: PC } = require('./generated/prisma/client')
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
    const path = require('path')
    const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
    return new PC({ adapter } as never)
  } else {
    const { PrismaClient: PC } = require('./generated/prisma/client')
    const { PrismaD1 } = require('@prisma/adapter-d1')
    const cfCtx = (globalThis as any)[CF_CTX_SYM]
    if (!cfCtx) throw new Error('Cloudflare request context not available — is runtime="edge"?')
    const adapter = new PrismaD1(cfCtx.env.DB)
    return new PC({ adapter } as never)
  }
}

function getClient(): Promise<PrismaClient> {
  if (!_clientPromise) _clientPromise = initClient()
  return _clientPromise
}

// Double-proxy: db.blogPost.findMany(args) etc. all work unchanged.
// Each method returns a Promise so the existing `await db.x.y(...)` calls work.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (typeof prop !== 'string') return undefined
    if (prop.startsWith('$')) {
      return (...args: unknown[]) => getClient().then((c) => (c as any)[prop](...args))
    }
    return new Proxy({} as any, {
      get(_, method) {
        if (typeof method !== 'string') return undefined
        return (...args: unknown[]) =>
          getClient().then((c) => (c as any)[prop][method](...args))
      },
    })
  },
})
