import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import SiteHeader from "./components/Layout/site-header";
import SiteFooter from "./components/Layout/site-footer";
import { THEME_SCRIPT } from "./components/Layout/theme-script";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import { AUTHOR } from "@/lib/data/author.data";
import { JsonLd, siteGraph } from "@/lib/seo/structured-data";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  // Link previews and canonical links need absolute addresses; this makes them so.
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: `${SITE_NAME}: ${SITE_TAGLINE.replace(/\.$/, "").toLowerCase()}`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: `${SITE_NAME}: ${SITE_TAGLINE.replace(/\.$/, "")}`,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: `${SITE_NAME}: ${SITE_TAGLINE.replace(/\.$/, "")}`, description: SITE_DESCRIPTION, creator: AUTHOR.twitter },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0e11" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd data={siteGraph()} />
      </head>
      <body className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
