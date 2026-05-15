# Real Agent Use Cases — PRD v0.1

> 起草日期：2026-05-12 · 作者：Jack Qian + Claude · 版本：v0.1
> 状态：草稿，等 Jack 第一轮 review。

---

## 目录

1. [Mission · 使命](#1-mission)
2. [Audience · 受众](#2-audience)
3. [Product Offering · 产品形态](#3-product-offering)
4. [Content Strategy · 内容策略](#4-content-strategy)
5. [Distribution · 分发](#5-distribution)
6. [Metrics · 指标](#6-metrics)
7. [Roadmap · 90 天路线图](#7-roadmap)
8. [Out of Scope · 不做的事](#8-out-of-scope)
9. [Risks · 风险与对策](#9-risks)
10. [Open Questions · 待定问题](#10-open-questions)

---

## 1. Mission

**每周采访一位职场人，把他真在跑的 AI agent 完整拆给你看。三种形态——播客、YouTube、文字稿。所有 prompt、工具、连接方式原样放出。免费。不讲理论。**

### 北极星指标

**90 天内 200 名 active email subscriber**（通过 Formspree 提交，每周收到 newsletter）。

### Why this exists

工作里真正有用的 AI agent，多数没人写下来。摸索出来的人忙着干活，没时间发表——于是真正有效的搭建方法都留在了他们脑子里。这个 newsletter 改这件事。

---

## 2. Audience

### 主受众（90% 内容针对）

**所有有工作流的职场人**——不分技术背景、不分行业、不分公司规模。

涵盖职能：财务、数据、运营、业务规划、供应链、市场、销售、HR、设计、法务、教育、新闻、咨询、产品、咨询、医疗运营、律师助理、教师……只要有重复工作流，就有 AI agent 用武之地。

地理：
- 主：**北美华人职场人**（英文足够流利，可以读 EN 内容；偏好中文 newsletter）
- 次：**国内中产职场人**（对国际 AI 工具有兴趣，想知道海外做法）

### Persona（写文案 + 选嘉宾时对照）

> 30 岁出头的资深分析师 / 经理。在 TI / 一家 fintech / SaaS / 银行 / 制造业 / 律所 / 4A / 出版社。每天泡在 Excel、Tableau、Notion、PPT、邮箱里。试过 ChatGPT，但感觉"只用了 10%"。看到同行用 AI 做出惊人结果，**想知道怎么做，但找不到具体教程**——博客全是 hype，YouTube 全是 demo 玩具应用。

### 不是这群人

- ❌ 核心 ML/AI 工程师（他们不需要 prompt 教程）
- ❌ C-suite（让助理读 newsletter）
- ❌ Hype 跟随型（你给他 prompt 他也不会真用）

### 痛点（每期内容必须击中至少一个）

1. "我知道 AI 能干，**但具体怎么搭，让它真做事**？"
2. "我同事用 AI 做了 X，**我怎么复制**？"
3. "我自己摸索的 workflow **是不是已经过时了**？"
4. "应该花时间学**哪个工具**？（Claude Code / Cursor / n8n / Zapier / GAS）"

---

## 3. Product Offering

### 单位内容 = 一个 AI agent（不是一个 prompt）

| 维度 | 说明 |
|---|---|
| 不是 | "教你写更好的 prompt" |
| 是 | "教你搭一个会自动跑、替你做事的 agent" |
| 关键差异 | 多步骤、用工具、有触发器、产物可重复 |

### 三种形态（一期 = 一次采访 × 三个分发面）

| 形态 | 长度 | 平台 | 用户场景 |
|---|---|---|---|
| 🎙️ **音频播客** | 30-45 分钟 | 小宇宙（主）+ Apple Podcasts / Spotify（同 RSS） | 通勤、家务后台听 |
| 📺 **YouTube 视频** | 与播客同长，加字幕 + 截屏 | YouTube `@realagentusecases` | 看 demo + screen share |
| 📝 **文字稿** | < 2000 EN 词 / < 3000 ZH 字 | realagentusecases.com + 邮件 | 复制 prompt、scan、引用 |

### 频率

**每周一期**，固定 **周三上午 9am US Central** 发布。

- 周一/二录制 + 编辑
- 周三发布（同步三平台 + 邮件群发）
- 周四/五推社媒 + 找下一位嘉宾
- 周末休息或缓冲

> 时间预算：21 小时/周（3 小时/日 × 7）。一期内容预算 ≈ 采访 1h + 编辑/写稿 6h + 视频剪辑 4h + 推广 1h ≈ **12h**。剩 9h 用作找嘉宾 + 自己探索新 agent。

### 定价

**永久免费**，**前 1000 订阅之内不接任何形式的赞助、广告、付费墙**。

未来变现路径（不锁死，留口子）：
- 课程（"我教你给自己搭 AI agent"）—— $199-499
- 付费社群 / Discord —— $30/月
- 企业培训 / 咨询 —— $5K-50K/单

**明确不靠 newsletter 本身收费**。

---

## 4. Content Strategy

### 编辑 4 原则（不可让步）

1. **完整搭建步骤必发**：prompt、工具、连接方式、定时设置全开放。没有"商业机密"和"我不能告诉你"环节。
2. **必须是真在跑**：嘉宾每天/每周都在用的 agent，不是 demo 不是设想。运行至少 30 天。
3. **必须包含"翻车段"**：哪里没 work、过去 work 现在不再 work、踩过的坑。**无翻车 = 不发**。
4. **必须短**：< 2000 EN 词 / < 3000 ZH 字。太长违背"复制就能搭"的精神。

### 每期固定结构

```
1. TL;DR（粗体一行 hook + 6 行表格——服务 1.5 秒滑动型、10 秒决策型、60 秒仔细型三种读者）
2. 嘉宾介绍（50 字内）
3. 这个 agent 解决什么问题（具体痛点 + 之前怎么做）
4. 完整搭建步骤
   ├─ 工具栈：用了什么
   ├─ Prompt 模板（完整可粘贴）
   ├─ 触发方式（手动 / cron / webhook / event）
   └─ 输出处理（写入哪、通知谁）
5. 跑了多久 / 多少次 / 替代了什么
6. 翻车段（必须有）
7. 嘉宾下个想搭的 agent
```

### 嘉宾筛选标准

必须满足全部：
- ✅ 当前在做真工作（不是研究、不是 AI 公司员工、不是 demo creator）
- ✅ 至少 1 个 agent 已经稳定跑 ≥ 30 天
- ✅ 愿意全开放（prompt + 工具 + 配置）
- ✅ 30-45 分钟有空录制

加分项：
- 非科技岗位（律师、销售、记者、设计师、HR）
- 有跨平台搭建经验（Claude / n8n / Notion / Slack 组合）
- 有翻车故事

### 嘉宾采访问题库（Tier 1 核心 7 问 + Tier 2 备用 13 问）

**设计原则**：Tier 1 永远问、按序问——这是系列的"研究价值"基石（5 期后读者可对比"5 个职场人都怎么回答 Q2"）。Tier 2 是**追问池**，每期按嘉宾类型抽 **2-3 个**穿插到对应 Tier 1 题后面，绝不替换 Tier 1。

#### Tier 1：核心 7 问（每期必问，按序）

问题写成**口语、对话感**的版本——这是播客，不是问卷。下面是录制时实际说出口的话术。

| # | 问题（实际话术） | 对应文章段落 | 录制时长目标 |
|---|---|---|---|
| 1 | "先简单介绍下你自己——你是做什么的，在哪家公司？" | 嘉宾介绍 | ~3 min |
| 2 | "最近这阵子，你真正把 AI 用上的是哪件事？" | 这个 agent 解决什么问题 | ~6 min |
| 3 | "这个 agent 你是怎么搭起来的？带我们一步步走一遍" | 完整搭建步骤 | ~11 min（**屏幕分享**） |
| 4 | "你这套 prompt 里，最关键的是哪几条规则？" | Prompt 模板 | ~6 min |
| 5 | "用多久了？真的帮你省到时间了吗——还是省了钱、省了麻烦？" | 跑了多久 / 替代了什么 | ~6 min |
| 6 | **"有没有翻过车？说说最坑的一次——或者哪部分以前好用、现在不灵了"** | **翻车段（必须有）** | ~6 min |
| 7 | "接下来你还想搭个什么 agent？" | 嘉宾下个想搭的 agent | ~2 min |

> ⚠️ **不要让嘉宾照着念整段 prompt** —— 播客上没人想听人念 prompt。Q4 只聊"最关键的几条规则"；**完整 prompt 走录后单独拿**（嘉宾发文件 / 录制中顺手截屏，见 Phase 3 索取素材），放进文章文字稿。
>
> ⚠️ **"速读" 不问嘉宾** —— 文章顶部的"速读"是 Jack 录完后自己提炼的 3 句话摘要，不是采访问题。

#### Tier 2：13 个备用追问池（按嘉宾抽 2-3 个）

**A. 工具/成本**（追问 Q3-Q4 后用，技术细节型嘉宾）

| # | 问题 | 何时用 |
|---|---|---|
| 8 | "你用的是 Claude / GPT / Gemini？为什么这个不那个？" | 嘉宾用了主流模型但没解释选型 |
| 9 | "这个 agent 一个月花你多少钱？API + 订阅都算上" | 嘉宾搭了重型 agent，读者关心成本门槛 |
| 10 | "完全不懂 API 的人能复刻吗？最低要会什么？" | 嘉宾是技术型，需要降门槛给文科读者 |

**B. 风险/合规**（追问 Q6 后用，企业/受监管行业）

| # | 问题 | 何时用 |
|---|---|---|
| 11 | "这个 agent 接触你公司的什么数据？你怎么跟合规/老板交代？" | 嘉宾在金融/医疗/法律/上市公司 |
| 12 | "最尴尬或最危险的一次错误是什么？" | 嘉宾 Q6 答得太干净，需要挖更深的故事 |

**C. 团队/协作**（追问 Q5 后用）

| # | 问题 | 何时用 |
|---|---|---|
| 13 | "这个 agent 是你一个人用，还是团队共享？共享时怎么处理权限？" | 嘉宾是 manager 或工程师 |
| 14 | "你怎么知道它今天没跑坏？有 monitoring / 报警吗？" | 嘉宾搭了 daily/hourly 自动任务 |
| 15 | "哪天 OpenAI / Anthropic 涨价 10 倍、或服务下线，你怎么办？Plan B 是什么？" | 嘉宾过度依赖单一供应商 |

**D. 个人行为改变**（追问 Q5 后用，故事型嘉宾）

| # | 问题 | 何时用 |
|---|---|---|
| 16 | "用了这个之后，你的工作时间表/注意力分配有啥变化？省下的时间花在哪？" | 嘉宾省了 1h+/天，但没讲省下来干啥 |
| 17 | "你的下属/同事看到了，他们是嫉妒、复制、还是 dismissive？" | 嘉宾在团队里是 early adopter |
| 18 | "你老板知道吗？老板的反应？" | 隐性问题——很多人偷偷用 AI |

**E. 宏观判断**（替代或补 Q7，资深嘉宾用）

| # | 问题 | 何时用 |
|---|---|---|
| 19 | "假设你能强制公司 100 个人都搭一个 agent，你会让大家搭啥？" | 嘉宾是 director+ 或 founder |
| 20 | "5 年后这个 agent 还存在吗？还是会被产品化、被取代？" | 嘉宾思考型，能讲 vision |

#### 抽题套路（按嘉宾类型速查）

| 嘉宾类型 | 推荐抽题 |
|---|---|
| 技术工程师（搭 RAG / multi-agent） | Q8, Q10, Q14 |
| 企业/合规岗（律师、HR、金融） | Q11, Q12, Q18 |
| Manager / Director | Q13, Q17, Q19 |
| 个人独立用户（自由职业、咨询） | Q9, Q16, Q20 |
| 嘉宾内容太干 / 翻车段空 | Q12, Q16, Q17（挖故事） |

**抽题原则**：每期 Tier 2 **最多 3 个**，否则 60 min 装不下。把它们**插到对应 Tier 1 题后面**，不要单独成段。Phase 0 发问题清单时，连 Tier 2 也一起发——让嘉宾事先想清楚。

### 1 小时录制流程（minute-by-minute）

总计：录前 15 min + 录制 60 min + 录后 15 min = **90 min / 期**

#### Phase 0：录制前 24-48 小时（Jack 一个人，~15 min）

- 发邮件/微信给嘉宾，附：
  - **完整问题清单（Tier 1 的 7 个 + 当期抽中的 Tier 2 的 2-3 个）**——让嘉宾事先想清楚，避免现场卡壳
  - 录制时间 + 工具（Riverside.fm 或 Zoom）
  - 录音/发布同意书一行字
- Jack 自己提前 30 min：
  - 根据嘉宾类型从"抽题套路"表里**选定**当期 Tier 2 追问（最多 3 个），写进 Notion 文档对应 Tier 1 题下
  - Riverside.fm（开 record + cloud + separate audio tracks）或 Zoom + cloud record
  - Voice Memos on phone（**本地备份**，技术翻车时救命）
  - 一份采访 Notion / 文档，标好所有问题作子标题

#### Phase 1：0-10 min（开场 + 录音预检）

| 时段 | 做什么 |
|---|---|
| 0:00-3:00 | **Tech check** —— 双方 audio 测试、画面清晰、Riverside connected、cloud recording 已开 |
| 3:00-6:00 | **闲聊暖身** —— 天气、最近忙啥、上次见面回顾。让嘉宾放松 |
| 6:00-8:00 | **再次确认录音 + 发布同意**："这次录音同时发播客、YouTube、文字稿，OK？" |
| 8:00-10:00 | **解释录制流程** —— "我会问 7 个核心问题 + 几个针对你情况的追问，每题 4-6 分钟，最后留时间给你 reflection" |

#### Phase 2：10-50 min（按 Tier 1 顺序执行，穿插当期 Tier 2 追问）

按 Tier 1 表的"录制时长目标"列执行。当期选中的 Tier 2 追问**插入到对应 Tier 1 题后面**——不要单独成段、不要打乱顺序。**关键技巧**：
- Q3 必须开 **screen share + screen recording**——嘉宾边讲边演示
- Q4 **只聊关键规则**，绝不让嘉宾照着念整段 prompt——完整 prompt 让嘉宾录后发文件 / 录制中顺手截屏，后期放进文字稿
- Q6 嘉宾说"没翻车" → **不接受** → 引导："那有没有哪部分以前好用、后来不灵了？" / 直接抽 **Q12（最尴尬/最危险的一次错误）** 挖深
- **不打断**——follow-up 留到那一题结束再问
- Tier 2 题超时 → **果断切断**，时间预算属于 Tier 1

#### Phase 3：50-60 min（收尾）

| 时段 | 做什么 |
|---|---|
| 50:00-53:00 | **Free follow-up** —— Jack 抓 1-2 个特别好奇的细节追问 |
| 53:00-56:00 | **约预审** —— "我下周二把稿件发你预审，周三上线，OK？" |
| 56:00-59:00 | **索取素材** —— headshot、公司 logo（如允许）、prompt 完整文件、screenshots |
| 59:00-60:00 | Thank you + **stop recording** + 确认 cloud 上传 |

#### Phase 4：录制后立刻（Jack 一个人，~15 min）

- 检查 cloud recording 上传成功（Riverside 通常 5 min 内）
- Notion 文档里**为每个 Q 标 timestamp**（写稿时按时间戳定位极快）
- 写下 **3 句 first-impression**（这就是 TL;DR 的原料）
- 发感谢邮件，附"预审稿件"承诺时间
- 把 prompt 文本/截图存到一个集中文件夹

> **常见踩坑** —— 录制完拖到第二天才整理 → first-impression 已经忘 → TL;DR 难写。**录后 30 分钟内必须把 first-impression 落到字上**。

### 头 4 期内容

| 期 | 主角 | 主题 | 状态 |
|---|---|---|---|
| **#001** | Jack 自己 | Email→to-do agent（Claude Pro + Gmail Connector） | ✅ 已上线 |
| **#002** | Jack 自己 | 15 分钟部署网站，卖给老板 OR Claude Code 更新自媒体（TBD） | 录制中 |
| **#003** | Jack 自己 | 剩下那个 | 5/27 上线 |
| **#004** | **第一位外部嘉宾**（TBD） | 由嘉宾决定 | 6/10 上线 |

⚠️ #001 已上线后**立刻**开始找 #004 嘉宾。详见 Section 10 Open Questions。

---

## 5. Distribution

### 主分发矩阵

| 渠道 | 角色 | 内容形态 | 频率 |
|---|---|---|---|
| **realagentusecases.com** | 文字稿主存放地 + 漏斗着陆点 | 完整文章 | 每周 |
| **Email**（Formspree 收 → 手动 BCC 群发） | 订阅者直送 | 完整文字稿 | 每周 |
| **🎙️ 小宇宙 + Apple/Spotify** | 中文 + 英文受众的音频 | 30-45min 播客 | 每周 |
| **📺 YouTube** | 国际 + 国内（YouTube Premium）视频受众 | 同播客视频版 | 每周 |
| **📕 小红书** | **国内 + 北美华人主获客** | 截图 + 短帖引流 | 每周 1-2 次 |
| **🐦 X / Twitter** | 英文 builder 受众 | Thread + 单推 | 每期 1 thread |
| **💼 LinkedIn** | 职场资深用户 | 长帖 | 每周 1 次 |
| **朋友圈** | 个人圈层激活 | 软推 | 每期 1 次 |
| **WeChat 公众号** | （延后到 100 订阅之后） | — | — |

### 漏斗设计

```
外部流量
   ├─ 小红书 bio "realagentusecases.com"
   ├─ X bio + thread 末尾 link
   ├─ LinkedIn post link
   └─ 朋友圈附长链接
      ↓
   realagentusecases.com（中/英自动识别 + 切换）
      ↓
   Hero email form (Formspree)
      ↓
   订阅成功 → Jack 手动跟踪
      ↓
   每周三邮件直送（Gmail BCC 至列表）
```

### 邮件群发的演进路径

- **0-100 订阅**：Formspree 收集 + Gmail BCC 手动群发
- **100-500 订阅**：导出 Formspree CSV → 导入 Buttondown（$9-29/月）或 Beehiiv（前 2500 免费）
- **500+ 订阅**：评估是否切回 Substack（用作仅发送工具，不当 host）

### UTM 跟踪

每个 bio 链接、社媒帖都带 UTM：
```
realagentusecases.com/?utm_source=xhs
realagentusecases.com/?utm_source=x_bio
realagentusecases.com/?utm_source=linkedin_post_001
```

这样 Cloudflare Web Analytics → Filter → 看每个渠道实际带了多少访客 + 转化率。

---

## 6. Metrics

### 北极星（lagging）

**Active email subscribers**（Formspree dashboard 真实邮箱数）

| 时点 | 目标 |
|---|---|
| Day 7（5/19） | 20 |
| Day 30（6/11） | 80 |
| Day 60（7/11） | 140 |
| Day 90（8/10） | **200** |

### Leading 指标（先于 lagging）

| 指标 | 频率 | 健康阈值 |
|---|---|---|
| 每周一期是否准时上线 | 周 | 100%（错过 1 周 = red flag） |
| 每周是否锁定下一位嘉宾 | 周 | 100%（提前 2 周锁定为佳） |
| 三平台同步发布 | 周 | 100%（podcast + YouTube + 文章） |
| 小红书每周帖数 | 周 | ≥ 1 |
| 文章页面 → form 提交转化率 | 周 | ≥ 3% |

### 不看的"虚荣指标"

- ❌ Cloudflare Workers 请求总数（包含 bot，没意义）
- ❌ 站点 page views（不去重）
- ❌ YouTube 单视频播放量 < 24h 内的数字（早期波动太大）
- ❌ 朋友圈点赞数

### 分析工具栈

- **CF Web Analytics**（已开）—— 真实访客 + 渠道
- **GSC**（已开）—— Google 搜索词 + 索引状态
- **Bing Webmaster**（已开）—— 同上但 Bing 端
- **Formspree dashboard** —— 订阅 funnel
- **Plausible 或 GA4** —— 100 订阅之后再加（分析 dwell time / scroll depth）

---

## 7. Roadmap

> 时间窗：2026-05-12 → 2026-08-10（90 天）

### Week 1（5/12 - 5/18）— Launch
- ✅ Issue #001 上线
- 🟡 Jack 发 小红书 / X / LinkedIn / 朋友圈 上线帖
- 🟡 改所有平台 bio 链接到 realagentusecases.com
- 🟡 找 1-2 个嘉宾候选（Issue #004 用）
- 🟡 录 Issue #002（Jack 第二个 agent）

### Week 2（5/19 - 5/25）— Issue #002
- 5/20 Issue #002 上线
- 继续小红书每周更
- 嘉宾候选名单 → 3-5 人

### Week 3（5/26 - 6/1）— Issue #003 + 嘉宾约访
- 5/27 Issue #003 上线
- **5/29 周五截止**：锁定 Issue #004 嘉宾，约好录制时间
- 准备采访提纲（5-7 个固定问题）

### Week 4-12（6/2 - 8/10）— 嘉宾驱动周更

每周固定节奏：
| 周几 | 任务 |
|---|---|
| 周一 | 上周回顾 + 本周嘉宾资料确认 |
| 周二 | 录制（线上 Zoom / 线下） |
| 周三 | **发布**（podcast + YouTube + 文章 + 邮件）|
| 周四 | 推社媒（小红书 + X + LinkedIn） |
| 周五 | 找下下周嘉宾 + 与目前嘉宾敲细节 |

每月（30 天）回看：
- 订阅是否达标？（Day 30 = 80）
- 嘉宾池是否健康？（保持至少 4 周提前量）
- 哪期最受欢迎？（用做下一篇方向参考）

### 关键里程碑

| 日期 | 里程碑 |
|---|---|
| 5/20 | Issue #002 上线 |
| 5/27 | Issue #003 上线 |
| 5/29 | Issue #004 嘉宾锁定 |
| 6/10 | **第一位外部嘉宾上线**（产品转型节点） |
| 7/1 | 50 订阅 check-in |
| 7/15 | 100 订阅 check-in，决定是否迁邮件服务 |
| 8/10 | **90 天 review**——200 订阅达成？monetization 决策时点 |

---

## 8. Out of Scope

明确**不做**的事（写下来避免漂移）：

### 内容层
- ❌ "AI 资讯" / 行业 newsletter / 综合评论（已有 The Information、TLDR 等做得很好）
- ❌ "AI 工具评测" / "Claude vs ChatGPT" 这类比较内容
- ❌ AI 理论 / 学术 / paper review
- ❌ "10 个最好 AI prompt" 这种 listicle
- ❌ 投资 / 融资 / 创业经验类内容

### 形态层
- ❌ 写自己博客（这个 newsletter 不是 Jack 的个人 blog）
- ❌ 接付费推广 / 软广（前 1000 订阅之内）
- ❌ 付费 newsletter 档（永远不做）
- ❌ Live streaming / Twitter Space（专注录制 → 异步分发）

### 平台层
- ❌ 抖音（不是目标受众）
- ❌ 快手（同上）
- ❌ B 站（延后到第 100 订阅之后评估）
- ❌ 微博（同上）

### 商业层
- ❌ 通过 newsletter 直接卖东西（变现不靠 newsletter 本身）
- ❌ 接受赞助 / 软广
- ❌ 联名 / 合作发文 / co-branded 系列（除非极特殊机会）

### 站内层
- ❌ 评论系统 / 论坛
- ❌ 用户登录 / 个人 dashboard
- ❌ 搜索（前 50 期不做）
- ❌ 复杂 archive / 分类 / tag 体系（前期不做）

---

## 9. Risks

### Top 6 风险 + 对策

| # | 风险 | 概率 × 影响 | 对策 |
|---|---|---|---|
| 1 | **Jack 时间不够** — 3h/日 是 onerous 承诺，叠加正职 | 高 × 致命 | (a) 严格守 12h/期 预算；(b) 每月 review 时间花在哪；(c) 如果连续 2 周缺单元，启动"双周更"应急模式 |
| 2 | **嘉宾源不够** — Issue #004+ 全靠外部嘉宾，Jack 的网络深度未知 | 高 × 致命 | (a) 5/29 之前必须有 5-10 人候选池；(b) 用 Issue #001-#003 在社媒钓鱼"想被采访的人 DM 我"；(c) LinkedIn DM 冷接触 |
| 3 | **内容质量漂移** — 周更压力让"全 prompt 必发""必有翻车段"原则被妥协 | 中 × 高 | (a) 编辑 4 原则写在 PRD 卷首每期回看；(b) 如果一期没有"翻车段"，**宁可不发**；(c) Issue 完稿后 24h 静置再发，二次审 |
| 4 | **国内访问慢/不稳** — CF 全球网络对大陆 spotty | 中 × 中 | (a) 小红书 / 公众号 引流并把全文也粘在国内平台；(b) 接受国内访客部分流失，重心放北美华人 + 翻墙用户 |
| 5 | **Formspree 50/月 ceiling** — 订阅过 50 时被截断 | 高 × 中 | (a) 100 订阅之前迁 Buttondown 或 Beehiiv（free tier 2500）；(b) 监控 Formspree 用量，过 40 就启动迁移 |
| 6 | **同类内容竞争** — Lenny / Dan Koe / Every / 类似 AI workflow newsletters | 中 × 中 | (a) 死守差异化 anchor："real agent" "any profession" "with the prompt"；(b) 每期 review：这内容能不能被那些人轻易做出来？能 → 重写 |

### 不在 top 6 但要追踪的次级风险

- Anthropic API 涨价 / 减额（影响嘉宾搭 agent 成本）
- 域名续费忘了（Cloudflare auto-renew 必开）
- GitHub repo 私有泄漏（实际不存敏感信息，但保持 private）
- Jack 转岗后 schedule 变化（4 月已转，已经 settle）

---

## 10. Open Questions

### 等 Jack 拍板（按紧迫度排序）

#### Q1: Issue #004 第一位外部嘉宾是谁？
- 截止：**5/29 周五**
- 选项：
  - (a) Jack 现 LinkedIn 网络里发 DM
  - (b) Issue #001 - #003 上线后等"想被采访的人 DM 我"
  - (c) 在小红书直接发"招募首期嘉宾"贴
- 默认行动：周内 5/16 起，Jack 列出 10 个候选名单，逐个发 DM

#### Q2: Issue #002 用哪个 Jack agent？
- 截止：**5/15 周四**
- 选项：
  - (a) 15 分钟部署网站，卖给老板（视觉冲击力强，适合 YouTube）
  - (b) Claude Code 自动更新自媒体（内容人最痛）
- 默认推荐：(a)——因为有 Jack 实际操作可拍 demo

#### Q3: 未来 monetization 路径决策时点
- 截止：**8/10**（90 天 review 时）
- 选项：
  - (a) 课程（"我教你搭 AI agent"）—— 高 LTV、低频
  - (b) 付费社群 —— 中 LTV、中频
  - (c) 1-1 咨询 / 企业培训 —— 高单价、高时间成本
  - (d) 推迟到 500 订阅再决定
- 默认推荐：(d)——数据多一些再说

#### Q4: 何时加 Plausible / GA4？
- 截止：**Day 30 review（6/11）**
- 触发条件：CF Web Analytics 给的数据已不够用（想看 dwell time / scroll depth / 跨页面行为）
- 默认推荐：6/11 review 时判断，如果当时月访客 < 500 则继续等

---

## 附录 — 这份 PRD 怎么用

**当下**（Jack）：从头到尾通读一遍，每个章节有不同意 / 想改的地方，在文末留 comment 或直接改文件 + commit。

**每周（Jack + Claude）**：周一 review 一次。Section 7 Roadmap 那张表的"本周任务"是不是 on track？Section 9 Risks 哪个突然变大了？

**每 30 天**：Section 6 Metrics 实际值 vs 目标值。差距大 → 是什么 driver 没做好？

**90 天**：v0.1 → v0.2。这份文档应该被重写，不是被 patch。新版本提交到 git，旧版本作为 reference。

---

> *"This is a doormat to a Substack. Just kidding — this is a multi-platform interview series powered by 3 hours a day, an LLM, and a working professional's notebook. Let's see how far it goes."*
