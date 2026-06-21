import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'

  if (!isLoginPage && pathname.startsWith('/admin')) {
    const token =
      req.cookies.get('novapath-admin-session')?.value

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (isLoginPage) {
    const token =
      req.cookies.get('novapath-admin-session')?.value
    if (token) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
