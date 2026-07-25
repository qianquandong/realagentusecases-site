import { getAllContent, contentHref } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";

// Static export: rendered once at build time into out/feed.xml.
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(): Promise<Response> {
  const base = `https://${SITE_CONFIG.domain}`;
  const items = (await getAllContent("en")).slice(0, 30);

  const rssItems = items
    .map((post) => {
      const link = `${base}${contentHref("en", post.type, post.slug)}/`;
      const description = post.frontmatter.excerpt
        ? `\n      <description>${esc(post.frontmatter.excerpt)}</description>`
        : "";
      return `    <item>
      <title>${esc(post.frontmatter.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${post.frontmatter.date}T00:00:00Z`).toUTCString()}</pubDate>${description}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_CONFIG.name)}</title>
    <link>${base}/en/</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>One real AI agent per week, from someone doing the work. Full setup published — prompts, tools, integrations. Free.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
