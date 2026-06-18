export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from '../_components/DeleteButton'

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Đội ngũ</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">{members.length} thành viên</p>
        </div>
        <Link href="/admin/team/new" className="inline-flex items-center gap-2 bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[14px] px-5 py-[11px] rounded-[12px] hover:bg-[#1546b0] transition-colors">
          <Plus size={16} /> Thêm thành viên
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-5 flex items-center gap-4">
            <Image src={m.image} alt={m.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#0f1f3d]">{m.name}</p>
              <p className="text-[13px] text-[#5b6b86] mt-0.5 line-clamp-2">{m.role}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Link href={`/admin/team/${m.id}`} className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                <Pencil size={15} />
              </Link>
              <DeleteButton id={m.id} endpoint="/api/admin/team" label={m.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
