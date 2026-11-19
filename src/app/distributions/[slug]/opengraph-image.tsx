import { getDistribution, getDistributions } from "@/lib/data/distributions.data";
import { OG_SIZE, ogImage } from "@/lib/seo/og-image";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A probability distribution at its default parameters";

export const generateStaticParams = () => getDistributions().map((d) => ({ slug: d.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const distribution = getDistribution((await params).slug)!;
  return ogImage({
    eyebrow: `Distributions · ${distribution.type}`,
    title: `${distribution.name} distribution`,
    tagline: distribution.tagline,
    visual: { kind: "distribution", slug: distribution.slug },
  });
}
