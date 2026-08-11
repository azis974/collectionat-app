import { NextRequest, NextResponse } from "next/server";

// The Spanish page keeps living at "/" (its real, already-indexed URL) by
// rewriting internally to /es — nothing about the visible address bar or
// existing SEO/backlinks changes. Every other path (/en, /api/*, /dna-erp,
// static files, etc.) passes through untouched.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/es", request.url));
  }
}

export const config = {
  matcher: "/",
};
