import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getAllContent, contentHref } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-static";

// Standalone HTML pages under public/ (agent-101, follow, dallas, …) are
// invisible to the Next router, so glob them in here. Bump this date when
// their content meaningfully changes — CI file mtimes are clone time, so
// they can't be used as lastModified.
const STATIC_PAGES_LASTMOD = new Date("2026-07-19");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com";

  const urls: MetadataRoute.Sitemap = [];

  // trailingSlash: true is set in next.config.ts — every URL ends with "/".
  // lastModified must reflect real content dates: stamping every URL with the
  // build date tells Google the whole site changed on every deploy, which
  // teaches it to distrust the sitemap.
  for (const locale of SITE_CONFIG.locales) {
    const items = await getAllContent(locale); // newest first
    const newest = items[0]?.frontmatter.date;
    const hubLastModified = newest ? new Date(newest) : new Date();

    urls.push({
      url: `${baseUrl}/${locale}/`,
      lastModified: hubLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    });
    urls.push({
      url: `${baseUrl}/${locale}/news/`,
      lastModified: hubLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const item of items) {
      urls.push({
        url: `${baseUrl}${contentHref(item.locale, item.type, item.slug)}/`,
        lastModified: new Date(item.frontmatter.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const publicDir = path.join(process.cwd(), "public");
  const entries = fs.readdirSync(publicDir, { recursive: true }) as string[];
  for (const entry of entries) {
    if (path.basename(entry) !== "index.html") continue;
    const rel = path.dirname(entry).split(path.sep).join("/");
    if (rel === ".") continue;
    urls.push({
      url: `${baseUrl}/${rel}/`,
      lastModified: STATIC_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return urls;
}
