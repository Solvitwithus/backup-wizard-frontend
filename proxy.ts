import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/signup", "/login"];

export function proxy(request: NextRequest) {  // ✅ was "proxy"
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const token = request.cookies.get("auth_token")?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {  // ✅ was "congfig"
 matcher: [
    // ✅ Added manifest.json and icons/ to exclusions
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|api/).*)",
  ],
};