"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { normCdf, normQuantile, sampleBinomial, twoProportionTest } from "@/lib/stats/inference";
import { Stat } from "./coin-flip-lab";

const ALPHA = 0.05;
const LOOKS = 20;
const FRAMES = 100;
const DOTS = 300;
const A_COLOR = rgb(CLASS_COLORS[2]);
const B_COLOR = rgb(CLASS_COLORS[3]);
const HIT = rgb(CLASS_COLORS[0]);

interface Live {
  frame: number;
  visitors: number;
  convA: number;
  convB: number;
  dotsA: number[];
  dotsB: number[];
  trace: { visitors: number; p: number; look: boolean }[];
  stoppedAt: number | null;
}

const emptyLive = (): Live => ({ frame: 0, visitors: 0, convA: 0, convB: 0, dotsA: [], dotsB: [], trace: [], stoppedAt: null });

const Z_A = normQuantile(1 - ALPHA / 2);

/** Power of a two-sided two-proportion test with n visitors per group. */
const powerAt = (n: number, a: number, b: number) => {
  const se = Math.sqrt((a * (1 - a) + b * (1 - b)) / n);
  if (se === 0) return 0;
  const shift = Math.abs(b - a) / se;
  return normCdf(shift - Z_A) + normCdf(-shift - Z_A);
};

/** Visitors per group for 80% power. */
const sampleSizeFor = (a: number, b: number) => {
  const d = Math.abs(b - a);
  if (d < 1e-9) return Infinity;
  return Math.ceil(((Z_A + normQuantile(0.8)) ** 2 * (a * (1 - a) + b * (1 - b))) / d ** 2);
};

/** Two button designs, real visitors, one p-value: and what peeking does to it. */
export default function AbTestingLab() {
  const [rateA, setRateA] = useState(0.1);
  const [rateB, setRateB] = useState(0.12);
  const [n, setN] = useState(2000);
  const [peeking, setPeeking] = useState(false);
  const [live, setLive] = useState<Live>(emptyLive);
  const [running, setRunning] = useState(false);
  const [sims, setSims] = useState<{ n: number; rate: number; peeking: boolean }[]>([]);
  const rand = useRef(createRandom(101));
  const state = useRef<Live>(emptyLive());

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => {
      const s = state.current;
      const r = rand.current;
      s.frame++;
      const target = Math.round((n * s.frame) / FRAMES);
      const add = target - s.visitors;
      // The first few hundred visitors are drawn one at a time so they can be shown as dots.
      let directA = 0;
      let directB = 0;
      for (let i = 0; i < add && s.visitors + i < DOTS; i++) {
        const a = r.next() < rateA ? 1 : 0;
        const b = r.next() < rateB ? 1 : 0;
        s.dotsA.push(a);
        s.dotsB.push(b);
        directA += a;
        directB += b;
      }
      const shown = Math.max(0, Math.min(add, DOTS - s.visitors));
      s.convA += directA + sampleBinomial(add - shown, rateA, r);
      s.convB += directB + sampleBinomial(add - shown, rateB, r);
      s.visitors = target;
      const look = s.frame % (FRAMES / LOOKS) === 0;
      const { p } = twoProportionTest(s.convA, s.visitors, s.convB, s.visitors);
      s.trace.push({ visitors: s.visitors, p, look });
      if (peeking && look && p < ALPHA && s.stoppedAt === null) s.stoppedAt = s.visitors;
      const finished = s.frame >= FRAMES || s.stoppedAt !== null;
      setLive({ ...s, dotsA: [...s.dotsA], dotsB: [...s.dotsB], trace: [...s.trace] });
      if (finished) setRunning(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, n, rateA, rateB, peeking]);

  const start = () => {
    state.current = emptyLive();
    setLive(emptyLive());
    setRunning(true);
  };

  const runMany = () => {
    const r = rand.current;
    let hits = 0;
    for (let t = 0; t < 1000; t++) {
      let convA = 0;
      let convB = 0;
      let seen = 0;
      let rejected = false;
      for (let look = 1; look <= LOOKS; look++) {
        const target = Math.round((n * look) / LOOKS);
        convA += sampleBinomial(target - seen, rateA, r);
        convB += sampleBinomial(target - seen, rateB, r);
        seen = target;
        if (peeking || look === LOOKS) {
          if (twoProportionTest(convA, seen, convB, seen).p < ALPHA) {
            rejected = true;
            break;
          }
        }
      }
      if (rejected) hits++;
    }
    setSims((old) => [...old, { n, rate: hits / 1000, peeking }]);
  };

  // start() re-creates the simulation state, so clearing only touches React state.
  const reset = () => {
    setRunning(false);
    setLive(emptyLive());
    setSims([]);
  };
  const change = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    reset();
  };

  const v = live.visitors;
  const obsA = v ? live.convA / v : 0;
  const obsB = v ? live.convB / v : 0;
  const { p } = twoProportionTest(live.convA, v, live.convB, v);
  const seDiff = v ? Math.sqrt((obsA * (1 - obsA) + obsB * (1 - obsB)) / v) : 0;
  const diff = obsB - obsA;
  const done = !running && v > 0;
  const equal = Math.abs(rateA - rateB) < 1e-9;
  const needed = sampleSizeFor(rateA, rateB);
  const lastSim = sims[sims.length - 1];

  // Power curve over visitors per group, on a log axis.
  const CW = 680;
  const CH = 220;
  const P = { l: 40, r: 14, t: 12, b: 28 };
  const N_LO = 100;
  const N_HI = 50000;
  const cx = (x: number) => P.l + (Math.log(x / N_LO) / Math.log(N_HI / N_LO)) * (CW - P.l - P.r);
  const cy = (y: number) => P.t + (1 - y) * (CH - P.t - P.b);
  const curve = Array.from({ length: 121 }, (_, i) => {
    const x = N_LO * (N_HI / N_LO) ** (i / 120);
    return `${i ? "L" : "M"}${cx(x).toFixed(1)},${cy(powerAt(x, rateA, rateB)).toFixed(1)}`;
  }).join("");

  // p-value over the course of the live test.
  const TH = 150;
  const tx = (visitors: number) => P.l + (visitors / n) * (CW - P.l - P.r);
  const ty = (pv: number) => P.t + (1 - pv) * (TH - P.t - 20);
  const trace = live.trace.map((pt, i) => `${i ? "L" : "M"}${tx(pt.visitors).toFixed(1)},${ty(pt.p).toFixed(1)}`).join("");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2">
          {(["A", "B"] as const).map((g) => {
            const dots = g === "A" ? live.dotsA : live.dotsB;
            const color = g === "A" ? A_COLOR : B_COLOR;
            const conv = g === "A" ? live.convA : live.convB;
            return (
              <div key={g}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="rounded-lg px-2.5 py-1 text-sm font-medium text-white" style={{ background: color }}>
                    Button {g}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {conv} / {v} {v ? `· ${((conv / v) * 100).toFixed(2)}%` : ""}
                  </span>
                </div>
                <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]" aria-label={`First ${DOTS} visitors to button ${g}`}>
                  {Array.from({ length: DOTS }, (_, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-full ${i < dots.length ? "anim-pop-in" : ""}`}
                      style={{ background: i >= dots.length ? "var(--surface-2)" : dots[i] ? color : "var(--line)" }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-muted sm:col-span-2">
            Each dot is one of the first {DOTS} visitors; coloured dots clicked. The counts cover all {n.toLocaleString()} visitors per button.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-1 px-1 text-[11px] text-muted">p-value as visitors arrive{peeking ? "; the test stops at the first look below 0.05" : ""}</p>
          <svg viewBox={`0 0 ${CW} ${TH}`} className="w-full" role="img" aria-label="p-value over the course of the test">
            <line x1={P.l} x2={CW - P.r} y1={ty(ALPHA)} y2={ty(ALPHA)} stroke={HIT} strokeDasharray="5 4" />
            <text x={P.l - 6} y={ty(ALPHA) + 3} textAnchor="end" className="font-mono text-[10px]" fill={HIT}>
              0.05
            </text>
            <text x={P.l - 6} y={ty(1) + 8} textAnchor="end" className="fill-muted font-mono text-[10px]">
              1
            </text>
            {Array.from({ length: LOOKS }, (_, i) => (
              <line key={i} x1={tx(((i + 1) * n) / LOOKS)} x2={tx(((i + 1) * n) / LOOKS)} y1={ty(0)} y2={ty(0) + 4} stroke="var(--muted)" />
            ))}
            {trace && <path d={trace} fill="none" stroke="var(--ink)" strokeWidth={1.8} />}
            {live.stoppedAt !== null && (
              <g className="anim-pop-in" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <circle cx={tx(live.stoppedAt)} cy={ty(live.trace[live.trace.length - 1].p)} r={5} fill={HIT} />
              </g>
            )}
            <line x1={P.l} x2={CW - P.r} y1={ty(0)} y2={ty(0)} stroke="var(--muted)" opacity={0.6} />
            <text x={CW - P.r} y={TH - 4} textAnchor="end" className="fill-muted font-mono text-[10px]">
              visitors per button: {n.toLocaleString()}
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Difference B − A" value={v ? `${(diff * 100).toFixed(2)} pts` : "not run yet"} />
          <Stat label="95% CI for the difference" value={v ? `${((diff - 1.96 * seDiff) * 100).toFixed(2)} to ${((diff + 1.96 * seDiff) * 100).toFixed(2)}` : "not run yet"} />
          <Stat label="p-value" value={v ? (p < 0.0001 ? "< 0.0001" : p.toFixed(4)) : "not run yet"} />
          <Stat label="Verdict" value={!done ? (running ? "running…" : "not run yet") : p < ALPHA ? (live.stoppedAt !== null ? `B wins (stopped at ${live.stoppedAt})` : "B differs") : "no clear winner"} />
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 px-1">
            <p className="text-[11px] text-muted">
              Power: the chance a test with this many visitors detects the difference{equal ? " (the buttons are identical, so every detection is a false alarm)" : ""}
            </p>
            {lastSim && (
              <p className="font-mono text-xs tabular-nums">
                last 1,000 tests: {(lastSim.rate * 100).toFixed(1)}% {equal ? "false alarms" : "detected"}
                {lastSim.peeking ? " (peeking)" : ""}
              </p>
            )}
          </div>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img" aria-label="Power against visitors per button">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => (
              <g key={t}>
                <line x1={P.l} x2={CW - P.r} y1={cy(t)} y2={cy(t)} stroke="var(--line)" />
                <text x={P.l - 6} y={cy(t) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
              </g>
            ))}
            {[100, 1000, 10000, 50000].map((x) => (
              <text key={x} x={cx(x)} y={CH - 8} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                {x >= 1000 ? `${x / 1000}k` : x}
              </text>
            ))}
            <line x1={P.l} x2={CW - P.r} y1={cy(0.8)} y2={cy(0.8)} stroke="var(--muted)" strokeDasharray="3 4" />
            <path d={curve} fill="none" stroke={B_COLOR} strokeWidth={2.5} />
            {Number.isFinite(needed) && needed <= N_HI && needed >= N_LO && (
              <line x1={cx(needed)} x2={cx(needed)} y1={cy(0.8)} y2={cy(0)} stroke="var(--muted)" strokeDasharray="3 4" />
            )}
            <line x1={cx(n)} x2={cx(n)} y1={cy(1)} y2={cy(0)} stroke="var(--ink)" strokeWidth={1.2} />
            {sims.map((s, i) => (
              <circle key={i} cx={cx(s.n)} cy={cy(s.rate)} r={5} fill={s.peeking ? HIT : A_COLOR} stroke="var(--surface)" strokeWidth={1.5} className="anim-pop-in" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            ))}
          </svg>
          <p className="px-1 text-[11px] text-muted">
            Curve: power worked out exactly for one look at the end. Dots: share of 1,000 simulated tests that found a difference
            {sims.some((s) => s.peeking) ? "; coral dots peeked." : "."}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Run">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={start} disabled={running}>
              <Play className="size-4" /> Run one test
            </Button>
            <Button className="w-full" size="sm" onClick={runMany} disabled={running}>
              Run 1,000 A/B tests
            </Button>
            <Button className="w-full" variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" /> Clear
            </Button>
          </div>
        </Panel>
        <Panel title="The buttons">
          <div className="space-y-5">
            <SliderField label="Button A's real click rate" value={rateA} min={0.01} max={0.5} step={0.005} format={(x) => `${(x * 100).toFixed(1)}%`} onChange={change(setRateA)} />
            <SliderField
              label="Button B's real click rate"
              value={rateB}
              min={0.01}
              max={0.5}
              step={0.005}
              format={(x) => `${(x * 100).toFixed(1)}%`}
              onChange={change(setRateB)}
              hint="Set B equal to A to see how often a test 'finds' a difference that is not there."
            />
            <SliderField
              label="Visitors per button"
              value={n}
              min={100}
              max={20000}
              step={100}
              log
              format={(x) => x.toLocaleString()}
              onChange={change(setN)}
              hint={Number.isFinite(needed) ? `For 80% power you need about ${needed.toLocaleString()} per button.` : "With identical buttons there is nothing to detect."}
            />
          </div>
        </Panel>
        <Panel title="Bad habit">
          <Toggle
            label="Stop as soon as p < 0.05"
            checked={peeking}
            onChange={change(setPeeking)}
            hint={`Check the p-value ${LOOKS} times during the test and stop at the first 'win'. Try it with identical buttons.`}
          />
        </Panel>
      </div>
    </div>
  );
}
