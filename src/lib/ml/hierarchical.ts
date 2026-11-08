import type { Engine } from "../types/domain/model.types";
import { formatNumber } from "../utils";
import { sqDist } from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

type Linkage = "single" | "complete" | "average" | "ward";

/**
 * Lance–Williams update: distance from the merged cluster (i ∪ j) to k,
 * given the old distances and cluster sizes.
 */
const lanceWilliams = (
  linkage: Linkage,
  dik: number,
  djk: number,
  dij: number,
  ni: number,
  nj: number,
  nk: number,
) => {
  if (linkage === "single") return Math.min(dik, djk);
  if (linkage === "complete") return Math.max(dik, djk);
  if (linkage === "average") return (ni * dik + nj * djk) / (ni + nj);
  const n = ni + nj + nk;
  return ((ni + nk) * dik + (nj + nk) * djk - nk * dij) / n;
};

export const hierarchical: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add at least 2 points");
    const linkage = String(params.linkage) as Linkage;
    const k = Math.min(Number(params.k), points.length);
    return instantTrainer(() => {
      const n = points.length;
      // Ward works on squared distances; the others on plain distances.
      const D = points.map((p) =>
        points.map((q) => {
          const d2 = sqDist(p.x, p.y, q.x, q.y);
          return linkage === "ward" ? d2 : Math.sqrt(d2);
        }),
      );
      const active = new Map<number, { id: number; size: number }>();
      for (let i = 0; i < n; i++) active.set(i, { id: i, size: 1 });
      const merges: { a: number; b: number; height: number; size: number }[] = [];

      while (active.size > 1) {
        let bi = -1;
        let bj = -1;
        let best = Infinity;
        const keys = [...active.keys()];
        for (let x = 0; x < keys.length; x++) {
          for (let y = x + 1; y < keys.length; y++) {
            const d = D[keys[x]][keys[y]];
            if (d < best) {
              best = d;
              bi = keys[x];
              bj = keys[y];
            }
          }
        }
        const ci = active.get(bi)!;
        const cj = active.get(bj)!;
        for (const kk of keys) {
          if (kk === bi || kk === bj) continue;
          const d = lanceWilliams(linkage, D[bi][kk], D[bj][kk], best, ci.size, cj.size, active.get(kk)!.size);
          D[bi][kk] = d;
          D[kk][bi] = d;
        }
        const height = linkage === "ward" ? Math.sqrt(2 * best) : best;
        merges.push({ a: ci.id, b: cj.id, height, size: ci.size + cj.size });
        active.set(bi, { id: n + merges.length - 1, size: ci.size + cj.size });
        active.delete(bj);
      }

      // Replay all but the last k-1 merges with union–find to get k clusters.
      const parent = Array.from({ length: 2 * n - 1 }, (_, i) => i);
      const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
      const keep = merges.length - (k - 1);
      merges.slice(0, keep).forEach((m, i) => {
        parent[find(m.a)] = n + i;
        parent[find(m.b)] = n + i;
      });
      const roots = new Map<number, number>();
      const assignments = points.map((_, i) => {
        const r = find(i);
        if (!roots.has(r)) roots.set(r, roots.size);
        return roots.get(r)!;
      });
      const lower = keep > 0 ? merges[keep - 1].height : 0;
      const upper = keep < merges.length ? merges[keep].height : lower;
      const cutHeight = (lower + upper) / 2;

      return {
        model: { assignments, dendrogram: { n, merges, cutHeight } },
        stats: [
          { label: "Clusters", value: String(roots.size) },
          { label: "Cut height", value: formatNumber(cutHeight, 3) },
          { label: "Merges", value: String(merges.length) },
        ],
      };
    });
  },
};
