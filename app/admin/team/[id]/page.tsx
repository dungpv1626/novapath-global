import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import TeamForm from '../TeamForm'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const member = await db.teamMember.findUnique({ where: { id } })
  if (!member) notFound()

  return (
    <div>
      <Link href="/admin/team" className="inline-flex items-center gap-1 text-[#5b6b86] text-[13px] hover:text-[#1d5fe0] mb-6 transition-colors">
        <ChevronLeft size={16} /> Quay lại
      </Link>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Sửa: {member.name}</h1>
      <TeamForm member={member} />
    </div>
  )
}
