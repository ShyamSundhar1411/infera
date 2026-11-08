import type { AlgorithmKind } from "../types/domain/algorithm.types";
import type { Model } from "../types/domain/model.types";
import type { Point } from "../types/domain/point.types";
import { argmax } from "./math";
import { createRandom } from "./random";

export type FitVerdict = "underfit" | "overfit" | "good";

export interface Evaluation {
  metric: "Accuracy" | "R²";
  train: number;
  test: number;
  verdict: FitVerdict;
  trainCount: number;
  testCount: number;
}

/** Mark a seeded random share of points as held-out test points. */
export const splitPoints = (points: Point[], testShare: number, seed: number): Point[] => {
  const rand = createRandom(seed * 7919 + 13);
  return points.map((p) => ({ ...p, test: rand.next() < testShare }));
};

const accuracy = (points: Point[], model: Model) =>
  points.filter((p) => model.proba && argmax(model.proba(p.x, p.y)) === p.label).length / points.length;

const rSquared = (points: Point[], model: Model) => {
  const mean = points.reduce((s, p) => s + p.y, 0) / points.length;
  let ssRes = 0;
  let ssTot = 0;
  for (const p of points) {
    ssRes += (p.y - (model.predict?.(p.x) ?? mean)) ** 2;
    ssTot += (p.y - mean) ** 2;
  }
  return 1 - ssRes / (ssTot || 1e-12);
};

/**
 * Score the model on its training points and on the held-out ones, then apply
 * a rule of thumb: poor on both is underfitting, much better on training than
 * on test is overfitting.
 */
export const evaluateFit = (points: Point[], model: Model, kind: AlgorithmKind): Evaluation | null => {
  const train = points.filter((p) => !p.test);
  const test = points.filter((p) => p.test);
  if (train.length < 2 || test.length < 2) return null;
  if (kind === "classification" && model.proba) {
    const a = accuracy(train, model);
    const b = accuracy(test, model);
    const verdict: FitVerdict = a < 0.8 ? "underfit" : a - b > 0.08 ? "overfit" : "good";
    return { metric: "Accuracy", train: a, test: b, verdict, trainCount: train.length, testCount: test.length };
  }
  if (kind === "regression" && model.predict) {
    const a = rSquared(train, model);
    const b = rSquared(test, model);
    const verdict: FitVerdict = a < 0.6 ? "underfit" : a - b > 0.1 ? "overfit" : "good";
    return { metric: "R²", train: a, test: b, verdict, trainCount: train.length, testCount: test.length };
  }
  return null;
};
