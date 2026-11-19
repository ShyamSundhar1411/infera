import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAlgorithms } from "@/lib/data/algorithms.data";
import { getConcepts } from "@/lib/data/concepts.data";
import { getDistributions } from "@/lib/data/distributions.data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, image = true): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
    ...(image ? { images: [`${SITE_URL}/og${path === "/" ? "/home" : path.replace(/\/$/, "")}.png`] } : {}),
  });
  return [
    { ...page("/", 1), changeFrequency: "weekly" },
    page("/algorithms/", 0.8, false),
    page("/distributions/", 0.8, false),
    page("/concepts/", 0.8, false),
    // Concepts are what people search for most ("Monty Hall explained"), then the algorithms.
    ...getConcepts().map((c) => page(`/concepts/${c.slug}/`, 0.9)),
    ...getAlgorithms().map((a) => page(`/algorithms/${a.slug}/`, 0.8)),
    ...getDistributions().map((d) => page(`/distributions/${d.slug}/`, 0.7)),
  ];
}
