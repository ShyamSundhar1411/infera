"use client";

import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainingBarProps {
  playing: boolean;
  done: boolean;
  onToggle: () => void;
  onStep: () => void;
  onReset: () => void;
}

export default function TrainingBar({ playing, done, onToggle, onStep, onReset }: TrainingBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant={playing && !done ? "outline" : "accent"} onClick={onToggle}>
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        {playing ? "Pause" : "Train"}
      </Button>
      <Button size="sm" onClick={onStep} disabled={done} title="One training step">
        <StepForward className="size-3.5" /> Step
      </Button>
      <Button size="sm" variant="ghost" onClick={onReset} title="Start training from scratch">
        <RotateCcw className="size-3.5" /> Restart
      </Button>
      <span className="ml-1 flex items-center gap-1.5 text-xs text-muted">
        <span
          className={`size-1.5 rounded-full ${done ? "bg-muted" : playing ? "animate-pulse bg-[rgb(38,166,154)]" : "bg-[rgb(232,170,50)]"}`}
        />
        {done ? "Finished" : playing ? "Training" : "Paused"}
      </span>
    </div>
  );
}
