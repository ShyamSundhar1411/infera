import type { Engine, Trainer } from "../types/domain/model.types";
import { formatNumber, formatPercent } from "../utils";
import { argmax, classCount, softmax } from "./math";
import { createRandom } from "./random";
import { waitingTrainer } from "./trainer";

const MAX_EPOCHS = 6000;

type Activation = "tanh" | "relu" | "sigmoid";

const activations: Record<Activation, { f: (z: number) => number; df: (a: number) => number }> = {
  tanh: { f: Math.tanh, df: (a) => 1 - a * a },
  relu: { f: (z) => (z > 0 ? z : 0), df: (a) => (a > 0 ? 1 : 0) },
  sigmoid: { f: (z) => 1 / (1 + Math.exp(-z)), df: (a) => a * (1 - a) },
};

interface Network {
  sizes: number[];
  activation: Activation;
  /** W[l][out][in] */
  W: number[][][];
  b: number[][];
}

const initNetwork = (sizes: number[], activation: Activation, seed: number): Network => {
  const rand = createRandom(seed);
  const W = sizes.slice(1).map((out, l) => {
    const fanIn = sizes[l];
    const scale = activation === "relu" ? Math.sqrt(2 / fanIn) : Math.sqrt(1 / fanIn);
    return Array.from({ length: out }, () =>
      Array.from({ length: fanIn }, () => rand.gaussian() * scale),
    );
  });
  const b = sizes.slice(1).map((out) => new Array(out).fill(0));
  return { sizes, activation, W, b };
};

const forward = (net: Network, x: number, y: number) => {
  const act = activations[net.activation].f;
  const layers: number[][] = [[x, y]];
  net.W.forEach((Wl, l) => {
    const input = layers[l];
    const z = Wl.map((row, o) => row.reduce((s, w, i) => s + w * input[i], net.b[l][o]));
    layers.push(l === net.W.length - 1 ? softmax(z) : z.map(act));
  });
  return layers;
};

export const neuralNetwork: Engine = {
  stepsPerFrame: 4,
  create: (points, params, previous) => {
    if (points.length < 2) return waitingTrainer("Add points of 2 classes");
    const K = classCount(points);
    const hidden = Array.from({ length: Number(params.layers) }, () => Number(params.neurons));
    const sizes = [2, ...hidden, K];
    const activation = String(params.activation) as Activation;
    const lr = Number(params.learningRate);
    const l2 = Number(params.lambda) <= 0.0001 ? 0 : Number(params.lambda);

    const prev = previous?.state?.() as Network | undefined;
    const net =
      prev && prev.activation === activation && prev.sizes.join() === sizes.join()
        ? prev
        : initNetwork(sizes, activation, 21);

    // Adam moments, shaped like the weights.
    const zerosLike = () => ({
      W: net.W.map((Wl) => Wl.map((row) => row.map(() => 0))),
      b: net.b.map((bl) => bl.map(() => 0)),
    });
    const m = zerosLike();
    const v = zerosLike();
    const beta1 = 0.9;
    const beta2 = 0.999;
    let t = 0;
    let epoch = 0;
    let loss = Infinity;

    const update = (param: number[], grad: number[], mm: number[], vv: number[]) => {
      for (let i = 0; i < param.length; i++) {
        mm[i] = beta1 * mm[i] + (1 - beta1) * grad[i];
        vv[i] = beta2 * vv[i] + (1 - beta2) * grad[i] * grad[i];
        const mh = mm[i] / (1 - beta1 ** t);
        const vh = vv[i] / (1 - beta2 ** t);
        param[i] -= (lr * mh) / (Math.sqrt(vh) + 1e-8);
      }
    };

    const trainer: Trainer = {
      step: (iterations) => {
        const dact = activations[activation].df;
        for (let it = 0; it < iterations && epoch < MAX_EPOCHS; it++) {
          const gW = zerosLike().W;
          const gb = zerosLike().b;
          let total = 0;
          for (const p of points) {
            const layers = forward(net, p.x, p.y);
            const out = layers[layers.length - 1];
            total -= Math.log(Math.max(out[p.label], 1e-12));
            let delta = out.map((o, k) => o - (k === p.label ? 1 : 0));
            for (let l = net.W.length - 1; l >= 0; l--) {
              const input = layers[l];
              for (let o = 0; o < delta.length; o++) {
                gb[l][o] += delta[o];
                for (let i = 0; i < input.length; i++) gW[l][o][i] += delta[o] * input[i];
              }
              if (l > 0) {
                delta = input.map(
                  (a, i) => delta.reduce((s, d, o) => s + d * net.W[l][o][i], 0) * dact(a),
                );
              }
            }
          }
          t++;
          const n = points.length;
          net.W.forEach((Wl, l) =>
            Wl.forEach((row, o) => {
              const grad = row.map((w, i) => gW[l][o][i] / n + l2 * w);
              update(row, grad, m.W[l][o], v.W[l][o]);
            }),
          );
          net.b.forEach((bl, l) => update(bl, gb[l].map((g) => g / n), m.b[l], v.b[l]));
          loss = total / n;
          epoch++;
        }
      },
      model: () => ({
        proba: (x, y) => {
          const layers = forward(net, x, y);
          return layers[layers.length - 1];
        },
      }),
      stats: () => {
        const acc =
          points.filter((p) => {
            const layers = forward(net, p.x, p.y);
            return argmax(layers[layers.length - 1]) === p.label;
          }).length / points.length;
        const weights = net.W.reduce((s, Wl) => s + Wl.length * (Wl[0].length + 1), 0);
        return [
          { label: "Epoch", value: String(epoch) },
          { label: "Loss", value: formatNumber(loss, 3) },
          { label: "Accuracy", value: formatPercent(acc) },
          { label: "Parameters", value: String(weights) },
        ];
      },
      done: () => epoch >= MAX_EPOCHS || loss < 0.005,
      state: () => net,
    };
    return trainer;
  },
};
