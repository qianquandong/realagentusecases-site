# Findings & Decisions — AI SEO Automation Pipeline

## Source material
- A YouTube tutorial transcript on automating SEO with AI (tool shown: "Arvo", ~$60/mo).
- Structured study notes produced at `xhs_Manager/seo-automation-guide.html` (14 sections).

## The video's pipeline (8 components)
1. Automated keyword/prompt research (a weekly-refreshing "feed")
2. Knowledge base of brand assets -> content in brand voice, not "AI slop"
3. Auto-generate content
4. Auto-publish to a CMS
5. AI agents fix technical SEO (titles, meta descriptions, canonicals, image alt, internal links, schema)
6. Track results (LLM mentions + sentiment, search rankings)
7. Bonus: syndicated feeds (YouTube channel feed, RSS/news feed)
8. Article templates (default + custom, e.g. comparison pages)

## Research Findings — jackqian-site repo facts (verified 2026-05-14)
- Next.js 16.2.6, static export, deployed Cloudflare Workers + Static Assets (`wrangler.jsonc`, `worker/`).
- Content = MDX files in `content/posts/`, NOT a CMS. -> Arvo's "connect CMS" step cannot apply.
- `lib/content.ts`: loads posts via `gray-matter`; `PostFrontmatter = { title, date, excerpt? }`.
- Filename parser: `/^(.+)-(en|zh)\.mdx$/` — slug + locale. Existing slug `2026-05-13-gmail-ai-agent`.
- `lib/config.ts`: `SITE_CONFIG` — locales `["en","zh"]`, defaultLocale `en`, domain realagentusecases.com.
- `lib/i18n/{en,zh}.ts`: site UI copy. `content/posts/*-{en,zh}.mdx`: bilingual article pairs.
- `app/[locale]/posts/[slug]/page.tsx`: renders posts. `app/sitemap.ts`, `app/robots.ts` exist.
- Build: `pnpm build` = `next build && node scripts/postbuild-lang.mjs`.
- Only 2 posts live today (Issue #001 en/zh) + 1 draft (`content/posts/_drafts/email-triage-agent.gs`).
- `.env.local` / `.env.example` hold only `NEXT_PUBLIC_SUBSCRIBE_FORM_URL` + `NEXT_PUBLIC_SITE_URL`.
  -> No LLM API key configured. Jack uses Claude.ai Pro (not API).

## Key blocker
- **Anthropic API key required.** Claude Pro ($20/mo) is not API access. Any unattended GitHub
  Actions run must authenticate to the Anthropic API (separate billing). This gates Phase 0.

## Deferred items in the repo this project can clear
- "Article JSON-LD schema (deferred P2 from frontend audit)" — Phase 3 will implement it.
- "Plausible / GA4 add-on (deferred until Day 30 review)" — out of scope; Phase 5 uses GSC instead.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Path A: build custom in repo, no Arvo/CMS | Site is git+MDX, not a CMS Arvo supports; fits stack + zero subscription |
| Fully automatic publishing | Jack's explicit choice |
| EN canonical, ZH translated from it | Matches CLAUDE.md rule + existing post pair convention |
| Embed translate skill's 3-step process in generation prompt | Automation can't invoke the skill; embed its method |
| Phase 5 monitoring starts Anthropic-only | Avoid 4 API keys + cost before the pipeline proves value |
| Planning files in isolated `.planning/` subfolder | Root planning files belong to the in-progress PRD project |

## Strategic note (raised with Jack, he chose full-auto anyway)
- The video targets e-commerce/local-business volume plays (1 post/day). realagentusecases.com is a
  credibility/thought-leadership play (north star: 200 email subs in 90 days). Mitigation baked into
  the plan: hard audit gate before publish + low frequency (1/week) + strong brand-kb grounding.

## Resources / open external dependencies (Jack's manual actions)
- Verify the Google Search Console property for realagentusecases.com (for ranking tracking).
- Pick cluster priority for the first templates (use-case / template / comparison / industry / tool-stack).

## Strategy upgrade — Jack's expert filter (2026-05-14)
Jack absorbed the YouTube pipeline but applied an expert filter and re-sequenced the plan. Core points:

1. **Expert filter (the spine):** keep automation-systems thinking; refuse blind bulk AI content
   that creates low-quality pages. Human review first, graduate to automation once quality is proven.
2. **GEO is first-class, not an afterthought.** Track the questions users ask ChatGPT/Perplexity/
   Gemini, not just Google keywords. Two feeds: SEO keyword feed + GEO prompt feed.
3. **Technical foundation goes FIRST.** Schema (Article/BlogPosting, Organization, Person,
   BreadcrumbList), hreflang, canonical + trailing-slash consistency — before scaling content.
4. **Knowledge base must enforce editorial standards.** Every post: real testing, cost, tool
   versions, failure points. Plus brand positioning, templates, full published articles, competitors.
5. **Content clusters, not generic blog posts.** Five page types: real use-case, prompt-template,
   comparison, industry, tool-stack.
6. **Fixed article structure** (Answer Summary, who it's for, tool stack, cost, setup steps, full
   prompt, output sample, common failure points, alternatives, FAQ, related internal links) — built
   for both Google ranking and LLM answer-extraction.
7. **Phased publishing cadence** — REVISES the earlier "fully automatic" decision:
   - Weeks 1-2: 3-5 posts/week, ALL human-reviewed.
   - Weeks 3-6: 1/day, fact + quality spot-checks.
   - After stable indexing/clicks/citations: scale (more templates, more languages).
8. **GEO crawlability** — don't block answer-engine crawlers. Current `robots.ts` uses
   `userAgent: "*"` (already permissive); Phase 1 makes OAI-SearchBot / ChatGPT-User /
   PerplexityBot / Google-Extended explicit and intentional.
9. **Daily automation SOP** (Jack's confirmed 7-item list) — each day the routine checks:
   (1) schema gaps; (2) internal-link opportunities; (3) weak title/meta; (4) pages missing from
   sitemap; (5) GEO brand mentions in ChatGPT/Perplexity/Gemini; (6) what competitors published;
   (7) which single article to write today. It's the orchestration layer over Phases 1/3/5/7 +
   competitor monitoring.

### References Jack cited
- Google — Article structured data guidance.
- Google — helpful-content / people-first content guidance (don't mass-generate to manipulate rank).
- OpenAI — ChatGPT search discovery requires allowing OAI-SearchBot.
- Perplexity — recommends allowing PerplexityBot.

### robots.ts current state (verified)
`app/robots.ts` returns `rules: [{ userAgent: "*", allow: "/" }]` + sitemap. All bots already
allowed; Phase 1 only makes the GEO crawlers explicit for intentionality + future control.

## Phase 1 findings (2026-05-14)
- `next.config.ts` has `trailingSlash: true` → every exported URL ends with `/`. Canonical,
  hreflang, and sitemap URLs were missing the slash → inconsistency. Fixed in Phase 1.
- **`.env.local` has `NEXT_PUBLIC_SITE_URL=http://localhost:3000`** (dev value). `.env*` is
  gitignored except `.env.example`. `next build` loads `.env.local`, so a build here emits
  `localhost:3000` canonical/sitemap/schema URLs. Pre-existing (sitemap.ts already had this),
  but Phase 1 widened the blast radius to canonical/hreflang/JSON-LD. `wrangler.jsonc` deploys
  `./out` — whoever produces the prod `out/` must build with `NEXT_PUBLIC_SITE_URL=
  https://realagentusecases.com`. Cleanest fix: set it in the Cloudflare build environment.
- Audit thresholds must be locale-aware: EN meta-description targets (110-160 chars) are wrong
  for ZH (denser). Added `titleMaxCharsZh`/`excerptMinCharsZh`/`excerptMaxCharsZh` to seo.config.
- Audit on current 4 files: 0 errors, 8 warnings. Issue #001 (en+zh) has over-long title +
  excerpt + 0 internal links — Jack's hand-written flagship, left for Jack to decide.
