"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom, type Random } from "@/lib/ml/random";
import { normQuantile, tQuantile } from "@/lib/stats/inference";
import { Stat } from "./coin-flip-lab";

type PopulationId = "normal" | "skewed" | "coin";

const POPULATIONS: Record<PopulationId, { label: string; blurb: string; mean: number; sd: number; draw: (r: Random) => number }> = {
  normal: { label: "Heights", blurb: "Normal, mean 170 cm, sd 10 cm", mean: 170, sd: 10, draw: (r) => 170 + 10 * r.gaussian() },
  skewed: {
    label: "Wait times",
    blurb: "Exponential, mean 5 minutes: most waits are short, a few are long",
    mean: 5,
    sd: 5,
    draw: (r) => -5 * Math.log(1 - r.next()),
  },
  coin: { label: "Clicks", blurb: "Each visitor clicks with chance 0.1 (a 0 or a 1)", mean: 0.1, sd: Math.sqrt(0.09), draw: (r) => (r.next() < 0.1 ? 1 : 0) },
};

interface Interval {
  id: number;
  mean: number;
  lo: number;
  hi: number;
  covers: boolean;
}

const SHOWN = 40;
const W = 680;
const ROW = 9;
const H = SHOWN * ROW + 40;
const PADX = 16;
const COVER = rgb(CLASS_COLORS[1]);
const MISS = rgb(CLASS_COLORS[0]);

/** Draw a sample, build an interval, repeat: about 95% of the intervals catch the true mean. */
export default function ConfidenceIntervalsLab() {
  const [population, setPopulation] = useState<PopulationId>("normal");
  const [n, setN] = useState(10);
  const [level, setLevel] = useState(0.95);
  const [useT, setUseT] = useState(true);
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [tally, setTally] = useState({ covered: 0, total: 0 });
  const [auto, setAuto] = useState(false);
  const rand = useRef(createRandom(97));
  const nextId = useRef(0);

  const pop = POPULATIONS[population];
  const crit = useT ? tQuantile(1 - (1 - level) / 2, n - 1) : normQuantile(1 - (1 - level) / 2);

  const makeInterval = (): Interval => {
    const xs = Array.from({ length: n }, () => pop.draw(rand.current));
    const mean = xs.reduce((s, x) => s + x, 0) / n;
    const sd = Math.sqrt(xs.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1));
    const half = (crit * sd) / Math.sqrt(n);
    const lo = mean - half;
    const hi = mean + half;
    return { id: nextId.current++, mean, lo, hi, covers: lo <= pop.mean && pop.mean <= hi };
  };

  const draw = (count: number) => {
    const fresh = Array.from({ length: count }, makeInterval);
    setIntervals((old) => [...fresh.reverse(), ...old].slice(0, SHOWN));
    setTally((t) => ({ covered: t.covered + fresh.filter((i) => i.covers).length, total: t.total + count }));
  };

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => draw(1), 220);
    return () => clearInterval(id);
    // draw closes over the settings, which also restart the interval.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, population, n, level, useT]);

  const reset = () => {
    setIntervals([]);
    setTally({ covered: 0, total: 0 });
  };
  const change = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    reset();
  };

  // Scale: wide enough for a typical interval, and for every one on screen.
  const typical = (3.2 * pop.sd) / Math.sqrt(n);
  const half = Math.max(typical, ...intervals.map((i) => Math.max(pop.mean - i.lo, i.hi - pop.mean)));
  const sx = (v: number) => PADX + ((v - (pop.mean - half)) / (2 * half)) * (W - 2 * PADX);
  const coverage = tally.total ? tally.covered / tally.total : null;
  const digits = pop.mean < 1 ? 3 : 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4" style={{ background: COVER }} />
              Catches the true mean
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4" style={{ background: MISS }} />
              Misses it
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-0 border-l-2 border-dashed border-ink" />
              True mean {pop.mean}
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The most recent confidence intervals against the true mean">
            {intervals.length === 0 && (
              <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted text-[13px]">
                Draw a sample to build the first interval.
              </text>
            )}
            {intervals.map((iv, row) => {
              const y = 10 + row * ROW;
              const color = iv.covers ? COVER : MISS;
              return (
                <g key={iv.id} className={row === 0 ? "anim-pop-in" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                  <line x1={sx(iv.lo)} x2={sx(iv.hi)} y1={y} y2={y} stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={row === 0 ? 1 : 0.8} />
                  <circle cx={sx(iv.mean)} cy={y} r={2.6} fill={color} />
                </g>
              );
            })}
            <line x1={sx(pop.mean)} x2={sx(pop.mean)} y1={2} y2={H - 26} stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="5 4" />
            {[-1, -0.5, 0, 0.5, 1].map((t) => {
              const v = pop.mean + t * half;
              return (
                <text key={t} x={sx(v)} y={H - 8} textAnchor={t === -1 ? "start" : t === 1 ? "end" : "middle"} className="fill-muted font-mono text-[10px]">
                  {v.toFixed(digits)}
                </text>
              );
            })}
          </svg>
          <p className="px-1 text-[11px] text-muted">Newest at the top; the last {SHOWN} are shown. Dots are each sample&apos;s mean.</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm text-muted">Share of all intervals that caught the true mean</p>
            <p className="font-mono text-sm tabular-nums">
              {coverage === null ? "none yet" : `${(coverage * 100).toFixed(1)}%`} <span className="text-muted">vs {(level * 100).toFixed(0)}% promised</span>
            </p>
          </div>
          <div className="relative mt-3 h-3 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(coverage ?? 0) * 100}%`, background: coverage !== null && coverage < level - 0.03 ? MISS : COVER }} />
            <span className="absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${level * 100}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Intervals" value={String(tally.total)} />
          <Stat label="Caught the mean" value={String(tally.covered)} />
          <Stat label="Missed" value={String(tally.total - tally.covered)} />
          <Stat label={`Critical value (${useT ? `t, ${n - 1} df` : "z"})`} value={crit.toFixed(3)} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Sample">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 20, 100].map((c) => (
                <Button key={c} size="sm" variant={c === 1 ? "accent" : "outline"} onClick={() => draw(c)}>
                  {c === 1 ? "Draw 1" : `Draw ${c}`}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setAuto((v) => !v)}>
              {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
              {auto ? "Stop" : "Keep drawing"}
            </Button>
            <Button className="w-full" variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" /> Clear
            </Button>
          </div>
        </Panel>
        <Panel title="Population">
          <Segmented<PopulationId>
            value={population}
            options={(Object.keys(POPULATIONS) as PopulationId[]).map((id) => ({ value: id, label: POPULATIONS[id].label }))}
            onChange={change(setPopulation)}
            size="sm"
          />
          <p className="mt-3 text-xs leading-relaxed text-muted">{pop.blurb}. In real life this is unknown; here you can see it.</p>
        </Panel>
        <Panel title="The interval">
          <div className="space-y-5">
            <SliderField label="Sample size (n)" value={n} min={2} max={100} step={1} onChange={change(setN)} hint="Bigger samples give narrower intervals, not more of them covering." />
            <SliderField
              label="Confidence level"
              value={level}
              min={0.8}
              max={0.99}
              step={0.01}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={change(setLevel)}
              hint="Higher confidence buys more coverage with wider intervals."
            />
            <Toggle
              label="Use the t distribution"
              checked={useT}
              onChange={change(setUseT)}
              hint="The sample's spread is itself a guess. t widens small-sample intervals to pay for that; z does not, so it under-covers when n is small."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
