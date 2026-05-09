import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases · AI agent 真实工作流",
    siteDescription:
      "每周一期：找一位职场人录他们怎么真用 AI agents。播客、YouTube、文字版——全免费。",
  },
  header: {
    about: "关于",
    archive: "文章",
    events: "活动",
    subscribe: "订阅",
    languageSwitchAria: "切换到英文",
  },
  post: {
    ctaHeading: "喜欢这一期？",
    ctaBody: "每周一期访谈，发到你邮箱。免费，没有付费墙。",
    ctaButton: "免费订阅",
    notFoundTitle: "这一期没找到",
    notFoundBody: "要么我还没录出来，要么链接错了。",
    backHome: "回首页",
  },
  home: {
    kicker: "每周一期 · Jack Qian 主持",
    h1: "看真实职场人在怎么用 AI。",
    subtitle:
      "我每周找一位职场人——财务、数据、运营、业务规划——让他们带我走一遍真用 AI agents 干活的流程。对话录成播客和 YouTube 视频，文字版发到邮箱和这里，prompt 完整放出。",
    bullets: [
      "每周一期：播客 + YouTube + 文字版，三种形态",
      "完整 prompt 和 workflow 放出，可直接复制",
      "覆盖财务、数据、运营、供应链、规划等多个职能",
    ],
    cta: "免费订阅 →",
    finePrint: "完全免费，每周一期，随时退订。",
    socialProof: (count) =>
      count > 0
        ? `工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · 已有 ${count.toLocaleString()} 名职场人在读`
        : "工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · 现在订阅，做第一批读者",
    latestPosts: {
      heading: "先听一期看看。",
    },
    about: {
      heading: "关于",
      paragraphs: [
        "我是 Jack Qian。在德州仪器（Texas Instruments）做工业工程师，2026 年 4 月转到业务规划岗——这意味着我每天都在用 AI agent 改造真实的供应链工作。",
        "每周我找一位职场人，问他们同一组问题：这个月你真把 AI 用到哪些事上了？哪条 prompt 你绝对不会删？哪里翻车了？然后把对话录下来。",
        "对话会以三种形态发出——播客、YouTube、和发到你邮箱的文字版。我每月在达拉斯还办一次 AI 实战黑客松，本地朋友欢迎来。但访谈是主菜。",
      ],
    },
    finalCta: {
      lead: "每周一期，发到你邮箱。",
      cta: "免费订阅",
    },
  },
  footer: {
    copyright: (year) => `© ${year} Real Agent Use Cases`,
    builtIn: "Jack Qian 主理 · Built in Dallas",
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
