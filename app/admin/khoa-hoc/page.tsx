export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from '../_components/DeleteButton'

export default async function AdminKhoaHocPage() {
  const courses = await db.course.findMany({ orderBy: [{ tab: 'asc' }, { order: 'asc' }] })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Khóa học tiếng Trung</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">{courses.length} khóa học</p>
        </div>
        <Link href="/admin/khoa-hoc/new" className="inline-flex items-center gap-2 bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[14px] px-5 py-[11px] rounded-[12px] hover:bg-[#1546b0] transition-colors">
          <Plus size={16} /> Thêm khóa học
        </Link>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] overflow-hidden">
        {courses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#5b6b86]">Chưa có khóa học nào.</p>
            <Link href="/admin/khoa-hoc/new" className="mt-4 inline-block text-[#1d5fe0] font-semibold hover:underline">Thêm khóa học đầu tiên →</Link>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e3eaf5] bg-[#f8fafd]">
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Khóa học</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden md:table-cell">Tab</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Cấp độ</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Học phí</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-[#e3eaf5] last:border-0 hover:bg-[#f8fafd] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d]">{c.title}</p>
                    <p className="text-[12px] text-[#5b6b86]">{c.tag}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-[12px] bg-[#e7effd] text-[#1d5fe0] px-2.5 py-1 rounded-[6px] font-medium">{c.tab}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden lg:table-cell">{c.level}</td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0f1f3d] hidden lg:table-cell">{c.price}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/khoa-hoc/${c.id}`} className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton id={c.id} endpoint="/api/admin/khoa-hoc" label={c.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
