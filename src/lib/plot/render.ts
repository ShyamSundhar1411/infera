import type { AlgorithmKind, ParamValues } from "../types/domain/algorithm.types";
import type { Model } from "../types/domain/model.types";
import type { Point } from "../types/domain/point.types";
import { CLASS_COLORS, NOISE_COLOR, rgb } from "../constants";
import { sym2Eigen } from "../ml/math";
import { marchingSquares, type Segment } from "./contours";

export interface PlotTheme {
  bg: string;
  grid: string;
  axis: string;
  ink: string;
  pointStroke: string;
  heatAlpha: number;
}

export const readPlotTheme = (): PlotTheme => {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    bg: v("--plot-bg") || "#fff",
    grid: v("--plot-grid"),
    axis: v("--plot-axis"),
    ink: v("--plot-ink") || "#111",
    pointStroke: v("--plot-point-stroke") || "#fff",
    heatAlpha: Number(v("--heat-alpha")) || 0.4,
  };
};

/** World [-1, 1] to pixels, with y pointing up. */
export const toPx = (v: number, size: number) => ((v + 1) / 2) * size;
export const toPy = (v: number, size: number) => ((1 - v) / 2) * size;
export const toWorldX = (px: number, size: number) => (px / size) * 2 - 1;
export const toWorldY = (py: number, size: number) => 1 - (py / size) * 2;

export interface DrawOptions {
  points: Point[];
  model: Model;
  kind: AlgorithmKind;
  params: ParamValues;
  theme: PlotTheme;
  /** Grid cells per side for the heatmap and contours. */
  resolution?: number;
  /** Smaller marks and no axes, for thumbnails. */
  compact?: boolean;
  hovered?: number | null;
}

const colorOf = (label: number) => CLASS_COLORS[label % CLASS_COLORS.length];

const drawGrid = (ctx: CanvasRenderingContext2D, size: number, theme: PlotTheme) => {
  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 1;
  for (let i = -1; i <= 1.0001; i += 0.25) {
    const p = Math.round(toPx(i, size)) + 0.5;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }
  ctx.strokeStyle = theme.axis;
  const mid = Math.round(size / 2) + 0.5;
  ctx.beginPath();
  ctx.moveTo(mid, 0);
  ctx.lineTo(mid, size);
  ctx.moveTo(0, mid);
  ctx.lineTo(size, mid);
  ctx.stroke();
};

/** Sample a function on the (res + 1)² vertex grid covering world space. */
const sampleGrid = (res: number, f: (x: number, y: number) => number) => {
  const n = res + 1;
  const out = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    const y = 1 - (j / res) * 2;
    for (let i = 0; i < n; i++) out[j * n + i] = f((i / res) * 2 - 1, y);
  }
  return out;
};

const strokeSegments = (
  ctx: CanvasRenderingContext2D,
  segments: Segment[],
  res: number,
  size: number,
) => {
  const s = size / res;
  ctx.beginPath();
  for (const [x1, y1, x2, y2] of segments) {
    ctx.moveTo(x1 * s, y1 * s);
    ctx.lineTo(x2 * s, y2 * s);
  }
  ctx.stroke();
};

const drawRegions = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { model, theme, kind } = opts;
  if (!model.proba) return;
  const res = opts.resolution ?? 90;
  const n = res + 1;
  const probs: number[][] = new Array(n * n);
  for (let j = 0; j < n; j++) {
    const y = 1 - (j / res) * 2;
    for (let i = 0; i < n; i++) probs[j * n + i] = model.proba((i / res) * 2 - 1, y);
  }
  const K = probs[0]?.length ?? 0;
  if (!K) return;

  // Heatmap: blend class colours by probability, fade where the model is unsure.
  const img = new ImageData(n, n);
  const flat = kind === "clustering";
  for (let idx = 0; idx < n * n; idx++) {
    const p = probs[idx];
    let r = 0;
    let g = 0;
    let b = 0;
    let max = 0;
    for (let k = 0; k < K; k++) {
      const c = colorOf(k);
      r += c[0] * p[k];
      g += c[1] * p[k];
      b += c[2] * p[k];
      if (p[k] > max) max = p[k];
    }
    const confidence = K > 1 ? (max - 1 / K) / (1 - 1 / K) : 1;
    const alpha = flat ? theme.heatAlpha * 0.6 : theme.heatAlpha * (0.25 + 0.75 * confidence);
    img.data.set([r, g, b, alpha * 255], idx * 4);
  }
  const off = document.createElement("canvas");
  off.width = n;
  off.height = n;
  off.getContext("2d")!.putImageData(img, 0, 0);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(off, 0, 0, size, size);
  ctx.restore();

  // Boundary: where each class stops being the most likely one.
  const field = new Float32Array(n * n);
  ctx.strokeStyle = theme.ink;
  ctx.globalAlpha = 0.75;
  ctx.lineWidth = opts.compact ? 1 : 1.6;
  ctx.lineJoin = "round";
  for (let k = 0; k < (K === 2 ? 1 : K); k++) {
    for (let idx = 0; idx < n * n; idx++) {
      const p = probs[idx];
      let other = 0;
      for (let j = 0; j < K; j++) if (j !== k && p[j] > other) other = p[j];
      field[idx] = p[k] - other;
    }
    strokeSegments(ctx, marchingSquares(field, res), res, size);
  }
  ctx.globalAlpha = 1;
};

const drawMargins = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { model, theme } = opts;
  if (!model.decision || !model.supportVectors || opts.params.showMargins === false) return;
  const res = opts.resolution ?? 90;
  const values = sampleGrid(res, model.decision);
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = theme.ink;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1.2;
  strokeSegments(ctx, marchingSquares(values, res, 1), res, size);
  strokeSegments(ctx, marchingSquares(values, res, -1), res, size);
  ctx.restore();
};

const drawGaussians = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { model } = opts;
  if (!model.gaussians || opts.params.showGaussians === false) return;
  for (const g of model.gaussians) {
    const { values, vectors } = sym2Eigen(g.cov);
    const angle = Math.atan2(vectors[0][1], vectors[0][0]);
    const cx = toPx(g.mean[0], size);
    const cy = toPy(g.mean[1], size);
    const color = colorOf(g.label);
    for (const [k, alpha] of [
      [1, 0.9],
      [2, 0.45],
    ] as const) {
      const rx = (Math.sqrt(Math.max(values[0], 0)) * k * size) / 2;
      const ry = (Math.sqrt(Math.max(values[1], 0)) * k * size) / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(rx, 0.5), Math.max(ry, 0.5), -angle, 0, Math.PI * 2);
      ctx.strokeStyle = rgb(color, alpha);
      ctx.lineWidth = opts.compact ? 1 : 1.8;
      ctx.stroke();
    }
    drawCross(ctx, cx, cy, opts.compact ? 3 : 6, rgb(color), opts.theme.pointStroke);
  }
};

const drawCross = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
  halo: string,
) => {
  ctx.lineCap = "round";
  for (const [stroke, width] of [
    [halo, 5],
    [color, 2.5],
  ] as const) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.moveTo(x + r, y - r);
    ctx.lineTo(x - r, y + r);
    ctx.stroke();
  }
};

const drawRegression = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { model, points, theme } = opts;
  if (!model.predict) return;
  const predict = model.predict;
  if (opts.params.showResiduals) {
    ctx.strokeStyle = "rgba(240, 101, 84, 0.7)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (const p of points) {
      const x = toPx(p.x, size);
      ctx.moveTo(x, toPy(p.y, size));
      ctx.lineTo(x, toPy(predict(p.x), size));
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.strokeStyle = theme.ink;
  ctx.lineWidth = opts.compact ? 1.5 : 2.5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  const steps = 400;
  for (let s = 0; s <= steps; s++) {
    const x = -1 + (2 * s) / steps;
    const y = Math.max(-3, Math.min(3, predict(x)));
    if (s === 0) ctx.moveTo(toPx(x, size), toPy(y, size));
    else ctx.lineTo(toPx(x, size), toPy(y, size));
  }
  ctx.stroke();
};

const drawPca = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { model, points, theme } = opts;
  if (!model.pca) return;
  const { mean, components, variances } = model.pca;
  const [u] = components;
  const project = (p: Point) => {
    const t = (p.x - mean[0]) * u[0] + (p.y - mean[1]) * u[1];
    return [mean[0] + t * u[0], mean[1] + t * u[1]];
  };
  // PC1 as a long faint line through the mean.
  ctx.strokeStyle = theme.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(toPx(mean[0] - u[0] * 3, size), toPy(mean[1] - u[1] * 3, size));
  ctx.lineTo(toPx(mean[0] + u[0] * 3, size), toPy(mean[1] + u[1] * 3, size));
  ctx.stroke();

  if (opts.params.showProjections) {
    ctx.strokeStyle = "rgba(108, 117, 240, 0.45)";
    ctx.beginPath();
    for (const p of points) {
      const [qx, qy] = project(p);
      ctx.moveTo(toPx(p.x, size), toPy(p.y, size));
      ctx.lineTo(toPx(qx, size), toPy(qy, size));
    }
    ctx.stroke();
    ctx.fillStyle = rgb(CLASS_COLORS[2], 0.9);
    for (const p of points) {
      const [qx, qy] = project(p);
      ctx.beginPath();
      ctx.arc(toPx(qx, size), toPy(qy, size), 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  components.forEach((c, i) => {
    const len = 2 * Math.sqrt(variances[i]);
    const color = i === 0 ? CLASS_COLORS[0] : CLASS_COLORS[1];
    arrow(
      ctx,
      toPx(mean[0], size),
      toPy(mean[1], size),
      toPx(mean[0] + c[0] * len, size),
      toPy(mean[1] + c[1] * len, size),
      rgb(color),
      opts.compact ? 2 : 3,
    );
    if (!opts.compact) {
      ctx.fillStyle = rgb(color);
      ctx.font = "600 12px var(--font-jetbrains), monospace";
      ctx.fillText(
        `PC${i + 1}`,
        toPx(mean[0] + c[0] * len, size) + 6,
        toPy(mean[1] + c[1] * len, size) - 6,
      );
    }
  });
};

const arrow = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number,
) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = width * 3.5;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - Math.cos(angle) * head * 0.6, y2 - Math.sin(angle) * head * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(angle - 0.45), y2 - head * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - head * Math.cos(angle + 0.45), y2 - head * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();
};

const drawPoints = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  const { points, model, kind, theme, params } = opts;
  const base = opts.compact ? 2.4 : 5;
  const sv = new Set(model.supportVectors ?? []);

  if (model.coreRadius) {
    const r = (model.coreRadius.radius * size) / 2;
    ctx.strokeStyle = theme.axis;
    ctx.lineWidth = 1;
    for (const i of model.coreRadius.indices) {
      const p = points[i];
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(toPx(p.x, size), toPy(p.y, size), r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  points.forEach((p, i) => {
    let fill: string;
    if (kind === "classification") fill = rgb(colorOf(p.label));
    else if (kind === "clustering" && model.assignments) {
      const a = model.assignments[i];
      fill = a === undefined ? theme.ink : a < 0 ? rgb(NOISE_COLOR, 0.8) : rgb(colorOf(a));
    } else fill = theme.ink;

    let r = base;
    if (model.pointWeights && params.showWeights !== false) {
      r = Math.max(2.5, Math.min(14, base * Math.sqrt(model.pointWeights[i] ?? 1)));
    }
    if (opts.hovered === i) r += 2;
    const x = toPx(p.x, size);
    const y = toPy(p.y, size);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = opts.compact ? 1 : 1.5;
    ctx.strokeStyle = theme.pointStroke;
    ctx.stroke();
    if (sv.has(i)) {
      ctx.beginPath();
      ctx.arc(x, y, r + 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = theme.ink;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });

  if (model.centroids) {
    model.centroids.forEach((c, i) =>
      drawCross(ctx, toPx(c[0], size), toPy(c[1], size), opts.compact ? 4 : 8, rgb(colorOf(i)), theme.ink),
    );
  }
};

/** Draw the full playground scene for one model. */
export const drawPlot = (ctx: CanvasRenderingContext2D, size: number, opts: DrawOptions) => {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = opts.theme.bg;
  ctx.fillRect(0, 0, size, size);
  if (!opts.compact) drawGrid(ctx, size, opts.theme);
  drawRegions(ctx, size, opts);
  drawMargins(ctx, size, opts);
  drawGaussians(ctx, size, opts);
  drawPca(ctx, size, opts);
  drawRegression(ctx, size, opts);
  drawPoints(ctx, size, opts);
};
