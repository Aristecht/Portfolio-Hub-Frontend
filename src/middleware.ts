import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  const isAuthPage = request.url.includes("/account");
  const isVerifyPage = request.nextUrl.pathname.startsWith("/account/verify");

  if (isAuthPage) {
    if (isVerifyPage) {
      return NextResponse.next();
    }

    if (session) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/settings",
    "/projects/:path*",
    "/projects",
    "/albums/:path*",
    "/albums",
    "/chat/:path*",
    "/chat",
    "/finances/:path*",
    "/finances",
    "/sponsorship/:path*",
    "/sponsorship",
    "/admin/:path*",
  ],
};
