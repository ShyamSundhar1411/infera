"use client";

import { FlaskConical } from "lucide-react";
import type { AlgorithmMeta } from "@/lib/types/domain/algorithm.types";
import type { Evaluation, FitVerdict } from "@/lib/ml/evaluate";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Toggle } from "@/components/ui/toggle";

interface FitPanelProps {
  meta: AlgorithmMeta;
  holdout: boolean;
  onHoldoutChange: (on: boolean) => void;
  tested: boolean;
  onTest: () => void;
  evaluation: Evaluation | null;
}

const VERDICTS: Record<FitVerdict, { title: string; color: string; text: string }> = {
  good: {
    title: "Good fit",
    color: "rgb(38, 166, 154)",
    text: "The model does about as well on new points as on the ones it trained on. It has learned the pattern, not the noise.",
  },
  overfit: {
    title: "Overfitting",
    color: "rgb(240, 101, 84)",
    text: "Much better on training points than on new ones. The model has memorised quirks of the training data that don't carry over.",
  },
  underfit: {
    title: "Underfitting",
    color: "rgb(232, 170, 50)",
    text: "It struggles even on the points it trained on. The model is too simple (or too constrained) to capture the pattern.",
  },
};

// R² is unbounded below; past −1 the exact value only adds noise.
const score = (e: Evaluation, v: number) =>
  e.metric === "Accuracy" ? `${(v * 100).toFixed(1)}%` : v < -1 ? "below −1" : v.toFixed(3);

export default function FitPanel({ meta, holdout, onHoldoutChange, tested, onTest, evaluation }: FitPanelProps) {
  const knob = meta.complexity && meta.params.find((p) => p.key === meta.complexity!.key);
  const suggestion = (verdict: FitVerdict) => {
    if (!knob || !meta.complexity || verdict === "good") return null;
    const up = meta.complexity.moreComplex === "higher";
    const wantMore = verdict === "underfit";
    return `Try ${wantMore === up ? "raising" : "lowering"} ${knob.label} to make the model ${wantMore ? "more flexible" : "simpler"}.`;
  };

  return (
    <Panel title="Test the model">
      <div className="space-y-4">
        <Toggle
          label="Hold out 30% as test points"
          checked={holdout}
          onChange={onHoldoutChange}
          hint="Hollow points are hidden from training and only used for testing."
        />
        {holdout && !tested && (
          <div className="space-y-2">
            <Button variant="accent" className="w-full" onClick={onTest}>
              <FlaskConical className="size-4" /> Test model
            </Button>
            <p className="text-xs text-muted">See how the model does on points it has never seen.</p>
          </div>
        )}
        {holdout && tested && !evaluation && (
          <p className="text-sm text-muted">Need at least 2 training and 2 test points to test.</p>
        )}
        {holdout && tested && evaluation && (
          <div className="space-y-4">
            {(["train", "test"] as const).map((which) => {
              const v = evaluation[which];
              const width = Math.max(0, Math.min(1, v)) * 100;
              return (
                <div key={which} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>
                      {which === "train" ? "Training" : "Test"} {evaluation.metric}
                      <span className="ml-1 text-xs text-muted">
                        ({which === "train" ? evaluation.trainCount : evaluation.testCount} pts)
                      </span>
                    </span>
                    <span className="font-mono tabular-nums">{score(evaluation, v)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${width}%`, background: which === "train" ? "var(--ink)" : VERDICTS[evaluation.verdict].color }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="rounded-xl border p-3" style={{ borderColor: VERDICTS[evaluation.verdict].color }}>
              <p className="flex items-center gap-2 font-medium">
                <span className="size-2 rounded-full" style={{ background: VERDICTS[evaluation.verdict].color }} />
                {VERDICTS[evaluation.verdict].title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{VERDICTS[evaluation.verdict].text}</p>
              {suggestion(evaluation.verdict) && <p className="mt-2 text-sm">{suggestion(evaluation.verdict)}</p>}
            </div>
            <p className="text-xs text-muted">Scores update live as you change the data or the settings.</p>
          </div>
        )}
      </div>
    </Panel>
  );
}
