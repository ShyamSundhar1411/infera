import { getCategories } from "@/lib/data/categories.data";
import { getAlgorithmsByCategory } from "@/lib/data/algorithms.data";
import AlgorithmCard from "./algorithm-card";

export default function AlgorithmCatalog() {
  return (
    <div className="space-y-14">
      {getCategories().map((category) => {
        const items = getAlgorithmsByCategory(category.id);
        if (!items.length) return null;
        return (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-3xl tracking-tight">{category.name}</h2>
              <p className="max-w-md text-sm text-muted sm:text-right">{category.blurb}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map(({ content: _content, ...meta }) => (
                <AlgorithmCard key={meta.slug} algorithm={meta} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
