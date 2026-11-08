import type { DistParamValues } from "../types/domain/distribution.types";
import type { Random } from "../ml/random";
import { betaI, erf, gammaP, lnBeta, lnChoose, lnGamma } from "./special";

export interface DistributionMath {
  /** x-axis range to plot for the current parameters. */
  range: (p: DistParamValues) => [number, number];
  /** PMF for discrete distributions, PDF for continuous ones. */
  density: (x: number, p: DistParamValues) => number;
  /** Closed-form CDF for continuous distributions. */
  cdf?: (x: number, p: DistParamValues) => number;
  mean: (p: DistParamValues) => number;
  variance: (p: DistParamValues) => number;
  sample: (p: DistParamValues, rand: Random) => number;
}

const normalSample = (rand: Random, mu: number, sigma: number) => mu + sigma * rand.gaussian();

/** Marsaglia-Tsang, with the usual boost for shape < 1. */
const gammaSample = (rand: Random, k: number, theta: number): number => {
  if (k < 1) return gammaSample(rand, k + 1, theta) * rand.next() ** (1 / k);
  const d = k - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number;
    let v: number;
    do {
      x = rand.gaussian();
      v = 1 + c * x;
    } while (v <= 0);
    v = v ** 3;
    const u = rand.next();
    if (Math.log(u) < 0.5 * x * x + d - d * v + d * Math.log(v)) return d * v * theta;
  }
};

const ordered = (p: DistParamValues) => {
  const a = Math.min(p.a, p.b);
  const b = Math.max(p.a, p.b);
  return { a, b: b === a ? a + 1e-6 : b };
};

const tail = (mean: number, sd: number, k = 4) => mean + k * sd;

export const DISTRIBUTION_MATH: Record<string, DistributionMath> = {
  bernoulli: {
    range: () => [0, 1],
    density: (x, { p }) => (x === 1 ? p : x === 0 ? 1 - p : 0),
    mean: ({ p }) => p,
    variance: ({ p }) => p * (1 - p),
    sample: ({ p }, r) => (r.next() < p ? 1 : 0),
  },
  binomial: {
    range: ({ n }) => [0, n],
    density: (k, { n, p }) => {
      if (k < 0 || k > n) return 0;
      if (p <= 0) return k === 0 ? 1 : 0;
      if (p >= 1) return k === n ? 1 : 0;
      return Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
    },
    mean: ({ n, p }) => n * p,
    variance: ({ n, p }) => n * p * (1 - p),
    sample: ({ n, p }, r) => {
      let s = 0;
      for (let i = 0; i < n; i++) if (r.next() < p) s++;
      return s;
    },
  },
  geometric: {
    range: ({ p }) => [1, Math.max(5, Math.ceil(tail(1 / p, Math.sqrt(1 - p) / p, 3)))],
    density: (k, { p }) => (k < 1 ? 0 : (1 - p) ** (k - 1) * p),
    mean: ({ p }) => 1 / p,
    variance: ({ p }) => (1 - p) / (p * p),
    sample: ({ p }, r) => (p >= 1 ? 1 : Math.ceil(Math.log(1 - r.next()) / Math.log(1 - p)) || 1),
  },
  poisson: {
    range: ({ lambda }) => [0, Math.max(8, Math.ceil(tail(lambda, Math.sqrt(lambda))))],
    density: (k, { lambda }) => (k < 0 ? 0 : Math.exp(k * Math.log(lambda) - lambda - lnGamma(k + 1))),
    mean: ({ lambda }) => lambda,
    variance: ({ lambda }) => lambda,
    sample: ({ lambda }, r) => {
      // Knuth for small λ, normal approximation beyond that.
      if (lambda > 30) return Math.max(0, Math.round(normalSample(r, lambda, Math.sqrt(lambda))));
      const L = Math.exp(-lambda);
      let k = 0;
      let prod = r.next();
      while (prod > L) {
        k++;
        prod *= r.next();
      }
      return k;
    },
  },
  "discrete-uniform": {
    range: (p) => {
      const { a, b } = ordered(p);
      return [Math.round(a), Math.round(b)];
    },
    density: (k, p) => {
      const a = Math.round(Math.min(p.a, p.b));
      const b = Math.round(Math.max(p.a, p.b));
      return k >= a && k <= b ? 1 / (b - a + 1) : 0;
    },
    mean: (p) => (Math.round(p.a) + Math.round(p.b)) / 2,
    variance: (p) => ((Math.abs(Math.round(p.b) - Math.round(p.a)) + 1) ** 2 - 1) / 12,
    sample: (p, r) => {
      const a = Math.round(Math.min(p.a, p.b));
      const b = Math.round(Math.max(p.a, p.b));
      return a + r.int(b - a + 1);
    },
  },
  uniform: {
    range: (p) => {
      const { a, b } = ordered(p);
      const pad = (b - a) * 0.25 + 0.5;
      return [a - pad, b + pad];
    },
    density: (x, p) => {
      const { a, b } = ordered(p);
      return x >= a && x <= b ? 1 / (b - a) : 0;
    },
    cdf: (x, p) => {
      const { a, b } = ordered(p);
      return Math.min(1, Math.max(0, (x - a) / (b - a)));
    },
    mean: (p) => (p.a + p.b) / 2,
    variance: (p) => (p.b - p.a) ** 2 / 12,
    sample: (p, r) => {
      const { a, b } = ordered(p);
      return a + (b - a) * r.next();
    },
  },
  normal: {
    range: ({ mu, sigma }) => [mu - 4 * sigma, mu + 4 * sigma],
    density: (x, { mu, sigma }) =>
      Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI)),
    cdf: (x, { mu, sigma }) => 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2))),
    mean: ({ mu }) => mu,
    variance: ({ sigma }) => sigma * sigma,
    sample: ({ mu, sigma }, r) => normalSample(r, mu, sigma),
  },
  exponential: {
    range: ({ lambda }) => [0, 6 / lambda],
    density: (x, { lambda }) => (x < 0 ? 0 : lambda * Math.exp(-lambda * x)),
    cdf: (x, { lambda }) => (x <= 0 ? 0 : 1 - Math.exp(-lambda * x)),
    mean: ({ lambda }) => 1 / lambda,
    variance: ({ lambda }) => 1 / (lambda * lambda),
    sample: ({ lambda }, r) => -Math.log(1 - r.next()) / lambda,
  },
  gamma: {
    range: ({ k, theta }) => [0, tail(k * theta, Math.sqrt(k) * theta, 5)],
    density: (x, { k, theta }) =>
      x <= 0 ? 0 : Math.exp((k - 1) * Math.log(x) - x / theta - lnGamma(k) - k * Math.log(theta)),
    cdf: (x, { k, theta }) => gammaP(k, x / theta),
    mean: ({ k, theta }) => k * theta,
    variance: ({ k, theta }) => k * theta * theta,
    sample: ({ k, theta }, r) => gammaSample(r, k, theta),
  },
  beta: {
    range: () => [0, 1],
    density: (x, { alpha, beta }) =>
      x <= 0 || x >= 1
        ? 0
        : Math.exp((alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x) - lnBeta(alpha, beta)),
    cdf: (x, { alpha, beta }) => betaI(alpha, beta, x),
    mean: ({ alpha, beta }) => alpha / (alpha + beta),
    variance: ({ alpha, beta }) => (alpha * beta) / ((alpha + beta) ** 2 * (alpha + beta + 1)),
    sample: ({ alpha, beta }, r) => {
      const x = gammaSample(r, alpha, 1);
      const y = gammaSample(r, beta, 1);
      return x / (x + y);
    },
  },
  "chi-squared": {
    range: ({ k }) => [0, tail(k, Math.sqrt(2 * k), 4) + 2],
    density: (x, { k }) =>
      x <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.log(2) - lnGamma(k / 2)),
    cdf: (x, { k }) => gammaP(k / 2, x / 2),
    mean: ({ k }) => k,
    variance: ({ k }) => 2 * k,
    sample: ({ k }, r) => gammaSample(r, k / 2, 2),
  },
  "student-t": {
    range: () => [-6, 6],
    density: (x, { nu }) =>
      Math.exp(
        lnGamma((nu + 1) / 2) -
          lnGamma(nu / 2) -
          0.5 * Math.log(nu * Math.PI) -
          ((nu + 1) / 2) * Math.log(1 + (x * x) / nu),
      ),
    cdf: (x, { nu }) => {
      const tailProb = 0.5 * betaI(nu / 2, 0.5, nu / (nu + x * x));
      return x >= 0 ? 1 - tailProb : tailProb;
    },
    mean: ({ nu }) => (nu > 1 ? 0 : NaN),
    variance: ({ nu }) => (nu > 2 ? nu / (nu - 2) : nu > 1 ? Infinity : NaN),
    sample: ({ nu }, r) => r.gaussian() / Math.sqrt(gammaSample(r, nu / 2, 2) / nu),
  },
  "log-normal": {
    range: ({ mu, sigma }) => [0, Math.min(Math.exp(mu + 3 * sigma), 60)],
    density: (x, { mu, sigma }) =>
      x <= 0
        ? 0
        : Math.exp(-((Math.log(x) - mu) ** 2) / (2 * sigma * sigma)) / (x * sigma * Math.sqrt(2 * Math.PI)),
    cdf: (x, { mu, sigma }) =>
      x <= 0 ? 0 : 0.5 * (1 + erf((Math.log(x) - mu) / (sigma * Math.SQRT2))),
    mean: ({ mu, sigma }) => Math.exp(mu + (sigma * sigma) / 2),
    variance: ({ mu, sigma }) => (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma),
    sample: ({ mu, sigma }, r) => Math.exp(normalSample(r, mu, sigma)),
  },
};

/** CDF: running PMF sum for discrete distributions, closed form otherwise. */
export const cdfAt = (math: DistributionMath, discrete: boolean, x: number, p: DistParamValues) => {
  if (!discrete) return math.cdf ? math.cdf(x, p) : 0;
  const [lo] = math.range(p);
  let s = 0;
  for (let k = Math.min(lo, 0); k <= Math.floor(x + 1e-9); k++) s += math.density(k, p);
  return Math.min(1, s);
};
