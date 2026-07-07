# CLAUDE.md — realagentusecases-site

Funnel site for **Real Agent Use Cases** (Jack Qian's weekly interview series about AI agents professionals actually run). Single purpose: convert visitors to free subscribers. Full SOP: `docs/WORKFLOW.md`.

## Commands

```bash
pnpm dev                      # dev server
pnpm build                    # next build + postbuild-lang.mjs — MUST be green before commit
node scripts/seo/audit.mjs    # mechanical SEO checks (title/excerpt length, internal links)
node scripts/seo/feeds.mjs    # keyword/prompt feed CRUD (list / next / mark)
```

## Architecture crib

- Next.js 16 App Router, **static export** (`output: 'export'`) → Cloudflare Worker (`worker/index.ts`) serves `out/` with security headers. `git push origin main` = production deploy.
- Two content streams (`lib/content.ts`): `content/posts/` = hand-written interview issues (`/[locale]/posts/[slug]`), `content/news/` = guides & SEO articles (`/[locale]/news/[slug]`). Files are `<slug>-<en|zh>.mdx` pairs.
- Bilingual via two TS dicts (`lib/i18n/en.ts`, `zh.ts`). EN is canonical; ZH is translated from it. `scripts/postbuild-lang.mjs` patches `<html lang>` for `/zh/`.
- JSON-LD in `lib/schema.ts` (Organization/Person/WebSite sitewide; BlogPosting/Breadcrumb/FAQ per article — FAQ auto-extracted from a `## FAQ` section with `**Question**` lines).
- SEO config & feeds: `seo.config.json`, `content/seo/keywords.json` (SEO), `content/seo/prompts.json` (GEO), `content/seo/mentions.json` (LLM citation tracking).

## Content rules (hard gates — no exceptions)

These encode the site's "expert filter". A violation is a bug, not a style choice.

1. **Every factual claim needs a named, linked source.** The phrases "Research shows", "Data shows", "Studies show" (or any stat) without a specific linked source are BANNED. Never invent numbers, ROI math, or adoption claims. If a claim can't be sourced, cut it.
2. **Topics come only from** (a) a real interview / real agent Jack ran, or (b) an entry in `content/seo/keywords.json` / `prompts.json`. Add new topics to the feed first (with rationale) via `feeds.mjs`. Never generate occupation×news mashup articles — 22 pairs of those were deleted on 2026-07-06 for scaled-content risk. Do not recreate that pattern.
3. **Length limits** (enforced by `audit.mjs`, thresholds in `seo.config.json`): title ≤60 chars EN / ≤36 ZH; excerpt 110–160 chars EN / 50–100 ZH. Frontmatter keys: `title`, `date`, `excerpt`.
4. **Internal links:** every article body has ≥2 links to other pages on this site, and at least one existing page must link TO the new article (no orphans).
5. **Bilingual pairs:** never publish an EN article without its ZH pair (or vice versa) — hreflang asserts both exist.
6. **Cadence cap:** max 1 new article pair per day, published ONLY by the scheduled job `daily-seo-geo-realagentusecases` after all gates pass. Research comes first: gather 3+ real, linkable sources before writing; if the day's topic can't be honestly supported, SKIP the day and say so. Manual bulk generation stays banned. Circuit-breakers in `docs/WORKFLOW.md` §8.
7. **Pre-commit gate:** `node scripts/seo/audit.mjs` clean + `pnpm build` green. New evergreen pages get added to `public/llms.txt`. Used keywords get marked `used` in the feed.
