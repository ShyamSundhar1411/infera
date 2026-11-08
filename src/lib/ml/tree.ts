import type { Point } from "../types/domain/point.types";
import type { TreeNode } from "../types/domain/model.types";
import type { Random } from "./random";

export type Criterion = "gini" | "entropy";

export interface ClassTreeOptions {
  maxDepth: number;
  minLeaf: number;
  criterion: Criterion;
  K: number;
  /** "random" picks one feature per split, as random forests do in 2D. */
  featureMode?: "all" | "random";
  rand?: Random;
  /** Per-sample weights (AdaBoost). Defaults to 1 each. */
  weights?: number[];
}

const impurityOf = (counts: number[], total: number, criterion: Criterion) => {
  if (total <= 0) return 0;
  let out = criterion === "gini" ? 1 : 0;
  for (const c of counts) {
    const p = c / total;
    if (criterion === "gini") out -= p * p;
    else if (p > 0) out -= p * Math.log2(p);
  }
  return out;
};

const coord = (p: Point, f: 0 | 1) => (f === 0 ? p.x : p.y);

export const buildClassTree = (points: Point[], opts: ClassTreeOptions) => {
  const { maxDepth, minLeaf, criterion, K } = opts;
  const w = opts.weights ?? points.map(() => 1);
  let nextId = 0;

  const build = (indices: number[], depth: number): TreeNode => {
    const counts = new Array(K).fill(0);
    let total = 0;
    for (const i of indices) {
      counts[points[i].label] += w[i];
      total += w[i];
    }
    const impurity = impurityOf(counts, total, criterion);
    const node: TreeNode = { id: nextId++, depth, n: indices.length, counts, impurity };
    if (depth >= maxDepth || indices.length < 2 * minLeaf || impurity < 1e-9) return node;

    const features: (0 | 1)[] =
      opts.featureMode === "random" && opts.rand ? [opts.rand.int(2) as 0 | 1] : [0, 1];
    let best: { f: 0 | 1; threshold: number; score: number } | null = null;

    for (const f of features) {
      const sorted = [...indices].sort((a, b) => coord(points[a], f) - coord(points[b], f));
      const left = new Array(K).fill(0);
      const right = [...counts];
      let leftW = 0;
      for (let s = 0; s < sorted.length - 1; s++) {
        const i = sorted[s];
        left[points[i].label] += w[i];
        right[points[i].label] -= w[i];
        leftW += w[i];
        const nLeft = s + 1;
        if (nLeft < minLeaf || sorted.length - nLeft < minLeaf) continue;
        const a = coord(points[i], f);
        const b = coord(points[sorted[s + 1]], f);
        if (a === b) continue;
        const rightW = total - leftW;
        const score =
          (leftW * impurityOf(left, leftW, criterion) +
            rightW * impurityOf(right, rightW, criterion)) /
          total;
        if (!best || score < best.score - 1e-12) best = { f, threshold: (a + b) / 2, score };
      }
    }
    if (!best) return node;

    const leftIdx = indices.filter((i) => coord(points[i], best.f) <= best.threshold);
    const rightIdx = indices.filter((i) => coord(points[i], best.f) > best.threshold);
    node.feature = best.f;
    node.threshold = best.threshold;
    node.left = build(leftIdx, depth + 1);
    node.right = build(rightIdx, depth + 1);
    return node;
  };

  return build(points.map((_, i) => i), 0);
};

export const leafOf = (node: TreeNode, x: number, y: number): TreeNode => {
  let cur = node;
  while (cur.left && cur.right && cur.feature !== undefined) {
    const v = cur.feature === 0 ? x : y;
    cur = v <= (cur.threshold ?? 0) ? cur.left : cur.right;
  }
  return cur;
};

export const classProba = (node: TreeNode, x: number, y: number) => {
  const leaf = leafOf(node, x, y);
  const total = leaf.counts.reduce((a, b) => a + b, 0) || 1;
  return leaf.counts.map((c) => c / total);
};

export interface RegressionTreeOptions {
  maxDepth: number;
  minLeaf: number;
}

/** Regression tree on x only, fitting `targets` (defaults to each point's y). */
export const buildRegressionTree = (
  points: Point[],
  { maxDepth, minLeaf }: RegressionTreeOptions,
  targets: number[] = points.map((p) => p.y),
) => {
  let nextId = 0;
  const build = (indices: number[], depth: number): TreeNode => {
    let sum = 0;
    let sumSq = 0;
    for (const i of indices) {
      sum += targets[i];
      sumSq += targets[i] ** 2;
    }
    const n = indices.length;
    const mean = n ? sum / n : 0;
    const sse = sumSq - n * mean * mean;
    const node: TreeNode = {
      id: nextId++,
      depth,
      n,
      counts: [],
      value: mean,
      impurity: n ? sse / n : 0,
    };
    if (depth >= maxDepth || n < 2 * minLeaf || sse < 1e-12) return node;

    const sorted = [...indices].sort((a, b) => points[a].x - points[b].x);
    let leftSum = 0;
    let leftSq = 0;
    let best: { threshold: number; score: number } | null = null;
    for (let s = 0; s < n - 1; s++) {
      const t = targets[sorted[s]];
      leftSum += t;
      leftSq += t * t;
      const nl = s + 1;
      const nr = n - nl;
      if (nl < minLeaf || nr < minLeaf) continue;
      const a = points[sorted[s]].x;
      const b = points[sorted[s + 1]].x;
      if (a === b) continue;
      const rightSum = sum - leftSum;
      const rightSq = sumSq - leftSq;
      const score =
        leftSq - (leftSum * leftSum) / nl + (rightSq - (rightSum * rightSum) / nr);
      if (!best || score < best.score - 1e-12) best = { threshold: (a + b) / 2, score };
    }
    if (!best) return node;
    node.feature = 0;
    node.threshold = best.threshold;
    node.left = build(indices.filter((i) => points[i].x <= best.threshold), depth + 1);
    node.right = build(indices.filter((i) => points[i].x > best.threshold), depth + 1);
    return node;
  };
  return build(points.map((_, i) => i), 0);
};

export const regressionValue = (node: TreeNode, x: number) =>
  leafOf(node, x, 0).value ?? 0;

export const treeDepth = (node: TreeNode): number =>
  node.left && node.right ? 1 + Math.max(treeDepth(node.left), treeDepth(node.right)) : 0;

export const leafCount = (node: TreeNode): number =>
  node.left && node.right ? leafCount(node.left) + leafCount(node.right) : 1;
