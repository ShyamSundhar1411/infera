import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { AUTHOR } from "@/lib/data/author.data";

/**
 * Metadata for one explainer page. The preview image comes from the
 * opengraph-image file next to the page, which Next adds on its own.
 * A nested openGraph replaces the site's whole block, so every field is set here.
 */
export function explainerMetadata({
  path,
  title,
  description,
  keywords,
  section,
}: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  section: string;
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
    },
    twitter: { card: "summary_large_image", title, description, creator: AUTHOR.twitter },
  };
}

/** Metadata for a section index or other top-level page. */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, url: path, title, description, locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description, creator: AUTHOR.twitter },
  };
}
