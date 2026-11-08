"use client";

import { RotateCcw } from "lucide-react";
import type { AlgorithmMeta, ParamValue, ParamValues } from "@/lib/types/domain/algorithm.types";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Toggle } from "@/components/ui/toggle";

interface ModelPanelProps {
  meta: AlgorithmMeta;
  values: ParamValues;
  onChange: (key: string, value: ParamValue) => void;
  onReset: () => void;
}

export default function ModelPanel({ meta, values, onChange, onReset }: ModelPanelProps) {
  const visible = meta.params.filter((p) => !p.showIf || p.showIf(values));

  return (
    <Panel
      title="Model"
      action={
        <Button size="sm" variant="ghost" onClick={onReset} title="Back to default settings">
          <RotateCcw className="size-3.5" /> Defaults
        </Button>
      }
    >
      <div className="space-y-5">
        {visible.map((p) => {
          if (p.type === "range")
            return (
              <SliderField
                key={p.key}
                label={p.label}
                value={Number(values[p.key])}
                min={p.min}
                max={p.max}
                step={p.step}
                log={p.log}
                format={p.format}
                hint={p.hint}
                onChange={(v) => onChange(p.key, v)}
              />
            );
          if (p.type === "select")
            return (
              <div key={p.key} className="space-y-2">
                <span className="text-sm">{p.label}</span>
                <Segmented
                  size="sm"
                  className="flex w-full [&>button]:flex-1"
                  value={String(values[p.key])}
                  options={p.options}
                  onChange={(v) => onChange(p.key, v)}
                />
                {p.hint && <p className="text-xs text-muted">{p.hint}</p>}
              </div>
            );
          return (
            <Toggle
              key={p.key}
              label={p.label}
              hint={p.hint}
              checked={Boolean(values[p.key])}
              onChange={(v) => onChange(p.key, v)}
            />
          );
        })}
      </div>
    </Panel>
  );
}
