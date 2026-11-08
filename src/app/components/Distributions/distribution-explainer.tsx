import type { Distribution } from "@/lib/types/domain/distribution.types";
import { RichText } from "@/components/ui/rich-text";

export default function DistributionExplainer({ distribution }: { distribution: Distribution }) {
  const { content, formulas, type } = distribution;
  const formulaRows = [
    { label: "Support", value: formulas.support },
    { label: type === "discrete" ? "PMF" : "PDF", value: formulas.density },
    { label: "CDF", value: formulas.cdf },
    { label: "Expectation", value: formulas.mean },
    { label: "Variance", value: formulas.variance },
    ...(formulas.mode ? [{ label: "Mode", value: formulas.mode }] : []),
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-3xl tracking-tight">The story</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/85">
            {content.story.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-tight">Where it shows up</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.examples.map((e, i) => (
              <li key={i} className="rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed">
                <RichText text={e} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-tight">Try this</h2>
          <ul className="mt-4 space-y-3">
            {content.tryThis.map((idea, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs text-accent-ink">
                  {i + 1}
                </span>
                <span>
                  <RichText text={idea} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-tight">Related distributions</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/85">
            {content.relations.map((r, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted" />
                <RichText text={r} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Formulas</h2>
          <dl className="mt-4 space-y-4">
            {formulaRows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs text-muted">{row.label}</dt>
                <dd className="mt-1 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-[13px] leading-relaxed">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Parameters</h2>
          <dl className="mt-3 space-y-3">
            {content.parameters.map((p) => (
              <div key={p.symbol} className="flex gap-3 text-sm leading-relaxed">
                <dt className="w-6 shrink-0 font-mono text-base">{p.symbol}</dt>
                <dd className="text-ink/85">
                  <RichText text={p.meaning} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>
    </div>
  );
}
