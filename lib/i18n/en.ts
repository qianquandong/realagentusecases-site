import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases — The AI agents working professionals run at work",
    siteDescription:
      "One real AI agent per week, from someone doing the work. Full setup published — prompts, tools, integrations. Free.",
  },
  header: {
    about: "About",
    archive: "Archive",
    events: "Events",
    subscribe: "Subscribe",
    languageSwitchAria: "Switch to Chinese",
  },
  email: {
    placeholder: "you@example.com",
    submitting: "Subscribing…",
    successHeading: "You're on the list.",
    successBody: "The next agent walkthrough lands in your inbox.",
    errorMsg: "Something broke. Try again?",
  },
  post: {
    ctaHeading: "Liked this?",
    ctaBody:
      "One real AI agent a week, straight to your inbox. Free, no upsell.",
    ctaButton: "Subscribe — free",
    notFoundTitle: "Episode not found",
    notFoundBody:
      "Either it hasn't shipped yet, or the link's wrong.",
    backHome: "Back to home",
  },
  home: {
    kicker: "Weekly. Free forever.",
    h1: "The AI agents working professionals run at work.",
    subtitle:
      "Marketing, sales, HR, design, ops, finance, legal, education, journalism — every job has AI agents waiting to be built. Every week, one working professional walks me through one they actually run. Full setup, all prompts, tools, and connections — published in full.",
    bullets: [
      "One real AI agent per week — built and run by someone using it daily",
      "Full setup published — prompts, tools, integrations — copy and run",
      "Every job, every industry — marketing, sales, ops, finance, HR, design, legal",
    ],
    cta: "Subscribe — free →",
    finePrint: "100% free. One drop a week. Unsubscribe anytime.",
    socialProof: (count) =>
      count > 0
        ? `Joined by ${count.toLocaleString()} working professionals.`
        : "Be among the first readers.",
    latestPosts: {
      heading: "Read a sample interview.",
    },
    about: {
      heading: "Why this exists",
      paragraphs: [
        "Most useful AI agents at work aren't written down anywhere. The people who've figured out how to actually run them are too busy doing the work to publish — so what works stays inside their heads.",
        "This newsletter changes that. Every week, one working professional walks us through one AI agent they actually run — in any job, any industry. Full setup published: prompts, tools, integrations. No filler. No paid tier.",
        "Hosted by Jack Qian — industrial engineer at Texas Instruments turning business planner, based in Dallas. There's a monthly AI hackathon if you're in town. But the recordings are the meal.",
      ],
    },
    finalCta: {
      lead: "One drop a week, straight to your inbox.",
      cta: "Subscribe — free",
    },
  },
  footer: {
    copyright: (year) => `© ${year} Real Agent Use Cases`,
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
      "This site is the doormat. The interviews are the real thing.",
  },
};
