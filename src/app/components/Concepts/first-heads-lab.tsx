"use client";

import { useEffect, useRef, useState } from "react";
import { Coins, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { createRandom } from "@/lib/ml/random";
import { Coin, Stat } from "./coin-flip-lab";

const W = 680;
const H = 240;
const PAD = { top: 16, right: 12, bottom: 30, left: 40 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const STAGGER = 260;
const FLIP_MS = 600;
const BINS = 15;

const HEADS = "rgb(108, 117, 240)";
const OBSERVED = "rgba(108, 117, 240, 0.35)";
const EXACT = "rgb(240, 101, 84)";

/** Keep flipping until the first head. The number of flips it takes is Geometric(p). */
export default function FirstHeadsLab() {
  const [bias, setBias] = useState(0.3);
  const [current, setCurrent] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [stagger, setStagger] = useState(STAGGER);
  const [flipping, setFlipping] = useState(false);
  const [waits, setWaits] = useState<number[]>([]);
  const rand = useRef(createRandom(61));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const experiment = () => {
    const flips: number[] = [];
    do flips.push(rand.current.next() < bias ? 1 : 0);
    while (!flips[flips.length - 1] && flips.length < 200);
    return flips;
  };

  const flipOnce = () => {
    const flips = experiment();
    // Long waits speed up so the whole run lands within a few seconds.
    const gap = Math.min(STAGGER, 3000 / flips.length);
    setStagger(gap);
    setCurrent(flips);
    setRound((r) => r + 1);
    setFlipping(true);
    timer.current = setTimeout(
      () => {
        setFlipping(false);
        setWaits((w) => [...w, flips.length]);
      },
      (flips.length - 1) * gap + FLIP_MS,
    );
  };

  const runMany = (times: number) => {
    setCurrent([]);
    setWaits((w) =>
      w.concat(Array.from({ length: times }, () => experiment().length)),
    );
  };

  const reset = () => {
    clearTimeout(timer.current);
    setWaits([]);
    setCurrent([]);
    setFlipping(false);
  };

  // Bins 1 … BINS-1, and a last bin for "BINS or more".
  const counts = Array(BINS).fill(0);
  waits.forEach((k) => counts[Math.min(k, BINS) - 1]++);
  const total = waits.length;
  const observed = counts.map((c) => (total ? c / total : 0));
  const exact = counts.map((_, i) =>
    i < BINS - 1 ? (1 - bias) ** i * bias : (1 - bias) ** (BINS - 1),
  );
  const yMax = Math.max(...exact, ...observed) * 1.12;
  const slot = IW / BINS;
  const sx = (i: number) => PAD.left + i * slot + slot / 2;
  const sy = (v: number) => PAD.top + IH * (1 - v / yMax);
  const mean = total ? waits.reduce((s, k) => s + k, 0) / total : null;
  const landed = current.length > 0 && !flipping;
  const k = current.length;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">
              Flip until the first head, and count every flip including that
              one.
            </p>
            <p className="font-mono text-sm tabular-nums">
              {landed ? (
                <span className="anim-pop-in inline-block">
                  took <span style={{ color: HEADS }}>{k}</span> flip
                  {k > 1 ? "s" : ""}
                </span>
              ) : (
                <span className="text-muted">
                  {flipping ? "flipping…" : "ready"}
                </span>
              )}
            </p>
          </div>
          <div className="flex min-h-[84px] flex-wrap items-end gap-2 pt-7">
            {current.length === 0 && <Coin face={-1} delay={0} />}
            {current.map((f, i) => (
              <Coin key={`${round}-${i}`} face={f} delay={i * stagger} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span
                className="size-3 rounded-[3px]"
                style={{ background: OBSERVED }}
              />
              Your experiments ({total})
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ background: EXACT }}
              />
              Exact Geometric({bias.toFixed(2)})
            </span>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label="Histogram of flips needed against the Geometric PMF"
          >
            {counts.map((_, i) => (
              <g key={i}>
                <rect
                  x={sx(i) - slot * 0.38}
                  y={sy(observed[i])}
                  width={slot * 0.76}
                  height={Math.max(0, sy(0) - sy(observed[i]))}
                  rx={3}
                  fill={
                    landed && Math.min(k, BINS) - 1 === i ? HEADS : OBSERVED
                  }
                  className="transition-all duration-300"
                />
                <line
                  x1={sx(i)}
                  x2={sx(i)}
                  y1={sy(exact[i])}
                  y2={sy(0)}
                  stroke={EXACT}
                  opacity={0.35}
                />
                <circle cx={sx(i)} cy={sy(exact[i])} r={3.5} fill={EXACT} />
                <text
                  x={sx(i)}
                  y={H - 10}
                  textAnchor="middle"
                  className="fill-muted font-mono text-[10px]"
                >
                  {i < BINS - 1 ? i + 1 : `${BINS}+`}
                </text>
              </g>
            ))}
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={sy(0)}
              y2={sy(0)}
              stroke="var(--muted)"
              opacity={0.6}
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Experiments" value={String(total)} />
          <Stat
            label="Average wait"
            value={mean === null ? "none yet" : mean.toFixed(2)}
          />
          <Stat label="Expected 1/p" value={(1 / bias).toFixed(2)} />
          <Stat
            label="Longest wait"
            value={total ? String(Math.max(...waits)) : "none yet"}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Flip">
          <div className="space-y-3">
            <Button
              className="w-full"
              variant="accent"
              onClick={flipOnce}
              disabled={flipping}
            >
              <Coins className="size-4" /> Flip until heads
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                onClick={() => runMany(100)}
                disabled={flipping}
              >
                Run 100 more
              </Button>
              <Button
                size="sm"
                onClick={() => runMany(1000)}
                disabled={flipping}
              >
                Run 1,000 more
              </Button>
            </div>
            <Button className="w-full" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Clear the histogram
            </Button>
          </div>
        </Panel>
        <Panel title="The coin">
          <SliderField
            label="Bias: chance of heads"
            value={bias}
            min={0.05}
            max={0.95}
            step={0.01}
            format={(v) => v.toFixed(2)}
            onChange={(v) => {
              setBias(v);
              reset();
            }}
            hint="A coin weighted towards tails makes you wait longer. The tallest bar is always at 1."
          />
        </Panel>
      </div>
    </div>
  );
}
