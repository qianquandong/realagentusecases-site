import type { Locale } from "@/lib/config";

export function formatContentDate(dateStr: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateStr}T00:00:00.000Z`));
}
