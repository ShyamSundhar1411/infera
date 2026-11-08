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

export interface DistributionMeta {
  slug: string;
  name: string;
  /** LaTeX notation, e.g. "X \\sim \\mathcal{N}(\\mu, \\sigma^2)". */
  notation: string;
  type: DistributionType;
  tagline: string;
  params: DistParam[];
}

export type Distribution = DistributionMeta;
