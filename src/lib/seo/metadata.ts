import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { AUTHOR } from "@/lib/data/author.data";
import { OG_SIZE } from "./og-image";

/** Where a page's link preview image lives: /og/<section>/<slug>.png, or the site-wide one. */
export const ogImagePath = (section?: string, slug?: string) => (section && slug ? `/og/${section}/${slug}.png` : "/og/home.png");

const ogImages = (url: string, alt: string) => [{ url, ...OG_SIZE, alt, type: "image/png" }];

/**
 * Metadata for one explainer page, with its own preview image.
 * A nested openGraph replaces the site's whole block, so every field is set here.
 */
export function explainerMetadata({
  path,
  title,
  description,
  keywords,
  section,
  image,
}: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  section: string;
  /** Path of the link preview image. */
  image: string;
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      section,
      authors: [AUTHOR.url],
      locale: "en_GB",
      images: ogImages(image, title),
    },
    twitter: { card: "summary_large_image", title, description, creator: AUTHOR.twitter, images: [image] },
  };
}

/** Metadata for a section index or other top-level page. */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, url: path, title, description, locale: "en_GB", images: ogImages(ogImagePath(), title) },
    twitter: { card: "summary_large_image", title, description, creator: AUTHOR.twitter, images: [ogImagePath()] },
  };
}
