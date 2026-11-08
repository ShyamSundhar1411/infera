import type { Point } from "../types/domain/point.types";

export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

export const softmax = (scores: number[]) => {
  const max = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
};

export const argmax = (values: number[]) => {
  let best = 0;
  for (let i = 1; i < values.length; i++) if (values[i] > values[best]) best = i;
  return best;
};

export const sqDist = (ax: number, ay: number, bx: number, by: number) =>
  (ax - bx) ** 2 + (ay - by) ** 2;

/** Solve A·x = b with Gaussian elimination and partial pivoting. */
export const solveLinear = (A: number[][], b: number[]) => {
  const n = b.length;
  const m = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++)
      if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    [m[col], m[pivot]] = [m[pivot], m[col]];
    const p = m[col][col] || 1e-12;
    for (let r = col + 1; r < n; r++) {
      const f = m[r][col] / p;
      for (let c = col; c <= n; c++) m[r][c] -= f * m[col][c];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = m[r][n];
    for (let c = r + 1; c < n; c++) s -= m[r][c] * x[c];
    x[r] = s / (m[r][r] || 1e-12);
  }
  return x;
};

/** Number of distinct classes to model: at least 2, covers every label present. */
export const classCount = (points: Point[]) =>
  Math.max(2, ...points.map((p) => p.label + 1));

export const accuracy = (points: Point[], predict: (p: Point) => number) => {
  if (!points.length) return 0;
  return points.filter((p) => predict(p) === p.label).length / points.length;
};

/** 2x2 symmetric matrix helpers. Matrices are [a, b, c] for [[a, b], [b, c]]. */
export type Sym2 = [number, number, number];

export const sym2Inverse = ([a, b, c]: Sym2): Sym2 => {
  const det = a * c - b * b || 1e-12;
  return [c / det, -b / det, a / det];
};

export const sym2Det = ([a, b, c]: Sym2) => a * c - b * b;

export const sym2Quad = ([a, b, c]: Sym2, x: number, y: number) =>
  a * x * x + 2 * b * x * y + c * y * y;

/** Eigen decomposition of a 2x2 symmetric matrix, largest eigenvalue first. */
export const sym2Eigen = ([a, b, c]: Sym2) => {
  const tr = a + c;
  const disc = Math.sqrt(Math.max(0, ((a - c) / 2) ** 2 + b * b));
  const l1 = tr / 2 + disc;
  const l2 = tr / 2 - disc;
  let v1: [number, number] =
    Math.abs(b) > 1e-12 ? [l1 - c, b] : a >= c ? [1, 0] : [0, 1];
  const norm = Math.hypot(v1[0], v1[1]) || 1;
  v1 = [v1[0] / norm, v1[1] / norm];
  const v2: [number, number] = [-v1[1], v1[0]];
  return { values: [l1, l2] as [number, number], vectors: [v1, v2] as [[number, number], [number, number]] };
};

export const mean2 = (points: Point[]): [number, number] => {
  if (!points.length) return [0, 0];
  let sx = 0;
  let sy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
  }
  return [sx / points.length, sy / points.length];
};

export const covariance2 = (points: Point[], mean: [number, number]): Sym2 => {
  const n = Math.max(points.length - 1, 1);
  let a = 0;
  let b = 0;
  let c = 0;
  for (const p of points) {
    const dx = p.x - mean[0];
    const dy = p.y - mean[1];
    a += dx * dx;
    b += dx * dy;
    c += dy * dy;
  }
  return [a / n, b / n, c / n];
};
