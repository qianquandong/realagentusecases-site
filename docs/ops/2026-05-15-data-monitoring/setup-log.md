# Setup Log — 2026-05-15

This session set up the data-monitoring infrastructure that the daily SOP depends on.

## What was done

### 1. Verified production state
- `sitemap.xml`: 200, served via `app/sitemap.ts`
- `robots.txt`: 200, served via `app/robots.ts`
- Sitemap had 4 URLs in GSC vs 10 URLs locally — flagged production was behind.

### 2. Added analytics hooks to `app/layout.tsx`
Env-driven slots — no impact until env vars set:

```ts
verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
  : undefined,
```

```tsx
{process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
  />
)}
```

Added two placeholder env vars to `.env.local`:
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — empty, **not needed**: domain already verified in GSC via DNS (Domain property).
- `NEXT_PUBLIC_CF_BEACON_TOKEN` — empty, **pending** (see `pending.md`).

### 3. Shipped audit fixes that had been stuck uncommitted
Previous session's audit work (the 4th article + 4 SEO gap fixes + internal-link backfill) had never deployed. GSC was seeing a stale sitemap. Fixed:

- Commit `d55aaf4` — feat(seo): ship audit fixes + 4th article + analytics slots
- 16 files changed, 533 insertions
- Pushed to `origin/main`
- Wrangler deploy: version `421c3494-de2b-483e-9afe-e7abb4f1d37f`

### 4. Found and fixed a security-headers leak
After the deploy, security headers (HSTS, nosniff, Referrer-Policy, Permissions-Policy) were still **missing** on all responses. Verified with `curl -sI`.

**Root cause**: Cloudflare Workers + Static Assets default behavior — if an asset path matches a file in `./out`, the assets layer serves it directly and the Worker `fetch` handler **never runs**. So `withSecurityHeaders` was wrapping nothing.

**Fix**: added `"run_worker_first": true` to `wrangler.jsonc`'s `assets` block:

```jsonc
"assets": {
  "directory": "./out",
  "binding": "ASSETS",
  "not_found_handling": "404-page",
  "run_worker_first": true
}
```

Re-deployed: version `05c26e11-8b47-477a-a199-bf62945b566f`. Headers now present on all article pages.

**Trade-off accepted**: every request now invokes the Worker (vs pure CDN serve). For a low-traffic blog this is negligible; the security/SEO benefit is worth it.

### 5. Verified everything live (post-fix)

| Check | Result |
|---|---|
| 4th article (`/en/news/.../claude-system-prompt-email-triage/`) | 200 (en + zh) |
| Sitemap URL count | 4 → 12 |
| HSTS header | ✅ `max-age=31536000; includeSubDomains; preload` |
| X-Content-Type-Options | ✅ `nosniff` |
| Referrer-Policy | ✅ `strict-origin-when-cross-origin` |
| Permissions-Policy | ✅ `camera=(), microphone=(), geolocation=(), payment=()` |
| FAQPage schema on comparison article | ✅ present |
| og:image on 4th article | ✅ `/opengraph-image` |

### 6. GSC sitemap resubmitted
- Submitted May 14, Last read May 14
- Status: Success
- Discovered pages: **12** ✅

---

## Files touched in this session

- `app/layout.tsx` — added `verification` slot + CF beacon `<script>` slot
- `wrangler.jsonc` — `run_worker_first: true`
- `.env.local` — added two placeholder env vars (gitignored; not committed)
- `docs/ops/2026-05-15-data-monitoring/*` — this folder (this session)

Plus everything in commit `d55aaf4` (the previous-session SEO audit work that finally shipped).

---

## Decisions logged

1. **GSC: skipped HTML-tag verification** — the property `realagentusecases.com` was already verified as a Domain property (DNS). HTML-tag method would have been a parallel verification, unnecessary.

2. **`run_worker_first: true`** — accepted the per-request Worker invocation cost in exchange for guaranteed security-header application across all asset paths.

3. **No GA4** — chose Cloudflare Web Analytics over Google Analytics 4. Reasons: privacy-friendly (no cookies, no consent banner), simpler setup (one beacon line), no third-party JS bloat, sufficient for the metrics we actually need at this stage.
