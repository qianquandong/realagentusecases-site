import type { MetadataRoute } from "next";
import { getAllContentParams, contentHref } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com";
  const items = await getAllContentParams();

  const urls: MetadataRoute.Sitemap = [];

  // trailingSlash: true is set in next.config.ts — every URL ends with "/".
  for (const locale of SITE_CONFIG.locales) {
    urls.push({
      url: `${baseUrl}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
    urls.push({
      url: `${baseUrl}/${locale}/news/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const { slug, locale, type } of items) {
    urls.push({
      url: `${baseUrl}${contentHref(locale, type, slug)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return urls;
}
