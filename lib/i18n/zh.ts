import type { Dict } from "./types";

export const zh: Dict = {
  meta: {
    siteTitle: "Real Agent Use Cases · 看真人怎么用 AI agent 干活",
    siteDescription:
      "每周找一位职场人，聊他怎么真在用 AI agent 干活。播客、YouTube、文字稿，全免费。",
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
    successBody: "下一期访谈会发到你邮箱。",
    errorMsg: "出错了，再试一次？",
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
    kicker: "每周一期 · Jack Qian 主理",
    h1: "职场人真正在用的 prompt。",
    subtitle:
      "每周找一位职场人——做财务的、做数据的、做运营的、做业务规划的——请他带我把手头一个真在跑的 AI agent 流程走一遍。对话录成播客和 YouTube，文字稿发邮箱也发这里，所有 prompt 原样放出，不删。",
    bullets: [
      "每周一期，一次访谈拆成三份：播客、YouTube、文字稿",
      "prompt 和工作流原样放出，复制就能用",
      "覆盖财务、数据、运营、供应链、规划等多个职能",
    ],
    cta: "免费订阅 →",
    finePrint: "完全免费，每周一期，随时退订。",
    socialProof: (count) =>
      count > 0
        ? `工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · ${count.toLocaleString()} 位职场人已经在订阅`
        : "工业工程师 → 业务规划师 · 在达拉斯组织 AI 黑客松 · 现在订阅，做第一批读者",
    latestPosts: {
      heading: "先读一期看看。",
    },
    about: {
      heading: "关于",
      paragraphs: [
        "我是 Jack Qian，在德州仪器（Texas Instruments）做工业工程师，2026 年 4 月转去做业务规划——也就是说，我每天都在拿 AI agent 折腾真实的供应链活儿。",
        "每周找一个人，问同一组问题：这个月你到底拿 AI 干了什么？哪条 prompt 你打死不删？哪里翻车了？然后把对话录下来。",
        "对话会以三种方式发出：播客、YouTube，加一份发到你邮箱的文字稿。我每月在达拉斯还办一次 AI 实战黑客松，本地朋友欢迎来。但访谈是主菜。",
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
