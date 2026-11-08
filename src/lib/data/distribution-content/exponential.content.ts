import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "The waiting time until the next event when events arrive at random at a constant rate λ.",
  story: [
    "If events arrive as a Poisson process with rate λ per unit time, the gap until the next one is Exponential. Its density λe^(−λx) is highest at zero and decays steadily, so short waits are common and long waits are rare but always possible. The mean wait is 1/λ and the standard deviation is also 1/λ.",
    "Its signature property is memorylessness: P(X > s + t | X > s) = P(X > t). If a bulb with an Exponential lifetime has already lasted 1000 hours, its remaining life has the same distribution as a brand-new bulb's. It is the only continuous distribution with this property.",
  ],
  examples: [
    "Time between customers arriving at a shop counter.",
    "Time until the next radioactive decay in a sample.",
    "The lifetime of an electronic component that does not wear out.",
    "Time between requests hitting a web server.",
  ],
  parameters: [
    {
      symbol: "λ",
      meaning:
        "The rate: the average number of events per unit time. A higher rate means shorter waits, with mean 1/λ and variance 1/λ².",
    },
  ],
  relations: [
    "The Exponential with rate λ is the Gamma with k = 1 and θ = 1/λ.",
    "It gives the gaps between events in a Poisson process, whose counts in a window of length t are Poisson(λt).",
    "Chi-squared with k = 2 is the Exponential with rate 1/2 (mean 2).",
    "It is the continuous analogue of the Geometric: both are memoryless waiting times.",
  ],
  tryThis: [
    "Shade from 0 to the mean 1/λ. Whatever λ you choose, the probability is 1 − e^(−1) ≈ 0.632, so most waits are shorter than average: the long tail drags the mean upwards.",
    "Set λ = 0.5 and press **Draw 1000**. Check that the sample mean is close to 2 and the sample variance close to 4, the square of the mean.",
    "Switch to **Sample means** with n = 2, then n = 30. The averages stop piling up at zero and form a bell around 1/λ: the Central Limit Theorem straightens out even a strongly skewed shape.",
  ],
};
