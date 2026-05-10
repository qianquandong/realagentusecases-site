import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases · 看真人怎么用 AI agent 干活",
    siteDescription:
      "每周一个真在跑的 AI 工作流，来自做这事的人。所有 prompt 原样放出。完全免费。",
  },
  header: {
    about: "关于",
    archive: "文章",
    events: "活动",
    subscribe: "订阅",
    languageSwitchAria: "切换到英文",
  },
  email: {
    placeholder: "your@email.com",
    submitting: "订阅中…",
    successHeading: "收到，已加入名单。",
    successBody: "下一个工作流会发到你邮箱。",
    errorMsg: "出错了，再试一次？",
  },
  post: {
    ctaHeading: "喜欢这一期？",
    ctaBody: "每周一个真工作流，发到你邮箱。免费，没有付费档。",
    ctaButton: "免费订阅",
    notFoundTitle: "这一期没找到",
    notFoundBody: "要么还没发，要么链接错了。",
    backHome: "回首页",
  },
  home: {
    kicker: "每周一期 · 永久免费",
    h1: "职场人真正在用的 prompt。",
    subtitle:
      "每周一个真在跑的 AI 工作流——来自做财务、做数据、做运营、做业务规划的人。所有 prompt 原样放出。播客、视频、文字稿，挑你方便的。",
    bullets: [
      "每周一个真在跑的工作流——不是空谈、不是 demo",
      "所有 prompt 和工作流原样放出，复制粘贴就能用",
      "财务、数据、运营、供应链——真岗位、真产出",
    ],
    cta: "免费订阅 →",
    finePrint: "完全免费，每周一期，随时退订。",
    socialProof: (count) =>
      count > 0
        ? `${count.toLocaleString()} 位职场人已经在读。`
        : "做第一批订阅者。",
    latestPosts: {
      heading: "先读一期看看。",
    },
    about: {
      heading: "关于",
      paragraphs: [
        "工作里真正有用的 AI 工作流，多数没人写下来。摸索出来的人忙着干活，没时间发表——于是真正有效的方法都留在了他们脑子里。",
        "这个 newsletter 改这件事。每周一位职场人——做财务、做数据、做运营或做业务规划的——带我们走一遍真在跑的工作流。所有 prompt 原样放出。没废话、没付费档。",
        "主理人 Jack Qian——德州仪器（Texas Instruments）工业工程师，正转去做业务规划，在达拉斯。每月也办一次 AI 实战黑客松，本地朋友欢迎来。但访谈才是主菜。",
      ],
    },
    finalCta: {
      lead: "每周一期，发到你邮箱。",
      cta: "免费订阅",
    },
  },
  footer: {
    copyright: (year) => `© ${year} Real Agent Use Cases`,
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
    tagline: "这个网站是入口，访谈才是主菜。",
  },
};
