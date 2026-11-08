"use client";

import { useEffect, useRef, useState } from "react";
import type { AlgorithmKind, ParamValues } from "@/lib/types/domain/algorithm.types";
import type { Model } from "@/lib/types/domain/model.types";
import type { Point } from "@/lib/types/domain/point.types";
import { drawPlot, readPlotTheme, toPx, toPy, toWorldX, toWorldY } from "@/lib/plot/render";
import { useThemeVersion } from "@/hooks/useThemeVersion";
import type { Tool } from "@/hooks/usePlayground";

interface PlotCanvasProps {
  points: Point[];
  model: Model;
  kind: AlgorithmKind;
  params: ParamValues;
  /** Changes whenever the model has trained further. */
  version: number;
  tool: Tool;
  onAdd: (x: number, y: number) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, x: number, y: number) => void;
}

const HIT_RADIUS = 10;
const clamp = (v: number) => Math.max(-0.99, Math.min(0.99, v));

export default function PlotCanvas({
  points,
  model,
  kind,
  params,
  version,
  tool,
  onAdd,
  onRemove,
  onMove,
}: PlotCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef<number | null>(null);
  const [size, setSize] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState<[number, number] | null>(null);
  const themeVersion = useThemeVersion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setSize(Math.floor(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawPlot(ctx, size, { points, model, kind, params, theme: readPlotTheme(), hovered });
  }, [points, model, kind, params, version, size, hovered, themeVersion]);

  const locate = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top] as const;
  };

  const hitTest = (px: number, py: number) => {
    let best = -1;
    let bestD = HIT_RADIUS * HIT_RADIUS;
    points.forEach((p, i) => {
      const d = (toPx(p.x, size) - px) ** 2 + (toPy(p.y, size) - py) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const [px, py] = locate(e);
    const hit = hitTest(px, py);
    const erasing = tool === "erase" || e.shiftKey || e.button === 2;
    if (erasing) {
      if (hit >= 0) onRemove(hit);
      return;
    }
    if (hit >= 0) {
      dragging.current = hit;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      return;
    }
    onAdd(clamp(toWorldX(px, size)), clamp(toWorldY(py, size)));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const [px, py] = locate(e);
    setCursor([toWorldX(px, size), toWorldY(py, size)]);
    if (dragging.current !== null) {
      onMove(dragging.current, clamp(toWorldX(px, size)), clamp(toWorldY(py, size)));
      return;
    }
    const hit = hitTest(px, py);
    setHovered(hit >= 0 ? hit : null);
  };

  const endDrag = () => {
    dragging.current = null;
  };

  return (
    <div ref={wrapRef} className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className={tool === "erase" ? "cursor-not-allowed" : hovered !== null ? "cursor-grab" : "cursor-crosshair"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => {
          setCursor(null);
          setHovered(null);
        }}
        onContextMenu={(e) => e.preventDefault()}
      />
      {cursor && (
        <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[11px] text-muted">
          ({cursor[0].toFixed(2)}, {cursor[1].toFixed(2)})
        </span>
      )}
      {points.length === 0 && (
        <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">
          Click anywhere to add points
        </p>
      )}
    </div>
  );
}
