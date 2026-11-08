"use client";

import { useEffect, useRef, useState } from "react";
import { Repeat, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";

type Stage = "pick" | "host" | "decide" | "done" | "spoiled";
type Strategy = "stick" | "switch";

const ACE = rgb(CLASS_COLORS[0]);
const STICK = rgb(CLASS_COLORS[2]);
const SWITCH = rgb(CLASS_COLORS[1]);
const HOST_GAP = 320;

const emptyScore = () => ({ stick: { won: 0, played: 0 }, switch: { won: 0, played: 0 }, spoiled: 0 });

/** Monty Hall with playing cards: find the ace. The host turns over losers, then you stick or switch. */
export default function MontyHallLab() {
  const [n, setN] = useState(3);
  const [hostKnows, setHostKnows] = useState(true);
  const rand = useRef(createRandom(71));
  const [ace, setAce] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean[]>(() => Array(3).fill(false));
  const [offer, setOffer] = useState<number | null>(null);
  const [final, setFinal] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [score, setScore] = useState(emptyScore);
  const [round, setRound] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const deal = (cards = n) => {
    clearTimers();
    setAce(rand.current.int(cards));
    setPick(null);
    setOffer(null);
    setFinal(null);
    setOpen(Array(cards).fill(false));
    setStage("pick");
    setRound((r) => r + 1);
  };

  /** Which cards the host turns over, and which one stays closed as the alternative. */
  const hostMoves = (aceAt: number, chosen: number, cards: number, knows: boolean) => {
    const others = Array.from({ length: cards }, (_, i) => i).filter((i) => i !== chosen);
    let keep: number;
    if (knows) keep = aceAt === chosen ? others[rand.current.int(others.length)] : aceAt;
    else keep = others[rand.current.int(others.length)];
    return { flips: rand.current.shuffle(others.filter((i) => i !== keep)), keep };
  };

  const choose = (i: number) => {
    if (stage !== "pick") return;
    setPick(i);
    setStage("host");
    const { flips, keep } = hostMoves(ace, i, n, hostKnows);
    flips.forEach((c, j) =>
      timers.current.push(
        setTimeout(() => setOpen((o) => o.map((v, k) => v || k === c)), 300 + j * HOST_GAP),
      ),
    );
    timers.current.push(
      setTimeout(() => {
        setOffer(keep);
        if (flips.includes(ace)) {
          setStage("spoiled");
          setScore((s) => ({ ...s, spoiled: s.spoiled + 1 }));
        } else setStage("decide");
      }, 300 + flips.length * HOST_GAP + 150),
    );
  };

  const decide = (strategy: Strategy) => {
    if (stage !== "decide" || pick === null || offer === null) return;
    const card = strategy === "stick" ? pick : offer;
    setFinal(card);
    setOpen(Array(n).fill(true));
    setStage("done");
    setScore((s) => ({ ...s, [strategy]: { won: s[strategy].won + (card === ace ? 1 : 0), played: s[strategy].played + 1 } }));
  };

  const autoPlay = (strategy: Strategy) => {
    const s = emptyScore();
    for (let i = 0; i < 1000; i++) {
      const a = rand.current.int(n);
      const chosen = rand.current.int(n);
      const { flips, keep } = hostMoves(a, chosen, n, hostKnows);
      if (flips.includes(a)) {
        s.spoiled++;
        continue;
      }
      const card = strategy === "stick" ? chosen : keep;
      s[strategy].played++;
      if (card === a) s[strategy].won++;
    }
    setScore((old) => ({
      stick: { won: old.stick.won + s.stick.won, played: old.stick.played + s.stick.played },
      switch: { won: old.switch.won + s.switch.won, played: old.switch.played + s.switch.played },
      spoiled: old.spoiled + s.spoiled,
    }));
  };

  const theory = hostKnows ? { stick: 1 / n, switch: (n - 1) / n } : { stick: 0.5, switch: 0.5 };
  const message: Record<Stage, string> = {
    pick: `Pick one of the ${n} cards. One of them is the ace.`,
    host:
      n === 3
        ? "The host turns over one of the other cards…"
        : `The host turns over ${n - 2} of the other cards…`,
    decide: "Stick with your card, or switch to the one the host left closed?",
    done: final === ace ? "You found the ace." : "No ace this time.",
    spoiled: "The host turned over the ace by accident. This round does not count.",
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p key={`${round}-${stage}`} className="anim-pop-in mb-5 min-h-6 text-sm">
            {message[stage]}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: n }, (_, i) => {
              const isAce = i === ace;
              const role = i === final ? "final" : i === pick ? "pick" : i === offer ? "offer" : null;
              const ring = role === "pick" || role === "final" ? (final !== null && role === "final" && final !== pick ? SWITCH : STICK) : role === "offer" ? SWITCH : undefined;
              return (
                <button
                  key={`${round}-${i}`}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={stage !== "pick"}
                  aria-label={open[i] ? (isAce ? "Ace of hearts" : "Two of spades") : `Face-down card ${i + 1}`}
                  className="flip-card anim-card-deal h-28 w-20 disabled:cursor-default sm:h-32 sm:w-24"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`flip-card-inner h-full w-full ${open[i] ? "flipped" : ""}`}>
                    <div
                      className="flip-card-face rounded-xl border-2 shadow-sm transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
                      style={{
                        borderColor: ring ?? "var(--line)",
                        background: "repeating-linear-gradient(45deg, var(--surface-2) 0 6px, var(--surface) 6px 12px)",
                      }}
                    />
                    <div
                      className="flip-card-face flip-card-front grid place-items-center rounded-xl border-2 bg-surface shadow-sm"
                      style={{ borderColor: ring ?? "var(--line)", color: isAce ? ACE : "var(--ink)" }}
                    >
                      <span className="text-center font-semibold leading-tight">
                        <span className="block text-2xl">{isAce ? "A" : "2"}</span>
                        <span className="block text-3xl">{isAce ? "♥" : "♠"}</span>
                      </span>
                    </div>
                  </div>
                  {role && (
                    <span className="mt-1 block text-[11px]" style={{ color: ring }}>
                      {role === "offer" ? "host's offer" : role === "final" && final !== pick ? "switched to" : "your pick"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {stage === "decide" && (
              <>
                <Button onClick={() => decide("stick")} style={{ borderColor: STICK }}>
                  Stick
                </Button>
                <Button onClick={() => decide("switch")} style={{ borderColor: SWITCH }}>
                  <Repeat className="size-4" /> Switch
                </Button>
              </>
            )}
            {(stage === "done" || stage === "spoiled") && (
              <Button variant="accent" onClick={() => deal()}>
                <Shuffle className="size-4" /> Deal again
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {(["stick", "switch"] as const).map((s) => {
            const { won, played } = score[s];
            const rate = played ? won / played : 0;
            const color = s === "stick" ? STICK : SWITCH;
            return (
              <div key={s} className="bg-surface p-5">
                <p className="text-sm text-muted">{s === "stick" ? "Always stick" : "Always switch"}</p>
                <p className="mt-1 font-display text-5xl tracking-tight" style={{ color }}>
                  {played ? `${(rate * 100).toFixed(0)}%` : "–"}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {won} wins of {played} · theory {(theory[s] * 100).toFixed(0)}%
                </p>
                <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${rate * 100}%`, background: color }} />
                  <span className="absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${theory[s] * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        {score.spoiled > 0 && (
          <p className="px-1 text-xs text-muted">{score.spoiled} rounds were thrown away because the host revealed the ace.</p>
        )}
      </div>

      <div className="space-y-4">
        <Panel title="Play many">
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => autoPlay("stick")}>
              Stick 1,000 times
            </Button>
            <Button size="sm" onClick={() => autoPlay("switch")}>
              Switch 1,000 times
            </Button>
          </div>
          <Button className="mt-3 w-full" variant="ghost" size="sm" onClick={() => setScore(emptyScore())}>
            Clear the scores
          </Button>
        </Panel>
        <Panel title="The game">
          <div className="space-y-5">
            <SliderField
              label="Cards"
              value={n}
              min={3}
              max={10}
              step={1}
              onChange={(v) => {
                setN(v);
                setScore(emptyScore());
                deal(v);
              }}
              hint="The host always leaves exactly one other card closed. With 10 cards the answer becomes obvious."
            />
            <Toggle
              label="The host knows where the ace is"
              checked={hostKnows}
              onChange={(v) => {
                setHostKnows(v);
                setScore(emptyScore());
                deal();
              }}
              hint="Turn this off and the host flips cards at random. When the ace survives by luck, switching no longer helps."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
