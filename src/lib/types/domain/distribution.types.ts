export type DistributionType = "discrete" | "continuous";

export interface DistParam {
  key: string;
  label: string;
  /** Maths symbol shown next to the slider, e.g. "μ". */
  symbol: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export type DistParamValues = Record<string, number>;

/** Formulas as plain Unicode strings, shown in a monospace block. */
export interface DistributionFormulas {
  support: string;
  /** PMF for discrete, PDF for continuous. */
  density: string;
  cdf: string;
  mean: string;
  variance: string;
  mode?: string;
}

export interface DistributionContent {
  summary: string;
  /** What the distribution models, in plain English. */
  story: string[];
  /** Real-world situations where it shows up. */
  examples: string[];
  /** What each parameter controls, keyed by param symbol. */
  parameters: { symbol: string; meaning: string }[];
  /** How it connects to other distributions on the site. */
  relations: string[];
  /** Small experiments using the sliders and sampler. */
  tryThis: string[];
}

export interface DistributionMeta {
  slug: string;
  name: string;
  /** Notation, e.g. "X ~ N(μ, σ²)". */
  notation: string;
  type: DistributionType;
  tagline: string;
  params: DistParam[];
  formulas: DistributionFormulas;
}

export interface Distribution extends DistributionMeta {
  content: DistributionContent;
}
