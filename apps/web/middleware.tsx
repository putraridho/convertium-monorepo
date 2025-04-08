import { TOKEN_KEY } from "@convertium/constants";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from cookies
  const token = request.cookies.get(TOKEN_KEY);

  if (!!token && (path.includes("/login") || path.includes("/signup"))) {
    return NextResponse.redirect(new URL("/profile/basic-details", request.url));
  }

  // Public paths that don't require authentication
  const publicPaths = ["/signup", "/login"];

  // Check if current path is public
  const isPublicPath = publicPaths.some((p) => path.startsWith(p));

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect to login if no token on protected routes
  if (!token) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (path === "/profile") {
    return NextResponse.redirect(new URL(`/profile/basic-details`, request.url));
  }
  if (path === "/edit-profile") {
    return NextResponse.redirect(new URL(`/edit-profile/basic-details`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
