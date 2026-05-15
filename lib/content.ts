import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SITE_CONFIG, type Locale } from "@/lib/config";

// Two content streams, both rendered through the unified /news hub:
//   - "issue": hand-written newsletter issues          -> content/posts  -> /[locale]/posts/[slug]
//   - "news":  SEO auto-articles (pipeline-generated)   -> content/news   -> /[locale]/news/[slug]
export type ContentType = "issue" | "news";

const CONTENT_DIRS: Record<ContentType, string> = {
  issue: path.join(process.cwd(), "content/posts"),
  news: path.join(process.cwd(), "content/news"),
};

const ROUTE_SEGMENT: Record<ContentType, string> = {
  issue: "posts",
  news: "news",
};

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
}

export interface PostMeta {
  slug: string;
  locale: Locale;
  type: ContentType;
  frontmatter: PostFrontmatter;
  readingTime: { text: string; minutes: number };
}

export interface Post extends PostMeta {
  body: string;
}

/** Route href for a content item, e.g. /en/posts/slug or /zh/news/slug */
export function contentHref(
  locale: Locale,
  type: ContentType,
  slug: string,
): string {
  return `/${locale}/${ROUTE_SEGMENT[type]}/${slug}`;
}

function parseFilename(
  filename: string,
): { slug: string; locale: Locale } | null {
  const match = filename.match(/^(.+)-(en|zh)\.mdx$/);
  if (!match) return null;
  const locale = match[2] as Locale;
  if (!SITE_CONFIG.locales.includes(locale)) return null;
  return { slug: match[1], locale };
}

async function readContentDir(type: ContentType): Promise<string[]> {
  try {
    return await readdir(CONTENT_DIRS[type]);
  } catch {
    return [];
  }
}

async function readType(type: ContentType, locale: Locale): Promise<PostMeta[]> {
  const filenames = await readContentDir(type);
  const posts: PostMeta[] = [];
  for (const filename of filenames) {
    const parsed = parseFilename(filename);
    if (!parsed || parsed.locale !== locale) continue;
    const raw = await readFile(
      path.join(CONTENT_DIRS[type], filename),
      "utf8",
    );
    const { data, content } = matter(raw);
    posts.push({
      slug: parsed.slug,
      locale: parsed.locale,
      type,
      frontmatter: data as PostFrontmatter,
      readingTime: readingTime(content),
    });
  }
  return posts;
}

function byDateDesc(a: PostMeta, b: PostMeta): number {
  return b.frontmatter.date.localeCompare(a.frontmatter.date);
}

/** All content of one type, newest first. */
export async function getContentByType(
  type: ContentType,
  locale: Locale,
): Promise<PostMeta[]> {
  return (await readType(type, locale)).sort(byDateDesc);
}

/** Newsletter issues only (content/posts). Back-compat alias. */
export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  return getContentByType("issue", locale);
}

/** Every content item across both streams, newest first — powers /news + the homepage. */
export async function getAllContent(locale: Locale): Promise<PostMeta[]> {
  const [issues, news] = await Promise.all([
    readType("issue", locale),
    readType("news", locale),
  ]);
  return [...issues, ...news].sort(byDateDesc);
}

/** Load one item. If `type` is omitted, search issues first, then news. */
export async function getPost(
  slug: string,
  locale: Locale,
  type?: ContentType,
): Promise<Post | null> {
  const types: ContentType[] = type ? [type] : ["issue", "news"];
  for (const t of types) {
    const filepath = path.join(CONTENT_DIRS[t], `${slug}-${locale}.mdx`);
    let raw: string;
    try {
      raw = await readFile(filepath, "utf8");
    } catch {
      continue;
    }
    const { data, content } = matter(raw);
    return {
      slug,
      locale,
      type: t,
      frontmatter: data as PostFrontmatter,
      readingTime: readingTime(content),
      body: content,
    };
  }
  return null;
}

/** Static params for one type's detail route. */
export async function getParamsByType(
  type: ContentType,
): Promise<{ slug: string; locale: Locale }[]> {
  const filenames = await readContentDir(type);
  const params: { slug: string; locale: Locale }[] = [];
  for (const filename of filenames) {
    const parsed = parseFilename(filename);
    if (parsed) params.push(parsed);
  }
  return params;
}

/** Back-compat: params for the /posts/[slug] route (issues only). */
export async function getAllPostParams(): Promise<
  { slug: string; locale: Locale }[]
> {
  return getParamsByType("issue");
}

/** Every detail-route param across both streams — for the sitemap. */
export async function getAllContentParams(): Promise<
  { slug: string; locale: Locale; type: ContentType }[]
> {
  const out: { slug: string; locale: Locale; type: ContentType }[] = [];
  for (const type of ["issue", "news"] as ContentType[]) {
    for (const p of await getParamsByType(type)) {
      out.push({ ...p, type });
    }
  }
  return out;
}
