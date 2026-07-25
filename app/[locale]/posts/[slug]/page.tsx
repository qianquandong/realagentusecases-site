import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllPostParams, getPost } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { formatContentDate } from "@/lib/date";
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
  return await getAllPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) return {};
  const post = await getPost(slug, locale as Locale);
  if (!post) return {};
  const path = `/${locale}/posts/${slug}/`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: {
      types: { "application/rss+xml": "/feed.xml" },
      canonical: path,
      languages: {
        en: `/en/posts/${slug}/`,
        "zh-CN": `/zh/posts/${slug}/`,
        "x-default": `/en/posts/${slug}/`,
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

export default async function PostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;
  const post = await getPost(slug, typed);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const dict = getDict(typed);
  const articlePath = `/${typed}/posts/${slug}/`;
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
          {formatContentDate(post.frontmatter.date, typed)}
        </time>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] text-balance">
          {post.frontmatter.title}
        </h1>
      </header>

      <div
        className={`post-body ${typed === "en" ? "font-serif" : ""}`}
      >
        {content}
      </div>

      <PostCta locale={typed} />
      </article>
    </>
  );
}
