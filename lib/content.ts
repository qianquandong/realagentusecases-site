import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SITE_CONFIG, type Locale } from "@/lib/config";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
}

export interface PostMeta {
  slug: string;
  locale: Locale;
  frontmatter: PostFrontmatter;
  readingTime: { text: string; minutes: number };
}

export interface Post extends PostMeta {
  body: string;
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

async function readPostsDir(): Promise<string[]> {
  try {
    return await readdir(POSTS_DIR);
  } catch {
    return [];
  }
}

export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const filenames = await readPostsDir();
  const posts: PostMeta[] = [];
  for (const filename of filenames) {
    const parsed = parseFilename(filename);
    if (!parsed || parsed.locale !== locale) continue;
    const raw = await readFile(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    posts.push({
      slug: parsed.slug,
      locale: parsed.locale,
      frontmatter: data as PostFrontmatter,
      readingTime: readingTime(content),
    });
  }
  return posts.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export async function getPost(
  slug: string,
  locale: Locale,
): Promise<Post | null> {
  const filename = `${slug}-${locale}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);
  let raw: string;
  try {
    raw = await readFile(filepath, "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    frontmatter: data as PostFrontmatter,
    readingTime: readingTime(content),
    body: content,
  };
}

export async function getAllPostParams(): Promise<
  { slug: string; locale: Locale }[]
> {
  const filenames = await readPostsDir();
  const params: { slug: string; locale: Locale }[] = [];
  for (const filename of filenames) {
    const parsed = parseFilename(filename);
    if (parsed) params.push(parsed);
  }
  return params;
}
