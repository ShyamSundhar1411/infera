"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { createRandom } from "@/lib/ml/random";
import { betaQuantile, lnBeta } from "@/lib/stats/special";

const W = 680;
const H = 340;
const PAD = { top: 16, right: 16, bottom: 34, left: 44 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const MAX_FLIPS = 5000;

const POSTERIOR = "rgb(108, 117, 240)";
const PRIOR = "var(--muted)";
const TRUTH = "rgb(240, 101, 84)";
const MLE = "rgb(38, 166, 154)";

const betaPdf = (x: number, a: number, b: number) =>
  x <= 0 || x >= 1 ? 0 : Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - lnBeta(a, b));

export default function BayesianUpdatingLab() {
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(1);
  const [trueP, setTrueP] = useState(0.7);
  const [reveal, setReveal] = useState(false);
  const [flips, setFlips] = useState<number[]>([]);
  const [auto, setAuto] = useState(false);
  const rand = useRef(createRandom(17));

  const flip = (count: number) =>
    setFlips((prev) =>
      prev.length >= MAX_FLIPS
        ? prev
        : prev.concat(
            Array.from({ length: Math.min(count, MAX_FLIPS - prev.length) }, () =>
              rand.current.next() < trueP ? 1 : 0,
            ),
          ),
    );

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setFlips((prev) => (prev.length >= MAX_FLIPS ? prev : [...prev, rand.current.next() < trueP ? 1 : 0]));
    }, 120);
    return () => clearInterval(id);
  }, [auto, trueP]);

  const reset = () => {
    setFlips([]);
    setAuto(false);
  };

  const heads = flips.reduce((s, f) => s + f, 0);
  const tails = flips.length - heads;
  const a = alpha + heads;
  const b = beta + tails;
  const mean = a / (a + b);
  const lo = betaQuantile(0.025, a, b);
  const hi = betaQuantile(0.975, a, b);
  const mle = flips.length ? heads / flips.length : null;

  const xs = Array.from({ length: 401 }, (_, i) => 0.0005 + (i / 400) * 0.999);
  const post = xs.map((x) => betaPdf(x, a, b));
  const prior = xs.map((x) => betaPdf(x, alpha, beta));
  const peak = Math.max(...post, ...prior.filter(Number.isFinite).map((v) => Math.min(v, 12)), 1);
  const yMax = peak * 1.08;
  const sx = (x: number) => PAD.left + x * IW;
  const sy = (y: number) => PAD.top + IH * (1 - Math.min(y, yMax) / yMax);
  const line = (ys: number[]) => xs.map((x, i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join("");
  const ciIdx = xs.map((x, i) => [x, i] as const).filter(([x]) => x >= lo && x <= hi);
  const ciPath = ciIdx.length
    ? `M${sx(ciIdx[0][0])},${sy(0)}` +
      ciIdx.map(([x, i]) => `L${sx(x).toFixed(1)},${sy(post[i]).toFixed(1)}`).join("") +
      `L${sx(ciIdx[ciIdx.length - 1][0])},${sy(0)}Z`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <Key color={POSTERIOR} label={`Posterior Beta(${fmt(a)}, ${fmt(b)})`} />
            <Key color={PRIOR} label={`Prior Beta(${fmt(alpha)}, ${fmt(beta)})`} dashed />
            {mle !== null && <Key color={MLE} label="Frequency h/n" />}
            {reveal && <Key color={TRUTH} label="True bias" />}
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Prior and posterior over the coin's bias">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={PAD.top} y2={sy(0)} stroke="var(--line)" />
                <text x={sx(t)} y={H - 12} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
              </g>
            ))}
            <text x={W - PAD.right - 4} y={PAD.top + 12} textAnchor="end" className="fill-muted text-[10px]">
              p (chance of heads)
            </text>
            <path d={ciPath} fill="rgba(108,117,240,0.18)" />
            <path d={line(prior)} fill="none" stroke={PRIOR} strokeWidth={1.6} strokeDasharray="5 4" />
            <path d={line(post)} fill="none" stroke={POSTERIOR} strokeWidth={2.5} />
            {mle !== null && <line x1={sx(mle)} x2={sx(mle)} y1={PAD.top} y2={sy(0)} stroke={MLE} strokeWidth={1.5} />}
            {reveal && <line x1={sx(trueP)} x2={sx(trueP)} y1={PAD.top} y2={sy(0)} stroke={TRUTH} strokeWidth={2} strokeDasharray="2 3" />}
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Flips" value={`${heads} H · ${tails} T`} />
          <Stat label="Posterior mean" value={mean.toFixed(3)} />
          <Stat label="95% credible interval" value={`${lo.toFixed(3)} to ${hi.toFixed(3)}`} />
          <Stat label="Frequency h/n" value={mle === null ? "no flips yet" : mle.toFixed(3)} />
        </div>

        <div className="flex flex-wrap gap-1 rounded-2xl border border-line bg-surface p-3" aria-label="Most recent flips">
          {flips.length === 0 && <span className="text-sm text-muted">Flip the coin to start collecting evidence.</span>}
          {flips.slice(-80).map((f, i) => (
            <span
              key={i}
              className="grid size-5 place-items-center rounded-full font-mono text-[9px]"
              style={{ background: f ? "rgba(108,117,240,0.2)" : "var(--surface-2)", color: f ? POSTERIOR : "var(--muted)" }}
            >
              {f ? "H" : "T"}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Flip the coin">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 10, 100].map((n) => (
                <Button key={n} size="sm" onClick={() => flip(n)}>
                  Flip {n}
                </Button>
              ))}
            </div>
            <Button className="w-full" variant={auto ? "outline" : "accent"} onClick={() => setAuto((v) => !v)}>
              {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
              {auto ? "Stop flipping" : "Keep flipping"}
            </Button>
            <Button className="w-full" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Start over
            </Button>
          </div>
        </Panel>
        <Panel title="Prior belief">
          <div className="space-y-5">
            <SliderField label="α (imagined heads)" value={alpha} min={0.5} max={20} step={0.5} onChange={setAlpha} />
            <SliderField label="β (imagined tails)" value={beta} min={0.5} max={20} step={0.5} onChange={setBeta} />
          </div>
        </Panel>
        <Panel
          title="Hidden coin"
          action={
            <Button size="sm" variant="ghost" onClick={() => setReveal((v) => !v)}>
              {reveal ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              {reveal ? "Hide" : "Reveal"}
            </Button>
          }
        >
          {reveal ? (
            <SliderField
              label="True chance of heads"
              value={trueP}
              min={0.01}
              max={0.99}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={(v) => {
                setTrueP(v);
                reset();
              }}
            />
          ) : (
            <p className="text-sm text-muted">The coin&apos;s real bias is hidden, just like in a real experiment.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

function Key({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-0.5 w-4" style={dashed ? { borderTop: `2px dashed ${color}` } : { background: color }} />
      {label}
    </span>
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
