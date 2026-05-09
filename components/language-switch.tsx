"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/config";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target: Locale = locale === "en" ? "zh" : "en";
  const newPath = pathname.replace(/^\/(en|zh)/, `/${target}`) || `/${target}`;
  const label = target === "zh" ? "中" : "EN";
  const aria =
    target === "zh" ? "切换到中文" : "Switch to English";

  return (
    <Link
      href={newPath}
      aria-label={aria}
      className="text-sm font-mono tracking-tight text-(--color-muted-foreground) hover:text-(--color-brand) transition-colors"
    >
      {label}
    </Link>
  );
}
