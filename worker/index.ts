// Cloudflare Workers entry point.
// Two dynamic routes; everything else falls through to static assets.
//   /            → 302 to /en/ or /zh/ (Accept-Language + cookie)
//   /subscribe   → 302 to /en/#subscribe or /zh/#subscribe
//                 (legacy URL preserved for old social bios)

// Upgrade http→https in redirects (keep localhost for wrangler dev).
function secureOrigin(url: URL): string {
  if (url.protocol === "http:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
    return `https://${url.host}`;
  }
  return url.origin;
}

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
//
// Path arg lets us patch Content-Type for extensionless files (e.g. Next.js
// `opengraph-image` output) — without it, nosniff prevents browsers and
// social-media crawlers from detecting the PNG byte signature.
function withSecurityHeaders(response: Response, path: string): Response {
  const headers = new Headers(response.headers);
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "DENY");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );

  // Next.js `opengraph-image.tsx` outputs PNG files with no extension.
  // Set Content-Type explicitly so social crawlers + direct browser opens work.
  if (
    path === "/opengraph-image" ||
    path.endsWith("/opengraph-image")
  ) {
    headers.set("Content-Type", "image/png");
  }

  // Plain-text files (llms.txt, robots.txt) are UTF-8. Without an explicit
  // charset, browsers on non-Latin locales fall back to legacy encodings
  // (e.g. GBK) and render em-dashes as mojibake.
  if (path.endsWith(".txt")) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
  }

  if (path.startsWith("/_next/static/")) {
    headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  } else if (
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path === "/feed.xml"
  ) {
    headers.set("Cache-Control", "public, max-age=3600");
  } else if (path === "/favicon.ico" || path.endsWith("/opengraph-image")) {
    headers.set("Cache-Control", "public, max-age=86400");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Auto-generated occupation×news article pairs removed in the 2026-07-06 content
// cleanup (commit 7605312, 22 pairs) and the 2026-10-17 follow-up (30 pairs). Google still recrawls the dead URLs; 410 (vs the
// implicit 404) tells crawlers the removal is permanent so they drop out of
// the index faster. Matches any sub-path too (old relative-link artifacts
// like .../pu-sh-shell-agent/pu.sh).
const GONE_NEWS_SLUGS = new Set([
  "2026-05-19-forest-and-conservation-workers-ai-patrol",
  "2026-05-20-training-and-development-specialists-chrome-prompt-api",
  "2026-05-21-agricultural-workers-lightweight-ai-coding-agent",
  "2026-05-21-probation-officers-ai-author-detection",
  "2026-05-22-compensation-benefits-specialists-pypi-supply-chain-attack",
  "2026-05-22-film-video-editors-chrome-prompt-api",
  "2026-05-23-chefs-and-head-cooks-pu-sh-kitchen-ai-agent",
  "2026-05-24-mining-geological-engineers-mobile-agent-gui",
  "2026-05-25-diesel-service-technicians-pu-sh-ecu-diagnostics",
  "2026-05-26-network-systems-administrators-pu-sh-shell-agent",
  "2026-05-27-electrical-electronics-installers-adversarial-ai-prompting",
  "2026-05-28-medical-records-specialists-self-healing-rpa",
  "2026-05-29-logging-workers-ai-async-rewake-safety",
  "2026-05-30-home-health-personal-care-aides-on-device-ai-agent",
  "2026-05-31-financial-examiners-mistral-agentic-harness",
  "2026-06-01-graphic-designers-local-llm-cpu-inference",
  "2026-06-02-coaches-and-scouts-ai-coaching-assistant-guidelines",
  "2026-06-14-operations-research-analysts-paca-ai-scrumban",
  "2026-06-15-archivists-museum-workers-on-device-ai-transcription",
  "2026-06-16-customer-service-representatives-fin-ai-agent",
  "2026-06-17-network-computer-systems-administrators-opencode-self-hosted-ai-agent",
  "2026-06-19-construction-managers-ai-inspection-agent",
  // 2026-10-17 second cleanup: the 30 occupation×news mashup pairs that survived the first pass
  // (the pattern CLAUDE.md rule 2 bans; several carried unsourced stats).
  "2026-06-20-software-qa-testers-testerarmy-ai-agent",
  "2026-06-21-agricultural-workers-agentic-agritech-qa",
  "2026-06-22-librarians-agentic-resource-discovery",
  "2026-06-23-sports-officials-agentic-resource-discovery",
  "2026-06-24-heavy-tractor-trailer-truck-drivers-qwen-agentworld-route-planning",
  "2026-06-25-bookkeeping-accounting-auditing-clerks-gemini-computer-use",
  "2026-06-26-producers-and-directors-krea-2-storyboards",
  "2026-06-27-teacher-assistants-open-knowledge-agent-native-kb",
  "2026-06-28-customer-service-representatives-ai-prompt-injection-defense",
  "2026-06-29-human-resources-specialists-ai-ats-non-determinism",
  "2026-07-01-speech-language-pathologists-brain2qwerty-noninvasive-bci",
  "2026-07-02-biochemists-and-biophysicists-claude-science-ai-workbench",
  "2026-07-03-insurance-underwriters-tabfm-zero-shot-tabular-ai",
  "2026-07-04-software-developers-pxpipe-llm-context-compression",
  "2026-07-05-forest-and-conservation-workers-ai-agent-memory-stack",
  "2026-07-07-drafters-vision-llm-sketch-to-cad",
  "2026-07-10-barbers-hairstylists-cosmetologists-ai-agent-video-editor",
  "2026-07-11-logging-workers-hy3-agent-compliance",
  "2026-07-12-chefs-and-head-cooks-ai-review-management",
  "2026-07-13-coaches-and-scouts-ai-coding-agent-visualization",
  "2026-07-14-dancers-choreographers-lisp-agent-custom-tools",
  "2026-07-17-forest-conservation-workers-gemini-notebook",
  "2026-07-18-training-and-development-managers-lm-studio-bionic",
  "2026-07-19-geographers-gemini-notebook-cloud-code",
  "2026-07-20-fishing-hunting-workers-kimi-k3-noaa-compliance",
  "2026-07-21-farmers-ranchers-qwen-image-3-diy-product-labels",
  "2026-07-23-information-security-analysts-mcp-ansi-injection-defense",
  "2026-07-24-database-administrators-ai-coding-agents-schema-review",
  "2026-07-26-software-developers-palmier-pro-mcp-video-editor",
  "2026-07-27-medical-records-specialists-screenpipe-clinical-coding",
]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const newsMatch = path.match(/^\/(?:en|zh)\/news\/([^/]+)/);
    if (newsMatch && GONE_NEWS_SLUGS.has(newsMatch[1])) {
      return new Response("410 Gone — this article was permanently removed.", {
        status: 410,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    if (path === "/subscribe" || path === "/subscribe/") {
      const locale = resolveLocale(request);
      return Response.redirect(`${secureOrigin(url)}/${locale}/#subscribe`, 302);
    }

    if (path === "/") {
      const locale = resolveLocale(request);
      return Response.redirect(`${secureOrigin(url)}/${locale}/`, 302);
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request), path);
  },
};
