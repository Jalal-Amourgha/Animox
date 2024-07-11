import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = path === "/sign-up" || path === "/sign-in";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-up", "/sign-in", "/profile"],
};
