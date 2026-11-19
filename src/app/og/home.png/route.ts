import { ogImage } from "@/lib/seo/og-image";

export const dynamic = "force-static";

/** The site-wide link preview, used by the home page and the section indexes. */
export function GET() {
  return ogImage({
    eyebrow: "Interactive explainers",
    title: "Machine learning and statistics you can play with",
    tagline: "20 algorithms, 13 distributions and hands-on simulations, all running in your browser.",
    visual: { kind: "home" },
  });
}
