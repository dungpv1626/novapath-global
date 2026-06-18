export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ScholarshipForm from '../ScholarshipForm'

export default async function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scholarship = await db.scholarship.findUnique({ where: { id } })
  if (!scholarship) notFound()

  return (
    <div>
      <Link href="/admin/hoc-bong" className="inline-flex items-center gap-1 text-[#5b6b86] text-[13px] hover:text-[#1d5fe0] mb-6 transition-colors">
        <ChevronLeft size={16} /> Quay lại
      </Link>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Sửa: {scholarship.name}</h1>
      <ScholarshipForm scholarship={scholarship} />
    </div>
  )
}
