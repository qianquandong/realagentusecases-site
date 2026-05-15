# Template: prompt-template page

Cluster type: a single, copy-and-customize prompt page. The reader's intent is "give me the
prompt." Different from the use-case page (full agent narrative) and the comparison page (stack
decision). Source of truth is the Notion KB (`content/seo/brand-kb/knowledge-base.md`).

---

## Generation prompt

You are writing one prompt-template page targeting the keyword `{{KEYWORD}}` and the GEO prompts
`{{GEO_PROMPTS}}`.

Hard rules (Notion KB Content Rules + Quality Bar):
- The prompt MUST be a real, tested prompt — extracted from a real Real Agent Use Cases build.
  Do not invent prompts. If the prompt isn't backed by a real run, don't ship the page.
- The prompt itself is the centerpiece. Surface it clearly and early. Make it copy-friendly.
- Customization guidance is non-optional — every bracketed section in the prompt must be
  explained.
- Honest failure modes — list the real things that broke for the original author.
- Concrete details over hype. No banned phrases (see KB).
- EN is canonical. Translate to ZH via the `translate` skill's 3-step process. Keep tech terms
  (prompt, system prompt, P0/P1/P2, role names, tool names) in original form.
- Frontmatter exactly `{ title, date, excerpt }`. Title ≤ 60 EN / ≤ 36 ZH. Excerpt 110-160 EN /
  50-100 ZH, includes the keyword naturally.
- Internal links: link back to the full build the prompt comes from (the real source). Use
  natural anchor text.
- Write the pair with `writePostPair()` from `scripts/seo/lib/mdx.mjs` (→ `content/news/`).

GEO note: the **Answer Summary** must state what the prompt does + where it runs + headline
numbers in 3-5 bullets — answer engines quote from the top. The FAQ answers must stand alone.

## Section structure (EN body)

```
[Opening: 2-3 short paragraphs. Who runs this prompt, for what job. The one-sentence promise.]

## Answer Summary
[3-5 bullets. What the prompt does, where it runs, cost, the headline output.]

## What this prompt does
[Concrete output. Bullets or a tiny sample.]

## Who it's for
[The exact role/situation. Honest about who it is NOT for.]

## The full prompt
[The prompt verbatim, in a clean code block, ready to copy.]

## How to customize it
[Walk through each `[bracketed]` section in the prompt. Concrete example swaps.]

## Example output
[A real sample of what the prompt produces. Trim if long, but real.]

## Tools and cost
[The stack the prompt runs on, the real monthly cost, any free-tier limits.]

## Common failure modes
[Honest list — what breaks, why, the fix that worked.]

## FAQ
[5-8 natural-language questions, each answer self-contained.]

## Related Workflows
[Internal links — especially to the full build the prompt was extracted from.]

[Closing CTA: one real AI agent a week, straight to your inbox. Free, no upsell.]
```
