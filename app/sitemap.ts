import type { MetadataRoute } from "next";
import { getAllPostParams } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com";
  const posts = await getAllPostParams();

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of SITE_CONFIG.locales) {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  for (const { slug, locale } of posts) {
    urls.push({
      url: `${baseUrl}/${locale}/posts/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return urls;
}
