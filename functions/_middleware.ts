// Cloudflare Pages middleware — runs on every request before static assets.
// Only intercepts the root path "/" to do Accept-Language redirect.
// Anything else passes through to the static site.

interface PagesContext {
  request: Request;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}

const LOCALES = ["en", "zh"] as const;
type Locale = (typeof LOCALES)[number];

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "en";
  const langs = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("en")) return "en";
  }
  return "en";
}

export const onRequest = async (
  context: PagesContext,
): Promise<Response> => {
  const url = new URL(context.request.url);

  // Only handle exactly "/" or "/index.html" — everything else goes through.
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return context.next();
  }

  // Sticky locale via cookie wins over Accept-Language.
  const cookie = context.request.headers.get("cookie") ?? "";
  const cookieMatch = cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|zh)/);
  const cookieLocale = cookieMatch?.[1] as Locale | undefined;

  const locale =
    cookieLocale ??
    pickLocale(context.request.headers.get("accept-language"));

  return Response.redirect(`${url.origin}/${locale}/`, 302);
};
