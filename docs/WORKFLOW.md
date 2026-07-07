# 内容生产工作流（可复用 SOP）

> 2026-07-06 制定。背景：自动管线曾在 5-19 至 6-19 产出 22 组「职业×新闻」低质文章（0 内链、84 处无来源的 "Research shows"、标题超长一倍），已全部删除。本工作流的设计目标：**质量不依赖人的编辑判断，依赖机械闸门 + 真实素材**。你的角色只有两个：提供真实素材（访谈/自己跑的 agent），和最后 5 分钟过目。判断类工作全部交给 Claude + 脚本闸门。

## 0. 三条流水线总览

| 流水线 | 频率 | 产出 | 你投入 |
|---|---|---|---|
| A. 访谈（燃料） | 每周 1 期 | `content/posts/` 一组 Issue | 录 45 分钟 + 过目 5 分钟 |
| B. 集群文章（SEO/GEO） | 每周 ≤1 篇 | `content/news/` 一组文章 | 过目 5 分钟 |
| C. 维护（复利） | 每日 5 分钟 + 每周 30 分钟 | 排名提升、引用记录 | 全部可委托 Claude |

**铁律：B 永远不超过 A。** 没有新访谈素材的那周，B 只能写「以已有真实素材为地基」的文章（对比页、指南），或干脆不发。宁缺毋滥——已经吃过一次批量内容的亏。

## 1. 每周节奏

- **周一/二**：录访谈（PRD 的 Tier 1 七问 + 2-3 个追问）
- **周三**：发 Issue（流水线 A）+ 邮件群发
- **周五**：发 1 篇集群文章（流水线 B，可选）
- **周六**：每周维护 30 分钟（流水线 C 周任务）

## 2. 流水线 A：访谈 → Issue（每周三发布）

1. 把录音转写稿（或笔记）丢给 Claude，用这个提示词：

```
读 CLAUDE.md 和 docs/WORKFLOW.md。这是本周访谈的转写稿：<粘贴/文件路径>。
按 PRD 的固定结构（TL;DR 表格→嘉宾→痛点→完整搭建步骤→运行数据→翻车段→下个想搭的）写
content/posts/<日期>-<slug>-en.mdx 和 -zh.mdx。
所有 prompt/工具/配置必须原样保留，翻车段必须有。写完跑质量闸门（§5）并报告结果。
```

2. Claude 写完 + 闸门全绿 → 你花 5 分钟只检查两件事：**嘉宾的事实说对了没有**、**有没有嘉宾要求删的信息**。
3. 说「发布」→ Claude 提交推送（Cloudflare 自动部署），并在 GSC 请求收录该 URL。

## 3. 流水线 B：集群文章（已自动化——每日任务 `daily-seo-geo-realagentusecases` 代跑，闸门内置，找不到真实素材的当天自动跳过。以下为手动执行时的流程）

1. 提示词：

```
读 CLAUDE.md。跑 node scripts/seo/feeds.mjs list，从 keywords.json/prompts.json 里挑
下一个 status=new 且我们有真实素材支撑的条目（没有就明说，这周跳过）。
用 scripts/seo/templates/ 里对应模板写一组 en/zh 文章：
- 开头 40-60 词自包含答案块（GEO 引用位）
- ## FAQ 段 3-5 条（**问题** 格式，自动出 FAQPage schema）
- 每个数据点带来源链接；引用已有 Issue 的真实数据优先
写完跑质量闸门（§5），把关键词 mark 成 used，更新 public/llms.txt，报告结果。
```

2. 你过目 5 分钟 → 「发布」。

## 4. 流水线 C：维护

**每日 5 分钟（可完全委托给 Claude 的定时任务）：**
1. GSC 扫一眼：新增索引？哪些词有展示？
2. 挑 1 条 `prompts.json` 里的问题问 Perplexity/ChatGPT，看是否引用本站 → 结果追加进 `content/seo/mentions.json`
3. 一个外部动作：在 Reddit/HN/LinkedIn 相关讨论里真实参与一次（这条只能你做，AI 引擎重度引用 Reddit）

**每周 30 分钟（周六）：**
1. `node scripts/seo/audit.mjs` 全量跑一遍，修掉所有警告
2. GSC 找「展示多、排名 8-20」的词 → 给对应文章加内容/内链
3. 检查 mentions.json 本周记录：哪些 prompt 已被引用（standing win）、哪些从未被引用（内容缺口）
4. 竞品瞄一眼：Zapier/n8n/Make 博客本周发了什么（`seo.config.json` 的 competitors 列表）

**每月：** 把最旧的 1-2 篇文章刷新（新数据、新日期）；检查 Formspree→邮件流程还通不通。

## 5. 质量闸门（每次发布前，Claude 自动跑）

```bash
node scripts/seo/audit.mjs        # title/excerpt 长度、内链数——必须 0 警告
pnpm build                        # 必须绿
grep -riE "research shows|data shows|studies show" content/ # 命中即失败，除非同句有来源链接
```

人工核对清单（Claude 自查后报告）：
- [ ] 每个事实句有具名来源链接；没有编造的数字/ROI
- [ ] ≥2 条站内链接，且至少 1 个旧页面链向新文章（无孤岛）
- [ ] en/zh 成对
- [ ] 开头有 40-60 词答案块；有 ## FAQ 段
- [ ] 关键词已 mark used；llms.txt 已更新（常青页）

## 6. 发布 = 部署

`git push origin main` → Cloudflare Workers Builds 自动构建上线（约 90 秒）。发新页后在 GSC 用 URL 检查工具请求收录，缩短发现时间。

## 7. 给 Claude 的万能开场（新会话直接粘贴）

```
这是 realagentusecases.com 的仓库。读 CLAUDE.md 和 docs/WORKFLOW.md 再动手。
今天执行流水线 <A/B/C>：<具体任务>
```

## 8. 发布自动化守则与熔断（2026-07-06 起开启）

每日任务自动写作+发布的前提（每一条写死在任务 prompt 里）：
1. 题目只来自 keywords.json / prompts.json（status=new）；周日不写文，改为补充词库（ideation）
2. 动笔前先做真实来源调研（≥3 个可链接来源）；素材不足 → 当天跳过并汇报，绝不硬编
3. 全部 §5 闸门自检：长度、≥2 内链、en/zh 成对、无 "Research shows" 无来源句
4. 每天 ≤1 组；只允许提交 content/news、content/seo、public/llms.txt 及规则文档；绝不碰 content/posts（访谈只能人写）

**熔断（出现任一立即停用任务再排查）**：GSC 出现 manual action 或收录量骤降；连续 2 篇被发现无来源陈述；Cloudflare 构建连续失败。
