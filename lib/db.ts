import type { PrismaClient } from './generated/prisma/client'

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
    // webpackIgnore: webpack leaves this as a native import() in the bundle.
    // next-on-pages esbuild then handles @cloudflare/next-on-pages natively,
    // replacing it with the CF Workers runtime implementation. Without this
    // comment, webpack converts import() to require() which esbuild cannot
    // resolve because the package has no CJS exports.
    const { getRequestContext } = await import(/* webpackIgnore: true */ '@cloudflare/next-on-pages')
    const { env } = getRequestContext() as any
    const adapter = new PrismaD1(env.DB)
    return new PC({ adapter } as never)
  }
}

function getClient(): Promise<PrismaClient> {
  if (!_clientPromise) _clientPromise = initClient()
  return _clientPromise
}

// Double-proxy: outer catches model names, inner catches method names.
// Usage db.blogPost.findMany(args) works unchanged — each method returns a Promise.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (typeof prop !== 'string') return undefined
    if (prop.startsWith('$')) {
      // Direct PrismaClient methods: $transaction, $executeRaw, etc.
      return (...args: unknown[]) => getClient().then((c) => (c as any)[prop](...args))
    }
    // Model delegates
    return new Proxy({} as any, {
      get(_, method) {
        if (typeof method !== 'string') return undefined
        return (...args: unknown[]) =>
          getClient().then((c) => (c as any)[prop][method](...args))
      },
    })
  },
})
