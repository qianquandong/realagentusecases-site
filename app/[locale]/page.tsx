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
  const dict = getDict(typed);

  return (
    <>
      <Hero dict={dict} />
      <LatestPosts locale={typed} />
      <Divider />
      <About dict={dict} locale={typed} />
      <Divider />
      <FinalCta dict={dict} />
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
