import Link from "next/link";
import { LanguageSwitch } from "./language-switch";
import { SubscribeButton } from "./subscribe-button";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/config";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-mono text-xs sm:text-sm tracking-tight hover:text-(--color-brand) transition-colors"
        >
          Real Agent Use Cases
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6">
          <LanguageSwitch locale={locale} />
          <SubscribeButton size="sm">{t.header.subscribe}</SubscribeButton>
        </nav>
      </div>
    </header>
  );
}
