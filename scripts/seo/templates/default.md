# Template: default — real use-case page

The flagship cluster type: one real AI agent, documented end to end. Read by the scheduled Cowork
routine before writing a post. The section structure below mirrors the **Standard Article Template**
in the Notion knowledge base (`content/seo/brand-kb/knowledge-base.md`) — Notion is the source of
truth; if the two ever differ, Notion wins.

Other cluster templates (Phase 4): `template-page.md`, `comparison.md`, `industry.md`, `tool-stack.md`.

---

## Generation prompt

Use the Real Agent Use Cases Knowledge Base (`content/seo/brand-kb/knowledge-base.md`) as the
source of truth. Follow its brand positioning, tone of voice, content rules, article template,
GEO prompt strategy, internal-linking rules, technical-SEO checklist, and quality bar.

You are writing one real-use-case article targeting the keyword `{{KEYWORD}}` and the GEO prompts
`{{GEO_PROMPTS}}`.

Hard rules:
- Do not invent results, costs, screenshots, personal experience, or tool capabilities. If a claim
  cannot be verified, mark it for human review or leave a labelled placeholder.
- The article documents ONE real AI agent — multi-step, tool-using, triggered, repeatable output.
  Not prompt tips, not a tool roundup, not theory.
- Lead with a concrete scene or number. Concrete details over hype. No banned phrases (see KB).
- The reader must be able to copy and run it. Specifics over abstractions.
- EN is canonical. After the EN draft, translate to ZH with the `translate` skill's 3-step process
  (直译 → 问题识别 → 意译优化). Keep tech terms in original form.
- Frontmatter is exactly `{ title, date, excerpt }`. Title ≤ 60 chars EN / ≤ 36 ZH. Excerpt 110-160
  chars EN / 50-100 ZH — a real meta description, concrete, includes the keyword naturally.
- Internal links: when the topic touches Gmail / email / triage / daily planning, link to
  `/[locale]/posts/2026-05-13-gmail-ai-agent/` with natural anchor text (Gmail AI agent, Claude
  Gmail workflow, daily to-do list agent). Aim for 3 internal links once enough articles exist —
  one near the intro, one in setup, one in Related Workflows. Use `listExistingSlugs()` from
  `scripts/seo/lib/mdx.mjs` (spans issues + news).
- Write the pair with `writePostPair()` from `scripts/seo/lib/mdx.mjs` (→ `content/news/`).

GEO note: the **Answer Summary** must answer the target keyword/prompt in 3-5 self-contained
bullets — answer engines (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini) quote from the
top. The FAQ answers must also stand alone. Keep claims clear, specific, and citable.

## Section structure (EN body — mirrors the Notion Standard Article Template)

```
[Opening: 2-3 short paragraphs. A real scene or number. The problem this agent solves.]

## Answer Summary
[3-5 bullets. The direct answer — what the agent does, the stack in one line, headline numbers
 (setup time / monthly cost / time saved). Easy for answer engines to quote.]

## The Problem
[The real workflow pain, in plain language.]

## Who This Is For
[The exact users who would benefit. Honest about who it is NOT for.]

## What The Agent Does
[The agent's job in concrete terms — steps, tools it calls, trigger, output shape.]

## Tools Used
[Tool names, pricing, integrations, alternatives. A table works well.]

## Setup Time And Cost
[Expected setup time and real monthly cost, spelled out.]

## Step-By-Step Setup
[Numbered, copy-and-run. Each step concrete. Code/prompt blocks inline.]

## Full Prompt
[The complete reusable prompt(s) in a clean code block.]

## Example Output
[A real example of what the finished agent produces.]

## What Broke
[Honest failure points, limitations, bad outputs, missing context, security/privacy concerns.]

## How To Improve It
[Practical improvements — and what changed after testing.]

## FAQ
[5-8 natural-language questions matching how users ask LLMs and search engines. Each answer
 self-contained (a GEO extraction target).]

## Related Workflows
[Internal links to related Real Agent Use Cases articles, with descriptive anchor text.]

[Closing CTA: one real AI agent a week, straight to your inbox. Free, no upsell.]
```

Notes:
- H2 (`##`) for sections; H3 only when a section genuinely needs sub-parts.
- Tables, inline `code`, and code blocks wherever they help the reader.
- Images optional; every image needs descriptive alt text.
