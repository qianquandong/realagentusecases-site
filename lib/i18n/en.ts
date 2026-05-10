import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases — How working professionals use AI",
    siteDescription:
      "One real AI workflow per week, from someone doing the work. Every prompt published in full. Free.",
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
    successBody: "The next workflow lands in your inbox.",
    errorMsg: "Something broke. Try again?",
  },
  post: {
    ctaHeading: "Liked this?",
    ctaBody:
      "One real workflow a week, straight to your inbox. Free, no upsell.",
    ctaButton: "Subscribe — free",
    notFoundTitle: "Episode not found",
    notFoundBody:
      "Either it hasn't shipped yet, or the link's wrong.",
    backHome: "Back to home",
  },
  home: {
    kicker: "Weekly. Free forever.",
    h1: "The prompts working professionals actually use at work.",
    subtitle:
      "Every week, get one real AI workflow from someone doing the work — finance, data, ops, planning. Every prompt published in full. Pick your format: podcast, video, or written breakdown.",
    bullets: [
      "One real workflow per week — not theory, not demos",
      "Every prompt and workflow published in full — copy, paste, use",
      "Finance, data, ops, supply chain — real jobs, real outputs",
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
      heading: "About",
      paragraphs: [
        "Most useful AI workflows at work aren't written down anywhere. The people who've figured them out are too busy doing the work to publish — so what actually works stays inside their heads.",
        "This newsletter changes that. Every week, one working professional walks us through one real workflow — in finance, data, ops, or planning. All prompts published in full. No filler. No paid tier.",
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
