import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AlgorithmMeta } from "@/lib/types/domain/algorithm.types";
import MiniPreview from "./mini-preview";

const KIND_LABEL = {
  regression: "Regression",
  classification: "Classification",
  clustering: "Clustering",
  projection: "Dimensionality reduction",
};

export default function AlgorithmCard({ algorithm }: { algorithm: AlgorithmMeta }) {
  return (
    <Link
      href={`/algorithms/${algorithm.slug}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="border-b border-line">
        <MiniPreview slug={algorithm.slug} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium leading-snug">{algorithm.shortName}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-ink" />
        </div>
        <p className="text-[13px] leading-relaxed text-muted">{algorithm.tagline}</p>
        <span className="mt-auto pt-2 text-[11px] uppercase tracking-[0.1em] text-muted">
          {KIND_LABEL[algorithm.kind]}
        </span>
      </div>
    </Link>
  );
}
