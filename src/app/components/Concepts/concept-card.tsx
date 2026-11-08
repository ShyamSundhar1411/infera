import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Concept } from "@/lib/types/domain/concept.types";
import { Tex } from "@/components/ui/tex";

export default function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <Link
      href={`/concepts/${concept.slug}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="grid h-32 place-items-center border-b border-line bg-surface-2/60 text-2xl">
        {concept.glyph ? <Tex>{concept.glyph}</Tex> : <span className="font-display text-4xl italic">{concept.name}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium">{concept.name}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-ink" />
        </div>
        <p className="text-[13px] leading-relaxed text-muted">{concept.tagline}</p>
      </div>
    </Link>
  );
}
