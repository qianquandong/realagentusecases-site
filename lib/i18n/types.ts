export interface Dict {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  header: {
    about: string;
    archive: string;
    events: string;
    news: string;
    subscribe: string;
    languageSwitchAria: string;
  };
  news: {
    heading: string;
    intro: string;
    tagIssue: string;
    tagGuide: string;
    empty: string;
  };
  // "Train your team" box above the subscribe CTA on news articles → aimanjack.com training pages.
  training: {
    eyebrow: string;
    heading: string;
    body: string;
    note: string;
    labels: Record<
      "hub" | "workshop" | "sales" | "marketing" | "operations" | "leadership" | "claude" | "chatgpt" | "copilot",
      string
    >;
  };
  post: {
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
  };
  email: {
    placeholder: string;
    submitting: string;
    successHeading: string;
    successBody: string;
    errorMsg: string;
  };
  home: {
    kicker: string;
    h1: string;
    subtitle: string;
    bullets: [string, string, string];
    cta: string;
    finePrint: string;
    socialProof: (count: number) => string;
    latestPosts: {
      heading: string;
    };
    about: {
      heading: string;
      paragraphs: [string, string, string];
    };
    finalCta: {
      lead: string;
      cta: string;
    };
  };
  footer: {
    copyright: (year: number) => string;
    builtIn: string;
    nav: {
      subscribe: string;
      about: string;
      archive: string;
      events: string;
    };
    socialLabels: {
      xiaohongshu: string;
      twitter: string;
      linkedin: string;
      github: string;
    };
    tagline: string;
  };
}
