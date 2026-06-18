import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../lib/generated/prisma/client'
import path from 'path'
import fs from 'fs'

const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
const db = new PrismaClient({ adapter } as never)

async function main() {
  const [users, posts, unis, scholars, courses, team, testimonials, settings, programs, cities] = await Promise.all([
    db.adminUser.findMany(),
    db.blogPost.findMany(),
    db.university.findMany(),
    db.scholarship.findMany(),
    db.course.findMany(),
    db.teamMember.findMany(),
    db.testimonial.findMany(),
    db.siteSettings.findMany(),
    db.program.findMany(),
    db.city.findMany(),
  ])
  const data = { users, posts, unis, scholars, courses, team, testimonials, settings, programs, cities }
  fs.writeFileSync('d1-seed-data.json', JSON.stringify(data, null, 2))
  console.log('Exported:', Object.fromEntries(Object.entries(data).map(([k, v]) => [k, (v as unknown[]).length])))
}

main().catch(console.error).finally(() => db.$disconnect())
