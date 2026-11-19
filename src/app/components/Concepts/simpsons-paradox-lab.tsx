"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";

type Scenario = "stones" | "scatter";

// Charig et al. (1986): recovery rates by treatment and stone size.
const RATES = {
  A: { small: 81 / 87, large: 192 / 263 },
  B: { small: 234 / 270, large: 55 / 80 },
};
const PER_ARM = 350;
const LARGE_TOTAL = 263 + 80;
const SMALL_TOTAL = 87 + 270;

const RECOVERED = rgb(CLASS_COLORS[1]);
const NOT_RECOVERED = "var(--line)";
const A_COLOR = rgb(CLASS_COLORS[2]);
const B_COLOR = rgb(CLASS_COLORS[3]);
const GROUP_COLORS = [CLASS_COLORS[2], CLASS_COLORS[1], CLASS_COLORS[3], CLASS_COLORS[0]];

const pct = (v: number) => `${(v * 100).toFixed(0)}%`;

/** Simpson's paradox twice: a real kidney-stone trial, and a scatter whose trend flips once you colour the groups. */
export default function SimpsonsParadoxLab() {
  const [scenario, setScenario] = useState<Scenario>("stones");
  return (
    <div className="space-y-4">
      <Segmented
        value={scenario}
        onChange={setScenario}
        options={[
          { value: "stones", label: "Kidney stones" },
          { value: "scatter", label: "Exercise and cholesterol" },
        ]}
      />
      {scenario === "stones" ? <StonesScenario /> : <ScatterScenario />}
    </div>
  );
}

function StonesScenario() {
  const [split, setSplit] = useState(false);
  const [largeToA, setLargeToA] = useState(263 / LARGE_TOTAL);

  // Each arm keeps 350 patients; the slider decides who gets the hard cases.
  const aLarge = Math.round(largeToA * LARGE_TOTAL);
  const arms = {
    A: { large: aLarge, small: PER_ARM - aLarge },
    B: { large: LARGE_TOTAL - aLarge, small: SMALL_TOTAL - (PER_ARM - aLarge) },
  };
  const table = (["A", "B"] as const).map((arm) => {
    const { small, large } = arms[arm];
    const recSmall = Math.round(small * RATES[arm].small);
    const recLarge = Math.round(large * RATES[arm].large);
    return {
      arm,
      small,
      large,
      recSmall,
      recLarge,
      rateSmall: small ? recSmall / small : 0,
      rateLarge: large ? recLarge / large : 0,
      rateAll: (recSmall + recLarge) / PER_ARM,
    };
  });
  const [a, b] = table;
  const paradox = a.rateSmall > b.rateSmall && a.rateLarge > b.rateLarge && a.rateAll < b.rateAll;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <Swatch color={RECOVERED} label="Recovered" />
            <Swatch color={NOT_RECOVERED} label="Did not recover" />
            {split && <span>Small stones on top, large stones underneath</span>}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {table.map((t) => (
              <PeopleGrid key={t.arm} row={t} split={split} color={t.arm === "A" ? A_COLOR : B_COLOR} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2/60 text-left text-xs text-muted">
                <th className="px-4 py-2 font-medium">Recovery rate</th>
                <th className="px-4 py-2 font-medium" style={{ color: A_COLOR }}>
                  Treatment A (open surgery)
                </th>
                <th className="px-4 py-2 font-medium" style={{ color: B_COLOR }}>
                  Treatment B (keyhole)
                </th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              <RateRow label="Small stones" a={a.rateSmall} b={b.rateSmall} na={`${a.recSmall}/${a.small}`} nb={`${b.recSmall}/${b.small}`} />
              <RateRow label="Large stones" a={a.rateLarge} b={b.rateLarge} na={`${a.recLarge}/${a.large}`} nb={`${b.recLarge}/${b.large}`} />
              <RateRow
                label="Everyone"
                a={a.rateAll}
                b={b.rateAll}
                na={`${a.recSmall + a.recLarge}/${PER_ARM}`}
                nb={`${b.recSmall + b.recLarge}/${PER_ARM}`}
                strong
              />
            </tbody>
          </table>
        </div>
        <p key={String(paradox)} className="anim-pop-in px-1 text-sm">
          {paradox
            ? "The paradox is on: A wins inside both groups and still loses overall, because A was given most of the hard, large-stone cases."
            : "No paradox at this allocation: the overall comparison points the same way as the groups."}
        </p>
      </div>

      <div className="space-y-4">
        <Panel title="The trial">
          <div className="space-y-5">
            <Toggle
              label="Split by stone size"
              checked={split}
              onChange={setSplit}
              hint="Regroup each treatment's patients by the size of their stone."
            />
            <SliderField
              label="Large stones sent to A"
              value={largeToA}
              min={0.03}
              max={1}
              step={0.01}
              format={(v) => pct(v)}
              onChange={setLargeToA}
              hint={`Share of the ${LARGE_TOTAL} large-stone patients who got treatment A. In the real study doctors chose, and they chose surgery for the hard cases (77%).`}
            />
          </div>
        </Panel>
        <Panel title="Why it happens">
          <p className="text-sm leading-relaxed text-muted">
            Stone size affects both which treatment a patient gets and how likely they are to recover. That makes it a
            confounder. Pooling mixes two very different groups in unequal proportions.
          </p>
        </Panel>
      </div>
    </div>
  );
}

const CELL = 9;
const GAP = 2;
const COLS = 20;

function PeopleGrid({
  row,
  split,
  color,
}: {
  row: { arm: string; small: number; large: number; recSmall: number; recLarge: number };
  split: boolean;
  color: string;
}) {
  // Every patient keeps a stable key, so toggling the split moves them rather than redrawing them.
  const people = [
    ...Array.from({ length: row.small }, (_, i) => ({ key: `s${i}`, size: "small" as const, rec: i < row.recSmall })),
    ...Array.from({ length: row.large }, (_, i) => ({ key: `l${i}`, size: "large" as const, rec: i < row.recLarge })),
  ];
  const step = CELL + GAP;
  const smallRows = Math.ceil(row.small / COLS);
  const labelGap = 22;
  const place = (index: number, offset: number) => ({ x: (index % COLS) * step, y: offset + Math.floor(index / COLS) * step });

  const pooledOrder = [...people].sort((p, q) => Number(q.rec) - Number(p.rec));
  const positions = new Map<string, { x: number; y: number }>();
  if (split) {
    let si = 0;
    let li = 0;
    const smallSorted = people.filter((p) => p.size === "small");
    const largeSorted = people.filter((p) => p.size === "large");
    smallSorted.forEach((p) => positions.set(p.key, place(si++, labelGap)));
    largeSorted.forEach((p) => positions.set(p.key, place(li++, labelGap * 2 + smallRows * step)));
  } else {
    pooledOrder.forEach((p, i) => positions.set(p.key, place(i, labelGap)));
  }
  const height = split ? labelGap * 2 + (smallRows + Math.ceil(row.large / COLS)) * step : labelGap + Math.ceil(PER_ARM / COLS) * step;

  return (
    <div>
      <p className="mb-1 text-sm font-medium" style={{ color }}>
        Treatment {row.arm}
      </p>
      <svg viewBox={`0 0 ${COLS * step} ${Math.max(height, 260)}`} className="w-full" role="img" aria-label={`Patients given treatment ${row.arm}`}>
        {split ? (
          <>
            <text x={0} y={14} className="fill-muted text-[10px]">
              Small stones ({row.small})
            </text>
            <text x={0} y={labelGap + smallRows * step + 14} className="fill-muted text-[10px]">
              Large stones ({row.large})
            </text>
          </>
        ) : (
          <text x={0} y={14} className="fill-muted text-[10px]">
            All {PER_ARM} patients
          </text>
        )}
        {people.map((p) => {
          const pos = positions.get(p.key)!;
          return (
            <rect
              key={p.key}
              width={CELL}
              height={CELL}
              rx={2}
              fill={p.rec ? RECOVERED : NOT_RECOVERED}
              className="motion-safe:transition-transform motion-safe:duration-700"
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function RateRow({ label, a, b, na, nb, strong }: { label: string; a: number; b: number; na: string; nb: string; strong?: boolean }) {
  const cell = (v: number, n: string, win: boolean, color: string) => (
    <td className="px-4 py-2.5">
      <span className={win ? "font-semibold" : "text-muted"} style={win ? { color } : undefined}>
        {pct(v)}
      </span>
      <span className="ml-2 text-xs text-muted">{n}</span>
    </td>
  );
  return (
    <tr className={strong ? "border-t-2 border-line" : "border-b border-line"}>
      <td className="px-4 py-2.5 font-sans">{strong ? <strong>{label}</strong> : label}</td>
      {cell(a, na, a > b, A_COLOR)}
      {cell(b, nb, b > a, B_COLOR)}
    </tr>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-3 rounded-[3px]" style={{ background: color }} />
      {label}
    </span>
  );
}

// Scenario two: four age groups. Within each, more exercise means lower cholesterol,
// but older groups both exercise more and have higher cholesterol.
const W = 640;
const H = 380;
const PAD = { top: 16, right: 16, bottom: 40, left: 52 };
const GROUPS = ["20s", "30s", "40s", "50s"];

const base = (() => {
  const r = createRandom(97);
  return GROUPS.flatMap((_, g) => Array.from({ length: 30 }, () => ({ g, u: r.gaussian(), v: r.gaussian() })));
})();

const fit = (pts: { x: number; y: number }[]) => {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  const sxy = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0);
  const sxx = pts.reduce((s, p) => s + (p.x - mx) ** 2, 0);
  const slope = sxx ? sxy / sxx : 0;
  const xs = pts.map((p) => p.x);
  return { slope, intercept: my - slope * mx, lo: Math.min(...xs), hi: Math.max(...xs) };
};

function ScatterScenario() {
  const [byGroup, setByGroup] = useState(false);
  const [spread, setSpread] = useState(0.8);

  // Group centres slide up and to the right as the confounder gets stronger.
  const pts = base.map(({ g, u, v }) => {
    const cx = 3 + g * 1.6 * spread;
    const cy = 190 + g * 22 * spread;
    const x = cx + u * 0.9;
    return { g, x, y: cy - 9 * (x - cx) + v * 7 };
  });
  const overall = fit(pts);
  const groups = GROUPS.map((_, g) => fit(pts.filter((p) => p.g === g)));
  const within = groups.reduce((s, f) => s + f.slope, 0) / groups.length;

  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const [x0, x1] = [Math.min(...xs) - 0.5, Math.max(...xs) + 0.5];
  const [y0, y1] = [Math.min(...ys) - 8, Math.max(...ys) + 8];
  const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * (W - PAD.left - PAD.right);
  const sy = (y: number) => PAD.top + (1 - (y - y0) / (y1 - y0)) * (H - PAD.top - PAD.bottom);
  const line = (f: ReturnType<typeof fit>) => ({ x1: sx(f.lo), y1: sy(f.intercept + f.slope * f.lo), x2: sx(f.hi), y2: sy(f.intercept + f.slope * f.hi) });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-ink" /> Everyone pooled
            </span>
            {byGroup &&
              GROUPS.map((label, g) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: rgb(GROUP_COLORS[g]) }} /> {label}
                </span>
              ))}
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Exercise against cholesterol, by age group">
            <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="var(--muted)" opacity={0.6} />
            <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--muted)" opacity={0.6} />
            <text x={W - PAD.right} y={H - 10} textAnchor="end" className="fill-muted text-[11px]">
              hours of exercise per week
            </text>
            <text x={PAD.left + 6} y={PAD.top + 10} className="fill-muted text-[11px]">
              cholesterol
            </text>
            {pts.map((p, i) => (
              <circle
                key={i}
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={4.5}
                fill={byGroup ? rgb(GROUP_COLORS[p.g], 0.85) : "var(--muted)"}
                opacity={byGroup ? 1 : 0.55}
                className="motion-safe:transition-[fill] motion-safe:duration-500"
              />
            ))}
            {byGroup &&
              groups.map((f, g) => <line key={g} {...line(f)} stroke={rgb(GROUP_COLORS[g])} strokeWidth={2.5} className="anim-pop-in" />)}
            <line {...line(overall)} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray={byGroup ? "6 5" : undefined} />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <div className="bg-surface px-4 py-3">
            <p className="text-[11px] text-muted">Slope, everyone pooled</p>
            <p className="mt-1 font-mono text-sm tabular-nums">{overall.slope >= 0 ? "+" : ""}{overall.slope.toFixed(1)} per hour</p>
          </div>
          <div className="bg-surface px-4 py-3">
            <p className="text-[11px] text-muted">Average slope within an age group</p>
            <p className="mt-1 font-mono text-sm tabular-nums">{within >= 0 ? "+" : ""}{within.toFixed(1)} per hour</p>
          </div>
        </div>
        <p className="px-1 text-sm">
          {overall.slope > 0
            ? "Pooled, exercise seems to raise cholesterol. Inside every age group it lowers it. Age drives both."
            : "With the groups close together, the pooled trend and the within-group trend agree."}
        </p>
      </div>

      <div className="space-y-4">
        <Panel title="The data">
          <div className="space-y-5">
            <Toggle
              label="Colour by age group"
              checked={byGroup}
              onChange={setByGroup}
              hint="Reveal the hidden variable and fit one line per group."
            />
            <SliderField
              label="How strongly age drives both"
              value={spread}
              min={0}
              max={1.2}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={setSpread}
              hint="At 0 every age group exercises the same amount and the paradox disappears."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
