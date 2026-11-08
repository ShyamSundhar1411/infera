import type { Engine } from "../types/domain/model.types";
import { formatNumber } from "../utils";
import { solveLinear } from "./math";
import { instantTrainer, waitingTrainer } from "./trainer";

const features = (x: number, degree: number) =>
  Array.from({ length: degree + 1 }, (_, k) => x ** k);

const describe = (w: number[]) => {
  const terms = w.map((c, k) => {
    const coef = formatNumber(Math.abs(c));
    const sign = c < 0 ? "−" : "+";
    const power = k === 0 ? "" : k === 1 ? "x" : `x${superscript(k)}`;
    return { sign, text: `${coef}${power}` };
  });
  return terms
    .reverse()
    .map((t, i) => (i === 0 ? (t.sign === "−" ? "−" : "") + t.text : ` ${t.sign} ${t.text}`))
    .join("");
};

const superscript = (n: number) =>
  String(n)
    .split("")
    .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
    .join("");

export const linearRegression: Engine = {
  create: (points, params) => {
    if (points.length < 2) return waitingTrainer("Add at least 2 points");
    const degree = Number(params.degree);
    const lambda = Number(params.lambda) <= 0.0001 ? 0 : Number(params.lambda);

    return instantTrainer(() => {
      const size = degree + 1;
      const XtX = Array.from({ length: size }, () => new Array(size).fill(0));
      const Xty = new Array(size).fill(0);
      for (const p of points) {
        const f = features(p.x, degree);
        for (let i = 0; i < size; i++) {
          Xty[i] += f[i] * p.y;
          for (let j = 0; j < size; j++) XtX[i][j] += f[i] * f[j];
        }
      }
      // Ridge penalty on every weight except the intercept.
      for (let i = 1; i < size; i++) XtX[i][i] += lambda * points.length;
      const w = solveLinear(XtX, Xty);
      const predict = (x: number) =>
        features(x, degree).reduce((s, f, i) => s + f * w[i], 0);

      const meanY = points.reduce((s, p) => s + p.y, 0) / points.length;
      let ssRes = 0;
      let ssTot = 0;
      for (const p of points) {
        ssRes += (p.y - predict(p.x)) ** 2;
        ssTot += (p.y - meanY) ** 2;
      }
      const stats = [
        { label: "MSE", value: formatNumber(ssRes / points.length, 4) },
        { label: "R²", value: formatNumber(1 - ssRes / (ssTot || 1), 3) },
      ];
      if (degree <= 3) stats.push({ label: "Fit", value: `y = ${describe(w)}` });
      else stats.push({ label: "Weights", value: String(size) });
      return { model: { predict }, stats };
    });
  },
};
