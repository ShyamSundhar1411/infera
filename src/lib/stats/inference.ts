import { betaI, erf, lnChoose } from "./special";
import type { Random } from "../ml/random";

// Small helpers for tests and intervals: normal and t tail areas and
// quantiles, an exact binomial test, and a fast binomial sampler.

/** Standard normal CDF. */
export const normCdf = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

/** Inverse of the standard normal CDF, by bisection (plenty fast for a UI). */
export const normQuantile = (p: number) => {
  let lo = -10;
  let hi = 10;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (normCdf(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

/** Student's t CDF with nu degrees of freedom. */
export const tCdf = (t: number, nu: number) => {
  const tail = 0.5 * betaI(nu / 2, 0.5, nu / (nu + t * t));
  return t >= 0 ? 1 - tail : tail;
};

/** Inverse of the t CDF, by bisection. */
export const tQuantile = (p: number, nu: number) => {
  let lo = -1000;
  let hi = 1000;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (tCdf(mid, nu) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

export const binomialPmf = (k: number, n: number, p: number) =>
  k < 0 || k > n ? 0 : Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));

/** Exact two-sided binomial test: add up every outcome no more likely than the one seen. */
export const binomialTestP = (k: number, n: number, p0 = 0.5) => {
  const seen = binomialPmf(k, n, p0);
  let total = 0;
  for (let j = 0; j <= n; j++) {
    const pj = binomialPmf(j, n, p0);
    if (pj <= seen * (1 + 1e-7)) total += pj;
  }
  return Math.min(1, total);
};

/** Two-proportion z test with a pooled standard error. Returns z and the two-sided p-value. */
export const twoProportionTest = (convA: number, nA: number, convB: number, nB: number) => {
  if (!nA || !nB) return { z: 0, p: 1 };
  const pooled = (convA + convB) / (nA + nB);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
  if (se === 0) return { z: 0, p: 1 };
  const z = (convB / nB - convA / nA) / se;
  return { z, p: 2 * (1 - normCdf(Math.abs(z))) };
};

/** Binomial(n, p) draw: exact for small counts, a rounded normal for large ones. */
export const sampleBinomial = (n: number, p: number, r: Random) => {
  const v = n * p * (1 - p);
  if (v > 25) return Math.max(0, Math.min(n, Math.round(n * p + Math.sqrt(v) * r.gaussian())));
  let k = 0;
  for (let i = 0; i < n; i++) if (r.next() < p) k++;
  return k;
};
