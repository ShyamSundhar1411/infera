import type { Model, Stat, Trainer } from "../types/domain/model.types";

/** Wrap a one-shot fit as a trainer that is done after its first step. */
export const instantTrainer = (
  fit: () => { model: Model; stats: Stat[] },
): Trainer => {
  let result: { model: Model; stats: Stat[] } | null = null;
  const ensure = () => (result ??= fit());
  return {
    step: () => void ensure(),
    model: () => ensure().model,
    stats: () => ensure().stats,
    done: () => true,
  };
};

/** Trainer shown while the canvas doesn't have enough data to fit. */
export const waitingTrainer = (message: string): Trainer =>
  instantTrainer(() => ({
    model: {},
    stats: [{ label: "Status", value: message }],
  }));
