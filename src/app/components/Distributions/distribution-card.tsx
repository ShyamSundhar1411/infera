import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DistributionMeta } from "@/lib/types/domain/distribution.types";
import MiniCurve from "./mini-curve";

export default function DistributionCard({ distribution }: { distribution: DistributionMeta }) {
  return (
    <Link
      href={`/distributions/${distribution.slug}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="border-b border-line px-2 pt-3">
        <MiniCurve distribution={distribution} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium">{distribution.name}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-ink" />
        </div>
        <p className="font-mono text-xs text-muted">{distribution.notation}</p>
        <p className="text-[13px] leading-relaxed text-muted">{distribution.tagline}</p>
      </div>
    </Link>
  );
}
