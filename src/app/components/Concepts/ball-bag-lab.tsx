"use client";

import { useRef, useState } from "react";
import { Eye, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { Tex } from "@/components/ui/tex";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";

const BALLS = 10;
const MAX_DRAWS = 24;
const RED = rgb(CLASS_COLORS[0]);
const BLUE = rgb(CLASS_COLORS[5]);
const BAG_A = rgb(CLASS_COLORS[3]);
const BAG_B = rgb(CLASS_COLORS[1]);

type Bag = "A" | "B";

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

/** Two bags of red and blue balls. A biased coin hides one; every ball you draw is evidence. */
export default function BallBagLab() {
  const [priorA, setPriorA] = useState(0.5);
  const [redA, setRedA] = useState(3);
  const [redB, setRedB] = useState(8);
  const [secret, setSecret] = useState<Bag>("A");
  const [draws, setDraws] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [record, setRecord] = useState({ right: 0, played: 0 });
  const [tally, setTally] = useState({
    redFromA: 0,
    redFromB: 0,
    blueFromA: 0,
    blueFromB: 0,
  });
  const rand = useRef(createRandom(31));

  const pickBag = (): Bag => (rand.current.next() < priorA ? "A" : "B");
  const drawFrom = (bag: Bag) =>
    rand.current.next() < (bag === "A" ? redA : redB) / BALLS ? 1 : 0;

  const newRound = () => {
    setSecret(pickBag());
    setDraws([]);
    setRevealed(false);
  };

  // Changing a bag or the coin starts a fresh game, since the old evidence no longer applies.
  const change = (set: (v: number) => void) => (v: number) => {
    set(v);
    setRecord({ right: 0, played: 0 });
    setTally({ redFromA: 0, redFromB: 0, blueFromA: 0, blueFromB: 0 });
    newRound();
  };

  const draw = () => {
    if (revealed || draws.length >= MAX_DRAWS) return;
    setDraws((d) => [...d, drawFrom(secret)]);
  };

  // P(evidence | bag) for the whole sequence; balls go back in, so draws are independent.
  const likelihood = (bag: Bag) => {
    const r = (bag === "A" ? redA : redB) / BALLS;
    return draws.reduce((l, ball) => l * (ball ? r : 1 - r), 1);
  };
  const jointA = priorA * likelihood("A");
  const jointB = (1 - priorA) * likelihood("B");
  const postA = jointA + jointB > 0 ? jointA / (jointA + jointB) : priorA;
  const guess: Bag = postA >= 0.5 ? "A" : "B";

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    setRecord((r) => ({
      right: r.right + (guess === secret ? 1 : 0),
      played: r.played + 1,
    }));
  };

  // A thousand one-ball rounds, counted the way a frequentist would.
  const simulate = () => {
    const t = { ...tally };
    for (let i = 0; i < 1000; i++) {
      const bag = pickBag();
      const ball = drawFrom(bag);
      if (ball && bag === "A") t.redFromA++;
      else if (ball) t.redFromB++;
      else if (bag === "A") t.blueFromA++;
      else t.blueFromB++;
    }
    setTally(t);
  };

  const last = draws[draws.length - 1];
  const prevDraws = draws.slice(0, -1);
  const prevJoint = (bag: Bag, prior: number) => {
    const r = (bag === "A" ? redA : redB) / BALLS;
    return prior * prevDraws.reduce((l, ball) => l * (ball ? r : 1 - r), 1);
  };
  const before = draws.length
    ? prevJoint("A", priorA) /
      (prevJoint("A", priorA) + prevJoint("B", 1 - priorA) || 1)
    : priorA;
  const lA = last ? redA / BALLS : 1 - redA / BALLS;
  const lB = last ? redB / BALLS : 1 - redB / BALLS;
  const f = (v: number) => v.toFixed(3);
  const reds = tally.redFromA + tally.redFromB;
  const exactRed =
    (priorA * redA) /
    BALLS /
    ((priorA * redA) / BALLS + ((1 - priorA) * redB) / BALLS || 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <BagView
              label="Bag A"
              color={BAG_A}
              red={redA}
              highlight={revealed && secret === "A"}
            />
            <div className="flex flex-col items-center gap-2 px-2">
              <div
                className="grid h-24 w-20 place-items-center rounded-b-[2rem] rounded-t-lg border-2 border-dashed font-display text-4xl transition-colors duration-500"
                style={{
                  borderColor: revealed
                    ? secret === "A"
                      ? BAG_A
                      : BAG_B
                    : "var(--line)",
                  color: revealed
                    ? secret === "A"
                      ? BAG_A
                      : BAG_B
                    : "var(--muted)",
                }}
                aria-label={
                  revealed
                    ? `The hidden bag was bag ${secret}`
                    : "The hidden bag"
                }
              >
                {revealed ? secret : "?"}
              </div>
              <span className="text-xs text-muted">hidden bag</span>
            </div>
            <BagView
              label="Bag B"
              color={BAG_B}
              red={redB}
              highlight={revealed && secret === "B"}
            />
          </div>

          <div
            className="mt-5 flex min-h-[44px] flex-wrap items-center gap-1.5 rounded-xl bg-surface-2/60 p-2"
            aria-label="Balls drawn so far"
          >
            {draws.length === 0 && (
              <span className="px-1 text-sm text-muted">
                Draw a ball. It goes back in the bag afterwards.
              </span>
            )}
            {draws.map((ball, i) => (
              <span
                key={i}
                className={`size-7 rounded-full shadow-sm ${i === draws.length - 1 ? "anim-ball-draw" : ""}`}
                style={{ background: ball ? RED : BLUE }}
                title={ball ? "red" : "blue"}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm text-muted">
              Belief after {draws.length} ball{draws.length === 1 ? "" : "s"}
            </p>
            <p className="font-mono text-sm tabular-nums">
              <span style={{ color: BAG_A }}>A {pct(postA)}</span>
              <span className="mx-2 text-muted">·</span>
              <span style={{ color: BAG_B }}>B {pct(1 - postA)}</span>
            </p>
          </div>
          <div className="mt-3 flex h-6 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${postA * 100}%`, background: BAG_A }}
            />
            <div
              className="h-full flex-1 transition-all duration-500"
              style={{ background: BAG_B }}
            />
          </div>
          {draws.length > 0 && (
            <div className="mt-4 overflow-x-auto text-[15px]">
              <p className="text-xs text-muted">
                The last ball was {last ? "red" : "blue"}, so
              </p>
              <Tex
                display
              >{String.raw`P(A \mid \text{${last ? "red" : "blue"}}) = \frac{${f(lA)} \times ${f(before)}}{${f(lA)} \times ${f(before)} + ${f(lB)} \times ${f(1 - before)}} = ${f(postA)}`}</Tex>
              <p className="text-xs text-muted">
                The belief before this ball ({f(before)}) was the prior for this
                update.
              </p>
            </div>
          )}
          {revealed && (
            <p className="anim-pop-in mt-4 text-sm">
              You would have guessed <strong>bag {guess}</strong>.{" "}
              {guess === secret
                ? "Right."
                : "Wrong this time: unlikely evidence does happen."}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Check it by counting: play many one-ball rounds and keep only the
              red draws.
            </p>
            <Button size="sm" onClick={simulate}>
              Play 1,000 rounds
            </Button>
          </div>
          {reds > 0 && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex h-5 overflow-hidden rounded-full">
                <div
                  style={{
                    width: `${(tally.redFromA / reds) * 100}%`,
                    background: BAG_A,
                  }}
                />
                <div className="flex-1" style={{ background: BAG_B }} />
              </div>
              <p>
                Of <span className="font-mono">{reds}</span> red balls,{" "}
                <span className="font-mono">{tally.redFromA}</span> came from
                bag A:{" "}
                <span className="font-mono">{pct(tally.redFromA / reds)}</span>.
                Bayes&apos; theorem says{" "}
                <span className="font-mono">{pct(exactRed)}</span>.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Play">
          <div className="space-y-3">
            <Button
              className="w-full"
              variant="accent"
              onClick={draw}
              disabled={revealed || draws.length >= MAX_DRAWS}
            >
              Draw a ball
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={reveal} disabled={revealed}>
                <Eye className="size-3.5" /> Reveal bag
              </Button>
              <Button size="sm" onClick={newRound}>
                <Shuffle className="size-3.5" /> New round
              </Button>
            </div>
            <p className="text-xs text-muted">
              Guessed right {record.right} of {record.played} rounds.
            </p>
          </div>
        </Panel>
        <Panel
          title="Set up the game"
          action={
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setRedA(3);
                setRedB(8);
                change(setPriorA)(0.5);
              }}
              title="Back to the defaults"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          }
        >
          <div className="space-y-5">
            <SliderField
              label="Coin bias: P(bag A)"
              value={priorA}
              min={0.05}
              max={0.95}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={change(setPriorA)}
              hint="A weighted coin chooses the bag. This is the prior, before any ball is seen."
            />
            <SliderField
              label="Red balls in bag A"
              value={redA}
              min={0}
              max={BALLS}
              step={1}
              format={(v) => `${v} / ${BALLS}`}
              onChange={change(setRedA)}
            />
            <SliderField
              label="Red balls in bag B"
              value={redB}
              min={0}
              max={BALLS}
              step={1}
              format={(v) => `${v} / ${BALLS}`}
              onChange={change(setRedB)}
              hint="The bigger the difference between the bags, the more each ball tells you."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function BagView({
  label,
  color,
  red,
  highlight,
}: {
  label: string;
  color: string;
  red: number;
  highlight: boolean;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-3 transition-colors duration-500"
      style={{ borderColor: highlight ? color : "var(--line)" }}
    >
      <p className="mb-2 text-sm font-medium" style={{ color }}>
        {label}
      </p>
      <div className="grid w-fit grid-cols-5 gap-1.5">
        {Array.from({ length: BALLS }, (_, i) => (
          <span
            key={i}
            className="size-6 rounded-full transition-colors duration-300"
            style={{ background: i < red ? RED : BLUE }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">
        P(red) = {(red / BALLS).toFixed(1)}
      </p>
    </div>
  );
}
