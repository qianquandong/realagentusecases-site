// Cloudflare Workers entry point.
// Two dynamic routes; everything else falls through to static assets.
//   /            → 302 to /en/ or /zh/ (Accept-Language + cookie)
//   /subscribe   → 302 to /en/#subscribe or /zh/#subscribe
//                 (legacy URL preserved for old social bios)

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
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

function resolveLocale(request: Request): Locale {
  const cookie = request.headers.get("cookie") ?? "";
  const cookieMatch = cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|zh)/);
  const cookieLocale = cookieMatch?.[1] as Locale | undefined;
  return (
    cookieLocale ?? pickLocale(request.headers.get("accept-language"))
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/subscribe" || path === "/subscribe/") {
      const locale = resolveLocale(request);
      return Response.redirect(`${url.origin}/${locale}/#subscribe`, 302);
    }

    if (path === "/") {
      const locale = resolveLocale(request);
      return Response.redirect(`${url.origin}/${locale}/`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};
