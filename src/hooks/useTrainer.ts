"use client";

import { useEffect, useState } from "react";
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
  const create = (warm?: Trainer) => engine.create(points, { ...params, __seed: runId }, warm);
  const [current, setCurrent] = useState(() => ({ trainer: create(), engine, points, params, runId }));

  // Rebuild when inputs change, warm starting unless the user asked for a reset.
  let state = current;
  if (
    current.engine !== engine ||
    current.points !== points ||
    current.params !== params ||
    current.runId !== runId
  ) {
    const warm = current.runId === runId && current.engine === engine ? current.trainer : undefined;
    state = { trainer: create(warm), engine, points, params, runId };
    setCurrent(state);
  }
  const { trainer } = state;

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

  return {
    // Read fresh on every render: the trainer mutates as it steps.
    model: trainer.model(),
    stats: trainer.stats(),
    done: trainer.done(),
    tick,
    playing,
    togglePlaying: () => setPlaying((p) => !p),
    step: () => {
      trainer.step(engine.stepsPerFrame ?? 1);
      setTick((t) => t + 1);
    },
    reset: () => setRunId((r) => r + 1),
  };
}
