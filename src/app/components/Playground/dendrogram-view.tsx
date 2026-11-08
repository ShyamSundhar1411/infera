"use client";

import { useRef } from "react";
import type { Dendrogram } from "@/lib/types/domain/model.types";
import { CLASS_COLORS, rgb } from "@/lib/constants";

const W = 640;
const H = 240;
const PAD = { top: 12, right: 12, bottom: 12, left: 40 };

interface DendrogramViewProps {
  dendrogram: Dendrogram;
  /** Cluster index of every leaf, to colour the subtrees below the cut. */
  assignments: number[];
  /** Called with the number of clusters a click at that height would give. */
  onCut: (k: number) => void;
}

export default function DendrogramView({ dendrogram, assignments, onCut }: DendrogramViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { n, merges, cutHeight } = dendrogram;
  const maxH = Math.max(...merges.map((m) => m.height), 1e-9);
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const yOf = (h: number) => PAD.top + innerH * (1 - h / maxH);

  // Leaf order from a depth-first walk so branches never cross.
  const children = (id: number) => (id < n ? null : merges[id - n]);
  const order: number[] = [];
  const walk = (id: number) => {
    const m = children(id);
    if (!m) order.push(id);
    else {
      walk(m.a);
      walk(m.b);
    }
  };
  walk(n + merges.length - 1);
  const leafX = new Map(order.map((leaf, i) => [leaf, PAD.left + ((i + 0.5) / n) * innerW]));

  const pos = new Map<number, { x: number; h: number; cluster: number | null }>();
  for (let i = 0; i < n; i++) pos.set(i, { x: leafX.get(i)!, h: 0, cluster: assignments[i] ?? null });
  const links = merges.map((m, i) => {
    const a = pos.get(m.a)!;
    const b = pos.get(m.b)!;
    const below = m.height < cutHeight;
    const cluster = below && a.cluster === b.cluster ? a.cluster : null;
    pos.set(n + i, { x: (a.x + b.x) / 2, h: m.height, cluster });
    return { a, b, h: m.height, cluster };
  });

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * H;
    const h = ((PAD.top + innerH - y) / innerH) * maxH;
    onCut(Math.max(1, Math.min(8, 1 + merges.filter((m) => m.height > h).length)));
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-3">
      <div className="mb-1 flex items-center justify-between px-1 text-xs text-muted">
        <span className="font-semibold uppercase tracking-[0.12em]">Dendrogram</span>
        <span>Click at any height to cut the tree there</span>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-row-resize"
        onClick={handleClick}
        role="img"
        aria-label="Dendrogram of merges"
      >
        <text x={8} y={PAD.top + 8} className="fill-muted text-[10px]">
          {maxH.toFixed(2)}
        </text>
        <text x={8} y={H - PAD.bottom} className="fill-muted text-[10px]">
          0
        </text>
        {links.map((l, i) => (
          <path
            key={i}
            d={`M${l.a.x},${yOf(l.a.h)} V${yOf(l.h)} H${l.b.x} V${yOf(l.b.h)}`}
            fill="none"
            strokeWidth={l.cluster !== null ? 1.4 : 1.1}
            stroke={l.cluster !== null ? rgb(CLASS_COLORS[l.cluster % CLASS_COLORS.length]) : "var(--muted)"}
          />
        ))}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={yOf(cutHeight)}
          y2={yOf(cutHeight)}
          stroke="var(--ink)"
          strokeDasharray="5 4"
          strokeWidth={1.2}
        />
      </svg>
    </div>
  );
}
