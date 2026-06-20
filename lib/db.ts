import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

type OrderDir = 'asc' | 'desc'
type OrderBy = Record<string, OrderDir> | Array<Record<string, OrderDir>>
type WhereClause = Record<string, any>

function applyWhere(q: any, where: WhereClause): any {
  for (const [key, value] of Object.entries(where)) {
    if (key === 'NOT' && value && typeof value === 'object') {
      for (const [notKey, notValue] of Object.entries(value as Record<string, any>)) {
        q = q.neq(notKey, notValue)
      }
    } else if (value !== undefined && value !== null) {
      q = q.eq(key, value)
    }
  }
  return q
}

function applyOrderBy(q: any, orderBy: OrderBy): any {
  const orders = Array.isArray(orderBy) ? orderBy : [orderBy]
  for (const order of orders) {
    for (const [col, dir] of Object.entries(order)) {
      q = q.order(col, { ascending: dir === 'asc' })
    }
  }
  return q
}

function makeModel(table: string) {
  return {
    async findMany({ where, orderBy, take, skip }: { where?: WhereClause; orderBy?: OrderBy; take?: number; skip?: number } = {}) {
      const sb = getSupabase()
      let q = sb.from(table).select('*')
      if (where) q = applyWhere(q, where)
      if (orderBy) q = applyOrderBy(q, orderBy)
      if (typeof skip === 'number' && typeof take === 'number') {
        q = q.range(skip, skip + take - 1)
      } else if (typeof take === 'number') {
        q = q.limit(take)
      }
      const { data, error } = await q
      if (error) throw new Error(`[${table}] findMany: ${error.message}`)
      return data ?? []
    },

    async findUnique({ where }: { where: WhereClause }) {
      const sb = getSupabase()
      let q = sb.from(table).select('*')
      q = applyWhere(q, where)
      const { data, error } = await q.limit(1).maybeSingle()
      if (error) throw new Error(`[${table}] findUnique: ${error.message}`)
      return data ?? null
    },

    async findFirst({ where, orderBy }: { where?: WhereClause; orderBy?: OrderBy } = {}) {
      const sb = getSupabase()
      let q = sb.from(table).select('*')
      if (where) q = applyWhere(q, where)
      if (orderBy) q = applyOrderBy(q, orderBy)
      const { data, error } = await q.limit(1).maybeSingle()
      if (error) throw new Error(`[${table}] findFirst: ${error.message}`)
      return data ?? null
    },

    async create({ data }: { data: Record<string, any> }) {
      const sb = getSupabase()
      const now = new Date().toISOString()
      const record = {
        id: data.id ?? crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        ...data,
      }
      const { data: result, error } = await sb.from(table).insert(record).select().single()
      if (error) throw new Error(`[${table}] create: ${error.message}`)
      return result
    },

    async update({ where, data }: { where: WhereClause; data: Record<string, any> }) {
      const sb = getSupabase()
      const record = { ...data, updatedAt: new Date().toISOString() }
      let q = sb.from(table).update(record)
      q = applyWhere(q, where)
      const { data: result, error } = await q.select().single()
      if (error) throw new Error(`[${table}] update: ${error.message}`)
      return result
    },

    async upsert({ where, create, update }: { where: WhereClause; create: Record<string, any>; update: Record<string, any> }) {
      const sb = getSupabase()
      const now = new Date().toISOString()
      const record = {
        id: where.id ?? create.id ?? crypto.randomUUID(),
        createdAt: now,
        ...create,
        ...update,
        updatedAt: now,
      }
      const { data: result, error } = await sb.from(table).upsert(record).select().single()
      if (error) throw new Error(`[${table}] upsert: ${error.message}`)
      return result
    },

    async delete({ where }: { where: WhereClause }) {
      const sb = getSupabase()
      let q = sb.from(table).delete()
      q = applyWhere(q, where)
      const { data: result, error } = await q.select().single()
      if (error) throw new Error(`[${table}] delete: ${error.message}`)
      return result
    },

    async count({ where }: { where?: WhereClause } = {}) {
      const sb = getSupabase()
      let q = sb.from(table).select('*', { count: 'exact', head: true })
      if (where) q = applyWhere(q, where)
      const { count, error } = await q
      if (error) throw new Error(`[${table}] count: ${error.message}`)
      return count ?? 0
    },
  }
}

export const db = {
  adminUser: makeModel('AdminUser'),
  blogPost: makeModel('BlogPost'),
  university: makeModel('University'),
  scholarship: makeModel('Scholarship'),
  course: makeModel('Course'),
  teamMember: makeModel('TeamMember'),
  testimonial: makeModel('Testimonial'),
  city: makeModel('City'),
  program: makeModel('Program'),
  siteSettings: makeModel('SiteSettings'),
}
