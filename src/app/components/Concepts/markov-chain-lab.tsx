"use client";

import { useEffect, useRef, useState } from "react";
import { FastForward, Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Preset = "weather" | "web";
type Matrix = number[][];

interface Chain {
  names: string[];
  colors: string[];
  /** Node centres in the diagram's 400 by 300 box. */
  pos: [number, number][];
}

const CHAINS: Record<Preset, Chain> = {
  weather: {
    names: ["Sunny", "Cloudy", "Rainy"],
    colors: [rgb(CLASS_COLORS[3]), rgb(CLASS_COLORS[5]), rgb(CLASS_COLORS[2])],
    pos: [
      [200, 60],
      [80, 235],
      [320, 235],
    ],
  },
  web: {
    names: ["Page A", "Page B", "Page C", "Page D"],
    colors: [rgb(CLASS_COLORS[0]), rgb(CLASS_COLORS[1]), rgb(CLASS_COLORS[2]), rgb(CLASS_COLORS[4])],
    pos: [
      [90, 70],
      [310, 70],
      [310, 230],
      [90, 230],
    ],
  },
};

const WEATHER_WEIGHTS: Matrix = [
  [0.7, 0.2, 0.1],
  [0.3, 0.4, 0.3],
  [0.2, 0.4, 0.4],
];

/** Who links to whom in the little web: A to B and C, B to C, C to A, D to A and C. */
const LINKS: number[][] = [[1, 2], [2], [0], [0, 2]];

const normalise = (rows: Matrix): Matrix =>
  rows.map((row, i) => {
    const sum = row.reduce((s, v) => s + v, 0);
    return sum > 0 ? row.map((v) => v / sum) : row.map((_, j) => (j === i ? 1 : 0));
  });

/** The random surfer: follow a link with probability d, otherwise jump to any page. */
const pageRankMatrix = (d: number): Matrix =>
  LINKS.map((out) => LINKS.map((_, j) => (1 - d) / LINKS.length + (out.includes(j) ? d / out.length : 0)));

const step = (dist: number[], P: Matrix) => dist.map((_, j) => dist.reduce((s, v, i) => s + v * P[i][j], 0));

/** Solves pi P = pi with the entries of pi summing to 1, by Gaussian elimination. */
const stationary = (P: Matrix): number[] => {
  const n = P.length;
  // Rows of (P^T - I), with the last equation replaced by sum(pi) = 1.
  const A = Array.from({ length: n }, (_, i) => [...Array.from({ length: n }, (_, j) => P[j][i] - (i === j ? 1 : 0)), 0]);
  A[n - 1] = [...Array(n).fill(1), 1];
  for (let c = 0; c < n; c++) {
    let pivot = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[pivot][c])) pivot = r;
    if (Math.abs(A[pivot][c]) < 1e-12) {
      // Not unique (the chain splits into separate pieces): fall back to a long-run average.
      let dist = Array(n).fill(1 / n);
      const avg = Array(n).fill(0);
      for (let t = 0; t < 4000; t++) {
        dist = step(dist, P);
        dist.forEach((v, i) => (avg[i] += v / 4000));
      }
      return avg;
    }
    [A[c], A[pivot]] = [A[pivot], A[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k];
    }
  }
  return A.map((row, i) => Math.max(0, row[n] / row[i]));
};

const SPEED_MS = 550;
const MAX_N = 30;

/** A token hopping between states by fixed probabilities, and where it spends its time in the long run. */
export default function MarkovChainLab() {
  const [preset, setPreset] = useState<Preset>("weather");
  const [weights, setWeights] = useState<Matrix>(WEATHER_WEIGHTS);
  const [damping, setDamping] = useState(0.85);
  const [editRow, setEditRow] = useState(0);
  const [state, setState] = useState(0);
  const [lastMove, setLastMove] = useState<{ from: number; to: number; id: number } | null>(null);
  const [visits, setVisits] = useState<number[]>([1, 0, 0]);
  const [running, setRunning] = useState(false);
  const [startState, setStartState] = useState(0);
  const [n, setN] = useState(3);
  const rand = useRef(createRandom(97));
  // Mirrors `state` for the timer, so each hop reads where the token really is.
  const at = useRef(0);

  const chain = CHAINS[preset];
  const P = preset === "weather" ? normalise(weights) : pageRankMatrix(damping);
  const pi = stationary(P);
  const size = chain.names.length;

  const next = (from: number) => {
    let u = rand.current.next();
    for (let j = 0; j < size; j++) {
      u -= P[from][j];
      if (u < 0) return j;
    }
    return size - 1;
  };

  const hop = () => {
    const from = at.current;
    const to = next(from);
    at.current = to;
    setState(to);
    setLastMove((m) => ({ from, to, id: (m?.id ?? 0) + 1 }));
    setVisits((v) => v.map((c, i) => c + (i === to ? 1 : 0)));
  };

  const hopMany = (count: number) => {
    let s = at.current;
    const add = Array(size).fill(0);
    for (let i = 0; i < count; i++) {
      s = next(s);
      add[s]++;
    }
    at.current = s;
    setState(s);
    setLastMove(null);
    setVisits((v) => v.map((c, i) => c + add[i]));
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(hop, SPEED_MS);
    return () => clearInterval(id);
    // hop reads the current matrix, which also restarts the interval when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, preset, weights, damping]);

  const reset = (count = size) => {
    setRunning(false);
    at.current = 0;
    setState(0);
    setLastMove(null);
    setVisits(Array.from({ length: count }, (_, i) => (i === 0 ? 1 : 0)));
  };

  const switchPreset = (p: Preset) => {
    setPreset(p);
    setEditRow(0);
    setStartState(0);
    reset(CHAINS[p].names.length);
  };

  const total = visits.reduce((s, v) => s + v, 0);
  // Distribution after k steps from the chosen start, for k = 0 … MAX_N.
  const history: number[][] = [Array.from({ length: size }, (_, i) => (i === startState ? 1 : 0))];
  for (let k = 0; k < MAX_N; k++) history.push(step(history[k], P));
  const distN = history[n];
  const gap = Math.max(...distN.map((v, i) => Math.abs(v - pi[i])));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <Diagram chain={chain} P={P} state={state} lastMove={lastMove} />
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Share of time spent in each state, after <span className="font-mono text-ink">{total}</span> {total === 1 ? "step" : "steps"}
            </p>
            {chain.names.map((name, i) => {
              const share = visits[i] / total;
              return (
                <div key={name} className="space-y-1">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full" style={{ background: chain.colors[i] }} />
                      {name}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {(share * 100).toFixed(1)}% · long run {(pi[i] * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${share * 100}%`, background: chain.colors[i] }} />
                    <span className="absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${pi[i] * 100}%` }} title="Stationary share" />
                  </div>
                </div>
              );
            })}
            <p className="text-[11px] text-muted">The black tick is the stationary distribution, worked out exactly from the arrows.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Forget the token. If today is <strong className="text-ink">{chain.names[startState]}</strong>, what are the chances for each state in{" "}
              <span className="font-mono text-ink">{n}</span> {n === 1 ? "step" : "steps"}?
            </p>
            <Segmented size="sm" value={startState} options={chain.names.map((name, i) => ({ value: i, label: name.replace("Page ", "") }))} onChange={setStartState} />
          </div>
          <ConvergenceChart history={history} pi={pi} colors={chain.colors} n={n} />
          <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
            {distN.map((v, i) => (
              <div key={i} className="rounded-lg bg-surface-2/60 px-3 py-2">
                <p className="text-[11px] text-muted">{chain.names[i]}</p>
                <p className="font-mono text-sm tabular-nums">{(v * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <SliderField label="Steps ahead (n)" value={n} min={0} max={MAX_N} step={1} onChange={setN} hint={`Largest gap from the long-run shares: ${(gap * 100).toFixed(2)} percentage points.`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Steps" value={String(total - 1)} />
          <Stat label="Now in" value={chain.names[state]} />
          <Stat label="Most visited (simulated)" value={chain.names[visits.indexOf(Math.max(...visits))]} />
          <Stat label="Highest long-run share" value={chain.names[pi.indexOf(Math.max(...pi))]} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Chain">
          <Segmented
            value={preset}
            options={[
              { value: "weather", label: "Weather" },
              { value: "web", label: "Web pages" },
            ]}
            onChange={switchPreset}
          />
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {preset === "weather"
              ? "Tomorrow's weather depends only on today's. Each arrow is the chance of moving from one kind of day to the next."
              : "A web surfer follows a random link on the page, or now and then jumps to any page at all. The long-run shares are PageRank."}
          </p>
        </Panel>
        <Panel title="Run">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={hop} disabled={running}>
                <StepForward className="size-3.5" /> One step
              </Button>
              <Button size="sm" variant={running ? "outline" : "accent"} onClick={() => setRunning((r) => !r)}>
                {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                {running ? "Pause" : "Run"}
              </Button>
            </div>
            <Button size="sm" className="w-full" onClick={() => hopMany(1000)} disabled={running}>
              <FastForward className="size-3.5" /> 1,000 steps at once
            </Button>
            <Button size="sm" variant="ghost" className="w-full" onClick={() => reset()}>
              <RotateCcw className="size-3.5" /> Start over
            </Button>
          </div>
        </Panel>
        <Panel title={preset === "weather" ? "Transition probabilities" : "The surfer"}>
          {preset === "weather" ? (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs text-muted">Edit the arrows leaving</p>
                <Segmented size="sm" value={editRow} options={chain.names.map((name, i) => ({ value: i, label: name }))} onChange={setEditRow} />
              </div>
              {chain.names.map((name, j) => (
                <SliderField
                  key={j}
                  label={`${chain.names[editRow]} to ${name}`}
                  value={weights[editRow][j]}
                  min={0}
                  max={1}
                  step={0.05}
                  format={() => `${(P[editRow][j] * 100).toFixed(0)}%`}
                  onChange={(v) => setWeights((w) => w.map((row, i) => (i === editRow ? row.map((x, k) => (k === j ? v : x)) : row)))}
                />
              ))}
              <p className="text-xs leading-relaxed text-muted">The sliders are weights. Each row is rescaled to add up to 100%, which is shown on the right.</p>
              <Button size="sm" variant="ghost" className="w-full" onClick={() => setWeights(WEATHER_WEIGHTS)}>
                Back to the defaults
              </Button>
            </div>
          ) : (
            <SliderField
              label="Damping: chance of following a link"
              value={damping}
              min={0.5}
              max={0.99}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={setDamping}
              hint="Google's original choice was 0.85. Push it towards 1 and pages with no way in, like D, sink towards zero."
            />
          )}
        </Panel>
      </div>
    </div>
  );
}

/** States as circles, transitions as arrows with their probabilities, and the token on the current state. */
function Diagram({ chain, P, state, lastMove }: { chain: Chain; P: Matrix; state: number; lastMove: { from: number; to: number; id: number } | null }) {
  const R = 30;
  const centre: [number, number] = [chain.pos.reduce((s, p) => s + p[0], 0) / chain.pos.length, chain.pos.reduce((s, p) => s + p[1], 0) / chain.pos.length];
  const [tx, ty] = chain.pos[state];
  return (
    <svg viewBox="0 0 400 300" className="w-full" role="img" aria-label="Transition diagram of the Markov chain">
      <defs>
        <marker id="mc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
        </marker>
      </defs>
      {P.map((row, i) =>
        row.map((p, j) => {
          if (p < 0.005) return null;
          const active = lastMove?.from === i && lastMove?.to === j;
          const stroke = active ? chain.colors[j] : "var(--muted)";
          const width = 0.8 + p * 5;
          const [x1, y1] = chain.pos[i];
          if (i === j) {
            // Self-loop: a small loop on the side facing away from the centre.
            const dx = x1 - centre[0];
            const dy = y1 - centre[1];
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const cx = x1 + ux * (R + 16);
            const cy = y1 + uy * (R + 16);
            return (
              <g key={`${i}-${j}`} opacity={active ? 1 : 0.7}>
                <circle cx={cx} cy={cy} r={16} fill="none" stroke={stroke} strokeWidth={width} />
                <text x={x1 + ux * (R + 44)} y={y1 + uy * (R + 44) + 4} textAnchor="middle" className="fill-ink font-mono text-[11px]">
                  {p.toFixed(2)}
                </text>
              </g>
            );
          }
          const [x2, y2] = chain.pos[j];
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          // Bend each arrow to its own side, so A to B and B to A do not overlap.
          const nx = -uy;
          const ny = ux;
          const bend = 22;
          const sx = x1 + ux * R + nx * 6;
          const sy = y1 + uy * R + ny * 6;
          const ex = x2 - ux * (R + 4) + nx * 6;
          const ey = y2 - uy * (R + 4) + ny * 6;
          const mx = (x1 + x2) / 2 + nx * bend;
          const my = (y1 + y2) / 2 + ny * bend;
          return (
            <g key={`${i}-${j}`} opacity={active ? 1 : 0.7}>
              <path d={`M${sx},${sy} Q${mx},${my} ${ex},${ey}`} fill="none" stroke={stroke} strokeWidth={width} markerEnd="url(#mc-arrow)" />
              <text x={mx + nx * 8} y={my + ny * 8 + 4} textAnchor="middle" className="fill-ink font-mono text-[11px]">
                {p.toFixed(2)}
              </text>
            </g>
          );
        }),
      )}
      {chain.pos.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={R} fill="var(--surface)" stroke={chain.colors[i]} strokeWidth={i === state ? 4 : 2} />
          <text x={x} y={y + 4} textAnchor="middle" className="fill-ink text-[11px] font-medium">
            {chain.names[i]}
          </text>
        </g>
      ))}
      {/* The token slides to its new state; the key restarts the little pop on every move. */}
      <g style={{ transform: `translate(${tx}px, ${ty - R - 2}px)`, transition: "transform 380ms cubic-bezier(0.3, 0.7, 0.4, 1)" }}>
        <circle key={lastMove?.id ?? 0} r={7} fill={chain.colors[state]} stroke="var(--surface)" strokeWidth={2} className="anim-pop-in" />
      </g>
    </svg>
  );
}

const CW = 680;
const CH = 170;

/** Each state's probability against the number of steps, settling onto its long-run share. */
function ConvergenceChart({ history, pi, colors, n }: { history: number[][]; pi: number[]; colors: string[]; n: number }) {
  const pad = { l: 34, r: 10, t: 10, b: 22 };
  const sx = (k: number) => pad.l + (k / MAX_N) * (CW - pad.l - pad.r);
  const sy = (v: number) => pad.t + (1 - v) * (CH - pad.t - pad.b);
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="mt-3 w-full" role="img" aria-label="Probability of each state against the number of steps">
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={CW - pad.r} y1={sy(v)} y2={sy(v)} stroke="var(--line)" />
          <text x={pad.l - 6} y={sy(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
            {v}
          </text>
        </g>
      ))}
      {pi.map((v, i) => (
        <line key={`pi-${i}`} x1={pad.l} x2={CW - pad.r} y1={sy(v)} y2={sy(v)} stroke={colors[i]} strokeDasharray="4 4" opacity={0.6} />
      ))}
      {pi.map((_, i) => (
        <path key={i} d={history.map((d, k) => `${k ? "L" : "M"}${sx(k).toFixed(1)},${sy(d[i]).toFixed(1)}`).join("")} fill="none" stroke={colors[i]} strokeWidth={2} />
      ))}
      <line x1={sx(n)} x2={sx(n)} y1={pad.t} y2={CH - pad.b} stroke="var(--ink)" strokeWidth={1} opacity={0.5} />
      {pi.map((_, i) => (
        <circle key={`dot-${i}`} cx={sx(n)} cy={sy(history[n][i])} r={4} fill={colors[i]} />
      ))}
      {[0, 10, 20, 30].map((k) => (
        <text key={k} x={sx(k)} y={CH - 6} textAnchor="middle" className="fill-muted font-mono text-[10px]">
          {k}
        </text>
      ))}
    </svg>
  );
}
