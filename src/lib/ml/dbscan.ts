import type { Engine } from "../types/domain/model.types";
import { sqDist } from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

export const dbscan: Engine = {
  create: (points, params) => {
    if (!points.length) return waitingTrainer("Add some points");
    const eps = Number(params.eps);
    const minPts = Number(params.minPts);
    return instantTrainer(() => {
      const eps2 = eps * eps;
      const neighbours = points.map((p) =>
        points.flatMap((q, j) => (sqDist(p.x, p.y, q.x, q.y) <= eps2 ? [j] : [])),
      );
      const core = neighbours.map((n) => n.length >= minPts);
      const labels = new Array(points.length).fill(-1);
      let cluster = 0;
      for (let i = 0; i < points.length; i++) {
        if (labels[i] !== -1 || !core[i]) continue;
        // Grow a cluster outward from this core point.
        const queue = [i];
        labels[i] = cluster;
        while (queue.length) {
          const cur = queue.pop()!;
          if (!core[cur]) continue;
          for (const j of neighbours[cur]) {
            if (labels[j] === -1) {
              labels[j] = cluster;
              queue.push(j);
            }
          }
        }
        cluster++;
      }
      const noise = labels.filter((l) => l === -1).length;
      const coreIdx = core.flatMap((c, i) => (c ? [i] : []));
      return {
        model: {
          assignments: labels,
          coreRadius: params.showRadius ? { radius: eps, indices: coreIdx } : undefined,
        },
        stats: [
          { label: "Clusters", value: String(cluster) },
          { label: "Core points", value: String(coreIdx.length) },
          { label: "Noise points", value: String(noise) },
        ],
      };
    });
  },
};
