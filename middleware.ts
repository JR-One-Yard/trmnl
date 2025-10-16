import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log all API requests for debugging
  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log(`[MIDDLEWARE] ${request.method} ${request.nextUrl.pathname}${request.nextUrl.search}`)
    console.log('[MIDDLEWARE] Headers:', Object.fromEntries(request.headers.entries()))
  }

  // Handle any legacy /api/render requests and redirect to bitmap
  if (request.nextUrl.pathname.startsWith('/api/render')) {
    console.log('[MIDDLEWARE] Redirecting /api/render to /api/bitmap')
    
    // Extract screen parameter if present
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
}

export const config = {
  matcher: '/api/:path*'
}