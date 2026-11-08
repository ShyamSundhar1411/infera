"use client";

import { useEffect, useRef, useState } from "react";
import { getAlgorithm, getDefaultParams } from "@/lib/data/algorithms.data";
import { generateDataset, getDefaultDatasetConfig } from "@/lib/data/datasets.data";
import { ENGINES } from "@/lib/ml/engines";
import { drawPlot, readPlotTheme } from "@/lib/plot/render";
import { useThemeVersion } from "@/hooks/useThemeVersion";

/** A small, static render of the algorithm on its default dataset. */
export default function MiniPreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const themeVersion = useThemeVersion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !visible) return;
    const meta = getAlgorithm(slug)!;
    const config = { ...getDefaultDatasetConfig(meta.defaultDataset, meta.kind) };
    config.count = Math.min(config.count, 90);
    const points = generateDataset(config, meta.kind);
    const params = { ...getDefaultParams(meta), showResiduals: false, showProjections: false };
    const trainer = ENGINES[slug].create(points, params);
    // Iterative models get a head start so the thumbnail shows a trained result.
    if (meta.iterative) for (let i = 0; i < 400 && !trainer.done(); i++) trainer.step(1);
    const size = canvas.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawPlot(ctx, size, {
      points,
      model: trainer.model(),
      kind: meta.kind,
      params,
      theme: readPlotTheme(),
      resolution: 48,
      compact: true,
    });
  }, [slug, visible, themeVersion]);

  return <canvas ref={ref} className="aspect-square w-full" aria-hidden />;
}
