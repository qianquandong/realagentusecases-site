import Link from "next/link";
import { getDict } from "@/lib/i18n";
import { SITE_CONFIG, type Locale } from "@/lib/config";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  XiaohongshuIcon,
} from "./social-icons";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const year = new Date().getFullYear();

  const navLink =
    "text-sm text-(--color-muted-foreground) hover:text-brand transition-colors";

  const socials = [
    { url: SITE_CONFIG.social.xiaohongshu, label: t.footer.socialLabels.xiaohongshu, Icon: XiaohongshuIcon },
    { url: SITE_CONFIG.social.twitter, label: t.footer.socialLabels.twitter, Icon: XIcon },
    { url: SITE_CONFIG.social.linkedin, label: t.footer.socialLabels.linkedin, Icon: LinkedinIcon },
    { url: SITE_CONFIG.social.github, label: t.footer.socialLabels.github, Icon: GithubIcon },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-(--color-border) mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3 md:items-center">
        <p className="text-sm text-(--color-muted-foreground) text-center md:text-left">
          {t.footer.copyright(year)} · {t.footer.builtIn}
        </p>

        <nav className="flex justify-center gap-5">
          <Link href={SITE_CONFIG.substackUrl} className={navLink}>
            {t.footer.nav.subscribe}
          </Link>
          <Link href={`/${locale}/about`} className={navLink}>
            {t.footer.nav.about}
          </Link>
          <Link href={`/${locale}/archive`} className={navLink}>
            {t.footer.nav.archive}
          </Link>
          <Link href={`/${locale}/events`} className={navLink}>
            {t.footer.nav.events}
          </Link>
        </nav>

        <div className="flex justify-center md:justify-end gap-4">
          {socials.length === 0 ? (
            <span className="text-xs text-(--color-muted-foreground)/60 italic">
              {locale === "zh" ? "社交链接待补" : "social links coming soon"}
            </span>
          ) : (
            socials.map(({ url, label, Icon }) => (
              <Link
                key={label}
                href={url}
                aria-label={label}
                className="text-(--color-muted-foreground) hover:text-brand transition-colors"
              >
                <Icon />
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        <p className="group text-center text-xs text-(--color-muted-foreground)/70 select-none">
          <span className="italic">{t.footer.tagline}</span>
          <span className="inline-block w-0 overflow-hidden align-middle opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100">
            {" "}☕
          </span>
        </p>
      </div>
    </footer>
  );
}
