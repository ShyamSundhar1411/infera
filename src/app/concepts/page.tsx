import type { Metadata } from "next";
import ConceptCard from "../components/Concepts/concept-card";
import { getConcepts } from "@/lib/data/concepts.data";

export const metadata: Metadata = {
  title: "Concepts",
  description: "Interactive explainers for Bayes' theorem, Bayesian updating, the law of large numbers and the central limit theorem.",
};

export default function ConceptsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">
          The big ideas, <em className="italic">simulated</em>.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The theorems that make statistics work, each one turned into an experiment you can run
          yourself.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getConcepts().map((c) => (
          <ConceptCard key={c.slug} concept={c} />
        ))}
      </div>
    </div>
  );
}
