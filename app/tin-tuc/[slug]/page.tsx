export const runtime = 'edge'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Phone } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — NOVAPATH GLOBAL`,
    description: post.description,
  }
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>[\s\S]*?)+/gm, (m) => {
      const isOrdered = /^\d+\./.test(m)
      return isOrdered ? `<ol>${m}</ol>` : `<ul>${m}</ul>`
    })
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbouali])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/\| (.+) \| (.+) \| (.+) \|/g, '<tr><td>$1</td><td>$2</td><td>$3</td></tr>')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)

  return (
    <RevealProvider>
      {/* Article hero */}
      <section className="relative bg-navy text-white overflow-hidden" style={{ paddingBlock: 'clamp(46px,6vw,78px)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(760px 380px at 86% -12%,rgba(56,189,248,.2),transparent 60%),radial-gradient(680px 380px at 0% 120%,rgba(29,95,224,.3),transparent 60%)' }} />
        <div className="relative max-w-[840px] mx-auto px-[clamp(20px,5vw,56px)]">
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 font-[family-name:var(--font-head)] font-semibold text-[14px] text-primary mb-6">
            <ArrowLeft size={16} /> Quay lại tin tức
          </Link>
          <span className="inline-block bg-primary text-white font-[family-name:var(--font-head)] font-semibold text-[12px] uppercase tracking-[0.06em] px-[14px] py-[6px] rounded-[999px] mb-[18px]">
            {post.category}
          </span>
          <h1 className="text-white mb-[18px]" style={{ fontSize: 'clamp(28px,4vw,46px)', lineHeight: 1.15 }}>{post.title}</h1>
          <div className="flex gap-[14px] flex-wrap text-[#a9bdde] text-[14.5px] items-center">
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-white/32" />
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/32" />
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-[1000px] mx-auto px-[clamp(20px,5vw,56px)] -mt-[58px] relative z-10">
        <Image
          src={post.coverImg}
          alt={post.title}
          width={1000}
          height={440}
          className="w-full rounded-[22px] object-cover shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)]"
          style={{ height: 'clamp(230px,40vw,440px)' }}
        />
      </div>

      {/* Prose */}
      <div className="max-w-[768px] mx-auto px-[clamp(20px,5vw,56px)] prose" style={{ paddingBlock: 'clamp(38px,5vw,60px)' }}>
        <p className="lead-p">{post.description}</p>
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

        {/* Tags */}
        <div className="flex gap-[10px] flex-wrap mt-9">
          {[post.category, 'Du học Trung Quốc', 'NOVAPATH'].map((tag) => (
            <span key={tag} className="bg-bg-soft border border-line text-muted text-[13px] px-[14px] py-[6px] rounded-[999px]">{tag}</span>
          ))}
        </div>

        {/* Author box */}
        <div className="flex gap-4 items-center bg-white border border-line rounded-[22px] p-[22px_24px] shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] mt-8">
          <div className="w-[62px] h-[62px] rounded-full bg-primary-soft text-primary grid place-items-center flex-shrink-0 text-2xl font-bold font-[family-name:var(--font-head)]">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-[family-name:var(--font-head)] font-bold text-[16px]">{post.author}</div>
            <div className="text-muted text-[14px]">{post.authorRole}</div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
          <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
            <h2 className="text-[clamp(24px,3vw,32px)] mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/tin-tuc/${p.slug}`}
                  className="group bg-white border border-line rounded-[22px] overflow-hidden shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 transition-all duration-300 flex flex-col">
                  <div className="relative h-[200px]">
                    <Image src={p.coverImg} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="p-[22px] flex flex-col flex-1">
                    <h3 className="text-[17px] mb-2 group-hover:text-primary transition-colors leading-[1.3]">{p.title}</h3>
                    <span className="inline-flex items-center gap-1 mt-auto font-[family-name:var(--font-head)] font-semibold text-[13.5px] text-primary">
                      Đọc thêm <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <CTABanner
            title="Có câu hỏi về du học Trung Quốc?"
            desc="Nhận tư vấn miễn phí từ chuyên gia NOVAPATH — giải đáp mọi thắc mắc của bạn."
            actions={
              <>
                <Button href="/lien-he" variant="light">Đặt lịch tư vấn <ArrowRight size={17} /></Button>
                <Button href="tel:19006868" variant="accent"><Phone size={17} /> 1900 6868</Button>
              </>
            }
          />
        </div>
      </section>
    </RevealProvider>
  )
}
