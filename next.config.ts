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
      // (UnhandledSchemeError). 'module' type also fails ("doesn't support
      // dynamic import"). Use 'commonjs' — webpack emits require() calls
      // without reading the files. next-on-pages esbuild converts CJS to ESM
      // and Cloudflare Workers resolves node:* at runtime via nodejs_compat.
      config.externals = [
        ...prev,
        (ctx: { request?: string }, cb: (e: null, r?: string) => void) => {
          const req = ctx.request ?? ''
          if (req.startsWith('node:')) return cb(null, `commonjs ${req}`)
          if (req === '@cloudflare/next-on-pages') return cb(null, 'commonjs @cloudflare/next-on-pages')
          cb(null)
        },
      ]
    } else {
      // Node.js runtime: @cloudflare/next-on-pages is ESM-only (no "require" exports
      // condition). Bypass exports field validation with a CJS external — webpack emits
      // require('@cloudflare/next-on-pages') and esbuild resolves it in the CF build.
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
