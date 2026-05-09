import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Jack Qian · AI Agent 实战月报",
    siteDescription:
      "每月采访 3–4 个职场人，看他们怎么真用 AI agents 自动化日常工作。完整 prompt、可复制 workflow，全部放出来。每周一封，免费。",
  },
  header: {
    about: "关于",
    archive: "文章",
    events: "活动",
    subscribe: "订阅",
    languageSwitchAria: "切换到英文",
  },
  post: {
    ctaHeading: "喜欢这篇？",
    ctaBody: "每周一篇这样的实战拆解，发到你邮箱。免费，没有付费墙。",
    ctaButton: "免费订阅",
    notFoundTitle: "文章没找到",
    notFoundBody: "要么我还没写出来，要么链接错了。",
    backHome: "回首页",
  },
  home: {
    kicker: "AI Agent 实战月报",
    h1: "看真实职场人在怎么用 AI。",
    subtitle:
      "我每月采访 3–4 个人——财务、数据、运营、业务规划——拆他们怎么真用 AI agents 自动化日常工作。完整 prompt、可复制 workflow，全部放出来。",
    bullets: [
      "每月 3–4 个职场人采访 + 我自己的工作流笔记",
      "完整 prompt 全部放出，可直接复制粘贴",
      "覆盖财务、数据、运营、规划、供应链多个职能",
    ],
    cta: "免费订阅 →",
    finePrint: "完全免费，每周一封，随时退订。",
    socialProof: (count) =>
      count > 0
        ? `工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · 已有 ${count.toLocaleString()} 名职场人在读`
        : "工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · 现在订阅，做第一批读者",
    about: {
      heading: "关于 Jack",
      paragraphs: [
        "我是 Jack Qian，在德州仪器（Texas Instruments）做工业工程师，2026 年 4 月转到业务规划岗——这意味着我每天都在用 AI agent 改造真实的供应链工作。",
        "白天我自己踩坑，晚上我去找其他职场人聊他们怎么用 AI——把这两边的内容整理起来发给订阅者。",
        "我每月在达拉斯办一次 AI 实战黑客松，欢迎本地朋友来玩——但 newsletter 才是主菜。",
      ],
    },
    finalCta: {
      lead: "每周一篇，发到你邮箱。",
      cta: "免费订阅",
    },
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
