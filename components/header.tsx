import Link from "next/link";
import { LanguageSwitch } from "./language-switch";
import { SubscribeButton } from "./subscribe-button";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/config";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link
          href={`/${locale}`}
          aria-label="Real Agent Use Cases"
          className="font-mono text-xs sm:text-sm tracking-tight whitespace-nowrap hover:text-(--color-brand) transition-colors"
        >
          <span className="sm:hidden">Real Agent</span>
          <span className="hidden sm:inline">Real Agent Use Cases</span>
        </Link>
        <nav className="flex items-center gap-3.5 sm:gap-6">
          <Link
            href={locale === "zh" ? "/agent-101/" : "/en/agent-101/"}
            className="text-[13px] sm:text-sm whitespace-nowrap text-(--color-muted-foreground) hover:text-(--color-brand) transition-colors"
          >
            Agent 101
          </Link>
          <Link
            href={`/${locale}/news`}
            className="text-[13px] sm:text-sm whitespace-nowrap text-(--color-muted-foreground) hover:text-(--color-brand) transition-colors"
          >
            {t.header.news}
          </Link>
          <LanguageSwitch locale={locale} />
          <SubscribeButton
            size="sm"
            href={`/${locale}/#subscribe`}
            className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
          >
            {t.header.subscribe}
          </SubscribeButton>
        </nav>
      </div>
    </header>
  );
}
