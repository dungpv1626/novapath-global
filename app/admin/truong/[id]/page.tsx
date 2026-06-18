export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import UniversityForm from '../UniversityForm'

export default async function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const university = await db.university.findUnique({ where: { id } })
  if (!university) notFound()

  return (
    <div>
      <Link href="/admin/truong" className="inline-flex items-center gap-1 text-[#5b6b86] text-[13px] hover:text-[#1d5fe0] mb-6 transition-colors">
        <ChevronLeft size={16} /> Quay lại danh sách
      </Link>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Sửa trường: {university.name}</h1>
      <UniversityForm university={university} />
    </div>
  )
}
