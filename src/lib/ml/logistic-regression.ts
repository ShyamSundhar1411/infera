import type { Engine, Trainer } from "../types/domain/model.types";
import { formatNumber, formatPercent } from "../utils";
import { polyFeatures2D } from "./features";
import { argmax, classCount, softmax } from "./math";
import { waitingTrainer } from "./trainer";

const MAX_EPOCHS = 4000;

interface State {
  W: number[][];
  degree: number;
  K: number;
}

export const logisticRegression: Engine = {
  stepsPerFrame: 8,
  create: (points, params, previous) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const degree = Number(params.degree);
    const lr = Number(params.learningRate);
    const lambda = Number(params.lambda) <= 0.0001 ? 0 : Number(params.lambda);
    const K = classCount(points);
    const phi = (x: number, y: number) => [1, ...polyFeatures2D(x, y, degree)];
    const X = points.map((p) => phi(p.x, p.y));
    const F = X[0].length;

    const prev = previous?.state?.() as State | undefined;
    const W =
      prev && prev.degree === degree && prev.K === K
        ? prev.W.map((row) => [...row])
        : Array.from({ length: K }, () => new Array(F).fill(0));

    let epoch = 0;
    let loss = Infinity;
    let converged = false;

    const scores = (f: number[]) =>
      W.map((w) => w.reduce((s, wi, i) => s + wi * f[i], 0));

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && !converged; it++) {
          const grad = Array.from({ length: K }, () => new Array(F).fill(0));
          let total = 0;
          X.forEach((f, n) => {
            const p = softmax(scores(f));
            total -= Math.log(Math.max(p[points[n].label], 1e-12));
            for (let k = 0; k < K; k++) {
              const err = p[k] - (points[n].label === k ? 1 : 0);
              for (let i = 0; i < F; i++) grad[k][i] += err * f[i];
            }
          });
          let gradNorm = 0;
          for (let k = 0; k < K; k++) {
            for (let i = 0; i < F; i++) {
              const g = grad[k][i] / X.length + (i > 0 ? lambda * W[k][i] : 0);
              W[k][i] -= lr * g;
              gradNorm += g * g;
            }
          }
          loss = total / X.length;
          epoch++;
          if (epoch >= MAX_EPOCHS || gradNorm < 1e-9) converged = true;
        }
      },
      model: () => ({
        proba: (x, y) => softmax(scores(phi(x, y))),
      }),
      stats: () => {
        const acc =
          points.filter((p, n) => argmax(scores(X[n])) === p.label).length /
          points.length;
        return [
          { label: "Epoch", value: String(epoch) },
          { label: "Log loss", value: formatNumber(loss, 3) },
          { label: "Accuracy", value: formatPercent(acc) },
        ];
      },
      done: () => converged,
      state: (): State => ({ W, degree, K }),
    };
    return trainer;
  },
};
