# Daily Data Monitoring SOP

每天 10 分钟，按重要性排。

---

## 1. 邮件订阅数（北极星）

**为什么排第一**：唯一直接对应 200/90 天目标的数字。

- 哪看：你的邮件服务后台（待定 — Beehiiv / Substack / ?）
- 看啥：昨日新增、累计、退订
- 时间：1 分钟
- 红线：**连续 3 天 0 新增** = 引流入口出问题了

---

## 2. Google Search Console

**为什么看**：SEO 文章有没有进 Google 索引、有没有人搜进来。

- 哪看：https://search.google.com/search-console
- 路径：property 是 `realagentusecases.com`（Domain property，DNS 验证）
- 时间：2 分钟
- 看啥（按顺序）：
  1. **Overview** — Performance 趋势线（impressions / clicks）
  2. **Pages** — Indexed vs Not indexed 的比例；点开 Not indexed 看原因
  3. **Performance** → **Queries** — 哪些搜索词带来 impression（最有价值的信号 — 告诉你 Google 把你跟什么词关联上了）
- 红线：**超过 2 周没有任何 impression** = SEO 改动没起作用，先查 robots / sitemap / canonical

---

## 3. Cloudflare 流量

**为什么看**：真实访问量 + 哪些页面被点了 + 来源。

- 哪看：https://dash.cloudflare.com → Workers & Pages → `realagentusecases-site` → Metrics
- 看啥：Requests 总数、Top URLs、地理分布
- 时间：1 分钟

**Web Analytics**（更细的访客行为）：**待启用** — 见 `pending.md`。

---

## 4. LLM 引用监控（晚上 5 分钟）

**为什么看**：GEO 效果 — ChatGPT / Perplexity / Claude 有没有提到你。

- 哪看：手动
- 怎么做：
  1. 从 `content/seo/prompts.json` 里挑 5 个 prompt
  2. 在 Perplexity 里跑一遍（Perplexity 因为显示 sources，最容易验证）
  3. 看 sources 列表里有没有 `realagentusecases.com`
  4. 结果记 Notion（手动）
- 现状：**没有自动化方案** — 没有靠谱的 LLM 引用监控 SaaS，这一步绕不开

---

## 5. 内部 audit（不是每天 — 每篇新文章发布前必跑）

```bash
node scripts/seo/audit.mjs
```

0 errors / 0 warnings 才发布。

---

## 每天的实际节奏

| 时间 | 动作 | 大概用时 |
|---|---|---|
| 早上 | 1 + 2 + 3 | 4 min |
| 晚上 | 4 | 5 min |
| 发文前 | 5 | 1 min |

---

## 哪些 query / metric 值得警觉

| 信号 | 含义 | 怎么应对 |
|---|---|---|
| GSC 出现 "Soft 404" 警告 | 页面被 Google 当成空内容 | 加内容厚度、改 title |
| GSC "Crawled — currently not indexed" 持续 4+ 周 | Google 觉得页面权重不够 | 加更多内链、改 title 让更具体 |
| Impressions 涨但 CTR < 1% | title/description 不吸引人 | 改 title/excerpt |
| Top query 跟内容关联不强 | Google 把你跟错的词关联上了 | 改 H1 / 加内链 / 加结构化数据 |
| 邮件订阅 7 天 0 增 | 引流断了 | 检查 socials / referrer 来源 |
