import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_CONFIG, type Locale } from "@/lib/config";

export function generateStaticParams() {
  return SITE_CONFIG.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale)) {
    notFound();
  }
  const typed = locale as Locale;
  return (
    <>
      <Header locale={typed} />
      <main className="flex-1">{children}</main>
      <Footer locale={typed} />
    </>
  );
}
