// scripts/seo/feeds.mjs
// Deterministic CRUD for the two content feeds (Layer 1 — no LLM):
//   content/seo/keywords.json  — SEO keyword feed
//   content/seo/prompts.json   — GEO prompt feed
//
// The scheduled Cowork routine ideates entries (the smart part) and calls
// these helpers to persist them safely — dedupe, status, timestamps.
//
// CLI:
//   node scripts/seo/feeds.mjs list keywords [status]
//   node scripts/seo/feeds.mjs list prompts  [status]
//   node scripts/seo/feeds.mjs next                       # next unused keyword + prompt
//   node scripts/seo/feeds.mjs mark keywords "<term>"   used
//   node scripts/seo/feeds.mjs mark prompts  "<prompt>" covered

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FILES = {
  keywords: path.join(ROOT, "content/seo/keywords.json"),
  prompts: path.join(ROOT, "content/seo/prompts.json"),
};
const LIST_KEY = { keywords: "keywords", prompts: "prompts" };
const DEDUPE_FIELD = { keywords: "term", prompts: "prompt" };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function norm(s) {
  return String(s).trim().toLowerCase();
}

export async function readFeed(kind) {
  return JSON.parse(await readFile(FILES[kind], "utf8"));
}

async function writeFeed(kind, doc) {
  doc.updatedAt = today();
  await writeFile(FILES[kind], JSON.stringify(doc, null, 2) + "\n", "utf8");
}

/** Append entries, deduped by term/prompt (case-insensitive). Returns count added. */
export async function addEntries(kind, entries) {
  const doc = await readFeed(kind);
  const list = doc[LIST_KEY[kind]];
  const field = DEDUPE_FIELD[kind];
  const seen = new Set(list.map((e) => norm(e[field])));
  let added = 0;
  for (const entry of entries) {
    const key = norm(entry[field]);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    list.push({ ...entry, addedAt: entry.addedAt ?? today() });
    added++;
  }
  await writeFeed(kind, doc);
  return added;
}

export async function listEntries(kind, status) {
  const doc = await readFeed(kind);
  const list = doc[LIST_KEY[kind]];
  return status ? list.filter((e) => e.status === status) : list;
}

/** First entry with status "new". */
export async function pickNext(kind) {
  const list = await listEntries(kind, "new");
  return list[0] ?? null;
}

/** Set the status of one entry, matched by term/prompt. Returns true if found. */
export async function markStatus(kind, key, status) {
  const doc = await readFeed(kind);
  const field = DEDUPE_FIELD[kind];
  let found = false;
  for (const e of doc[LIST_KEY[kind]]) {
    if (norm(e[field]) === norm(key)) {
      e.status = status;
      found = true;
    }
  }
  if (found) await writeFeed(kind, doc);
  return found;
}

// ---- CLI ----
async function cli() {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === "list") {
    const [kind, status] = args;
    if (!LIST_KEY[kind]) return usage();
    const list = await listEntries(kind, status);
    const field = DEDUPE_FIELD[kind];
    console.log(`\n${kind}${status ? ` (status: ${status})` : ""} — ${list.length} entries\n`);
    for (const e of list) {
      console.log(`  [${e.status}] ${e[field]}  (${e.cluster ?? "-"})`);
    }
    console.log();
  } else if (cmd === "next") {
    const k = await pickNext("keywords");
    const p = await pickNext("prompts");
    console.log("\nNext to write:");
    console.log("  keyword:", k ? `${k.term} (${k.cluster})` : "— none —");
    console.log("  prompt :", p ? `${p.prompt} (${p.cluster})` : "— none —");
    console.log();
  } else if (cmd === "mark") {
    const [kind, key, status] = args;
    if (!LIST_KEY[kind] || !key || !status) return usage();
    const ok = await markStatus(kind, key, status);
    console.log(ok ? `marked "${key}" → ${status}` : `not found: "${key}"`);
    if (!ok) process.exit(1);
  } else {
    usage();
  }
}

function usage() {
  console.log(
    'usage: feeds.mjs list <keywords|prompts> [status] | next | mark <kind> "<key>" <status>',
  );
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  cli();
}
