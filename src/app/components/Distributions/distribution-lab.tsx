"use client";

import { Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import { getDistribution } from "@/lib/data/distributions.data";
import { useDistributionLab } from "@/hooks/useDistributionLab";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import DistributionChart from "./distribution-chart";

const show = (v: number, digits = 3) =>
  Number.isNaN(v) ? "undefined" : !Number.isFinite(v) ? "∞" : v.toFixed(digits);

export default function DistributionLab({ slug }: { slug: string }) {
  const mounted = useMounted();
  if (!mounted)
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="aspect-[680/380] animate-pulse rounded-2xl border border-line bg-surface" />
        <div className="h-96 animate-pulse rounded-2xl border border-line bg-surface" />
      </div>
    );
  return <Lab slug={slug} />;
}

function Lab({ slug }: { slug: string }) {
  const meta = getDistribution(slug)!;
  const lab = useDistributionLab(meta);
  const [lo, hi] = lab.range;
  const intervalStep = lab.discrete ? 1 : Math.max((hi - lo) / 200, 0.001);
  const [a, b] = lab.interval;

  const stats = [
    { label: "E[X]", theory: lab.mean, sample: lab.sampleStats?.mean },
    { label: "Var(X)", theory: lab.variance, sample: lab.sampleStats?.variance },
    { label: "σ", theory: lab.sd, sample: lab.sampleStats ? Math.sqrt(lab.sampleStats.variance) : undefined },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3 px-1">
            <Segmented
              size="sm"
              value={lab.view}
              onChange={lab.setView}
              options={[
                { value: "density", label: lab.discrete ? "PMF" : "PDF" },
                { value: "cdf", label: "CDF" },
              ]}
            />
            <Legend discrete={lab.discrete} means={lab.mode === "means"} />
          </div>
          <DistributionChart
            math={lab.math}
            discrete={lab.discrete}
            params={lab.params}
            range={lab.range}
            mean={lab.mean}
            sd={lab.sd}
            view={lab.view}
            interval={lab.interval}
            samples={lab.samples}
            mode={lab.mode}
            sampleSize={lab.sampleSize}
          />
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <div className="bg-surface px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted">
              P({show(a, lab.discrete ? 0 : 2)} ≤ X ≤ {show(b, lab.discrete ? 0 : 2)})
            </p>
            <p className="mt-1 font-mono text-lg tabular-nums">{lab.intervalProbability.toFixed(4)}</p>
          </div>
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.1em] text-muted">{s.label}</p>
              <p className="mt-1 font-mono text-lg tabular-nums">{show(s.theory)}</p>
              <p className="font-mono text-[11px] text-muted">
                {s.sample === undefined
                  ? "no samples yet"
                  : `${lab.mode === "means" ? "means" : "sample"}: ${show(s.sample)}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Panel
          title="Parameters"
          action={
            <Button size="sm" variant="ghost" onClick={lab.resetParams}>
              <RotateCcw className="size-3.5" /> Defaults
            </Button>
          }
        >
          <div className="space-y-5">
            {meta.params.map((p) => (
              <SliderField
                key={p.key}
                label={
                  <>
                    {p.label} <span className="font-mono text-muted">({p.symbol})</span>
                  </>
                }
                value={lab.params[p.key]}
                min={p.min}
                max={p.max}
                step={p.step}
                format={(v) => (p.step >= 1 ? String(v) : v.toFixed(2))}
                onChange={(v) => lab.setParam(p.key, v)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Interval">
          <div className="space-y-5">
            <SliderField
              label="From (a)"
              value={a}
              min={lo}
              max={hi}
              step={intervalStep}
              format={(v) => v.toFixed(lab.discrete ? 0 : 2)}
              onChange={(v) => lab.setInterval(0, v)}
            />
            <SliderField
              label="To (b)"
              value={b}
              min={lo}
              max={hi}
              step={intervalStep}
              format={(v) => v.toFixed(lab.discrete ? 0 : 2)}
              onChange={(v) => lab.setInterval(1, v)}
            />
          </div>
        </Panel>

        <Panel
          title="Sampler"
          action={
            <Button size="sm" variant="ghost" onClick={lab.clear} disabled={!lab.samples.length}>
              <Trash2 className="size-3.5" /> Clear
            </Button>
          }
        >
          <div className="space-y-4">
            <Segmented
              size="sm"
              className="flex w-full [&>button]:flex-1"
              value={lab.mode}
              onChange={lab.setMode}
              options={[
                { value: "draws", label: "Single draws" },
                { value: "means", label: "Sample means" },
              ]}
            />
            {lab.mode === "means" && (
              <SliderField
                label="Draws per mean (n)"
                value={lab.sampleSize}
                min={1}
                max={50}
                step={1}
                onChange={lab.setSampleSize}
                hint="Each histogram entry is the average of n draws. Watch it turn into a bell curve as n grows."
              />
            )}
            <div className="grid grid-cols-3 gap-2">
              {[1, 100, 1000].map((n) => (
                <Button key={n} size="sm" onClick={() => lab.draw(n)} disabled={lab.full}>
                  Draw {n}
                </Button>
              ))}
            </div>
            <Button
              className="w-full"
              variant={lab.streaming ? "outline" : "accent"}
              onClick={lab.toggleStreaming}
              disabled={lab.full}
            >
              {lab.streaming ? <Pause className="size-4" /> : <Play className="size-4" />}
              {lab.streaming ? "Stop streaming" : "Stream samples"}
            </Button>
            <p className="font-mono text-xs text-muted">
              {lab.samples.length.toLocaleString()} {lab.mode === "means" ? "means" : "samples"} drawn
              {lab.full && " (limit reached)"}
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Legend({ discrete, means }: { discrete: boolean; means: boolean }) {
  const item = (color: string, label: string, dashed = false) => (
    <span className="flex items-center gap-1.5">
      <span
        className="h-0.5 w-4 rounded"
        style={dashed ? { borderTop: `2px dashed ${color}` } : { background: color }}
      />
      {label}
    </span>
  );
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
      {item("rgb(108,117,240)", discrete ? "PMF" : "Density")}
      {item("rgb(240,101,84)", means ? "Sample means" : "Samples")}
      {means && item("rgb(38,166,154)", "CLT prediction", true)}
    </div>
  );
}
