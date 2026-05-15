// scripts/seo/audit.mjs
// Deterministic technical-SEO / GEO audit (Layer 1 — no LLM).
// Scans every MDX article in content/posts/ + content/news/ and reports:
//   - schema readiness  (frontmatter the JSON-LD needs: title, date, excerpt)
//   - weak title / meta (length + presence vs seo.config.json thresholds)
//   - image alt text    (images with empty alt in the MDX body)
//   - internal links    (count of in-site links vs the configured minimum)
//
// Usage:
//   node scripts/seo/audit.mjs           # human-readable report
//   node scripts/seo/audit.mjs --json    # machine-readable JSON (for the daily SOP)
//
// Exit code: 0 if no errors, 1 if any error-level issue found.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const STREAMS = [
  { type: "issue", dir: path.join(ROOT, "content/posts") },
  { type: "news", dir: path.join(ROOT, "content/news") },
];

async function loadConfig() {
  try {
    const raw = await readFile(path.join(ROOT, "seo.config.json"), "utf8");
    return JSON.parse(raw).audit ?? {};
  } catch {
    return {};
  }
}

function parseLocale(filename) {
  const m = filename.match(/^(.+)-(en|zh)\.mdx$/);
  return m ? { slug: m[1], locale: m[2] } : null;
}

// Markdown image: ![alt](src). Flag when alt is empty/whitespace.
function imagesWithoutAlt(body) {
  const out = [];
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    if (!m[1].trim()) out.push(m[2]);
  }
  return out;
}

// In-site links: [text](/en/...) or [text](/zh/...).
function internalLinkCount(body) {
  const re = /\]\((\/(?:en|zh)\/[^)]*)\)/g;
  let count = 0;
  while (re.exec(body) !== null) count++;
  return count;
}

async function auditFile(type, dir, filename, cfg) {
  const parsed = parseLocale(filename);
  if (!parsed) return null;
  const raw = await readFile(path.join(dir, filename), "utf8");
  const { data, content } = matter(raw);
  const issues = [];

  // Locale-aware thresholds — Chinese is denser, so its targets are lower.
  const isZh = parsed.locale === "zh";
  const titleMax =
    (isZh ? cfg.titleMaxCharsZh : cfg.titleMaxChars) ?? (isZh ? 36 : 60);
  const exMin =
    (isZh ? cfg.excerptMinCharsZh : cfg.excerptMinChars) ?? (isZh ? 50 : 110);
  const exMax =
    (isZh ? cfg.excerptMaxCharsZh : cfg.excerptMaxChars) ?? (isZh ? 100 : 160);
  const minLinks = cfg.internalLinksPerPost ?? 2;

  // Schema readiness + weak title/meta
  if (!data.title) {
    issues.push({ level: "error", code: "title-missing", msg: "frontmatter title is missing" });
  } else if (data.title.length > titleMax) {
    issues.push({
      level: "warn",
      code: "title-long",
      msg: `title is ${data.title.length} chars (max ${titleMax})`,
    });
  }

  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    issues.push({ level: "error", code: "date-invalid", msg: "frontmatter date missing or not YYYY-MM-DD" });
  }

  if (!data.excerpt) {
    issues.push({
      level: "error",
      code: "excerpt-missing",
      msg: "frontmatter excerpt is missing (no meta description / schema description)",
    });
  } else if (data.excerpt.length < exMin || data.excerpt.length > exMax) {
    issues.push({
      level: "warn",
      code: "excerpt-length",
      msg: `excerpt is ${data.excerpt.length} chars (target ${exMin}-${exMax})`,
    });
  }

  // Image alt text
  const noAlt = imagesWithoutAlt(content);
  for (const src of noAlt) {
    issues.push({ level: "warn", code: "image-no-alt", msg: `image missing alt text: ${src}` });
  }

  // Internal links
  const links = internalLinkCount(content);
  if (links < minLinks) {
    issues.push({
      level: "warn",
      code: "internal-links-low",
      msg: `${links} internal link(s); target at least ${minLinks}`,
    });
  }

  return { type, locale: parsed.locale, slug: parsed.slug, file: filename, issues };
}

async function run() {
  const json = process.argv.includes("--json");
  const cfg = await loadConfig();
  const results = [];

  for (const { type, dir } of STREAMS) {
    let files = [];
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const filename of files) {
      const r = await auditFile(type, dir, filename, cfg);
      if (r) results.push(r);
    }
  }

  const errors = results.reduce(
    (n, r) => n + r.issues.filter((i) => i.level === "error").length,
    0,
  );
  const warns = results.reduce(
    (n, r) => n + r.issues.filter((i) => i.level === "warn").length,
    0,
  );

  if (json) {
    console.log(JSON.stringify({ errors, warns, results }, null, 2));
  } else {
    console.log(`\nSEO/GEO audit — ${results.length} article files\n`);
    for (const r of results) {
      if (r.issues.length === 0) {
        console.log(`  ok   ${r.file}`);
        continue;
      }
      console.log(`  ${r.file}`);
      for (const i of r.issues) {
        const tag = i.level === "error" ? "ERR " : "warn";
        console.log(`    ${tag} [${i.code}] ${i.msg}`);
      }
    }
    console.log(`\n${errors} error(s), ${warns} warning(s)\n`);
  }

  process.exit(errors > 0 ? 1 : 0);
}

run();
