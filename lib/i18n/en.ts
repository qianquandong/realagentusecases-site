import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases — How working professionals use AI",
    siteDescription:
      "Every week I record a conversation with a working professional about how they actually use AI agents. Podcast, YouTube, and a written breakdown — free.",
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
    successBody: "I'll send the next interview to your inbox.",
    errorMsg: "Something broke. Try again?",
  },
  post: {
    ctaHeading: "Liked this?",
    ctaBody:
      "One interview a week, straight to your inbox. Free, no upsell.",
    ctaButton: "Subscribe — free",
    notFoundTitle: "Episode not found",
    notFoundBody:
      "Either I haven't recorded this one yet, or the link's wrong.",
    backHome: "Back to home",
  },
  home: {
    kicker: "Weekly · Hosted by Jack Qian",
    h1: "How working professionals actually use AI.",
    subtitle:
      "Every week I sit down with someone in finance, data, ops, or planning — they walk me through the AI agents they live with day-to-day. The conversation goes out as a podcast, a YouTube video, and a written breakdown with every prompt published in full.",
    bullets: [
      "Weekly drop: podcast + video + article from one real interview",
      "Every prompt and workflow published in full — copy-paste ready",
      "Across finance, data, ops, supply chain, and beyond",
    ],
    cta: "Subscribe — free →",
    finePrint: "100% free. One drop a week. Unsubscribe anytime.",
    socialProof: (count) =>
      count > 0
        ? `Industrial Engineer → Business Planner · Hosting AI hackathons in Dallas · Joined by ${count.toLocaleString()} readers`
        : "Industrial Engineer → Business Planner · Hosting AI hackathons in Dallas · Be among the first readers",
    latestPosts: {
      heading: "Read a sample interview.",
    },
    about: {
      heading: "About",
      paragraphs: [
        "I'm Jack Qian. Industrial Engineer at Texas Instruments, moving into Business Planning in April 2026 — which means I spend my days trying to bend AI agents to do real supply-chain work.",
        "Each week I track down another working professional and ask them the same set of questions: what did you actually use AI for this month? What's the prompt you'd never delete? What broke? Then I record it.",
        "The conversation goes out three ways — podcast, YouTube, and a written breakdown to your inbox. I also run a monthly AI hackathon in Dallas; locals welcome. But the recordings are the main course.",
      ],
    },
    finalCta: {
      lead: "One drop a week, straight to your inbox.",
      cta: "Subscribe — free",
    },
  },
  footer: {
    copyright: (year) => `© ${year} Real Agent Use Cases`,
    builtIn: "By Jack Qian · Built in Dallas",
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
