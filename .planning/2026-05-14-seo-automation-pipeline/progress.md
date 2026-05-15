# Progress Log — AI SEO Automation Pipeline

## Session: 2026-05-14 (planning)

### Current Status
- **Phase:** 0 - Foundation & Config (blocked on Anthropic API key)
- **Started:** 2026-05-14

### Actions Taken
- Analyzed the YouTube SEO-automation transcript; produced structured study notes at
  `xhs_Manager/seo-automation-guide.html`.
- Confirmed jackqian-site stack: Next.js 16 + MDX + Cloudflare Workers — no CMS. -> Arvo path doesn't fit.
- Jack chose **Path A** (build custom in repo) and **fully automatic** publishing.
- Inspected repo: `lib/content.ts`, `lib/config.ts`, `.env.example`, sample MDX frontmatter.
- Created isolated planning folder (parallel-plan mode) so the PRD project's root planning files
  are not clobbered: `.planning/2026-05-14-seo-automation-pipeline/`.
- Wrote `task_plan.md` (8 phases, Phase 0–7), `findings.md`, this log.

### Blockers
| Blocker | Resolution |
|---------|------------|
| Phase 0 needs an Anthropic API key (Claude Pro != API access) | Awaiting Jack |

### Next steps
1. Jack: provide an Anthropic API key (or decide alternative).
2. Once unblocked -> Phase 0: scaffold `scripts/seo/`, `content/seo/`, brand-kb, `seo.config.json`, llm helper.
3. Then Phase 1: keyword research feed.

### Files created/modified
- `.planning/2026-05-14-seo-automation-pipeline/{task_plan,findings,progress}.md` (created)
- `xhs_Manager/seo-automation-guide.html` (created earlier this session — study notes)

---

## Session: 2026-05-14 (Phase 0 — foundation)

### Decision change
- Jack: "Cowork is the automation script." Automation engine = a scheduled Cowork routine
  (Claude on a cron via the `schedule` skill), NOT unattended API-key scripts.
- This REMOVES the Anthropic API-key blocker. task_plan.md + findings.md rewritten to the
  two-layer architecture (dumb deterministic scripts + smart scheduled routine).

### Actions Taken
- Created directory structure: `scripts/seo/{lib,templates}`, `content/seo/brand-kb`.
- Wrote `seo.config.json` (site, seed keywords, competitors, country, locales, cadence, audit thresholds).
- Wrote `content/seo/keywords.json` + `content/seo/mentions.json` (empty feed/series skeletons).
- Wrote brand KB: `brand-kb/README.md`, `brand-kb/brand-voice.md`, `brand-kb/audience.md`
  (seeded from docs/PRD.md, lib/i18n/en.ts, Issue #001).
- Wrote `scripts/seo/templates/default.md` (generation prompt + markdown outline).
- Wrote `scripts/seo/lib/mdx.mjs` — deterministic MDX-pair writer; frontmatter matches lib/content.ts.
- Wrote `scripts/seo/README.md` (two-layer architecture doc).

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `node --check mdx.mjs` | no syntax errors | clean | PASS |
| `mdx.mjs` import + smoke test | exports + buildSlug + frontmatter quoting work | all correct | PASS |

### Phase 0 — complete.

---

## Session: 2026-05-14 (Phase 0.5 — /news architecture + first article)

### Decisions locked (Jack)
- Competitors = automation-tool blogs (Zapier / n8n / Make). seo.config.json updated.
- `/news` = unified content hub: SEO articles + newsletter issues listed together, tagged.
- SEO articles -> `content/news/`; hand-written issues stay in `content/posts/`.
- News served at `/news/[slug]`; issues keep `/posts/[slug]` (Issue #001 URL unchanged).

### Actions Taken
- `seo.config.json`: tightened seedKeywords (4 core), competitors -> Zapier/n8n/Make, added `section` block.
- `lib/content.ts`: rewrote for two streams ("issue"/"news") — `getAllContent`, `contentHref`,
  `getContentByType`, `getParamsByType`, `getAllContentParams`; kept back-compat aliases.
- New routes: `app/[locale]/news/page.tsx` (unified hub), `app/[locale]/news/[slug]/page.tsx` (detail).
- `components/latest-posts.tsx`: homepage "latest" now spans both streams via `contentHref`.
- `app/sitemap.ts`: both streams + `/news` hub pages.
- i18n: added `header.news` + `news` block to types.ts / en.ts / zh.ts (ZH via translate 3-step).
- `components/header.tsx`: added "News" nav link.
- `scripts/seo/lib/mdx.mjs`: writes to `content/news/`; `listExistingSlugs` spans both streams.
- Created `content/news/` + `.gitkeep`.
- **First news article generated end-to-end** (keyword "AI agent use cases"):
  `content/news/2026-05-14-ai-agent-use-cases-{en,zh}.mdx` — EN canonical + ZH via translate
  3-step, brand-voice grounded, internal-linked to Issue #001.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `pnpm build` (1st attempt) | green | FAIL — `/news/[slug]` empty generateStaticParams rejected by `output: export` | FIXED |
| `pnpm build` (after first article) | green, 14 static pages | green; /en+/zh/news, /news/[slug] x2, /posts/[slug] x2 unchanged | PASS |

### Errors
| Error | Resolution |
|-------|------------|
| `output: export` rejects `/news/[slug]` when `generateStaticParams()` returns `[]` | Generated the first real news article so the route has ≥1 page; build green |

### Known minor follow-up
- Turbopack NFT warning: `next.config.ts` -> `lib/content.ts` (fs/path use) traced via sitemap.
  Non-blocking warning only; revisit if it ever breaks the export.

### Phase 0.5 complete; first proof article shipped.

---

## Session: 2026-05-14 (strategy upgrade — Jack's expert filter)

### What changed
Jack absorbed the YouTube pipeline through an expert filter and re-sequenced the whole plan.
`task_plan.md` rewritten; `findings.md` updated. Headline changes:
- **GEO is now first-class** alongside SEO — a second feed of prompts, answer-engine-extractable content.
- **Technical foundation promoted to Phase 1** (was Phase 3) — schema, hreflang, canonical/trailing-slash.
- **Publishing cadence REVISED** — from "fully automatic" to phased, review-gated first
  (weeks 1-2 all human-reviewed → weeks 3-6 1/day spot-check → then scale).
- New phase structure: 0, 0.5 ✅ · 1 Technical SEO+GEO foundation · 2 KB expansion · 3 Two feeds ·
  4 Content clusters + templates · 5 Generation · 6 Phased publishing · 7 Tracking (SEO+GEO) ·
  8 Daily SOP · 9 Syndicated feeds.

### Actions Taken
- Verified `app/robots.ts`: `userAgent: "*"` already allows all crawlers incl. GEO bots.
- Rewrote `task_plan.md` to the upgraded GEO+SEO plan with the expert filter as its spine.
- Updated `findings.md` with the strategy upgrade, the cadence revision, and Jack's cited references.
- Upgraded `scripts/seo/templates/default.md` to the fixed use-case structure
  (Answer Summary → who it's for → tool stack → cost → setup → full prompt → output sample →
  failure points → alternatives → FAQ → related links).
- Created `content/seo/brand-kb/editorial-standards.md` — the expert filter, written down.

### Daily SOP completed by Jack (the truncated message is now resolved)
7-item daily check: (1) schema gaps; (2) internal-link opportunities; (3) weak title/meta;
(4) pages missing from sitemap; (5) GEO brand mentions (ChatGPT/Perplexity/Gemini);
(6) competitor content (Zapier/n8n/Make); (7) which single article to write today.
→ Written into task_plan Phase 8; competitor monitoring also added to Phase 3; findings.md updated.
Phase 8 is the orchestration layer over Phases 1/3/5/7.

---

## Session: 2026-05-14 (Phase 1 — technical SEO + GEO foundation)

### Actions Taken
- `lib/schema.ts` (new) — JSON-LD builders: Organization/Person/WebSite graph + BlogPosting + BreadcrumbList.
- `components/json-ld.tsx` (new) — renders a JSON-LD `<script>` tag.
- `app/layout.tsx` — sitewide Organization/Person/WebSite graph in `<head>`.
- `app/[locale]/posts/[slug]/page.tsx` + `app/[locale]/news/[slug]/page.tsx` — added BlogPosting +
  BreadcrumbList JSON-LD, hreflang (en + zh-CN) alternates, trailing-slash canonical/url.
- `app/[locale]/page.tsx` + `app/[locale]/news/page.tsx` — trailing-slash canonical/alternates/url.
- `app/sitemap.ts` — all URLs now end with `/` (matches `trailingSlash: true`).
- `app/robots.ts` — explicit allow for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User,
  Google-Extended.
- `scripts/seo/audit.mjs` (new) — deterministic SEO/GEO audit; locale-aware title/excerpt
  thresholds; `--json` mode. `seo.config.json` audit block extended with `*Zh` thresholds.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `pnpm build` | green, 14 pages | green, 14 pages, Issue #001 URLs unchanged | PASS |
| JSON-LD in exported article HTML | BlogPosting + BreadcrumbList + sitewide graph | all present | PASS |
| JSON-LD on exported homepage | Organization + Person + WebSite | all present | PASS |
| canonical + hreflang in article HTML | trailing-slash, en + zh-CN | correct | PASS |
| sitemap.xml | trailing-slash URLs | correct | PASS |
| robots.txt | explicit GEO crawlers | correct | PASS |
| `audit.mjs` | runs, finds real issues | 0 errors, 8 warnings (locale-aware) | PASS |

### Errors / findings
| Item | Resolution |
|------|------------|
| audit.mjs used EN excerpt thresholds for ZH (false positive) | Made locale-aware; added `*Zh` config keys |
| Build emits `localhost:3000` URLs (`.env.local` dev value) | Pre-existing; flagged as Key Question #4 — set prod URL in Cloudflare build env; not changed unilaterally |
| Issue #001 (en+zh): over-long title/excerpt, 0 internal links | Jack's hand-written flagship — surfaced for Jack, not auto-edited |

### Phase 1 complete.

---

## Session: 2026-05-14 (traffic fixes — Jack: "whatever brings more traffic, just change it")

### Standing directive
Jack: "你看怎么能带来更多流量就改就完了" — bias to action on traffic-driving changes; stop over-asking.

### Actions Taken
- `.env.local`: `NEXT_PUBLIC_SITE_URL` → `https://realagentusecases.com` (was the dev localhost value).
- Issue #001 EN: title 71→50 chars (dropped "(Full Claude Prompt)"); excerpt 176→145 chars;
  added 1 internal link → the use-cases guide.
- Issue #001 ZH: title 58→36 chars ("用 Claude 搭的 Gmail agent：每天自动写好 to-do");
  excerpt 126→~87 chars; added 1 internal link → the use-cases guide.
- All trims preserved meaning + Jack's voice; only length cut.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `audit.mjs` | fewer warnings | 8 → 4 (only the harmless "1<2 internal links", expected with 2 articles) | PASS |
| `pnpm build` | green | green, 14 pages | PASS |
| prod URLs | `https://realagentusecases.com/...` | confirmed in sitemap.xml + canonical | PASS |

### Notes
- 4 remaining audit warnings are all "internal-links-low: 1 < 2" — naturally resolves as content
  grows; not forcing unnatural links (per editorial standards).

---

## Session: 2026-05-14 (Phase 3 — two feeds)

### Actions Taken
- `scripts/seo/feeds.mjs` (new) — deterministic feed CRUD: `addEntries` (dedupe), `listEntries`,
  `pickNext`, `markStatus`; module exports + CLI (`list` / `next` / `mark`).
- `content/seo/keywords.json` — populated: 20 keywords across 5 clusters (use-case / template /
  comparison / industry / tool-stack); "AI agent use cases" marked `used` (first article shipped).
- `content/seo/prompts.json` (new) — 13 GEO prompts (10 en, 3 zh); 3 marked `covered` by the
  use-cases guide.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `node --check feeds.mjs` | clean | clean | PASS |
| `feeds.mjs list keywords new` | 19 new entries | 19 listed | PASS |
| `feeds.mjs list prompts` | 13 entries, 3 covered | correct | PASS |
| `feeds.mjs next` | next new keyword + prompt | "real AI agent examples" + "What AI agents can automate daily work?" | PASS |

### Notes
- Feed infrastructure is complete. Routine-side steps (weekly re-ideation, competitor monitoring)
  are deferred to when the scheduled routine is formalized (Phase 6/8).

### Next: Phase 5 — write the next articles from the feed (default.md template; feeds.mjs `next`).

---

## Session: 2026-05-14 (Phase 2 — knowledge base connected to Notion)

### Actions Taken
- Authenticated the Notion MCP (Jack completed OAuth).
- Found Jack's KB page: "Real Agent Use Cases - SEO/GEO Knowledge Base"
  (id 3612a68c-2ce7-812e-a8e3-f406aec3ec99) — a complete, well-structured KB.
- Synced it into `content/seo/brand-kb/knowledge-base.md` (with a do-not-edit sync header).
- Removed `brand-voice.md` / `audience.md` / `editorial-standards.md` — the Notion KB is a strict
  superset; rewrote `brand-kb/README.md` to document Notion-as-source-of-truth.
- `seo.config.json`: added `knowledgeBase` block (Notion page id + syncedTo); updated seedKeywords
  (10, mirrors Notion) + competitors (7, adds Lindy / Relevance AI / OpenAI / Anthropic).
- `app/robots.ts`: crawler list now mirrors the KB's "AI Crawler Access" section — added GPTBot,
  ClaudeBot, Claude-SearchBot, Googlebot, Bingbot (10 explicit crawlers + `*`).
- `scripts/seo/templates/default.md`: section structure now mirrors the Notion Standard Article
  Template; generation prompt points at `knowledge-base.md` as source of truth.
- `content/seo/prompts.json`: +9 GEO prompts from the Notion KB feed (13 → 22).

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `seo.config.json` + `prompts.json` JSON valid | parse OK | parse OK | PASS |
| `feeds.mjs list prompts` | 22 entries | 22 listed | PASS |
| `pnpm build` | green | green, 14 pages | PASS |
| `out/robots.txt` | 1 `*` + 10 crawler rules | 11 User-Agent rules | PASS |

### Notes
- The Notion → repo re-sync is a Cowork-routine step (a deterministic Node script can't reach the
  MCP). To be formalized when the scheduled routine is built (Phase 6/8).

### Next: Phase 5 — write the next articles from the feed.

---

## Session: 2026-05-14 (Phase 4/5 — comparison template + 2nd article)

### Actions Taken
- `scripts/seo/templates/comparison.md` (new) — comparison-page template (Phase 4).
- Shipped article 2: `content/news/2026-05-14-claude-vs-zapier-gmail-automation-{en,zh}.mdx` —
  "Claude vs Zapier vs n8n: Building a Gmail AI Agent". Grounded entirely in Issue #001's real
  4-stack test table — no fabricated costs/outputs. Internal-linked to Issue #001.
- `feeds.mjs mark`: keyword "Claude vs Zapier for automation" → used; prompt "Is Claude or Zapier
  better for automating email?" → covered.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `audit.mjs` | new article clean | zh clean; en excerpt 161→trimmed to 153 | PASS |
| `pnpm build` | green | green (now 6 article files) | PASS |

### Key constraint surfaced
The content engine now outruns Jack's real-tested-agent inventory. The Notion KB forbids
fabricating builds/costs/outputs. Honest output right now = guides/frameworks + comparisons
grounded in Issue #001's real data. To scale further, the SEO pipeline needs more *real agents* —
which is exactly what the weekly interview pipeline produces. Logged in task_plan Phase 5.

### Next: more articles where honest (template page from Issue #001's real prompt; industry guides
as framework pieces), and/or wait for interview #002+ to supply new real agents.
