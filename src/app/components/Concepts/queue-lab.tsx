"use client";

import { useEffect, useRef, useState } from "react";
import { FastForward, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

// One simulated minute every half second. Service takes a minute on average.
const MINUTES_PER_SEC = 2;
const MEAN_SERVICE = 1;
const MAX_SHOWN = 24;

const WAITING = rgb(CLASS_COLORS[2]);
const SERVING = rgb(CLASS_COLORS[1]);
const THEORY = rgb(CLASS_COLORS[0]);

interface Customer {
  id: number;
  arrived: number;
  started?: number;
  done?: number;
}

interface Sim {
  now: number;
  nextArrival: number;
  nextId: number;
  queue: Customer[];
  servers: (Customer | null)[];
  /** Time in system for everyone who has left. */
  times: number[];
  waits: number[];
  /** Area under the number-in-system curve, for Little's law. */
  area: number;
  history: number[];
}

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

/** Erlang C: the chance an arrival has to wait, for c servers with offered load a = lambda/mu. */
const erlangC = (c: number, a: number) => {
  const rho = a / c;
  if (rho >= 1) return 1;
  let sum = 0;
  for (let k = 0; k < c; k++) sum += a ** k / factorial(k);
  const top = a ** c / (factorial(c) * (1 - rho));
  return top / (sum + top);
};

/** Mean time in system for an M/M/c queue, in minutes. */
const theoryTime = (lambda: number, c: number) => {
  const mu = 1 / MEAN_SERVICE;
  if (lambda >= c * mu) return Infinity;
  return erlangC(c, lambda / mu) / (c * mu - lambda) + 1 / mu;
};

const emptySim = (servers: number): Sim => ({
  now: 0,
  nextArrival: 0,
  nextId: 0,
  queue: [],
  servers: Array(servers).fill(null),
  times: [],
  waits: [],
  area: 0,
  history: [],
});

/** Random arrivals at a counter with one to three servers: the busier they are, the faster the line grows. */
export default function QueueLab() {
  const [servers, setServers] = useState(1);
  const [load, setLoad] = useState(0.8);
  const [playing, setPlaying] = useState(true);
  const [frame, setFrame] = useState<Sim>(() => emptySim(1));
  const sim = useRef<Sim>(emptySim(1));
  const rand = useRef(createRandom(83));
  const settings = useRef({ servers: 1, lambda: 0.8 });

  const lambda = load * servers;

  useEffect(() => {
    settings.current = { servers, lambda };
  }, [servers, lambda]);

  const exp = (rate: number) => -Math.log(1 - rand.current.next()) / rate;

  /** Advance the simulation by dt minutes, one event at a time. */
  const advance = (s: Sim, dt: number) => {
    const end = s.now + dt;
    const { lambda: rate } = settings.current;
    for (;;) {
      const busyUntil = s.servers.map((c) => c?.done ?? Infinity);
      const nextDone = Math.min(...busyUntil);
      const next = Math.min(s.nextArrival, nextDone, end);
      s.area += (s.queue.length + s.servers.filter(Boolean).length) * (next - s.now);
      s.now = next;
      if (next === end && next < s.nextArrival && next < nextDone) break;
      if (nextDone <= s.nextArrival && nextDone < Infinity && nextDone <= end) {
        const i = busyUntil.indexOf(nextDone);
        const leaving = s.servers[i]!;
        s.times.push(leaving.done! - leaving.arrived);
        s.waits.push(leaving.started! - leaving.arrived);
        s.servers[i] = null;
      } else if (s.nextArrival <= end) {
        s.queue.push({ id: s.nextId++, arrived: s.nextArrival });
        s.nextArrival += exp(rate);
      } else break;
      // Free servers take the next person in line.
      for (let i = 0; i < s.servers.length; i++) {
        if (!s.servers[i] && s.queue.length) {
          const c = s.queue.shift()!;
          c.started = s.now;
          c.done = s.now + exp(1 / MEAN_SERVICE);
          s.servers[i] = c;
        }
      }
    }
  };

  const publish = () => {
    const s = sim.current;
    setFrame({ ...s, queue: [...s.queue], servers: [...s.servers], times: s.times, waits: s.waits, history: [...s.history] });
  };

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    let sinceSample = 0;
    const tick = (t: number) => {
      // rAF timestamps can trail performance.now() on the first frame, so never step backwards.
      const dt = Math.max(0, Math.min(0.05, (t - last) / 1000)) * MINUTES_PER_SEC;
      last = t;
      const s = sim.current;
      advance(s, dt);
      sinceSample += dt;
      if (sinceSample > 0.25) {
        sinceSample = 0;
        s.history.push(s.queue.length);
        if (s.history.length > 240) s.history.shift();
      }
      publish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // advance and publish read the simulation through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const reset = (count = servers) => {
    sim.current = emptySim(count);
    sim.current.nextArrival = exp(settings.current.lambda);
    publish();
  };

  const fastForward = () => {
    advance(sim.current, 5000);
    publish();
  };

  const { queue, servers: desks, times, waits, now, area } = frame;
  const served = times.length;
  const meanTime = served ? times.reduce((a, b) => a + b, 0) / served : null;
  const meanWait = served ? waits.reduce((a, b) => a + b, 0) / served : null;
  const meanInSystem = now > 0 ? area / now : null;
  const throughput = now > 0 ? served / now : null;
  const theory = theoryTime(lambda, servers);

  // Curve of mean time in system against utilisation, for the current number of servers.
  const W = 420;
  const H = 240;
  const P = { l: 40, r: 12, t: 12, b: 30 };
  const yTop = 12;
  const sx = (rho: number) => P.l + rho * (W - P.l - P.r);
  const sy = (v: number) => P.t + (H - P.t - P.b) * (1 - Math.min(v, yTop) / yTop);
  const curve = Array.from({ length: 196 }, (_, i) => {
    const rho = 0.01 + i * 0.005;
    return `${i ? "L" : "M"}${sx(rho).toFixed(1)},${sy(theoryTime(rho * servers, servers)).toFixed(1)}`;
  }).join("");

  const histMax = Math.max(5, ...frame.history);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="mb-4 text-sm text-muted">
            People arrive at random. Each one takes a random time to serve, a minute on average.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex min-h-[64px] flex-1 flex-row-reverse flex-wrap-reverse content-center items-center justify-start gap-1.5 overflow-hidden rounded-xl bg-surface-2/60 p-3" aria-label={`${queue.length} people waiting`}>
              {queue.slice(0, MAX_SHOWN).map((c) => (
                <span key={c.id} className="anim-pop-in size-5 rounded-full" style={{ background: WAITING }} />
              ))}
              {queue.length > MAX_SHOWN && <span className="mr-1 font-mono text-xs text-muted">+{queue.length - MAX_SHOWN}</span>}
              {queue.length === 0 && <span className="mr-auto text-xs text-muted">nobody waiting</span>}
            </div>
            <div className="flex flex-col gap-2">
              {desks.map((c, i) => {
                const progress = c?.started !== undefined && c.done !== undefined ? Math.min(1, (now - c.started) / (c.done - c.started)) : 0;
                return (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                    <span className="text-xs text-muted">Desk {i + 1}</span>
                    <span className="relative grid size-7 place-items-center">
                      <svg viewBox="0 0 28 28" className="absolute inset-0">
                        <circle cx="14" cy="14" r="12" fill="none" stroke="var(--line)" strokeWidth="3" />
                        {c && (
                          <circle cx="14" cy="14" r="12" fill="none" stroke={SERVING} strokeWidth="3" strokeDasharray={`${progress * 75.4} 75.4`} transform="rotate(-90 14 14)" />
                        )}
                      </svg>
                      {c && <span className="size-4 rounded-full" style={{ background: SERVING }} />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <svg viewBox="0 0 480 60" className="mt-4 w-full" role="img" aria-label="Queue length over the last two minutes">
            <path
              d={
                frame.history.length > 1
                  ? frame.history.map((v, i) => `${i ? "L" : "M"}${((i / 239) * 480).toFixed(1)},${(58 - (v / histMax) * 54).toFixed(1)}`).join("")
                  : ""
              }
              fill="none"
              stroke={WAITING}
              strokeWidth={2}
            />
            <line x1={0} x2={480} y1={58} y2={58} stroke="var(--line)" />
          </svg>
          <p className="text-[11px] text-muted">Length of the line, last minute of real time</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="mb-2 px-1 text-[11px] text-muted">Average minutes from arriving to leaving, against how busy the desks are</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Time in system against utilisation">
              {[0, 0.25, 0.5, 0.75, 1].map((r) => (
                <g key={r}>
                  <line x1={sx(r)} x2={sx(r)} y1={P.t} y2={H - P.b} stroke="var(--line)" />
                  <text x={sx(r)} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                    {r * 100}%
                  </text>
                </g>
              ))}
              {[0, 4, 8, 12].map((v) => (
                <text key={v} x={P.l - 6} y={sy(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                  {v}
                </text>
              ))}
              <path d={curve} fill="none" stroke={THEORY} strokeWidth={2.5} />
              <line x1={sx(load)} x2={sx(load)} y1={P.t} y2={H - P.b} stroke={WAITING} strokeDasharray="4 4" />
              {meanTime !== null && served > 20 && <circle cx={sx(load)} cy={sy(meanTime)} r={6} fill={WAITING} stroke="var(--surface)" strokeWidth={2} />}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line">
            <Stat label="Served" value={String(served)} />
            <Stat label="Waiting now" value={String(queue.length)} />
            <Stat label="Avg time in line" value={meanWait === null ? "none yet" : `${meanWait.toFixed(2)} min`} />
            <Stat label="Avg time in system" value={meanTime === null ? "none yet" : `${meanTime.toFixed(2)} min`} />
            <Stat label="Theory" value={Number.isFinite(theory) ? `${theory.toFixed(2)} min` : "grows forever"} />
            <Stat
              label="Little's law L vs λW"
              value={meanInSystem === null || meanTime === null || throughput === null ? "none yet" : `${meanInSystem.toFixed(2)} vs ${(throughput * meanTime).toFixed(2)}`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Run">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button className="w-full" size="sm" onClick={fastForward}>
              <FastForward className="size-3.5" /> Skip ahead 5,000 minutes
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => reset()}>
              <RotateCcw className="size-4" /> Empty the line
            </Button>
          </div>
        </Panel>
        <Panel title="The counter">
          <div className="space-y-5">
            <SliderField
              label="How busy the desks are"
              value={load}
              min={0.1}
              max={0.98}
              step={0.01}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={(v) => {
                setLoad(v);
                settings.current = { servers, lambda: v * servers };
                reset();
              }}
              hint={`Arrivals per minute divided by what the desks can handle. Now ${lambda.toFixed(2)} people a minute.`}
            />
            <SliderField
              label="Desks"
              value={servers}
              min={1}
              max={3}
              step={1}
              onChange={(v) => {
                setServers(v);
                settings.current = { servers: v, lambda: load * v };
                reset(v);
              }}
              hint="More desks at the same busyness: the same share of time working, but shorter lines, because an idle desk can pick up the slack."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
