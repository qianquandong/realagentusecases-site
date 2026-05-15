import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com";
  return {
    rules: [
      // Default: everything is crawlable.
      { userAgent: "*", allow: "/" },
      // GEO: explicitly welcome answer-engine crawlers so the brand can be
      // surfaced and cited by ChatGPT, Perplexity, Claude, and Google/Bing AI.
      // List mirrors the "AI Crawler Access" section of the Notion knowledge base.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
