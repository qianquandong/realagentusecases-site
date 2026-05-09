import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    siteTitle: "Jack Qian — Field Reports on AI Agents",
    siteDescription:
      "Monthly breakdowns of real-world AI agent workflows for working professionals.",
  },
  header: {
    about: "About",
    archive: "Archive",
    events: "Events",
    subscribe: "Subscribe",
    languageSwitchAria: "Switch to Chinese",
  },
  footer: {
    copyright: (year) => `© ${year} Jack Qian`,
    builtIn: "Built in Dallas",
    nav: {
      subscribe: "Subscribe",
      about: "About",
      archive: "Archive",
      events: "Events",
    },
    socialLabels: {
      xiaohongshu: "Xiaohongshu",
      twitter: "X / Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    tagline:
      "This site is the doormat to my newsletter on Substack. The newsletter is the real thing.",
  },
};
