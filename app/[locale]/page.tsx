import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict, type Dict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { SubscribeForm } from "@/components/subscribe-form";
import { SubscribeButton } from "@/components/subscribe-button";
import { LatestPosts } from "@/components/latest-posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;  if (!SITE_CONFIG.locales.includes(locale as Locale)) return {};
  const t = getDict(locale as Locale).meta
  return {
    title: { absolute: t.siteTitle },
    description: t.siteDescription,
    alternates: {
      types: { "application/rss+xml": "/feed.xml" },
      canonical: `/${locale}/`,
      languages: { en: "/en/", "zh-CN": "/zh/", "x-default": "/en/" },
    },
    openGraph: {
      title: t.siteTitle,
      description: t.siteDescription,
      url: `/${locale}/`,
      type: "website",
      siteName: "Real Agent Use Cases",
      images: ["/opengraph-image"],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;
  const dict = getDict(typed);

  return (
    <>
      <Hero dict={dict} />
      <Featured locale={typed} />
      <LatestPosts locale={typed} />
      <Divider />
      <About dict={dict} locale={typed} />
      <Divider />
      <FinalCta dict={dict} />
    </>
  );
}

// Agent 101 series episodes. Add new entries to the top of this list as new episodes ship.
type Episode = {
  ep: string;
  date: string;
  href: string;
  title: string;
  excerpt: string;
};

const AGENT_101_EPISODES_ZH: ReadonlyArray<Episode> = [
  {
    ep: "02",
    date: "2026.05.17",
    href: "/agent-101/02-multi-agent/",
    title: "一个 Agent，干不完一件像样的事。",
    excerpt:
      "Multi-agent 与 Skills 不是两种新技术——是分工这个老问题的两种解法。单 Agent 的 4 个天花板、Skills 的轻量解、Multi-agent 的 4 种协作模式 + 6 个真实工作流。",
  },
  {
    ep: "01",
    date: "2026.03.17",
    href: "/agent-101/",
    title: "「Agent」这个词，在三种人嘴里是三件事。",
    excerpt:
      "90 分钟讲清楚 AI Agent 是什么、不是什么、四类职业怎么用、9 个真实工作流——不画饼的入门讲义。",
  },
];

const AGENT_101_EPISODES_EN: ReadonlyArray<Episode> = [
  {
    ep: "02",
    date: "2026.05.17",
    href: "/en/agent-101/02-multi-agent/",
    title: "One Agent can't finish anything worth shipping.",
    excerpt:
      "Skills and Multi-agent aren't two new technologies — they're two answers to the same old problem: division of labor. Single-agent has 4 ceilings, Skills compress instructions, Multi-agent compresses context, and 6 real workflows show how they combine.",
  },
  {
    ep: "01",
    date: "2026.03.17",
    href: "/en/agent-101/",
    title: "「Agent」 means three different things to three different people.",
    excerpt:
      "A 90-minute deep dive on what AI Agent actually is, what it isn't, how four professions use it, and 9 real workflows you can run today.",
  },
];

function Featured({ locale }: { locale: Locale }) {
  const episodes =
    locale === "zh" ? AGENT_101_EPISODES_ZH : AGENT_101_EPISODES_EN;
  const seriesLabel =
    locale === "zh"
      ? `系列入门 · 共 ${episodes.length} 期`
      : `Intro series · ${episodes.length} ${episodes.length === 1 ? "episode" : "episodes"
      }`;
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-(--color-border)/40" />
      </div>
      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <div className="flex items-baseline justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Agent 101
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground) shrink-0">
            {seriesLabel}
          </span>
        </div>
        <ul className="space-y-10">
          {episodes.map((episode) => (
            <li key={episode.ep}>
              <Link href={episode.href} className="group block">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-brand)">
                    EP {episode.ep}
                  </span>
                  <time className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground)">
                    {episode.date}
                  </time>
                </div>
                <h3 className="mt-2 text-xl sm:text-[22px] font-semibold tracking-tight leading-snug group-hover:text-(--color-brand) transition-colors text-balance">
                  {episode.title}
                </h3>
                <p className="mt-2 text-(--color-muted-foreground) leading-relaxed text-balance">
                  {episode.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Hero({ dict }: { dict: Dict }) {
  const t = dict.home;
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-28 sm:pt-24 sm:pb-36 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-muted-foreground) mb-6">
        {t.kicker}
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-balance">
        {t.h1}
      </h1>

      <p className="mt-5 text-lg sm:text-xl text-(--color-muted-foreground) leading-relaxed text-balance max-w-2xl mx-auto">
        {t.subtitle}
      </p>

      <ul className="mt-7 mx-auto inline-flex flex-col gap-2 text-sm sm:text-[15px] text-(--color-muted-foreground) text-left">
        {t.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.6em] block size-1 rounded-full bg-(--color-brand) shrink-0"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 scroll-mt-24" id="subscribe">
        <SubscribeForm
          size="lg"
          cta={t.cta.replace(/\s*→\s*$/, "")}
          placeholder={dict.email.placeholder}
          submitting={dict.email.submitting}
          finePrint={t.finePrint}
          successHeading={dict.email.successHeading}
          successBody={dict.email.successBody}
          errorMsg={dict.email.errorMsg}
        />
      </div>

      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground)/70">
        {t.socialProof(SITE_CONFIG.subscriberCount)}
      </p>
    </section>
  );
}

function About({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.home;
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
        {t.about.heading}
      </h2>
      <div
        className={`space-y-5 text-[17px] sm:text-lg leading-[1.75] text-(--color-foreground)/90 ${locale === "en" ? "font-serif" : ""
          }`}
      >
        {t.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/jack.html"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-(--color-brand) hover:bg-(--color-brand-hover) px-4 py-2 rounded-md transition-all duration-150 hover:-translate-y-px"
        >
          {locale === "zh" ? "关于主持人 →" : "Meet Jack →"}
        </Link>
      </div>
    </section>
  );
}

function FinalCta({ dict }: { dict: Dict }) {
  const t = dict.home;
  // Don't repeat the email field — that reads as redundant on a short page.
  // Repeat the promise + send the visitor back to the hero form anchor.
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-28 text-center">
      <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance mb-8">
        {t.finalCta.lead}
      </p>
      <SubscribeButton size="lg" href="#subscribe">
        {t.finalCta.cta}
      </SubscribeButton>
    </section>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="border-t border-(--color-border)/40" />
    </div>
  );
}
