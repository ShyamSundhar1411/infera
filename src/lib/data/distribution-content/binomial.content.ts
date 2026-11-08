import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "The number of successes in n independent trials, each succeeding with the same probability p.",
  story: [
    "Flip the same biased coin n times and count the heads. Each flip is a Bernoulli(p) trial, the flips do not influence one another, and the total can be anything from 0 to n. The probability of exactly k successes is C(n, k) pᵏ(1 − p)ⁿ⁻ᵏ: the chance of one particular arrangement, multiplied by the number of ways to arrange k successes among n slots.",
    "On average you get np successes, with variance np(1 − p). When p = 0.5 the distribution is perfectly symmetric; push p towards 0 or 1 and it leans against the nearest wall. As n grows the bars settle into a familiar bell shape, which is why the Normal approximation works so well for large n.",
  ],
  examples: [
    "The number of heads in 20 coin tosses.",
    "How many of 50 surveyed people say they will vote for a given party.",
    "The number of defective items in a batch of 30, if each is faulty independently with probability p.",
    "How many of n emails in an A/B test are opened.",
  ],
  parameters: [
    {
      symbol: "n",
      meaning: "The number of independent trials; X can take any whole value from 0 to n.",
    },
    {
      symbol: "p",
      meaning:
        "The probability of success on each trial. It sets the centre (np) and, together with n, the spread np(1 − p).",
    },
  ],
  relations: [
    "A Binomial with n = 1 is the Bernoulli, and Binomial(n, p) is the sum of n independent Bernoulli(p) variables.",
    "The Poisson is the limit of the Binomial as n → ∞ and p → 0 with np = λ held fixed.",
    "For large n (a common rule of thumb is np and n(1 − p) both at least 10) it is well approximated by a Normal with mean np and variance np(1 − p).",
  ],
  tryThis: [
    "Set n = 50 and p = 0.5, then slowly lower p to 0.05. Watch the symmetric bell become a right-skewed pile squashed against zero.",
    "Compare n = 50, p = 0.06 with the Poisson page at λ = 3: the two sets of bars are almost identical, because np = 3 in both.",
    "With n = 50 and p = 0.5, shade the interval from 22 to 28 (roughly the mean ± 1σ, since σ ≈ 3.54), then press **Draw 1000** and check that about that share of the histogram falls inside it.",
  ],
};
