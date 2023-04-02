import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  console.log(url.pathname);
  if (
    url.pathname !== '/dashboard' &&
    req.cookies?.get('logged_in')?.value === 'true'
  ) {
    url.pathname = '/dashboard';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/login'],
};
