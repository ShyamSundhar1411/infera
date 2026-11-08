import type { Point } from "../types/domain/point.types";
import type { Engine } from "../types/domain/model.types";
import { formatNumber, formatPercent } from "../utils";
import { sigmoid } from "./math";
import { createRandom } from "./random";
import { instantTrainer, waitingTrainer } from "./trainer";

type Kernel = (a: Point, b: { x: number; y: number }) => number;

const makeKernel = (type: string, gamma: number, degree: number): Kernel => {
  if (type === "rbf")
    return (a, b) => Math.exp(-gamma * ((a.x - b.x) ** 2 + (a.y - b.y) ** 2));
  if (type === "poly")
    return (a, b) => (gamma * (a.x * b.x + a.y * b.y) + 1) ** degree;
  return (a, b) => a.x * b.x + a.y * b.y;
};

/** Simplified SMO (Platt), the version taught in CS229. */
const smo = (points: Point[], kernel: Kernel, C: number) => {
  const n = points.length;
  const y = points.map((p) => (p.label === 1 ? 1 : -1));
  const K = points.map((a) => points.map((b) => kernel(a, b)));
  const alpha = new Array(n).fill(0);
  let b = 0;
  const tol = 1e-3;
  const rand = createRandom(5);
  const f = (i: number) => {
    let s = b;
    for (let k = 0; k < n; k++) if (alpha[k] !== 0) s += alpha[k] * y[k] * K[k][i];
    return s;
  };

  let passes = 0;
  let loops = 0;
  while (passes < 10 && loops < 300) {
    loops++;
    let changed = 0;
    for (let i = 0; i < n; i++) {
      const Ei = f(i) - y[i];
      if (!((y[i] * Ei < -tol && alpha[i] < C) || (y[i] * Ei > tol && alpha[i] > 0))) continue;
      let j = rand.int(n - 1);
      if (j >= i) j++;
      const Ej = f(j) - y[j];
      const ai = alpha[i];
      const aj = alpha[j];
      const L = y[i] !== y[j] ? Math.max(0, aj - ai) : Math.max(0, ai + aj - C);
      const H = y[i] !== y[j] ? Math.min(C, C + aj - ai) : Math.min(C, ai + aj);
      if (L >= H) continue;
      const eta = 2 * K[i][j] - K[i][i] - K[j][j];
      if (eta >= 0) continue;
      let newAj = aj - (y[j] * (Ei - Ej)) / eta;
      newAj = Math.min(H, Math.max(L, newAj));
      if (Math.abs(newAj - aj) < 1e-5) continue;
      const newAi = ai + y[i] * y[j] * (aj - newAj);
      alpha[i] = newAi;
      alpha[j] = newAj;
      const b1 = b - Ei - y[i] * (newAi - ai) * K[i][i] - y[j] * (newAj - aj) * K[i][j];
      const b2 = b - Ej - y[i] * (newAi - ai) * K[i][j] - y[j] * (newAj - aj) * K[j][j];
      b = newAi > 0 && newAi < C ? b1 : newAj > 0 && newAj < C ? b2 : (b1 + b2) / 2;
      changed++;
    }
    passes = changed === 0 ? passes + 1 : 0;
  }
  return { alpha, b, y };
};

export const svm: Engine = {
  create: (points, params) => {
    const labels = new Set(points.map((p) => p.label));
    if (points.length < 2 || labels.size < 2) return waitingTrainer("Add points of 2 classes");
    const kernelType = String(params.kernel);
    const kernel = makeKernel(kernelType, Number(params.gamma), Number(params.degree));
    const C = Number(params.C);
    return instantTrainer(() => {
      const { alpha, b, y } = smo(points, kernel, C);
      const sv = alpha.map((a, i) => (a > 1e-6 ? i : -1)).filter((i) => i >= 0);
      const decision = (x: number, yy: number) => {
        let s = b;
        for (const i of sv) s += alpha[i] * y[i] * kernel(points[i], { x, y: yy });
        return s;
      };
      const acc =
        points.filter((p, i) => Math.sign(decision(p.x, p.y)) === y[i]).length / points.length;
      const stats = [
        { label: "Support vectors", value: String(sv.length) },
        { label: "Training accuracy", value: formatPercent(acc) },
      ];
      if (kernelType === "linear") {
        let wx = 0;
        let wy = 0;
        for (const i of sv) {
          wx += alpha[i] * y[i] * points[i].x;
          wy += alpha[i] * y[i] * points[i].y;
        }
        stats.push({ label: "Margin width", value: formatNumber(2 / (Math.hypot(wx, wy) || 1), 3) });
      }
      return {
        model: {
          decision,
          supportVectors: sv,
          proba: (x, yy) => {
            const p = sigmoid(2 * decision(x, yy));
            return [1 - p, p];
          },
        },
        stats,
      };
    });
  },
};
