import type { Point } from "../types/domain/point.types";
import type { Engine, GaussianShape } from "../types/domain/model.types";
import { formatPercent } from "../utils";
import {
  argmax,
  classCount,
  covariance2,
  mean2,
  softmax,
  sym2Det,
  sym2Inverse,
  sym2Quad,
  type Sym2,
} from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

interface ClassGaussian {
  label: number;
  prior: number;
  mean: [number, number];
  cov: Sym2;
}

type CovarianceMode = "shared" | "full" | "diagonal";

const fitGaussians = (
  points: Point[],
  mode: CovarianceMode,
  reg: number,
  shrinkage = 0,
): ClassGaussian[] => {
  const K = classCount(points);
  const groups = Array.from({ length: K }, (_, k) =>
    points.filter((p) => p.label === k),
  );
  const present = groups
    .map((g, label) => ({ g, label }))
    .filter(({ g }) => g.length > 0);

  let pooled: Sym2 = [0, 0, 0];
  if (mode === "shared") {
    for (const { g } of present) {
      const m = mean2(g);
      const c = covariance2(g, m);
      const w = Math.max(g.length - 1, 0);
      pooled = [pooled[0] + c[0] * w, pooled[1] + c[1] * w, pooled[2] + c[2] * w];
    }
    const dof = Math.max(points.length - present.length, 1);
    pooled = [pooled[0] / dof, pooled[1] / dof, pooled[2] / dof];
    const avgVar = (pooled[0] + pooled[2]) / 2;
    pooled = [
      (1 - shrinkage) * pooled[0] + shrinkage * avgVar,
      (1 - shrinkage) * pooled[1],
      (1 - shrinkage) * pooled[2] + shrinkage * avgVar,
    ];
  }

  return present.map(({ g, label }) => {
    const mean = mean2(g);
    let cov: Sym2;
    if (mode === "shared") cov = pooled;
    else {
      const c = covariance2(g, mean);
      cov = mode === "diagonal" ? [c[0], 0, c[2]] : c;
    }
    return {
      label,
      prior: g.length / points.length,
      mean,
      cov: [cov[0] + reg, cov[1], cov[2] + reg],
    };
  });
};

const gaussianEngine = (
  mode: CovarianceMode,
  readParams: (params: Record<string, unknown>) => { reg: number; shrinkage?: number },
): Engine => ({
  create: (points, params) => {
    if (points.length < 3) return waitingTrainer("Add points of 2 classes");
    const { reg, shrinkage } = readParams(params);
    return instantTrainer(() => {
      const K = classCount(points);
      const gaussians = fitGaussians(points, mode, reg, shrinkage);
      const prepared = gaussians.map((g) => ({
        ...g,
        inv: sym2Inverse(g.cov),
        logNorm: -0.5 * Math.log(Math.max(sym2Det(g.cov), 1e-12)),
      }));
      const proba = (x: number, y: number) => {
        const scores = new Array(K).fill(-Infinity);
        for (const g of prepared) {
          scores[g.label] =
            Math.log(g.prior) +
            (mode === "shared" ? 0 : g.logNorm) -
            0.5 * sym2Quad(g.inv, x - g.mean[0], y - g.mean[1]);
        }
        return softmax(scores.map((s) => (s === -Infinity ? -1e9 : s)));
      };
      const acc =
        points.filter((p) => argmax(proba(p.x, p.y)) === p.label).length /
        points.length;
      const shapes: GaussianShape[] = gaussians.map((g) => ({
        label: g.label,
        mean: g.mean,
        cov: g.cov,
      }));
      return {
        model: { proba, gaussians: shapes },
        stats: [
          { label: "Classes", value: String(gaussians.length) },
          { label: "Accuracy", value: formatPercent(acc) },
          {
            label: "Parameters",
            value: String(
              gaussians.length * 2 +
                (mode === "shared" ? 3 : mode === "full" ? 3 * gaussians.length : 2 * gaussians.length),
            ),
          },
        ],
      };
    });
  },
});

export const lda = gaussianEngine("shared", (p) => ({
  reg: 1e-4,
  shrinkage: Number(p.shrinkage),
}));

export const qda = gaussianEngine("full", (p) => ({ reg: Number(p.reg) }));

export const naiveBayes = gaussianEngine("diagonal", (p) => ({
  reg: Number(p.smoothing),
}));
