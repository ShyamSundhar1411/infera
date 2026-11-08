import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "Every whole number from a to b is equally likely. It is the mathematical form of a perfectly fair die.",
  story: [
    "When you have no reason to favour any outcome over another, you give them all the same probability. With m = b − a + 1 possible values, each one gets probability 1/m, and the PMF is a flat row of equal bars.",
    "The mean sits exactly in the middle at (a + b)/2, and the variance is (m² − 1)/12, which grows with the width of the range. For a standard die (a = 1, b = 6) that gives a mean of 3.5, a value the die can never actually show, and a variance of 35/12 ≈ 2.92.",
  ],
  examples: [
    "The score on a single roll of a fair die.",
    "A random index chosen to pick an element from a list.",
    "The last digit of a randomly chosen phone number.",
    "Assigning participants at random to one of several equally sized groups.",
  ],
  parameters: [
    {
      symbol: "a",
      meaning: "The smallest possible value (inclusive). Keep it no larger than b.",
    },
    {
      symbol: "b",
      meaning:
        "The largest possible value (inclusive). Together with a it fixes the number of outcomes, b − a + 1, and so the probability of each.",
    },
  ],
  relations: [
    "The Bernoulli with p = 0.5 is the Discrete Uniform on {0, 1}.",
    "It is the whole-number counterpart of the continuous Uniform on [a, b]; as the grid of values gets finer, the two behave alike.",
    "Averages of many independent draws are approximately Normal by the Central Limit Theorem, even though a single draw is completely flat.",
  ],
  tryThis: [
    "Set a = 1 and b = 6 to build a die. Press **Draw 100** a few times and notice how uneven the histogram looks; then press **Draw 1000** and watch it flatten out.",
    "Keeping the die, switch to **Sample means** with n = 2. The histogram of averages forms a triangle peaking at 3.5, exactly like the familiar totals of two dice. Raise n to 10 and it rounds into a bell.",
    "Set a = 0 and b = 20 and shade the interval from 5 to 9. With 21 equally likely values, the shaded probability is 5/21 ≈ 0.238: in a flat distribution, probability is simply a matter of counting.",
  ],
};
