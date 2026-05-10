import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/config";

function formatDate(dateStr: string, locale: Locale): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

// Hide the section until at least 3 real posts exist for this locale.
// A single welcome post on its own breaks the "sample interview" promise.
const MIN_POSTS_TO_SHOW = 3;

export async function LatestPosts({ locale }: { locale: Locale }) {
  const all = await getAllPosts(locale);
  if (all.length < MIN_POSTS_TO_SHOW) return null;
  const posts = all.slice(0, 3);

  const t = getDict(locale).home.latestPosts;

  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-(--color-border)/60" />
      </div>
      <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-10">
        {t.heading}
      </h2>
      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${locale}/posts/${post.slug}`}
              className="group block"
            >
              <time
                dateTime={post.frontmatter.date}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground)"
              >
                {formatDate(post.frontmatter.date, locale)}
              </time>
              <h3 className="mt-2 text-xl sm:text-[22px] font-semibold tracking-tight leading-snug group-hover:text-(--color-brand) transition-colors text-balance">
                {post.frontmatter.title}
              </h3>
              {post.frontmatter.excerpt && (
                <p className="mt-2 text-(--color-muted-foreground) leading-relaxed">
                  {post.frontmatter.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      </section>
    </>
  );
}
