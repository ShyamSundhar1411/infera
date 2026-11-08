"use client";

import { Eraser, MousePointer2 } from "lucide-react";
import type { AlgorithmMeta } from "@/lib/types/domain/algorithm.types";
import { CLASS_COLORS, CLASS_NAMES, rgb } from "@/lib/constants";
import { Segmented } from "@/components/ui/segmented";
import { cn } from "@/lib/utils";
import type { Tool } from "@/hooks/usePlayground";

interface CanvasToolbarProps {
  meta: AlgorithmMeta;
  activeClass: number;
  onClassChange: (label: number) => void;
  tool: Tool;
  onToolChange: (tool: Tool) => void;
}

export default function CanvasToolbar({ meta, activeClass, onClassChange, tool, onToolChange }: CanvasToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Segmented
        size="sm"
        value={tool}
        onChange={onToolChange}
        options={[
          { value: "add", label: <span className="flex items-center gap-1"><MousePointer2 className="size-3.5" /> Add</span> },
          { value: "erase", label: <span className="flex items-center gap-1"><Eraser className="size-3.5" /> Erase</span> },
        ]}
      />
      {meta.kind === "classification" && (
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Class for new points">
          {CLASS_NAMES.slice(0, meta.maxClasses).map((name, i) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={activeClass === i}
              onClick={() => {
                onClassChange(i);
                onToolChange("add");
              }}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition",
                activeClass === i ? "border-ink text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              <span className="size-2.5 rounded-full" style={{ background: rgb(CLASS_COLORS[i]) }} />
              Class {name}
            </button>
          ))}
        </div>
      )}
      <p className="ml-auto hidden text-xs text-muted md:block">
        Click to add · drag to move · shift-click to erase
      </p>
    </div>
  );
}
