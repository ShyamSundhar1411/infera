import type { DistributionMeta } from "@/lib/types/domain/distribution.types";
import { getDefaultDistParams } from "@/lib/data/distributions.data";
import { DISTRIBUTION_MATH } from "@/lib/stats/distributions";

const W = 240;
const H = 120;
const PAD = 12;

/** Static thumbnail of a distribution at its default parameters. */
export default function MiniCurve({ distribution }: { distribution: DistributionMeta }) {
  const math = DISTRIBUTION_MATH[distribution.slug];
  const params = getDefaultDistParams(distribution);
  const [lo, hi] = math.range(params);
  const discrete = distribution.type === "discrete";

  const pts = discrete
    ? Array.from({ length: hi - lo + 1 }, (_, i) => ({ x: lo + i, y: math.density(lo + i, params) }))
    : Array.from({ length: 121 }, (_, i) => {
        const x = lo + ((hi - lo) * i) / 120;
        return { x, y: math.density(x, params) };
      });
  const yMax = Math.max(...pts.map((p) => p.y).filter(Number.isFinite)) * 1.1 || 1;
  const xLo = discrete ? lo - 0.5 : lo;
  const xHi = discrete ? hi + 0.5 : hi;
  const sx = (x: number) => PAD + ((x - xLo) / (xHi - xLo)) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - (Math.min(y, yMax) / yMax) * (H - 2 * PAD);
  const barW = discrete ? Math.max(2, ((W - 2 * PAD) / pts.length) * 0.6) : 0;
  const line = pts.map((p, i) => `${i ? "L" : "M"}${sx(p.x)},${sy(p.y)}`).join("");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="var(--line)" />
      {discrete ? (
        pts.map((p) => (
          <rect
            key={p.x}
            x={sx(p.x) - barW / 2}
            y={sy(p.y)}
            width={barW}
            height={H - PAD - sy(p.y)}
            rx={1.5}
            fill="rgb(108,117,240)"
            opacity={0.85}
          />
        ))
      ) : (
        <>
          <path d={`${line}L${sx(hi)},${H - PAD}L${sx(lo)},${H - PAD}Z`} fill="rgba(108,117,240,0.18)" />
          <path d={line} fill="none" stroke="rgb(108,117,240)" strokeWidth={2} />
        </>
      )}
    </svg>
  );
}
