import type { Metadata } from "next";
import ConceptGrid from "../components/Distributions/concept-grid";
import DistributionCard from "../components/Distributions/distribution-card";
import { getDistributionsByType } from "@/lib/data/distributions.data";

export const metadata: Metadata = {
  title: "Distributions",
  description: "Interactive probability distributions: PMFs, PDFs, CDFs, expectation, variance and sampling.",
};

const GROUPS = [
  {
    type: "discrete" as const,
    title: "Discrete",
    blurb: "Countable outcomes: heads or tails, the number of emails, the roll of a die.",
  },
  {
    type: "continuous" as const,
    title: "Continuous",
    blurb: "Any value in a range: heights, waiting times, probabilities themselves.",
  },
];

export default function DistributionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">
          Probability, <em className="italic">by hand</em>.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Slide the parameters, shade an interval to read off a probability, then draw samples and
          watch the histogram settle onto the curve.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-5 font-display text-3xl tracking-tight">The essentials</h2>
        <ConceptGrid />
      </section>

      {GROUPS.map((group) => (
        <section key={group.type} id={group.type} className="mb-14 scroll-mt-24">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl tracking-tight">{group.title}</h2>
            <p className="max-w-md text-sm text-muted sm:text-right">{group.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {getDistributionsByType(group.type).map(({ content: _content, ...meta }) => (
              <DistributionCard key={meta.slug} distribution={meta} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
