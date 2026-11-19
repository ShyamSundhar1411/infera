"use client";

import { useMemo, useRef, useState } from "react";
import { Layers, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { solveLinear } from "@/lib/ml/math";
import { createRandom, type Random } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

interface TrainingSet {
  xs: number[];
  ys: number[];
}

const W = 680;
const H = 320;
const PAD = { top: 14, right: 14, bottom: 24, left: 14 };
const Y_LIM = 1.8;
const GRID = Array.from({ length: 61 }, (_, i) => -1 + (2 * i) / 60);
const MAX_SETS = 200;
const MAX_DEGREE = 12;
const CURVE_SETS = 40;

const FIT = rgb(CLASS_COLORS[2], 0.18);
const AVERAGE = rgb(CLASS_COLORS[2]);
const TRUTH = rgb(CLASS_COLORS[0]);
const POINT = rgb(CLASS_COLORS[3]);
const BIAS = rgb(CLASS_COLORS[0]);
const VARIANCE = rgb(CLASS_COLORS[2]);
const NOISE = "var(--muted)";

const truth = (x: number) => Math.sin(Math.PI * x);

/** Legendre polynomials P_0..P_d at x: far better conditioned on [-1, 1] than raw powers. */
const legendre = (x: number, d: number) => {
  const p = [1, x];
  for (let k = 1; k < d; k++) p.push(((2 * k + 1) * x * p[k] - k * p[k - 1]) / (k + 1));
  return p.slice(0, d + 1);
};

/** Least squares in the Legendre basis, with a whisper of ridge so too few points still give an answer. */
const fit = ({ xs, ys }: TrainingSet, d: number) => {
  const A = Array.from({ length: d + 1 }, () => Array(d + 1).fill(0));
  const b = Array(d + 1).fill(0);
  xs.forEach((x, i) => {
    const phi = legendre(x, d);
    for (let r = 0; r <= d; r++) {
      b[r] += phi[r] * ys[i];
      for (let c = 0; c <= d; c++) A[r][c] += phi[r] * phi[c];
    }
  });
  for (let r = 0; r <= d; r++) A[r][r] += 1e-6 * xs.length;
  const w = solveLinear(A, b);
  return (x: number) => legendre(x, d).reduce((s, v, i) => s + v * w[i], 0);
};

const makeSet = (r: Random, n: number, noise: number): TrainingSet => {
  const xs = Array.from({ length: n }, () => -1 + 2 * r.next());
  return { xs, ys: xs.map((x) => truth(x) + noise * r.gaussian()) };
};

/** Bias², variance and noise of a degree-d fit, averaged over the x grid. */
const decompose = (sets: TrainingSet[], d: number, noise: number) => {
  const preds = sets.map((s) => {
    const f = fit(s, d);
    return GRID.map(f);
  });
  const avg = GRID.map((_, j) => preds.reduce((s, p) => s + p[j], 0) / preds.length);
  const bias2 = GRID.reduce((s, x, j) => s + (avg[j] - truth(x)) ** 2, 0) / GRID.length;
  const variance =
    preds.length > 1 ? GRID.reduce((s, _, j) => s + preds.reduce((t, p) => t + (p[j] - avg[j]) ** 2, 0) / preds.length, 0) / GRID.length : 0;
  return { preds, avg, bias2, variance, noise: noise * noise };
};

/** Fit the same model to many training sets: their spread is variance, their average's miss is bias. */
export default function BiasVarianceLab() {
  const [degree, setDegree] = useState(3);
  const [noise, setNoise] = useState(0.3);
  const [n, setN] = useState(15);
  const [sets, setSets] = useState<TrainingSet[]>(() => {
    const r = createRandom(3);
    return Array.from({ length: 20 }, () => makeSet(r, 15, 0.3));
  });
  const rand = useRef(createRandom(43));

  const add = (count: number) =>
    setSets((s) => [...s, ...Array.from({ length: count }, () => makeSet(rand.current, n, noise))].slice(-MAX_SETS));
  const restart = (size = n, sd = noise) => setSets(Array.from({ length: 20 }, () => makeSet(rand.current, size, sd)));

  const { preds, avg, bias2, variance, noise: noiseVar } = useMemo(() => decompose(sets, degree, noise), [sets, degree, noise]);
  const total = bias2 + variance + noiseVar;

  // Expected test error for every degree, from a fixed batch of simulated training sets.
  const curve = useMemo(() => {
    const r = createRandom(71);
    const batch = Array.from({ length: 60 }, () => makeSet(r, n, noise));
    return Array.from({ length: MAX_DEGREE + 1 }, (_, d) => {
      const c = decompose(batch, d, noise);
      return { d, bias2: c.bias2, variance: c.variance, total: c.bias2 + c.variance + c.noise };
    });
  }, [n, noise]);

  const sx = (x: number) => PAD.left + ((x + 1) / 2) * (W - PAD.left - PAD.right);
  const sy = (y: number) => PAD.top + ((Y_LIM - Math.max(-Y_LIM, Math.min(Y_LIM, y))) / (2 * Y_LIM)) * (H - PAD.top - PAD.bottom);
  const path = (ys: number[]) => ys.map((y, j) => `${j ? "L" : "M"}${sx(GRID[j]).toFixed(1)},${sy(y).toFixed(1)}`).join("");
  const latest = sets[sets.length - 1];

  // Test error vs degree chart.
  const CW = 320;
  const CH = 200;
  const cMax = Math.min(Math.max(...curve.map((c) => c.total)) * 1.05, Math.max(noiseVar * 6, 0.4));
  const cx = (d: number) => 28 + (d / MAX_DEGREE) * (CW - 40);
  const cy = (v: number) => CH - 24 - (Math.min(v, cMax) / cMax) * (CH - 40);
  const cPath = (key: "total" | "bias2" | "variance") => curve.map((c, i) => `${i ? "L" : "M"}${cx(c.d).toFixed(1)},${cy(c[key]).toFixed(1)}`).join("");
  const best = curve.reduce((a, b) => (b.total < a.total ? b : a));

  const barMax = Math.max(total, 0.05);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4" style={{ background: FIT }} />
              Fits to {Math.min(sets.length, CURVE_SETS)} of {sets.length} training sets
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4" style={{ background: AVERAGE }} />
              Average fit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4" style={{ borderTop: `2px dashed ${TRUTH}` }} />
              Truth
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: POINT }} />
              Latest training set
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Polynomial fits to many training sets">
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--line)" />
            {preds.slice(-CURVE_SETS).map((p, i) => (
              <path key={i} d={path(p)} fill="none" stroke={FIT} strokeWidth={1.5} />
            ))}
            <path d={path(GRID.map(truth))} fill="none" stroke={TRUTH} strokeWidth={2} strokeDasharray="6 5" />
            <path d={path(avg)} fill="none" stroke={AVERAGE} strokeWidth={3} />
            {latest?.xs.map((x, i) => (
              <circle key={`${sets.length}-${i}`} className="anim-pop-in" cx={sx(x)} cy={sy(latest.ys[i])} r={4.5} fill={POINT} stroke="var(--surface)" strokeWidth={1.5} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            ))}
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-3 text-[11px] text-muted">Expected error on a new point, split into its three parts</p>
            <div className="flex h-8 overflow-hidden rounded-lg bg-surface-2">
              {[
                { v: bias2, c: BIAS },
                { v: variance, c: VARIANCE },
                { v: noiseVar, c: NOISE },
              ].map(({ v, c }, i) => (
                <div key={i} className="h-full transition-all duration-500" style={{ width: `${(v / barMax) * 100}%`, background: c, opacity: i === 2 ? 0.45 : 0.85 }} />
              ))}
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-xs tabular-nums">
              <Row color={BIAS} label="bias²" value={bias2} />
              <Row color={VARIANCE} label="variance" value={variance} />
              <Row color={NOISE} label="noise σ²" value={noiseVar} faded />
              <div className="flex justify-between border-t border-line pt-1.5">
                <span className="font-sans text-muted">total</span>
                <span>{total.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-1 text-[11px] text-muted">Error vs polynomial degree (60 simulated training sets)</p>
            <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img" aria-label="Test error against model complexity">
              <line x1={28} x2={CW - 12} y1={cy(noiseVar)} y2={cy(noiseVar)} stroke={NOISE} strokeDasharray="3 4" opacity={0.6} />
              <path d={cPath("bias2")} fill="none" stroke={BIAS} strokeWidth={1.5} opacity={0.7} />
              <path d={cPath("variance")} fill="none" stroke={VARIANCE} strokeWidth={1.5} opacity={0.7} />
              <path d={cPath("total")} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
              <line x1={cx(degree)} x2={cx(degree)} y1={10} y2={CH - 24} stroke={POINT} strokeWidth={2} />
              <circle cx={cx(best.d)} cy={cy(best.total)} r={4} fill="var(--ink)" />
              {curve.map((c) => (
                <text key={c.d} x={cx(c.d)} y={CH - 8} textAnchor="middle" className="fill-muted font-mono text-[9px]">
                  {c.d}
                </text>
              ))}
            </svg>
            <p className="text-[11px] text-muted">
              Black: total error. Lowest at degree {best.d}. The orange line is your degree.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Degree" value={String(degree)} />
          <Stat label="Training sets" value={String(sets.length)} />
          <Stat label="Points per set" value={String(n)} />
          <Stat label="Verdict" value={degree < best.d - 1 ? "underfitting" : degree > best.d + 2 ? "overfitting" : "about right"} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Training sets">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={() => add(1)}>
              <Plus className="size-4" /> Draw 1 training set
            </Button>
            <Button className="w-full" size="sm" onClick={() => add(20)}>
              <Layers className="size-3.5" /> Draw 20 more
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => restart()}>
              <RotateCcw className="size-4" /> Start over
            </Button>
          </div>
        </Panel>
        <Panel title="The model">
          <SliderField
            label="Polynomial degree"
            value={degree}
            min={0}
            max={MAX_DEGREE}
            step={1}
            onChange={setDegree}
            hint="0 is a flat line, 1 a straight line, 12 bends almost anywhere it likes."
          />
        </Panel>
        <Panel title="The data">
          <div className="space-y-5">
            <SliderField
              label="Noise (σ)"
              value={noise}
              min={0.05}
              max={0.8}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => {
                setNoise(v);
                restart(n, v);
              }}
              hint="How far each point scatters from the true sine curve. Nothing can predict this part."
            />
            <SliderField
              label="Points per training set"
              value={n}
              min={6}
              max={80}
              step={1}
              onChange={(v) => {
                setN(v);
                restart(v, noise);
              }}
              hint="More data tames variance, so complex models become safe."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Row({ color, label, value, faded }: { color: string; label: string; value: number; faded?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 font-sans text-muted">
        <span className="size-2.5 rounded-[3px]" style={{ background: color, opacity: faded ? 0.45 : 0.85 }} />
        {label}
      </span>
      <span>{value.toFixed(3)}</span>
    </div>
  );
}
