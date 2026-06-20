export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import RevealProvider from '@/components/RevealProvider'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Tin tức & Cẩm nang du học — NOVAPATH GLOBAL',
  description: 'Cập nhật học bổng, kinh nghiệm và cẩm nang du học Trung Quốc mới nhất từ NOVAPATH GLOBAL.',
}

export default async function NewsPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  })

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tin tức' }]}
        title="Tin tức & Cẩm nang du học"
        description="Cập nhật học bổng, kinh nghiệm thực tế và hướng dẫn du học Trung Quốc từ đội ngũ chuyên gia NOVAPATH."
      />

      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          {/* Featured post */}
          {featured && (
            <div className="mb-[60px] reveal">
              <Eyebrow>Bài nổi bật</Eyebrow>
              <Link href={`/tin-tuc/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_16px_40px_-24px_rgba(15,40,95,0.28)] hover:shadow-[0_32px_60px_-28px_rgba(15,40,95,0.36)] transition-all duration-300">
                <div className="relative h-[300px] lg:h-auto">
                  {featured.coverImage && (
                    <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" unoptimized={featured.coverImage.startsWith('/')} />
                  )}
                </div>
                <div className="p-[32px] flex flex-col justify-center">
                  <span className="inline-block bg-primary text-white font-[family-name:var(--font-head)] font-bold text-[12px] uppercase tracking-[0.06em] px-3 py-1 rounded-[999px] mb-4">
                    {featured.category}
                  </span>
                  <h2 className="text-[clamp(22px,2.5vw,30px)] mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-muted mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-[13.5px] text-muted mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
                    <span>{featured.author}</span>
                    <span>{featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('vi-VN') : ''}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 font-[family-name:var(--font-head)] font-semibold text-primary">
                    Đọc bài <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Posts grid */}
          <div className="text-center max-w-[740px] mx-auto mb-[40px] reveal">
            <Eyebrow center>Bài viết mới nhất</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Cẩm nang du học <span className="text-primary">từ chuyên gia</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/tin-tuc/${post.slug}`}
                className={`group bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 flex flex-col reveal ${i % 3 > 0 ? `reveal-d${i % 3}` : ''}`}>
                <div className="relative h-[200px] bg-bg-soft">
                  {post.coverImage && (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" unoptimized={post.coverImage.startsWith('/')} />
                  )}
                  <span className="absolute top-3 left-3 bg-white text-primary font-[family-name:var(--font-head)] font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-1 rounded-[999px]">
                    {post.category}
                  </span>
                </div>
                <div className="p-[22px] flex flex-col flex-1">
                  <h3 className="text-[18px] mb-3 group-hover:text-primary transition-colors leading-[1.3]">{post.title}</h3>
                  <p className="text-muted text-[14px] flex-1 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[13px] text-muted pt-4 border-t border-line">
                    <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
