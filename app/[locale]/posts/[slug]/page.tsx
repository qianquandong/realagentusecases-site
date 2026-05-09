import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllPostParams, getPost } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { PostCta } from "@/components/post-cta";

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
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
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
    options: { parseFrontmatter: false },
  });

  return (
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

      <div
        className={`post-body ${typed === "en" ? "font-serif" : ""}`}
      >
        {content}
      </div>

      <PostCta locale={typed} />
    </article>
  );
}
