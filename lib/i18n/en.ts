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
    news: "News",
    subscribe: "Subscribe",
    languageSwitchAria: "Switch to Chinese",
  },
  news: {
    heading: "News & guides",
    intro:
      "Every weekly agent interview, plus practical guides on building AI agents that do real work.",
    tagIssue: "Interview",
    tagGuide: "Guide",
    empty: "Nothing published yet — check back soon.",
  },
  email: {
    placeholder: "you@example.com",
    submitting: "Subscribing…",
    successHeading: "Almost there — check your inbox.",
    successBody:
      "Substack just sent a confirmation email. Click the link inside and you're in.",
    errorMsg: "Something broke. Try again?",
  },
  training: {
    eyebrow: "For teams · Dallas–Fort Worth & live online",
    heading: "Want your team to actually use this?",
    body: "I also teach this as hands-on training for business teams: each person brings a real task, builds a working workflow with the AI tool your company already uses, and learns what to check before anything goes out.",
    note: "Quoted per team, by email.",
    labels: {
      hub: "See how team training works",
      workshop: "See the 90-minute team workshop",
      sales: "AI training for sales teams",
      marketing: "AI training for marketing teams",
      operations: "AI training for operations teams",
      leadership: "AI training for leadership teams",
      claude: "Claude training for teams",
      chatgpt: "ChatGPT training for employees",
      copilot: "Microsoft Copilot training for teams",
    },
  },
  post: {
    ctaHeading: "Liked this?",
    ctaBody:
      "One real AI agent a week, straight to your inbox. Free.",
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
      heading: "Read the latest.",
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
