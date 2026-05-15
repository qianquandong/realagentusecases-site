# scripts/seo — AI SEO Automation Pipeline

Replicates the YouTube AI-SEO tutorial natively in this repo. No external CMS, no Arvo, no
Anthropic API key. Planning lives in `.planning/2026-05-14-seo-automation-pipeline/`.

## Two-layer architecture

**Layer 1 — deterministic scripts (this folder, plain Node, no LLM).**
The boring, testable glue:
- `lib/mdx.mjs` — write an MDX post pair with valid frontmatter
- `keywords.mjs` — CRUD over `content/seo/keywords.json` (add/dedupe/list-unused/mark-used)
- `audit.mjs` — technical-SEO mechanical checks over all posts (Phase 3)
- `publish.mjs` — git add/commit/push; Cloudflare auto-deploys (Phase 4)
- `mentions.mjs` — append snapshots to `content/seo/mentions.json` (Phase 5)
- `report.mjs` — render the tracking dashboard (Phase 5)

**Layer 2 — scheduled Cowork routine (Claude itself, on a cron).**
The judgment work, defined via the `schedule` skill:
- keyword ideation from `seo.config.json` + `content/seo/brand-kb/`
- writing the EN article from `templates/default.md`
- translating to ZH via the `translate` skill
- internal-link decisions, LLM-mention sentiment analysis

The routine calls the Layer-1 scripts for anything deterministic. Scripts never call an LLM.

## Config
- `../../seo.config.json` — site, seed keywords, competitors, country, cadence, audit thresholds
- `../../content/seo/keywords.json` — the living keyword feed
- `../../content/seo/brand-kb/` — brand knowledge base (voice, audience, …)
- `templates/` — article templates (`default.md`, later `comparison.md`)

## Status
Phase 0 (foundation) in progress — see the planning folder.
