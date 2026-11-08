"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FastForward, Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { useThemeVersion } from "@/hooks/useThemeVersion";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Target = "peaks" | "banana" | "correlated";

const SIZE = 480;
const LIM = 3;
const GRID = 120;
const BINS = 40;
const BURN_IN = 300;
const MAX_SAMPLES = 60000;
const MAX_DOTS = 8000;
const TRAIL = 40;
const START: [number, number] = [-2.5, 2.5];

const HEAT = CLASS_COLORS[2];
const ACCEPT = "rgb(38, 166, 154)";
const REJECT = "rgb(240, 101, 84)";
const SAMPLE = "rgb(232, 170, 50)";

const logSumExp = (a: number, b: number) => {
  const m = Math.max(a, b);
  return m + Math.log(Math.exp(a - m) + Math.exp(b - m));
};

/** Unnormalised log densities: MCMC only ever needs differences of these. */
const TARGETS: Record<Target, { label: string; logp: (x: number, y: number) => number }> = {
  peaks: {
    label: "Two peaks",
    logp: (x, y) =>
      logSumExp(
        -((x + 1.6) ** 2 + (y + 1.2) ** 2) / (2 * 0.4 ** 2),
        -((x - 1.6) ** 2 + (y - 1.2) ** 2) / (2 * 0.4 ** 2),
      ),
  },
  banana: {
    label: "Banana",
    logp: (x, y) => -(x * x) / (2 * 1.2 ** 2) - (y - 0.5 * x * x + 1.2) ** 2 / (2 * 0.3 ** 2),
  },
  correlated: {
    label: "Correlated",
    logp: (x, y) => {
      const rho = 0.95;
      return -(x * x - 2 * rho * x * y + y * y) / (2 * (1 - rho * rho));
    },
  },
};

const toPx = (v: number) => ((v + LIM) / (2 * LIM)) * SIZE;
const toPy = (v: number) => ((LIM - v) / (2 * LIM)) * SIZE;

interface Chain {
  x: number;
  y: number;
  xs: number[];
  ys: number[];
  proposals: number;
  accepted: number;
  trail: [number, number][];
  ghost: { x: number; y: number; accepted: boolean; at: number } | null;
}

const freshChain = (): Chain => ({
  x: START[0],
  y: START[1],
  xs: [START[0]],
  ys: [START[1]],
  proposals: 0,
  accepted: 0,
  trail: [START],
  ghost: null,
});

/** Random-walk Metropolis–Hastings on a 2-D density you can see. */
export default function McmcLab() {
  const [target, setTarget] = useState<Target>("peaks");
  const [step, setStep] = useState(0.5);
  const [speed, setSpeed] = useState(3);
  const [running, setRunning] = useState(false);
  const [burnIn, setBurnIn] = useState(true);
  const [snap, setSnap] = useState({ n: 1, proposals: 0, accepted: 0, xs: [START[0]] as number[] });
  const theme = useThemeVersion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatRef = useRef<HTMLCanvasElement | null>(null);
  const chain = useRef<Chain>(freshChain());
  const rand = useRef(createRandom(83));
  const carry = useRef(0);

  const logp = TARGETS[target].logp;

  // The true marginal of x, by summing the density over a fine grid of y.
  const marginal = useMemo(() => {
    const xs = Array.from({ length: BINS }, (_, i) => -LIM + ((i + 0.5) / BINS) * 2 * LIM);
    const raw = xs.map((x) => {
      let s = 0;
      for (let j = 0; j < 200; j++) s += Math.exp(logp(x, -LIM - 2 + (j / 199) * (2 * LIM + 4)));
      return s;
    });
    const total = raw.reduce((a, b) => a + b, 0) * ((2 * LIM) / BINS);
    return raw.map((v) => v / total);
  }, [logp]);

  const mcStep = () => {
    const c = chain.current;
    const px = c.x + step * rand.current.gaussian();
    const py = c.y + step * rand.current.gaussian();
    c.proposals++;
    const accepted = Math.log(Math.max(rand.current.next(), 1e-300)) < logp(px, py) - logp(c.x, c.y);
    if (accepted) {
      c.x = px;
      c.y = py;
      c.accepted++;
      c.trail.push([px, py]);
      if (c.trail.length > TRAIL) c.trail.shift();
    }
    c.ghost = { x: px, y: py, accepted, at: performance.now() };
    // A rejected proposal still counts: the chain records its current spot again.
    if (c.xs.length < MAX_SAMPLES) {
      c.xs.push(c.x);
      c.ys.push(c.y);
    }
  };

  const publish = () => {
    const c = chain.current;
    setSnap({ n: c.xs.length, proposals: c.proposals, accepted: c.accepted, xs: c.xs.slice() });
  };

  const paintHeat = () => {
    const off = document.createElement("canvas");
    off.width = GRID;
    off.height = GRID;
    const ctx = off.getContext("2d")!;
    const img = ctx.createImageData(GRID, GRID);
    const vals: number[] = [];
    let max = -Infinity;
    for (let j = 0; j < GRID; j++)
      for (let i = 0; i < GRID; i++) {
        const v = logp(-LIM + ((i + 0.5) / GRID) * 2 * LIM, LIM - ((j + 0.5) / GRID) * 2 * LIM);
        vals.push(v);
        if (v > max) max = v;
      }
    vals.forEach((v, k) => {
      const d = Math.exp(v - max);
      img.data[k * 4] = HEAT[0];
      img.data[k * 4 + 1] = HEAT[1];
      img.data[k * 4 + 2] = HEAT[2];
      img.data[k * 4 + 3] = Math.round(d ** 0.7 * 150);
    });
    ctx.putImageData(img, 0, 0);
    heatRef.current = off;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !heatRef.current) return;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(document.documentElement);
    ctx.fillStyle = css.getPropertyValue("--plot-bg").trim() || "#fff";
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(heatRef.current, 0, 0, SIZE, SIZE);
    ctx.strokeStyle = css.getPropertyValue("--plot-grid").trim();
    for (let v = -2; v <= 2; v++) {
      ctx.beginPath();
      ctx.moveTo(toPx(v), 0);
      ctx.lineTo(toPx(v), SIZE);
      ctx.moveTo(0, toPy(v));
      ctx.lineTo(SIZE, toPy(v));
      ctx.stroke();
    }

    const c = chain.current;
    const from = Math.max(0, c.xs.length - MAX_DOTS);
    for (let i = from; i < c.xs.length; i++) {
      const early = burnIn && i < BURN_IN;
      ctx.fillStyle = early ? "rgba(150, 150, 150, 0.35)" : "rgba(232, 170, 50, 0.45)";
      ctx.fillRect(toPx(c.xs[i]) - 1.2, toPy(c.ys[i]) - 1.2, 2.4, 2.4);
    }

    // The recent accepted moves, fading into the past.
    for (let i = 1; i < c.trail.length; i++) {
      ctx.strokeStyle = `rgba(38, 166, 154, ${(0.15 + (0.85 * i) / c.trail.length).toFixed(2)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toPx(c.trail[i - 1][0]), toPy(c.trail[i - 1][1]));
      ctx.lineTo(toPx(c.trail[i][0]), toPy(c.trail[i][1]));
      ctx.stroke();
    }

    // The latest proposal: a hollow ghost, with a red cross flashing if it was turned down.
    const g = c.ghost;
    if (g) {
      const age = (performance.now() - g.at) / 500;
      if (age < 1) {
        ctx.globalAlpha = 1 - age;
        ctx.strokeStyle = g.accepted ? ACCEPT : REJECT;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(toPx(g.x), toPy(g.y), 7, 0, Math.PI * 2);
        ctx.stroke();
        if (!g.accepted) {
          ctx.beginPath();
          ctx.moveTo(toPx(g.x) - 4, toPy(g.y) - 4);
          ctx.lineTo(toPx(g.x) + 4, toPy(g.y) + 4);
          ctx.moveTo(toPx(g.x) + 4, toPy(g.y) - 4);
          ctx.lineTo(toPx(g.x) - 4, toPy(g.y) + 4);
          ctx.stroke();
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(toPx(c.x), toPy(c.y));
          ctx.lineTo(toPx(g.x), toPy(g.y));
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.globalAlpha = 1;
      }
    }

    ctx.fillStyle = css.getPropertyValue("--plot-ink").trim() || "#111";
    ctx.beginPath();
    ctx.arc(toPx(c.x), toPy(c.y), 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = css.getPropertyValue("--plot-point-stroke").trim() || "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const reset = () => {
    chain.current = freshChain();
    carry.current = 0;
    setRunning(false);
    publish();
    draw();
  };

  // A new target or theme repaints the background density.
  useEffect(() => {
    paintHeat();
    draw();
    // paintHeat and draw read the current target and theme through closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, theme]);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burnIn]);

  // The animation loop: a fractional number of steps per frame, so slow speeds crawl.
  useEffect(() => {
    let id = 0;
    let frames = 0;
    const tick = () => {
      if (running) {
        carry.current += speed;
        const steps = Math.floor(carry.current);
        carry.current -= steps;
        for (let i = 0; i < steps; i++) mcStep();
        if (chain.current.xs.length >= MAX_SAMPLES) setRunning(false);
        // Charts are cheaper to refresh a few times a second than every frame.
        if (steps > 0 && (++frames % 3 === 0 || speed < 1)) publish();
      }
      draw();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed, step, target, burnIn]);

  const { n, proposals, accepted, xs } = snap;
  const rate = proposals ? accepted / proposals : null;
  const kept = burnIn ? xs.slice(BURN_IN) : xs;
  const counts = Array(BINS).fill(0);
  kept.forEach((x) => {
    const b = Math.floor(((x + LIM) / (2 * LIM)) * BINS);
    if (b >= 0 && b < BINS) counts[b]++;
  });
  const binW = (2 * LIM) / BINS;
  const density = counts.map((c) => (kept.length ? c / (kept.length * binW) : 0));
  const meanX = kept.length ? kept.reduce((s, x) => s + x, 0) / kept.length : null;
  const trueMean = marginal.reduce((s, d, i) => s + d * (-LIM + (i + 0.5) * binW) * binW, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 px-1 text-[11px] text-muted">
              <Key color={rgb(HEAT, 0.5)} label="Target density" />
              <Key color={SAMPLE} label="Samples" />
              <Key color={ACCEPT} label="Accepted moves" />
              <Key color={REJECT} label="Rejected proposal" />
              {burnIn && <Key color="rgba(150,150,150,0.6)" label={`Burn-in (first ${BURN_IN})`} />}
            </div>
            <canvas ref={canvasRef} className="aspect-square w-full rounded-lg" aria-label="The chain wandering over the target density" />
          </div>
          <div className="min-w-0 space-y-4">
            <TracePlot xs={xs} burnIn={burnIn} />
            <MarginalPlot density={density} truth={marginal} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Iterations" value={(n - 1).toLocaleString()} />
          <Stat label="Acceptance rate" value={rate === null ? "none yet" : `${(rate * 100).toFixed(1)}%`} />
          <Stat label="Mean of x (samples)" value={meanX === null ? "none yet" : meanX.toFixed(3)} />
          <Stat label="Mean of x (true)" value={trueMean.toFixed(3)} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Run the chain">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={running ? "outline" : "accent"} onClick={() => setRunning((r) => !r)}>
                {running ? <Pause className="size-4" /> : <Play className="size-4" />}
                {running ? "Pause" : "Run"}
              </Button>
              <Button
                onClick={() => {
                  setRunning(false);
                  mcStep();
                  publish();
                }}
              >
                <StepForward className="size-4" /> Step once
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                for (let i = 0; i < 5000; i++) mcStep();
                publish();
              }}
            >
              <FastForward className="size-3.5" /> 5,000 steps instantly
            </Button>
            <Button className="w-full" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Reset to the corner
            </Button>
          </div>
        </Panel>
        <Panel title="Target">
          <Segmented
            value={target}
            size="sm"
            options={(Object.keys(TARGETS) as Target[]).map((t) => ({ value: t, label: TARGETS[t].label }))}
            onChange={(t) => {
              setTarget(t);
              chain.current = freshChain();
              setRunning(false);
              setSnap({ n: 1, proposals: 0, accepted: 0, xs: [START[0]] });
            }}
          />
        </Panel>
        <Panel title="Sampler">
          <div className="space-y-5">
            <SliderField
              label="Step size"
              value={step}
              min={0.05}
              max={5}
              step={0.01}
              log
              format={(v) => v.toFixed(2)}
              onChange={setStep}
              hint="The spread of each proposed jump. Too small and the chain crawls; too big and almost every jump is rejected."
            />
            <SliderField
              label="Speed"
              value={speed}
              min={0.1}
              max={200}
              step={0.1}
              log
              format={(v) => `${v < 1 ? v.toFixed(1) : Math.round(v)} steps / frame`}
              onChange={setSpeed}
            />
            <Toggle
              label={`Discard burn-in (first ${BURN_IN})`}
              checked={burnIn}
              onChange={setBurnIn}
              hint="The chain starts in a corner far from the mass. Early samples reflect the start, not the target."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

const PW = 420;
const PH = 150;
const PP = { top: 10, right: 8, bottom: 20, left: 30 };

function TracePlot({ xs, burnIn }: { xs: number[]; burnIn: boolean }) {
  const shown = Math.min(xs.length, 3000);
  const start = xs.length - shown;
  const stride = Math.max(1, Math.ceil(shown / 600));
  const sx = (i: number) => PP.left + ((i - start) / Math.max(1, shown - 1)) * (PW - PP.left - PP.right);
  const sy = (v: number) => PP.top + ((LIM - v) / (2 * LIM)) * (PH - PP.top - PP.bottom);
  let d = "";
  for (let i = start; i < xs.length; i += stride) d += `${d ? "L" : "M"}${sx(i).toFixed(1)},${sy(xs[i]).toFixed(1)}`;
  const burnEnd = burnIn && start < BURN_IN ? sx(Math.min(BURN_IN, xs.length - 1)) : null;
  return (
    <div>
      <p className="mb-1 px-1 text-[11px] text-muted">Trace of x over the last {shown.toLocaleString()} iterations</p>
      <svg viewBox={`0 0 ${PW} ${PH}`} className="w-full" role="img" aria-label="Trace plot of x">
        {burnEnd !== null && <rect x={PP.left} y={PP.top} width={Math.max(0, burnEnd - PP.left)} height={PH - PP.top - PP.bottom} fill="rgba(150,150,150,0.15)" />}
        {[-2, 0, 2].map((v) => (
          <g key={v}>
            <line x1={PP.left} x2={PW - PP.right} y1={sy(v)} y2={sy(v)} stroke="var(--line)" />
            <text x={PP.left - 5} y={sy(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
              {v}
            </text>
          </g>
        ))}
        <path d={d} fill="none" stroke={SAMPLE} strokeWidth={1.2} />
      </svg>
    </div>
  );
}

function MarginalPlot({ density, truth }: { density: number[]; truth: number[] }) {
  const yMax = Math.max(...truth, ...density) * 1.1 || 1;
  const bw = (PW - PP.left - PP.right) / BINS;
  const sx = (i: number) => PP.left + i * bw;
  const sy = (v: number) => PP.top + (1 - v / yMax) * (PH - PP.top - PP.bottom);
  const curve = truth.map((v, i) => `${i ? "L" : "M"}${(sx(i) + bw / 2).toFixed(1)},${sy(v).toFixed(1)}`).join("");
  return (
    <div>
      <p className="mb-1 px-1 text-[11px] text-muted">Histogram of x from the samples, against the true marginal (line)</p>
      <svg viewBox={`0 0 ${PW} ${PH}`} className="w-full" role="img" aria-label="Marginal histogram of x">
        {density.map((v, i) => (
          <rect key={i} x={sx(i) + 0.5} y={sy(v)} width={bw - 1} height={Math.max(0, sy(0) - sy(v))} fill="rgba(232, 170, 50, 0.45)" />
        ))}
        <path d={curve} fill="none" stroke={rgb(HEAT)} strokeWidth={2} />
        <line x1={PP.left} x2={PW - PP.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
        {[-2, 0, 2].map((v) => (
          <text key={v} x={PP.left + ((v + LIM) / (2 * LIM)) * (PW - PP.left - PP.right)} y={PH - 6} textAnchor="middle" className="fill-muted font-mono text-[10px]">
            {v}
          </text>
        ))}
      </svg>
    </div>
  );
}

function Key({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
