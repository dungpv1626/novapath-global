import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'better-sqlite3',
    '@prisma/adapter-better-sqlite3',
    '@prisma/adapter-d1',
  ],
  webpack: (config, { isServer, nextRuntime }) => {
    if (!isServer) return config

    const prev = (
      Array.isArray(config.externals)
        ? config.externals
        : config.externals
          ? [config.externals]
          : []
    ) as unknown[]

    if (nextRuntime === 'edge') {
      // Edge runtime webpack cannot handle node: URI scheme natively
      // (UnhandledSchemeError). 'commonjs' type emits require() calls that
      // nodejs_compat in wrangler.toml resolves at runtime in CF Workers.
      // @cloudflare/next-on-pages is NOT imported anywhere in our runtime code
      // (lib/db.ts reads the CF context via Symbol.for directly).
      config.externals = [
        ...prev,
        (ctx: { request?: string }, cb: (e: null, r?: string) => void) => {
          const req = ctx.request ?? ''
          if (req.startsWith('node:')) return cb(null, `commonjs ${req}`)
          cb(null)
        },
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
