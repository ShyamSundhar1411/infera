import type { Concept } from "@/lib/types/domain/concept.types";
import { RichText } from "@/components/ui/rich-text";

export default function ConceptExplainer({ concept }: { concept: Concept }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="space-y-10">
        {concept.sections.map((section) => (
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
          <ul className="mt-4 space-y-3">
            {concept.tryThis.map((idea, i) => (
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
      </div>
      <aside>
        <section className="rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">The maths</h2>
          <dl className="mt-4 space-y-4">
            {concept.formulas.map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-muted">{m.label}</dt>
                <dd className="mt-1 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-[13px] leading-relaxed">
                  {m.formula}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>
    </div>
  );
}
