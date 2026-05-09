import { NextResponse, type NextRequest } from "next/server";
import { SITE_CONFIG, type Locale } from "@/lib/config";

const LOCALES = SITE_CONFIG.locales;
const DEFAULT_LOCALE: Locale = SITE_CONFIG.defaultLocale;

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const langs = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("en")) return "en";
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedLocale = LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (matchedLocale) {
    const response = NextResponse.next();
    response.headers.set("x-locale", matchedLocale);
    return response;
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as
    | Locale
    | undefined;
  const locale =
    cookieLocale && LOCALES.includes(cookieLocale)
      ? cookieLocale
      : pickLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|subscribe|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|xml|txt)).*)",
  ],
};
