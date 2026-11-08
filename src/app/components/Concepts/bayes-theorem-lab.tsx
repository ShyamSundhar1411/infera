"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";

const N = 1000;
const COLS = 50;
const CELL = 12;
const GAP = 2;

const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;

export default function BayesTheoremLab() {
  const [prevalence, setPrevalence] = useState(0.01);
  const [sensitivity, setSensitivity] = useState(0.99);
  const [specificity, setSpecificity] = useState(0.95);
  const [tests, setTests] = useState(1);

  // One positive test, as counts out of 1,000 people.
  const sick = Math.round(prevalence * N);
  const truePos = Math.round(sick * sensitivity);
  const falseNeg = sick - truePos;
  const healthy = N - sick;
  const falsePos = Math.round(healthy * (1 - specificity));
  const trueNeg = healthy - falsePos;

  // Exact posterior after k positives, via odds × LRᵏ.
  const lr = sensitivity / Math.max(1 - specificity, 1e-9);
  const posteriors = Array.from({ length: tests }, (_, i) => {
    const odds = (prevalence / (1 - prevalence)) * lr ** (i + 1);
    return odds / (1 + odds);
  });
  const posterior = posteriors[posteriors.length - 1];

  const cells: { kind: "tp" | "fn" | "fp" | "tn" }[] = [
    ...Array.from({ length: truePos }, () => ({ kind: "tp" as const })),
    ...Array.from({ length: falseNeg }, () => ({ kind: "fn" as const })),
    ...Array.from({ length: falsePos }, () => ({ kind: "fp" as const })),
    ...Array.from({ length: trueNeg }, () => ({ kind: "tn" as const })),
  ];
  const sickColor = CLASS_COLORS[0];
  const healthyColor = CLASS_COLORS[2];
  const fill = {
    tp: rgb(sickColor),
    fn: rgb(sickColor, 0.25),
    fp: rgb(healthyColor),
    tn: "var(--surface-2)",
  };
  const rows = Math.ceil(N / COLS);
  const width = COLS * (CELL + GAP) - GAP;
  const height = rows * (CELL + GAP) - GAP;

  const p = (v: number) => v.toFixed(v < 0.01 ? 4 : 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <LegendSwatch color={fill.tp} label={`Sick, tested positive (${truePos})`} />
            <LegendSwatch color={fill.fn} label={`Sick, missed (${falseNeg})`} />
            <LegendSwatch color={fill.fp} label={`Healthy, false alarm (${falsePos})`} />
            <LegendSwatch color={fill.tn} label={`Healthy, negative (${trueNeg})`} border />
          </div>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="1,000 people grouped by disease and test result">
            {cells.map((c, i) => (
              <rect
                key={i}
                x={(i % COLS) * (CELL + GAP)}
                y={Math.floor(i / COLS) * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={3}
                fill={fill[c.kind]}
              />
            ))}
          </svg>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-[1.2fr_1fr]">
          <div className="bg-surface p-5">
            <p className="text-sm text-muted">Chance you are sick after {tests === 1 ? "a positive test" : `${tests} positive tests`}</p>
            <p className="mt-1 font-display text-6xl tracking-tight">{pct(posterior)}</p>
            <p className="mt-2 text-sm text-muted">
              Of the {truePos + falsePos} people who tested positive, {truePos} are actually sick.
            </p>
          </div>
          <div className="space-y-2 bg-surface p-5 font-mono text-[13px] leading-relaxed">
            <p className="text-xs text-muted">With your numbers</p>
            <p>P(D | +) = P(+ | D)·P(D) / P(+)</p>
            <p>
              = {p(sensitivity)} × {p(prevalence)} / ({p(sensitivity)} × {p(prevalence)} + {p(1 - specificity)} × {p(1 - prevalence)})
            </p>
            <p>= {p(posteriors[0])}</p>
          </div>
        </div>

        {tests > 1 && (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="mb-3 text-sm text-muted">Each positive result multiplies the odds by LR₊ = {lr.toFixed(1)}</p>
            <div className="space-y-2">
              {[prevalence, ...posteriors].map((v, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-28 shrink-0 text-muted">{i === 0 ? "Before testing" : `After ${i} positive${i > 1 ? "s" : ""}`}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full" style={{ width: `${v * 100}%`, background: rgb(sickColor) }} />
                  </div>
                  <span className="w-16 text-right font-mono tabular-nums">{pct(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Panel title="The test">
        <div className="space-y-5">
          <SliderField
            label="Prevalence"
            value={prevalence}
            min={0.001}
            max={0.5}
            step={0.001}
            log
            format={(v) => pct(v, v < 0.01 ? 2 : 1)}
            onChange={setPrevalence}
            hint="How common the disease is before anyone is tested: the prior."
          />
          <SliderField
            label="Sensitivity"
            value={sensitivity}
            min={0.5}
            max={0.999}
            step={0.001}
            format={(v) => pct(v)}
            onChange={setSensitivity}
            hint="P(positive | sick): how many real cases the test catches."
          />
          <SliderField
            label="Specificity"
            value={specificity}
            min={0.5}
            max={0.999}
            step={0.001}
            format={(v) => pct(v)}
            onChange={setSpecificity}
            hint="P(negative | healthy). One minus this is the false-alarm rate."
          />
          <SliderField
            label="Positive tests in a row"
            value={tests}
            min={1}
            max={4}
            step={1}
            onChange={setTests}
            hint="Independent repeat tests. Each posterior becomes the next prior."
          />
        </div>
      </Panel>
    </div>
  );
}

function LegendSwatch({ color, label, border }: { color: string; label: string; border?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`size-3 rounded-[3px] ${border ? "border border-line" : ""}`} style={{ background: color }} />
      {label}
    </span>
  );
}
