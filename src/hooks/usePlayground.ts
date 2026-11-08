"use client";

import { useCallback, useMemo, useState } from "react";
import type { AlgorithmMeta, ParamValue, ParamValues } from "@/lib/types/domain/algorithm.types";
import type { DatasetConfig } from "@/lib/types/domain/dataset.types";
import type { Point } from "@/lib/types/domain/point.types";
import { generateDataset, getDefaultDatasetConfig } from "@/lib/data/datasets.data";
import { getDefaultParams } from "@/lib/data/algorithms.data";
import { splitPoints } from "@/lib/ml/evaluate";

const TEST_SHARE = 0.3;

export type Tool = "add" | "erase";

/** Data, parameters and editing state for one algorithm playground. */
export function usePlayground(meta: AlgorithmMeta) {
  const [config, setConfig] = useState<DatasetConfig>(() => {
    const cfg = getDefaultDatasetConfig(meta.defaultDataset, meta.kind);
    return { ...cfg, groups: Math.min(cfg.groups, Math.max(meta.maxClasses, cfg.groups)) };
  });
  const supervised = meta.kind === "classification" || meta.kind === "regression";
  const [holdout, setHoldoutState] = useState(supervised);
  const generate = useCallback(
    (cfg: DatasetConfig, split: boolean) => {
      const fresh = generateDataset(cfg, meta.kind);
      return split ? splitPoints(fresh, TEST_SHARE, cfg.seed) : fresh;
    },
    [meta.kind],
  );
  const [points, setPoints] = useState<Point[]>(() => generate(config, supervised));
  // Models only ever see the training points.
  const trainingPoints = useMemo(() => points.filter((p) => !p.test), [points]);
  const [params, setParams] = useState<ParamValues>(() => getDefaultParams(meta));
  const [activeClass, setActiveClass] = useState(0);
  const [tool, setTool] = useState<Tool>("add");

  const updateConfig = useCallback(
    (patch: Partial<DatasetConfig>) => {
      setConfig((prev) => {
        const next = { ...prev, ...patch };
        setPoints(generate(next, holdout));
        return next;
      });
    },
    [generate, holdout],
  );

  const setHoldout = (on: boolean) => {
    setHoldoutState(on);
    setPoints((prev) => (on ? splitPoints(prev, TEST_SHARE, config.seed) : prev.map((p) => ({ ...p, test: false }))));
  };

  const setParam = useCallback(
    (key: string, value: ParamValue) => setParams((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const addPoint = useCallback(
    (x: number, y: number) =>
      setPoints((prev) => [...prev, { x, y, label: meta.kind === "classification" ? activeClass : 0 }]),
    [activeClass, meta.kind],
  );

  const removePoint = useCallback(
    (index: number) => setPoints((prev) => prev.filter((_, i) => i !== index)),
    [],
  );

  const movePoint = useCallback(
    (index: number, x: number, y: number) =>
      setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, x, y } : p))),
    [],
  );

  return {
    config,
    updateConfig,
    regenerate: () => updateConfig({ seed: config.seed + 1 }),
    clear: () => setPoints([]),
    points,
    trainingPoints,
    supervised,
    holdout,
    setHoldout,
    addPoint,
    removePoint,
    movePoint,
    params,
    setParam,
    resetParams: () => setParams(getDefaultParams(meta)),
    activeClass,
    setActiveClass,
    tool,
    setTool,
  };
}
