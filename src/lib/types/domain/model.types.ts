import type { ParamValues } from "./algorithm.types";
import type { Point } from "./point.types";

export interface Stat {
  label: string;
  value: string;
}

export interface GaussianShape {
  label: number;
  mean: [number, number];
  /** Covariance matrix as [a, b, c] for [[a, b], [b, c]]. */
  cov: [number, number, number];
}

export interface TreeNode {
  id: number;
  depth: number;
  n: number;
  counts: number[];
  impurity: number;
  feature?: 0 | 1;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface PcaShape {
  mean: [number, number];
  components: [[number, number], [number, number]];
  variances: [number, number];
}

/**
 * What a trained model exposes to the canvas. Everything is optional so the
 * canvas can draw whatever a given algorithm provides.
 */
export interface Model {
  /** Class probabilities at a point (classification, k-means regions). */
  proba?: (x: number, y: number) => number[];
  /** Signed score whose zero level is the boundary; ±1 draws SVM margins. */
  decision?: (x: number, y: number) => number;
  /** Regression curve. */
  predict?: (x: number) => number;
  /** Per-point assignment for clustering (-1 = noise). */
  assignments?: number[];
  centroids?: [number, number][];
  supportVectors?: number[];
  gaussians?: GaussianShape[];
  tree?: TreeNode;
  pca?: PcaShape;
  /** Radius drawn around core points (DBSCAN). */
  coreRadius?: { radius: number; indices: number[] };
  /** Weight given to each point (AdaBoost); drawn as point size. */
  pointWeights?: number[];
}

export interface Trainer {
  /** Advance training. Instant models finish on the first call. */
  step: (iterations: number) => void;
  model: () => Model;
  stats: () => Stat[];
  done: () => boolean;
}

export interface Engine {
  create: (points: Point[], params: ParamValues, previous?: Trainer) => Trainer;
  /** Iterations per animation frame for iterative engines. */
  stepsPerFrame?: number;
}
