"use client";

import { useMemo, useRef, useState } from "react";
import type { DistParamValues } from "@/lib/types/domain/distribution.types";
import { cdfAt, type DistributionMath } from "@/lib/stats/distributions";
import type { ChartView, SampleMode } from "@/hooks/useDistributionLab";

const W = 680;
const H = 380;
const PAD = { top: 20, right: 20, bottom: 36, left: 48 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;
const BINS = 48;

const CURVE = "rgb(108, 117, 240)";
const SHADE = "rgba(108, 117, 240, 0.28)";
const HIST = "rgba(240, 101, 84, 0.45)";
const HIST_STROKE = "rgb(240, 101, 84)";
const CLT = "rgb(38, 166, 154)";

interface ChartProps {
  math: DistributionMath;
  discrete: boolean;
  params: DistParamValues;
  range: [number, number];
  mean: number;
  sd: number;
  view: ChartView;
  interval: [number, number];
  samples: number[];
  mode: SampleMode;
  sampleSize: number;
}

const niceTicks = (lo: number, hi: number, count = 6) => {
  const span = hi - lo || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) ?? raw;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Number(v.toFixed(10)));
  return out;
};

const fmt = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2));

export default function DistributionChart(props: ChartProps) {
  const { math, discrete, params, range, mean, sd, view, interval, samples, mode, sampleSize } = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const [lo, hi] = discrete ? [range[0] - 0.5, range[1] + 0.5] : range;
  const sx = (x: number) => PAD.left + ((x - lo) / (hi - lo)) * IW;

  const curve = useMemo(() => {
    if (discrete) {
      const ks: number[] = [];
      for (let k = range[0]; k <= range[1]; k++) ks.push(k);
      return ks.map((k) => ({
        x: k,
        f: math.density(k, params),
        F: cdfAt(math, true, k, params),
      }));
    }
    const steps = 360;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const x = range[0] + ((range[1] - range[0]) * i) / steps;
      return { x, f: math.density(x, params), F: cdfAt(math, false, x, params) };
    });
  }, [math, discrete, params, range]);

  const histogram = useMemo(() => {
    if (!samples.length || view !== "density") return null;
    if (discrete && mode === "draws") {
      const counts = new Map<number, number>();
      for (const s of samples) counts.set(s, (counts.get(s) ?? 0) + 1);
      return [...counts].map(([k, c]) => ({ x0: k - 0.5, x1: k + 0.5, h: c / samples.length, discrete: true }));
    }
    const width = (range[1] - range[0]) / BINS;
    const counts = new Array(BINS).fill(0);
    for (const s of samples) {
      const i = Math.floor((s - range[0]) / width);
      if (i >= 0 && i < BINS) counts[i]++;
    }
    return counts.map((c, i) => ({
      x0: range[0] + i * width,
      x1: range[0] + (i + 1) * width,
      h: c / (samples.length * width),
      discrete: false,
    }));
  }, [samples, view, discrete, mode, range]);

  // Normal curve predicted by the Central Limit Theorem for sample means.
  const cltCurve = useMemo(() => {
    if (mode !== "means" || view !== "density" || !Number.isFinite(sd) || !Number.isFinite(mean)) return null;
    const s = sd / Math.sqrt(sampleSize);
    if (s <= 0) return null;
    return Array.from({ length: 241 }, (_, i) => {
      const x = range[0] + ((range[1] - range[0]) * i) / 240;
      return { x, f: Math.exp(-0.5 * ((x - mean) / s) ** 2) / (s * Math.sqrt(2 * Math.PI)) };
    });
  }, [mode, view, sd, mean, sampleSize, range]);

  const yMax = useMemo(() => {
    if (view === "cdf") return 1;
    const finite = curve.map((p) => p.f).filter(Number.isFinite);
    const sorted = [...finite].sort((x, y) => x - y);
    let top = sorted[sorted.length - 1] ?? 1;
    // Densities that blow up at an edge (Beta, Gamma with shape < 1) would
    // flatten everything else, so cap at a multiple of a high percentile.
    if (!discrete) top = Math.min(top, (sorted[Math.floor(sorted.length * 0.9)] || top) * 3);
    if (histogram) top = Math.max(top, ...histogram.map((b) => b.h));
    if (cltCurve) top = Math.max(top, ...cltCurve.map((p) => p.f));
    return (top || 1) * 1.08;
  }, [view, curve, discrete, histogram, cltCurve]);

  const sy = (y: number) => PAD.top + IH * (1 - Math.min(y, yMax * 1.05) / yMax);
  const [a, b] = interval;
  const inInterval = (x: number) => x >= a - 1e-9 && x <= b + 1e-9;

  const pathOf = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${sx(p.x).toFixed(2)},${sy(p.y).toFixed(2)}`).join("");

  const hovered = useMemo(() => {
    if (hoverX === null) return null;
    const x = discrete ? Math.round(hoverX) : hoverX;
    if (x < range[0] || x > range[1]) return null;
    return { x, f: math.density(x, params), F: cdfAt(math, discrete, x, params) };
  }, [hoverX, discrete, range, math, params]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    setHoverX(lo + ((px - PAD.left) / IW) * (hi - lo));
  };

  const xTicks = discrete
    ? niceTicks(range[0], range[1], 10).filter((t) => Number.isInteger(t))
    : niceTicks(range[0], range[1]);
  const yTicks = niceTicks(0, yMax, 4);
  const showMean = Number.isFinite(mean) && mean >= lo && mean <= hi;
  const barW = discrete ? Math.max(2, (IW / (range[1] - range[0] + 1)) * 0.62) : 0;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full touch-none select-none"
      onPointerMove={onMove}
      onPointerLeave={() => setHoverX(null)}
      role="img"
      aria-label={view === "cdf" ? "Cumulative distribution function" : "Probability distribution"}
    >
      <defs>
        <clipPath id="plot-area">
          <rect x={PAD.left} y={PAD.top - 2} width={IW} height={IH + 2} />
        </clipPath>
      </defs>

      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} stroke="var(--line)" />
          <text x={PAD.left - 8} y={sy(t) + 4} textAnchor="end" className="fill-muted font-mono text-[10px]">
            {fmt(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={`x${t}`} x={sx(t)} y={H - PAD.bottom + 18} textAnchor="middle" className="fill-muted font-mono text-[10px]">
          {fmt(t)}
        </text>
      ))}

      <g clipPath="url(#plot-area)">
        {showMean && view === "density" && Number.isFinite(sd) && (
          <rect
            x={sx(Math.max(lo, mean - sd))}
            y={PAD.top}
            width={Math.max(0, sx(Math.min(hi, mean + sd)) - sx(Math.max(lo, mean - sd)))}
            height={IH}
            fill="var(--surface-2)"
            opacity={0.7}
          />
        )}

        {view === "density" && !discrete && (
          <>
            <path
              d={`${pathOf(curve.filter((p) => inInterval(p.x)).map((p) => ({ x: p.x, y: p.f })))}${
                curve.some((p) => inInterval(p.x)) ? `L${sx(Math.min(b, range[1]))},${sy(0)}L${sx(Math.max(a, range[0]))},${sy(0)}Z` : ""
              }`}
              fill={SHADE}
            />
          </>
        )}

        {histogram?.map((bin, i) =>
          bin.discrete ? (
            <rect
              key={i}
              x={sx(bin.x0 + 0.5) - barW / 2 - 3}
              y={sy(bin.h)}
              width={barW + 6}
              height={Math.max(0, sy(0) - sy(bin.h))}
              fill="none"
              stroke={HIST_STROKE}
              strokeWidth={1.5}
              rx={2}
            />
          ) : (
            <rect
              key={i}
              x={sx(bin.x0) + 0.5}
              y={sy(bin.h)}
              width={Math.max(0, sx(bin.x1) - sx(bin.x0) - 1)}
              height={Math.max(0, sy(0) - sy(bin.h))}
              fill={HIST}
            />
          ),
        )}

        {view === "density" && discrete &&
          curve.map((p) => (
            <rect
              key={p.x}
              x={sx(p.x) - barW / 2}
              y={sy(p.f)}
              width={barW}
              height={Math.max(0, sy(0) - sy(p.f))}
              rx={Math.min(3, barW / 3)}
              fill={inInterval(p.x) ? CURVE : "var(--muted)"}
              opacity={inInterval(p.x) ? 0.9 : 0.35}
            />
          ))}

        {view === "density" && !discrete && (
          <path d={pathOf(curve.map((p) => ({ x: p.x, y: p.f })))} fill="none" stroke={CURVE} strokeWidth={2.5} strokeLinejoin="round" />
        )}

        {cltCurve && (
          <path d={pathOf(cltCurve.map((p) => ({ x: p.x, y: p.f })))} fill="none" stroke={CLT} strokeWidth={2} strokeDasharray="6 4" />
        )}

        {view === "cdf" && (
          <>
            {discrete ? (
              <path
                d={curve
                  .map((p, i) => {
                    const prevF = i ? curve[i - 1].F : 0;
                    return `${i ? "L" : "M"}${sx(p.x - 0.5)},${sy(prevF)}V${sy(p.F)}H${sx(p.x + 0.5)}`;
                  })
                  .join("")}
                fill="none"
                stroke={CURVE}
                strokeWidth={2.5}
              />
            ) : (
              <path d={pathOf(curve.map((p) => ({ x: p.x, y: p.F })))} fill="none" stroke={CURVE} strokeWidth={2.5} />
            )}
            {[a, b].map((v, i) => {
              const F = cdfAt(math, discrete, discrete ? (i === 0 ? Math.ceil(v) - 1 : v) : v, params);
              return (
                <g key={i}>
                  <line x1={PAD.left} x2={sx(v)} y1={sy(F)} y2={sy(F)} stroke={CURVE} strokeDasharray="3 3" opacity={0.6} />
                  <circle cx={sx(v)} cy={sy(F)} r={4} fill={CURVE} />
                </g>
              );
            })}
            <rect
              x={PAD.left}
              y={sy(cdfAt(math, discrete, b, params))}
              width={6}
              height={Math.max(0, sy(cdfAt(math, discrete, discrete ? Math.ceil(a) - 1 : a, params)) - sy(cdfAt(math, discrete, b, params)))}
              fill={SHADE}
            />
          </>
        )}

        {showMean && (
          <g>
            <line x1={sx(mean)} x2={sx(mean)} y1={PAD.top} y2={sy(0)} stroke="var(--ink)" strokeDasharray="4 4" opacity={0.5} />
            <text x={sx(mean) + 5} y={PAD.top + 12} className="fill-ink font-mono text-[11px]">
              μ
            </text>
          </g>
        )}

        {[a, b].map((v, i) => (
          <line key={i} x1={sx(v)} x2={sx(v)} y1={PAD.top} y2={sy(0)} stroke={CURVE} strokeWidth={1} opacity={0.5} />
        ))}
      </g>

      <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />

      {hovered && (
        <g pointerEvents="none">
          <line x1={sx(hovered.x)} x2={sx(hovered.x)} y1={PAD.top} y2={sy(0)} stroke="var(--ink)" opacity={0.25} />
          <g transform={`translate(${Math.min(sx(hovered.x) + 10, W - 170)},${PAD.top + 4})`}>
            <rect width={160} height={50} rx={8} fill="var(--surface)" stroke="var(--line)" />
            <text x={10} y={18} className="fill-ink font-mono text-[11px]">
              x = {fmt(hovered.x)}
            </text>
            <text x={10} y={34} className="fill-muted font-mono text-[10px]">
              {discrete ? "P(X = x)" : "f(x)"} = {hovered.f.toFixed(4)}
            </text>
            <text x={10} y={46} className="fill-muted font-mono text-[10px]">
              F(x) = {hovered.F.toFixed(4)}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
