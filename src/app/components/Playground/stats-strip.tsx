import type { Stat } from "@/lib/types/domain/model.types";

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-4 py-3">
          <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">{s.label}</dt>
          <dd className="mt-1 truncate font-mono text-sm tabular-nums" title={s.value}>
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
