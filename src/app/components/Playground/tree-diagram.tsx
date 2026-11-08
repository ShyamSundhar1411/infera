"use client";

import type { TreeNode } from "@/lib/types/domain/model.types";
import { CLASS_COLORS, CLASS_NAMES, rgb } from "@/lib/constants";
import { argmax } from "@/lib/ml/math";

const NODE_W = 92;
const NODE_H = 40;
const GAP_X = 12;
const LEVEL_H = 70;

interface Placed {
  node: TreeNode;
  x: number;
  y: number;
  parent?: { x: number; y: number };
}

/** Lay leaves out left to right and centre each parent over its children. */
const layout = (root: TreeNode) => {
  const placed: Placed[] = [];
  let nextLeaf = 0;
  const visit = (node: TreeNode, depth: number, parent?: { x: number; y: number }): number => {
    const y = depth * LEVEL_H;
    let x: number;
    const entry: Placed = { node, x: 0, y, parent };
    placed.push(entry);
    if (node.left && node.right) {
      const here = { x: 0, y };
      const lx = visit(node.left, depth + 1, here);
      const rx = visit(node.right, depth + 1, here);
      x = (lx + rx) / 2;
      here.x = x;
    } else {
      x = nextLeaf * (NODE_W + GAP_X);
      nextLeaf++;
    }
    entry.x = x;
    return x;
  };
  visit(root, 0);
  return { placed, width: nextLeaf * (NODE_W + GAP_X) - GAP_X };
};

const describeSplit = (node: TreeNode) =>
  `${node.feature === 0 ? "x" : "y"} ≤ ${node.threshold?.toFixed(2)}`;

export default function TreeDiagram({ tree, regression = false }: { tree: TreeNode; regression?: boolean }) {
  const { placed, width } = layout(tree);
  const depth = Math.max(...placed.map((p) => p.node.depth));
  const height = depth * LEVEL_H + NODE_H;

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-4">
      <svg
        width={Math.max(width, NODE_W) + 8}
        height={height + 8}
        viewBox={`-4 -4 ${Math.max(width, NODE_W) + 8} ${height + 8}`}
        className="mx-auto block"
        role="img"
        aria-label="Decision tree diagram"
      >
        {placed.map(
          ({ node, x, y, parent }) =>
            parent && (
              <path
                key={`e${node.id}`}
                d={`M${parent.x + NODE_W / 2},${parent.y + NODE_H} C${parent.x + NODE_W / 2},${parent.y + NODE_H + 18} ${x + NODE_W / 2},${y - 18} ${x + NODE_W / 2},${y}`}
                className="fill-none stroke-line"
                strokeWidth={1.5}
              />
            ),
        )}
        {placed.map(({ node, x, y }) => {
          const leaf = !node.left;
          const winner = node.counts.length ? argmax(node.counts) : 0;
          const color = CLASS_COLORS[winner];
          const total = node.counts.reduce((a, b) => a + b, 0) || 1;
          const purity = node.counts.length ? node.counts[winner] / total : 1;
          return (
            <g key={node.id} transform={`translate(${x},${y})`}>
              <rect
                width={NODE_W}
                height={NODE_H}
                rx={10}
                className={leaf ? "" : "fill-surface-2 stroke-line"}
                fill={leaf && !regression ? rgb(color, 0.15 + 0.35 * purity) : undefined}
                stroke={leaf && !regression ? rgb(color) : undefined}
                style={leaf && regression ? { fill: "var(--surface-2)", stroke: "var(--ink)" } : undefined}
              />
              <text x={NODE_W / 2} y={17} textAnchor="middle" className="fill-ink font-mono text-[11px]">
                {leaf
                  ? regression
                    ? `ŷ = ${node.value?.toFixed(2)}`
                    : `Class ${CLASS_NAMES[winner] ?? winner}`
                  : describeSplit(node)}
              </text>
              <text x={NODE_W / 2} y={31} textAnchor="middle" className="fill-muted text-[10px]">
                {node.n} pts{!regression && ` · ${Math.round(purity * 100)}% pure`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
