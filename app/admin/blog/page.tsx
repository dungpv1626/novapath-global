export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil, Eye } from 'lucide-react'
import DeleteButton from '../_components/DeleteButton'

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Blog / Tin tức</h1>
          <p className="text-[#5b6b86] text-[15px] mt-1">{posts.length} bài viết</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 bg-[#1d5fe0] text-white font-[family-name:var(--font-head)] font-semibold text-[14px] px-5 py-[11px] rounded-[12px] hover:bg-[#1546b0] transition-colors">
          <Plus size={16} /> Thêm bài viết
        </Link>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#5b6b86]">Chưa có bài viết nào.</p>
            <Link href="/admin/blog/new" className="mt-4 inline-block text-[#1d5fe0] font-semibold hover:underline">Tạo bài viết đầu tiên →</Link>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e3eaf5] bg-[#f8fafd]">
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Tiêu đề</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden md:table-cell">Danh mục</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider hidden lg:table-cell">Ngày tạo</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Trạng thái</th>
                <th className="px-5 py-3 font-[family-name:var(--font-head)] font-semibold text-[12px] text-[#5b6b86] uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[#e3eaf5] last:border-0 hover:bg-[#f8fafd] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-[family-name:var(--font-head)] font-medium text-[14px] text-[#0f1f3d] line-clamp-1">{post.title}</p>
                    <p className="text-[12px] text-[#5b6b86] mt-0.5">/{post.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-[12px] text-[#5b6b86] bg-[#f3f7fd] px-2.5 py-1 rounded-[6px]">{post.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#5b6b86] hidden lg:table-cell">
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-[999px] ${post.published ? 'bg-[#e3f6ec] text-[#1c9b63]' : 'bg-[#e3eaf5] text-[#5b6b86]'}`}>
                      {post.published ? 'Đã đăng' : 'Nháp'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link href={`/tin-tuc/${post.slug}`} target="_blank" className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/blog/${post.id}`} className="p-2 text-[#5b6b86] hover:text-[#1d5fe0] hover:bg-[#e7effd] rounded-[8px] transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton id={post.id} endpoint="/api/admin/blog" label={post.title} />
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
