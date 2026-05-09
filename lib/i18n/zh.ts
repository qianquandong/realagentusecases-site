import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Jack Qian · AI Agent 实战月报",
    siteDescription:
      "每月 4 篇深度文章，拆解真实工作场景下的 AI agent 解决方案，给非技术背景的职场人看。",
  },
  header: {
    about: "关于",
    archive: "文章",
    events: "活动",
    subscribe: "订阅",
    languageSwitchAria: "切换到英文",
  },
  footer: {
    copyright: (year) => `© ${year} Jack Qian`,
    builtIn: "Built in Dallas",
    nav: {
      subscribe: "订阅",
      about: "关于",
      archive: "文章",
      events: "活动",
    },
    socialLabels: {
      xiaohongshu: "小红书",
      twitter: "X / Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    tagline: "这个网站是入口，newsletter 才是主菜。",
  },
};
