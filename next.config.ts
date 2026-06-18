import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'better-sqlite3',
    '@prisma/adapter-better-sqlite3',
    '@prisma/adapter-d1',
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // @cloudflare/next-on-pages only has ESM exports (no "require" condition).
      // Webpack's serverExternalPackages still validates the exports field and fails.
      // Using the externals object bypasses exports validation entirely —
      // webpack emits require('@cloudflare/next-on-pages') directly in the output,
      // and esbuild (run by next-on-pages after next build) handles ESM/CJS interop.
      const prev = Array.isArray(config.externals)
        ? config.externals
        : config.externals
          ? [config.externals]
          : []
      config.externals = [
        ...prev,
        { '@cloudflare/next-on-pages': 'commonjs @cloudflare/next-on-pages' },
      ]
    }
    return config
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.cloudflare.com' },
    ],
  },
}

export default nextConfig
