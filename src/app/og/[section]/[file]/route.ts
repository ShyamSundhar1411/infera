import { getAlgorithm, getAlgorithms } from "@/lib/data/algorithms.data";
import { getCategories } from "@/lib/data/categories.data";
import { getConcepts } from "@/lib/data/concepts.data";
import { getDistribution, getDistributions } from "@/lib/data/distributions.data";
import { ogImage } from "@/lib/seo/og-image";

// Link preview images at fixed addresses, /og/<section>/<slug>.png, rendered at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => [
  ...getAlgorithms().map((a) => ({ section: "algorithms", file: `${a.slug}.png` })),
  ...getDistributions().map((d) => ({ section: "distributions", file: `${d.slug}.png` })),
  ...getConcepts().map((c) => ({ section: "concepts", file: `${c.slug}.png` })),
];

export async function GET(_request: Request, { params }: { params: Promise<{ section: string; file: string }> }) {
  const { section, file } = await params;
  const slug = file.replace(/\.png$/, "");
  if (section === "algorithms") {
    const algorithm = getAlgorithm(slug)!;
    const category = getCategories().find((c) => c.id === algorithm.category);
    return ogImage({ eyebrow: category?.name ?? "Machine learning", title: algorithm.name, tagline: algorithm.tagline, visual: { kind: "algorithm", slug } });
  }
  if (section === "distributions") {
    const distribution = getDistribution(slug)!;
    return ogImage({ eyebrow: `Distributions · ${distribution.type}`, title: `${distribution.name} distribution`, tagline: distribution.tagline, visual: { kind: "distribution", slug } });
  }
  const concept = getConcepts().find((c) => c.slug === slug)!;
  return ogImage({ eyebrow: "Concepts", title: concept.name, tagline: concept.tagline, visual: { kind: "concept", slug } });
}
