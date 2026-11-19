import { getAlgorithm, getAlgorithms } from "@/lib/data/algorithms.data";
import { getCategories } from "@/lib/data/categories.data";
import { OG_SIZE, ogImage } from "@/lib/seo/og-image";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "An algorithm trained live on sample data";

export const generateStaticParams = () => getAlgorithms().map((a) => ({ slug: a.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const algorithm = getAlgorithm((await params).slug)!;
  const category = getCategories().find((c) => c.id === algorithm.category);
  return ogImage({
    eyebrow: category?.name ?? "Machine learning",
    title: algorithm.name,
    tagline: algorithm.tagline,
    visual: { kind: "algorithm", slug: algorithm.slug },
  });
}
