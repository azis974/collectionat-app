import { NextRequest, NextResponse } from "next/server";

// Spain + Latin America (incl. Panama, our other real market) — Spanish.
const SPANISH_COUNTRIES = new Set([
  "AR", "ES", "MX", "CO", "PE", "CL", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR", "GQ",
]);

// Everything else (incl. Gulf/MENA countries like Qatar, and localhost, where
// Vercel's geo header is absent) falls back to English or Spanish — the site's
// home market and its already-indexed "/".
function localeForCountry(country: string | null): "es" | "en" {
  if (country && !SPANISH_COUNTRIES.has(country)) return "en";
  return "es";
}

// The site always keeps living at "/" in the address bar — Vercel's edge
// geolocation header (x-vercel-ip-country) picks which language gets
// rewritten in behind the scenes, so already-indexed URLs/backlinks to "/"
// never change. /en, /ar, /api/*, /dna-erp, static files, etc. still resolve
// directly and untouched — this only affects the bare root.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const country = request.headers.get("x-vercel-ip-country");
    const locale = localeForCountry(country);
    return NextResponse.rewrite(new URL(`/${locale}`, request.url));
  }
}

export const config = {
  matcher: "/",
};
