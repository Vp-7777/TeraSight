/**
 * middleware.ts
 *
 * Next.js Edge Middleware route guards.
 * It intercepts incoming HTTP requests at the edge, checks for the existence of
 * the session token cookie, and automatically redirects unauthenticated requests
 * away from secure pages, or authenticated requests away from login credentials forms.
 *
 * Purpose & Logic Author: Vishal
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // [Vishal] Retrieve session validation cookie status to enforce route boundaries
  const sessionToken = request.cookies.get("terasight_session_token")?.value;
  const isAuthenticated = sessionToken === "authenticated";

  // Routes that require authentication (the dashboard application pages)
  const protectedRoutes = [
    "/dashboard",
    "/globe",
    "/map",
    "/missions",
    "/analyze",
    "/carbon",
    "/cost",
    "/intelligence",
    "/organizations",
    "/settings",
    "/reports",
    "/sites",
    "/team",
    "/before-after",
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Auth pages (login, signup, forgot-password, verify-email)
  const authRoutes = ["/login", "/signup", "/forgot-password", "/verify-email"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isProtectedRoute && !isAuthenticated) {
    // [Vishal] Redirect unauthorized users back to /login with callbackUrl params for automated return
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    // [Vishal] Redirect logged-in users away from authentication pages directly to the dashboard shell
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Matching Paths config for Next.js Middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public asset images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
