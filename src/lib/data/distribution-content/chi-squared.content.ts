import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "The sum of k squared independent standard Normal variables. It is the workhorse behind variance estimates and goodness-of-fit tests.",
  story: [
    "Take k independent draws from a standard Normal, square each one and add them up. The result is Chi-squared with k degrees of freedom. Squaring makes everything positive, and because each squared term has mean 1 and variance 2, the total has mean k and variance 2k.",
    "This is why it appears throughout statistical testing: whenever you add up squared standardised discrepancies, such as (observed − expected)²/expected in a contingency table, or the squared deviations in a sample variance, a Chi-squared is lurking. For Normal data, (n − 1)S²/σ² follows Chi-squared with n − 1 degrees of freedom.",
  ],
  examples: [
    "The Pearson goodness-of-fit test comparing observed and expected counts.",
    "Testing for independence in a contingency table.",
    "Confidence intervals for a population variance.",
    "The squared distance from the origin of a random point in k-dimensional space with independent standard Normal coordinates.",
  ],
  parameters: [
    {
      symbol: "k",
      meaning:
        "The degrees of freedom: how many squared standard Normals are being added. It is the mean, and the variance is 2k.",
    },
  ],
  relations: [
    "It is the sum of k squared standard Normals; in particular Z² is Chi-squared with k = 1.",
    "Chi-squared with k degrees of freedom is Gamma(k/2, 2).",
    "With k = 2 it is the Exponential with rate 1/2.",
    "If Z is standard Normal and V is an independent Chi-squared(ν), then Z/√(V/ν) is Student t with ν degrees of freedom.",
  ],
  tryThis: [
    "Set k = 1 and shade from 0 to 3.84. The probability is 0.95, which matches the Normal: P(Z² ≤ 3.84) = P(|Z| ≤ 1.96).",
    "Step k from 1 to 2 to 3. The density at zero goes from infinite, to exactly 1/2 (the Exponential with rate 1/2), to zero with a hump at k − 2 = 1. For k ≥ 2 the mode is always k − 2.",
    "Set k = 20, press **Draw 1000** and compare the sample variance with 2k = 40. The shape is already fairly close to a Normal with mean 20 and σ ≈ 6.32, though still slightly right-skewed.",
  ],
};
