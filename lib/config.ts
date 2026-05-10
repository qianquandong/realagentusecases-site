export const SITE_CONFIG = {
  name: "Real Agent Use Cases",
  host: "Jack Qian",
  domain: "realagentusecases.com",
  defaultLocale: "en" as const,
  locales: ["en", "zh"] as const,
  // Email collection endpoint (Formspree). Submissions are emailed
  // to the form owner; export to a real newsletter platform later.
  subscribeFormUrl:
    process.env.NEXT_PUBLIC_SUBSCRIBE_FORM_URL ??
    "https://formspree.io/f/xkoypjdo",
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
