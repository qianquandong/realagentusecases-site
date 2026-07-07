import type { MetadataRoute } from "next";
import { getAllContent, contentHref } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-static";

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

  return urls;
}
