import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "A positive, right-skewed distribution whose logarithm is Normal. It arises when many independent factors multiply together.",
  story: [
    "The Normal comes from adding many small effects; the Log-normal comes from multiplying them. If a quantity grows by a random percentage again and again, its logarithm is a sum of many small pieces and so is roughly Normal, which makes the quantity itself Log-normal. Formally, X = eʸ where Y is Normal with mean μ and standard deviation σ.",
    "Note that μ and σ describe the underlying Normal, not X itself. The median of X is e^μ, the mean is e^(μ + σ²/2) and the mode is e^(μ − σ²), so in this right-skewed distribution mode < median < mean. Increasing σ stretches the right tail dramatically and pulls the mean further away from the median.",
  ],
  examples: [
    "Household incomes and personal wealth.",
    "Share prices under the standard Black–Scholes model.",
    "The sizes of particles produced by repeated grinding.",
    "Times taken to complete a task, which are positive with occasional very long durations.",
  ],
  parameters: [
    {
      symbol: "μ",
      meaning:
        "The mean of ln X. It sets the scale: the median of X is e^μ, and shifting μ by 1 multiplies every value by e.",
    },
    {
      symbol: "σ",
      meaning:
        "The standard deviation of ln X. It controls the skew: small σ gives a near-symmetric hump, large σ a sharp peak near zero with a long right tail.",
    },
  ],
  relations: [
    "If X is Log-normal(μ, σ), then ln X is Normal with mean μ and standard deviation σ.",
    "Products of independent Log-normals are Log-normal, just as sums of independent Normals are Normal.",
    "Like the Gamma it is positive and right-skewed, but its right tail is heavier.",
  ],
  tryThis: [
    "Set μ = 0 and σ = 1 and shade from 0 to 1. The probability is exactly 0.5, because the median is e⁰ = 1. Notice the mean marker sitting out at e^0.5 ≈ 1.65.",
    "Hold μ = 0 and move σ from 0.1 up to 1.5. At small σ the curve looks almost Normal; at large σ the peak crowds towards zero while the tail and the mean run off to the right.",
    "With σ = 1.5, switch to **Sample means** and compare n = 5 with n = 50. The averages stay visibly skewed for longer than with most distributions: the Central Limit Theorem always wins, but heavy skew slows it down.",
  ],
};
