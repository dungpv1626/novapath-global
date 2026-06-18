import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const adapter = new PrismaBetterSqlite3({ url: `file:${path.join(process.cwd(), 'dev.db')}` })
const db = new PrismaClient({ adapter } as never)

const programs = [
  { title: 'Cử nhân Quản trị Kinh doanh — ĐH Phúc Đán', tag: 'Kinh doanh', tab: 'dai-hoc', rating: 4.9, reviews: '320', duration: '3 năm', note: 'Học bổng 30%', price: '~150tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', order: 1 },
  { title: 'Cử nhân Khoa học Máy tính — ĐH Thanh Hoa', tag: 'Công nghệ', tab: 'dai-hoc', rating: 4.8, reviews: '210', duration: '4 năm', note: 'Học bổng CSC', price: '~160tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80', order: 2 },
  { title: 'Thạc sĩ MBA — ĐH Bắc Kinh', tag: 'Quản trị', tab: 'thac-si', rating: 5.0, reviews: '96', duration: '1.5–2 năm', note: 'Học bổng 40%', price: '~220tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', order: 1 },
  { title: 'Thạc sĩ Khoa học Dữ liệu — ĐH Chiết Giang', tag: 'Dữ liệu', tab: 'thac-si', rating: 4.9, reviews: '74', duration: '1 năm', note: 'Học bằng tiếng Anh', price: '~180tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', order: 2 },
  { title: 'Tiếng Trung HSK 1–6 — ĐH Ngôn ngữ Bắc Kinh', tag: 'Tiếng Trung', tab: 'tieng-du-bi', rating: 4.8, reviews: '188', duration: '3–12 tháng', note: 'Nhập học linh hoạt', price: '~90tr', priceUnit: 'khóa', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80', order: 1 },
  { title: 'Dự bị tiếng Trung — ĐH Đồng Tế', tag: 'Dự bị', tab: 'tieng-du-bi', rating: 4.7, reviews: '132', duration: '8–12 tháng', note: 'Lên thẳng năm 1', price: '~120tr', priceUnit: 'khóa', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', order: 2 },
  { title: 'Trung học phổ thông — Thượng Hải', tag: 'THPT', tab: 'trung-hoc', rating: 4.9, reviews: '101', duration: 'Lớp 9–12', note: 'Trường công lập', price: '~140tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80', order: 1 },
  { title: 'Trường nội trú quốc tế — Bắc Kinh', tag: 'Nội trú', tab: 'trung-hoc', rating: 4.8, reviews: '88', duration: 'A-Level', note: 'Chăm sóc 24/7', price: '~98tr', priceUnit: 'năm', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80', order: 2 },
]

async function main() {
  const count = await db.program.count()
  if (count > 0) {
    console.log(`Programs already seeded (${count} records). Skipping.`)
    return
  }
  await db.program.createMany({ data: programs })
  console.log(`Seeded ${programs.length} programs.`)
}

main().catch(console.error).finally(() => db.$disconnect())
