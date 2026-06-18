import { PrismaClient } from './generated/prisma/client'

let _client: PrismaClient | undefined

// Proxy — existing code dùng `db.xxx` không cần thay đổi
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_client) {
      if (process.env.NODE_ENV !== 'production') {
        // Local dev: SQLite
        const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
        const path = require('path')
        const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
        _client = new PrismaClient({ adapter } as never)
      } else {
        // Cloudflare D1 — webpackIgnore prevents bundler from resolving these at build time
        const { getRequestContext } = require(/* webpackIgnore: true */ '@cloudflare/next-on-pages')
        const { PrismaD1 } = require(/* webpackIgnore: true */ '@prisma/adapter-d1')
        const { env } = getRequestContext()
        const adapter = new PrismaD1(env.DB)
        _client = new PrismaClient({ adapter } as never)
      }
    }
    return Reflect.get(_client, prop, _client)
  },
})
