export const runtime = 'edge'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import CourseForm from '../CourseForm'

export default function NewCoursePage() {
  return (
    <div>
      <Link href="/admin/khoa-hoc" className="inline-flex items-center gap-1 text-[#5b6b86] text-[13px] hover:text-[#1d5fe0] mb-6 transition-colors">
        <ChevronLeft size={16} /> Quay lại
      </Link>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Thêm khóa học</h1>
      <CourseForm />
    </div>
  )
}
