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
      // Edge runtime webpack cannot handle node: scheme natively.
      // Mark node:* built-ins as ESM module externals so webpack emits
      // `import 'node:crypto'` etc. — next-on-pages esbuild then marks
      // them as external, and Cloudflare Workers resolves them at runtime
      // via the nodejs_compat flag in wrangler.toml.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config.externals = [
        ...prev,
        (ctx: { request?: string }, cb: (e: null, r?: string) => void) => {
          const req = ctx.request ?? ''
          if (req.startsWith('node:')) return cb(null, `module ${req}`)
          if (req === '@cloudflare/next-on-pages') return cb(null, 'module @cloudflare/next-on-pages')
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
