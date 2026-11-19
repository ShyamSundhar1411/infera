import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CLASS_COLORS, SITE_URL } from "@/lib/constants";
import { getAlgorithm, getDefaultParams } from "@/lib/data/algorithms.data";
import { generateDataset, getDefaultDatasetConfig } from "@/lib/data/datasets.data";
import { getDefaultDistParams, getDistribution } from "@/lib/data/distributions.data";
import { ENGINES } from "@/lib/ml/engines";
import { createRandom } from "@/lib/ml/random";
import { DISTRIBUTION_MATH } from "@/lib/stats/distributions";
import { LogoMark } from "@/app/components/Layout/logo";
import ConceptThumb from "@/app/components/Concepts/concept-thumb";

// Link preview images, rendered once at build time. Each one shows the page's
// title beside a picture drawn from the same code as the page itself: the
// trained model, the density, or a sketch of the simulation.

export const OG_SIZE = { width: 1200, height: 630 };

const BG = "#0d0e11";
const PANEL = "#15171c";
const LINE = "#2a2d35";
const INK = "#ecebe6";
const MUTED = "#9a9890";
const ACCENT = "#c8f169";
const V = 440;

const color = (i: number, alpha = 1) => {
  const [r, g, b] = CLASS_COLORS[((i % CLASS_COLORS.length) + CLASS_COLORS.length) % CLASS_COLORS.length];
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "src/assets/fonts", file));

/** World [-1, 1] to the visual's pixels, y up. */
const px = (v: number) => ((v + 1) / 2) * V;
const py = (v: number) => V - ((v + 1) / 2) * V;

function AlgorithmVisual({ slug }: { slug: string }) {
  const meta = getAlgorithm(slug)!;
  const config = { ...getDefaultDatasetConfig(meta.defaultDataset, meta.kind), count: 90 };
  const points = generateDataset(config, meta.kind);
  const params = { ...getDefaultParams(meta), showResiduals: false, showProjections: false };
  const trainer = ENGINES[slug].create(points, params);
  if (meta.iterative) for (let i = 0; i < 400 && !trainer.done(); i++) trainer.step(1);
  const model = trainer.model();

  const cells: React.ReactNode[] = [];
  // 22 divides 440 exactly, so cells meet edge to edge without overlapping (overlap darkens the seams).
  const RES = 22;
  const cell = V / RES;
  if (model.proba || model.decision) {
    for (let i = 0; i < RES; i++) {
      for (let j = 0; j < RES; j++) {
        const x = -1 + ((i + 0.5) * 2) / RES;
        const y = 1 - ((j + 0.5) * 2) / RES;
        let label: number;
        let confidence: number;
        if (model.proba) {
          const p = model.proba(x, y);
          label = p.indexOf(Math.max(...p));
          confidence = Math.max(...p);
        } else {
          const d = model.decision!(x, y);
          label = d >= 0 ? 1 : 0;
          confidence = Math.min(1, 0.5 + Math.abs(d) / 2);
        }
        cells.push(
          <rect key={`${i}-${j}`} x={i * cell} y={j * cell} width={cell} height={cell} shapeRendering="crispEdges" fill={color(label, 0.12 + 0.4 * (confidence - 0.5))} />,
        );
      }
    }
  }
  let curve = "";
  if (model.predict) {
    curve = Array.from({ length: 81 }, (_, i) => {
      const x = -1 + (i * 2) / 80;
      const y = Math.max(-1.2, Math.min(1.2, model.predict!(x)));
      return `${i ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)}`;
    }).join("");
  }
  const labelOf = (i: number) => model.assignments?.[i] ?? points[i].label;

  return (
    <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
      {cells}
      {curve && <path d={curve} fill="none" stroke={ACCENT} strokeWidth={4} />}
      {points.map((p, i) => (
        <circle key={i} cx={px(p.x)} cy={py(p.y)} r={6} fill={labelOf(i) < 0 ? "#888" : color(meta.kind === "regression" ? 5 : labelOf(i))} stroke={BG} strokeWidth={1.5} />
      ))}
    </svg>
  );
}

function DistributionVisual({ slug }: { slug: string }) {
  const meta = getDistribution(slug)!;
  const math = DISTRIBUTION_MATH[slug];
  const params = getDefaultDistParams(meta);
  const [lo, hi] = math.range(params);
  const discrete = meta.type === "discrete";
  const pad = 30;
  const pts = discrete
    ? Array.from({ length: hi - lo + 1 }, (_, i) => ({ x: lo + i, y: math.density(lo + i, params) }))
    : Array.from({ length: 161 }, (_, i) => {
        const x = lo + ((hi - lo) * i) / 160;
        return { x, y: math.density(x, params) };
      });
  const yMax = Math.max(...pts.map((p) => p.y).filter(Number.isFinite)) * 1.1 || 1;
  const xLo = discrete ? lo - 0.5 : lo;
  const xHi = discrete ? hi + 0.5 : hi;
  const sx = (x: number) => pad + ((x - xLo) / (xHi - xLo)) * (V - 2 * pad);
  const sy = (y: number) => V - pad - (Math.min(y, yMax) / yMax) * (V - 2 * pad);
  const barW = Math.max(4, ((V - 2 * pad) / pts.length) * 0.62);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join("");
  return (
    <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
      <line x1={pad} x2={V - pad} y1={V - pad} y2={V - pad} stroke={MUTED} strokeWidth={2} />
      {discrete ? (
        pts.map((p) => <rect key={p.x} x={sx(p.x) - barW / 2} y={sy(p.y)} width={barW} height={V - pad - sy(p.y)} rx={3} fill={color(2, 0.85)} />)
      ) : (
        <>
          <path d={`${line}L${sx(hi)},${V - pad}L${sx(lo)},${V - pad}Z`} fill={color(2, 0.25)} />
          <path d={line} fill="none" stroke={color(2)} strokeWidth={5} />
        </>
      )}
    </svg>
  );
}

const normal = (x: number, m: number, s: number) => Math.exp(-0.5 * ((x - m) / s) ** 2);

function ConceptVisual({ slug }: { slug: string }) {
  const r = createRandom(11);
  if (slug === "monte-carlo") {
    const darts = Array.from({ length: 700 }, () => [r.next(), r.next()]);
    return (
      <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
        {darts.map(([x, y], i) => (
          <circle key={i} cx={x * V} cy={V - y * V} r={3.5} fill={x * x + y * y <= 1 ? color(1, 0.9) : color(0, 0.9)} />
        ))}
        <path d={`M0,0 A${V},${V} 0 0 1 ${V},${V}`} fill="none" stroke={INK} strokeWidth={3} />
      </svg>
    );
  }
  if (slug === "mcmc") {
    let x = -0.8;
    let y = 0.8;
    const target = (a: number, b: number) => normal(a, -0.4, 0.3) * normal(b, 0.3, 0.3) + normal(a, 0.45, 0.25) * normal(b, -0.35, 0.25);
    const walk = [[x, y]];
    for (let i = 0; i < 260; i++) {
      const nx = x + r.gaussian() * 0.18;
      const ny = y + r.gaussian() * 0.18;
      if (r.next() < target(nx, ny) / Math.max(target(x, y), 1e-12)) [x, y] = [nx, ny];
      walk.push([x, y]);
    }
    return (
      <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
        {[0.9, 0.6, 0.3].map((k, i) => (
          <g key={k}>
            <ellipse cx={px(-0.4)} cy={py(0.3)} rx={66 * (i + 1)} ry={66 * (i + 1)} fill={color(2, 0.12)} />
            <ellipse cx={px(0.45)} cy={py(-0.35)} rx={55 * (i + 1)} ry={55 * (i + 1)} fill={color(2, 0.12)} />
          </g>
        ))}
        <path d={walk.map(([a, b], i) => `${i ? "L" : "M"}${px(a).toFixed(1)},${py(b).toFixed(1)}`).join("")} fill="none" stroke={color(1, 0.9)} strokeWidth={2.5} />
        {walk.map(([a, b], i) => (
          <circle key={i} cx={px(a)} cy={py(b)} r={3.5} fill={color(3)} />
        ))}
      </svg>
    );
  }
  if (slug === "law-of-large-numbers") {
    const paths = Array.from({ length: 6 }, () => {
      let sum = 0;
      return Array.from({ length: 200 }, (_, i) => {
        sum += 1 + r.int(6);
        const avg = sum / (i + 1);
        return `${i ? "L" : "M"}${((Math.log(i + 1) / Math.log(200)) * (V - 20) + 10).toFixed(1)},${(V - ((avg - 1) / 5) * V).toFixed(1)}`;
      }).join("");
    });
    return (
      <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
        <line x1={0} x2={V} y1={V / 2} y2={V / 2} stroke={color(0)} strokeWidth={3} strokeDasharray="10 8" />
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={color(i, 0.85)} strokeWidth={3} />
        ))}
      </svg>
    );
  }
  if (slug === "bayes-theorem") {
    const sick = new Set([3, 47, 88]);
    const alarms = new Set([12, 25, 31, 58, 64, 77, 91, 3, 47]);
    return (
      <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
        {Array.from({ length: 100 }, (_, i) => (
          <rect key={i} x={(i % 10) * 44 + 4} y={Math.floor(i / 10) * 44 + 4} width={36} height={36} rx={7} fill={sick.has(i) ? color(0) : alarms.has(i) ? color(2) : LINE} />
        ))}
      </svg>
    );
  }
  if (slug === "monty-hall") {
    return (
      <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={20 + i * 140} y={110} width={120} height={180} rx={16} fill={i === 2 ? INK : PANEL} stroke={i === 0 ? color(2) : i === 1 ? color(1) : LINE} strokeWidth={5} />
        ))}
        <path d="M340 175 C340 160 360 155 370 172 C380 155 400 160 400 175 C400 195 370 215 370 222 C370 215 340 195 340 175 Z" fill={color(0)} />
      </svg>
    );
  }
  // Otherwise the card picture from the concepts page, drawn in the preview's dark colours.
  const thumb = ConceptThumb({ slug, width: V, palette: { ink: INK, muted: MUTED, line: LINE, soft: "#1d2027", surface: PANEL, labels: false } });
  if (thumb) return thumb;
  // Default: a sampled histogram settling under its bell curve.
  const bins = Array(22).fill(0);
  for (let i = 0; i < 1500; i++) {
    const z = (r.gaussian() + 3.3) / 6.6;
    if (z >= 0 && z < 1) bins[Math.floor(z * 22)]++;
  }
  const top = Math.max(...bins);
  const bell = Array.from({ length: 121 }, (_, i) => {
    const x = i / 120;
    return `${i ? "L" : "M"}${(x * V).toFixed(1)},${(V - 20 - normal((x - 0.5) * 6.6, 0, 1) * (V - 60)).toFixed(1)}`;
  }).join("");
  return (
    <svg width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
      {bins.map((c, i) => (
        <rect key={i} x={(i * V) / 22 + 2} y={V - 20 - (c / top) * (V - 60)} width={V / 22 - 4} height={(c / top) * (V - 60)} rx={3} fill={color(2, 0.5)} />
      ))}
      <path d={bell} fill="none" stroke={color(0)} strokeWidth={4} />
    </svg>
  );
}

export type OgVisual = { kind: "algorithm" | "distribution" | "concept"; slug: string } | { kind: "home" };

/** A 1200 by 630 link preview: eyebrow, title, one line of text and a picture. */
export function ogImage({ eyebrow, title, tagline, visual }: { eyebrow: string; title: string; tagline: string; visual: OgVisual }) {
  const picture =
    visual.kind === "algorithm" ? (
      <AlgorithmVisual slug={visual.slug} />
    ) : visual.kind === "distribution" ? (
      <DistributionVisual slug={visual.slug} />
    ) : visual.kind === "concept" ? (
      <ConceptVisual slug={visual.slug} />
    ) : (
      <AlgorithmVisual slug="logistic-regression" />
    );
  const blurb = tagline.length > 130 ? `${tagline.slice(0, tagline.lastIndexOf(" ", 127))}…` : tagline;
  const size = title.length > 34 ? 64 : title.length > 22 ? 76 : 92;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: BG, padding: 56, gap: 56, fontFamily: "Inter" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 44, height: 44 }}>
              <LogoMark tile="#1d2027" size={44} />
            </div>
            <div style={{ display: "flex", color: INK, fontSize: 30, fontFamily: "Instrument Serif" }}>Infera</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", color: ACCENT, fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ display: "flex", color: INK, fontSize: size, lineHeight: 1.02, fontFamily: "Instrument Serif", letterSpacing: -1 }}>{title}</div>
            <div style={{ display: "flex", color: MUTED, fontSize: 26, lineHeight: 1.4 }}>{blurb}</div>
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 20 }}>{SITE_URL.replace(/^https?:\/\//, "")}</div>
        </div>
        <div style={{ display: "flex", width: V + 38, height: V + 38, marginTop: 40, borderRadius: 28, background: PANEL, border: `2px solid ${LINE}`, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {picture}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Instrument Serif", data: font("InstrumentSerif-Regular.ttf"), weight: 400, style: "normal" },
        { name: "Inter", data: font("Inter-Medium.ttf"), weight: 500, style: "normal" },
      ],
    },
  );
}
