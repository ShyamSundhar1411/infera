"use client";

import type { ComponentType } from "react";
import { useMounted } from "@/hooks/useMounted";
import ArrivalsLab from "./arrivals-lab";
import BallBagLab from "./ball-bag-lab";
import BayesTheoremLab from "./bayes-theorem-lab";
import BayesianUpdatingLab from "./bayesian-updating-lab";
import CentralLimitLab from "./clt-lab";
import CoinFlipLab from "./coin-flip-lab";
import DiceLab from "./dice-lab";
import FirstHeadsLab from "./first-heads-lab";
import GaltonBoardLab from "./galton-board-lab";
import LawOfLargeNumbersLab from "./lln-lab";
import McmcLab from "./mcmc-lab";
import MonteCarloLab from "./monte-carlo-lab";
import MontyHallLab from "./monty-hall-lab";
import NaiveBayesCardsLab from "./naive-bayes-cards-lab";

const LABS: Record<string, ComponentType> = {
  "bayes-theorem": BayesTheoremLab,
  "bayesian-updating": BayesianUpdatingLab,
  "law-of-large-numbers": LawOfLargeNumbersLab,
  "central-limit-theorem": CentralLimitLab,
  "monty-hall": MontyHallLab,
  "monte-carlo": MonteCarloLab,
  mcmc: McmcLab,
  // Hands-on scenarios embedded in algorithm and distribution pages.
  "ball-bag": BallBagLab,
  "naive-bayes-cards": NaiveBayesCardsLab,
  "coin-flips": CoinFlipLab,
  "single-coin": () => <CoinFlipLab initialN={1} />,
  "first-heads": FirstHeadsLab,
  dice: DiceLab,
  "galton-board": GaltonBoardLab,
  arrivals: ArrivalsLab,
};

export default function ConceptLab({ slug }: { slug: string }) {
  const mounted = useMounted();
  const Lab = LABS[slug];
  if (!mounted || !Lab) return <div className="h-[480px] animate-pulse rounded-2xl border border-line bg-surface" />;
  return <Lab />;
}
