export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { FileText, GraduationCap, Award, BookOpen, Users, Settings } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [blogs, universities, scholarships, courses, team] = await Promise.all([
    db.blogPost.count(),
    db.university.count(),
    db.scholarship.count(),
    db.course.count(),
    db.teamMember.count(),
  ])

  const recentBlogs = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, title: true, published: true, createdAt: true },
  })

  const stats = [
    { label: 'Bài viết', value: blogs, icon: FileText, href: '/admin/blog', color: 'bg-[#e7effd] text-[#1d5fe0]' },
    { label: 'Trường ĐH', value: universities, icon: GraduationCap, href: '/admin/truong', color: 'bg-[#e3f6ec] text-[#1c9b63]' },
    { label: 'Học bổng', value: scholarships, icon: Award, href: '/admin/hoc-bong', color: 'bg-[#fdf0d8] text-[#c98208]' },
    { label: 'Khóa học', value: courses, icon: BookOpen, href: '/admin/khoa-hoc', color: 'bg-[#ece8fd] text-[#6a4fd6]' },
    { label: 'Đội ngũ', value: team, icon: Users, href: '/admin/team', color: 'bg-[#fde7ee] text-[#d6486f]' },
    { label: 'Cài đặt', value: '–', icon: Settings, href: '/admin/settings', color: 'bg-[#e0f5ff] text-[#0891c4]' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Dashboard</h1>
        <p className="text-[#5b6b86] text-[15px] mt-1">Quản lý nội dung website NOVAPATH GLOBAL</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-[16px] p-5 shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] hover:shadow-[0_8px_28px_-8px_rgba(15,40,95,.16)] hover:-translate-y-[2px] transition-all flex items-center gap-4"
          >
            <span className={`w-12 h-12 rounded-[12px] ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon size={20} />
            </span>
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#0a1b3d] leading-none">{s.value}</div>
              <div className="text-[13px] text-[#5b6b86] mt-1">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent posts */}
      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#0a1b3d]">Bài viết gần đây</h2>
          <Link href="/admin/blog/new" className="text-[13px] font-[family-name:var(--font-head)] font-semibold text-[#1d5fe0] hover:underline">
            + Thêm mới
          </Link>
        </div>
        {recentBlogs.length === 0 ? (
          <p className="text-[#5b6b86] text-[14px]">Chưa có bài viết nào.</p>
        ) : (
          <div className="flex flex-col divide-y divide-[#e3eaf5]">
            {recentBlogs.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-3">
                <div>
                  <Link href={`/admin/blog/${post.id}`} className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d] hover:text-[#1d5fe0] transition-colors line-clamp-1">
                    {post.title}
                  </Link>
                  <p className="text-[12px] text-[#5b6b86] mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-[999px] ${post.published ? 'bg-[#e3f6ec] text-[#1c9b63]' : 'bg-[#e3eaf5] text-[#5b6b86]'}`}>
                  {post.published ? 'Đã đăng' : 'Nháp'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
