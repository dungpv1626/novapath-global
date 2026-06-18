export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from '../_components/DeleteButton'

export default async function AdminThanhPhoPage() {
  const cities = await db.city.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Thành phố du học</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">{cities.length} thành phố — hiển thị trang Du học Trung Quốc</p>
        </div>
        <Link href="/admin/thanh-pho/new" className="inline-flex items-center gap-2 bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[14px] px-5 py-[11px] rounded-[12px] hover:bg-[#1546b0] transition-colors">
          <Plus size={16} /> Thêm thành phố
        </Link>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] overflow-hidden">
        {cities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#5b6b86]">Chưa có thành phố nào.</p>
            <Link href="/admin/thanh-pho/new" className="mt-4 inline-block text-[#1d5fe0] font-semibold hover:underline">Thêm thành phố đầu tiên →</Link>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e3eaf5] bg-[#f8fafd]">
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Thành phố</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden md:table-cell">Trường tiêu biểu</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Thứ tự</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.id} className="border-b border-[#e3eaf5] last:border-0 hover:bg-[#f8fafd] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {c.image && (
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={48}
                          height={48}
                          className="w-[48px] h-[48px] rounded-[10px] object-cover flex-shrink-0"
                          unoptimized={c.image.startsWith('/')}
                        />
                      )}
                      <p className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d]">{c.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden md:table-cell">{c.meta}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden lg:table-cell">{c.order}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/thanh-pho/${c.id}`} className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton id={c.id} endpoint="/api/admin/thanh-pho" label={c.name} />
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
