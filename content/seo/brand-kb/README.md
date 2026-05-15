# Brand Knowledge Base

The "knowledge base" from the SEO/GEO pipeline — the brand assets the content generator reads
before writing, so posts sound like Real Agent Use Cases and not generic AI slop.

## Source of truth: Notion

The knowledge base lives in **Notion** and is synced into this folder:

- Notion page: **Real Agent Use Cases - SEO/GEO Knowledge Base**
  (`https://www.notion.so/3612a68c2ce7812ea8e3f406aec3ec99`)
- Synced copy: **`knowledge-base.md`** in this folder — do NOT edit it directly.
- The Notion page ID is recorded in `seo.config.json` under `knowledgeBase`.

**To change the knowledge base, edit it in Notion.** The scheduled Cowork routine re-fetches the
Notion page (via the Notion MCP) and rewrites `knowledge-base.md` before each content run, so the
repo always mirrors Notion. A standalone Node script can't reach the MCP — the sync is a routine
step, not a deterministic script.

## What the routine reads
`knowledge-base.md` covers: brand positioning, core promise, target audience, tone of voice,
content rules, the standard article template, GEO prompt feed, SEO keyword seeds, content
clusters, internal-link rules, the technical-SEO checklist, AI-crawler access, competitors, the
automation SOP, and the quality bar.

## History
Earlier hand-written files (`brand-voice.md`, `audience.md`, `editorial-standards.md`) were
removed once the Notion KB landed — it is a strict superset of all three, and keeping duplicates
would drift. Notion is now the single source of truth.
