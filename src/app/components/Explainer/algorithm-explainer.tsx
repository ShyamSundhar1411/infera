import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";
import { RichText } from "@/components/ui/rich-text";

export default function AlgorithmExplainer({ content }: { content: AlgorithmContent }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-10">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-3xl tracking-tight">{section.title}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/85">
              {section.paragraphs?.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
              {section.steps && (
                <ol className="space-y-2.5">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-xs text-muted">
                        {i + 1}
                      </span>
                      <span>
                        <RichText text={step} />
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        ))}

        <section>
          <h2 className="font-display text-3xl tracking-tight">Try this</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.tryThis.map((idea, i) => (
              <li key={i} className="rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink/85">
                <span className="mb-2 block font-mono text-xs text-muted">Experiment {i + 1}</span>
                <RichText text={idea} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">The maths</h2>
          <dl className="mt-4 space-y-4">
            {content.maths.map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-muted">{m.label}</dt>
                <dd className="mt-1 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-[13px] leading-relaxed">
                  {m.formula}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <ProsCons title="Good at" items={content.strengths} tone="good" />
        <ProsCons title="Struggles with" items={content.weaknesses} tone="bad" />
      </aside>
    </div>
  );
}

function ProsCons({ title, items, tone }: { title: string; items: string[]; tone: "good" | "bad" }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full"
              style={{ background: tone === "good" ? "rgb(38,166,154)" : "rgb(240,101,84)" }}
            />
            <RichText text={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
