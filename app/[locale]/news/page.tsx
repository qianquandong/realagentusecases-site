import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, contentHref } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { formatContentDate } from "@/lib/date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) return {};
  const t = getDict(locale as Locale).news;
  return {
    title: t.heading,
    description: t.intro,
    alternates: {
      canonical: `/${locale}/news/`,
      languages: { en: "/en/news/", "zh-CN": "/zh/news/" },
    },
    openGraph: {
      title: t.heading,
      description: t.intro,
      url: `/${locale}/news/`,
      type: "website",
      siteName: "Real Agent Use Cases",
      images: ["/opengraph-image"],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;
  const t = getDict(typed).news;
  const items = await getAllContent(typed);

  return (
    <section className="mx-auto max-w-2xl px-6 pt-16 pb-24 sm:pt-24">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t.heading}
        </h1>
        <p className="mt-3 text-(--color-muted-foreground) leading-relaxed">
          {t.intro}
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-(--color-muted-foreground)">{t.empty}</p>
      ) : (
        <ul className="space-y-10">
          {items.map((post) => (
            <li key={`${post.type}-${post.slug}`}>
              <Link
                href={contentHref(post.locale, post.type, post.slug)}
                className="group block"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] rounded-full border border-(--color-border) px-2 py-0.5 text-(--color-muted-foreground)">
                    {post.type === "issue" ? t.tagIssue : t.tagGuide}
                  </span>
                  <time
                    dateTime={post.frontmatter.date}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground)"
                  >
                    {formatContentDate(post.frontmatter.date, typed)}
                  </time>
                </div>
                <h2 className="mt-2 text-xl sm:text-[22px] font-semibold tracking-tight leading-snug group-hover:text-(--color-brand) transition-colors text-balance">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.excerpt && (
                  <p className="mt-2 text-(--color-muted-foreground) leading-relaxed">
                    {post.frontmatter.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
