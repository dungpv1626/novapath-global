import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import BlogForm from '../BlogForm'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await db.blogPost.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-1 text-[#5b6b86] text-[13px] hover:text-[#1d5fe0] mb-6 transition-colors">
        <ChevronLeft size={16} /> Quay lại danh sách
      </Link>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Sửa bài viết</h1>
      <BlogForm post={post} />
    </div>
  )
}
