import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-utils"; // Adjust the path if necessary

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("AUTH_TOKEN");

  if (token) {
    try {
      const decodedToken = await verifyToken(token.value);

      if (
        decodedToken &&
        (pathname === "/auth/sign-in" || pathname === "/auth/sign-up")
      ) {
        return NextResponse.redirect(new URL("/browse", req.url));
      }

      if (decodedToken && isProtectedRoute(pathname)) {
        return NextResponse.next();
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/auth/sign-in", req.url));
      response.cookies.delete("AUTH_TOKEN");
      return response;
    }
  }

  if (isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    "/browse",
    "/loans",
    "/requests",
    "/bookmarks",
    "/account",
  ];
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/browse/:path*",
    "/auth/sign-in",
  ],
};
