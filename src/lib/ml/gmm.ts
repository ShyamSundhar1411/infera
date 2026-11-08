import type { Engine, Trainer } from "../types/domain/model.types";
import { formatNumber } from "../utils";
import { argmax, sym2Det, sym2Inverse, sym2Quad, type Sym2 } from "./math";
import { initCentroids } from "./kmeans";
import { createRandom } from "./random";
import { waitingTrainer } from "./trainer";

const MAX_ITERATIONS = 200;
const REG = 1e-4;

interface Component {
  weight: number;
  mean: [number, number];
  cov: Sym2;
}

const density = (c: Component, x: number, y: number) => {
  const det = Math.max(sym2Det(c.cov), 1e-12);
  const q = sym2Quad(sym2Inverse(c.cov), x - c.mean[0], y - c.mean[1]);
  return Math.exp(-0.5 * q) / (2 * Math.PI * Math.sqrt(det));
};

export const gaussianMixture: Engine = {
  stepsPerFrame: 1,
  msPerStep: 220,
  create: (points, params) => {
    const k = Number(params.k);
    if (points.length < k * 2) return waitingTrainer(`Add at least ${k * 2} points`);
    const rand = createRandom(Number(params.__seed ?? 0) + 3);
    let components: Component[] = initCentroids(points, k, "kmeans++", rand).map((mean) => ({
      weight: 1 / k,
      mean,
      cov: [0.04, 0, 0.04],
    }));
    let iteration = 0;
    let logLik = -Infinity;
    let converged = false;

    const responsibilities = (x: number, y: number) => {
      const r = components.map((c) => c.weight * density(c, x, y));
      const total = r.reduce((a, b) => a + b, 0) || 1e-300;
      return r.map((v) => v / total);
    };

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && !converged; it++) {
          // E-step: how much each component explains each point.
          const R = points.map((p) => responsibilities(p.x, p.y));
          // M-step: refit every component to its weighted points.
          components = components.map((_, j) => {
            const nj = R.reduce((s, r) => s + r[j], 0) || 1e-10;
            const mx = points.reduce((s, p, i) => s + R[i][j] * p.x, 0) / nj;
            const my = points.reduce((s, p, i) => s + R[i][j] * p.y, 0) / nj;
            let a = 0;
            let b = 0;
            let c = 0;
            points.forEach((p, i) => {
              const dx = p.x - mx;
              const dy = p.y - my;
              a += R[i][j] * dx * dx;
              b += R[i][j] * dx * dy;
              c += R[i][j] * dy * dy;
            });
            return {
              weight: nj / points.length,
              mean: [mx, my],
              cov: [a / nj + REG, b / nj, c / nj + REG],
            };
          });
          const ll =
            points.reduce(
              (s, p) =>
                s + Math.log(components.reduce((t, c) => t + c.weight * density(c, p.x, p.y), 0) || 1e-300),
              0,
            ) / points.length;
          converged = Math.abs(ll - logLik) < 1e-5 || iteration + 1 >= MAX_ITERATIONS;
          logLik = ll;
          iteration++;
        }
      },
      model: () => ({
        proba: responsibilities,
        assignments: points.map((p) => argmax(responsibilities(p.x, p.y))),
        gaussians: components.map((c, label) => ({ label, mean: c.mean, cov: c.cov })),
      }),
      stats: () => [
        { label: "Iteration", value: String(iteration) },
        { label: "Avg log-likelihood", value: formatNumber(logLik, 3) },
        { label: "Status", value: converged ? "Converged" : "Updating" },
      ],
      done: () => converged,
    };
    return trainer;
  },
};
