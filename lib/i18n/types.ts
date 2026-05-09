export interface Dict {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  header: {
    about: string;
    archive: string;
    events: string;
    subscribe: string;
    languageSwitchAria: string;
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
