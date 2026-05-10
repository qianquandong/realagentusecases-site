// Post-build step: rewrite `<html lang>` for non-English locale directories.
//
// Why this exists:
// Next.js static export (`output: 'export'`) runs the root layout once for
// the whole site, so the `<html lang>` attribute is shared across every
// route. We need /zh/* pages to advertise `lang="zh-CN"` for SEO, screen
// readers, and Chrome's translate prompt. Building multiple root layouts
// would require route-group restructuring — overkill for two locales.
//
// Strategy: after `next build` writes out/, walk out/zh/** and patch the
// hardcoded `lang="en"` to `lang="zh-CN"`. Idempotent, ~30ms.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const LOCALE_REWRITES = [
  { dir: "out/zh", lang: "zh-CN" },
  // add more locales here if/when needed
];

async function walkHtml(dir, onFile) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkHtml(full, onFile);
    } else if (entry.name.endsWith(".html")) {
      await onFile(full);
    }
  }
}

let totalRewritten = 0;

for (const { dir, lang } of LOCALE_REWRITES) {
  await walkHtml(dir, async (filepath) => {
    const original = await readFile(filepath, "utf8");
    const updated = original.replace(
      /<html lang="en"/g,
      `<html lang="${lang}"`,
    );
    if (updated !== original) {
      await writeFile(filepath, updated);
      totalRewritten += 1;
    }
  });
}

console.log(`postbuild-lang: rewrote <html lang> in ${totalRewritten} files`);
