import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;
  
  // Simple middleware without NextAuth for now
  // This avoids the bcrypt dependency issues in edge runtime
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  
  if (isOnDashboard) {
    // For now, allow access to dashboard
    // You can add session checking logic here later
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
