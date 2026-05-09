import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import { SubscribeButton } from "@/components/subscribe-button";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;
  const t = getDict(typed);

  return (
    <section className="mx-auto max-w-[var(--container-prose)] px-6 py-24 text-center space-y-6">
      <p className="font-mono text-xs uppercase tracking-widest text-(--color-muted-foreground)">
        Step 3 placeholder · {locale}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        {t.meta.siteTitle}
      </h1>
      <p className="text-(--color-muted-foreground)">
        {locale === "zh"
          ? "Header / Footer / 语言切换 / 中间件已就绪。真首页在步骤 4。"
          : "Header / footer / language switch / middleware are wired. Real homepage lands in step 4."}
      </p>
      <div className="pt-2">
        <SubscribeButton size="lg">
          {locale === "zh" ? "免费订阅 →" : "Subscribe — free →"}
        </SubscribeButton>
      </div>
    </section>
  );
}
