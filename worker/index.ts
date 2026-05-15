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

// Security / baseline-hygiene headers added to every response.
// HSTS = Google quality signal + force HTTPS. nosniff + referrer-policy =
// standard web hygiene. Permissions-Policy disables sensors we never use.
function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};
