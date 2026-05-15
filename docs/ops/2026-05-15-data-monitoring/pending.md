# Pending — Data Monitoring Setup

## P0 — Cloudflare Web Analytics token

Without this: dashboard 3 (CF flow) only shows raw Workers request counts. With it: visitor behavior, referrer, country, device, dwell time — the real "who's visiting and from where" picture.

### Steps to finish

1. Open https://dash.cloudflare.com
2. Left sidebar → **Analytics & Logs → Web Analytics**
3. Click **"Add a site"**
4. Hostname: `realagentusecases.com`
5. Cloudflare returns a JS snippet like:
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "abc123..."}'></script>
   ```
6. Copy the **token string only** (the `abc123...` part inside the JSON)
7. Paste into `.env.local`:
   ```
   NEXT_PUBLIC_CF_BEACON_TOKEN=<paste-here>
   ```
8. Rebuild + redeploy:
   ```bash
   cd /Users/joseesp/jackqian-site
   pnpm build
   set -a && source .env.local && set +a && npx wrangler deploy
   ```
9. Verify the beacon is live:
   ```bash
   curl -s https://realagentusecases.com/en/ | grep beacon.min.js
   ```
   Should output the `<script>` tag with the token.

Data starts flowing 5–10 minutes after deploy. Visible at: dash.cloudflare.com → Analytics & Logs → Web Analytics → `realagentusecases.com`.

---

## P2 — Optional GSC email alerts

GSC will email when:
- New indexing errors appear
- Core Web Vitals drop
- A manual action is applied

Setup: GSC → Settings → Users and permissions → Email preferences.

Recommended: enable all three. They're rare but each is "drop everything and look" urgent.

---

## P3 — LLM citation tracking automation

Currently manual (daily SOP item 4). Future ideas if it becomes a bottleneck:

- Cron-trigger a Cowork routine that runs the 5 Perplexity prompts and appends results to a Notion DB
- Note: Perplexity has no official API for this; would need browser automation. Not worth building until the manual flow has clearly outgrown 5 min/day.
