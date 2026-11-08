import type { Point } from "../types/domain/point.types";
import type { Engine } from "../types/domain/model.types";
import { formatNumber, formatPercent } from "../utils";
import { argmax, classCount } from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

type Metric = "euclidean" | "manhattan" | "chebyshev";

const distance = (metric: Metric, dx: number, dy: number) => {
  if (metric === "manhattan") return Math.abs(dx) + Math.abs(dy);
  if (metric === "chebyshev") return Math.max(Math.abs(dx), Math.abs(dy));
  return Math.hypot(dx, dy);
};

/** Indices and distances of the k nearest points, closest first. */
const nearest = (
  points: Point[],
  x: number,
  y: number,
  k: number,
  metric: Metric,
  skip = -1,
) => {
  const idx: number[] = [];
  const dist: number[] = [];
  for (let i = 0; i < points.length; i++) {
    if (i === skip) continue;
    const d = distance(metric, points[i].x - x, points[i].y - y);
    if (idx.length < k || d < dist[dist.length - 1]) {
      let pos = dist.length;
      while (pos > 0 && dist[pos - 1] > d) pos--;
      idx.splice(pos, 0, i);
      dist.splice(pos, 0, d);
      if (idx.length > k) {
        idx.pop();
        dist.pop();
      }
    }
  }
  return { idx, dist };
};

const weightOf = (weighting: string, d: number) =>
  weighting === "distance" ? 1 / (d + 1e-6) : 1;

const readParams = (params: Record<string, unknown>) => ({
  k: Number(params.k),
  weighting: String(params.weighting),
  metric: String(params.metric) as Metric,
});

export const knnClassifier: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const { k, weighting, metric } = readParams(params);
    return instantTrainer(() => {
      const K = classCount(points);
      const vote = (x: number, y: number, skip = -1) => {
        const { idx, dist } = nearest(points, x, y, k, metric, skip);
        const votes = new Array(K).fill(0);
        idx.forEach((i, n) => (votes[points[i].label] += weightOf(weighting, dist[n])));
        const total = votes.reduce((a, b) => a + b, 0) || 1;
        return votes.map((v) => v / total);
      };
      // Leave-one-out: each point is judged by its neighbours, not itself.
      const loo =
        points.filter((p, i) => argmax(vote(p.x, p.y, i)) === p.label).length /
        points.length;
      return {
        model: { proba: (x, y) => vote(x, y) },
        stats: [
          { label: "Neighbours", value: String(Math.min(k, points.length)) },
          { label: "Leave-one-out accuracy", value: formatPercent(loo) },
        ],
      };
    });
  },
};

export const knnRegressor: Engine = {
  create: (points, params) => {
    if (points.length < 1) return waitingTrainer("Add a few points");
    const { k, weighting } = readParams(params);
    return instantTrainer(() => {
      // Neighbours are found along x only, so flatten points onto the axis.
      const flat = points.map((p) => ({ ...p, y: 0 }));
      const predict = (x: number) => {
        const { idx, dist } = nearest(flat, x, 0, k, "euclidean");
        let num = 0;
        let den = 0;
        idx.forEach((i, n) => {
          const w = weightOf(weighting, dist[n]);
          num += w * points[i].y;
          den += w;
        });
        return den ? num / den : 0;
      };
      const mse =
        points.reduce((s, p) => s + (p.y - predict(p.x)) ** 2, 0) / points.length;
      return {
        model: { predict },
        stats: [
          { label: "Neighbours", value: String(Math.min(k, points.length)) },
          { label: "Training MSE", value: formatNumber(mse, 4) },
        ],
      };
    });
  },
};
