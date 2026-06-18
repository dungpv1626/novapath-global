import { db } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from '../_components/DeleteButton'

export default async function AdminTruongPage() {
  const universities = await db.university.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Trường đại học</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">{universities.length} trường</p>
        </div>
        <Link href="/admin/truong/new" className="inline-flex items-center gap-2 bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[14px] px-5 py-[11px] rounded-[12px] hover:bg-[#1546b0] transition-colors">
          <Plus size={16} /> Thêm trường
        </Link>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e3eaf5] bg-[#f8fafd]">
              <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Trường</th>
              <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden md:table-cell">Thành phố</th>
              <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Xếp hạng</th>
              <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Học phí</th>
              <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u) => (
              <tr key={u.id} className="border-b border-[#e3eaf5] last:border-0 hover:bg-[#f8fafd] transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d]">{u.name}</p>
                  <p className="text-[12px] text-[#5b6b86]">{u.nameEn}</p>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden md:table-cell">{u.city}</td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className="text-[12px] font-semibold text-[#1d5fe0] bg-[#e7effd] px-2.5 py-1 rounded-[6px]">#{u.rank}</span>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden lg:table-cell">{u.tuition}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/truong/${u.id}`} className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                      <Pencil size={15} />
                    </Link>
                    <DeleteButton id={u.id} endpoint="/api/admin/truong" label={u.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
