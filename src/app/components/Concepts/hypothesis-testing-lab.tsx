"use client";

import { useMemo, useRef, useState } from "react";
import { Coins, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { binomialPmf, binomialTestP } from "@/lib/stats/inference";
import { Stat } from "./coin-flip-lab";

const W = 680;
const H = 240;
const PAD = { top: 16, right: 12, bottom: 30, left: 12 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const P_BINS = 20;

const HEADS = rgb(CLASS_COLORS[2]);
const REJECT = rgb(CLASS_COLORS[0]);
const KEEP = "rgba(108, 117, 240, 0.3)";

/** Is this coin fair? Flip it, compute a p-value, and see how often the test is fooled. */
export default function HypothesisTestingLab() {
  const [n, setN] = useState(50);
  const [fair, setFair] = useState(true);
  const [bias, setBias] = useState(0.62);
  const [alpha, setAlpha] = useState(0.05);
  const [flips, setFlips] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [pValues, setPValues] = useState<number[]>([]);
  const rand = useRef(createRandom(83));

  const trueP = fair ? 0.5 : bias;
  // p-value for every possible head count, so the test and the rejection region agree exactly.
  const pOf = useMemo(() => Array.from({ length: n + 1 }, (_, k) => binomialTestP(k, n)), [n]);
  const nullPmf = useMemo(() => Array.from({ length: n + 1 }, (_, k) => binomialPmf(k, n, 0.5)), [n]);

  const flipOnce = () => {
    setFlips(Array.from({ length: n }, () => (rand.current.next() < trueP ? 1 : 0)));
    setRound((r) => r + 1);
  };

  const runMany = () => {
    const ps = Array.from({ length: 1000 }, () => {
      let k = 0;
      for (let i = 0; i < n; i++) if (rand.current.next() < trueP) k++;
      return pOf[k];
    });
    setPValues((old) => old.concat(ps));
  };

  const reset = () => {
    setFlips([]);
    setPValues([]);
  };
  const change = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    reset();
  };

  const heads = flips.reduce((s, f) => s + f, 0);
  const has = flips.length > 0;
  const p = has ? pOf[heads] : null;
  const rejected = p !== null && p <= alpha;
  const z = has ? (heads - n / 2) / Math.sqrt(n / 4) : 0;
  const outcome = !has
    ? null
    : rejected
      ? fair
        ? { label: "Type I error: a false alarm. The coin really is fair.", good: false }
        : { label: "Correct: the coin really is biased.", good: true }
      : fair
        ? { label: "Correct: the coin really is fair.", good: true }
        : { label: "Type II error: the coin is biased, but the test missed it.", good: false };

  const yMax = Math.max(...nullPmf) * 1.12;
  const slot = IW / (n + 1);
  const sx = (k: number) => PAD.left + k * slot + slot / 2;
  const sy = (v: number) => PAD.top + IH * (1 - v / yMax);
  const rejectMass = nullPmf.reduce((s, v, k) => s + (pOf[k] <= alpha ? v : 0), 0);

  const bins = Array(P_BINS).fill(0);
  pValues.forEach((v) => bins[Math.min(P_BINS - 1, Math.floor(v * P_BINS))]++);
  const binMax = Math.max(...bins, 1);
  const below = pValues.filter((v) => v <= alpha).length;
  const rate = pValues.length ? below / pValues.length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">
              Null hypothesis: the coin is fair. {n} flips per experiment.
            </p>
            {has && (
              <p key={round} className="anim-pop-in font-mono text-sm tabular-nums">
                <span style={{ color: HEADS }}>{heads}</span> heads · {n - heads} tails
              </p>
            )}
          </div>
          <div className="flex min-h-[40px] flex-wrap gap-1" aria-label="The flips">
            {!has && <span className="text-sm text-muted">Flip the coin to run one experiment.</span>}
            {flips.map((f, i) => (
              <span
                key={`${round}-${i}`}
                className="anim-pop-in size-3.5 rounded-full"
                style={{ animationDelay: `${Math.min(i * 8, 600)}ms`, background: f ? HEADS : "var(--surface-2)", border: f ? "none" : "1px solid var(--line)" }}
                title={f ? "heads" : "tails"}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-[3px]" style={{ background: KEEP }} />
              Head counts a fair coin gives (null distribution)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-[3px]" style={{ background: REJECT }} />
              Rejection region: {(rejectMass * 100).toFixed(1)}% of a fair coin&apos;s results
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Null distribution of head counts with the rejection region">
            {nullPmf.map((v, k) => (
              <rect
                key={k}
                x={sx(k) - slot * 0.4}
                y={sy(v)}
                width={slot * 0.8}
                height={Math.max(0, sy(0) - sy(v))}
                rx={Math.min(3, slot * 0.2)}
                fill={pOf[k] <= alpha ? REJECT : KEEP}
                opacity={pOf[k] <= alpha ? 0.75 : 1}
              />
            ))}
            {has && (
              <g key={round} className="anim-pop-in" style={{ transformBox: "fill-box", transformOrigin: "bottom" }}>
                <line x1={sx(heads)} x2={sx(heads)} y1={PAD.top} y2={sy(0)} stroke="var(--ink)" strokeWidth={2} />
                <text x={sx(heads)} y={PAD.top + 10} textAnchor={heads > n * 0.8 ? "end" : "start"} dx={heads > n * 0.8 ? -6 : 6} className="fill-ink font-mono text-[11px]">
                  you got {heads}
                </text>
              </g>
            )}
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
            {[0, Math.round(n / 4), Math.round(n / 2), Math.round((3 * n) / 4), n].map((k) => (
              <text key={k} x={sx(k)} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                {k}
              </text>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Heads" value={has ? `${heads} of ${n}` : "no flips yet"} />
          <Stat label="z score" value={has ? z.toFixed(2) : "none yet"} />
          <Stat label="p-value" value={p === null ? "none yet" : p < 0.0001 ? "< 0.0001" : p.toFixed(4)} />
          <Stat label="Verdict" value={p === null ? "none yet" : rejected ? "reject fair" : "keep fair"} />
        </div>
        {outcome && (
          <p key={`o-${round}`} className="anim-pop-in px-1 text-sm" style={{ color: outcome.good ? "var(--ink)" : REJECT }}>
            {outcome.label}
          </p>
        )}

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 px-1">
            <p className="text-[11px] text-muted">p-values from many experiments</p>
            {pValues.length > 0 && (
              <p className="font-mono text-xs tabular-nums">
                {below} of {pValues.length} rejected ({(rate * 100).toFixed(1)}%):{" "}
                <span className="text-muted">{fair ? "false alarms" : "power"}</span>
              </p>
            )}
          </div>
          {pValues.length === 0 ? (
            <p className="px-1 py-6 text-sm text-muted">Press Run 1,000 experiments to see how p-values are spread out.</p>
          ) : (
            <svg viewBox={`0 0 ${W} 180`} className="w-full" role="img" aria-label="Histogram of p-values">
              {bins.map((c, i) => {
                const x = PAD.left + (i / P_BINS) * IW;
                const h = (c / binMax) * 140;
                return <rect key={i} x={x + 1} y={150 - h} width={IW / P_BINS - 2} height={h} rx={2} fill={(i + 0.5) / P_BINS <= alpha ? REJECT : KEEP} />;
              })}
              <line x1={PAD.left + alpha * IW} x2={PAD.left + alpha * IW} y1={4} y2={150} stroke="var(--ink)" strokeDasharray="4 3" />
              <text x={PAD.left + alpha * IW + 5} y={14} className="fill-ink font-mono text-[10px]">
                α = {alpha.toFixed(2)}
              </text>
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <text key={t} x={PAD.left + t * IW} y={168} textAnchor={t === 0 ? "start" : t === 1 ? "end" : "middle"} className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
              ))}
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Experiment">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={flipOnce}>
              <Coins className="size-4" /> Flip {n} times
            </Button>
            <Button className="w-full" size="sm" onClick={runMany}>
              Run 1,000 experiments
            </Button>
            <Button className="w-full" variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" /> Clear
            </Button>
          </div>
        </Panel>
        <Panel title="The test">
          <div className="space-y-5">
            <SliderField label="Flips (n)" value={n} min={10} max={200} step={5} onChange={change(setN)} hint="More flips make small biases detectable." />
            <SliderField
              label="Significance level α"
              value={alpha}
              min={0.01}
              max={0.1}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={change(setAlpha)}
              hint="Reject 'fair' when the p-value is at most this. It is the false-alarm rate you agree to live with."
            />
          </div>
        </Panel>
        <Panel title="The truth">
          <div className="space-y-5">
            <Toggle label="The coin is secretly fair" checked={fair} onChange={change(setFair)} hint="In real life you never get to see this switch." />
            {!fair && (
              <SliderField
                label="Its real chance of heads"
                value={bias}
                min={0.5}
                max={0.8}
                step={0.01}
                format={(v) => v.toFixed(2)}
                onChange={change(setBias)}
              />
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
