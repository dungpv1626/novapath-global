import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  authorRole: string
  coverImg: string
  content: string
  readTime: string
}

const postsDir = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace('.md', '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data, content } = matter(raw)
      return { slug, content, ...(data as Omit<Post, 'slug' | 'content'>) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  const file = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(file)) return undefined
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return { slug, content, ...(data as Omit<Post, 'slug' | 'content'>) }
}
