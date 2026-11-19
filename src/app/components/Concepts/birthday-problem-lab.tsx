"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const PERSON = rgb(CLASS_COLORS[2]);
const MATCH = rgb(CLASS_COLORS[0]);
const SIM = rgb(CLASS_COLORS[1]);
const ADD_MS = 260;

/** P(at least one shared day) with n people and d equally likely days. */
const pMatch = (n: number, d: number) => {
  let none = 1;
  for (let k = 0; k < n; k++) none *= Math.max(0, 1 - k / d);
  return 1 - none;
};

/** Day index to a calendar position: month row, day column. */
const calendarSpot = (day: number) => {
  let m = 0;
  let d = day;
  while (d >= MONTH_DAYS[m]) d -= MONTH_DAYS[m++];
  return { row: m, col: d };
};
const dayLabel = (day: number, days: number) => {
  if (days !== 365) return `#${day + 1}`;
  const { row, col } = calendarSpot(day);
  return `${MONTHS[row]} ${col + 1}`;
};

/** People walk into a room one at a time; how soon do two share a birthday? */
export default function BirthdayProblemLab() {
  const [days, setDays] = useState(365);
  const [people, setPeople] = useState<number[]>([]);
  const [filling, setFilling] = useState(false);
  const [firstMatches, setFirstMatches] = useState<number[]>([]);
  const rand = useRef(createRandom(29));

  const counts = new Map<number, number[]>();
  people.forEach((day, i) => counts.set(day, [...(counts.get(day) ?? []), i]));
  const shared = [...counts.entries()].filter(([, who]) => who.length > 1);
  const hasMatch = shared.length > 0;
  const firstShared = shared.length ? shared.reduce((a, b) => (Math.max(...a[1]) < Math.max(...b[1]) ? a : b)) : null;
  const running = filling && !hasMatch && people.length <= days;

  const addPerson = () => setPeople((p) => (p.length > days ? p : [...p, rand.current.int(days)]));

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPeople((p) => [...p, rand.current.int(days)]), ADD_MS);
    return () => clearInterval(id);
  }, [running, days]);

  const empty = () => {
    setPeople([]);
    setFilling(false);
  };

  const simulate = () => {
    const runs: number[] = [];
    for (let r = 0; r < 1000; r++) {
      const seen = new Set<number>();
      let n = 0;
      for (;;) {
        n++;
        const day = rand.current.int(days);
        if (seen.has(day)) break;
        seen.add(day);
      }
      runs.push(n);
    }
    setFirstMatches((f) => f.concat(runs));
  };

  const n = people.length;
  const p = pMatch(n, days);
  let n50 = 1;
  while (pMatch(n50, days) < 0.5) n50++;
  const nMax = Math.max(n50 * 3, n + 2, 10);

  // Grid of possible birthdays: a real calendar for 365 days, a square-ish block otherwise.
  const calendar = days === 365;
  const cols = calendar ? 31 : Math.ceil(Math.sqrt(days * 2.2));
  const rows = calendar ? 12 : Math.ceil(days / cols);
  const cell = Math.min(18, Math.floor(620 / cols));
  const gap = cell > 8 ? 2 : 1;
  const gx = calendar ? 34 : 0;
  const spot = (day: number) => (calendar ? calendarSpot(day) : { row: Math.floor(day / cols), col: day % cols });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">
              {n === 0 ? "The room is empty." : `${n} ${n === 1 ? "person" : "people"} in the room.`}
            </p>
            {firstShared && (
              <p key={firstShared[0]} className="anim-pop-in text-sm font-medium" style={{ color: MATCH }}>
                Match: people {firstShared[1].map((i) => i + 1).join(" and ")} share {dayLabel(firstShared[0], days)}
              </p>
            )}
          </div>
          <div className="flex min-h-[40px] flex-wrap gap-1">
            {people.map((day, i) => {
              const match = (counts.get(day)?.length ?? 0) > 1;
              return (
                <span
                  key={i}
                  title={dayLabel(day, days)}
                  className="anim-pop-in grid size-7 place-items-center rounded-full font-mono text-[10px] font-semibold text-white"
                  style={{ background: match ? MATCH : PERSON }}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
          <svg
            viewBox={`0 0 ${gx + cols * (cell + gap)} ${rows * (cell + gap)}`}
            className="mt-4 w-full"
            role="img"
            aria-label="Every possible birthday, with the ones taken so far filled in"
          >
            {calendar &&
              MONTHS.map((m, r) => (
                <text key={m} x={0} y={r * (cell + gap) + cell * 0.75} className="fill-muted text-[10px]">
                  {m}
                </text>
              ))}
            {Array.from({ length: days }, (_, day) => {
              const { row, col } = spot(day);
              const who = counts.get(day)?.length ?? 0;
              return (
                <rect
                  key={`${days}-${day}-${who}`}
                  x={gx + col * (cell + gap)}
                  y={row * (cell + gap)}
                  width={cell}
                  height={cell}
                  rx={Math.min(3, cell / 4)}
                  fill={who > 1 ? MATCH : who === 1 ? PERSON : "var(--surface-2)"}
                  className={who ? "anim-pop-in" : undefined}
                  style={who ? { transformOrigin: "center", transformBox: "fill-box" } : undefined}
                />
              );
            })}
          </svg>
        </div>

        <MatchCurve days={days} n={n} nMax={nMax} n50={n50} firstMatches={firstMatches} />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat label="People" value={String(n)} />
          <Stat label="Pairs to compare" value={String((n * (n - 1)) / 2)} />
          <Stat label="Chance of a match" value={`${(p * 100).toFixed(1)}%`} />
          <Stat label="People for 50%" value={`${n50} (about ${(1.1774 * Math.sqrt(days)).toFixed(1)})`} />
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="The room">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={addPerson} disabled={running}>
              <UserPlus className="size-4" /> Add a person
            </Button>
            <Button className="w-full" onClick={() => setFilling(!running)} disabled={hasMatch}>
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? "Stop" : "Fill until a match"}
            </Button>
            <Button size="sm" className="w-full" onClick={simulate}>
              Run 1,000 rooms
            </Button>
            <Button className="w-full" variant="ghost" onClick={empty}>
              <RotateCcw className="size-4" /> Empty the room
            </Button>
          </div>
        </Panel>
        <Panel title="Possible birthdays">
          <SliderField
            label="Possible birthdays"
            value={days}
            min={10}
            max={2000}
            step={1}
            log
            onChange={(v) => {
              setDays(v);
              setPeople([]);
              setFilling(false);
              setFirstMatches([]);
            }}
            format={(v) => (v === 365 ? "365 (a year)" : String(v))}
            hint="Any number of equally likely slots: days of the year, hash buckets, lottery numbers. A match shows up after roughly the square root of this many people."
          />
          <div className="mt-3 flex gap-2">
            {[365, 1000].map((d) => (
              <Button
                key={d}
                size="sm"
                variant={days === d ? "solid" : "outline"}
                onClick={() => {
                  setDays(d);
                  setPeople([]);
                  setFilling(false);
                  setFirstMatches([]);
                }}
              >
                {d === 365 ? "Calendar" : "1,000 buckets"}
              </Button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const CW = 640;
const CH = 240;
const CP = { top: 16, right: 14, bottom: 30, left: 44 };

function MatchCurve({ days, n, nMax, n50, firstMatches }: { days: number; n: number; nMax: number; n50: number; firstMatches: number[] }) {
  const sx = (k: number) => CP.left + (k / nMax) * (CW - CP.left - CP.right);
  const sy = (v: number) => CP.top + (1 - v) * (CH - CP.top - CP.bottom);
  const exact = Array.from({ length: nMax + 1 }, (_, k) => `${k ? "L" : "M"}${sx(k).toFixed(1)},${sy(pMatch(k, days)).toFixed(1)}`).join("");
  // Simulated: the share of rooms whose first match had come by k people.
  const sim = firstMatches.length
    ? Array.from({ length: nMax + 1 }, (_, k) => firstMatches.filter((m) => m <= k).length / firstMatches.length)
    : null;
  const ticks = Array.from({ length: 6 }, (_, i) => Math.round((i * nMax) / 5));
  const pNow = pMatch(n, days);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-2 flex flex-wrap gap-4 px-1 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4" style={{ background: MATCH }} /> Exact chance of at least one shared day
        </span>
        {sim && (
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: SIM }} /> Your {firstMatches.length.toLocaleString()} simulated rooms
          </span>
        )}
      </div>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img" aria-label="Chance of a shared birthday against the number of people">
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={CP.left} x2={CW - CP.right} y1={sy(v)} y2={sy(v)} stroke="var(--line)" />
            <text x={CP.left - 6} y={sy(v) + 3} textAnchor="end" className="fill-muted font-mono text-[10px]">
              {v * 100}%
            </text>
          </g>
        ))}
        {ticks.map((k) => (
          <text key={k} x={sx(k)} y={CH - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
            {k}
          </text>
        ))}
        <text x={CW - CP.right} y={CH - 10} textAnchor="end" className="fill-muted text-[10px]">
          people
        </text>
        <line x1={sx(n50)} x2={sx(n50)} y1={sy(0.5)} y2={sy(0)} stroke="var(--muted)" strokeDasharray="3 3" />
        <text x={sx(n50) + 5} y={sy(0.5) - 6} className="fill-muted font-mono text-[10px]">
          {n50} people: {(pMatch(n50, days) * 100).toFixed(1)}%
        </text>
        <path d={exact} fill="none" stroke={MATCH} strokeWidth={2.5} />
        {sim?.map((v, k) => <circle key={k} cx={sx(k)} cy={sy(v)} r={2.5} fill={SIM} />)}
        {n > 0 && (
          <g>
            <line x1={sx(n)} x2={sx(n)} y1={CP.top} y2={sy(0)} stroke={PERSON} strokeWidth={1.5} />
            <circle cx={sx(n)} cy={sy(pNow)} r={5} fill={PERSON} stroke="var(--surface)" strokeWidth={2} />
          </g>
        )}
      </svg>
    </div>
  );
}
