import type { AlgorithmKind } from "../types/domain/algorithm.types";
import type { DatasetConfig, DatasetOption } from "../types/domain/dataset.types";
import type { Point } from "../types/domain/point.types";
import { createRandom, type Random } from "../ml/random";

const clamp = (v: number) => Math.max(-0.98, Math.min(0.98, v));

type Generator = (cfg: DatasetConfig, rand: Random) => Point[];

const point = (x: number, y: number, label = 0): Point => ({
  x: clamp(x),
  y: clamp(y),
  label,
});

const blobs: Generator = ({ count, noise, groups }, rand) => {
  const spread = 0.08 + noise * 0.25;
  const offset = rand.next() * Math.PI * 2;
  return Array.from({ length: count }, (_, i) => {
    const label = i % groups;
    const angle = offset + (label / groups) * Math.PI * 2;
    const r = groups === 1 ? 0 : 0.5;
    return point(
      Math.cos(angle) * r + rand.gaussian() * spread,
      Math.sin(angle) * r + rand.gaussian() * spread,
      label,
    );
  });
};

const moons: Generator = ({ count, noise }, rand) =>
  Array.from({ length: count }, (_, i) => {
    const label = i % 2;
    const t = rand.next() * Math.PI;
    const x = label === 0 ? Math.cos(t) : 1 - Math.cos(t);
    const y = label === 0 ? Math.sin(t) : 0.5 - Math.sin(t);
    return point(
      (x - 0.5) / 1.6 + rand.gaussian() * noise * 0.2,
      (y - 0.25) / 1.6 + rand.gaussian() * noise * 0.2,
      label,
    );
  });

const circles: Generator = ({ count, noise, groups }, rand) =>
  Array.from({ length: count }, (_, i) => {
    const label = i % groups;
    const radius = 0.25 + (label / Math.max(groups - 1, 1)) * 0.6;
    const t = rand.next() * Math.PI * 2;
    const r = radius + rand.gaussian() * noise * 0.12;
    return point(Math.cos(t) * r, Math.sin(t) * r, label);
  });

const xor: Generator = ({ count, noise }, rand) =>
  Array.from({ length: count }, () => {
    const x = (rand.next() * 2 - 1) * 0.9;
    const y = (rand.next() * 2 - 1) * 0.9;
    const label = x * y > 0 ? 0 : 1;
    return point(
      x + rand.gaussian() * noise * 0.15,
      y + rand.gaussian() * noise * 0.15,
      label,
    );
  });

const spiral: Generator = ({ count, noise, groups }, rand) =>
  Array.from({ length: count }, (_, i) => {
    const label = i % groups;
    const t = rand.next();
    const angle = t * 3.2 + (label / groups) * Math.PI * 2;
    const r = 0.08 + t * 0.82;
    return point(
      Math.cos(angle) * r + rand.gaussian() * noise * 0.06,
      Math.sin(angle) * r + rand.gaussian() * noise * 0.06,
      label,
    );
  });

const separable: Generator = ({ count, noise, groups }, rand) => {
  const angle = rand.next() * Math.PI;
  const nx = Math.cos(angle);
  const ny = Math.sin(angle);
  return Array.from({ length: count }, (_, i) => {
    const label = i % groups;
    const shift = (label - (groups - 1) / 2) * 0.55;
    const along = (rand.next() * 2 - 1) * 0.8;
    const across = shift + rand.gaussian() * (0.06 + noise * 0.2);
    return point(-ny * along + nx * across, nx * along + ny * across, label);
  });
};

const stretched: Generator = ({ count, noise, groups }, rand) => {
  const angle = rand.next() * Math.PI;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return Array.from({ length: count }, (_, i) => {
    const label = i % groups;
    const centerAngle = (label / groups) * Math.PI * 2 + 0.4;
    const cx = Math.cos(centerAngle) * 0.45;
    const cy = Math.sin(centerAngle) * 0.45;
    const u = rand.gaussian() * (0.22 + noise * 0.1);
    const v = rand.gaussian() * (0.04 + noise * 0.08);
    return point(cx + c * u - s * v, cy + s * u + c * v, label);
  });
};

const ellipse: Generator = ({ count, noise }, rand) => {
  const angle = rand.next() * Math.PI;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return Array.from({ length: count }, () => {
    const u = rand.gaussian() * 0.4;
    const v = rand.gaussian() * (0.05 + noise * 0.2);
    return point(c * u - s * v, s * u + c * v);
  });
};

const regression =
  (fn: (x: number) => number, outliers = 0): Generator =>
  ({ count, noise }, rand) =>
    Array.from({ length: count }, (_, i) => {
      const x = rand.next() * 1.8 - 0.9;
      const isOutlier = i < outliers;
      const jitter = isOutlier
        ? (rand.next() > 0.5 ? 1 : -1) * (0.5 + rand.next() * 0.3)
        : rand.gaussian() * (0.02 + noise * 0.25);
      return point(x, fn(x) + jitter);
    });

const GENERATORS: Record<string, { label: string; generate: Generator }> = {
  blobs: { label: "Blobs", generate: blobs },
  moons: { label: "Moons", generate: moons },
  circles: { label: "Circles", generate: circles },
  xor: { label: "XOR", generate: xor },
  spiral: { label: "Spiral", generate: spiral },
  separable: { label: "Separable", generate: separable },
  stretched: { label: "Stretched", generate: stretched },
  ellipse: { label: "Ellipse", generate: ellipse },
  line: { label: "Line", generate: regression((x) => 0.55 * x - 0.1) },
  curve: { label: "Curve", generate: regression((x) => 1.1 * x * x - 0.5) },
  sine: { label: "Wave", generate: regression((x) => 0.6 * Math.sin(3.2 * x)) },
  cubic: { label: "Cubic", generate: regression((x) => 1.2 * x ** 3 - 0.6 * x) },
  outliers: {
    label: "Outliers",
    generate: regression((x) => 0.5 * x, 4),
  },
};

export const getDatasetOptions = (ids: string[]): DatasetOption[] =>
  ids.map((id) => ({ id, label: GENERATORS[id].label }));

export const generateDataset = (
  cfg: DatasetConfig,
  kind: AlgorithmKind,
): Point[] => {
  const gen = GENERATORS[cfg.id] ?? GENERATORS.blobs;
  const points = gen.generate(cfg, createRandom(cfg.seed));
  // Unsupervised data has no labels to show.
  return kind === "clustering" || kind === "projection"
    ? points.map((p) => ({ ...p, label: 0 }))
    : points;
};

export const getDefaultDatasetConfig = (
  id: string,
  kind: AlgorithmKind,
): DatasetConfig => ({
  id,
  count: kind === "regression" ? 40 : kind === "projection" ? 120 : 160,
  noise: kind === "regression" ? 0.3 : 0.25,
  groups: kind === "clustering" ? 3 : 2,
  seed: 7,
});
