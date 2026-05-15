import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/schema";
import "./globals.css";

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

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://realagentusecases.com",
  ),
  title: {
    default:
      "Real Agent Use Cases — How working professionals actually use AI",
    template: "%s · Real Agent Use Cases",
  },
  description:
    "Every week I record a conversation with a working professional about how they actually use AI agents. Podcast, YouTube, written breakdown — free.",
  openGraph: {
    type: "website",
    siteName: "Real Agent Use Cases",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Real Agent Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const easterEgg = `console.log("%cCurious what powers this site? It's just Next.js + my caffeine.\\nSubscribe so Jack can buy more coffee.", "color:#5fa37c;font-family:ui-monospace,monospace;font-size:12px;line-height:1.6");`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={siteGraph()} />
        <script dangerouslySetInnerHTML={{ __html: easterEgg }} />
        {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
          />
        )}
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
