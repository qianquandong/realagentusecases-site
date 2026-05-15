# Task Plan: AI SEO + GEO Automation Pipeline

## Goal

Replicate the YouTube AI-SEO pipeline natively in the `jackqian-site` repo (realagentusecases.com),
upgraded for **GEO** (Generative Engine Optimization) and run through an **expert filter**: keep the
automation-systems thinking, but never bulk-publish low-quality AI pages. Human review first, then
graduate to automation. Stack stays Next.js 16 + MDX + Cloudflare Workers — no CMS, no Arvo, no API key.

Path: **A — build custom in repo**. Engine: **scheduled Cowork routine** (Claude on a cron).
Publishing: **phased** — review-gated first, automated later (revised from "fully automatic").

## Architecture (two layers)
- **Deterministic scripts** (`scripts/seo/*.mjs`, plain Node, no LLM): MDX writing, feed CRUD,
  technical-SEO/GEO mechanical checks, git commit/push, build verify.
- **Scheduled Cowork routine** (Claude on a cron, via the `schedule` skill): keyword + GEO-prompt
  ideation, article writing, ZH translation via the `translate` skill, internal-link judgment,
  LLM-mention sentiment.

## SEO vs GEO — both tracked
- **SEO**: rank in Google/Bing for keywords. Feed = `content/seo/keywords.json`.
- **GEO**: get mentioned/cited by ChatGPT, Perplexity, Claude, Gemini for the questions users ask.
  Feed = `content/seo/prompts.json`. Content must be answer-engine-extractable: Answer Summary,
  FAQs, tables, explicit steps, clear claims.

## Current Phase

Phase 5 (bilingual content generation — write the next articles from the feed). Phases 0, 0.5, 1
complete; Phase 3 feed-infrastructure complete; Phases 2/4/5 partially done.

## Phases

### Phase 0: Foundation & Config — Status: complete
- [x] `scripts/seo/{lib,templates}`, `content/seo/brand-kb/`, `seo.config.json`, `content/seo/*.json`
- [x] `scripts/seo/lib/mdx.mjs` (smoke-tested), `scripts/seo/templates/default.md`, READMEs

### Phase 0.5: /news Section Architecture — Status: complete
- [x] `content/news/` stream; `lib/content.ts` two-stream rewrite; `/news` hub + `/news/[slug]` routes
- [x] homepage/sitemap/i18n/header updated; Issue #001 URLs unchanged; `pnpm build` green

### Phase 1: Technical SEO + GEO Foundation — Status: complete
- [x] JSON-LD schema: `lib/schema.ts` + `components/json-ld.tsx`; `BlogPosting` + `BreadcrumbList`
      on both article routes, `Organization` + `Person` (Jack) + `WebSite` sitewide in root layout
      (clears the old deferred P2 frontend-audit item) — verified in exported HTML
- [x] `hreflang` alternates added to both detail routes (en + zh-CN) — verified in exported HTML
- [x] Canonical + trailing-slash consistency: all canonical/alternate/sitemap URLs now end with `/`
      to match `trailingSlash: true` — verified in exported HTML + sitemap.xml
- [x] `robots.ts`: explicit allow for `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`,
      `Perplexity-User`, `Google-Extended` — verified in exported robots.txt
- [x] `scripts/seo/audit.mjs` — deterministic crawl: title length, excerpt/meta length, image alt
      text, internal links; locale-aware thresholds (EN vs ZH); `--json` mode; found 8 real warnings
- [x] `pnpm build` green (14 static pages); Issue #001 URLs unchanged

### Phase 2: Knowledge Base — Status: complete
- [x] KB source of truth = the Notion page "Real Agent Use Cases - SEO/GEO Knowledge Base"
      (id 3612a68c-2ce7-812e-a8e3-f406aec3ec99), connected via the Notion MCP
- [x] Synced into `content/seo/brand-kb/knowledge-base.md` (with a do-not-edit sync header)
- [x] Notion page ID recorded in `seo.config.json` → `knowledgeBase`
- [x] Removed hand-written `brand-voice.md` / `audience.md` / `editorial-standards.md` — the Notion
      KB is a strict superset; `brand-kb/README.md` rewritten to explain the setup
- [x] Repo reconciled to the Notion KB: `seo.config.json` seedKeywords + competitors,
      `app/robots.ts` crawler list, `scripts/seo/templates/default.md` structure,
      `content/seo/prompts.json` (+9 GEO prompts from the KB → 22 total)
- [ ] Re-sync is a scheduled-routine step (a Node script can't reach the MCP) — formalized in Phase 6/8

### Phase 3: Two Feeds — SEO Keywords + GEO Prompts — Status: in_progress
- [x] `scripts/seo/feeds.mjs` — deterministic CRUD (add/dedupe/listEntries/pickNext/markStatus);
      module + CLI (`list` / `next` / `mark`); syntax-checked + tested
- [x] `content/seo/prompts.json` created; `content/seo/keywords.json` populated — initial ideation
      by Cowork: 20 keywords across 5 clusters (1 used, 19 new), 13 GEO prompts (3 covered, 10 new)
- [ ] Formalize the routine's ideation step (re-runs weekly to grow the feeds)
- [ ] Competitor content monitoring (Zapier/n8n/Make blogs) → wired into the routine (Phase 6/8)

### Phase 4: Content Clusters + Upgraded Templates — Status: in_progress
- [x] `templates/default.md` — mirrors the Notion Standard Article Template
- [x] `templates/comparison.md` — comparison pages (used to ship the Claude vs Zapier article)
- [ ] `templates/template-page.md` — prompt-template pages
- [ ] `templates/industry.md` — industry pages (realtors / recruiters / founders …)
- [ ] `templates/tool-stack.md` — tool-stack roundup pages
- [ ] Routine selects template by cluster type per run

### Phase 5: Bilingual Content Generation — Status: in_progress
- [x] Article 1 shipped: `content/news/2026-05-14-ai-agent-use-cases-{en,zh}.mdx` (use-case guide)
- [x] Article 2 shipped: `content/news/2026-05-14-claude-vs-zapier-gmail-automation-{en,zh}.mdx`
      (comparison; grounded in Issue #001's real 4-stack test table — no fabricated data)
- [ ] Formalize the routine step: pick next unused keyword/prompt → generate via template +
      brand-kb → write pair via `scripts/seo/lib/mdx.mjs`
- [ ] CONSTRAINT: the content engine is now ahead of Jack's real-tested-agent inventory. The
      Notion KB forbids fabricating builds/costs/outputs, so honest output right now is limited to
      (a) guides/frameworks and (b) comparisons grounded in Issue #001's real data. Scaling beyond
      that needs more real agents — i.e. the weekly interview pipeline is the SEO pipeline's fuel.

### Phase 6: Phased Publishing Automation — Status: pending
- [ ] Stage A (weeks 1-2): 3-5 posts/week, ALL human-reviewed (drafts to `content/news/_drafts/`)
- [ ] Stage B (weeks 3-6): 1/day, fact + quality spot-checks
- [ ] Stage C (after stable indexing/clicks/citations): scale — more templates, more languages
- [ ] `scripts/seo/publish.mjs` — git add/commit/push; scheduled Cowork routine via `schedule` skill

### Phase 7: Effect Tracking — SEO + GEO — Status: pending
- [ ] LLM-mention tracking: ChatGPT, Perplexity, Claude, Gemini — mentioned/cited? sentiment?
      → `content/seo/mentions.json` time series
- [ ] Google Search Console pull (needs Jack to verify the GSC property)
- [ ] `scripts/seo/report.mjs` — dashboard: rankings + LLM citations over time

### Phase 8: Daily Automation SOP — Status: pending
The daily Cowork routine — the orchestration layer that ties together outputs of Phases 1, 3, 5, 7
plus competitor monitoring. Each day it checks (Jack's confirmed 7-item list):
- [ ] 1. Schema gaps — any page missing Article/Organization/Person/BreadcrumbList JSON-LD
- [ ] 2. Internal-link opportunities — posts that should link to / be linked from existing content
- [ ] 3. Weak titles / meta descriptions — length, keyword presence, click-through strength
- [ ] 4. Sitemap coverage gaps — published pages not in `sitemap.xml`
- [ ] 5. GEO brand mentions — does ChatGPT / Perplexity / Gemini mention or cite the brand today
- [ ] 6. Competitor content — what Zapier / n8n / Make blogs published recently
- [ ] 7. Today's article decision — pick the one keyword/GEO-prompt to write next, with the reason
- [ ] Output: a short daily report + queued actions (auto-fix safe items, surface the rest)

### Phase 9: Syndicated Feeds (bonus) — Status: pending
- [ ] YouTube channel feed → transcript → article; RSS/news feed → digest post

## Key Questions
1. Phase 7 — track all four LLMs (ChatGPT/Perplexity/Claude/Gemini) from the start, or stagger?
2. Is the GSC property already verified for realagentusecases.com?
3. Cluster priority for Phase 4/5 — which of the 5 page types to build templates for first?
   (Jack's standing directive: "whatever brings more traffic, just change it" — bias to action.)

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Path A: build custom in repo, no Arvo/CMS | Site is git+MDX; fits stack + zero subscription |
| Automation engine = scheduled Cowork routine | "Cowork is the automation script"; no API-key blocker |
| Two-layer architecture: dumb scripts + smart routine | Deterministic glue stays cheap/testable |
| EN canonical, ZH translated from it | CLAUDE.md rule + existing post pair convention |
| `/news` = unified hub; SEO articles + issues listed together, tagged | Jack's choice |
| SEO articles in `content/news/`; issues stay in `content/posts/` | Scripts never touch hand-written issues |
| News at `/news/[slug]`; issues stay `/posts/[slug]` (URLs unchanged) | Section URLs for SEO; don't break indexed Issue #001 |
| Competitors = automation-tool blogs (Zapier/n8n/Make) | They rank for the target how-to keywords |
| KB source of truth = the Notion page, synced into the repo (not hand-written repo files) | Jack maintains the KB in Notion; "知识库连上 notion". Repo mirrors Notion via a routine sync step |
| **GEO is first-class alongside SEO** — second feed of prompts, answer-engine-extractable content | Jack's expert filter: brand mentions in LLMs matter as much as Google rank |
| **Technical foundation FIRST** (was Phase 3 → now Phase 1) | Jack's expert filter: schema/hreflang/canonical before scaling content |
| **Publishing is phased, review-gated first** (REVISES the earlier "fully automatic" decision) | Jack's expert filter: avoid bulk low-quality AI pages; earn automation with proven quality |
| Fixed article structure (Answer Summary → … → FAQ → related links) | Better for both Google and LLM extraction |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `output: export` rejects `/news/[slug]` with empty `generateStaticParams()` | Shipped the first real news article; build green |
| `audit.mjs` flagged a ZH excerpt (68 chars) as too short — EN thresholds wrong for ZH | Made thresholds locale-aware; added `*Zh` keys to `seo.config.json` |
| Build emits `localhost:3000` URLs — `.env.local` has the dev `NEXT_PUBLIC_SITE_URL` | RESOLVED — Jack authorized the fix; `.env.local` set to `https://realagentusecases.com`; verified prod URLs in sitemap + canonical |
| Issue #001 (en+zh): over-long title/excerpt, 0 internal links | RESOLVED — Jack authorized; trimmed title/excerpt to SEO length (meaning + voice preserved), added 1 internal link each to the use-cases guide |

## Notes
- Frontmatter schema is minimal: `title`, `date`, `excerpt?` (lib/content.ts). Generation must match.
- `pnpm build` = `next build && node scripts/postbuild-lang.mjs` — must stay green after every phase.
- Expert filter (the spine of this plan): automation systems = yes; blind bulk AI content = no.
- References Jack cited: Google Article structured data; Google helpful-content guidance;
  OpenAI ChatGPT-search discovery (OAI-SearchBot); Perplexity crawler guidance (PerplexityBot).
