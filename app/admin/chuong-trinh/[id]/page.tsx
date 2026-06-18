export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import ProgramForm from '../ProgramForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params
  const program = await db.program.findUnique({ where: { id } })
  if (!program) notFound()

  return (
    <div>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Chỉnh sửa chương trình</h1>
      <ProgramForm program={program} />
    </div>
  )
}
