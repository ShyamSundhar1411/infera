"use client";

import { RefreshCw, Trash2 } from "lucide-react";
import type { AlgorithmMeta } from "@/lib/types/domain/algorithm.types";
import type { DatasetConfig } from "@/lib/types/domain/dataset.types";
import { getDatasetOptions } from "@/lib/data/datasets.data";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { cn } from "@/lib/utils";

/** Datasets whose shape depends on the number of groups. */
const GROUPED = new Set(["blobs", "circles", "spiral", "separable", "stretched"]);

interface DataPanelProps {
  meta: AlgorithmMeta;
  config: DatasetConfig;
  onChange: (patch: Partial<DatasetConfig>) => void;
  onRegenerate: () => void;
  onClear: () => void;
}

export default function DataPanel({ meta, config, onChange, onRegenerate, onClear }: DataPanelProps) {
  const isRegression = meta.kind === "regression";
  const grouped = GROUPED.has(config.id);

  return (
    <Panel
      title="Data"
      action={
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={onRegenerate} title="New random sample">
            <RefreshCw className="size-3.5" /> Shuffle
          </Button>
          <Button size="sm" variant="ghost" onClick={onClear} title="Remove every point">
            <Trash2 className="size-3.5" /> Clear
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {getDatasetOptions(meta.datasets).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange({ id: d.id })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                d.id === config.id
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-muted hover:border-ink/40 hover:text-ink",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>

        {grouped && meta.kind === "classification" && meta.maxClasses > 2 && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Classes</span>
            <Segmented
              size="sm"
              value={config.groups}
              onChange={(groups) => onChange({ groups })}
              options={[
                { value: 2, label: "2" },
                { value: 3, label: "3" },
              ]}
            />
          </div>
        )}
        {grouped && meta.kind === "clustering" && (
          <SliderField
            label="Groups in the data"
            value={config.groups}
            min={1}
            max={6}
            step={1}
            onChange={(groups) => onChange({ groups })}
          />
        )}

        <SliderField
          label="Points"
          value={config.count}
          min={isRegression ? 5 : 20}
          max={isRegression ? 150 : 300}
          step={isRegression ? 1 : 10}
          onChange={(count) => onChange({ count })}
        />
        <SliderField
          label="Noise"
          value={config.noise}
          min={0}
          max={1}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={(noise) => onChange({ noise })}
        />
      </div>
    </Panel>
  );
}
