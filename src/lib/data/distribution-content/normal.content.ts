import type { DistributionContent } from "@/lib/types/domain/distribution.types";

export const content: DistributionContent = {
  summary:
    "The symmetric bell curve, fully described by its centre μ and its spread σ. It appears whenever many small, independent effects add up.",
  story: [
    "Add together lots of small, independent nudges, and the total tends to follow a bell curve whatever the nudges looked like individually. That is the Central Limit Theorem, and it is why the Normal turns up in measurement errors, heights and test scores, and underlies so much of classical statistics.",
    "The curve is centred on μ, which is its mean, median and mode all at once, and σ sets its width. A handy rule: about 68% of the probability lies within 1σ of the mean, about 95% within 2σ (1.96σ, to be precise), and about 99.7% within 3σ.",
  ],
  examples: [
    "Adult heights within a population.",
    "Random measurement error in a laboratory instrument.",
    "Standardised test scores, which are often scaled to be roughly Normal.",
    "The noise term in linear regression, which is classically assumed to be Normal.",
  ],
  parameters: [
    {
      symbol: "μ",
      meaning: "The mean, and the centre of symmetry. Changing it slides the bell left or right without changing its shape.",
    },
    {
      symbol: "σ",
      meaning:
        "The standard deviation. Larger σ makes the bell wider and lower; the variance is σ².",
    },
  ],
  relations: [
    "If Z is standard Normal, then Z² is Chi-squared with 1 degree of freedom, and a sum of k squared standard Normals is Chi-squared with k.",
    "The Student t tends to the Normal as ν → ∞.",
    "If X is Normal(μ, σ²), then eˣ is Log-normal with parameters μ and σ.",
    "The Binomial and the Poisson are both well approximated by a Normal when n or λ is large.",
  ],
  tryThis: [
    "Shade the interval from μ − σ to μ + σ and read off about 0.683. Change μ and σ and re-shade: the answer never changes, because every Normal is just a shifted and stretched copy of the standard one.",
    "Set μ = 0, σ = 1 and shade from −1.96 to 1.96. The probability is 0.95, the source of the 1.96 in every 95% confidence interval.",
    "Switch to **Sample means** and move n from 1 to 25. The histogram stays Normal but narrows by a factor of √n: at n = 25 its spread is σ/5.",
  ],
};
