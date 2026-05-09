import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SITE_CONFIG, type Locale } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jack Qian — Field Reports on AI Agents",
    template: "%s · Jack Qian",
  },
  description:
    "Monthly breakdowns of real-world AI agent workflows for working professionals — by Jack Qian.",
};

const easterEgg = `console.log("%cCurious what powers this site? It's just Next.js + my caffeine.\\nSubscribe so I can buy more coffee → ${SITE_CONFIG.substackUrl}", "color:#1a3d2e;font-family:ui-monospace,monospace;font-size:12px;line-height:1.6");`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = (h.get("x-locale") ?? SITE_CONFIG.defaultLocale) as Locale;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: easterEgg }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
