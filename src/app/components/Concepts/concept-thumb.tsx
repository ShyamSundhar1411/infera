import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";

// Small static pictures for the concept cards, the way algorithms get a
// trained model and distributions get their curve. Each one sketches what the
// concept's lab shows. Colours come from theme tokens, so they suit both modes.

const W = 240;
const H = 120;
const CORAL = rgb(CLASS_COLORS[0]);
const TEAL = rgb(CLASS_COLORS[1]);
const INDIGO = rgb(CLASS_COLORS[2]);
const AMBER = rgb(CLASS_COLORS[3]);

/** Neutral colours. On the site they are theme tokens; link preview images, which cannot read CSS variables, pass fixed ones. */
export interface ThumbPalette {
  ink: string;
  muted: string;
  line: string;
  soft: string;
  surface: string;
  /** Small text labels; the preview renderer has no font for SVG text, so it turns them off. */
  labels: boolean;
}

const THEME: ThumbPalette = { ink: "var(--ink)", muted: "var(--muted)", line: "var(--line)", soft: "var(--surface-2)", surface: "var(--surface)", labels: true };

const bell = (x: number, m = 0, s = 1) => Math.exp(-0.5 * ((x - m) / s) ** 2);
const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
const curve = (f: (t: number) => number, x0 = 14, x1 = W - 14, base = H - 14, height = H - 30, n = 80) =>
  path(Array.from({ length: n + 1 }, (_, i) => [x0 + ((x1 - x0) * i) / n, base - f(i / n) * height]));

function Picture({ slug, c }: { slug: string; c: ThumbPalette }) {
  const r = createRandom(slug.length * 97 + slug.charCodeAt(0));
  switch (slug) {
    case "bayes-theorem": {
      const sick = new Set([23, 61, 118]);
      const alarms = new Set([7, 30, 44, 52, 77, 90, 103, 126, 141, 23, 61]);
      return (
        <>
          {Array.from({ length: 160 }, (_, i) => (
            <rect key={i} x={24 + (i % 20) * 10} y={18 + Math.floor(i / 20) * 11} width={8} height={8} rx={2} fill={sick.has(i) ? CORAL : alarms.has(i) ? INDIGO : c.soft} />
          ))}
        </>
      );
    }
    case "monty-hall":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={50 + i * 50} y={24} width={40} height={60} rx={6} fill={i === 2 ? c.surface : c.soft} stroke={i === 0 ? INDIGO : i === 1 ? TEAL : c.line} strokeWidth={2} />
          ))}
          <path d="M162 46 C162 41 169 39 172 45 C175 39 182 41 182 46 C182 53 172 60 172 63 C172 60 162 53 162 46 Z" fill={CORAL} />
          {c.labels && <text x={70} y={102} textAnchor="middle" fill={c.muted} fontSize={9} fontFamily="monospace">stick</text>}
          {c.labels && <text x={120} y={102} textAnchor="middle" fill={c.muted} fontSize={9} fontFamily="monospace">switch</text>}
        </>
      );
    case "bayesian-updating":
      return (
        <>
          <path d={curve((t) => 0.35 + 0.1 * Math.sin(t * 3))} fill="none" stroke={c.muted} strokeWidth={1.5} strokeDasharray="4 3" />
          <path d={curve((t) => bell(t, 0.68, 0.07))} fill="none" stroke={INDIGO} strokeWidth={2.5} />
          <line x1={14 + 0.7 * (W - 28)} x2={14 + 0.7 * (W - 28)} y1={16} y2={H - 14} stroke={CORAL} strokeDasharray="2 3" />
        </>
      );
    case "law-of-large-numbers": {
      const lines = Array.from({ length: 5 }, () => {
        let sum = 0;
        return path(
          Array.from({ length: 120 }, (_, i) => {
            sum += 1 + r.int(6);
            return [14 + (Math.log(i + 1) / Math.log(120)) * (W - 28), H / 2 - ((sum / (i + 1) - 3.5) / 2.5) * 46];
          }),
        );
      });
      return (
        <>
          <line x1={14} x2={W - 14} y1={H / 2} y2={H / 2} stroke={CORAL} strokeDasharray="5 4" />
          {lines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={rgb(CLASS_COLORS[i % 6], 0.8)} strokeWidth={1.5} />
          ))}
        </>
      );
    }
    case "central-limit-theorem": {
      const bins = Array(18).fill(0);
      for (let i = 0; i < 900; i++) {
        let s = 0;
        for (let j = 0; j < 6; j++) s += r.next();
        bins[Math.min(17, Math.floor((s / 6) * 18))]++;
      }
      const top = Math.max(...bins);
      const bw = (W - 28) / 18;
      return (
        <>
          {bins.map((c, i) => (
            <rect key={i} x={14 + i * bw + 1} y={H - 14 - (c / top) * 86} width={bw - 2} height={(c / top) * 86} rx={2} fill={rgb(CLASS_COLORS[2], 0.45)} />
          ))}
          <path d={curve((t) => bell(t, 0.5, 0.118), 14, W - 14, H - 14, 86)} fill="none" stroke={CORAL} strokeWidth={2} />
        </>
      );
    }
    case "monte-carlo": {
      const S = 96;
      const x0 = (W - S) / 2;
      const y0 = 12;
      return (
        <>
          <rect x={x0} y={y0} width={S} height={S} fill="none" stroke={c.line} />
          {Array.from({ length: 260 }, (_, i) => {
            const a = r.next();
            const b = r.next();
            return <circle key={i} cx={x0 + a * S} cy={y0 + S - b * S} r={1.6} fill={a * a + b * b <= 1 ? TEAL : CORAL} />;
          })}
          <path d={`M${x0},${y0} A${S},${S} 0 0 1 ${x0 + S},${y0 + S}`} fill="none" stroke={c.ink} strokeWidth={1.5} />
        </>
      );
    }
    case "markov-chains": {
      const nodes: [number, number, string][] = [
        [120, 26, AMBER],
        [70, 92, rgb(CLASS_COLORS[5])],
        [170, 92, INDIGO],
      ];
      return (
        <>
          <path d="M108 36 Q80 56 76 80" fill="none" stroke={c.muted} strokeWidth={1.4} />
          <path d="M132 36 Q160 56 164 80" fill="none" stroke={c.muted} strokeWidth={1.4} />
          <path d="M86 98 Q120 112 154 98" fill="none" stroke={c.muted} strokeWidth={1.4} />
          <path d="M86 86 Q120 74 154 86" fill="none" stroke={c.muted} strokeWidth={1.4} />
          {nodes.map(([x, y, color], i) => (
            <circle key={i} cx={x} cy={y} r={13} fill={c.surface} stroke={color} strokeWidth={2.5} />
          ))}
          <circle cx={120} cy={26} r={4} fill={AMBER} />
        </>
      );
    }
    case "mcmc": {
      let x = 40;
      let y = 96;
      const target = (a: number, b: number) => bell(a, 90, 22) * bell(b, 50, 18) + bell(a, 160, 20) * bell(b, 72, 16);
      const walk: [number, number][] = [[x, y]];
      for (let i = 0; i < 220; i++) {
        const nx = x + r.gaussian() * 9;
        const ny = y + r.gaussian() * 9;
        if (r.next() < target(nx, ny) / Math.max(target(x, y), 1e-9)) [x, y] = [nx, ny];
        walk.push([x, y]);
      }
      return (
        <>
          {[1, 2, 3].map((k) => (
            <g key={k}>
              <ellipse cx={90} cy={50} rx={14 * k} ry={11 * k} fill={rgb(CLASS_COLORS[2], 0.1)} />
              <ellipse cx={160} cy={72} rx={13 * k} ry={10 * k} fill={rgb(CLASS_COLORS[2], 0.1)} />
            </g>
          ))}
          <path d={path(walk)} fill="none" stroke={TEAL} strokeWidth={1.2} />
          {walk.filter((_, i) => i % 3 === 0).map(([a, b], i) => (
            <circle key={i} cx={a} cy={b} r={1.8} fill={AMBER} />
          ))}
        </>
      );
    }
    case "hypothesis-testing": {
      const f = (t: number) => bell(t, 0.5, 0.13);
      const x = (t: number) => 14 + t * (W - 28);
      const y = (t: number) => H - 14 - f(t) * 86;
      const tail = (a: number, b: number) =>
        `M${x(a)},${H - 14}` + Array.from({ length: 21 }, (_, i) => `L${x(a + ((b - a) * i) / 20)},${y(a + ((b - a) * i) / 20)}`).join("") + `L${x(b)},${H - 14}Z`;
      return (
        <>
          <path d={tail(0, 0.245)} fill={rgb(CLASS_COLORS[0], 0.35)} />
          <path d={tail(0.755, 1)} fill={rgb(CLASS_COLORS[0], 0.35)} />
          <path d={curve(f, 14, W - 14, H - 14, 86)} fill="none" stroke={c.muted} strokeWidth={2} />
          <line x1={x(0.82)} x2={x(0.82)} y1={18} y2={H - 14} stroke={INDIGO} strokeWidth={2} />
          <line x1={14} x2={W - 14} y1={H - 14} y2={H - 14} stroke={c.line} />
        </>
      );
    }
    case "confidence-intervals": {
      const mid = W / 2;
      return (
        <>
          <line x1={mid} x2={mid} y1={8} y2={H - 8} stroke={CORAL} strokeDasharray="4 3" />
          {Array.from({ length: 12 }, (_, i) => {
            const c = mid + r.gaussian() * 18 + (i === 4 ? 46 : 0);
            const half = 26 + r.next() * 10;
            const covers = c - half <= mid && c + half >= mid;
            return <line key={i} x1={c - half} x2={c + half} y1={12 + i * 8.5} y2={12 + i * 8.5} stroke={covers ? TEAL : CORAL} strokeWidth={3} strokeLinecap="round" />;
          })}
        </>
      );
    }
    case "ab-testing":
      return (
        <>
          {[0, 1].map((g) =>
            Array.from({ length: 48 }, (_, i) => {
              const clicked = r.next() < (g ? 0.22 : 0.1);
              return <circle key={`${g}-${i}`} cx={30 + g * 104 + (i % 8) * 10} cy={22 + Math.floor(i / 8) * 13} r={3.6} fill={clicked ? (g ? AMBER : INDIGO) : c.soft} />;
            }),
          )}
          {c.labels && <text x={64} y={112} textAnchor="middle" fontSize={9} fontFamily="monospace" fill={INDIGO}>A</text>}
          {c.labels && <text x={168} y={112} textAnchor="middle" fontSize={9} fontFamily="monospace" fill={AMBER}>B</text>}
        </>
      );
    case "bootstrap": {
      const sample = Array.from({ length: 12 }, () => r.next());
      return (
        <>
          {sample.map((_, i) => (
            <circle key={i} cx={36 + i * 15} cy={22} r={5} fill={c.muted} opacity={0.6} />
          ))}
          {[0, 1, 2].map((row) => {
            const picks = Array.from({ length: 12 }, () => r.int(12)).sort((a, b) => a - b);
            return picks.map((p, i) => (
              <circle key={`${row}-${i}`} cx={36 + i * 15} cy={50 + row * 22} r={5} fill={picks.filter((q) => q === p).length > 1 ? AMBER : TEAL} />
            ));
          })}
        </>
      );
    }
    case "simpsons-paradox": {
      const groups = [
        [40, 82],
        [100, 62],
        [160, 42],
      ];
      return (
        <>
          {groups.map(([cx, cy], g) => (
            <g key={g}>
              {Array.from({ length: 14 }, (_, i) => {
                const dx = (r.next() - 0.5) * 44;
                return <circle key={i} cx={cx + dx} cy={cy + dx * 0.55 + r.gaussian() * 4 + 6} r={2.6} fill={rgb(CLASS_COLORS[g + 1])} />;
              })}
              <line x1={cx - 24} x2={cx + 24} y1={cy + 6 - 13} y2={cy + 6 + 13} stroke={rgb(CLASS_COLORS[g + 1])} strokeWidth={2} />
            </g>
          ))}
          {/* Within each group the trend falls; pooled together it rises. */}
          <line x1={18} x2={204} y1={100} y2={36} stroke={c.ink} strokeWidth={1.8} strokeDasharray="5 4" />
        </>
      );
    }
    case "regression-to-the-mean":
      return (
        <>
          <line x1={20} x2={220} y1={108} y2={12} stroke={c.line} strokeDasharray="4 3" />
          {Array.from({ length: 70 }, (_, i) => {
            const s = r.gaussian();
            const a = s + r.gaussian() * 0.8;
            const b = s + r.gaussian() * 0.8;
            const top = a > 1.1;
            return <circle key={i} cx={120 + a * 36} cy={60 - b * 20} r={2.6} fill={top ? CORAL : rgb(CLASS_COLORS[2], 0.55)} />;
          })}
          <line x1={20} x2={220} y1={60 + 0.6 * 22 * 2.3} y2={60 - 0.6 * 22 * 2.3} stroke={TEAL} strokeWidth={2} />
        </>
      );
    case "birthday-problem": {
      const p = (n: number) => {
        let q = 1;
        for (let k = 0; k < n; k++) q *= (365 - k) / 365;
        return 1 - q;
      };
      const x = (n: number) => 16 + (n / 70) * (W - 32);
      const y = (v: number) => H - 14 - v * 92;
      return (
        <>
          <line x1={16} x2={W - 16} y1={y(0.5)} y2={y(0.5)} stroke={c.line} strokeDasharray="4 3" />
          <path d={path(Array.from({ length: 71 }, (_, n) => [x(n), y(p(n))]))} fill="none" stroke={INDIGO} strokeWidth={2.5} />
          <circle cx={x(23)} cy={y(p(23))} r={4.5} fill={CORAL} />
          {c.labels && <text x={x(23) + 8} y={y(p(23)) + 12} fontSize={9} fontFamily="monospace" fill={CORAL}>23</text>}
        </>
      );
    }
    case "random-walk": {
      const x = (t: number) => 14 + (t / 120) * (W - 28);
      return (
        <>
          <path d={path(Array.from({ length: 121 }, (_, t) => [x(t), H / 2 - Math.sqrt(t) * 4.8]))} fill="none" stroke={c.line} strokeWidth={1.5} />
          <path d={path(Array.from({ length: 121 }, (_, t) => [x(t), H / 2 + Math.sqrt(t) * 4.8]))} fill="none" stroke={c.line} strokeWidth={1.5} />
          {Array.from({ length: 6 }, (_, k) => {
            let s = 0;
            return (
              <path
                key={k}
                d={path(Array.from({ length: 121 }, (_, t) => {
                  if (t) s += r.next() < 0.5 ? 1 : -1;
                  return [x(t), H / 2 - s * 2.4];
                }))}
                fill="none"
                stroke={rgb(CLASS_COLORS[k % 6], 0.8)}
                strokeWidth={1.4}
              />
            );
          })}
        </>
      );
    }
    case "queues": {
      const x = (rho: number) => 14 + rho * (W - 28);
      const y = (w: number) => H - 14 - Math.min(w, 10) * 9;
      return (
        <>
          <line x1={14} x2={W - 14} y1={H - 14} y2={H - 14} stroke={c.line} />
          <path d={path(Array.from({ length: 96 }, (_, i) => [x(i / 100), y(1 / (1 - i / 100))]))} fill="none" stroke={CORAL} strokeWidth={2.5} />
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={30 + i * 11} cy={30} r={4} fill={INDIGO} />
          ))}
          <rect x={112} y={22} width={20} height={16} rx={4} fill="none" stroke={TEAL} strokeWidth={2} />
        </>
      );
    }
    case "maximum-likelihood": {
      const pts = [62, 84, 96, 104, 112, 118, 126, 138, 150, 176];
      const f = (x: number) => bell(x, 116, 30);
      return (
        <>
          <path d={path(Array.from({ length: 101 }, (_, i) => [14 + i * 2.12, H - 16 - f(14 + i * 2.12) * 84]))} fill="none" stroke={INDIGO} strokeWidth={2.5} />
          {pts.map((p) => (
            <g key={p}>
              <line x1={p} x2={p} y1={H - 16} y2={H - 16 - f(p) * 84} stroke={AMBER} strokeWidth={1.5} />
              <circle cx={p} cy={H - 16} r={3.4} fill={AMBER} />
            </g>
          ))}
        </>
      );
    }
    case "bias-variance": {
      const x = (t: number) => 18 + t * (W - 36);
      const y = (v: number) => H - 14 - v * 88;
      const bias = (t: number) => 0.9 * (1 - t) ** 2.2;
      const variance = (t: number) => 0.9 * t ** 2.4;
      const pts = (f: (t: number) => number) => path(Array.from({ length: 61 }, (_, i) => [x(i / 60), y(f(i / 60))]));
      return (
        <>
          <path d={pts(bias)} fill="none" stroke={TEAL} strokeWidth={1.8} />
          <path d={pts(variance)} fill="none" stroke={AMBER} strokeWidth={1.8} />
          <path d={pts((t) => bias(t) + variance(t) + 0.08)} fill="none" stroke={CORAL} strokeWidth={2.5} />
          <circle cx={x(0.48)} cy={y(bias(0.48) + variance(0.48) + 0.08)} r={4} fill={CORAL} />
        </>
      );
    }
    default:
      return null;
  }
}

/** A concept's card picture, or null when it has none yet. Pass a palette and size for rendering outside the site. */
export default function ConceptThumb({ slug, palette = THEME, width }: { slug: string; palette?: ThumbPalette; width?: number }) {
  const picture = Picture({ slug, c: palette });
  if (!picture) return null;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={width ? (width * H) / W : undefined}
      className={width ? undefined : "h-full w-full overflow-hidden"}
      aria-hidden
    >
      {picture}
    </svg>
  );
}
