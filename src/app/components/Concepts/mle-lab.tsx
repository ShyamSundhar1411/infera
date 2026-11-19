"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Coins, Crosshair, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Segmented } from "@/components/ui/segmented";
import { SliderField } from "@/components/ui/slider-field";
import { Tex } from "@/components/ui/tex";
import { CLASS_COLORS, rgb } from "@/lib/constants";
import { createRandom } from "@/lib/ml/random";
import { Stat } from "./coin-flip-lab";

type Model = "normal" | "coin";

const W = 680;
const H = 280;
const PAD = { top: 16, right: 16, bottom: 30, left: 16 };
const X_MIN = 0;
const X_MAX = 10;
const MU_RANGE: [number, number] = [0, 10];
const SIGMA_RANGE: [number, number] = [0.3, 4];
const GRID = 44;
const HEAT = 300;

const CURVE = rgb(CLASS_COLORS[2]);
const POINT = rgb(CLASS_COLORS[0]);
const MLE = rgb(CLASS_COLORS[1]);

const LN_SQRT_2PI = 0.5 * Math.log(2 * Math.PI);
const normalLogPdf = (x: number, mu: number, sigma: number) => -LN_SQRT_2PI - Math.log(sigma) - (x - mu) ** 2 / (2 * sigma * sigma);
const logLik = (xs: number[], mu: number, sigma: number) => xs.reduce((s, x) => s + normalLogPdf(x, mu, sigma), 0);

const sciNotation = (lnValue: number) => {
  const log10 = lnValue / Math.LN10;
  const exp = Math.floor(log10);
  return `${(10 ** (log10 - exp)).toFixed(2)} \\times 10^{${exp}}`;
};

const ease = (t: number) => 1 - (1 - t) ** 3;

/** Slide a model's parameters until the data you saw becomes as likely as possible. */
export default function MleLab() {
  const [model, setModel] = useState<Model>("normal");
  const [data, setData] = useState(() => {
    const r = createRandom(13);
    return Array.from({ length: 12 }, () => 5.5 + 1.4 * r.gaussian());
  });
  const [mu, setMu] = useState(3);
  const [sigma, setSigma] = useState(2.5);
  const [flips, setFlips] = useState<number[]>(() => {
    const r = createRandom(19);
    return Array.from({ length: 10 }, () => (r.next() < 0.7 ? 1 : 0));
  });
  const [p, setP] = useState(0.3);
  const rand = useRef(createRandom(37));
  const coinBias = useRef(0.7);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const n = data.length;
  const muHat = data.reduce((s, x) => s + x, 0) / n;
  const sigmaHat = Math.max(SIGMA_RANGE[0], Math.sqrt(data.reduce((s, x) => s + (x - muHat) ** 2, 0) / n));
  const ll = logLik(data, mu, sigma);
  const llMax = logLik(data, muHat, sigmaHat);

  const heads = flips.reduce((s, f) => s + f, 0);
  const tails = flips.length - heads;
  const pHat = heads / flips.length;
  const coinLogLik = (q: number) => heads * Math.log(Math.max(q, 1e-12)) + tails * Math.log(Math.max(1 - q, 1e-12));

  /** Animate parameters to their best values. */
  const animate = (from: number[], to: number[], set: (v: number[]) => void) => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return set(to);
    const start = performance.now();
    const step = (t: number) => {
      const k = ease(Math.min(1, Math.max(0, (t - start) / 700)));
      set(from.map((f, i) => f + (to[i] - f) * k));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const jump = () =>
    model === "normal"
      ? animate([mu, sigma], [muHat, sigmaHat], ([m, s]) => {
          setMu(m);
          setSigma(s);
        })
      : animate([p], [pHat], ([q]) => setP(q));

  const newData = () => {
    const center = 2.5 + rand.current.next() * 5;
    const spread = 0.6 + rand.current.next() * 1.8;
    setData(Array.from({ length: 12 }, () => center + spread * rand.current.gaussian()));
  };
  const newCoin = () => {
    coinBias.current = 0.15 + rand.current.next() * 0.7;
    setFlips(Array.from({ length: 10 }, () => (rand.current.next() < coinBias.current ? 1 : 0)));
  };
  const flipMore = () => setFlips((f) => [...f, ...Array.from({ length: 10 }, () => (rand.current.next() < coinBias.current ? 1 : 0))]);

  // Log-likelihood surface over (mu, sigma), coloured relative to its peak.
  const heat = useMemo(() => {
    const cells: { i: number; j: number; t: number }[] = [];
    let best = -Infinity;
    const vals: number[][] = [];
    for (let i = 0; i < GRID; i++) {
      vals.push([]);
      for (let j = 0; j < GRID; j++) {
        const m = MU_RANGE[0] + ((i + 0.5) / GRID) * (MU_RANGE[1] - MU_RANGE[0]);
        const s = SIGMA_RANGE[0] + ((j + 0.5) / GRID) * (SIGMA_RANGE[1] - SIGMA_RANGE[0]);
        const v = logLik(data, m, s);
        vals[i].push(v);
        best = Math.max(best, v);
      }
    }
    for (let i = 0; i < GRID; i++) for (let j = 0; j < GRID; j++) cells.push({ i, j, t: Math.max(0, 1 + (vals[i][j] - best) / 25) });
    return cells;
  }, [data]);

  const sx = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PAD.left - PAD.right);
  const pdfMax = 1 / (Math.sqrt(2 * Math.PI) * SIGMA_RANGE[0]);
  const yTop = Math.min(pdfMax, 0.75);
  const sy = (y: number) => H - PAD.bottom - (Math.min(y, yTop) / yTop) * (H - PAD.top - PAD.bottom);
  const curve = Array.from({ length: 201 }, (_, i) => {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / 200;
    return `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(Math.exp(normalLogPdf(x, mu, sigma))).toFixed(1)}`;
  }).join("");

  const hx = (m: number) => ((m - MU_RANGE[0]) / (MU_RANGE[1] - MU_RANGE[0])) * HEAT;
  const hy = (s: number) => HEAT - ((s - SIGMA_RANGE[0]) / (SIGMA_RANGE[1] - SIGMA_RANGE[0])) * HEAT;
  const cell = HEAT / GRID;
  const pickFromHeat = (e: React.MouseEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - box.left) / box.width;
    const fy = 1 - (e.clientY - box.top) / box.height;
    cancelAnimationFrame(raf.current);
    setMu(MU_RANGE[0] + fx * (MU_RANGE[1] - MU_RANGE[0]));
    setSigma(SIGMA_RANGE[0] + fy * (SIGMA_RANGE[1] - SIGMA_RANGE[0]));
  };

  const coinCurve = Array.from({ length: 201 }, (_, i) => {
    const q = i / 200;
    const rel = Math.exp(coinLogLik(q) - coinLogLik(pHat));
    return `${i ? "L" : "M"}${(PAD.left + q * (W - PAD.left - PAD.right)).toFixed(1)},${(H - PAD.bottom - rel * (H - PAD.top - PAD.bottom - 10)).toFixed(1)}`;
  }).join("");
  const qx = (q: number) => PAD.left + q * (W - PAD.left - PAD.right);
  const qy = (q: number) => H - PAD.bottom - Math.exp(coinLogLik(q) - coinLogLik(pHat)) * (H - PAD.top - PAD.bottom - 10);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        {model === "normal" ? (
          <>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="mb-2 px-1 text-[11px] text-muted">
                Each stick is how likely the curve says that data point is. The likelihood multiplies all {n} sticks together.
              </p>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Data points under a normal curve">
                {data.map((x, i) => {
                  const h = Math.exp(normalLogPdf(x, mu, sigma));
                  return <line key={`s${i}`} x1={sx(x)} x2={sx(x)} y1={sy(0)} y2={sy(h)} stroke={POINT} strokeWidth={2} opacity={0.55} />;
                })}
                <path d={curve} fill="none" stroke={CURVE} strokeWidth={2.5} />
                <line x1={PAD.left} x2={W - PAD.right} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" opacity={0.6} />
                {data.map((x, i) => (
                  <circle key={i} cx={sx(x)} cy={sy(0)} r={5.5} fill={POINT} stroke="var(--surface)" strokeWidth={1.5} />
                ))}
                {Array.from({ length: 11 }, (_, t) => (
                  <text key={t} x={sx(t)} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                    {t}
                  </text>
                ))}
              </svg>
            </div>

            <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <p className="mb-2 text-[11px] text-muted">Log-likelihood over every (μ, σ). Click to move there.</p>
                <svg viewBox={`0 0 ${HEAT} ${HEAT}`} className="w-full max-w-[300px] cursor-crosshair rounded-lg" onClick={pickFromHeat} role="img" aria-label="Log-likelihood surface">
                  {heat.map(({ i, j, t }) => (
                    <rect key={`${i}-${j}`} x={i * cell} y={HEAT - (j + 1) * cell} width={cell} height={cell} fill={CURVE} opacity={0.04 + 0.86 * t ** 2} shapeRendering="crispEdges" />
                  ))}
                  <circle cx={hx(muHat)} cy={hy(sigmaHat)} r={6} fill="none" stroke={MLE} strokeWidth={2.5} />
                  <circle cx={hx(mu)} cy={hy(sigma)} r={5} fill={POINT} stroke="var(--surface)" strokeWidth={2} />
                </svg>
                <p className="mt-1 flex justify-between font-mono text-[10px] text-muted">
                  <span>μ →</span>
                  <span>σ ↑</span>
                </p>
              </div>
              <div className="space-y-2 overflow-x-auto rounded-2xl border border-line bg-surface p-5 text-[15px]">
                <p className="text-xs text-muted">With your curve</p>
                <Tex display>{String.raw`L(\mu, \sigma) = \prod_{i=1}^{${n}} f(x_i) = ${sciNotation(ll)}`}</Tex>
                <Tex display>{String.raw`\log L = ${ll.toFixed(2)} \quad (\text{best } ${llMax.toFixed(2)})`}</Tex>
                <p className="text-xs text-muted">
                  The best curve sits at the sample mean and the spread around it: <span className="font-mono">μ̂ = {muHat.toFixed(2)}</span>,{" "}
                  <span className="font-mono">σ̂ = {sigmaHat.toFixed(2)}</span>.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex flex-wrap gap-1" aria-label="Coin flips">
                {flips.map((f, i) => (
                  <span
                    key={i}
                    className="anim-pop-in grid size-6 place-items-center rounded-full font-mono text-[10px]"
                    style={{ background: f ? "rgba(108,117,240,0.2)" : "var(--surface-2)", color: f ? CURVE : "var(--muted)" }}
                  >
                    {f ? "H" : "T"}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted">
                {heads} heads and {tails} tails. The curve below is how likely exactly this run is for every possible bias p, scaled so its peak is 1.
              </p>
              <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="Likelihood of the flips as a function of p">
                <path d={coinCurve} fill="none" stroke={CURVE} strokeWidth={2.5} />
                <line x1={qx(pHat)} x2={qx(pHat)} y1={PAD.top} y2={H - PAD.bottom} stroke={MLE} strokeWidth={1.5} strokeDasharray="4 4" />
                <line x1={qx(p)} x2={qx(p)} y1={qy(p)} y2={H - PAD.bottom} stroke={POINT} strokeWidth={2} />
                <circle cx={qx(p)} cy={qy(p)} r={6} fill={POINT} stroke="var(--surface)" strokeWidth={2} />
                <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="var(--muted)" opacity={0.6} />
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <text key={t} x={qx(t)} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                    {t}
                  </text>
                ))}
              </svg>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-5 text-[15px]">
              <Tex display>{String.raw`L(p) = p^{${heads}} (1 - p)^{${tails}} = ${sciNotation(coinLogLik(p))}`}</Tex>
              <Tex display>{String.raw`\hat{p} = \frac{h}{n} = \frac{${heads}}{${flips.length}} = ${pHat.toFixed(3)}`}</Tex>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {model === "normal" ? (
            <>
              <Stat label="Your log-likelihood" value={ll.toFixed(2)} />
              <Stat label="Best possible" value={llMax.toFixed(2)} />
              <Stat label="Your curve vs best" value={`${Math.exp(ll - llMax) < 1e-3 ? Math.exp(ll - llMax).toExponential(1) : (Math.exp(ll - llMax) * 100).toFixed(1) + "%"} as likely`} />
              <Stat label="Data points" value={String(n)} />
            </>
          ) : (
            <>
              <Stat label="Your p" value={p.toFixed(3)} />
              <Stat label="Maximum likelihood p" value={pHat.toFixed(3)} />
              <Stat label="Log-likelihood" value={coinLogLik(p).toFixed(2)} />
              <Stat label="Flips" value={String(flips.length)} />
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Panel title="Model">
          <Segmented
            value={model}
            onChange={(m) => {
              cancelAnimationFrame(raf.current);
              setModel(m);
            }}
            options={[
              { value: "normal", label: "Normal curve" },
              { value: "coin", label: "Coin flips" },
            ]}
          />
        </Panel>
        <Panel title="Fit by hand">
          <div className="space-y-5">
            {model === "normal" ? (
              <>
                <SliderField
                  label="μ (centre)"
                  value={mu}
                  min={MU_RANGE[0]}
                  max={MU_RANGE[1]}
                  step={0.01}
                  format={(v) => v.toFixed(2)}
                  onChange={(v) => {
                    cancelAnimationFrame(raf.current);
                    setMu(v);
                  }}
                />
                <SliderField
                  label="σ (spread)"
                  value={sigma}
                  min={SIGMA_RANGE[0]}
                  max={SIGMA_RANGE[1]}
                  step={0.01}
                  format={(v) => v.toFixed(2)}
                  onChange={(v) => {
                    cancelAnimationFrame(raf.current);
                    setSigma(v);
                  }}
                  hint="Too narrow and far points get almost no likelihood. Too wide and every point gets a little."
                />
              </>
            ) : (
              <SliderField
                label="p (chance of heads)"
                value={p}
                min={0.01}
                max={0.99}
                step={0.01}
                format={(v) => v.toFixed(2)}
                onChange={(v) => {
                  cancelAnimationFrame(raf.current);
                  setP(v);
                }}
              />
            )}
            <Button className="w-full" variant="accent" onClick={jump}>
              <Crosshair className="size-4" /> Jump to the MLE
            </Button>
          </div>
        </Panel>
        <Panel title="Data">
          {model === "normal" ? (
            <Button className="w-full" size="sm" onClick={newData}>
              <Sparkles className="size-3.5" /> New data
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={flipMore}>
                <Coins className="size-3.5" /> Flip 10 more
              </Button>
              <Button size="sm" onClick={newCoin}>
                New coin
              </Button>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
