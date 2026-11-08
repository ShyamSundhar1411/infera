"use client";

import { useId } from "react";

interface SliderFieldProps {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Map the slider through log space for values spanning orders of magnitude. */
  log?: boolean;
  format?: (value: number) => string;
  hint?: string;
}

const LOG_STEPS = 1000;

export function SliderField({ label, value, min, max, step, onChange, log, format, hint }: SliderFieldProps) {
  const id = useId();
  const position = log
    ? (Math.log(value / min) / Math.log(max / min)) * LOG_STEPS
    : value;
  const fill = log ? (position / LOG_STEPS) * 100 : ((value - min) / (max - min)) * 100;

  const handle = (raw: number) => {
    if (!log) return onChange(raw);
    const v = min * (max / min) ** (raw / LOG_STEPS);
    // Snap to the param's step so values stay readable.
    onChange(Math.max(min, Math.min(max, Math.round(v / step) * step || min)));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-ink">
          {label}
        </label>
        <span className="font-mono text-xs tabular-nums text-muted">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="slider w-full"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        min={log ? 0 : min}
        max={log ? LOG_STEPS : max}
        step={log ? 1 : step}
        value={position}
        onChange={(e) => handle(Number(e.target.value))}
      />
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}
