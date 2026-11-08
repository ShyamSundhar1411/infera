import type { Engine, Trainer, TreeNode } from "../types/domain/model.types";
import { formatNumber, formatPercent } from "../utils";
import { argmax, classCount, sigmoid } from "./math";
import { createRandom } from "./random";
import {
  buildClassTree,
  buildRegressionTree,
  classProba,
  leafCount,
  regressionValue,
  treeDepth,
  type Criterion,
} from "./tree";
import { instantTrainer, waitingTrainer } from "./trainer";

export const decisionTree: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    return instantTrainer(() => {
      const tree = buildClassTree(points, {
        maxDepth: Number(params.maxDepth),
        minLeaf: Number(params.minLeaf),
        criterion: String(params.criterion) as Criterion,
        K: classCount(points),
      });
      const proba = (x: number, y: number) => classProba(tree, x, y);
      const acc =
        points.filter((p) => argmax(proba(p.x, p.y)) === p.label).length / points.length;
      return {
        model: { proba, tree },
        stats: [
          { label: "Depth", value: String(treeDepth(tree)) },
          { label: "Leaves", value: String(leafCount(tree)) },
          { label: "Training accuracy", value: formatPercent(acc) },
        ],
      };
    });
  },
};

export const randomForest: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const nTrees = Number(params.nTrees);
    const bootstrap = Boolean(params.bootstrap);
    return instantTrainer(() => {
      const K = classCount(points);
      const rand = createRandom(Number(params.seed ?? 3));
      const trees: TreeNode[] = [];
      const inBag: boolean[][] = [];
      for (let t = 0; t < nTrees; t++) {
        const bag = points.map(() => false);
        const sample = bootstrap
          ? points.map(() => {
              const i = rand.int(points.length);
              bag[i] = true;
              return points[i];
            })
          : points;
        inBag.push(bag);
        trees.push(
          buildClassTree(sample, {
            maxDepth: Number(params.maxDepth),
            minLeaf: Number(params.minLeaf),
            criterion: "gini",
            K,
            featureMode: "random",
            rand,
          }),
        );
      }
      const vote = (x: number, y: number, only?: (t: number) => boolean) => {
        const sum = new Array(K).fill(0);
        let used = 0;
        trees.forEach((tree, t) => {
          if (only && !only(t)) return;
          classProba(tree, x, y).forEach((p, k) => (sum[k] += p));
          used++;
        });
        return used ? sum.map((s) => s / used) : null;
      };
      const proba = (x: number, y: number) => vote(x, y) ?? new Array(K).fill(1 / K);
      const train =
        points.filter((p) => argmax(proba(p.x, p.y)) === p.label).length / points.length;
      const stats = [
        { label: "Trees", value: String(nTrees) },
        { label: "Training accuracy", value: formatPercent(train) },
      ];
      if (bootstrap) {
        // Out-of-bag: score each point only with trees that never saw it.
        let correct = 0;
        let judged = 0;
        points.forEach((p, i) => {
          const v = vote(p.x, p.y, (t) => !inBag[t][i]);
          if (!v) return;
          judged++;
          if (argmax(v) === p.label) correct++;
        });
        if (judged) stats.push({ label: "Out-of-bag accuracy", value: formatPercent(correct / judged) });
      }
      return { model: { proba }, stats };
    });
  },
};

export const adaBoost: Engine = {
  stepsPerFrame: 1,
  msPerStep: 120,
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const total = Number(params.nEstimators);
    const depth = Number(params.depth);
    const lr = Number(params.learningRate);
    const sign = (label: number) => (label === 1 ? 1 : -1);
    const weights = points.map(() => 1 / points.length);
    const learners: { tree: TreeNode; alpha: number }[] = [];
    let lastError = 0;

    const h = (tree: TreeNode, x: number, y: number) => {
      const p = classProba(tree, x, y);
      return (p[1] ?? 0) >= (p[0] ?? 0) ? 1 : -1;
    };
    const score = (x: number, y: number) =>
      learners.reduce((s, l) => s + l.alpha * h(l.tree, x, y), 0);

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && learners.length < total; it++) {
          const tree = buildClassTree(points, {
            maxDepth: depth,
            minLeaf: 1,
            criterion: "gini",
            K: 2,
            weights,
          });
          const miss = points.map((p) => h(tree, p.x, p.y) !== sign(p.label));
          const err = Math.min(
            Math.max(weights.reduce((s, w, i) => s + (miss[i] ? w : 0), 0), 1e-10),
            1 - 1e-10,
          );
          lastError = err;
          const alpha = lr * 0.5 * Math.log((1 - err) / err);
          learners.push({ tree, alpha });
          let sum = 0;
          weights.forEach((w, i) => {
            weights[i] = w * Math.exp(miss[i] ? alpha : -alpha);
            sum += weights[i];
          });
          weights.forEach((w, i) => (weights[i] = w / sum));
        }
      },
      model: () => ({
        decision: score,
        proba: (x, y) => {
          const p = sigmoid(2 * score(x, y));
          return [1 - p, p];
        },
        pointWeights: weights.map((w) => w * points.length),
      }),
      stats: () => {
        const acc =
          points.filter((p) => Math.sign(score(p.x, p.y)) === sign(p.label)).length /
          points.length;
        return [
          { label: "Learners", value: `${learners.length} / ${total}` },
          { label: "Last learner error", value: formatPercent(lastError) },
          { label: "Training accuracy", value: formatPercent(acc) },
        ];
      },
      done: () => learners.length >= total,
    };
    return trainer;
  },
};

export const regressionTree: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add at least 2 points");
    return instantTrainer(() => {
      const tree = buildRegressionTree(points, {
        maxDepth: Number(params.maxDepth),
        minLeaf: Number(params.minLeaf),
      });
      const predict = (x: number) => regressionValue(tree, x);
      const mse = points.reduce((s, p) => s + (p.y - predict(p.x)) ** 2, 0) / points.length;
      return {
        model: { predict, tree },
        stats: [
          { label: "Depth", value: String(treeDepth(tree)) },
          { label: "Leaves", value: String(leafCount(tree)) },
          { label: "Training MSE", value: formatNumber(mse, 4) },
        ],
      };
    });
  },
};

export const gradientBoosting: Engine = {
  stepsPerFrame: 1,
  msPerStep: 90,
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add at least 2 points");
    const total = Number(params.nEstimators);
    const lr = Number(params.learningRate);
    const depth = Number(params.depth);
    const base = points.reduce((s, p) => s + p.y, 0) / points.length;
    const trees: TreeNode[] = [];
    const current = points.map(() => base);

    const predict = (x: number) =>
      trees.reduce((s, t) => s + lr * regressionValue(t, x), base);

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && trees.length < total; it++) {
          const residuals = points.map((p, i) => p.y - current[i]);
          const tree = buildRegressionTree(points, { maxDepth: depth, minLeaf: 2 }, residuals);
          trees.push(tree);
          points.forEach((p, i) => (current[i] += lr * regressionValue(tree, p.x)));
        }
      },
      model: () => ({ predict }),
      stats: () => {
        const mse =
          points.reduce((s, p, i) => s + (p.y - current[i]) ** 2, 0) / points.length;
        return [
          { label: "Trees", value: `${trees.length} / ${total}` },
          { label: "Training MSE", value: formatNumber(mse, 4) },
        ];
      },
      done: () => trees.length >= total,
    };
    return trainer;
  },
};
