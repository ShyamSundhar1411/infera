import type { Point } from "../types/domain/point.types";
import type { Engine, Trainer } from "../types/domain/model.types";
import { formatNumber } from "../utils";
import { softmax, sqDist } from "./math";
import { createRandom, type Random } from "./random";
import { waitingTrainer } from "./trainer";

const MAX_ITERATIONS = 100;
const SHARPNESS = 400;

/** Pick starting centroids: uniformly, or spread out with k-means++. */
export const initCentroids = (
  points: Point[],
  k: number,
  method: string,
  rand: Random,
): [number, number][] => {
  if (method === "random") {
    return rand.shuffle(points).slice(0, k).map((p) => [p.x, p.y]);
  }
  const first = points[rand.int(points.length)];
  const centroids: [number, number][] = [[first.x, first.y]];
  while (centroids.length < k) {
    const d = points.map((p) =>
      Math.min(...centroids.map((c) => sqDist(p.x, p.y, c[0], c[1]))),
    );
    const total = d.reduce((a, b) => a + b, 0);
    let r = rand.next() * total;
    let idx = 0;
    while (idx < d.length - 1 && r > d[idx]) r -= d[idx++];
    centroids.push([points[idx].x, points[idx].y]);
  }
  return centroids;
};

const nearestCentroid = (centroids: [number, number][], x: number, y: number) => {
  let best = 0;
  let bestD = Infinity;
  centroids.forEach((c, i) => {
    const d = sqDist(x, y, c[0], c[1]);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
};

export const kMeans: Engine = {
  stepsPerFrame: 1,
  msPerStep: 450,
  create: (points, params, previous) => {
    const k = Number(params.k);
    if (points.length < k) return waitingTrainer(`Add at least ${k} points`);
    const prev = previous?.state?.() as [number, number][] | undefined;
    let centroids =
      prev && prev.length === k
        ? prev.map((c) => [...c] as [number, number])
        : initCentroids(points, k, String(params.init), createRandom(Number(params.__seed ?? 0) + 1));
    let assignments = points.map((p) => nearestCentroid(centroids, p.x, p.y));
    let iteration = 0;
    let converged = false;

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && !converged; it++) {
          centroids = centroids.map((c, i) => {
            const members = points.filter((_, n) => assignments[n] === i);
            if (!members.length) return c;
            return [
              members.reduce((s, p) => s + p.x, 0) / members.length,
              members.reduce((s, p) => s + p.y, 0) / members.length,
            ];
          });
          const next = points.map((p) => nearestCentroid(centroids, p.x, p.y));
          converged =
            next.every((a, i) => a === assignments[i]) || iteration + 1 >= MAX_ITERATIONS;
          assignments = next;
          iteration++;
        }
      },
      model: () => ({
        centroids,
        assignments,
        // A very sharp softmax over distances: same Voronoi cells as a hard
        // assignment, but smooth enough for clean boundary lines.
        proba: (x, y) => softmax(centroids.map((c) => -SHARPNESS * sqDist(x, y, c[0], c[1]))),
      }),
      stats: () => {
        const inertia = points.reduce(
          (s, p, i) => s + sqDist(p.x, p.y, centroids[assignments[i]][0], centroids[assignments[i]][1]),
          0,
        );
        return [
          { label: "Iteration", value: String(iteration) },
          { label: "Inertia", value: formatNumber(inertia, 3) },
          { label: "Status", value: converged ? "Converged" : "Updating" },
        ];
      },
      done: () => converged,
      state: () => centroids,
    };
    return trainer;
  },
};
