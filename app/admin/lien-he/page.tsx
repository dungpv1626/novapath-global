export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import ContactList from './ContactList'

export default async function ContactPage() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Liên hệ tư vấn</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">
            {submissions.length} yêu cầu •{' '}
            {submissions.filter((s: any) => !s.read).length} chưa đọc
          </p>
        </div>
      </div>

      <ContactList submissions={submissions} />
    </div>
  )
}
