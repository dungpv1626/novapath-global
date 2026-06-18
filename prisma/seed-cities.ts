import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
const db = new PrismaClient({ adapter } as never)

const cities = [
  { name: 'Bắc Kinh', meta: 'ĐH Thanh Hoa · Bắc Kinh · BLCU', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80', order: 1 },
  { name: 'Thượng Hải', meta: 'ĐH Phúc Đán · Đồng Tế · SJTU', image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&q=80', order: 2 },
  { name: 'Quảng Châu', meta: 'ĐH Trung Sơn · SCUT', image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600&q=80', order: 3 },
  { name: 'Nam Kinh', meta: 'ĐH Nam Kinh · Đông Nam', image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80', order: 4 },
  { name: 'Hàng Châu', meta: 'ĐH Chiết Giang', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80', order: 5 },
  { name: 'Vũ Hán', meta: 'ĐH Vũ Hán · HUST', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80', order: 6 },
  { name: 'Thành Đô', meta: 'ĐH Tứ Xuyên · UESTC', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80', order: 7 },
  { name: 'Thiên Tân', meta: 'ĐH Nam Khai · Thiên Tân', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', order: 8 },
]

async function main() {
  const count = await db.city.count()
  if (count > 0) {
    console.log(`Cities already seeded (${count} records). Skipping.`)
    return
  }
  await db.city.createMany({ data: cities })
  console.log(`Seeded ${cities.length} cities.`)
}

main().catch(console.error).finally(() => db.$disconnect())
