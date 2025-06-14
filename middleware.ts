// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   const isAuthPage =
//     request.nextUrl.pathname === '/login' ||
//     request.nextUrl.pathname === '/register';

//   if (!token && !isAuthPage) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/write', '/profile', '/login', '/register'],
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.get('next-auth.session-token')?.value;

  const isAuthPage =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register';

  if (!hasSession && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/write', '/profile/:path*', '/login', '/register'],
};
