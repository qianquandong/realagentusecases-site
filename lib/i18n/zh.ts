import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases · 职场人真正在用的 AI agent",
    siteDescription:
      "每周一个真在跑的 AI agent，来自正在用它的人。完整搭建步骤——prompt、工具、连接方式——原样放出。完全免费。",
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
    successBody: "下一个 agent 拆解会发到你邮箱。",
    errorMsg: "出错了，再试一次？",
  },
  post: {
    ctaHeading: "喜欢这一期？",
    ctaBody: "每周一个真 AI agent，发到你邮箱。免费，没有付费档。",
    ctaButton: "免费订阅",
    notFoundTitle: "这一期没找到",
    notFoundBody: "要么还没发，要么链接错了。",
    backHome: "回首页",
  },
  home: {
    kicker: "每周一期 · 永久免费",
    h1: "职场人真正在用的 AI agent。",
    subtitle:
      "市场、销售、HR、设计、运营、财务、法务、教育、新闻——每个岗位都有 AI agent 等着被搭起来。每周一位职场人，带我把他们真在跑的那个走一遍。完整搭建步骤——prompt、工具、连接方式，原样放出。",
    bullets: [
      "每周一个真在跑的 AI agent——搭建者每天都在用",
      "完整搭建步骤放出——prompt、工具、连接方式，照着搭就能跑",
      "覆盖所有职能——市场、销售、运营、财务、HR、设计、法务",
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
      heading: "为什么做这件事",
      paragraphs: [
        "工作里真正在跑的 AI agent，多数没人写下来。摸索出来的人忙着干活，没时间发表——于是真正有效的搭建方法都留在了他们脑子里。",
        "这个 newsletter 改这件事。每周一位职场人——不管做什么岗位、什么行业——带我们走一遍他真在跑的那个 AI agent。完整搭建步骤：prompt、工具、连接方式——原样放出。没废话、没付费档。",
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
