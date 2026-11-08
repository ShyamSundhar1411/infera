import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "./components/Landing/hero";
import HowItWorks from "./components/Landing/how-it-works";
import AlgorithmCatalog from "./components/Catalog/algorithm-catalog";
import DistributionCard from "./components/Distributions/distribution-card";
import { getAlgorithms } from "@/lib/data/algorithms.data";
import { getDistributions } from "@/lib/data/distributions.data";

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
        <SectionHeading title="Distributions" href="/distributions/" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {distributions.slice(0, 8).map(({ content: _content, ...meta }) => (
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
