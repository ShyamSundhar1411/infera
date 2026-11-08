"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}

export function Toggle({ label, checked, onChange, hint }: ToggleProps) {
  return (
    <div className="space-y-1">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm"
      >
        <span>{label}</span>
        <span
          className={cn(
            "relative h-5 w-9 shrink-0 rounded-full transition",
            checked ? "bg-ink" : "bg-line",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-4 rounded-full bg-surface shadow transition-all",
              checked ? "left-[18px]" : "left-0.5",
            )}
          />
        </span>
      </button>
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}
