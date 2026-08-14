import { NextRequest, NextResponse } from "next/server";

// Gulf/Middle East/North Africa — visitors here get the Arabic page.
const ARABIC_COUNTRIES = new Set([
  "SA", "QA", "AE", "KW", "BH", "OM", "EG", "JO", "LB", "IQ",
  "YE", "SY", "LY", "TN", "DZ", "MA", "SD", "PS",
]);

// Spain + Latin America (incl. Panama, our other real market) — Spanish.
const SPANISH_COUNTRIES = new Set([
  "AR", "ES", "MX", "CO", "PE", "CL", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR", "GQ",
]);

// Everything else (incl. localhost, where Vercel's geo header is absent) falls
// back to Spanish, since that's the site's home market and its already-indexed "/".
function localeForCountry(country: string | null): "es" | "en" | "ar" {
  if (country && ARABIC_COUNTRIES.has(country)) return "ar";
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
