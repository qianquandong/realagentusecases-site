import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
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

function deferredThirdPartyScripts(): string {
  const snippets = [easterEgg];
  const cfToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (cfToken) {
    snippets.push(`const cfBeacon = document.createElement("script");
cfBeacon.defer = true;
cfBeacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
cfBeacon.setAttribute("data-cf-beacon", ${JSON.stringify(JSON.stringify({ token: cfToken }))});
document.head.appendChild(cfBeacon);`);
  }

  if (gaId) {
    snippets.push(`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", ${JSON.stringify(gaId)});
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = ${JSON.stringify(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)};
document.head.appendChild(gaScript);`);
  }

  return `window.addEventListener("load", () => {
  window.setTimeout(() => {
${snippets.join("\n")}
  }, 0);
});`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={siteGraph()} />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: deferredThirdPartyScripts(),
          }}
        />
      </body>
    </html>
  );
}
