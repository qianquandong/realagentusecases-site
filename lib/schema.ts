import { SITE_CONFIG, type Locale } from "@/lib/config";

// JSON-LD structured data builders. Sitewide graph (Organization + Person +
// WebSite) goes in the root layout; per-article schema (BlogPosting +
// BreadcrumbList) goes on each article page.

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com"
).replace(/\/$/, "");

/** Resolve a site-relative path to an absolute URL. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

const PERSON_ID = `${SITE_URL}/#jack-qian`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_CONFIG.host,
    alternateName: "AI Man Jack",
    url: SITE_URL,
    jobTitle: "Business Planner",
    worksFor: { "@id": ORG_ID },
    description:
      "Business planner at Texas Instruments, based in Dallas. Host of Real Agent Use Cases and founder of AI Man Jack, which builds AI automation for Dallas small businesses.",
    // Entity association: same Jack Qian as on aimanjack.com
    sameAs: [
      "https://aimanjack.com/",
      "https://luma.com/user/usr-FlERJUF6Mcrie58",
      "https://www.facebook.com/profile.php?id=100084925451350",
      "https://x.com/JackQianAI",
      "https://github.com/qianquandong",
      "https://www.linkedin.com/in/quandong-qian-156563191/",
      "https://www.youtube.com/@JackBuildAI",
      "https://www.threads.com/@jack_qian616",
      "https://www.douyin.com/user/MS4wLjABAAAAxNXwx4UCCwS2FwyO-bsDHbuWziAo5mszf_EHC8qbxSI_hlNPcRl6nKO1v6aRFMxK",
    ],
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_CONFIG.name,
    url: SITE_URL,
    founder: { "@id": PERSON_ID },
    description:
      "A weekly newsletter, podcast, and YouTube series documenting the AI agents working professionals actually run at work.",
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_CONFIG.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: ["en", "zh-CN"],
  };
}

/** Combined sitewide graph — render once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), personSchema(), websiteSchema()],
  };
}

export interface ArticleSchemaInput {
  title: string;
  description?: string;
  /** Site-relative path, e.g. /en/news/my-slug/ */
  path: string;
  datePublished: string;
  locale: Locale;
}

/** BlogPosting schema for an article page. */
export function articleSchema({
  title,
  description,
  path,
  datePublished,
  locale,
}: ArticleSchemaInput) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    ...(description ? { description } : {}),
    url,
    datePublished,
    dateModified: datePublished,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path, e.g. /en/news/ */
  path: string;
}

/** BreadcrumbList schema. Pass items in order: Home → News → Article. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Extract FAQ Q/A pairs from an article body. Convention: a `## FAQ` section
 * with question lines wrapped in `**...**` followed by the answer paragraph
 * until the next blank-line + `**` or the next `## ` heading. Returns [] if
 * no FAQ section is found.
 */
export function extractFaq(body: string): FaqItem[] {
  // Match the FAQ section: from "## FAQ" or "## 常见问题" / "## FAQ" up to next H2 or end.
  const faqMatch = body.match(/##\s+(?:FAQ|常见问题)\b([\s\S]*?)(?=\n##\s|\n#\s[^#]|$)/i);
  if (!faqMatch) return [];
  const block = faqMatch[1];

  const items: FaqItem[] = [];
  // **Question?** followed by answer until next blank-line + ** or end of block.
  const re = /\*\*([^*\n]+?)\*\*\s*\n([\s\S]*?)(?=\n\s*\n\*\*|\n##|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const q = m[1].trim();
    const a = m[2].trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

/** FAQPage schema. Big GEO win — answer engines extract individual Q/A pairs. */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
