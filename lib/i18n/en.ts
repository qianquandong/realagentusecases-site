import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    siteTitle: "Jack Qian — Field Reports on AI Agents",
    siteDescription:
      "I interview working professionals about how they actually use AI agents to automate their day-to-day. One issue a week. Free.",
  },
  header: {
    about: "About",
    archive: "Archive",
    events: "Events",
    subscribe: "Subscribe",
    languageSwitchAria: "Switch to Chinese",
  },
  post: {
    ctaHeading: "Liked this?",
    ctaBody:
      "One write-up like this lands in your inbox every week. Free, no upsell.",
    ctaButton: "Subscribe — free",
    notFoundTitle: "Post not found",
    notFoundBody:
      "Either I haven't written this one yet, or the link's wrong.",
    backHome: "Back to home",
  },
  home: {
    kicker: "Field Reports on AI Agents",
    h1: "How working professionals actually use AI.",
    subtitle:
      "Every month I interview 3–4 people — finance, data, ops, planning — about the AI agents they live with day-to-day. Full prompts, copyable workflows, no fluff.",
    bullets: [
      "3–4 interviews per month, plus my own field notes",
      "Every prompt published in full — copy-paste ready",
      "Across finance, data, ops, planning, and supply chain",
    ],
    cta: "Subscribe — free →",
    finePrint: "100% free. One issue a week. Unsubscribe anytime.",
    socialProof: (count) =>
      count > 0
        ? `Industrial Engineer → Business Planner · Hosting AI hackathons in Dallas · Joined by ${count.toLocaleString()} readers`
        : "Industrial Engineer → Business Planner · Hosting AI hackathons in Dallas · Be among the first readers",
    latestPosts: {
      heading: "Read a sample issue.",
    },
    about: {
      heading: "About Jack",
      paragraphs: [
        "I'm Jack Qian. I work as an Industrial Engineer at Texas Instruments, moving into Business Planning in April 2026 — which means I spend my days trying to bend AI agents to do real supply-chain work.",
        "I take notes on what works and what doesn't, then I track down other working professionals and ask them the same questions. Their answers turn into the next issue.",
        "I also run a monthly AI hackathon in Dallas. Locals welcome. But the newsletter is the main course.",
      ],
    },
    finalCta: {
      lead: "One issue a week, straight to your inbox.",
      cta: "Subscribe — free",
    },
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
