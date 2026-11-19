import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd, catalogueGraph } from "@/lib/seo/structured-data";
import AlgorithmCatalog from "@/app/components/Catalog/algorithm-catalog";
import { getAlgorithms } from "@/lib/data/algorithms.data";

export const metadata: Metadata = pageMetadata({
  path: "/algorithms/",
  title: "Machine learning algorithms, interactive",
  description: "Interactive playgrounds for regression, classification, clustering and dimensionality reduction.",
});

export default function AlgorithmsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={catalogueGraph("Machine learning algorithms, interactive", getAlgorithms().map((a) => ({ path: `/algorithms/${a.slug}/`, name: a.name })))} />
      <header className="mb-12 max-w-2xl">
        <p className="text-sm text-muted">{getAlgorithms().length} algorithms</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
          Every model, <em className="italic">drawn live</em>.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Pick an algorithm, drop points on the canvas and watch it learn. Every one is written from
          scratch and runs right in your browser.
        </p>
      </header>
      <AlgorithmCatalog />
    </div>
  );
}
