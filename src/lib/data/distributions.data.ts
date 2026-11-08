import type {
  Distribution,
  DistributionMeta,
  DistributionType,
} from "../types/domain/distribution.types";

const DISTRIBUTIONS: DistributionMeta[] = [
  {
    slug: "bernoulli",
    name: "Bernoulli",
    notation: "X \\sim \\operatorname{Bernoulli}(p)",
    type: "discrete",
    tagline: "A single yes/no trial that succeeds with probability p.",
    params: [{ key: "p", label: "Success probability", symbol: "p", min: 0, max: 1, step: 0.01, default: 0.3 }],
  },
  {
    slug: "binomial",
    name: "Binomial",
    notation: "X \\sim \\operatorname{Bin}(n, p)",
    type: "discrete",
    tagline: "How many successes in n independent yes/no trials.",
    params: [
      { key: "n", label: "Trials", symbol: "n", min: 1, max: 50, step: 1, default: 10 },
      { key: "p", label: "Success probability", symbol: "p", min: 0, max: 1, step: 0.01, default: 0.5 },
    ],
  },
  {
    slug: "geometric",
    name: "Geometric",
    notation: "X \\sim \\operatorname{Geom}(p)",
    type: "discrete",
    tagline: "How many trials until the first success.",
    params: [{ key: "p", label: "Success probability", symbol: "p", min: 0.05, max: 1, step: 0.01, default: 0.3 }],
  },
  {
    slug: "poisson",
    name: "Poisson",
    notation: "X \\sim \\operatorname{Pois}(\\lambda)",
    type: "discrete",
    tagline: "How many events happen in a fixed window when they arrive at a steady average rate.",
    params: [{ key: "lambda", label: "Rate", symbol: "λ", min: 0.1, max: 20, step: 0.1, default: 4 }],
  },
  {
    slug: "discrete-uniform",
    name: "Discrete Uniform",
    notation: "X \\sim \\mathcal{U}\\{a, \\dots, b\\}",
    type: "discrete",
    tagline: "Every whole number from a to b is equally likely, like a fair die.",
    params: [
      { key: "a", label: "Lowest value", symbol: "a", min: 0, max: 10, step: 1, default: 1 },
      { key: "b", label: "Highest value", symbol: "b", min: 1, max: 20, step: 1, default: 6 },
    ],
  },
  {
    slug: "uniform",
    name: "Uniform",
    notation: "X \\sim \\mathcal{U}(a, b)",
    type: "continuous",
    tagline: "Any value between a and b is equally likely.",
    params: [
      { key: "a", label: "Lower bound", symbol: "a", min: -5, max: 5, step: 0.1, default: 0 },
      { key: "b", label: "Upper bound", symbol: "b", min: -4, max: 10, step: 0.1, default: 1 },
    ],
  },
  {
    slug: "normal",
    name: "Normal (Gaussian)",
    notation: "X \\sim \\mathcal{N}(\\mu, \\sigma^2)",
    type: "continuous",
    tagline: "The bell curve. Sums of many small effects end up looking like this.",
    params: [
      { key: "mu", label: "Mean", symbol: "μ", min: -5, max: 5, step: 0.1, default: 0 },
      { key: "sigma", label: "Standard deviation", symbol: "σ", min: 0.2, max: 4, step: 0.05, default: 1 },
    ],
  },
  {
    slug: "exponential",
    name: "Exponential",
    notation: "X \\sim \\operatorname{Exp}(\\lambda)",
    type: "continuous",
    tagline: "The waiting time until the next event in a Poisson process.",
    params: [{ key: "lambda", label: "Rate", symbol: "λ", min: 0.1, max: 5, step: 0.05, default: 1 }],
  },
  {
    slug: "gamma",
    name: "Gamma",
    notation: "X \\sim \\Gamma(k, \\theta)",
    type: "continuous",
    tagline: "The waiting time for k events. A flexible, skewed shape for positive values.",
    params: [
      { key: "k", label: "Shape", symbol: "k", min: 0.5, max: 10, step: 0.1, default: 2 },
      { key: "theta", label: "Scale", symbol: "θ", min: 0.2, max: 4, step: 0.05, default: 1 },
    ],
  },
  {
    slug: "beta",
    name: "Beta",
    notation: "X \\sim \\operatorname{Beta}(\\alpha, \\beta)",
    type: "continuous",
    tagline: "A distribution over probabilities themselves, living between 0 and 1.",
    params: [
      { key: "alpha", label: "Alpha", symbol: "α", min: 0.2, max: 10, step: 0.1, default: 2 },
      { key: "beta", label: "Beta", symbol: "β", min: 0.2, max: 10, step: 0.1, default: 5 },
    ],
  },
  {
    slug: "chi-squared",
    name: "Chi-squared",
    notation: "X \\sim \\chi^2(k)",
    type: "continuous",
    tagline: "The sum of k squared standard normals. The workhorse of hypothesis tests.",
    params: [{ key: "k", label: "Degrees of freedom", symbol: "k", min: 1, max: 20, step: 1, default: 3 }],
  },
  {
    slug: "student-t",
    name: "Student's t",
    notation: "X \\sim t_\\nu",
    type: "continuous",
    tagline: "A bell curve with heavier tails, for when σ has to be estimated from a small sample.",
    params: [{ key: "nu", label: "Degrees of freedom", symbol: "ν", min: 1, max: 30, step: 1, default: 3 }],
  },
  {
    slug: "log-normal",
    name: "Log-normal",
    notation: "X \\sim \\operatorname{LogN}(\\mu, \\sigma^2)",
    type: "continuous",
    tagline: "A variable whose logarithm is normal. Products of many small effects end up like this.",
    params: [
      { key: "mu", label: "Log mean", symbol: "μ", min: -1, max: 2, step: 0.05, default: 0 },
      { key: "sigma", label: "Log std. dev.", symbol: "σ", min: 0.1, max: 1.5, step: 0.05, default: 0.5 },
    ],
  },
];

export const getDistributions = (): Distribution[] => DISTRIBUTIONS;

export const getDistribution = (slug: string) => getDistributions().find((d) => d.slug === slug);

export const getDistributionsByType = (type: DistributionType) =>
  getDistributions().filter((d) => d.type === type);

export const getDefaultDistParams = (meta: DistributionMeta) =>
  Object.fromEntries(meta.params.map((p) => [p.key, p.default]));

/** Concepts shown on the distributions overview page. */
export const getProbabilityConcepts = () => [
  {
    term: "Random variable",
    formula: "X : \\Omega \\to \\mathbb{R}",
    text: "A number whose value depends on chance, like the result of a die roll or tomorrow's rainfall.",
  },
  {
    term: "Discrete vs continuous",
    formula: "\\{0, 1, 2, \\dots\\} \\quad \\text{vs} \\quad [a, b] \\subseteq \\mathbb{R}",
    text: "Discrete variables take separate values you can list (0, 1, 2, …). Continuous ones can land anywhere in a range, so any single exact value has probability zero.",
  },
  {
    term: "PMF (discrete)",
    formula: "p(k) = P(X = k), \\quad \\sum_k p(k) = 1",
    text: "The probability mass function gives the probability of each exact value. The bars always add up to 1.",
  },
  {
    term: "PDF (continuous)",
    formula: "P(a \\le X \\le b) = \\int_a^b f(x)\\,dx",
    text: "The probability density function is not a probability by itself. Probability is the area under it, so f(x) can be bigger than 1.",
  },
  {
    term: "CDF",
    formula: "F(x) = P(X \\le x)",
    text: "The cumulative distribution function climbs from 0 to 1. The probability of landing between a and b is F(b) − F(a).",
  },
  {
    term: "Expectation",
    formula: "\\mathbb{E}[X] = \\sum_k k\\,p(k) \;\\text{ or }\; \\int x f(x)\\,dx",
    text: "The long-run average, and the balance point of the distribution. Draw enough samples and their mean settles here.",
  },
  {
    term: "Variance and standard deviation",
    formula: "\\operatorname{Var}(X) = \\mathbb{E}[X^2] - \\mu^2, \\quad \\sigma = \\sqrt{\\operatorname{Var}(X)}",
    text: "How spread out the values are around the mean. The standard deviation is in the same units as X.",
  },
  {
    term: "Central Limit Theorem",
    formula: "\\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1)",
    text: "Average enough independent draws from almost any distribution and the average looks normal. Try the Sample means mode on any distribution page.",
  },
];
