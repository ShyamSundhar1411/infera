"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DistributionMeta } from "@/lib/types/domain/distribution.types";
import { getDefaultDistParams } from "@/lib/data/distributions.data";
import { DISTRIBUTION_MATH, cdfAt } from "@/lib/stats/distributions";
import { createRandom } from "@/lib/ml/random";

export type ChartView = "density" | "cdf";
export type SampleMode = "draws" | "means";

const MAX_SAMPLES = 50000;
const STREAM_PER_FRAME = 25;

/** Parameters, interval, view and sampling state for one distribution page. */
export function useDistributionLab(meta: DistributionMeta) {
  const math = DISTRIBUTION_MATH[meta.slug];
  const discrete = meta.type === "discrete";
  const [params, setParams] = useState<Record<string, number>>(() => getDefaultDistParams(meta));
  const [view, setView] = useState<ChartView>("density");
  const [mode, setModeState] = useState<SampleMode>("draws");
  const [sampleSize, setSampleSizeState] = useState(10);
  const [samples, setSamples] = useState<number[]>([]);
  const [streaming, setStreaming] = useState(false);
  const rand = useRef(createRandom(42));

  const range = math.range(params);
  const mean = math.mean(params);
  const variance = math.variance(params);
  const sd = Math.sqrt(variance);

  // The interval is stored as fractions of the plotted range so it follows the
  // distribution around as parameters change.
  const [intervalT, setIntervalT] = useState<[number, number]>(() => {
    const [lo, hi] = math.range(getDefaultDistParams(meta));
    const m = math.mean(getDefaultDistParams(meta));
    const s = Math.sqrt(math.variance(getDefaultDistParams(meta)));
    const toT = (v: number) => Math.max(0, Math.min(1, (v - lo) / (hi - lo || 1)));
    return Number.isFinite(s) ? [toT(m - s), toT(m + s)] : [0.4, 0.6];
  });
  const snap = (v: number) => (discrete ? Math.round(v) : v);
  const interval: [number, number] = [
    snap(range[0] + intervalT[0] * (range[1] - range[0])),
    snap(range[0] + intervalT[1] * (range[1] - range[0])),
  ];
  const [a, b] = interval[0] <= interval[1] ? interval : [interval[1], interval[0]];
  const intervalProbability = discrete
    ? cdfAt(math, true, b, params) - cdfAt(math, true, Math.ceil(a) - 1, params)
    : cdfAt(math, false, b, params) - cdfAt(math, false, a, params);

  const setInterval = (which: 0 | 1, value: number) => {
    const t = (value - range[0]) / (range[1] - range[0] || 1);
    setIntervalT((prev) => {
      const next = [...prev] as [number, number];
      next[which] = Math.max(0, Math.min(1, t));
      return next;
    });
  };

  const draw = useCallback(
    (count: number) => {
      const one = () => {
        if (mode === "draws") return math.sample(params, rand.current);
        let s = 0;
        for (let i = 0; i < sampleSize; i++) s += math.sample(params, rand.current);
        return s / sampleSize;
      };
      setSamples((prev) => {
        if (prev.length >= MAX_SAMPLES) return prev;
        const fresh = Array.from({ length: Math.min(count, MAX_SAMPLES - prev.length) }, one);
        return prev.concat(fresh);
      });
    },
    [math, params, mode, sampleSize],
  );

  useEffect(() => {
    if (!streaming) return;
    let frame = 0;
    const loop = () => {
      draw(STREAM_PER_FRAME);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [streaming, draw]);

  const clear = () => {
    setSamples([]);
    setStreaming(false);
  };

  const sampleStats = useMemo(() => {
    const n = samples.length;
    if (!n) return null;
    const m = samples.reduce((s, v) => s + v, 0) / n;
    const v = n > 1 ? samples.reduce((s, x) => s + (x - m) ** 2, 0) / (n - 1) : 0;
    return { n, mean: m, variance: v };
  }, [samples]);

  return {
    math,
    discrete,
    params,
    setParam: (key: string, value: number) => {
      setParams((prev) => ({ ...prev, [key]: value }));
      clear();
    },
    resetParams: () => {
      setParams(getDefaultDistParams(meta));
      clear();
    },
    range,
    mean,
    variance,
    sd,
    view,
    setView,
    interval: [a, b] as [number, number],
    setInterval,
    intervalProbability,
    mode,
    setMode: (m: SampleMode) => {
      setModeState(m);
      clear();
    },
    sampleSize,
    setSampleSize: (n: number) => {
      setSampleSizeState(n);
      clear();
    },
    samples,
    sampleStats,
    draw,
    streaming,
    toggleStreaming: () => setStreaming((s) => !s),
    clear,
    full: samples.length >= MAX_SAMPLES,
  };
}
