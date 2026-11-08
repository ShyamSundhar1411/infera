"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { DISTRIBUTION_MATH } from "@/lib/stats/distributions";

const MAX_N = 5000;
const PER_FRAME = 12;
const W = 680;
const H = 360;
const PAD = { top: 16, right: 16, bottom: 34, left: 48 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;

const SOURCES = {
  die: { label: "Fair die", slug: "discrete-uniform", params: { a: 1, b: 6 }, y: [1, 6] },
  coin: { label: "Coin", slug: "bernoulli", params: { p: 0.5 }, y: [0, 1] },
  exponential: { label: "Exponential", slug: "exponential", params: { lambda: 1 }, y: [0, 3] },
  cauchy: { label: "Cauchy", slug: "student-t", params: { nu: 1 }, y: [-5, 5] },
} as const;
type SourceId = keyof typeof SOURCES;

const PATH_COLORS = [...CLASS_COLORS, [70, 70, 80] as [number, number, number]];

export default function LawOfLargeNumbersLab() {
  const [source, setSource] = useState<SourceId>("die");
  const [pathCount, setPathCount] = useState(5);
  const [running, setRunning] = useState(false);
  const [means, setMeans] = useState<number[][]>([]);
  const rand = useRef(createRandom(3));

  const spec = SOURCES[source];
  const math = DISTRIBUTION_MATH[spec.slug];
  const mu = math.mean(spec.params);
  const sigma = Math.sqrt(math.variance(spec.params));

  const reset = () => {
    setMeans([]);
    setRunning(false);
  };

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const loop = () => {
      const r = rand.current;
      let done = true;
      setMeans((prev) => {
        const paths = prev.length ? prev : Array.from({ length: pathCount }, () => [] as number[]);
        return paths.map((old) => {
          const path = old.slice();
          for (let k = 0; k < PER_FRAME && path.length < MAX_N; k++) {
            const n = path.length;
            const last = n ? path[n - 1] : 0;
            path.push(last + (math.sample(spec.params, r) - last) / (n + 1));
          }
          if (path.length < MAX_N) done = false;
          return path;
        });
      });
      if (done) setRunning(false);
      else frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running, pathCount, math, spec.params]);

  const n = means[0]?.length ?? 0;
  const [yLo, yHi] = spec.y;
  const sx = (i: number) => PAD.left + (Math.log10(i) / Math.log10(MAX_N)) * IW;
  const sy = (v: number) => PAD.top + IH * (1 - (Math.max(yLo, Math.min(yHi, v)) - yLo) / (yHi - yLo));
  // Sample indices evenly in log space so long paths stay cheap to draw.
  const idx: number[] = [];
  for (let k = 0; k <= 300; k++) {
    const i = Math.round(10 ** ((k / 300) * Math.log10(MAX_N)));
    if (i >= 1 && i <= MAX_N && idx[idx.length - 1] !== i) idx.push(i);
  }
  const finite = Number.isFinite(mu) && Number.isFinite(sigma);
  const band = finite
    ? idx.map((i) => [sx(i), sy(mu + (2 * sigma) / Math.sqrt(i)), sy(mu - (2 * sigma) / Math.sqrt(i))] as const)
    : [];
  const bandPath = band.length
    ? `M${band.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")}L${[...band]
        .reverse()
        .map(([x, , y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
        .join("L")}Z`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Running averages converging">
            {[1, 10, 100, 1000, 5000].map((t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={PAD.top} y2={PAD.top + IH} stroke="var(--line)" />
                <text x={sx(t)} y={H - 12} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                  {t.toLocaleString()}
                </text>
              </g>
            ))}
            {[yLo, (yLo + yHi) / 2, yHi].map((t) => (
              <text key={t} x={PAD.left - 8} y={sy(t) + 4} textAnchor="end" className="fill-muted font-mono text-[10px]">
                {t}
              </text>
            ))}
            <text x={W - PAD.right} y={H - 12} textAnchor="end" className="fill-muted text-[10px]">
              n (log scale)
            </text>
            {bandPath && <path d={bandPath} fill="rgba(108,117,240,0.12)" />}
            {Number.isFinite(mu) && (
              <>
                <line x1={PAD.left} x2={W - PAD.right} y1={sy(mu)} y2={sy(mu)} stroke="var(--ink)" strokeDasharray="5 4" opacity={0.6} />
                <text x={W - PAD.right - 4} y={sy(mu) - 6} textAnchor="end" className="fill-ink font-mono text-[11px]">
                  E[X] = {mu}
                </text>
              </>
            )}
            {means.map((path, p) => (
              <path
                key={p}
                d={idx
                  .filter((i) => i <= path.length)
                  .map((i, k) => `${k ? "L" : "M"}${sx(i).toFixed(1)},${sy(path[i - 1]).toFixed(1)}`)
                  .join("")}
                fill="none"
                stroke={rgb(PATH_COLORS[p % PATH_COLORS.length], 0.85)}
                strokeWidth={1.6}
              />
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Draws per path" value={n.toLocaleString()} />
          <Stat label="E[X]" value={Number.isFinite(mu) ? String(mu) : "undefined"} />
          <Stat label="Spread of the average" value={finite && n ? `σ/√n = ${(sigma / Math.sqrt(n)).toFixed(3)}` : finite ? "–" : "no σ"} />
          <Stat
            label="Worst path is off by"
            value={
              n && Number.isFinite(mu)
                ? Math.max(...means.map((p) => Math.abs(p[p.length - 1] - mu))).toFixed(3)
                : "–"
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Experiment">
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-sm">Draw from</span>
              <Segmented
                size="sm"
                className="flex w-full [&>button]:flex-1"
                value={source}
                onChange={(s) => {
                  setSource(s);
                  reset();
                }}
                options={Object.entries(SOURCES).map(([value, s]) => ({ value: value as SourceId, label: s.label }))}
              />
            </div>
            <SliderField
              label="Paths"
              value={pathCount}
              min={1}
              max={PATH_COLORS.length}
              step={1}
              onChange={(v) => {
                setPathCount(v);
                reset();
              }}
              hint="Each path is an independent run of the same experiment."
            />
            <Button className="w-full" variant={running ? "outline" : "accent"} onClick={() => setRunning((r) => !r)} disabled={n >= MAX_N}>
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? "Pause" : n ? "Continue" : "Run"}
            </Button>
            <Button className="w-full" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Start over
            </Button>
          </div>
        </Panel>
        <p className="px-1 text-xs leading-relaxed text-muted">
          The shaded band is E[X] ± 2σ/√n. About 95% of running averages should sit inside it at any n.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-4 py-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm tabular-nums">{value}</p>
    </div>
  );
}
