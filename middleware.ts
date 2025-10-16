import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    // Only handle /api/render redirects
    if (request.nextUrl.pathname.startsWith('/api/render')) {
      const searchParams = request.nextUrl.searchParams
      const screen = searchParams.get('screen') || 'default'
      
      // Redirect to the correct bitmap endpoint
      const url = new URL(`/api/bitmap/${screen}.bmp`, request.url)
      
      // Copy other search params
      searchParams.forEach((value, key) => {
        if (key !== 'screen') {
          url.searchParams.append(key, value)
        }
      })
      
      return NextResponse.redirect(url, 308)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[MIDDLEWARE] Error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/api/:path*'
}