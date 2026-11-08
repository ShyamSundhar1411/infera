"use client";

import type { ComponentType } from "react";
import { useMounted } from "@/hooks/useMounted";
import BayesTheoremLab from "./bayes-theorem-lab";
import BayesianUpdatingLab from "./bayesian-updating-lab";
import CentralLimitLab from "./clt-lab";
import LawOfLargeNumbersLab from "./lln-lab";

const LABS: Record<string, ComponentType> = {
  "bayes-theorem": BayesTheoremLab,
  "bayesian-updating": BayesianUpdatingLab,
  "law-of-large-numbers": LawOfLargeNumbersLab,
  "central-limit-theorem": CentralLimitLab,
};

export default function ConceptLab({ slug }: { slug: string }) {
  const mounted = useMounted();
  const Lab = LABS[slug];
  if (!mounted || !Lab) return <div className="h-[480px] animate-pulse rounded-2xl border border-line bg-surface" />;
  return <Lab />;
}
