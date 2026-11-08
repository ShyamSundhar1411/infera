import { getProbabilityConcepts } from "@/lib/data/distributions.data";
import { Tex } from "@/components/ui/tex";

export default function ConceptGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {getProbabilityConcepts().map((c) => (
        <article key={c.term} className="flex flex-col rounded-2xl border border-line bg-surface p-5">
          <h3 className="font-medium">{c.term}</h3>
          <div className="mt-3 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
            <Tex>{c.formula}</Tex>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">{c.text}</p>
        </article>
      ))}
    </div>
  );
}
