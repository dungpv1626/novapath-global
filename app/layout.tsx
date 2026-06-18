import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Inter } from 'next/font/google'
import './globals.css'
import PublicLayout from '@/components/layout/PublicLayout'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-head',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NOVAPATH GLOBAL — Du học Trung Quốc uy tín',
  description: 'NOVAPATH GLOBAL — Tư vấn du học Trung Quốc trọn gói: trường đại học, học bổng, khóa học tiếng Trung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${inter.variable}`}>
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  )
}
