"use client";

import { cn } from "@/lib/utils";

interface SegmentedProps<T extends string | number> {
  value: T;
  options: { value: T; label: React.ReactNode; title?: string }[];
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  className,
  size = "md",
}: SegmentedProps<T>) {
  return (
    <div className={cn("inline-flex rounded-full border border-line bg-surface-2 p-0.5", className)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          title={o.title}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full font-medium transition",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
            o.value === value ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
