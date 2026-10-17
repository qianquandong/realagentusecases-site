export const SITE_CONFIG = {
  name: "Real Agent Use Cases",
  host: "Jack Qian",
  domain: "realagentusecases.com",
  defaultLocale: "en" as const,
  locales: ["en", "zh"] as const,
  // Substack publication base URL — works for both <sub>.substack.com
  // and custom domains (e.g. newsletter.realagentusecases.com).
  // Form posts to <url>/api/v1/free; on failure (CORS / 4xx / network),
  // falls back to redirecting to <url>/subscribe with email prefilled.
  // No trailing slash.
  // Default to the live publication: the production build had no env var set, so every form
  // fell back to /subscribe (a redirect home) and the email was dropped (found 2026-10-17).
  substackUrl: process.env.NEXT_PUBLIC_SUBSTACK_URL || "https://newsletter.realagentusecases.com",
  subscriberCount: 0,
  social: {
    xiaohongshu: "",
    twitter: "https://x.com/AIManJack_",
    linkedin: "https://www.linkedin.com/in/jackqiandallas/",
    github: "https://github.com/qianquandong",
    youtube: "https://www.youtube.com/@JackBuildAI",
    xiaoyuzhou: "",
  },
} as const;

export type Locale = (typeof SITE_CONFIG.locales)[number];
