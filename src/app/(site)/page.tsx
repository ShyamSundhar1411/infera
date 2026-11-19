import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/app/components/Landing/hero";
import HowItWorks from "@/app/components/Landing/how-it-works";
import AlgorithmCatalog from "@/app/components/Catalog/algorithm-catalog";
import DistributionCard from "@/app/components/Distributions/distribution-card";
import ConceptCard from "@/app/components/Concepts/concept-card";
import { getConcepts } from "@/lib/data/concepts.data";
import { getAlgorithms } from "@/lib/data/algorithms.data";
import { getDistributions } from "@/lib/data/distributions.data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...pageMetadata({ path: "/", title: `${SITE_NAME}: ${SITE_TAGLINE.replace(/\.$/, "")}`, description: SITE_DESCRIPTION }),
  // The home page shows the bare title, without the " · Infera" suffix.
  title: { absolute: `${SITE_NAME}: ${SITE_TAGLINE.replace(/\.$/, "").toLowerCase()}` },
};

export default function HomePage() {
  const distributions = getDistributions();
  return (
    <>
      <Hero algorithms={getAlgorithms().length} distributions={distributions.length} />
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading title="Algorithms" href="/algorithms/" />
        <AlgorithmCatalog />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading title="Concepts" href="/concepts/" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getConcepts().map((c) => (
            <ConceptCard key={c.slug} concept={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading title="Distributions" href="/distributions/" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {distributions.slice(0, 8).map((meta) => (
            <DistributionCard key={meta.slug} distribution={meta} />
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
      <h2 className="font-display text-5xl tracking-tight">{title}</h2>
      <Link href={href} className="flex items-center gap-1 text-sm text-muted hover:text-ink">
        See all <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
