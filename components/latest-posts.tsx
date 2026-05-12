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

// Show LatestPosts whenever there's at least one post.
// (Previously held until 3 posts existed to avoid a thin section. Now that
// Issue #001 is real, surface it from the homepage so visitors have a path
// in beyond the form.)
const MIN_POSTS_TO_SHOW = 1;

export async function LatestPosts({ locale }: { locale: Locale }) {
  const all = await getAllPosts(locale);
  if (all.length < MIN_POSTS_TO_SHOW) return null;
  const posts = all.slice(0, 3);

  const t = getDict(locale).home.latestPosts;

  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-(--color-border)/40" />
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
