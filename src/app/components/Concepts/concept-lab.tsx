"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { LabId } from "@/lib/data/labs.data";

const Placeholder = () => <div className="h-[480px] animate-pulse rounded-2xl border border-line bg-surface" />;

/** Each lab is its own chunk, so a page downloads only the labs it shows. */
const lab = (load: () => Promise<{ default: ComponentType }>) => dynamic(load, { ssr: false, loading: Placeholder });

const LABS = {
  "bayes-theorem": lab(() => import("./bayes-theorem-lab")),
  "ball-bag": lab(() => import("./ball-bag-lab")),
  "monty-hall": lab(() => import("./monty-hall-lab")),
  "bayesian-updating": lab(() => import("./bayesian-updating-lab")),
  "law-of-large-numbers": lab(() => import("./lln-lab")),
  dice: lab(() => import("./dice-lab")),
  "central-limit-theorem": lab(() => import("./clt-lab")),
  "galton-board": lab(() => import("./galton-board-lab")),
  "monte-carlo": lab(() => import("./monte-carlo-lab")),
  "markov-chains": lab(() => import("./markov-chain-lab")),
  mcmc: lab(() => import("./mcmc-lab")),
  "hypothesis-testing": lab(() => import("./hypothesis-testing-lab")),
  "confidence-intervals": lab(() => import("./confidence-intervals-lab")),
  "ab-testing": lab(() => import("./ab-testing-lab")),
  bootstrap: lab(() => import("./bootstrap-lab")),
  "simpsons-paradox": lab(() => import("./simpsons-paradox-lab")),
  "regression-to-the-mean": lab(() => import("./regression-to-mean-lab")),
  "birthday-problem": lab(() => import("./birthday-problem-lab")),
  "random-walk": lab(() => import("./random-walk-lab")),
  queues: lab(() => import("./queue-lab")),
  "maximum-likelihood": lab(() => import("./mle-lab")),
  "bias-variance": lab(() => import("./bias-variance-lab")),
  "naive-bayes-cards": lab(() => import("./naive-bayes-cards-lab")),
  "coin-flips": lab(() => import("./coin-flip-lab")),
  "single-coin": lab(() => import("./coin-flip-lab").then((m) => ({ default: () => <m.default initialN={1} /> }))),
  "first-heads": lab(() => import("./first-heads-lab")),
  arrivals: lab(() => import("./arrivals-lab")),
} satisfies Record<LabId, ComponentType>;

export default function ConceptLab({ slug }: { slug: string }) {
  const Lab = LABS[slug as LabId];
  return Lab ? <Lab /> : <Placeholder />;
}
