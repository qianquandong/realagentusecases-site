export const SITE_CONFIG = {
  name: "Real Agent Use Cases",
  host: "Jack Qian",
  domain: "realagentusecases.com",
  defaultLocale: "en" as const,
  locales: ["en", "zh"] as const,
  substackUrl:
    process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "https://jackqian.substack.com",
  subscriberCount: 0,
  social: {
    xiaohongshu: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    xiaoyuzhou: "",
  },
} as const;

export type Locale = (typeof SITE_CONFIG.locales)[number];
