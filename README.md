# Real Agent Use Cases

The funnel site for **Real Agent Use Cases** — Jack Qian's weekly interview series with working professionals about how they actually use AI agents.
**Single purpose of this site:** convert visitors to free subscribers (Substack).

If you're reading this, this is *not* the newsletter / podcast / video — it's the doormat.

Hosted at: [realagentusecases.com](https://realagentusecases.com)
Each interview ships in three formats: written breakdown (here + email), audio podcast (Xiaoyuzhou), and video (YouTube).

---

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-based config in `app/globals.css`)
- MDX articles via `next-mdx-remote` + `gray-matter`
- Geist Sans / Mono + Source Serif 4 (via `next/font`)
- Bilingual (English + Chinese) — no i18n library, just two TS dictionaries

---

## Quick start

```bash
pnpm install
cp .env.example .env.local       # fill the placeholders
pnpm dev                         # http://localhost:3000
pnpm build                       # production build
```

---

## Where things live

```
app/
  layout.tsx                    # root layout, fonts, og defaults, console easter egg
  globals.css                   # theme tokens (@theme), .post-body styles
  [locale]/
    layout.tsx                  # wraps locale pages with Header + Footer
    page.tsx                    # homepage: Hero / About / Final CTA
    posts/[slug]/page.tsx       # single article page (MDX)
  subscribe/route.ts            # GET → 308 redirect to NEXT_PUBLIC_SUBSTACK_URL
  sitemap.ts                    # dynamic sitemap.xml from posts
  robots.ts                     # robots.txt
  opengraph-image.tsx           # 1200×630 OG card (dynamic, branded)
proxy.ts                        # Next 16 successor to middleware — locale routing
content/posts/                  # *-en.mdx + *-zh.mdx pairs (drop new posts here)
components/                     # Header, Footer, SubscribeButton, PostCta, etc.
lib/
  config.ts                     # Substack URL, locales, subscriber count
  content.ts                    # MDX file reader + frontmatter parser
  i18n/                         # en.ts, zh.ts, types.ts
```

---

## Writing a new post

Posts are MDX files in `content/posts/`. Each issue has **two files** — one per locale:

```
content/posts/
  2026-05-13-welcome-en.mdx
  2026-05-13-welcome-zh.mdx
```

Filename format: `<slug>-<en|zh>.mdx`. The `<slug>` is what shows in the URL — keep it lowercase, dash-separated.

Frontmatter for each file:

```mdx
---
title: "Welcome — Real Agent Use Cases starts here"
date: "2026-05-13"
excerpt: "One-sentence summary used in og:description and meta description."
---

Body in MDX — markdown plus React components if you want them.
```

**You don't need to ship both languages at once.** If only `*-en.mdx` exists, the post shows on `/en/posts/<slug>` but not on `/zh/...` (404 there). Add the matching `-zh.mdx` later.

The post page renders body text in **Source Serif 4** for English, system Chinese sans for Chinese.

### Embedding YouTube

Inside any MDX file you can drop the YouTube interview right into the body:

```mdx
<YouTube id="dQw4w9WgXcQ" title="Interview with [Name] — How they actually use AI for FP&A" />
```

The `id` is the YouTube video ID (the part after `v=` in the URL). Renders as a 16:9 lazy-loaded `youtube-nocookie` iframe.

To add a podcast embed (Xiaoyuzhou / Spotify / Apple) later, add a similar component under `components/mdx/` and re-export it from the MDX components map in `app/[locale]/posts/[slug]/page.tsx`.

---

## Editing site copy

Hero / About / final CTA copy lives in `lib/i18n/en.ts` and `lib/i18n/zh.ts`. Change strings there — both files share the same `Dict` shape from `lib/i18n/types.ts`.

Subscriber count placeholder: `lib/config.ts` → `subscriberCount`. Update it manually each milestone (every 100 readers, say). The hero social-proof line auto-switches between "Be among the first readers" (when 0) and "Joined by N readers" (when > 0).

---

## Environment

`.env.local` (local dev, not committed) and Cloudflare Pages env vars (production):

| Var | Where it's used | What |
|---|---|---|
| `NEXT_PUBLIC_SUBSTACK_URL` | Build (Subscribe buttons) + runtime function (`/subscribe` redirect) | Real Substack subscribe URL |
| `NEXT_PUBLIC_SITE_URL` | Build (sitemap, og:url, metadata) | Canonical site URL (e.g. `https://realagentusecases.com`) |

---

## Deploying to Cloudflare Pages

This site is a **static export** (`output: 'export'` in next.config.ts) plus **two Cloudflare Pages Functions** in `functions/`:

- `functions/_middleware.ts` — root path locale redirect (Accept-Language → `/en` or `/zh`)
- `functions/subscribe.ts` — `/subscribe` → 308 to Substack

### One-time setup

1. **Push to GitHub** (this repo is already on GitHub).

2. **Cloudflare Pages → Create project → Connect to Git**
   - Pick `realagentusecases-site`
   - Production branch: `main`

3. **Build settings**:
   - Framework preset: **Next.js (Static HTML Export)** — or "None" + manual config below
   - Build command: `pnpm build`
   - Build output directory: `out`
   - Root directory: leave empty
   - Node version: `20` or higher

4. **Environment variables** (under "Settings → Environment variables"):
   - `NEXT_PUBLIC_SUBSTACK_URL` = your real Substack subscribe URL
   - `NEXT_PUBLIC_SITE_URL` = `https://realagentusecases.com`

5. **First deploy.** Build ~60-90s. You'll get a `*.pages.dev` URL.

### Custom domain

6. Cloudflare Pages dashboard → **Custom domains** → Add `realagentusecases.com`
   - Since the domain was bought through Cloudflare Registrar, DNS records are added automatically. No manual config needed.
   - SSL provisions in ~1 minute.

### Verify after deploy

- `curl -I https://realagentusecases.com/subscribe` → `308` + `Location: <substack url>`
- `https://realagentusecases.com/sitemap.xml` lists every page
- `https://realagentusecases.com/opengraph-image` returns a PNG
- Hit `/` from a Chinese-locale browser → redirects to `/zh/`; from English → `/en/`
- Open in iPhone Safari, Android Chrome, desktop Chrome

### Future deploys

Every `git push origin main` triggers a new Cloudflare Pages build automatically. Preview deploys for branches and PRs come for free.

---

## Notes

- **Dark theme by default.** Light mode wasn't built — there's a `color-scheme: dark` declaration in `globals.css`. If you want both, you'd add a `[data-theme]` toggle and duplicate the theme tokens.
- **No analytics installed.** Add Plausible or Vercel Analytics post-launch, after the first 100 subscribers, when there's actually data to look at.
- **No tests, no Storybook, no monorepo.** This is a 4-page funnel; complexity should match.
- **Console easter egg** — open DevTools on any page, you'll see a hello message in `--color-brand`-ish green.
- **Footer easter egg** — hover the small italic line at the very bottom. Slowly.

---

## License

Personal project. Not open-sourced.
