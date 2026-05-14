# Progress Log — PRD v0.1

## Session: 2026-05-12 (post-restart)

**Goal**: Draft full PRD v0.1 in `docs/PRD.md`, 10 sections, < 3,000 words, in Chinese.

### Done in this session

- Updated todo list to reflect actual state (Issue #001 shipped, agent built via Claude.ai not GAS)
- Created `task_plan.md` with 4-phase plan, Phase 2 = section drafting
- Created `findings.md` consolidating all locked decisions from prior chat sessions
- **Wrote full PRD v0.1 at `docs/PRD.md`** — all 10 sections in a single pass:
  1. Mission (一句话 + 北极星指标 200 subs in 90 days)
  2. Audience (widened to all working professionals; persona, geography, anti-audience, 4 痛点)
  3. Product Offering (AI agent as unit, 3 formats, weekly Wed cadence, free pricing + future monetization options not locked)
  4. Content Strategy (4 unbreakable editorial principles, 7-step episode template, guest selection, first 4 issues plan)
  5. Distribution (8-channel matrix, conversion funnel diagram, UTM scheme, email-sending evolution path 0-100/100-500/500+)
  6. Metrics (NSM with 4 milestones, 5 leading indicators, 4 vanity metrics explicitly ignored)
  7. Roadmap (12-week schedule, Mon-Fri weekly cadence, 8 key milestones)
  8. Out of Scope (16 explicit no-go items across content/format/platform/business/site)
  9. Risks (top 6 with概率 × 影响 + 具体对策, plus 4 secondary risks tracked)
  10. Open Questions (4 decisions awaiting Jack with hard deadlines: Issue #004 guest, Issue #002 topic, monetization timing, analytics upgrade timing)

### Word count
- Chinese chars: 2,690 → **3,406 after 1-hour workflow addition**
- English words: 510 → **621**
- Total readable units: ~3,200 → **~4,027** (over 3,000 cap, but content depth justifies)

### v0.1.1 patch (2026-05-12)
- Added Section 4 "嘉宾采访固定 7 问" — 7-question interview script with target durations
- Added Section 4 "1 小时录制流程（minute-by-minute）" — Phase 0-4 (prep / opening / 7Q / closing / immediate post-record), with timing table per phase
- Reason: Jack asked for a detailed 1-hour interview workflow; the previous version had only the article output structure, not the input/execution workflow

### v0.1.2 patch (2026-05-12)
- Restructured "嘉宾采访 7 问" → **"Tier 1 核心 7 问 + Tier 2 备用 13 问"** (total 20-question bank)
  - Tier 1 (Q1-Q7): locked, every guest, every episode — preserves cross-episode comparability
  - Tier 2 (Q8-Q20): 13-question追问池 in 5 categories (工具/成本, 风险/合规, 团队/协作, 行为改变, 宏观判断), pick 2-3 per episode based on guest type
- Added "抽题套路" lookup table (5 guest types → recommended Tier 2 picks)
- Updated Phase 0 prep (send full question list = Tier 1 + selected Tier 2)
- Updated Phase 2 execution rule (Tier 2 inserted after corresponding Tier 1 题, must not单独成段; if Tier 2 overruns, cut it — Tier 1 owns the time budget)
- Updated Phase 1 opening script ("7 个核心问题 + 几个针对你情况的追问")
- Reason: Jack flagged 7 questions would "用完" — risk of staleness by episode 10. The 2-tier design preserves the research-value engine (same 7) while adding rotation/variety (13 supplementary)

### Chinese rewrite pass (2026-05-12, post-PRD)
- Installed `translate` skill from `feiskyer/claude-code-settings/skills/translate` at `~/.claude/skills/translate/SKILL.md`
- Skill enforces 3-step process: 直译 → 问题识别 → 意译优化
- Applied skill to two files:
  - `lib/i18n/zh.ts` — site UI copy (meta, hero, bullets, About paragraphs, CTAs, footer tagline). Major fixes: "被搭起来" passive → 主动 "该搭的"; "原样放出" 生硬 → "原原本本放出来"; "没付费档" 不像中文 → "不卖课"; "走一遍" 直译 → "走一遍他每天真在用的那一个"
  - `content/posts/2026-05-13-gmail-ai-agent-zh.mdx` — Issue #001 Chinese article. ~12 targeted edits including title, "我一整天有了形状" → "对今天一整天的轮廓就清楚了"; "月费数学" → "月费账"; "3 分钟内整天就 ready" → "三分钟内一整天就安排好了"; "12 条线程" → "12 封回复深处"; "不可省" → "不能省"; design-notes 3 bullets rewritten for cadence
- Created `~/.claude/CLAUDE.md` — global user memory with: (a) rule to always use translate skill for any Chinese, (b) Chinese quality bar (no awkward 被…起来 / 不是 X 而是 Y / 残留英文 "ready" "feature"), (c) user context, (d) project root + Chinese source file paths
- Build verified: `pnpm build` passes, both locales render, sitemap + 2 static pages generated

### Files created/modified

- `task_plan.md` (created → Phase 2 done after this session)
- `findings.md` (created)
- `progress.md` (updated)
- `docs/PRD.md` (created — full v0.1, 1,784 words)

### Next steps for Jack

1. Read full PRD top to bottom
2. Decide Q1 (Issue #004 guest by 5/29) and Q2 (Issue #002 topic by 5/15) — see PRD Section 10
3. Push social media launch drafts (XHS / X / LinkedIn) — drafts in chat history
4. Tag any sections Jack disagrees with for v0.2 rewrite

### Open work tracked elsewhere (NOT in this PRD session)

- Article JSON-LD schema (deferred P2 from frontend audit)
- Plausible / GA4 add-on (deferred until Day 30 review per PRD Section 10 Q4)
- Issue #002 recording + publishing
