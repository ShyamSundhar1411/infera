"use client";

import { useEffect, useRef, useState } from "react";
import { Coins, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { createRandom } from "@/lib/ml/random";
import { lnChoose } from "@/lib/stats/special";

const W = 680;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 30, left: 40 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const STAGGER = 90;
const FLIP_MS = 600;

const HEADS = "rgb(108, 117, 240)";
const OBSERVED = "rgba(108, 117, 240, 0.35)";
const EXACT = "rgb(240, 101, 84)";

const binomialPmf = (k: number, n: number, p: number) =>
  Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));

/** A biased coin flipped n times per experiment; the head counts build up a Binomial(n, p). */
export default function CoinFlipLab({ initialN = 10 }: { initialN?: number }) {
  const [bias, setBias] = useState(0.7);
  const [n, setN] = useState(initialN);
  const [current, setCurrent] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [counts, setCounts] = useState<number[]>(() =>
    Array(initialN + 1).fill(0),
  );
  const rand = useRef(createRandom(23));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const reset = (nextN = n) => {
    clearTimeout(timer.current);
    setCounts(Array(nextN + 1).fill(0));
    setCurrent([]);
    setFlipping(false);
  };

  const experiment = (): number[] =>
    Array.from({ length: n }, () => (rand.current.next() < bias ? 1 : 0));
  const record = (heads: number[]) =>
    setCounts((prev) =>
      prev.map((c, k) => c + heads.filter((h) => h === k).length),
    );

  const flipOnce = () => {
    const result = experiment();
    setCurrent(result);
    setRound((r) => r + 1);
    setFlipping(true);
    // Only count the experiment once every coin has landed.
    timer.current = setTimeout(
      () => {
        setFlipping(false);
        record([result.reduce((s, f) => s + f, 0)]);
      },
      (n - 1) * STAGGER + FLIP_MS,
    );
  };

  const runMany = (times: number) => {
    const heads = Array.from({ length: times }, () =>
      experiment().reduce((s, f) => s + f, 0),
    );
    setCurrent([]);
    record(heads);
  };

  const total = counts.reduce((s, c) => s + c, 0);
  const meanHeads = total
    ? counts.reduce((s, c, k) => s + c * k, 0) / total
    : null;
  const exact = counts.map((_, k) => binomialPmf(k, n, bias));
  const observed = counts.map((c) => (total ? c / total : 0));
  const yMax = Math.max(...exact, ...observed) * 1.12;
  const slot = IW / (n + 1);
  const sx = (k: number) => PAD.left + k * slot + slot / 2;
  const sy = (v: number) => PAD.top + IH * (1 - v / yMax);
  const heads = current.reduce((s, f) => s + f, 0);
  const landed = current.length > 0 && !flipping;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">
              One experiment: flip the coin{" "}
              <span className="font-mono text-ink">{n}</span> times and count
              the heads.
            </p>
            <p className="font-mono text-sm tabular-nums">
              {landed ? (
                <span className="anim-pop-in inline-block">
                  k = <span style={{ color: HEADS }}>{heads}</span> heads
                </span>
              ) : (
                <span className="text-muted">
                  {flipping ? "flipping…" : "ready"}
                </span>
              )}
            </p>
          </div>
          <div className="flex min-h-[84px] flex-wrap items-end gap-2 pt-7">
            {(current.length ? current : Array(n).fill(-1)).map((f, i) => (
              <Coin
                key={`${round}-${i}`}
                face={f}
                delay={current.length ? i * STAGGER : 0}
              />
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
              Exact Binomial({n}, {bias.toFixed(2)})
            </span>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label="Histogram of heads per experiment against the Binomial PMF"
          >
            {counts.map((_, k) => (
              <g key={k}>
                <rect
                  x={sx(k) - slot * 0.38}
                  y={sy(observed[k])}
                  width={slot * 0.76}
                  height={Math.max(0, sy(0) - sy(observed[k]))}
                  rx={3}
                  fill={landed && k === heads ? HEADS : OBSERVED}
                  className="transition-all duration-300"
                />
                <line
                  x1={sx(k)}
                  x2={sx(k)}
                  y1={sy(exact[k])}
                  y2={sy(0)}
                  stroke={EXACT}
                  strokeWidth={1}
                  opacity={0.35}
                />
                <circle cx={sx(k)} cy={sy(exact[k])} r={3.5} fill={EXACT} />
                {(n <= 12 || k % 2 === 0) && (
                  <text
                    x={sx(k)}
                    y={H - 10}
                    textAnchor="middle"
                    className="fill-muted font-mono text-[10px]"
                  >
                    {k}
                  </text>
                )}
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
            <text
              x={PAD.left - 6}
              y={PAD.top + 8}
              textAnchor="end"
              className="fill-muted font-mono text-[10px]"
            >
              {yMax.toFixed(2)}
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Experiments" value={String(total)} />
          <Stat
            label="Average heads"
            value={meanHeads === null ? "none yet" : meanHeads.toFixed(2)}
          />
          <Stat label="Expected np" value={(n * bias).toFixed(2)} />
          <Stat
            label="Most likely k"
            value={String(Math.min(n, Math.floor((n + 1) * bias)))}
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
              <Coins className="size-4" /> Flip {n} coin{n > 1 ? "s" : ""}
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
            <Button className="w-full" variant="ghost" onClick={() => reset()}>
              <RotateCcw className="size-4" /> Clear the histogram
            </Button>
          </div>
        </Panel>
        <Panel title="The coin">
          <div className="space-y-5">
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
              hint="0.50 is a fair coin. Anything else is a weighted coin that favours one side."
            />
            <SliderField
              label="Flips per experiment (n)"
              value={n}
              min={1}
              max={24}
              step={1}
              onChange={(v) => {
                setN(v);
                reset(v);
              }}
              hint="With n = 1 this is a Bernoulli trial. Add flips and the bars grow into a bell."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

/** A coin that spins in the air and lands on its face. -1 is a coin still waiting to be flipped. */
export function Coin({ face, delay }: { face: number; delay: number }) {
  const waiting = face < 0;
  return (
    <span
      className={`grid size-10 place-items-center rounded-full border-2 font-mono text-sm font-semibold ${waiting ? "" : "anim-coin-flip"}`}
      style={{
        animationDelay: `${delay}ms`,
        borderColor: waiting ? "var(--line)" : face ? HEADS : "var(--muted)",
        background: waiting
          ? "var(--surface-2)"
          : face
            ? "rgba(108, 117, 240, 0.15)"
            : "var(--surface-2)",
        color: waiting ? "var(--muted)" : face ? HEADS : "var(--muted)",
      }}
    >
      {waiting ? "·" : face ? "H" : "T"}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-4 py-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm tabular-nums">{value}</p>
    </div>
  );
}
