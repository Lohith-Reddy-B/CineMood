import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/browse", "/search", "/watch-with", "/movies", "/watchlist", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get("cinemood-auth")?.value);

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/browse/:path*", "/search/:path*", "/watch-with/:path*", "/movies/:path*", "/watchlist/:path*", "/profile/:path*"],
};
