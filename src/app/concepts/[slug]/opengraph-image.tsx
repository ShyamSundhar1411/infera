import { getConcepts } from "@/lib/data/concepts.data";
import { OG_SIZE, ogImage } from "@/lib/seo/og-image";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A probability concept as an interactive simulation";

export const generateStaticParams = () => getConcepts().map((c) => ({ slug: c.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const concept = getConcepts().find((c) => c.slug === slug)!;
  return ogImage({ eyebrow: "Concepts", title: concept.name, tagline: concept.tagline, visual: { kind: "concept", slug } });
}
