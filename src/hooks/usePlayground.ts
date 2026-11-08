"use client";

import { useCallback, useState } from "react";
import type { AlgorithmMeta, ParamValue, ParamValues } from "@/lib/types/domain/algorithm.types";
import type { DatasetConfig } from "@/lib/types/domain/dataset.types";
import type { Point } from "@/lib/types/domain/point.types";
import { generateDataset, getDefaultDatasetConfig } from "@/lib/data/datasets.data";
import { getDefaultParams } from "@/lib/data/algorithms.data";

export type Tool = "add" | "erase";

/** Data, parameters and editing state for one algorithm playground. */
export function usePlayground(meta: AlgorithmMeta) {
  const [config, setConfig] = useState<DatasetConfig>(() => {
    const cfg = getDefaultDatasetConfig(meta.defaultDataset, meta.kind);
    return { ...cfg, groups: Math.min(cfg.groups, Math.max(meta.maxClasses, cfg.groups)) };
  });
  const [points, setPoints] = useState<Point[]>(() => generateDataset(config, meta.kind));
  const [params, setParams] = useState<ParamValues>(() => getDefaultParams(meta));
  const [activeClass, setActiveClass] = useState(0);
  const [tool, setTool] = useState<Tool>("add");

  const updateConfig = useCallback(
    (patch: Partial<DatasetConfig>) => {
      setConfig((prev) => {
        const next = { ...prev, ...patch };
        setPoints(generateDataset(next, meta.kind));
        return next;
      });
    },
    [meta.kind],
  );

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
