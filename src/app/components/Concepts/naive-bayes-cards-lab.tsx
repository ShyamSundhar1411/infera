"use client";

import { useRef, useState } from "react";
import { Layers, RotateCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom, type Random } from "@/lib/ml/random";

type Deck = "standard" | "trick";
type Kind = "number" | "face" | "ace";

interface PlayingCard {
  deck: Deck;
  red: boolean;
  kind: Kind;
  suit: string;
  rank: string;
}

const DECKS: Deck[] = ["standard", "trick"];
const KINDS: Kind[] = ["number", "face", "ace"];
const DECK_NAME: Record<Deck, string> = {
  standard: "Standard deck",
  trick: "Trick deck",
};
const DECK_COLOR: Record<Deck, string> = {
  standard: rgb(CLASS_COLORS[2]),
  trick: rgb(CLASS_COLORS[3]),
};
const SUIT_RED = rgb(CLASS_COLORS[0]);
const KIND_LABEL: Record<Kind, string> = {
  number: "2 to 10",
  face: "J, Q, K",
  ace: "Ace",
};

/** How each deck is made. A standard deck is half red with 12 faces and 4 aces; the trick deck leans red and royal. */
const composition = (deck: Deck, rig: number) => {
  const t = deck === "trick" ? rig : 0;
  const red = 0.5 + 0.4 * t;
  const face = 12 / 52 + (0.55 - 12 / 52) * t;
  const ace = 4 / 52 + (0.2 - 4 / 52) * t;
  return {
    red,
    kind: { number: 1 - face - ace, face, ace } as Record<Kind, number>,
  };
};

const dealCard = (r: Random, trickShare: number, rig: number): PlayingCard => {
  const deck: Deck = r.next() < trickShare ? "trick" : "standard";
  const c = composition(deck, rig);
  const red = r.next() < c.red;
  const u = r.next();
  const kind: Kind =
    u < c.kind.number
      ? "number"
      : u < c.kind.number + c.kind.face
        ? "face"
        : "ace";
  const suits = red ? ["♥", "♦"] : ["♠", "♣"];
  const ranks =
    kind === "number"
      ? ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
      : kind === "face"
        ? ["J", "Q", "K"]
        : ["A"];
  return {
    deck,
    red,
    kind,
    suit: suits[r.int(2)],
    rank: ranks[r.int(ranks.length)],
  };
};

/** Learned naive Bayes: count, optionally add α to every cell, then divide. */
const learn = (cards: PlayingCard[], alpha: number) =>
  Object.fromEntries(
    DECKS.map((d) => {
      const mine = cards.filter((c) => c.deck === d);
      const n = mine.length;
      const reds = mine.filter((c) => c.red).length;
      const kinds = Object.fromEntries(
        KINDS.map((k) => [k, mine.filter((c) => c.kind === k).length]),
      ) as Record<Kind, number>;
      const div = (num: number, den: number) => (den > 0 ? num / den : 0);
      return [
        d,
        {
          n,
          reds,
          kinds,
          prior: div(n + alpha, cards.length + 2 * alpha),
          red: div(reds + alpha, n + 2 * alpha),
          kind: Object.fromEntries(
            KINDS.map((k) => [k, div(kinds[k] + alpha, n + 3 * alpha)]),
          ) as Record<Kind, number>,
        },
      ];
    }),
  ) as Record<
    Deck,
    {
      n: number;
      reds: number;
      kinds: Record<Kind, number>;
      prior: number;
      red: number;
      kind: Record<Kind, number>;
    }
  >;

/** Two decks shuffled together. Learn from labelled cards, then guess which deck a new card came from. */
export default function NaiveBayesCardsLab() {
  const [rig, setRig] = useState(0.6);
  const [trickShare, setTrickShare] = useState(0.4);
  const [trainSize, setTrainSize] = useState(16);
  const [smoothing, setSmoothing] = useState(true);
  const rand = useRef(createRandom(41));
  // The first training set comes from its own seed, so the opening deal is the same on every visit.
  const [training, setTraining] = useState(() => {
    const r = createRandom(7);
    return Array.from({ length: 16 }, () => dealCard(r, 0.4, 0.6));
  });
  const [dealId, setDealId] = useState(0);
  const [mystery, setMystery] = useState<PlayingCard | null>(null);
  const [mysteryId, setMysteryId] = useState(0);
  const [stage, setStage] = useState<"down" | "face" | "checked">("down");
  const [record, setRecord] = useState({ right: 0, played: 0 });

  const model = learn(training, smoothing ? 1 : 0);
  const scoreOf = (card: PlayingCard, d: Deck) => {
    const m = model[d];
    return m.prior * (card.red ? m.red : 1 - m.red) * m.kind[card.kind];
  };
  const exactOf = (card: PlayingCard, d: Deck) => {
    const c = composition(d, rig);
    return (
      (d === "trick" ? trickShare : 1 - trickShare) *
      (card.red ? c.red : 1 - c.red) *
      c.kind[card.kind]
    );
  };
  const classify = (card: PlayingCard): Deck =>
    scoreOf(card, "trick") > scoreOf(card, "standard") ? "trick" : "standard";

  const deal = (size = trainSize, share = trickShare, r = rig) => {
    setTraining(
      Array.from({ length: size }, () => dealCard(rand.current, share, r)),
    );
    setDealId((i) => i + 1);
    setMystery(null);
    setRecord({ right: 0, played: 0 });
  };

  const dealMystery = () => {
    setMystery(dealCard(rand.current, trickShare, rig));
    setMysteryId((i) => i + 1);
    setStage("down");
    setTimeout(() => setStage((s) => (s === "down" ? "face" : s)), 450);
  };

  const check = () => {
    if (!mystery || stage === "checked") return;
    setStage("checked");
    setRecord((r) => ({
      right: r.right + (classify(mystery) === mystery.deck ? 1 : 0),
      played: r.played + 1,
    }));
  };

  const playMany = () => {
    let right = 0;
    for (let i = 0; i < 100; i++) {
      const card = dealCard(rand.current, trickShare, rig);
      if (classify(card) === card.deck) right++;
    }
    setRecord((r) => ({ right: r.right + right, played: r.played + 100 }));
  };

  const scores = mystery ? DECKS.map((d) => scoreOf(mystery, d)) : [0, 0];
  const total = scores[0] + scores[1];
  const post = mystery && total > 0 ? scores.map((s) => s / total) : [0.5, 0.5];
  const exact = mystery ? DECKS.map((d) => exactOf(mystery, d)) : [1, 1];
  const exactTrick = exact[1] / (exact[0] + exact[1]);
  const zeroed =
    mystery &&
    stage !== "down" &&
    DECKS.some((d) => model[d].n > 0 && scoreOf(mystery, d) === 0);
  const guess = mystery ? classify(mystery) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="mb-4 text-sm text-muted">
            Training: {training.length} cards dealt from the shoe, sorted by the
            colour of their backs.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {DECKS.map((d) => {
              const m = model[d];
              const pile = training.filter((c) => c.deck === d);
              return (
                <div key={d} className="rounded-xl border border-line p-3">
                  <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <span
                      className="h-3 w-3 rounded-[3px]"
                      style={{ background: DECK_COLOR[d] }}
                    />
                    {DECK_NAME[d]}
                    <span className="ml-auto font-mono text-xs text-muted">
                      {m.n} cards
                    </span>
                  </p>
                  <div className="flex min-h-[44px] flex-wrap gap-1">
                    {pile.map((c, i) => (
                      <MiniCard
                        key={`${dealId}-${i}`}
                        card={c}
                        delay={i * 35}
                      />
                    ))}
                  </div>
                  <table className="mt-3 w-full font-mono text-[11px] tabular-nums">
                    <tbody>
                      <CountRow label="red" count={m.reds} n={m.n} p={m.red} />
                      <CountRow
                        label="black"
                        count={m.n - m.reds}
                        n={m.n}
                        p={1 - m.red}
                      />
                      {KINDS.map((k) => (
                        <CountRow
                          key={k}
                          label={KIND_LABEL[k]}
                          count={m.kinds[k]}
                          n={m.n}
                          p={m.kind[k]}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center gap-2">
              <div className="flip-card h-32 w-24">
                {mystery ? (
                  <div
                    key={mysteryId}
                    className={`flip-card-inner anim-card-deal h-full w-full ${stage !== "down" ? "flipped" : ""}`}
                  >
                    <div
                      className="flip-card-face grid place-items-center rounded-xl border-2 border-line font-display text-3xl text-muted"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, var(--surface-2) 0 6px, var(--surface) 6px 12px)",
                      }}
                    >
                      ?
                    </div>
                    <div className="flip-card-face flip-card-front">
                      <BigCard
                        card={mystery}
                        band={
                          stage === "checked"
                            ? DECK_COLOR[mystery.deck]
                            : undefined
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid h-full w-full place-items-center rounded-xl border-2 border-dashed border-line text-xs text-muted">
                    no card
                  </div>
                )}
              </div>
              <span className="text-xs text-muted">
                {stage === "checked" && mystery
                  ? `from the ${DECK_NAME[mystery.deck].toLowerCase()}`
                  : "back hidden"}
              </span>
            </div>

            <div className="min-w-0 space-y-3">
              {!mystery || stage === "down" ? (
                <p className="text-sm text-muted">
                  Deal a mystery card. You see its face but not its back, and
                  the model has to say which deck it came from.
                </p>
              ) : (
                <>
                  <p className="text-sm text-muted">
                    Naive Bayes multiplies the prior by one likelihood per
                    feature, as if colour and rank had nothing to do with each
                    other.
                  </p>
                  {DECKS.map((d, i) => {
                    const m = model[d];
                    return (
                      <div key={d} className="space-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs tabular-nums">
                          <span
                            className="w-24 shrink-0 font-sans text-sm"
                            style={{ color: DECK_COLOR[d] }}
                          >
                            {d === "trick" ? "Trick" : "Standard"}
                          </span>
                          <Factor label="prior" value={m.prior} />×
                          <Factor
                            label={mystery.red ? "P(red)" : "P(black)"}
                            value={mystery.red ? m.red : 1 - m.red}
                          />
                          ×
                          <Factor
                            label={`P(${mystery.kind})`}
                            value={m.kind[mystery.kind]}
                          />
                          =
                          <span className="text-ink">
                            {scores[i].toFixed(4)}
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${post[i] * 100}%`,
                              background: DECK_COLOR[d],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-sm">
                    Guess:{" "}
                    <strong
                      style={{ color: guess ? DECK_COLOR[guess] : undefined }}
                    >
                      {guess && DECK_NAME[guess]}
                    </strong>{" "}
                    <span className="font-mono text-xs text-muted">
                      ({(Math.max(...post) * 100).toFixed(0)}%; knowing the true
                      decks it would be{" "}
                      {(
                        (guess === "trick" ? exactTrick : 1 - exactTrick) * 100
                      ).toFixed(0)}
                      %)
                    </span>
                  </p>
                  {zeroed && (
                    <p className="anim-pop-in rounded-lg bg-surface-2 px-3 py-2 text-xs">
                      A zero count wiped one deck out completely: it never
                      showed this kind of card in training, so its probability
                      became exactly 0. Turn on smoothing.
                    </p>
                  )}
                  {stage === "checked" && mystery && (
                    <p className="anim-pop-in text-sm">
                      {guess === mystery.deck ? "Correct." : "Wrong this time."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Play">
          <div className="space-y-3">
            <Button className="w-full" variant="accent" onClick={dealMystery}>
              <Sparkles className="size-4" /> Deal a mystery card
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                onClick={check}
                disabled={!mystery || stage !== "face"}
              >
                <RotateCw className="size-3.5" /> Check its back
              </Button>
              <Button size="sm" onClick={playMany}>
                Play 100 hands
              </Button>
            </div>
            <p className="text-xs text-muted">
              Accuracy:{" "}
              {record.played
                ? `${record.right} of ${record.played} (${((record.right / record.played) * 100).toFixed(0)}%)`
                : "no hands yet"}
            </p>
          </div>
        </Panel>
        <Panel title="Training">
          <div className="space-y-5">
            <SliderField
              label="Training cards"
              value={trainSize}
              min={4}
              max={80}
              step={1}
              onChange={(v) => {
                setTrainSize(v);
                deal(v);
              }}
              hint="Few cards means rough counts. Many cards means the learned numbers approach the true ones."
            />
            <Button className="w-full" size="sm" onClick={() => deal()}>
              <Layers className="size-3.5" /> Deal a new training set
            </Button>
            <Toggle
              label="Laplace smoothing (+1)"
              checked={smoothing}
              onChange={setSmoothing}
              hint="Adds one imaginary card to every count so nothing unseen gets probability zero."
            />
          </div>
        </Panel>
        <Panel title="The decks">
          <div className="space-y-5">
            <SliderField
              label="How rigged is the trick deck"
              value={rig}
              min={0}
              max={1}
              step={0.05}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={(v) => {
                setRig(v);
                deal(trainSize, trickShare, v);
              }}
              hint="At 0% it is an ordinary deck and no classifier can tell them apart. Higher means more red cards and more faces and aces."
            />
            <SliderField
              label="Share of trick cards in the shoe"
              value={trickShare}
              min={0.05}
              max={0.95}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => {
                setTrickShare(v);
                deal(trainSize, v);
              }}
              hint="This is the prior. The model learns it from how many training cards each deck had."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CountRow({
  label,
  count,
  n,
  p,
}: {
  label: string;
  count: number;
  n: number;
  p: number;
}) {
  return (
    <tr className="text-muted">
      <td className="py-0.5 font-sans">{label}</td>
      <td className="py-0.5 text-right">
        {count}/{n}
      </td>
      <td className="w-24 py-0.5 pl-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-ink/50 transition-all duration-300"
            style={{ width: `${p * 100}%` }}
          />
        </div>
      </td>
      <td className="w-12 py-0.5 text-right text-ink">{p.toFixed(2)}</td>
    </tr>
  );
}

function Factor({ label, value }: { label: string; value: number }) {
  return (
    <span title={label} className="rounded bg-surface-2 px-1.5 py-0.5">
      {value.toFixed(2)}
    </span>
  );
}

function MiniCard({ card, delay }: { card: PlayingCard; delay: number }) {
  return (
    <span
      className="anim-card-deal grid h-10 w-7 place-items-center rounded-md border border-line bg-surface text-[11px] font-semibold leading-none shadow-sm"
      style={{
        animationDelay: `${delay}ms`,
        color: card.red ? SUIT_RED : "var(--ink)",
        borderBottom: `3px solid ${DECK_COLOR[card.deck]}`,
      }}
      title={`${card.rank}${card.suit}`}
    >
      <span className="text-center">
        {card.rank}
        <br />
        {card.suit}
      </span>
    </span>
  );
}

function BigCard({ card, band }: { card: PlayingCard; band?: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl border-2 bg-surface shadow-md"
      style={{
        color: card.red ? SUIT_RED : "var(--ink)",
        borderColor: band ?? "var(--line)",
      }}
    >
      <span className="absolute left-2 top-1.5 text-center text-sm font-semibold leading-tight">
        {card.rank}
        <br />
        {card.suit}
      </span>
      <span className="grid h-full place-items-center text-5xl">
        {card.suit}
      </span>
      {band && (
        <span
          className="anim-pop-in absolute inset-x-0 bottom-0 h-2"
          style={{ background: band }}
        />
      )}
    </div>
  );
}
