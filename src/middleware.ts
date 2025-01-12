import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // first we will check where is user
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === 'verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login' , request.nextUrl))
    }

  
}
 
// See "Matching Paths" below to learn more -->run the code before reaching to the route
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ],
}