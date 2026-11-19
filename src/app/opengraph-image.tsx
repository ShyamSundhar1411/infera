import { OG_SIZE, ogImage } from "@/lib/seo/og-image";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Infera: machine learning and statistics you can play with";

export default function Image() {
  return ogImage({
    eyebrow: "Interactive explainers",
    title: "Machine learning and statistics you can play with",
    tagline: "20 algorithms, 13 distributions and hands-on simulations, all running in your browser.",
    visual: { kind: "home" },
  });
}
