import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    // Redirect to login if trying to access a protected route without being authenticated
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect to dashboard if logged in and trying to access login/signup
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
