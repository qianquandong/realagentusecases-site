# Template: comparison page

Cluster type: comparing tools / stacks / approaches for one job. Captures competitor keywords
(e.g. "Claude vs Zapier"). Read by the scheduled Cowork routine. Source of truth is the Notion KB
(`content/seo/brand-kb/knowledge-base.md`) — follow its positioning, tone, content rules, and
quality bar.

---

## Generation prompt

You are writing one comparison article targeting the keyword `{{KEYWORD}}` and the GEO prompts
`{{GEO_PROMPTS}}`.

Hard rules (Notion KB Content Rules + Quality Bar):
- Compare ONLY options that have been genuinely tested or are backed by verifiable facts. Do not
  invent costs, setup times, pros/cons, or capabilities. If a number isn't verified, mark it for
  human review.
- Anchor the comparison in a real Real Agent Use Cases build wherever possible (e.g. Issue #001
  tested four stacks for the same Gmail agent — that table is first-hand data).
- Give a clear verdict. A comparison with no recommendation is useless.
- Concrete details over hype. No banned phrases (see KB). Lead with the real situation, not a thesis.
- EN is canonical. Translate to ZH via the `translate` skill's 3-step process. Keep tech terms in
  original form.
- Frontmatter exactly `{ title, date, excerpt }`. Title ≤ 60 EN / ≤ 36 ZH. Excerpt 110-160 EN /
  50-100 ZH, includes the keyword naturally.
- Internal links: link to the real build the comparison draws from, and to related articles.
- Write the pair with `writePostPair()` from `scripts/seo/lib/mdx.mjs` (→ `content/news/`).

GEO note: the **Answer Summary** must state the verdict in 3-5 self-contained bullets. The
comparison table and FAQ answers are answer-engine extraction targets — keep them clean and clear.

## Section structure (EN body)

```
[Opening: 2-3 short paragraphs. The real situation — who tested what, for which job.]

## Answer Summary
[3-5 bullets. The verdict: which option wins, for whom, and the one-line why.]

## What we're comparing
[The options and the exact job they were all measured against.]

## The comparison
[A real table: option | setup | monthly cost | best for | the catch. Then 1-2 sentences per row.]

## When to pick each one
[Decision guidance — the specific situation each option is the right call for.]

## What this means for you
[The practical takeaway: how to choose for your own situation.]

## FAQ
[5-8 natural-language questions, each answer self-contained.]

## Related Workflows
[Internal links — especially to the real build this comparison draws from.]

[Closing CTA: one real AI agent a week, straight to your inbox. Free, no upsell.]
```
