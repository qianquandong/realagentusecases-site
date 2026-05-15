import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getParamsByType, getPost } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { PostCta } from "@/components/post-cta";
import { YouTube } from "@/components/mdx/youtube";
import { JsonLd } from "@/components/json-ld";
import {
  articleSchema,
  breadcrumbSchema,
  extractFaq,
  faqPageSchema,
} from "@/lib/schema";

const mdxComponents = { YouTube };

type RouteParams = { locale: string; slug: string };

export async function generateStaticParams() {
  return await getParamsByType("news");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) return {};
  const post = await getPost(slug, locale as Locale, "news");
  if (!post) return {};
  const path = `/${locale}/news/${slug}/`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/news/${slug}/`,
        "zh-CN": `/zh/news/${slug}/`,
      },
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url: path,
      type: "article",
      publishedTime: post.frontmatter.date,
      siteName: "Real Agent Use Cases",
      images: ["/opengraph-image"],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
  };
}

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;
  const post = await getPost(slug, typed, "news");
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const dict = getDict(typed);
  const articlePath = `/${typed}/news/${slug}/`;
  const jsonLd: object[] = [
    articleSchema({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      path: articlePath,
      datePublished: post.frontmatter.date,
      locale: typed,
    }),
    breadcrumbSchema([
      { name: SITE_CONFIG.name, path: `/${typed}/` },
      { name: dict.header.news, path: `/${typed}/news/` },
      { name: post.frontmatter.title, path: articlePath },
    ]),
  ];
  const faqItems = extractFaq(post.body);
  if (faqItems.length > 0) jsonLd.push(faqPageSchema(faqItems));

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <article className="mx-auto max-w-[var(--container-prose)] px-6 pt-16 pb-24 sm:pt-24">
      <header className="mb-12 text-center">
        <time
          dateTime={post.frontmatter.date}
          className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-muted-foreground)"
        >
          {formatDate(post.frontmatter.date, typed)}
        </time>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] text-balance">
          {post.frontmatter.title}
        </h1>
      </header>

      <div className={`post-body ${typed === "en" ? "font-serif" : ""}`}>
        {content}
      </div>

      <PostCta locale={typed} />
      </article>
    </>
  );
}
