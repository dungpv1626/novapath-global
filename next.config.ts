import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@cloudflare/next-on-pages',
    'better-sqlite3',
    '@prisma/adapter-better-sqlite3',
    '@prisma/adapter-d1',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.cloudflare.com' },
    ],
  },
}

export default nextConfig
