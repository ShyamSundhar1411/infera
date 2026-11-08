"use client";

import { useEffect, useRef, useState } from "react";
import { FastForward, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { lnGamma } from "@/lib/stats/special";
import { Stat } from "./coin-flip-lab";

const MINUTES_PER_SEC = 0.5;
const WINDOW = 6;
const TW = 680;
const TH = 96;
const CW = 330;
const CH = 200;
const PAD = { top: 12, right: 8, bottom: 26, left: 8 };
const GAP_BINS = 16;

const EVENT = rgb(CLASS_COLORS[2]);
const OBSERVED = rgb(CLASS_COLORS[2], 0.35);
const EXACT = rgb(CLASS_COLORS[0]);

const poissonPmf = (k: number, lambda: number) => Math.exp(k * Math.log(lambda) - lambda - lnGamma(k + 1));

interface Sim {
  now: number;
  next: number;
  events: number[];
  /** Counts of the minutes watched live, for the labels on the timeline. */
  perMinute: number[];
}

/** Arrivals at a steady random rate: counts per minute are Poisson, the waits between them Exponential. */
export default function ArrivalsLab() {
  const [lambda, setLambda] = useState(3);
  const [playing, setPlaying] = useState(true);
  const [counts, setCounts] = useState<number[]>([]);
  const [gaps, setGaps] = useState<number[]>([]);
  const [frame, setFrame] = useState<Sim>({ now: 0, next: 0, events: [], perMinute: [] });
  const rand = useRef(createRandom(83));
  const exp = (rate: number) => -Math.log(1 - rand.current.next()) / rate;
  const sim = useRef<Sim>({ now: 0, next: 0, events: [], perMinute: [] });
  const lambdaRef = useRef(lambda);

  useEffect(() => {
    lambdaRef.current = lambda;
  }, [lambda]);

  const clear = (rate = lambda) => {
    sim.current = { now: 0, next: exp(rate), events: [], perMinute: [] };
    setFrame({ ...sim.current });
    setCounts([]);
    setGaps([]);
  };

  // Initialise the first arrival on mount, outside of render.
  useEffect(() => {
    sim.current.next = exp(lambdaRef.current);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      // rAF timestamps can trail performance.now() on the first frame, so never step backwards.
      const dt = Math.max(0, Math.min(0.05, (t - last) / 1000));
      last = t;
      const s = sim.current;
      const rate = lambdaRef.current;
      const before = s.now;
      s.now += dt * MINUTES_PER_SEC;
      const newGaps: number[] = [];
      while (s.next <= s.now) {
        const prev = s.events[s.events.length - 1];
        if (prev !== undefined) newGaps.push(s.next - prev);
        s.events.push(s.next);
        s.next += exp(rate);
      }
      // Close every whole minute crossed during this frame.
      const finished: number[] = [];
      for (let m = Math.floor(before) + 1; m <= Math.floor(s.now); m++) {
        finished.push(s.events.filter((e) => e >= m - 1 && e < m).length);
      }
      s.events = s.events.filter((e) => e > s.now - WINDOW - 1);
      if (newGaps.length) setGaps((g) => g.concat(newGaps));
      if (finished.length) {
        s.perMinute.push(...finished);
        setCounts((c) => c.concat(finished));
      }
      setFrame({ now: s.now, next: s.next, events: [...s.events], perMinute: [...s.perMinute] });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // exp reads the shared generator through a ref.
  }, [playing]);

  const simulate = (minutes: number) => {
    // One long uninterrupted stream, cut into minutes afterwards.
    const newCounts: number[] = Array(minutes).fill(0);
    const newGaps: number[] = [];
    let t = exp(lambda);
    while (t < minutes) {
      newCounts[Math.floor(t)]++;
      const g = exp(lambda);
      newGaps.push(g);
      t += g;
    }
    setCounts((c) => c.concat(newCounts));
    setGaps((g) => g.concat(newGaps));
  };

  // Timeline: the last WINDOW minutes, with "now" at the right edge.
  const { now, events, perMinute } = frame;
  const start = Math.max(0, now - WINDOW);
  const tx = (t: number) => 12 + ((t - start) / WINDOW) * (TW - 60);
  const minuteMarks = Array.from({ length: WINDOW + 2 }, (_, i) => Math.floor(start) + i).filter((m) => m >= start && m <= now);
  const finishedCount = (m: number) => perMinute[m - 1];

  // Counts per minute vs Poisson.
  const kMax = Math.max(6, Math.ceil(lambda + 4 * Math.sqrt(lambda) + 1));
  const countBins = Array.from({ length: kMax + 1 }, (_, k) => counts.filter((c) => (k === kMax ? c >= k : c === k)).length);
  const nMin = counts.length;
  const countObs = countBins.map((c) => (nMin ? c / nMin : 0));
  const countExact = countBins.map((_, k) => poissonPmf(k, lambda));
  const meanCount = nMin ? counts.reduce((s, c) => s + c, 0) / nMin : null;

  // Gaps between arrivals vs the exponential density.
  const gMax = 4 / lambda;
  const gw = gMax / GAP_BINS;
  const gapBins = Array.from({ length: GAP_BINS }, (_, i) => gaps.filter((g) => g >= i * gw && g < (i + 1) * gw).length);
  const gapDensity = gapBins.map((c) => (gaps.length ? c / (gaps.length * gw) : 0));
  const meanGap = gaps.length ? gaps.reduce((s, g) => s + g, 0) / gaps.length : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-2 px-1 text-[11px] text-muted">
            The last {WINDOW} minutes. Each dot is one arrival; each finished minute shows how many it got.
          </p>
          <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full" role="img" aria-label="Timeline of arrivals">
            <line x1={tx(start)} x2={tx(now)} y1={56} y2={56} stroke="var(--line)" strokeWidth={2} />
            {minuteMarks.map((m) => (
              <g key={m}>
                <line x1={tx(m)} x2={tx(m)} y1={30} y2={70} stroke="var(--muted)" opacity={0.5} />
                <text x={tx(m)} y={86} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                  {m}:00
                </text>
                {m >= 1 && tx(m - 0.5) > tx(start) && finishedCount(m) !== undefined && (
                  <text x={tx(m - 0.5)} y={22} textAnchor="middle" className="font-mono text-[12px]" fill={EVENT}>
                    {finishedCount(m)}
                  </text>
                )}
              </g>
            ))}
            {events
              .filter((e) => e >= start)
              .map((e) => {
                const age = now - e;
                return (
                  <circle
                    key={e}
                    cx={tx(e)}
                    cy={56}
                    r={age < 0.08 ? 9 - age * 50 : 5}
                    fill={EVENT}
                    opacity={age < 0.08 ? 0.6 + age * 5 : 1}
                  />
                );
              })}
            <line x1={tx(now)} x2={tx(now)} y1={34} y2={70} stroke={EXACT} strokeWidth={2} />
            <text x={tx(now) + 6} y={44} className="font-mono text-[10px]" fill={EXACT}>
              now
            </text>
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MiniChart
            title={`Arrivals per minute vs Poisson(${lambda})`}
            observed={countObs}
            exact={countExact}
            labels={countBins.map((_, k) => (k === kMax ? `${k}+` : String(k)))}
            dots
          />
          <MiniChart
            title={`Gaps between arrivals vs ${lambda}e^(−${lambda}x)`}
            observed={gapDensity}
            exact={gapBins.map((_, i) => lambda * Math.exp(-lambda * (i + 0.5) * gw))}
            labels={gapBins.map((_, i) => (i % 4 === 0 ? (i * gw).toFixed(2) : ""))}
          />
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Minutes" value={String(nMin)} />
          <Stat label="Average per minute" value={meanCount === null ? "none yet" : `${meanCount.toFixed(2)} vs ${lambda}`} />
          <Stat label="Arrivals timed" value={String(gaps.length)} />
          <Stat label="Average gap (min)" value={meanGap === null ? "none yet" : `${meanGap.toFixed(3)} vs ${(1 / lambda).toFixed(3)}`} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Watch">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={() => setPlaying((v) => !v)}>
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button className="w-full" size="sm" onClick={() => simulate(500)}>
              <FastForward className="size-3.5" /> Simulate 500 minutes
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => clear()}>
              <RotateCcw className="size-4" /> Clear
            </Button>
          </div>
        </Panel>
        <Panel title="The stream">
          <SliderField
            label="Rate λ (arrivals per minute)"
            value={lambda}
            min={0.5}
            max={10}
            step={0.5}
            onChange={(v) => {
              setLambda(v);
              clear(v);
            }}
            hint="Arrivals are independent and the rate never changes. One simulated minute passes every two seconds."
          />
        </Panel>
      </div>
    </div>
  );
}

function MiniChart({
  title,
  observed,
  exact,
  labels,
  dots,
}: {
  title: string;
  observed: number[];
  exact: number[];
  labels: string[];
  dots?: boolean;
}) {
  const IW = CW - PAD.left - PAD.right;
  const IH = CH - PAD.top - PAD.bottom;
  const yMax = Math.max(...observed, ...exact) * 1.12 || 1;
  const slot = IW / observed.length;
  const sx = (i: number) => PAD.left + i * slot + slot / 2;
  const sy = (v: number) => PAD.top + IH * (1 - v / yMax);
  const curve = exact.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join("");
  return (
    <div className="rounded-2xl border border-line bg-surface p-3">
      <p className="mb-1 px-1 text-[11px] text-muted">{title}</p>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img" aria-label={title}>
        {observed.map((v, i) => (
          <rect
            key={i}
            x={sx(i) - slot * (dots ? 0.38 : 0.48)}
            y={sy(v)}
            width={slot * (dots ? 0.76 : 0.96)}
            height={Math.max(0, sy(0) - sy(v))}
            rx={dots ? 2 : 0}
            fill={OBSERVED}
          />
        ))}
        {dots ? (
          exact.map((v, i) => <circle key={i} cx={sx(i)} cy={sy(v)} r={3} fill={EXACT} />)
        ) : (
          <path d={curve} fill="none" stroke={EXACT} strokeWidth={2} />
        )}
        <line x1={PAD.left} x2={CW - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
        {labels.map((l, i) =>
          l ? (
            <text key={i} x={sx(i)} y={CH - 8} textAnchor="middle" className="fill-muted font-mono text-[9px]">
              {l}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}
