// Cloudflare Workers entry point.
// Two dynamic routes; everything else falls through to static assets.
//   /            → 302 to /en/ or /zh/ (Accept-Language + cookie)
//   /subscribe   → 308 to NEXT_PUBLIC_SUBSTACK_URL

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  NEXT_PUBLIC_SUBSTACK_URL?: string;
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/subscribe" || path === "/subscribe/") {
      const target =
        env.NEXT_PUBLIC_SUBSTACK_URL ??
        "https://jackqian.substack.com/subscribe";
      return Response.redirect(target, 308);
    }

    if (path === "/") {
      const cookie = request.headers.get("cookie") ?? "";
      const cookieMatch = cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|zh)/);
      const cookieLocale = cookieMatch?.[1] as Locale | undefined;
      const locale =
        cookieLocale ??
        pickLocale(request.headers.get("accept-language"));
      return Response.redirect(`${url.origin}/${locale}/`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};
