import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/config";
import { SubscribeButton } from "./subscribe-button";

export function PostCta({ locale }: { locale: Locale }) {
  const t = getDict(locale).post;
  return (
    <aside
      className="mt-16 mx-auto max-w-[var(--container-prose)] rounded-xl border border-(--color-border) bg-(--color-muted)/40 px-6 py-8 sm:px-8 sm:py-10 text-center"
      aria-label="Subscribe call to action"
    >
      <p className="text-xl sm:text-2xl font-semibold tracking-tight">
        {t.ctaHeading}
      </p>
      <p className="mt-3 text-(--color-muted-foreground)">{t.ctaBody}</p>
      <div className="mt-6">
        <SubscribeButton size="lg">{t.ctaButton}</SubscribeButton>
      </div>
    </aside>
  );
}
