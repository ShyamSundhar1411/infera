import type { Engine } from "../types/domain/model.types";
import { formatPercent } from "../utils";
import { covariance2, mean2, sym2Eigen } from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

export const pca: Engine = {
  create: (points) => {
    if (points.length < 3) return waitingTrainer("Add at least 3 points");
    return instantTrainer(() => {
      const mean = mean2(points);
      const { values, vectors } = sym2Eigen(covariance2(points, mean));
      const total = values[0] + values[1] || 1;
      const angle = (Math.atan2(vectors[0][1], vectors[0][0]) * 180) / Math.PI;
      return {
        model: {
          pca: {
            mean,
            components: vectors,
            variances: [Math.max(values[0], 0), Math.max(values[1], 0)],
          },
        },
        stats: [
          { label: "PC1 explains", value: formatPercent(values[0] / total) },
          { label: "PC2 explains", value: formatPercent(values[1] / total) },
          { label: "PC1 angle", value: `${(((angle % 180) + 180) % 180).toFixed(0)}°` },
        ],
      };
    });
  },
};
