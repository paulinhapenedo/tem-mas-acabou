import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname !== '/unauthenticated') {
    return NextResponse.redirect(new URL('/unauthenticated', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/profile/:path*'],
};
