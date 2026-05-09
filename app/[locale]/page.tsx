import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { SubscribeButton } from "@/components/subscribe-button";
import { LatestPosts } from "@/components/latest-posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) return {};
  const t = getDict(locale as Locale).meta;
  return {
    title: { absolute: t.siteTitle },
    description: t.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "zh-CN": "/zh" },
    },
    openGraph: {
      title: t.siteTitle,
      description: t.siteDescription,
      url: `/${locale}`,
      type: "website",
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
  const t = getDict(typed).home;

  return (
    <>
      <Hero t={t} />
      <LatestPosts locale={typed} />
      <Divider />
      <About t={t} locale={typed} />
      <Divider />
      <FinalCta t={t} />
    </>
  );
}

type HomeDict = ReturnType<typeof getDict>["home"];

function Hero({ t }: { t: HomeDict }) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-muted-foreground) mb-6">
        {t.kicker}
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-balance">
        {t.h1}
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-(--color-muted-foreground) leading-relaxed text-balance max-w-2xl mx-auto">
        {t.subtitle}
      </p>

      <ul className="mt-10 mx-auto inline-flex flex-col gap-2 text-sm sm:text-[15px] text-(--color-muted-foreground) text-left">
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

      <div className="mt-10">
        <SubscribeButton size="lg">{t.cta}</SubscribeButton>
        <p className="mt-3 text-xs text-(--color-muted-foreground)">
          {t.finePrint}
        </p>
      </div>

      <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-foreground)/70">
        {t.socialProof(SITE_CONFIG.subscriberCount)}
      </p>
    </section>
  );
}

function About({ t, locale }: { t: HomeDict; locale: Locale }) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
        {t.about.heading}
      </h2>
      <div
        className={`space-y-5 text-[17px] sm:text-lg leading-[1.75] text-(--color-foreground)/90 ${
          locale === "en" ? "font-serif" : ""
        }`}
      >
        {t.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ t }: { t: HomeDict }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-28 text-center">
      <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
        {t.finalCta.lead}
      </p>
      <div className="mt-8">
        <SubscribeButton size="lg">{t.finalCta.cta}</SubscribeButton>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="border-t border-(--color-border)/60" />
    </div>
  );
}
