"use client";

import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { createRandom } from "@/lib/ml/random";
import { DISTRIBUTION_MATH } from "@/lib/stats/distributions";
import { erf } from "@/lib/stats/special";
import type { DistParamValues } from "@/lib/types/domain/distribution.types";

const MEANS = 3000;
const BINS = 40;
const Z = 4;
const W = 320;
const H = 190;
const PAD = { top: 10, right: 8, bottom: 22, left: 8 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;

const SOURCES: { name: string; note: string; slug: string; params: DistParamValues }[] = [
  { name: "Uniform", note: "flat", slug: "uniform", params: { a: 0, b: 1 } },
  { name: "Exponential", note: "skewed right", slug: "exponential", params: { lambda: 1 } },
  { name: "Coin (p = 0.2)", note: "only 0 or 1", slug: "bernoulli", params: { p: 0.2 } },
  { name: "Beta(0.5, 0.5)", note: "U-shaped", slug: "beta", params: { alpha: 0.5, beta: 0.5 } },
];

const phi = (z: number) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

export default function CentralLimitLab() {
  const [n, setN] = useState(1);
  const [seed, setSeed] = useState(1);

  const panels = useMemo(() => {
    const rand = createRandom(seed);
    return SOURCES.map((src) => {
      const math = DISTRIBUTION_MATH[src.slug];
      const mu = math.mean(src.params);
      const sigma = Math.sqrt(math.variance(src.params));
      const counts = new Array(BINS).fill(0);
      for (let m = 0; m < MEANS; m++) {
        let sum = 0;
        for (let i = 0; i < n; i++) sum += math.sample(src.params, rand);
        const z = (sum / n - mu) / (sigma / Math.sqrt(n));
        const bin = Math.floor(((z + Z) / (2 * Z)) * BINS);
        if (bin >= 0 && bin < BINS) counts[bin]++;
      }
      // Total variation distance between the histogram and N(0, 1) on the same bins.
      const width = (2 * Z) / BINS;
      let tv = 0;
      counts.forEach((c, i) => {
        const lo = -Z + i * width;
        tv += Math.abs(c / MEANS - (Phi(lo + width) - Phi(lo)));
      });
      return { ...src, math, counts, density: counts.map((c) => c / (MEANS * width)), tv: tv / 2 };
    });
  }, [n, seed]);

  const sx = (z: number) => PAD.left + ((z + Z) / (2 * Z)) * IW;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Sample size">
          <SliderField
            label="Draws per average (n)"
            value={n}
            min={1}
            max={100}
            step={1}
            onChange={setN}
            hint={`Each histogram shows ${MEANS.toLocaleString()} averages of n draws, standardised to z = (X̄ − μ)/(σ/√n).`}
          />
        </Panel>
        <Panel title="Randomness">
          <p className="mb-3 text-sm text-muted">Same experiment, fresh random draws.</p>
          <Button className="w-full" onClick={() => setSeed((s) => s + 1)}>
            <Shuffle className="size-4" /> Resample
          </Button>
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {panels.map((p) => {
          const yMax = Math.max(...p.density, phi(0)) * 1.1;
          const sy = (y: number) => PAD.top + IH * (1 - Math.min(y, yMax) / yMax);
          const normal = Array.from({ length: 121 }, (_, i) => -Z + (2 * Z * i) / 120)
            .map((z, i) => `${i ? "L" : "M"}${sx(z).toFixed(1)},${sy(phi(z)).toFixed(1)}`)
            .join("");
          const width = (2 * Z) / BINS;
          const verdict = p.tv < 0.05 ? "Looks normal" : p.tv < 0.12 ? "Getting there" : "Not normal yet";
          return (
            <article key={p.name} className="rounded-2xl border border-line bg-surface p-4">
              <header className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-xs text-muted">Source is {p.note}</p>
                </div>
                <SourceThumb slug={p.slug} params={p.params} />
              </header>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Histogram of standardised averages for ${p.name}`}>
                {p.density.map((d, i) => (
                  <rect
                    key={i}
                    x={sx(-Z + i * width) + 0.5}
                    y={sy(d)}
                    width={Math.max(0, sx(-Z + (i + 1) * width) - sx(-Z + i * width) - 1)}
                    height={Math.max(0, sy(0) - sy(d))}
                    fill="rgba(240, 101, 84, 0.45)"
                  />
                ))}
                <path d={normal} fill="none" stroke="rgb(38, 166, 154)" strokeWidth={2} strokeDasharray="5 4" />
                <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
                {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
                  <text key={t} x={sx(t)} y={H - 6} textAnchor="middle" className="fill-muted font-mono text-[9px]">
                    {t}
                  </text>
                ))}
              </svg>
              <p className="mt-1 flex justify-between text-xs">
                <span className="text-muted">Gap from N(0, 1): {(p.tv * 100).toFixed(1)}%</span>
                <span className={p.tv < 0.05 ? "text-[rgb(38,166,154)]" : "text-muted"}>{verdict}</span>
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/** Tiny picture of the source distribution's shape. */
function SourceThumb({ slug, params }: { slug: string; params: Record<string, number> }) {
  const math = DISTRIBUTION_MATH[slug];
  const w = 84;
  const h = 36;
  if (slug === "bernoulli") {
    const p0 = math.density(0, params);
    const p1 = math.density(1, params);
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-[84px]" aria-hidden>
        <rect x={20} y={h - 2 - p0 * (h - 4)} width={14} height={p0 * (h - 4)} rx={2} fill="rgb(108,117,240)" />
        <rect x={50} y={h - 2 - p1 * (h - 4)} width={14} height={p1 * (h - 4)} rx={2} fill="rgb(108,117,240)" />
      </svg>
    );
  }
  const [lo, hi] = math.range(params);
  const xs = Array.from({ length: 61 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 61);
  const ys = xs.map((x) => math.density(x, params));
  const top = Math.min(Math.max(...ys), ys[30] * 4 || 1);
  const d = xs
    .map((x, i) => `${i ? "L" : "M"}${(((x - lo) / (hi - lo)) * w).toFixed(1)},${(h - 2 - (Math.min(ys[i], top) / top) * (h - 6)).toFixed(1)}`)
    .join("");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-[84px]" aria-hidden>
      <path d={d} fill="none" stroke="rgb(108,117,240)" strokeWidth={2} />
    </svg>
  );
}
