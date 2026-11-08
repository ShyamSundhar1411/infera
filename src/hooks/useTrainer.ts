"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ParamValues } from "@/lib/types/domain/algorithm.types";
import type { Trainer } from "@/lib/types/domain/model.types";
import type { Point } from "@/lib/types/domain/point.types";
import { ENGINES } from "@/lib/ml/engines";

/**
 * Builds a trainer whenever the data or parameters change and, for iterative
 * algorithms, steps it on animation frames while playing.
 */
export function useTrainer(slug: string, points: Point[], params: ParamValues) {
  const engine = ENGINES[slug];
  const [runId, setRunId] = useState(0);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const previous = useRef<{ trainer: Trainer; runId: number } | null>(null);

  const trainer = useMemo(() => {
    // Warm start from the last trainer unless the user asked for a reset.
    const prev = previous.current;
    const warm = prev && prev.runId === runId ? prev.trainer : undefined;
    return engine.create(points, { ...params, __seed: runId }, warm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, points, params, runId]);

  useEffect(() => {
    previous.current = { trainer, runId };
  }, [trainer, runId]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = -Infinity;
    const loop = (now: number) => {
      if (!trainer.done() && (!engine.msPerStep || now - last >= engine.msPerStep)) {
        trainer.step(engine.stepsPerFrame ?? 1);
        last = now;
        setTick((t) => t + 1);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [trainer, playing, engine]);

  const snapshot = useMemo(
    () => ({ model: trainer.model(), stats: trainer.stats(), done: trainer.done(), tick }),
    [trainer, tick],
  );

  return {
    ...snapshot,
    playing,
    togglePlaying: () => setPlaying((p) => !p),
    step: () => {
      trainer.step(engine.stepsPerFrame ?? 1);
      setTick((t) => t + 1);
    },
    reset: () => setRunId((r) => r + 1),
  };
}
