import type {
  Distribution,
  DistributionMeta,
  DistributionType,
} from "../types/domain/distribution.types";
import { DISTRIBUTION_CONTENT } from "./distribution-content";

const DISTRIBUTIONS: DistributionMeta[] = [
  {
    slug: "bernoulli",
    name: "Bernoulli",
    notation: "X ~ Bernoulli(p)",
    type: "discrete",
    tagline: "A single yes/no trial that succeeds with probability p.",
    params: [{ key: "p", label: "Success probability", symbol: "p", min: 0, max: 1, step: 0.01, default: 0.3 }],
    formulas: {
      support: "k ∈ {0, 1}",
      density: "P(X = k) = pᵏ (1 − p)¹⁻ᵏ",
      cdf: "F(k) = 0 for k < 0,  1 − p for 0 ≤ k < 1,  1 for k ≥ 1",
      mean: "E[X] = p",
      variance: "Var(X) = p(1 − p)",
      mode: "1 if p > ½, 0 if p < ½",
    },
  },
  {
    slug: "binomial",
    name: "Binomial",
    notation: "X ~ Bin(n, p)",
    type: "discrete",
    tagline: "How many successes in n independent yes/no trials.",
    params: [
      { key: "n", label: "Trials", symbol: "n", min: 1, max: 50, step: 1, default: 10 },
      { key: "p", label: "Success probability", symbol: "p", min: 0, max: 1, step: 0.01, default: 0.5 },
    ],
    formulas: {
      support: "k ∈ {0, 1, …, n}",
      density: "P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ",
      cdf: "F(k) = Σᵢ₌₀ᵏ C(n, i) pⁱ (1 − p)ⁿ⁻ⁱ",
      mean: "E[X] = np",
      variance: "Var(X) = np(1 − p)",
      mode: "⌊(n + 1)p⌋",
    },
  },
  {
    slug: "geometric",
    name: "Geometric",
    notation: "X ~ Geom(p)",
    type: "discrete",
    tagline: "How many trials until the first success.",
    params: [{ key: "p", label: "Success probability", symbol: "p", min: 0.05, max: 1, step: 0.01, default: 0.3 }],
    formulas: {
      support: "k ∈ {1, 2, 3, …}",
      density: "P(X = k) = (1 − p)ᵏ⁻¹ p",
      cdf: "F(k) = 1 − (1 − p)ᵏ",
      mean: "E[X] = 1 / p",
      variance: "Var(X) = (1 − p) / p²",
      mode: "1",
    },
  },
  {
    slug: "poisson",
    name: "Poisson",
    notation: "X ~ Pois(λ)",
    type: "discrete",
    tagline: "How many events happen in a fixed window when they arrive at a steady average rate.",
    params: [{ key: "lambda", label: "Rate", symbol: "λ", min: 0.1, max: 20, step: 0.1, default: 4 }],
    formulas: {
      support: "k ∈ {0, 1, 2, …}",
      density: "P(X = k) = λᵏ e^(−λ) / k!",
      cdf: "F(k) = e^(−λ) Σᵢ₌₀ᵏ λⁱ / i!",
      mean: "E[X] = λ",
      variance: "Var(X) = λ",
      mode: "⌊λ⌋",
    },
  },
  {
    slug: "discrete-uniform",
    name: "Discrete Uniform",
    notation: "X ~ U{a, b}",
    type: "discrete",
    tagline: "Every whole number from a to b is equally likely, like a fair die.",
    params: [
      { key: "a", label: "Lowest value", symbol: "a", min: 0, max: 10, step: 1, default: 1 },
      { key: "b", label: "Highest value", symbol: "b", min: 1, max: 20, step: 1, default: 6 },
    ],
    formulas: {
      support: "k ∈ {a, a + 1, …, b}",
      density: "P(X = k) = 1 / (b − a + 1)",
      cdf: "F(k) = (⌊k⌋ − a + 1) / (b − a + 1)",
      mean: "E[X] = (a + b) / 2",
      variance: "Var(X) = ((b − a + 1)² − 1) / 12",
    },
  },
  {
    slug: "uniform",
    name: "Uniform",
    notation: "X ~ U(a, b)",
    type: "continuous",
    tagline: "Any value between a and b is equally likely.",
    params: [
      { key: "a", label: "Lower bound", symbol: "a", min: -5, max: 5, step: 0.1, default: 0 },
      { key: "b", label: "Upper bound", symbol: "b", min: -4, max: 10, step: 0.1, default: 1 },
    ],
    formulas: {
      support: "x ∈ [a, b]",
      density: "f(x) = 1 / (b − a)",
      cdf: "F(x) = (x − a) / (b − a)",
      mean: "E[X] = (a + b) / 2",
      variance: "Var(X) = (b − a)² / 12",
    },
  },
  {
    slug: "normal",
    name: "Normal (Gaussian)",
    notation: "X ~ N(μ, σ²)",
    type: "continuous",
    tagline: "The bell curve. Sums of many small effects end up looking like this.",
    params: [
      { key: "mu", label: "Mean", symbol: "μ", min: -5, max: 5, step: 0.1, default: 0 },
      { key: "sigma", label: "Standard deviation", symbol: "σ", min: 0.2, max: 4, step: 0.05, default: 1 },
    ],
    formulas: {
      support: "x ∈ ℝ",
      density: "f(x) = 1 / (σ√(2π)) · e^(−(x − μ)² / 2σ²)",
      cdf: "F(x) = ½ [1 + erf((x − μ) / (σ√2))]",
      mean: "E[X] = μ",
      variance: "Var(X) = σ²",
      mode: "μ",
    },
  },
  {
    slug: "exponential",
    name: "Exponential",
    notation: "X ~ Exp(λ)",
    type: "continuous",
    tagline: "The waiting time until the next event in a Poisson process.",
    params: [{ key: "lambda", label: "Rate", symbol: "λ", min: 0.1, max: 5, step: 0.05, default: 1 }],
    formulas: {
      support: "x ≥ 0",
      density: "f(x) = λ e^(−λx)",
      cdf: "F(x) = 1 − e^(−λx)",
      mean: "E[X] = 1 / λ",
      variance: "Var(X) = 1 / λ²",
      mode: "0",
    },
  },
  {
    slug: "gamma",
    name: "Gamma",
    notation: "X ~ Gamma(k, θ)",
    type: "continuous",
    tagline: "The waiting time for k events. A flexible, skewed shape for positive values.",
    params: [
      { key: "k", label: "Shape", symbol: "k", min: 0.5, max: 10, step: 0.1, default: 2 },
      { key: "theta", label: "Scale", symbol: "θ", min: 0.2, max: 4, step: 0.05, default: 1 },
    ],
    formulas: {
      support: "x > 0",
      density: "f(x) = x^(k−1) e^(−x/θ) / (Γ(k) θᵏ)",
      cdf: "F(x) = γ(k, x/θ) / Γ(k)",
      mean: "E[X] = kθ",
      variance: "Var(X) = kθ²",
      mode: "(k − 1)θ for k ≥ 1",
    },
  },
  {
    slug: "beta",
    name: "Beta",
    notation: "X ~ Beta(α, β)",
    type: "continuous",
    tagline: "A distribution over probabilities themselves, living between 0 and 1.",
    params: [
      { key: "alpha", label: "Alpha", symbol: "α", min: 0.2, max: 10, step: 0.1, default: 2 },
      { key: "beta", label: "Beta", symbol: "β", min: 0.2, max: 10, step: 0.1, default: 5 },
    ],
    formulas: {
      support: "x ∈ (0, 1)",
      density: "f(x) = x^(α−1) (1 − x)^(β−1) / B(α, β)",
      cdf: "F(x) = Iₓ(α, β)",
      mean: "E[X] = α / (α + β)",
      variance: "Var(X) = αβ / ((α + β)² (α + β + 1))",
      mode: "(α − 1) / (α + β − 2) for α, β > 1",
    },
  },
  {
    slug: "chi-squared",
    name: "Chi-squared",
    notation: "X ~ χ²(k)",
    type: "continuous",
    tagline: "The sum of k squared standard normals. The workhorse of hypothesis tests.",
    params: [{ key: "k", label: "Degrees of freedom", symbol: "k", min: 1, max: 20, step: 1, default: 3 }],
    formulas: {
      support: "x > 0",
      density: "f(x) = x^(k/2 − 1) e^(−x/2) / (2^(k/2) Γ(k/2))",
      cdf: "F(x) = γ(k/2, x/2) / Γ(k/2)",
      mean: "E[X] = k",
      variance: "Var(X) = 2k",
      mode: "max(k − 2, 0)",
    },
  },
  {
    slug: "student-t",
    name: "Student's t",
    notation: "X ~ t(ν)",
    type: "continuous",
    tagline: "A bell curve with heavier tails, for when σ has to be estimated from a small sample.",
    params: [{ key: "nu", label: "Degrees of freedom", symbol: "ν", min: 1, max: 30, step: 1, default: 3 }],
    formulas: {
      support: "x ∈ ℝ",
      density: "f(x) = Γ((ν+1)/2) / (√(νπ) Γ(ν/2)) · (1 + x²/ν)^(−(ν+1)/2)",
      cdf: "F(x) = 1 − ½ I_(ν/(ν+x²))(ν/2, ½) for x ≥ 0",
      mean: "E[X] = 0 for ν > 1, undefined otherwise",
      variance: "Var(X) = ν / (ν − 2) for ν > 2, ∞ for 1 < ν ≤ 2",
      mode: "0",
    },
  },
  {
    slug: "log-normal",
    name: "Log-normal",
    notation: "X ~ LogN(μ, σ²)",
    type: "continuous",
    tagline: "A variable whose logarithm is normal. Products of many small effects end up like this.",
    params: [
      { key: "mu", label: "Log mean", symbol: "μ", min: -1, max: 2, step: 0.05, default: 0 },
      { key: "sigma", label: "Log std. dev.", symbol: "σ", min: 0.1, max: 1.5, step: 0.05, default: 0.5 },
    ],
    formulas: {
      support: "x > 0",
      density: "f(x) = 1 / (xσ√(2π)) · e^(−(ln x − μ)² / 2σ²)",
      cdf: "F(x) = ½ [1 + erf((ln x − μ) / (σ√2))]",
      mean: "E[X] = e^(μ + σ²/2)",
      variance: "Var(X) = (e^(σ²) − 1) e^(2μ + σ²)",
      mode: "e^(μ − σ²)",
    },
  },
];

export const getDistributions = (): Distribution[] =>
  DISTRIBUTIONS.map((meta) => ({ ...meta, content: DISTRIBUTION_CONTENT[meta.slug] }));

export const getDistribution = (slug: string) => getDistributions().find((d) => d.slug === slug);

export const getDistributionsByType = (type: DistributionType) =>
  getDistributions().filter((d) => d.type === type);

export const getDefaultDistParams = (meta: DistributionMeta) =>
  Object.fromEntries(meta.params.map((p) => [p.key, p.default]));

/** Concepts shown on the distributions overview page. */
export const getProbabilityConcepts = () => [
  {
    term: "Random variable",
    formula: "X : outcomes → ℝ",
    text: "A number whose value depends on chance, like the result of a die roll or tomorrow's rainfall.",
  },
  {
    term: "Discrete vs continuous",
    formula: "countable values  vs  any value in an interval",
    text: "Discrete variables take separate values you can list (0, 1, 2, …). Continuous ones can land anywhere in a range, so any single exact value has probability zero.",
  },
  {
    term: "PMF (discrete)",
    formula: "p(k) = P(X = k),   Σₖ p(k) = 1",
    text: "The probability mass function gives the probability of each exact value. The bars always add up to 1.",
  },
  {
    term: "PDF (continuous)",
    formula: "P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx,   ∫ f(x) dx = 1",
    text: "The probability density function is not a probability by itself. Probability is the area under it, so f(x) can be bigger than 1.",
  },
  {
    term: "CDF",
    formula: "F(x) = P(X ≤ x)",
    text: "The cumulative distribution function climbs from 0 to 1. The probability of landing between a and b is F(b) − F(a).",
  },
  {
    term: "Expectation",
    formula: "E[X] = Σ k·p(k)   or   ∫ x·f(x) dx",
    text: "The long-run average, and the balance point of the distribution. Draw enough samples and their mean settles here.",
  },
  {
    term: "Variance and standard deviation",
    formula: "Var(X) = E[(X − μ)²] = E[X²] − μ²,   σ = √Var(X)",
    text: "How spread out the values are around the mean. The standard deviation is in the same units as X.",
  },
  {
    term: "Central Limit Theorem",
    formula: "(X̄ₙ − μ) / (σ/√n)  →  N(0, 1)",
    text: "Average enough independent draws from almost any distribution and the average looks normal. Try the Sample means mode on any distribution page.",
  },
];
