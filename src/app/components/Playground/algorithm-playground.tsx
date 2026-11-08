"use client";

import { getAlgorithm } from "@/lib/data/algorithms.data";
import { usePlayground } from "@/hooks/usePlayground";
import { useTrainer } from "@/hooks/useTrainer";
import CanvasToolbar from "./canvas-toolbar";
import DataPanel from "./data-panel";
import DendrogramView from "./dendrogram-view";
import ModelPanel from "./model-panel";
import PlotCanvas from "./plot-canvas";
import StatsStrip from "./stats-strip";
import TrainingBar from "./training-bar";
import TreeDiagram from "./tree-diagram";

/**
 * The full interactive playground. Takes a slug rather than the algorithm
 * itself because parameter definitions hold functions that can't cross the
 * server/client boundary.
 */
export default function AlgorithmPlayground({ slug }: { slug: string }) {
  const meta = getAlgorithm(slug)!;
  const playground = usePlayground(meta);
  const training = useTrainer(slug, playground.points, playground.params);
  const { model } = training;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-3">
        <CanvasToolbar
          meta={meta}
          activeClass={playground.activeClass}
          onClassChange={playground.setActiveClass}
          tool={playground.tool}
          onToolChange={playground.setTool}
        />
        <PlotCanvas
          points={playground.points}
          model={model}
          kind={meta.kind}
          params={playground.params}
          version={training.tick}
          tool={playground.tool}
          onAdd={playground.addPoint}
          onRemove={playground.removePoint}
          onMove={playground.movePoint}
        />
        {meta.iterative && (
          <TrainingBar
            playing={training.playing}
            done={training.done}
            onToggle={training.togglePlaying}
            onStep={training.step}
            onReset={training.reset}
          />
        )}
        <StatsStrip stats={training.stats} />
        {model.tree && <TreeDiagram tree={model.tree} regression={meta.kind === "regression"} />}
        {model.dendrogram && model.assignments && (
          <DendrogramView
            dendrogram={model.dendrogram}
            assignments={model.assignments}
            onCut={(k) => playground.setParam("k", k)}
          />
        )}
      </div>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <ModelPanel
          meta={meta}
          values={playground.params}
          onChange={playground.setParam}
          onReset={playground.resetParams}
        />
        <DataPanel
          meta={meta}
          config={playground.config}
          onChange={playground.updateConfig}
          onRegenerate={playground.regenerate}
          onClear={playground.clear}
        />
      </aside>
    </div>
  );
}
