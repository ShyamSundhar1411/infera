"use client";

import { useRef, useState } from "react";
import { RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom, type Random } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

const N = 300;
const W = 640;
const H = 520;
const PAD = { top: 16, right: 16, bottom: 40, left: 48 };
const LO = 35;
const HI = 105;

const TOP = rgb(CLASS_COLORS[0]);
const BOTTOM = rgb(CLASS_COLORS[2]);
const FIT = rgb(CLASS_COLORS[1]);

const normals = (r: Random) => Array.from({ length: N }, () => r.gaussian());

/** Students with a fixed skill and fresh luck on every test. The stars of test one fall back on test two. */
export default function RegressionToMeanLab() {
  const [luck, setLuck] = useState(0.5);
  const [cut, setCut] = useState(0.1);
  const [skill, setSkill] = useState(() => normals(createRandom(5)));
  const [luck1, setLuck1] = useState(() => normals(createRandom(6)));
  const [luck2, setLuck2] = useState(() => normals(createRandom(8)));
  const [round, setRound] = useState(1);
  const rand = useRef(createRandom(81));

  // Standardised parts mixed so the spread of every test is the same: only the share of luck changes.
  const score = (s: number, l: number) => 70 + 10 * (Math.sqrt(1 - luck) * s + Math.sqrt(luck) * l);
  const t1 = skill.map((s, i) => score(s, luck1[i]));
  const t2 = skill.map((s, i) => score(s, luck2[i]));

  const order = t1.map((v, i) => [v, i] as const).sort((a, b) => b[0] - a[0]);
  const k = Math.max(1, Math.round(cut * N));
  const top = new Set(order.slice(0, k).map(([, i]) => i));
  const bottom = new Set(order.slice(-k).map(([, i]) => i));
  const avg = (vals: number[], set: Set<number>) => vals.filter((_, i) => set.has(i)).reduce((s, v) => s + v, 0) / set.size;

  const m1 = t1.reduce((s, v) => s + v, 0) / N;
  const m2 = t2.reduce((s, v) => s + v, 0) / N;
  const slope = t1.reduce((s, v, i) => s + (v - m1) * (t2[i] - m2), 0) / t1.reduce((s, v) => s + (v - m1) ** 2, 0);

  const sx = (v: number) => PAD.left + ((Math.min(HI, Math.max(LO, v)) - LO) / (HI - LO)) * (W - PAD.left - PAD.right);
  const sy = (v: number) => PAD.top + (1 - (Math.min(HI, Math.max(LO, v)) - LO) / (HI - LO)) * (H - PAD.top - PAD.bottom);
  const fitAt = (x: number) => m2 + slope * (x - m1);

  const nextTest = () => {
    setLuck2(normals(rand.current));
    setRound((r) => r + 1);
  };
  const newClass = () => {
    setSkill(normals(rand.current));
    setLuck1(normals(rand.current));
    setLuck2(normals(rand.current));
    setRound(1);
  };

  const topBefore = avg(t1, top);
  const topAfter = avg(t2, top);
  const botBefore = avg(t1, bottom);
  const botAfter = avg(t2, bottom);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
            <Key color={TOP} label={`Top ${(cut * 100).toFixed(0)}% on test 1`} dot />
            <Key color={BOTTOM} label={`Bottom ${(cut * 100).toFixed(0)}% on test 1`} dot />
            <Key color="var(--muted)" label="Same score twice (y = x)" dashed />
            <Key color={FIT} label="Best-fit line" />
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="First test score against second test score">
            {[40, 50, 60, 70, 80, 90, 100].map((t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--line)" />
                <line x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} stroke="var(--line)" />
                <text x={sx(t)} y={H - PAD.bottom + 16} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
                <text x={PAD.left - 8} y={sy(t) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
              </g>
            ))}
            <text x={W - PAD.right} y={H - 6} textAnchor="end" className="fill-muted text-[11px]">
              test 1
            </text>
            <text x={PAD.left + 6} y={PAD.top + 12} className="fill-muted text-[11px]">
              test {round + 1}
            </text>
            <line x1={sx(LO)} y1={sy(LO)} x2={sx(HI)} y2={sy(HI)} stroke="var(--muted)" strokeDasharray="6 5" />
            {t1.map((x, i) => {
              const group = top.has(i) ? TOP : bottom.has(i) ? BOTTOM : null;
              return (
                <circle
                  key={i}
                  cx={0}
                  cy={0}
                  r={group ? 4.5 : 3.5}
                  fill={group ?? "var(--muted)"}
                  opacity={group ? 0.95 : 0.35}
                  className="motion-safe:transition-transform motion-safe:duration-700"
                  style={{ transform: `translate(${sx(x)}px, ${sy(t2[i])}px)` }}
                />
              );
            })}
            <line x1={sx(LO)} y1={sy(fitAt(LO))} x2={sx(HI)} y2={sy(fitAt(HI))} stroke={FIT} strokeWidth={2.5} />
            {/* Group averages: where they were on test 1, and where they landed. */}
            {[
              [topBefore, topAfter, TOP],
              [botBefore, botAfter, BOTTOM],
            ].map(([before, after, color]) => (
              <g key={color as string}>
                <line
                  x1={sx(before as number)}
                  x2={sx(before as number)}
                  y1={sy(before as number)}
                  y2={sy(after as number)}
                  stroke={color as string}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
                <circle cx={sx(before as number)} cy={sy(before as number)} r={6} fill="none" stroke={color as string} strokeWidth={2} />
                <circle cx={sx(before as number)} cy={sy(after as number)} r={7} fill={color as string} stroke="var(--surface)" strokeWidth={2} />
              </g>
            ))}
          </svg>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <Shift label={`Top ${(cut * 100).toFixed(0)}% on test 1`} before={topBefore} after={topAfter} color={TOP} />
          <Shift label={`Bottom ${(cut * 100).toFixed(0)}% on test 1`} before={botBefore} after={botAfter} color={BOTTOM} />
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="Students" value={String(N)} />
          <Stat label="Test-retest correlation" value={(1 - luck).toFixed(2)} />
          <Stat label="Best-fit slope" value={slope.toFixed(2)} />
          <Stat label="Class average" value={`${m1.toFixed(1)} → ${m2.toFixed(1)}`} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Test again">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={nextTest}>
              <Shuffle className="size-4" /> Run the next test
            </Button>
            <Button className="w-full" variant="ghost" onClick={newClass}>
              <RotateCcw className="size-4" /> New class
            </Button>
            <p className="text-xs leading-relaxed text-muted">
              Same students, same skill, fresh luck. Nobody was taught, praised or punished in between.
            </p>
          </div>
        </Panel>
        <Panel title="The class">
          <div className="space-y-5">
            <SliderField
              label="How much is luck"
              value={luck}
              min={0}
              max={0.95}
              step={0.05}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={setLuck}
              hint="The share of score variation due to luck on the day. At 0% the scores repeat exactly and nothing regresses."
            />
            <SliderField
              label="Group size"
              value={cut}
              min={0.02}
              max={0.3}
              step={0.01}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={setCut}
              hint="How many of the best and worst test-1 students to follow."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Shift({ label, before, after, color }: { label: string; before: number; after: number; color: string }) {
  const change = after - before;
  return (
    <div className="bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl tabular-nums">
        {before.toFixed(1)} <span className="text-muted">→</span> <span style={{ color }}>{after.toFixed(1)}</span>
      </p>
      <p key={change.toFixed(1)} className="anim-pop-in mt-1 text-xs text-muted">
        {Math.abs(change) < 0.5 ? "barely moved" : change < 0 ? `fell ${(-change).toFixed(1)} points` : `rose ${change.toFixed(1)} points`}
      </p>
    </div>
  );
}

function Key({ color, label, dashed, dot }: { color: string; label: string; dashed?: boolean; dot?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      {dot ? (
        <span className="size-2.5 rounded-full" style={{ background: color }} />
      ) : (
        <span className="h-0.5 w-4" style={dashed ? { borderTop: `2px dashed ${color}` } : { background: color }} />
      )}
      {label}
    </span>
  );
}
