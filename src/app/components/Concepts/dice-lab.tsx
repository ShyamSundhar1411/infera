"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

const W = 680;
const H = 220;
const PAD = { top: 14, right: 14, bottom: 26, left: 40 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const FACES = [1, 2, 3, 4, 5, 6];
const MAX_ROLLS = 20000;

const DIE = "rgb(108, 117, 240)";
const MEAN = "rgb(240, 101, 84)";

// Where the pips sit on a 3 × 3 grid for each face.
const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

/** Roll a fair or loaded die: the face counts flatten out and the running average settles on E[X]. */
export default function DiceLab() {
  const [load, setLoad] = useState(1);
  const [rolls, setRolls] = useState<number[]>([]);
  const [auto, setAuto] = useState(false);
  const [throwId, setThrowId] = useState(0);
  const rand = useRef(createRandom(53));

  const weights = FACES.map((f) => (f === 6 ? load : 1));
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  const probs = weights.map((w) => w / totalWeight);
  const expected = FACES.reduce((s, f, i) => s + f * probs[i], 0);

  const rollOne = () => {
    let u = rand.current.next() * totalWeight;
    for (let i = 0; i < 6; i++) {
      u -= weights[i];
      if (u < 0) return i + 1;
    }
    return 6;
  };
  const roll = (count: number) => {
    setRolls((prev) =>
      prev.length >= MAX_ROLLS
        ? prev
        : prev.concat(
            Array.from(
              { length: Math.min(count, MAX_ROLLS - prev.length) },
              rollOne,
            ),
          ),
    );
    setThrowId((t) => t + 1);
  };

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => roll(1), 160);
    return () => clearInterval(id);
    // roll only depends on the load, which also restarts the interval.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, load]);

  const reset = () => {
    setRolls([]);
    setAuto(false);
  };

  const counts = FACES.map((f) => rolls.filter((r) => r === f).length);
  const n = rolls.length;
  const avg = n ? rolls.reduce((s, r) => s + r, 0) / n : null;
  const last = rolls[rolls.length - 1];

  // Running average, thinned to at most ~400 points.
  const step = Math.max(1, Math.ceil(n / 400));
  const path: [number, number][] = [];
  let sum = 0;
  rolls.forEach((r, i) => {
    sum += r;
    if (i % step === 0 || i === n - 1) path.push([i + 1, sum / (i + 1)]);
  });
  const logX = (i: number) =>
    PAD.left + (Math.log(i) / Math.log(Math.max(n, 10))) * IW;
  const sy = (v: number) => PAD.top + IH * (1 - (v - 1) / 5);
  const line = path
    .map(
      ([i, v], j) =>
        `${j ? "L" : "M"}${logX(i).toFixed(1)},${sy(v).toFixed(1)}`,
    )
    .join("");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center justify-center gap-2 px-4">
            {last ? (
              <DieFace key={throwId} face={last} />
            ) : (
              <div className="size-20 rounded-2xl border-2 border-dashed border-line" />
            )}
            <span className="text-xs text-muted">
              {last ? `rolled a ${last}` : "not rolled yet"}
            </span>
          </div>
          <div className="space-y-2">
            {FACES.map((f, i) => {
              const share = n ? counts[i] / n : 0;
              return (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="w-4 font-mono text-muted">{f}</span>
                  <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(1, share / 0.6) * 100}%`,
                        background: f === last ? DIE : "rgba(108,117,240,0.4)",
                      }}
                    />
                    <span
                      className="absolute inset-y-0 w-0.5"
                      style={{
                        left: `${(probs[i] / 0.6) * 100}%`,
                        background: MEAN,
                      }}
                      title="Expected share"
                    />
                  </div>
                  <span className="w-28 text-right font-mono text-xs tabular-nums text-muted">
                    {counts[i]} · {(share * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
            <p className="pt-1 text-[11px] text-muted">
              Bars are the share of rolls so far. The coral tick is the true
              chance of each face (
              {probs[0] === probs[5] ? "1/6 each" : "loaded"}).
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-2 px-1 text-[11px] text-muted">
            Running average of all rolls (log scale on the roll count)
          </p>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label="Running average of the die rolls"
          >
            {FACES.map((f) => (
              <g key={f}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={sy(f)}
                  y2={sy(f)}
                  stroke="var(--line)"
                />
                <text
                  x={PAD.left - 8}
                  y={sy(f) + 3}
                  textAnchor="end"
                  className="fill-muted font-mono text-[10px]"
                >
                  {f}
                </text>
              </g>
            ))}
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={sy(expected)}
              y2={sy(expected)}
              stroke={MEAN}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <text
              x={W - PAD.right}
              y={sy(expected) + 14}
              textAnchor="end"
              className="font-mono text-[10px]"
              fill={MEAN}
            >
              E[X] = {expected.toFixed(2)}
            </text>
            {path.length > 1 && (
              <path d={line} fill="none" stroke={DIE} strokeWidth={2} />
            )}
            <text
              x={W - PAD.right}
              y={H - 8}
              textAnchor="end"
              className="fill-muted font-mono text-[10px]"
            >
              {n} rolls
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Rolls" value={String(n)} />
          <Stat
            label="Average so far"
            value={avg === null ? "none yet" : avg.toFixed(3)}
          />
          <Stat label="Expected value" value={expected.toFixed(3)} />
          <Stat
            label="Gap"
            value={avg === null ? "none yet" : (avg - expected).toFixed(3)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Roll">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 10, 100].map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={c === 1 ? "accent" : "outline"}
                  onClick={() => roll(c)}
                >
                  Roll {c}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setAuto((v) => !v)}>
              {auto ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
              {auto ? "Stop rolling" : "Keep rolling"}
            </Button>
            <Button size="sm" className="w-full" onClick={() => roll(5000)}>
              Roll 5,000 at once
            </Button>
            <Button className="w-full" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Start over
            </Button>
          </div>
        </Panel>
        <Panel title="The die">
          <SliderField
            label="Weight on the six"
            value={load}
            min={1}
            max={5}
            step={0.5}
            format={(v) => (v === 1 ? "fair" : `${v}×`)}
            onChange={(v) => {
              setLoad(v);
              reset();
            }}
            hint="A loaded die: the six comes up this many times as often as each other face. The average still settles, just on a higher value."
          />
        </Panel>
      </div>
    </div>
  );
}

function DieFace({ face }: { face: number }) {
  return (
    <div
      className="anim-die-roll grid size-20 grid-cols-3 grid-rows-3 gap-1 rounded-2xl border-2 p-3 shadow-md"
      style={{ borderColor: DIE, background: "var(--surface)" }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="m-auto size-3 rounded-full"
          style={{ background: PIPS[face].includes(i) ? DIE : "transparent" }}
        />
      ))}
    </div>
  );
}
