import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases · 职场人真正在用的 AI agent",
    siteDescription:
      "每周一个真在用的 AI agent，由它的使用者亲自讲。完整搭建——prompt、工具、连接方式——一字不漏。免费。",
  },
  header: {
    about: "关于",
    archive: "文章",
    events: "活动",
    news: "文章",
    subscribe: "订阅",
    languageSwitchAria: "切换到英文",
  },
  news: {
    heading: "访谈与指南",
    intro:
      "每周一期 agent 访谈，再加一批实战指南——教你搭出真正能干活的 AI agent。",
    tagIssue: "访谈",
    tagGuide: "指南",
    empty: "还没有发布内容，过阵子再来看看。",
  },
  email: {
    placeholder: "your@email.com",
    submitting: "订阅中…",
    successHeading: "差最后一步：去邮箱确认。",
    successBody: "Substack 刚发了一封确认邮件过去，点里面的链接就好了。",
    errorMsg: "出错了，再试一次？",
  },
  post: {
    ctaHeading: "喜欢这一期？",
    ctaBody: "每周一个真 AI agent，发到你邮箱。免费，不卖课。",
    ctaButton: "免费订阅",
    notFoundTitle: "这一期没找到",
    notFoundBody: "要么还没发，要么链接错了。",
    backHome: "回首页",
  },
  home: {
    kicker: "每周一期 · 永久免费",
    h1: "职场人真正在用的 AI agent。",
    subtitle:
      "市场、销售、HR、设计、运营、财务、法务、教育、新闻——每个岗位都有该搭的 AI agent。每周一位职场人，带我们走一遍他每天真在用的那一个。完整搭建——prompt、工具、连接方式——原原本本放出来。",
    bullets: [
      "每周一个真在用的 AI agent——由它的使用者每天亲自跑",
      "完整搭建放出——prompt、工具、连接方式，照着抄就能跑",
      "覆盖所有职能——市场、销售、运营、财务、HR、设计、法务",
    ],
    cta: "免费订阅 →",
    finePrint: "完全免费，每周一期，随时退订。",
    socialProof: (count) =>
      count > 0
        ? `已经有 ${count.toLocaleString()} 位职场人在读。`
        : "做最早的几位订户。",
    latestPosts: {
      heading: "先读一期看看。",
    },
    about: {
      heading: "为什么做这件事",
      paragraphs: [
        "职场上真正能用的 AI agent，绝大多数没人写下来。把它跑通的人都在忙着干活，腾不出手写——于是真正有效的搭建方法，全都困在他们自己脑子里。",
        "这个 newsletter 就是来改这件事的。每周一位职场人——不管岗位是什么、行业是什么——带我们走一遍他每天真在用的那个 AI agent。完整搭建：prompt、工具、连接方式——原原本本放出来。不灌水，也不卖课。",
        "主理人 Jack Qian——德州仪器（Texas Instruments）工业工程师，正在转去做业务规划，常驻达拉斯。每月也办一场 AI 实战黑客松，人在本地的朋友欢迎来。但每周的访谈才是这里的主菜。",
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
    tagline: "这个网站只是门口的入口，每周的访谈才是主菜。",
  },
};
