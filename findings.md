# Findings — Real Agent Use Cases PRD

## Project state (as of writing)

- Live site: https://realagentusecases.com
- GitHub repo: https://github.com/qianquandong/realagentusecases-site
- Domain: realagentusecases.com on Cloudflare Registrar + DNS + Workers + Static Assets
- Deployment: Next.js 16 static export served by a Cloudflare Worker
- Bilingual: /en/ and /zh/, locale auto-detected at /
- Subscribe: Formspree form endpoint `xkoypjdo`; emails captured into Jack's Gmail
- Issue #001 LIVE: `/en/posts/2026-05-13-gmail-ai-agent/` (and `/zh/...`) — Jack's Email→to-do agent walkthrough
- Analytics: Cloudflare Web Analytics enabled; GSC verified + sitemap submitted; Bing verified + sitemap submitted
- Social: drafts ready for 小红书 / X / LinkedIn — Jack has not yet published

## Audience (locked)

- ALL working professionals (no tech gating). Sales, HR, designers, lawyers, teachers, marketers, ops, finance, planning, journalism.
- Persona: 30-something IC/manager who has tried ChatGPT but feels they're "using 10% of it". Wants concrete agents to copy, not theory.
- Geography: bilingual EN/ZH. Primary: 北美华人. Secondary: 国内中产.
- Anti-audience: ML/AI engineers, C-suite who never touch tools themselves, hype-fed VC types.

## Product definition (locked)

- **Unit of content** = one AI agent (a running system), not a prompt.
- **Three formats per issue**: podcast (Xiaoyuzhou + Apple + Spotify via RSS), YouTube video, written breakdown (site + email).
- **Editorial commitment**: full setup published — prompts + tools + integrations + cron config.
- **Editorial must-have**: every issue includes a "what broke" section. No story = no issue.
- **Editorial length**: < 2000 EN words / < 3000 ZH characters per breakdown.
- **Cadence**: weekly, Wednesday US Central morning.
- **Pricing**: 100% free. No paid tier, no ads, no upsell — first 1000 subscribers.

## Constraints (from Jack)

- Time: 3 hours/day = ~21h/week
- 90-day subscriber target: 200
- Future monetization: TBD (likely course / community / 1-1 consulting), explicitly NOT newsletter paywall

## Decisions already executed in product

- Hero H1: "The AI agents working professionals run at work." / "职场人真正在用的 AI agent。"
- Subtitle widened beyond tech-adjacent professions
- About section restructured: problem → promise → brief host bio (not host-led)
- Final CTA: anchor button (not duplicate form) back to hero form
- LatestPosts surfaces Issue #001 from homepage (threshold lowered to ≥1)
- www → apex 301 redirect via Cloudflare Rules

## Content strategy already locked

- Issue #001: Jack's Email→to-do agent (Claude Pro + Gmail Connector). DONE.
- Issue #002 candidates: Jack's "15-minute website deploy" OR "Claude Code social media updater"
- Issue #003: the remaining Jack agent
- Issue #004 onwards: external guests — Jack must start sourcing now

## Distribution plan (drafted, awaits Jack publishing)

- **小红书** — primary acquisition for 国内中产 + 北美华人. Lifestyle/howto framing. Bio: realagentusecases.com.
- **X / Twitter** — primary for English builder audience. Thread format.
- **LinkedIn** — primary for older-career working professional segment.
- **朋友圈** — softer, personal; for inner circle activation.
- **Substack-import path** — defer until subscriber list grows; for now Formspree captures, Jack hand-sends.

## Metrics philosophy

- **North star** (lagging): real email subscribers (verified via Formspree dashboard)
- **Leading**: weekly issue ships on time, weekly guest sourced
- **Vanity ignored**: Workers requests, page views without engagement
- **Channel attribution**: track via UTM parameters on bio links

## Risks identified in conversation

1. **Jack's time** — 3h/day is a heavy commitment alongside day job
2. **Guest sourcing** — Issue #004 onwards requires real working pros willing to share full setup; not Jack's current network depth
3. **Content quality drift** — pressure to publish weekly may erode the "all prompts published in full" + "what broke" discipline
4. **China access** — Cloudflare network has limited mainland presence; could hurt domestic audience speed
5. **Formspree free tier ceiling** — 50 submissions/month; need migration plan before hitting it
6. **Original-content competition** — many AI tutorial newsletters; differentiation is the agent-not-prompt + working-professional angle, must stay sharp

## Open questions for Jack (will surface in Section 10)

1. First external guest (Issue #004) — who? Need a name by end of week.
2. Future monetization path — when do you decide? At 200 subs? 500? 1000?
3. Analytics: when to add Plausible / GA4 in addition to CF Web Analytics?
4. Issue #002 — which of remaining Jack agents (15-min site OR Claude Code social media updater)?
