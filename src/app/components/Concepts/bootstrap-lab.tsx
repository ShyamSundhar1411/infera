"use client";

import { useMemo, useRef, useState } from "react";
import { RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom, type Random } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Statistic = "mean" | "median" | "sd" | "max";

const W = 680;
const STRIP_H = 78;
const HIST_H = 240;
const PAD = { left: 16, right: 16 };
const BINS = 40;
const TRUTH_SAMPLES = 3000;

const SAMPLE = rgb(CLASS_COLORS[2]);
const RESAMPLE = rgb(CLASS_COLORS[3]);
const BOOT = "rgba(232, 170, 50, 0.45)";
const TRUTH = rgb(CLASS_COLORS[1]);
const OBSERVED = rgb(CLASS_COLORS[0]);

/** Delivery times in minutes: skewed to the right, like most waiting times. */
const draw = (r: Random) => Math.exp(2.7 + 0.5 * r.gaussian());
const POP_MEDIAN = Math.exp(2.7);
const X_MAX = 60;

const STAT_FN: Record<Statistic, (xs: number[]) => number> = {
  mean: (xs) => xs.reduce((s, x) => s + x, 0) / xs.length,
  median: (xs) => {
    const s = [...xs].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  },
  sd: (xs) => {
    const m = xs.reduce((s, x) => s + x, 0) / xs.length;
    return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, xs.length - 1));
  },
  max: (xs) => Math.max(...xs),
};

const STAT_LABEL: Record<Statistic, string> = { mean: "mean", median: "median", sd: "standard deviation", max: "maximum" };

const quantile = (sorted: number[], q: number) => {
  if (!sorted.length) return NaN;
  const i = (sorted.length - 1) * q;
  const lo = Math.floor(i);
  return sorted[lo] + (sorted[Math.min(lo + 1, sorted.length - 1)] - sorted[lo]) * (i - lo);
};
const sdOf = (xs: number[]) => (xs.length > 1 ? STAT_FN.sd(xs) : NaN);

/** Resample your one sample with replacement, again and again, to see how much its statistic could wobble. */
export default function BootstrapLab() {
  const [n, setN] = useState(20);
  const [statistic, setStatistic] = useState<Statistic>("mean");
  const [showTruth, setShowTruth] = useState(false);
  const [sample, setSample] = useState(() => {
    const r = createRandom(5);
    return Array.from({ length: 20 }, () => draw(r));
  });
  const [picks, setPicks] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [boots, setBoots] = useState<number[]>([]);
  const [sampleId, setSampleId] = useState(0);
  const rand = useRef(createRandom(29));

  const stat = STAT_FN[statistic];
  const observed = stat(sample);

  const resampleIndices = () => Array.from({ length: sample.length }, () => rand.current.int(sample.length));

  const resampleOnce = () => {
    const idx = resampleIndices();
    setPicks(idx);
    setRound((r) => r + 1);
    setBoots((b) => [...b, stat(idx.map((i) => sample[i]))]);
  };

  const resampleMany = (times: number) => {
    const out = Array.from({ length: times }, () => stat(resampleIndices().map((i) => sample[i])));
    setPicks([]);
    setBoots((b) => b.concat(out));
  };

  const newSample = (size = n) => {
    setSample(Array.from({ length: size }, () => draw(rand.current)));
    setSampleId((s) => s + 1);
    setPicks([]);
    setBoots([]);
  };

  // The true sampling distribution: fresh samples from the population, which in real life you never get.
  const truth = useMemo(() => {
    const r = createRandom(97 + n);
    return Array.from({ length: TRUTH_SAMPLES }, () => STAT_FN[statistic](Array.from({ length: n }, () => draw(r)))).sort((a, b) => a - b);
  }, [n, statistic]);

  const sortedBoots = useMemo(() => [...boots].sort((a, b) => a - b), [boots]);
  const lo = quantile(sortedBoots, 0.025);
  const hi = quantile(sortedBoots, 0.975);

  // Histogram axis: wide enough for the truth and the bootstrap values.
  const xLo = Math.min(quantile(truth, 0.002), sortedBoots[0] ?? Infinity, observed) * 0.95;
  const xHi = Math.max(quantile(truth, 0.998), sortedBoots[sortedBoots.length - 1] ?? -Infinity, observed) * 1.05;
  const binW = (xHi - xLo) / BINS;
  const bin = (v: number) => Math.min(BINS - 1, Math.max(0, Math.floor((v - xLo) / binW)));
  const bootCounts = Array(BINS).fill(0);
  boots.forEach((v) => bootCounts[bin(v)]++);
  const truthCounts = Array(BINS).fill(0);
  truth.forEach((v) => truthCounts[bin(v)]++);
  const bootDens = bootCounts.map((c) => (boots.length ? c / boots.length : 0));
  const truthDens = truthCounts.map((c) => c / truth.length);
  const yMax = Math.max(...bootDens, ...(showTruth ? truthDens : [0]), 0.01) * 1.1;
  const hx = (v: number) => PAD.left + ((v - xLo) / (xHi - xLo)) * (W - PAD.left - PAD.right);
  const hy = (d: number) => HIST_H - 26 - (d / yMax) * (HIST_H - 40);
  const truthPath = truthDens.map((d, i) => `${i ? "L" : "M"}${hx(xLo + i * binW).toFixed(1)},${hy(d).toFixed(1)}H${hx(xLo + (i + 1) * binW).toFixed(1)}`).join("");

  // Strips: values as balls on a line; repeats in a resample stack upwards.
  const sx = (v: number) => PAD.left + (Math.min(v, X_MAX) / X_MAX) * (W - PAD.left - PAD.right);
  const counts = sample.map((_, i) => picks.filter((p) => p === i).length);
  const missing = picks.length ? counts.filter((c) => c === 0).length : 0;
  const repeated = counts.filter((c) => c > 1).length;
  const stacked: { i: number; level: number; order: number }[] = [];
  picks.forEach((i, order) => {
    const level = stacked.filter((s) => s.i === i).length;
    stacked.push({ i, level, order });
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-1 px-1 text-[11px] text-muted">
            Your one sample: {sample.length} delivery times in minutes. Its {STAT_LABEL[statistic]} is{" "}
            <span className="font-mono text-ink">{observed.toFixed(2)}</span>.
          </p>
          <svg viewBox={`0 0 ${W} ${STRIP_H}`} className="w-full" role="img" aria-label="The original sample">
            <line x1={PAD.left} x2={W - PAD.right} y1={STRIP_H - 22} y2={STRIP_H - 22} stroke="var(--line)" />
            {[0, 10, 20, 30, 40, 50, 60].map((t) => (
              <text key={t} x={sx(t)} y={STRIP_H - 6} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                {t}
              </text>
            ))}
            {sample.map((v, i) => (
              <circle
                key={`${sampleId}-${i}`}
                cx={sx(v)}
                cy={STRIP_H - 34 - (i % 3) * 7}
                r={6}
                fill={SAMPLE}
                opacity={picks.length && counts[i] === 0 ? 0.2 : 0.85}
                stroke="var(--surface)"
                strokeWidth={1.5}
              />
            ))}
          </svg>

          <p className="mb-1 mt-3 px-1 text-[11px] text-muted">
            {picks.length
              ? `One resample: ${sample.length} draws with replacement. ${repeated} values were picked more than once (stacked), ${missing} were never picked (faded above). Its ${STAT_LABEL[statistic]} is ${stat(picks.map((i) => sample[i])).toFixed(2)}.`
              : "Press Resample once to draw a new sample from your sample, with replacement."}
          </p>
          <svg viewBox={`0 0 ${W} ${STRIP_H + 20}`} className="w-full" role="img" aria-label="One bootstrap resample">
            <line x1={PAD.left} x2={W - PAD.right} y1={STRIP_H} y2={STRIP_H} stroke="var(--line)" />
            {stacked.map(({ i, level, order }) => (
              <g key={`${round}-${order}`} className="anim-pop-in" style={{ animationDelay: `${order * 30}ms`, transformBox: "fill-box", transformOrigin: "center" }}>
                <circle cx={sx(sample[i])} cy={STRIP_H - 10 - level * 13} r={6} fill={counts[i] > 1 ? RESAMPLE : SAMPLE} stroke="var(--surface)" strokeWidth={1.5} />
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-[3px]" style={{ background: BOOT }} />
              Bootstrap {STAT_LABEL[statistic]}s ({boots.length})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-0.5" style={{ background: OBSERVED }} />
              Your sample
            </span>
            {boots.length > 20 && (
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-ink/10" />
                95% percentile interval
              </span>
            )}
            {showTruth && (
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4" style={{ background: TRUTH }} />
                True sampling distribution
              </span>
            )}
          </div>
          <svg viewBox={`0 0 ${W} ${HIST_H}`} className="w-full" role="img" aria-label="Histogram of bootstrap statistics">
            {boots.length > 20 && <rect x={hx(lo)} y={10} width={Math.max(1, hx(hi) - hx(lo))} height={HIST_H - 36} className="fill-ink/5" />}
            {bootDens.map((d, i) => (
              <rect
                key={i}
                x={hx(xLo + i * binW) + 1}
                y={hy(d)}
                width={Math.max(0, hx(xLo + (i + 1) * binW) - hx(xLo + i * binW) - 2)}
                height={HIST_H - 26 - hy(d)}
                rx={2}
                fill={BOOT}
                className="transition-all duration-300"
              />
            ))}
            {showTruth && <path d={truthPath} fill="none" stroke={TRUTH} strokeWidth={2} />}
            <line x1={hx(observed)} x2={hx(observed)} y1={10} y2={HIST_H - 26} stroke={OBSERVED} strokeWidth={2} />
            <line x1={PAD.left} x2={W - PAD.right} y1={HIST_H - 26} y2={HIST_H - 26} stroke="var(--muted)" opacity={0.6} />
            {Array.from({ length: 6 }, (_, k) => xLo + ((xHi - xLo) * k) / 5).map((t) => (
              <text key={t} x={hx(t)} y={HIST_H - 9} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                {t.toFixed(1)}
              </text>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label={`Sample ${STAT_LABEL[statistic]}`} value={observed.toFixed(2)} />
          <Stat label="Bootstrap standard error" value={boots.length > 1 ? sdOf(boots).toFixed(2) : "resample first"} />
          <Stat label="95% interval" value={boots.length > 20 ? `${lo.toFixed(1)} to ${hi.toFixed(1)}` : "need 20+"} />
          <Stat label="True standard error" value={showTruth ? sdOf(truth).toFixed(2) : "hidden"} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Resample">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={resampleOnce}>
              <Shuffle className="size-4" /> Resample once
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={() => resampleMany(100)}>
                100 more
              </Button>
              <Button size="sm" onClick={() => resampleMany(1000)}>
                1,000 more
              </Button>
            </div>
            <Button className="w-full" variant="ghost" onClick={() => setBoots([])}>
              <RotateCcw className="size-4" /> Clear the histogram
            </Button>
          </div>
        </Panel>
        <Panel title="What to estimate">
          <div className="space-y-4">
            <Segmented
              size="sm"
              value={statistic}
              onChange={(s) => {
                setStatistic(s);
                setBoots([]);
                setPicks([]);
              }}
              options={[
                { value: "mean", label: "Mean" },
                { value: "median", label: "Median" },
                { value: "sd", label: "SD" },
                { value: "max", label: "Max" },
              ]}
            />
            <Toggle
              label="Show the truth"
              checked={showTruth}
              onChange={setShowTruth}
              hint={`The real spread of the ${STAT_LABEL[statistic]}, from ${TRUTH_SAMPLES.toLocaleString()} fresh samples of the population. In real life you never get to see this.`}
            />
          </div>
        </Panel>
        <Panel title="The sample">
          <div className="space-y-4">
            <SliderField
              label="Sample size (n)"
              value={n}
              min={5}
              max={60}
              step={1}
              onChange={(v) => {
                setN(v);
                newSample(v);
              }}
              hint={`Times are drawn from a skewed population whose median is ${POP_MEDIAN.toFixed(1)} minutes.`}
            />
            <Button className="w-full" size="sm" onClick={() => newSample()}>
              <Sparkles className="size-3.5" /> New sample
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
