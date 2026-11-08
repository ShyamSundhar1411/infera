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

const mse = (points: Point[], model: Model) =>
  points.reduce((s, p) => s + (p.y - (model.predict?.(p.x) ?? 0)) ** 2, 0) / points.length;

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
 * How well a flexible model can do on this data: leave-one-out k-nearest
 * neighbours on the training points. It stands in for the noise level, so
 * verdicts adapt to how noisy the data actually is.
 */
const baseline = (train: Point[], kind: AlgorithmKind) => {
  const k = Math.min(5, train.length - 1);
  let errors = 0;
  train.forEach((p, i) => {
    const near = train
      .map((q, j) => ({ q, d: j === i ? Infinity : kind === "regression" ? Math.abs(q.x - p.x) : (q.x - p.x) ** 2 + (q.y - p.y) ** 2 }))
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    if (kind === "regression") {
      const guess = near.reduce((s, n) => s + n.q.y, 0) / k;
      errors += (p.y - guess) ** 2;
    } else {
      const votes = new Map<number, number>();
      for (const n of near) votes.set(n.q.label, (votes.get(n.q.label) ?? 0) + 1);
      const guess = [...votes].sort((a, b) => b[1] - a[1])[0][0];
      if (guess !== p.label) errors++;
    }
  });
  return errors / train.length;
};

/**
 * Score the model on its training points and on the held-out ones. Rule of
 * thumb: clearly worse than the baseline on training data is underfitting;
 * clearly worse on test data than on training data is overfitting.
 */
export const evaluateFit = (points: Point[], model: Model, kind: AlgorithmKind): Evaluation | null => {
  const train = points.filter((p) => !p.test);
  const test = points.filter((p) => p.test);
  if (train.length < 6 || test.length < 3) return null;
  const counts = { trainCount: train.length, testCount: test.length };

  if (kind === "classification" && model.proba) {
    const a = accuracy(train, model);
    const b = accuracy(test, model);
    const reachable = 1 - baseline(train, kind);
    const gap = a - b;
    // Test accuracy on a few dozen points wobbles by a standard error or two.
    const se = Math.sqrt(Math.max(b * (1 - b), 0.01) / test.length);
    // Beating the baseline on training data means memorising noise.
    const memorising = a - reachable > 0.05 && gap > 0.03;
    const verdict: FitVerdict =
      a < reachable - 0.07 ? "underfit" : memorising || gap > 0.05 + 2 * se ? "overfit" : "good";
    return { metric: "Accuracy", train: a, test: b, verdict, ...counts };
  }

  if (kind === "regression" && model.predict) {
    const noise = baseline(train, kind);
    const trainErr = mse(train, model);
    const testErr = mse(test, model);
    // Thresholds tuned on simulated data: no false alarms for a straight line
    // on linear data, while catching most high-degree overfits.
    const verdict: FitVerdict =
      trainErr > 1.6 * noise ? "underfit" : testErr > 2.5 * noise && testErr > 2.5 * trainErr ? "overfit" : "good";
    return { metric: "R²", train: rSquared(train, model), test: rSquared(test, model), verdict, ...counts };
  }
  return null;
};
