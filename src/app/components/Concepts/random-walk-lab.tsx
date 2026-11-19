"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom, type Random } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Mode = "ruin" | "free";

const W = 680;
const H = 300;
const PAD = { top: 14, right: 14, bottom: 28, left: 40 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const FREE_STEPS = 400;
const MAX_STEPS = 20000;
const MAX_FAINT = 80;
const ANIM_MS = 4500;

const PATH = rgb(CLASS_COLORS[2]);
const FAINT = rgb(CLASS_COLORS[2], 0.14);
const RUIN = rgb(CLASS_COLORS[0]);
const WIN = rgb(CLASS_COLORS[1]);
const CHIP = rgb(CLASS_COLORS[3]);

interface Walk {
  path: number[];
  /** Gambler's ruin only: true if the walk hit 0. */
  ruined?: boolean;
}

/** One walk: ±1 each round, stopping at the barriers in ruin mode or after FREE_STEPS otherwise. */
const walk = (r: Random, mode: Mode, p: number, start: number, target: number): Walk => {
  if (mode === "free") {
    const path = [0];
    for (let t = 0; t < FREE_STEPS; t++) path.push(path[t] + (r.next() < p ? 1 : -1));
    return { path };
  }
  const path = [start];
  let x = start;
  while (x > 0 && x < target && path.length < MAX_STEPS) {
    x += r.next() < p ? 1 : -1;
    path.push(x);
  }
  return { path, ruined: x <= 0 };
};

/** Probability of going broke starting from k chips, playing to N, winning each round with p. */
const exactRuin = (p: number, k: number, n: number) => {
  if (Math.abs(p - 0.5) < 1e-9) return 1 - k / n;
  const r = (1 - p) / p;
  return (r ** k - r ** n) / (1 - r ** n);
};

/** Expected number of rounds until the game ends. */
const exactDuration = (p: number, k: number, n: number) => {
  if (Math.abs(p - 0.5) < 1e-9) return k * (n - k);
  const q = 1 - p;
  const r = q / p;
  return k / (q - p) - (n / (q - p)) * ((1 - r ** k) / (1 - r ** n));
};

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

/** A gambler betting one chip a round, and the plain random walk underneath it. */
export default function RandomWalkLab() {
  const [mode, setMode] = useState<Mode>("ruin");
  const [p, setP] = useState(0.5);
  const [start, setStart] = useState(10);
  const [target, setTarget] = useState(20);
  const [walks, setWalks] = useState<Walk[]>([]);
  const [featured, setFeatured] = useState<Walk | null>(null);
  const [shown, setShown] = useState(0);
  const rand = useRef(createRandom(83));
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const clear = () => {
    clearInterval(timer.current);
    setWalks([]);
    setFeatured(null);
    setShown(0);
  };

  const playOne = () => {
    clearInterval(timer.current);
    const w = walk(rand.current, mode, p, start, target);
    setFeatured(w);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = w.path.length;
    if (reduced) {
      setShown(len);
      setWalks((all) => [...all, w]);
      return;
    }
    // Long games speed up so every animation finishes in a few seconds.
    const perTick = Math.max(1, Math.ceil(len / (ANIM_MS / 30)));
    let i = 1;
    setShown(1);
    timer.current = setInterval(() => {
      i = Math.min(len, i + perTick);
      setShown(i);
      if (i >= len) {
        clearInterval(timer.current);
        setWalks((all) => [...all, w]);
      }
    }, 30);
  };

  const runMany = (count: number) => {
    clearInterval(timer.current);
    const batch = Array.from({ length: count }, () => walk(rand.current, mode, p, start, target));
    setWalks((all) => [...all, ...batch]);
    setFeatured(batch[batch.length - 1]);
    setShown(batch[batch.length - 1].path.length);
  };

  const animating = featured !== null && shown < featured.path.length;
  const current = featured ? featured.path[Math.max(0, shown - 1)] : mode === "ruin" ? start : 0;
  const lengths = walks.map((w) => w.path.length - 1);

  // Axes.
  const xMax =
    mode === "free"
      ? FREE_STEPS
      : Math.max(20, Math.min(MAX_STEPS, percentile([...lengths, featured ? featured.path.length - 1 : 0], 0.95)));
  const spread = Math.max(12, Math.ceil(Math.max(Math.abs(FREE_STEPS * (2 * p - 1)), 0) + 3 * Math.sqrt(FREE_STEPS)));
  const [yLo, yHi] = mode === "free" ? [-spread, spread] : [0, target];
  const sx = (t: number) => PAD.left + (Math.min(t, xMax) / xMax) * IW;
  const sy = (v: number) => PAD.top + IH * (1 - (v - yLo) / (yHi - yLo));
  const line = (path: number[], upto = path.length) => {
    const step = Math.max(1, Math.floor(upto / 600));
    let d = "";
    for (let t = 0; t < upto; t += step) {
      if (t > xMax) break;
      d += `${t ? "L" : "M"}${sx(t).toFixed(1)},${sy(path[t]).toFixed(1)}`;
    }
    const last = Math.min(upto - 1, xMax);
    return d + `L${sx(last).toFixed(1)},${sy(path[last]).toFixed(1)}`;
  };
  const drift = 2 * p - 1;
  const sd = Math.sqrt(4 * p * (1 - p));
  const envelope = (k: number) =>
    Array.from({ length: 101 }, (_, i) => {
      const t = (i / 100) * FREE_STEPS;
      return `${i ? "L" : "M"}${sx(t).toFixed(1)},${sy(drift * t + k * sd * Math.sqrt(t)).toFixed(1)}`;
    }).join("");

  // Ruin statistics.
  const ruined = walks.filter((w) => w.ruined).length;
  const ruinExact = exactRuin(p, start, target);
  const meanRounds = lengths.length ? lengths.reduce((s, l) => s + l, 0) / lengths.length : null;

  // Histograms: game lengths (ruin) or final positions (free).
  const BINS = 24;
  const hist =
    mode === "ruin"
      ? (() => {
          const top = Math.max(10, percentile(lengths, 0.97));
          const w = top / BINS;
          const lost = Array(BINS).fill(0);
          const won = Array(BINS).fill(0);
          walks.forEach((wk) => {
            const b = Math.min(BINS - 1, Math.floor((wk.path.length - 1) / w));
            (wk.ruined ? lost : won)[b]++;
          });
          return { lost, won, labels: [0, top / 2, top].map((v) => Math.round(v).toString()) };
        })()
      : null;
  const finals = mode === "free" ? walks.map((w) => w.path[w.path.length - 1]) : [];
  const freeMean = finals.length ? finals.reduce((s, v) => s + v, 0) / finals.length : null;
  const freeSd =
    finals.length > 1 && freeMean !== null
      ? Math.sqrt(finals.reduce((s, v) => s + (v - freeMean) ** 2, 0) / (finals.length - 1))
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4" style={{ background: PATH }} />
                {mode === "ruin" ? "One gambler's chips" : "One walk"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4" style={{ background: FAINT }} />
                Earlier {mode === "ruin" ? "gamblers" : "walks"} ({walks.length})
              </span>
              {mode === "free" && (
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 border-t-2 border-dashed" style={{ borderColor: RUIN }} />
                  1 and 2 standard deviations, growing like √t
                </span>
              )}
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Paths of the random walk over time">
              {mode === "ruin" ? (
                <>
                  <rect x={PAD.left} y={sy(0)} width={IW} height={3} fill={RUIN} opacity={0.7} />
                  <rect x={PAD.left} y={sy(target) - 3} width={IW} height={3} fill={WIN} opacity={0.7} />
                  <text x={PAD.left - 6} y={sy(0) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                    0
                  </text>
                  <text x={PAD.left - 6} y={sy(target) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                    {target}
                  </text>
                  <line x1={PAD.left} x2={W - PAD.right} y1={sy(start)} y2={sy(start)} stroke="var(--line)" strokeDasharray="3 4" />
                  <text x={PAD.left - 6} y={sy(start) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                    {start}
                  </text>
                </>
              ) : (
                <>
                  <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--line)" />
                  {[-2, -1, 1, 2].map((k) => (
                    <path key={k} d={envelope(k)} fill="none" stroke={RUIN} strokeWidth={1.2} strokeDasharray={Math.abs(k) === 1 ? "5 4" : "2 4"} opacity={0.8} />
                  ))}
                  <path d={envelope(0)} fill="none" stroke={RUIN} strokeWidth={1} opacity={0.4} />
                  {[yLo, 0, yHi].map((v) => (
                    <text key={v} x={PAD.left - 6} y={sy(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                      {v}
                    </text>
                  ))}
                </>
              )}
              {walks.slice(-MAX_FAINT).map((w, i) => (
                <path key={i} d={line(w.path)} fill="none" stroke={FAINT} strokeWidth={1} />
              ))}
              {featured && shown > 0 && <path d={line(featured.path, shown)} fill="none" stroke={PATH} strokeWidth={2.2} />}
              <text x={W - PAD.right} y={H - 8} textAnchor="end" className="fill-muted font-mono text-[10px]">
                {mode === "free" ? FREE_STEPS : Math.round(xMax)} rounds
              </text>
            </svg>
          </div>
          {mode === "ruin" && <ChipStack chips={current} target={target} done={!!featured && !animating} ruined={featured?.ruined} />}
        </div>

        {walks.length > 0 && (
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-2 px-1 text-[11px] text-muted">
              {mode === "ruin" ? "How many rounds each game lasted" : `Where each walk ended after ${FREE_STEPS} steps, against the normal curve`}
            </p>
            {hist ? <LengthHistogram lost={hist.lost} won={hist.won} labels={hist.labels} /> : <FinalHistogram finals={finals} drift={drift * FREE_STEPS} sd={sd * Math.sqrt(FREE_STEPS)} lo={yLo} hi={yHi} />}
          </div>
        )}

        {mode === "ruin" ? (
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            <Stat label="Gamblers" value={String(walks.length)} />
            <Stat label="Went broke (simulated)" value={walks.length ? pct(ruined / walks.length) : "none yet"} />
            <Stat label="Went broke (exact)" value={pct(ruinExact)} />
            <Stat label="Average rounds" value={`${meanRounds === null ? "–" : meanRounds.toFixed(0)} vs ${exactDuration(p, start, target).toFixed(0)}`} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            <Stat label="Walks" value={String(walks.length)} />
            <Stat label="Average end" value={`${freeMean === null ? "–" : freeMean.toFixed(1)} vs ${(drift * FREE_STEPS).toFixed(1)}`} />
            <Stat label="Spread (sd) at the end" value={`${freeSd === null ? "–" : freeSd.toFixed(1)} vs ${(sd * Math.sqrt(FREE_STEPS)).toFixed(1)}`} />
            <Stat label="Ended above 0" value={finals.length ? pct(finals.filter((v) => v > 0).length / finals.length) : "none yet"} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Panel title="Mode">
          <Segmented
            value={mode}
            options={[
              { value: "ruin", label: "Gambler's ruin" },
              { value: "free", label: "Free walk" },
            ]}
            onChange={(v) => {
              // Every setting change starts a fresh experiment, since old walks no longer apply.
              setMode(v);
              clear();
            }}
          />
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {mode === "ruin"
              ? "Bet one chip a round. The game stops when the gambler is broke or reaches the target."
              : `No barriers: step up or down ${FREE_STEPS} times and see how far you wander.`}
          </p>
        </Panel>
        <Panel title="Play">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={playOne} disabled={animating}>
              <Play className="size-4" /> {mode === "ruin" ? "Play one gambler" : "Take one walk"}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={() => runMany(100)} disabled={animating}>
                <Users className="size-3.5" /> Run 100
              </Button>
              <Button size="sm" onClick={() => runMany(1000)} disabled={animating}>
                Run 1,000
              </Button>
            </div>
            <Button className="w-full" variant="ghost" onClick={clear}>
              <RotateCcw className="size-4" /> Clear
            </Button>
          </div>
        </Panel>
        <Panel title="The game">
          <div className="space-y-5">
            <SliderField
              label="Chance of winning a round (p)"
              value={p}
              min={0.3}
              max={0.7}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={(v) => {
                setP(v);
                clear();
              }}
              hint="0.50 is a fair coin. A casino game like roulette is about 0.47 to 0.49 for the player."
            />
            {mode === "ruin" && (
              <>
                <SliderField
                  label="Starting chips (k)"
                  value={start}
                  min={1}
                  max={target - 1}
                  step={1}
                  onChange={(v) => {
                    setStart(v);
                    clear();
                  }}
                />
                <SliderField
                  label="Target (N)"
                  value={target}
                  min={5}
                  max={100}
                  step={1}
                  onChange={(v) => {
                    setTarget(v);
                    if (start >= v) setStart(v - 1);
                    clear();
                  }}
                  hint="Stop when the gambler has this many chips. Think of N minus k as the house's money."
                />
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function percentile(values: number[], q: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
}

/** The gambler's pile of chips, with the target drawn as a dashed outline. */
function ChipStack({ chips, target, done, ruined }: { chips: number; target: number; done: boolean; ruined?: boolean }) {
  const shownChips = Math.min(chips, 40);
  const slots = Math.min(target, 40);
  return (
    <div className="flex w-28 flex-col items-center gap-2">
      <div className="relative flex h-56 w-16 flex-col-reverse items-center rounded-xl border border-dashed border-line p-1">
        {Array.from({ length: shownChips }, (_, i) => (
          <span
            key={i}
            className="-mt-px w-12 shrink-0 rounded-full border transition-all duration-150"
            style={{ height: `${Math.max(3, 200 / slots - 1)}px`, background: CHIP, borderColor: "rgba(0,0,0,0.25)" }}
          />
        ))}
      </div>
      <p className="font-mono text-sm tabular-nums">{chips} chips</p>
      {done && (
        <p className="anim-pop-in text-xs font-medium" style={{ color: ruined ? RUIN : WIN }}>
          {ruined ? "Broke" : "Reached the target"}
        </p>
      )}
      {target > 40 && <p className="text-center text-[10px] text-muted">stack drawn up to 40</p>}
    </div>
  );
}

const HW = 680;
const HH = 170;

function LengthHistogram({ lost, won, labels }: { lost: number[]; won: number[]; labels: string[] }) {
  const top = Math.max(1, ...lost.map((l, i) => l + won[i]));
  const bw = (HW - 20) / lost.length;
  const sy = (v: number) => (v / top) * (HH - 30);
  return (
    <div>
      <div className="mb-1 flex gap-4 px-1 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-[3px]" style={{ background: RUIN }} /> went broke
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-[3px]" style={{ background: WIN }} /> reached the target
        </span>
      </div>
      <svg viewBox={`0 0 ${HW} ${HH}`} className="w-full" role="img" aria-label="Histogram of game lengths">
        {lost.map((l, i) => (
          <g key={i}>
            <rect x={10 + i * bw + 1} y={HH - 20 - sy(l)} width={bw - 2} height={sy(l)} fill={RUIN} opacity={0.75} />
            <rect x={10 + i * bw + 1} y={HH - 20 - sy(l) - sy(won[i])} width={bw - 2} height={sy(won[i])} fill={WIN} opacity={0.75} />
          </g>
        ))}
        <line x1={10} x2={HW - 10} y1={HH - 20} y2={HH - 20} stroke="var(--muted)" opacity={0.6} />
        {labels.map((l, i) => (
          <text key={i} x={10 + (i * (HW - 20)) / 2} y={HH - 6} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} className="fill-muted font-mono text-[10px]">
            {l} rounds
          </text>
        ))}
      </svg>
    </div>
  );
}

function FinalHistogram({ finals, drift, sd, lo, hi }: { finals: number[]; drift: number; sd: number; lo: number; hi: number }) {
  // Positions after an even number of steps are even, so bins are 2 wide.
  const bins = Math.floor((hi - lo) / 4);
  const width = (hi - lo) / bins;
  const counts = Array(bins).fill(0);
  finals.forEach((v) => {
    const b = Math.floor((v - lo) / width);
    if (b >= 0 && b < bins) counts[b]++;
  });
  const density = counts.map((c) => c / (finals.length * width));
  const normal = (x: number) => Math.exp(-0.5 * ((x - drift) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
  const top = Math.max(...density, normal(drift)) * 1.1;
  const sx = (x: number) => 10 + ((x - lo) / (hi - lo)) * (HW - 20);
  const sy = (v: number) => HH - 20 - (v / top) * (HH - 30);
  const curve = Array.from({ length: 121 }, (_, i) => {
    const x = lo + ((hi - lo) * i) / 120;
    return `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(normal(x)).toFixed(1)}`;
  }).join("");
  return (
    <svg viewBox={`0 0 ${HW} ${HH}`} className="w-full" role="img" aria-label="Histogram of final positions">
      {density.map((d, i) => (
        <rect key={i} x={sx(lo + i * width) + 1} y={sy(d)} width={Math.max(1, sx(lo + width) - sx(lo) - 2)} height={HH - 20 - sy(d)} fill={rgb(CLASS_COLORS[2], 0.4)} />
      ))}
      <path d={curve} fill="none" stroke={RUIN} strokeWidth={2} />
      <line x1={10} x2={HW - 10} y1={HH - 20} y2={HH - 20} stroke="var(--muted)" opacity={0.6} />
      {[lo, 0, hi].map((v) => (
        <text key={v} x={sx(v)} y={HH - 6} textAnchor="middle" className="fill-muted font-mono text-[10px]">
          {v}
        </text>
      ))}
    </svg>
  );
}
