import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "The simplest random variable there is: a single trial that comes out 1 (success) with probability p and 0 (failure) otherwise.",
  story: [
    "Flip a coin that lands heads with probability p, and write 1 for heads and 0 for tails. That one yes-or-no outcome is a Bernoulli random variable. Its mean is p and its variance is p(1 − p), so the uncertainty is greatest at p = 0.5 and vanishes as p approaches 0 or 1.",
    "On its own it looks almost too simple to bother with, but it is the atom from which much of discrete probability is built. Count Bernoulli successes and you get the Binomial; wait for the first one and you get the Geometric; average many of them and you get a sample proportion, the quantity behind every poll and every A/B test.",
  ],
  examples: [
    "Whether a visitor clicks an advert (1) or not (0).",
    "Whether a manufactured part passes quality control.",
    "Whether a patient responds to a treatment in a clinical trial.",
    "The label of a single example in a binary classification problem.",
  ],
  parameters: [
    {
      symbol: "p",
      meaning:
        "The probability of success, P(X = 1). It is also the mean; the variance p(1 − p) peaks at 0.25 when p = 0.5.",
    },
  ],
  relations: [
    "A Binomial with n = 1 is a Bernoulli; equivalently, a Binomial(n, p) is the sum of n independent Bernoulli(p) variables.",
    "The Geometric counts how many independent Bernoulli(p) trials it takes to get the first success.",
    "A Bernoulli(0.5) is the Discrete Uniform on {0, 1}.",
    "The mean of n Bernoulli(p) draws is approximately Normal with mean p and variance p(1 − p)/n for large n, by the Central Limit Theorem.",
  ],
  tryThis: [
    "Drag p from 0 to 1 and watch the ±1σ markers: they spread furthest apart at p = 0.5, where the variance reaches its maximum of 0.25.",
    "Set p = 0.3, press **Draw 1000** and compare the sample mean with 0.3. The sample mean is simply the proportion of ones you drew.",
    "Switch to **Sample means** with p = 0.1 and raise n from 1 to 50. The lumpy two-bar picture turns into a bell centred on 0.1, even though each draw is only ever 0 or 1.",
  ],
};
