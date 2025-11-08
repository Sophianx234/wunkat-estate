import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If route is protected and no token exists
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, verify it
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // Token is valid → allow access
      return NextResponse.next();
    } catch (error: any) {
      console.error("JWT verification failed:", error.message);

      // Handle specific JWT errors
      const loginUrl = new URL("/login", request.url);

      if (error.name === "TokenExpiredError") {
        loginUrl.searchParams.set("error", "expired");
      } else {
        loginUrl.searchParams.set("error", "invalid");
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  // Default → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
