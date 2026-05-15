// scripts/seo/lib/mdx.mjs
// Deterministic helper (Layer 1 — no LLM) for writing MDX post pairs.
// Frontmatter schema matches lib/content.ts: { title, date, excerpt? }.
// Filename convention (lib/content.ts parser): `{slug}-{en|zh}.mdx`.
//
// SEO auto-articles are written to content/news/ (the "news" content stream),
// kept separate from hand-written newsletter issues in content/posts/.

import { writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const NEWS_DIR = path.join(process.cwd(), "content/news");
const ISSUES_DIR = path.join(process.cwd(), "content/posts");
const LOCALES = ["en", "zh"];

/** Turn arbitrary text into a url-safe slug fragment. */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

/** Build a date-prefixed slug, e.g. buildSlug("2026-05-21", "AI agent for finance"). */
export function buildSlug(date, keyword) {
  return `${date}-${slugify(keyword)}`;
}

/** YAML-quote a scalar string for frontmatter. */
function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** Serialize { title, date, excerpt? } to a frontmatter block. */
export function serializeFrontmatter({ title, date, excerpt }) {
  const lines = ["---", `title: ${yamlQuote(title)}`, `date: ${yamlQuote(date)}`];
  if (excerpt) lines.push(`excerpt: ${yamlQuote(excerpt)}`);
  lines.push("---", "");
  return lines.join("\n");
}

/** Validate frontmatter against the minimal schema before writing. */
export function validateFrontmatter({ title, date, excerpt }) {
  const errors = [];
  if (!title || typeof title !== "string") errors.push("title is required");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("date must be YYYY-MM-DD");
  if (excerpt && typeof excerpt !== "string") errors.push("excerpt must be a string");
  return errors;
}

/** Write a single MDX post into content/news/. Returns the absolute path written. */
export async function writePost({ slug, locale, frontmatter, body }) {
  if (!LOCALES.includes(locale)) throw new Error(`unknown locale: ${locale}`);
  const errors = validateFrontmatter(frontmatter);
  if (errors.length) throw new Error(`invalid frontmatter: ${errors.join("; ")}`);
  if (!body || !body.trim()) throw new Error("body is empty");

  const filename = `${slug}-${locale}.mdx`;
  const filepath = path.join(NEWS_DIR, filename);
  const contents = serializeFrontmatter(frontmatter) + body.trim() + "\n";
  await writeFile(filepath, contents, "utf8");
  return filepath;
}

/** Write the EN + ZH pair for one post (both into content/news/). Returns both paths. */
export async function writePostPair({ slug, en, zh }) {
  const enPath = await writePost({ slug, locale: "en", ...en });
  const zhPath = await writePost({ slug, locale: "zh", ...zh });
  return { enPath, zhPath };
}

async function slugsInDir(dir) {
  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const slugs = new Set();
  for (const f of files) {
    const m = f.match(/^(.+)-(en|zh)\.mdx$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

/**
 * List existing slugs across BOTH content streams, deduped, for internal-link
 * decisions. Returns `{ slug, type }` where type is "issue" or "news".
 */
export async function listExistingSlugs() {
  const [issues, news] = await Promise.all([
    slugsInDir(ISSUES_DIR),
    slugsInDir(NEWS_DIR),
  ]);
  return [
    ...issues.map((slug) => ({ slug, type: "issue" })),
    ...news.map((slug) => ({ slug, type: "news" })),
  ].sort((a, b) => a.slug.localeCompare(b.slug));
}
