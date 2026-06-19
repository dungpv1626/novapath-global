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
      // without reading the files. nodejs_compat in wrangler.toml resolves
      // node:* at runtime in Cloudflare Workers.
      //
      // @cloudflare/next-on-pages is NOT listed here — all imports of that
      // package use /* webpackIgnore: true */ so webpack leaves them as native
      // import() calls. next-on-pages esbuild then handles them natively.
      config.externals = [
        ...prev,
        (ctx: { request?: string }, cb: (e: null, r?: string) => void) => {
          const req = ctx.request ?? ''
          if (req.startsWith('node:')) return cb(null, `commonjs ${req}`)
          cb(null)
        },
      ]
    } else {
      // Node.js runtime: @cloudflare/next-on-pages is ESM-only (no "require"
      // exports condition). Externalise with CJS wrapper so webpack doesn't
      // try to bundle it and fail with ERR_PACKAGE_PATH_NOT_EXPORTED.
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
