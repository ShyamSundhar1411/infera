import type { Engine, Trainer } from "../types/domain/model.types";
import { formatPercent } from "../utils";
import { sigmoid } from "./math";
import { createRandom } from "./random";
import { waitingTrainer } from "./trainer";

const MAX_EPOCHS = 300;

export const perceptron: Engine = {
  stepsPerFrame: 1,
  msPerStep: 140,
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const lr = Number(params.learningRate);
    const rand = createRandom(11);
    const target = (label: number) => (label === 1 ? 1 : -1);
    let w = [0, 0];
    let b = 0;
    let epoch = 0;
    let mistakes = points.length;

    const score = (x: number, y: number) => w[0] * x + w[1] * y + b;

    const trainer: Trainer = {
      step: (iterations) => {
        for (let it = 0; it < iterations && !trainer.done(); it++) {
          mistakes = 0;
          for (const p of rand.shuffle(points)) {
            const t = target(p.label);
            if (t * score(p.x, p.y) <= 0) {
              w = [w[0] + lr * t * p.x, w[1] + lr * t * p.y];
              b += lr * t;
              mistakes++;
            }
          }
          epoch++;
        }
      },
      model: () => {
        const norm = Math.hypot(w[0], w[1]) || 1;
        return {
          decision: (x, y) => score(x, y) / norm,
          proba: (x, y) => {
            const p = sigmoid((8 * score(x, y)) / norm);
            return [1 - p, p];
          },
        };
      },
      stats: () => {
        const correct = points.filter(
          (p) => target(p.label) * score(p.x, p.y) > 0,
        ).length;
        return [
          { label: "Epoch", value: String(epoch) },
          { label: "Mistakes last pass", value: String(mistakes) },
          { label: "Accuracy", value: formatPercent(correct / points.length) },
        ];
      },
      done: () => mistakes === 0 || epoch >= MAX_EPOCHS,
    };
    return trainer;
  },
};
