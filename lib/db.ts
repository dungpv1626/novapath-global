import type { PrismaClient } from './generated/prisma/client'

let _client: PrismaClient | undefined

// Proxy — existing code dùng `db.xxx` không cần thay đổi.
// PrismaClient is imported lazily (inside getter) so that importing this
// module does NOT load node:path / node:crypto etc. at module-load time.
// Next.js edge runtime simulator (used during `next build` to collect page data)
// would fail on those node: imports; Cloudflare Workers handles them at request time.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_client) {
      if (process.env.NODE_ENV !== 'production') {
        const { PrismaClient: PC } = require('./generated/prisma/client')
        const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
        const path = require('path')
        const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
        _client = new PC({ adapter } as never)
      } else {
        const { PrismaClient: PC } = require('./generated/prisma/client')
        const { getRequestContext } = require('@cloudflare/next-on-pages')
        const { PrismaD1 } = require('@prisma/adapter-d1')
        const { env } = getRequestContext()
        const adapter = new PrismaD1(env.DB)
        _client = new PC({ adapter } as never)
      }
    }
    return Reflect.get(_client!, prop, _client)
  },
})
