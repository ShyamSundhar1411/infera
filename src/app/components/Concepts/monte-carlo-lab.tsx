"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { Tex } from "@/components/ui/tex";
import { useThemeVersion } from "@/hooks/useThemeVersion";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Target = "pi" | "curve";

const SIZE = 480;
const MAX_DRAWN = 40000;
const W = 520;
const H = 300;
const PAD = { top: 14, right: 14, bottom: 30, left: 46 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;

const HIT = CLASS_COLORS[1];
const MISS = CLASS_COLORS[0];
const ESTIMATE = "rgb(108, 117, 240)";
const TRUTH = "rgb(240, 101, 84)";

/**
 * Hit-or-miss Monte Carlo. Darts land uniformly in a box of known area; the share
 * that lands under the shape, times the box area, estimates the shape's area.
 */
const TARGETS: Record<Target, { label: string; boxW: number; truth: number; truthTex: string; inside: (x: number, y: number) => boolean; curve: (x: number) => number }> = {
  pi: {
    label: "π from darts",
    boxW: 1,
    truth: Math.PI,
    truthTex: String.raw`\pi \approx 3.14159`,
    // The quarter circle has area π/4 inside the unit square, so the estimate is 4 × hits / n.
    inside: (x, y) => x * x + y * y <= 1,
    curve: (x) => Math.sqrt(Math.max(0, 1 - x * x)),
  },
  curve: {
    label: "Area under a curve",
    boxW: Math.PI,
    truth: 2,
    truthTex: String.raw`\int_0^{\pi} \sin x \, dx = 2`,
    inside: (x, y) => y <= Math.sin(x),
    curve: (x) => Math.sin(x),
  },
};

// The box has height 1, so its area is its width; scale the hit rate by that.
const scale = (t: Target) => (t === "pi" ? 4 : TARGETS[t].boxW);

export default function MonteCarloLab() {
  const [target, setTarget] = useState<Target>("pi");
  const [auto, setAuto] = useState(false);
  const [snap, setSnap] = useState({ n: 0, hits: 0, history: [] as [number, number][] });
  const theme = useThemeVersion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rand = useRef(createRandom(71));
  const stats = useRef({ n: 0, hits: 0 });
  const darts = useRef<{ x: number; y: number; hit: boolean }[]>([]);
  const drawn = useRef(0);
  const history = useRef<[number, number][]>([]);
  const nextMark = useRef(1);
  const pending = useRef(0);
  const autoRef = useRef(false);

  const spec = TARGETS[target];
  // Render reads this copy; the loop mutates the refs.
  const publish = () => setSnap({ ...stats.current, history: history.current.slice() });

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    // Shade the region being measured, then outline it.
    ctx.beginPath();
    ctx.moveTo(0, SIZE);
    for (let i = 0; i <= 200; i++) {
      const x = (i / 200) * spec.boxW;
      ctx.lineTo((i / 200) * SIZE, SIZE - spec.curve(x) * SIZE);
    }
    ctx.lineTo(SIZE, SIZE);
    ctx.closePath();
    ctx.fillStyle = rgb(HIT, 0.08);
    ctx.fill();
    drawn.current = 0;
    drawNew();
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = (i / 200) * spec.boxW;
      const px = (i / 200) * SIZE;
      const py = SIZE - spec.curve(x) * SIZE;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = css.getPropertyValue("--plot-ink").trim() || "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = css.getPropertyValue("--plot-axis").trim();
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, SIZE - 1, SIZE - 1);
  };

  // Paint only the darts that have not been painted yet.
  const drawNew = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const all = darts.current;
    const r = all.length > 5000 ? 1.4 : 2.2;
    for (let i = drawn.current; i < all.length; i++) {
      const d = all[i];
      ctx.fillStyle = rgb(d.hit ? HIT : MISS, 0.75);
      ctx.beginPath();
      ctx.arc((d.x / spec.boxW) * SIZE, SIZE - d.y * SIZE, r, 0, Math.PI * 2);
      ctx.fill();
    }
    drawn.current = all.length;
  };

  const throwDarts = (count: number) => {
    const s = stats.current;
    for (let i = 0; i < count; i++) {
      const x = rand.current.next() * spec.boxW;
      const y = rand.current.next();
      const hit = spec.inside(x, y);
      s.n++;
      if (hit) s.hits++;
      if (darts.current.length < MAX_DRAWN) darts.current.push({ x, y, hit });
      // Log-spaced checkpoints keep the convergence chart light at any n.
      if (s.n >= nextMark.current) {
        history.current.push([s.n, (scale(target) * s.hits) / s.n]);
        nextMark.current = Math.max(s.n + 1, Math.ceil(s.n * 1.04));
      }
    }
  };

  const clear = () => {
    stats.current = { n: 0, hits: 0 };
    darts.current = [];
    history.current = [];
    nextMark.current = 1;
    pending.current = 0;
    setAuto(false);
    redraw();
    publish();
  };

  useEffect(() => {
    autoRef.current = auto;
  }, [auto]);

  // A full repaint whenever the target or the theme changes.
  useEffect(() => {
    redraw();
    // redraw reads the current target through closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, theme]);

  // One loop throws whatever is queued, a slice per frame, so big batches visibly rain down.
  useEffect(() => {
    let id = 0;
    const tick = () => {
      let batch = 0;
      if (pending.current > 0) {
        batch = Math.max(1, Math.ceil(pending.current / 30));
        pending.current -= batch;
      }
      if (autoRef.current) batch += 25;
      if (batch > 0) {
        throwDarts(batch);
        drawNew();
        publish();
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const { n, hits } = snap;
  const k = scale(target);
  const estimate = n ? (k * hits) / n : null;
  const pHat = n ? hits / n : 0;
  const se = n ? k * Math.sqrt((pHat * (1 - pHat)) / n) : null;
  const pTrue = spec.truth / k;
  const seTrue = (m: number) => k * Math.sqrt((pTrue * (1 - pTrue)) / m);

  // Convergence chart: log scale on n.
  const nMax = Math.max(100, n);
  const lx = (m: number) => PAD.left + (Math.log10(m) / Math.log10(nMax)) * IW;
  const spread = k * 0.5;
  const yLo = spec.truth - spread;
  const yHi = spec.truth + spread;
  const ly = (v: number) => PAD.top + IH * (1 - (Math.min(yHi, Math.max(yLo, v)) - yLo) / (yHi - yLo));
  const bandXs = Array.from({ length: 60 }, (_, i) => 10 ** ((i / 59) * Math.log10(nMax)));
  const band =
    bandXs.map((m, i) => `${i ? "L" : "M"}${lx(m).toFixed(1)},${ly(spec.truth + 2 * seTrue(m)).toFixed(1)}`).join("") +
    [...bandXs].reverse().map((m) => `L${lx(m).toFixed(1)},${ly(spec.truth - 2 * seTrue(m)).toFixed(1)}`).join("") +
    "Z";
  const path = snap.history.map(([m, v], i) => `${i ? "L" : "M"}${lx(m).toFixed(1)},${ly(v).toFixed(1)}`).join("");
  const decades = Array.from({ length: Math.floor(Math.log10(nMax)) + 1 }, (_, i) => 10 ** i);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div>
            <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
              <Key color={rgb(HIT)} label={`${target === "pi" ? "Inside the circle" : "Under the curve"} (${hits})`} />
              <Key color={rgb(MISS)} label={`${target === "pi" ? "Outside it" : "Above it"} (${n - hits})`} />
            </div>
            <canvas ref={canvasRef} className="aspect-square w-full rounded-lg" aria-label="Darts thrown at random into the box" />
            <p className="mt-2 px-1 font-mono text-[11px] text-muted">
              box: {spec.boxW === 1 ? "1 × 1" : "π × 1"}, area {spec.boxW === 1 ? "1" : "3.1416"}
            </p>
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
              <Key color={ESTIMATE} label="Running estimate" />
              <Key color={TRUTH} label="True value" dashed />
              <Key color="rgba(240, 101, 84, 0.25)" label="truth ± 2 standard errors" />
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Running estimate against the number of darts">
              <path d={band} fill="rgba(240, 101, 84, 0.12)" />
              {decades.map((d) => (
                <g key={d}>
                  <line x1={lx(d)} x2={lx(d)} y1={PAD.top} y2={PAD.top + IH} stroke="var(--line)" />
                  <text x={lx(d)} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                    {d >= 1000 ? `${d / 1000}k` : d}
                  </text>
                </g>
              ))}
              {[yLo, spec.truth, yHi].map((v) => (
                <text key={v} x={PAD.left - 6} y={ly(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                  {v.toFixed(2)}
                </text>
              ))}
              <line x1={PAD.left} x2={W - PAD.right} y1={ly(spec.truth)} y2={ly(spec.truth)} stroke={TRUTH} strokeDasharray="5 4" strokeWidth={1.5} />
              {path && <path d={path} fill="none" stroke={ESTIMATE} strokeWidth={2} />}
              <text x={W - PAD.right} y={H - 10} textAnchor="end" className="fill-muted text-[10px]">
                darts (log scale)
              </text>
            </svg>
            <div className="mt-2 overflow-x-auto px-1 text-[15px]">
              <Tex display>
                {estimate === null
                  ? String.raw`\text{estimate} = ${target === "pi" ? "4" : String.raw`\pi`} \times \frac{\text{hits}}{n}`
                  : String.raw`${target === "pi" ? "4" : String.raw`\pi`} \times \frac{${hits}}{${n}} = ${estimate.toFixed(4)}`}
              </Tex>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
          <Stat label="Darts" value={n.toLocaleString()} />
          <Stat label="Hits" value={hits.toLocaleString()} />
          <Stat label="Estimate" value={estimate === null ? "none yet" : estimate.toFixed(4)} />
          <Stat label="Error" value={estimate === null ? "none yet" : (estimate - spec.truth).toFixed(4)} />
          <Stat label="Standard error" value={se === null ? "none yet" : se.toFixed(4)} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="What to measure">
          <div className="space-y-3">
            <Segmented
              value={target}
              options={(Object.keys(TARGETS) as Target[]).map((t) => ({ value: t, label: TARGETS[t].label }))}
              onChange={(t) => {
                setTarget(t);
                stats.current = { n: 0, hits: 0 };
                darts.current = [];
                history.current = [];
                nextMark.current = 1;
                pending.current = 0;
                setAuto(false);
                setSnap({ n: 0, hits: 0, history: [] });
              }}
              size="sm"
            />
            <p className="text-sm text-muted">
              The answer you are chasing: <Tex>{spec.truthTex}</Tex>
            </p>
          </div>
        </Panel>
        <Panel title="Throw">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 100, 10000].map((c) => (
                <Button key={c} size="sm" variant={c === 1 ? "accent" : "outline"} onClick={() => (pending.current += c)}>
                  {c.toLocaleString()}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setAuto((v) => !v)}>
              {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
              {auto ? "Stop throwing" : "Keep throwing"}
            </Button>
            <Button className="w-full" variant="ghost" onClick={clear}>
              <RotateCcw className="size-4" /> Clear the board
            </Button>
            <p className="text-xs leading-relaxed text-muted">
              Every dart lands uniformly at random in the box. The share that lands under the curve, times the box&apos;s area, estimates the area under the curve.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Key({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-4 rounded-sm" style={dashed ? { borderTop: `2px dashed ${color}`, height: 0 } : { background: color }} />
      {label}
    </span>
  );
}
