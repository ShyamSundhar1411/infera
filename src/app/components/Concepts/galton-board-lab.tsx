"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { lnChoose } from "@/lib/stats/special";
import { Stat } from "./coin-flip-lab";

const ASPECT = 0.78;
const ROWS_PER_SEC = 7;
const MAX_LIVE = 120;

const BALL = CLASS_COLORS[2];
const EXACT = CLASS_COLORS[0];

interface Ball {
  steps: number[];
  t: number;
}

const binomialPmf = (k: number, n: number, p: number) =>
  Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));

/** Balls bounce left or right off each row of pegs; the bins fill into a Binomial, then a bell. */
export default function GaltonBoardLab() {
  const [rows, setRows] = useState(12);
  const [tilt, setTilt] = useState(0.5);
  const [auto, setAuto] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => Array(13).fill(0));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const balls = useRef<Ball[]>([]);
  const countsRef = useRef(counts);
  const rand = useRef(createRandom(71));
  const params = useRef({ rows, tilt, auto });

  useEffect(() => {
    params.current = { rows, tilt, auto };
  }, [rows, tilt, auto]);

  useEffect(() => {
    countsRef.current = counts;
  }, [counts]);

  const reducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const path = (r: number, p: number): number[] => Array.from({ length: r }, () => (rand.current.next() < p ? 1 : 0));
  const land = (bins: number[]) =>
    setCounts((prev) => {
      const next = [...prev];
      bins.forEach((b) => next[b]++);
      return next;
    });

  const drop = () => {
    const { rows: r, tilt: p } = params.current;
    const steps = path(r, p);
    if (reducedMotion()) return land([steps.reduce((s, x) => s + x, 0)]);
    if (balls.current.length < MAX_LIVE) balls.current.push({ steps, t: 0 });
  };

  const dropMany = (times: number) => {
    land(Array.from({ length: times }, () => path(rows, tilt).reduce((s, x) => s + x, 0)));
  };

  const clear = (nextRows = rows) => {
    balls.current = [];
    setCounts(Array(nextRows + 1).fill(0));
    setAuto(false);
  };

  // One animation loop for the lifetime of the lab: it moves balls and redraws everything.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let spawn = 0;
    const frame = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      const { rows: r, tilt: p, auto: a } = params.current;

      if (a) {
        spawn += dt;
        while (spawn > 0.12) {
          spawn -= 0.12;
          const steps = path(r, p);
          if (reducedMotion()) land([steps.reduce((s, x) => s + x, 0)]);
          else if (balls.current.length < MAX_LIVE) balls.current.push({ steps, t: 0 });
        }
      }

      const landed: number[] = [];
      balls.current = balls.current.filter((b) => {
        b.t += dt * ROWS_PER_SEC;
        if (b.t >= r + 1) {
          landed.push(b.steps.reduce((s, x) => s + x, 0));
          return false;
        }
        return true;
      });
      if (landed.length) land(landed);

      draw(r, p);
      raf = requestAnimationFrame(frame);
    };

    const draw = (r: number, p: number) => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const dpr = window.devicePixelRatio || 1;
      const W = wrap.clientWidth;
      const H = Math.round(W * ASPECT);
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.height = `${H}px`;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const css = getComputedStyle(document.documentElement);
      const muted = css.getPropertyValue("--muted").trim() || "#888";
      const line = css.getPropertyValue("--line").trim() || "#ddd";

      const cx = W / 2;
      const sp = Math.min(40, (W - 24) / (r + 1));
      const rowH = Math.min(sp * 0.8, (H * 0.48) / (r + 1));
      const top = 18;
      const pegBottom = top + r * rowH;
      const binTop = pegBottom + rowH * 0.6;
      const binBottom = H - 22;
      const binH = binBottom - binTop;
      const radius = Math.max(2, Math.min(6, sp * 0.18));

      // Pegs.
      ctx.fillStyle = muted;
      for (let i = 0; i < r; i++) {
        for (let j = 0; j <= i; j++) {
          ctx.beginPath();
          ctx.arc(cx + (j - i / 2) * sp, top + (i + 0.5) * rowH, Math.max(1.5, radius * 0.45), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Bins and their stacks, scaled to whichever is taller: what landed or what is expected.
      const c = countsRef.current;
      const total = c.reduce((s, x) => s + x, 0);
      const expected = c.map((_, k) => total * binomialPmf(k, r, p));
      const scale = Math.max(1, ...c, ...expected);
      const binX = (k: number) => cx + (k - r / 2) * sp;
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      for (let k = 0; k <= r + 1; k++) {
        const x = cx + (k - 0.5 - r / 2) * sp;
        ctx.beginPath();
        ctx.moveTo(x, binTop);
        ctx.lineTo(x, binBottom);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(binX(0) - sp / 2, binBottom);
      ctx.lineTo(binX(r) + sp / 2, binBottom);
      ctx.stroke();
      ctx.fillStyle = rgb(BALL, 0.55);
      c.forEach((n, k) => {
        const h = (n / scale) * binH;
        ctx.fillRect(binX(k) - sp * 0.4, binBottom - h, sp * 0.8, h);
      });

      if (total > 0) {
        // Normal approximation, dashed.
        const mu = r * p;
        const sd = Math.sqrt(r * p * (1 - p));
        ctx.strokeStyle = rgb(EXACT, 0.8);
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const k = -0.5 + (i / 200) * (r + 1);
          const dens = Math.exp(-((k - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
          const y = binBottom - ((total * dens) / scale) * binH;
          if (i) ctx.lineTo(binX(k), y);
          else ctx.moveTo(binX(k), y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        // Exact binomial expectation, as dots.
        ctx.fillStyle = rgb(EXACT);
        expected.forEach((e, k) => {
          ctx.beginPath();
          ctx.arc(binX(k), binBottom - (e / scale) * binH, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.fillStyle = muted;
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "center";
      c.forEach((_, k) => {
        if (r <= 12 || k % 2 === 0) ctx.fillText(String(k), binX(k), H - 8);
      });

      // Balls in flight: a small hop between pegs, then a fall into the bin.
      ctx.fillStyle = rgb(BALL);
      for (const b of balls.current) {
        const i = Math.floor(b.t);
        const f = b.t - i;
        const rightsBefore = b.steps.slice(0, Math.min(i, r)).reduce((s, x) => s + x, 0);
        let x: number;
        let y: number;
        if (i < r) {
          const from = cx + (rightsBefore - i / 2) * sp;
          const to = from + (b.steps[i] ? sp / 2 : -sp / 2);
          x = from + (to - from) * f;
          y = top + (i + 0.5) * rowH - radius - 1 + f * rowH - Math.sin(f * Math.PI) * rowH * 0.35;
        } else {
          x = binX(rightsBefore);
          y = pegBottom + f * (binBottom - pegBottom - radius);
        }
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // The loop reads live values through refs, so it only needs to start once.
  }, []);

  const total = counts.reduce((s, c) => s + c, 0);
  const mean = total ? counts.reduce((s, c, k) => s + c * k, 0) / total : null;
  const sd = total > 1 && mean !== null ? Math.sqrt(counts.reduce((s, c, k) => s + c * (k - mean) ** 2, 0) / (total - 1)) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-[3px]" style={{ background: rgb(BALL, 0.55) }} />
              Balls landed ({total})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: rgb(EXACT) }} />
              Expected, Binomial({rows}, {tilt.toFixed(2)})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4" style={{ borderTop: `2px dashed ${rgb(EXACT, 0.8)}` }} />
              Normal approximation
            </span>
          </div>
          <div ref={wrapRef} className="w-full">
            <canvas ref={canvasRef} className="block w-full" role="img" aria-label="A Galton board: balls bouncing through pegs into bins" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Balls" value={String(total)} />
          <Stat label="Average bin" value={mean === null ? "none yet" : mean.toFixed(2)} />
          <Stat label="Expected Rp" value={(rows * tilt).toFixed(2)} />
          <Stat
            label="Spread vs √(Rp(1−p))"
            value={`${sd === null ? "–" : sd.toFixed(2)} vs ${Math.sqrt(rows * tilt * (1 - tilt)).toFixed(2)}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Drop">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="accent" onClick={drop}>
                Drop 1
              </Button>
              <Button size="sm" onClick={() => dropMany(1000)}>
                Drop 1,000 instantly
              </Button>
            </div>
            <Button className="w-full" onClick={() => setAuto((v) => !v)}>
              {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
              {auto ? "Stop dropping" : "Keep dropping"}
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => clear()}>
              <RotateCcw className="size-4" /> Clear the bins
            </Button>
          </div>
        </Panel>
        <Panel title="The board">
          <div className="space-y-5">
            <SliderField
              label="Rows of pegs (R)"
              value={rows}
              min={4}
              max={16}
              step={1}
              onChange={(v) => {
                setRows(v);
                clear(v);
              }}
              hint="Each row is one left-or-right coin flip. A ball's bin is the number of times it went right."
            />
            <SliderField
              label="Tilt: chance of bouncing right"
              value={tilt}
              min={0.1}
              max={0.9}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => {
                setTilt(v);
                clear();
              }}
              hint="0.50 is a level board. Tilt it and the pile slides sideways and leans, but more rows pull it back towards a bell."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
