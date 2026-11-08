import type { Concept } from "../types/domain/concept.types";

const CONCEPTS: Concept[] = [
  {
    slug: "bayes-theorem",
    name: "Bayes' Theorem",
    tagline: "Why a positive test for a rare disease usually means you are fine.",
    summary:
      "Bayes' theorem tells you how to update a belief when new evidence arrives. It weighs how likely the evidence is under each explanation against how likely each explanation was to begin with.",
    sections: [
      {
        title: "The idea",
        paragraphs: [
          "Imagine a disease that 1 in 100 people have, and a test that catches 99% of real cases but also flags 5% of healthy people. You test positive. Are you probably sick? Most people say yes. The real answer is about 17%.",
          "The trick is that healthy people vastly outnumber sick ones. Even a small false-positive rate applied to a huge healthy group produces more positives than the true cases do. Bayes' theorem makes that bookkeeping exact.",
        ],
      },
      {
        title: "How to think about it",
        steps: [
          "Start with the prior: how common is the condition before you look at any evidence?",
          "Ask how likely the evidence is if the condition is true (the sensitivity) and if it is false (the false-positive rate).",
          "Count everyone who would see this evidence: true positives plus false positives.",
          "The posterior is the share of that group who really have the condition.",
          "Got more evidence? Today's posterior becomes tomorrow's prior.",
        ],
      },
      {
        title: "Reading the picture",
        paragraphs: [
          "The grid is 1,000 people. Coral squares are sick, the rest are healthy. Solid squares tested positive. Look only at the solid squares: the fraction that are coral is exactly P(sick | positive).",
        ],
      },
    ],
    formulas: [
      { label: "Bayes' theorem", formula: "P(A | B) = P(B | A) · P(A) / P(B)" },
      { label: "Total probability", formula: "P(B) = P(B | A) P(A) + P(B | ¬A) P(¬A)" },
      { label: "Medical test", formula: "P(D | +) = sens · prev / (sens · prev + (1 − spec)(1 − prev))" },
      { label: "Odds form", formula: "posterior odds = prior odds × likelihood ratio" },
      { label: "Likelihood ratio", formula: "LR₊ = sensitivity / (1 − specificity)" },
    ],
    tryThis: [
      "Leave the defaults and read P(sick | positive). Then raise **Prevalence** to 20% and watch the same test become far more convincing.",
      "Push **Specificity** to 99.9%. False positives nearly vanish, and a positive result becomes strong evidence even for a rare disease.",
      "Set **Positive tests in a row** to 2. Each extra positive multiplies the odds by the likelihood ratio, so belief climbs fast.",
      "Make the disease very rare (0.1%). Even an excellent test gives mostly false alarms. This is why screening programmes confirm with a second test.",
    ],
  },
  {
    slug: "bayesian-updating",
    name: "Bayesian Updating",
    tagline: "Learn a coin's bias one flip at a time, with a belief that sharpens as evidence piles up.",
    summary:
      "Bayesian inference treats an unknown quantity as a distribution of belief. Each new observation reshapes that distribution through Bayes' theorem, so uncertainty shrinks as data arrives.",
    sections: [
      {
        title: "The idea",
        paragraphs: [
          "Someone hands you a coin that might be biased. Before flipping, you have a belief about its probability of heads, p. That belief is a whole distribution, not a single number: the prior.",
          "Each flip is evidence. Heads makes high values of p more plausible, tails makes low values more plausible. Multiply the prior by the likelihood of what you saw, renormalise, and you get the posterior. Keep going and the posterior narrows around the truth.",
        ],
      },
      {
        title: "Why the Beta distribution",
        paragraphs: [
          "If the prior is Beta(α, β) and you see h heads and t tails, the posterior is exactly Beta(α + h, β + t). The Beta is the conjugate prior for coin flips: updating is just adding counts. You can read α and β as imaginary heads and tails you saw before the experiment started.",
        ],
      },
      {
        title: "Bayesian vs frequentist",
        paragraphs: [
          "The frequentist estimate is simply h / n. With lots of data both approaches agree. With little data the prior matters: after one head, the frequency says p = 1, while a sensible prior says 'probably above a half, but who knows'. The credible interval states directly where p probably lies, given the data and the prior.",
        ],
      },
    ],
    formulas: [
      { label: "Bayes for parameters", formula: "posterior ∝ likelihood × prior" },
      { label: "Likelihood of h heads in n flips", formula: "L(p) ∝ pʰ (1 − p)ⁿ⁻ʰ" },
      { label: "Conjugate update", formula: "Beta(α, β) → Beta(α + h, β + t)" },
      { label: "Posterior mean", formula: "E[p | data] = (α + h) / (α + β + n)" },
      { label: "Maximum likelihood", formula: "p̂ = h / n" },
    ],
    tryThis: [
      "Flip 10 times with the flat prior Beta(1, 1). Then flip 100 more and watch the credible interval shrink roughly like 1/√n.",
      "Set a stubborn prior, α = β = 20, and a hidden bias of 0.8. The posterior starts near 0.5 and has to be dragged towards the truth by the data.",
      "Reset and flip once. Compare the posterior mean with the frequency estimate h/n, which jumps to 0 or 1 straight away.",
      "Try α = β = 0.5. This prior expects the coin to be extreme (always heads or always tails) and reacts strongly to the first few flips.",
    ],
  },
  {
    slug: "law-of-large-numbers",
    name: "Law of Large Numbers",
    tagline: "Averages settle down. Watch running means home in on the expected value.",
    summary:
      "The law of large numbers says that the average of many independent draws gets closer and closer to the expected value. It is why casinos always win in the long run and why polls work.",
    sections: [
      {
        title: "The idea",
        paragraphs: [
          "Roll a die once and you might get a 6. Average ten rolls and you will probably be somewhere between 2.5 and 4.5. Average ten thousand and you will be within a whisker of 3.5. Individual outcomes stay random, but their average becomes predictable.",
          "Each line on the chart is one person rolling and keeping a running average. Early on the lines swing wildly. As n grows they all squeeze together onto the true mean.",
        ],
      },
      {
        title: "How fast?",
        paragraphs: [
          "The spread of the average shrinks like σ/√n. To halve the error you need four times as many draws; to get one more decimal place you need a hundred times as many. The shaded band shows μ ± 2σ/√n, where about 95% of the averages should sit at each n.",
        ],
      },
      {
        title: "When it fails",
        paragraphs: [
          "The law needs the expected value to exist. The Cauchy distribution (Student's t with ν = 1) has tails so heavy that its mean is undefined. Its running averages never settle: every so often a single huge draw yanks the average somewhere new.",
        ],
      },
    ],
    formulas: [
      { label: "Sample mean", formula: "X̄ₙ = (X₁ + X₂ + … + Xₙ) / n" },
      { label: "Weak law", formula: "P(|X̄ₙ − μ| > ε) → 0 as n → ∞, for every ε > 0" },
      { label: "Strong law", formula: "P(X̄ₙ → μ) = 1" },
      { label: "Spread of the average", formula: "Var(X̄ₙ) = σ² / n,   SD(X̄ₙ) = σ / √n" },
      { label: "Chebyshev bound", formula: "P(|X̄ₙ − μ| ≥ ε) ≤ σ² / (n ε²)" },
    ],
    tryThis: [
      "Run the **Fair die** with 10 paths. Notice how wild the first 20 rolls are and how tight things look by 1,000.",
      "Switch to **Exponential**. The paths overshoot upwards more than downwards early on because the distribution is skewed, but they still converge.",
      "Pick **Cauchy** and run it several times. The paths jump and never settle, because there is no mean for them to converge to.",
    ],
  },
  {
    slug: "central-limit-theorem",
    name: "Central Limit Theorem",
    tagline: "Average enough of almost anything and you get a bell curve.",
    summary:
      "The central limit theorem says that the average of many independent draws is approximately normally distributed, whatever the shape of the original distribution, as long as it has a finite variance.",
    sections: [
      {
        title: "The idea",
        paragraphs: [
          "Take any distribution: flat, skewed, U-shaped, even a coin flip. Draw n values and average them. Do that thousands of times and histogram the averages. As n grows, the histogram turns into a bell curve every time.",
          "This is why the normal distribution is everywhere. Heights, measurement errors and test scores are sums of many small, independent effects, and sums behave like averages.",
        ],
      },
      {
        title: "Reading the picture",
        paragraphs: [
          "Each panel starts from a different source distribution, drawn small at the top. The histogram shows standardised averages, z = (X̄ₙ − μ) / (σ/√n), and the dashed curve is the standard normal N(0, 1). Standardising removes the shrinking spread, so you can watch the shape alone converge.",
          "Skewed sources like the exponential and the 20% coin take longer to look normal than symmetric ones like the uniform. Symmetric sources often look convincing by n = 5.",
        ],
      },
      {
        title: "How it relates to the law of large numbers",
        paragraphs: [
          "The law of large numbers says the average converges to μ. The central limit theorem says how it is spread around μ on the way: normally, with width σ/√n. One gives the destination, the other the shape of the fluctuations.",
        ],
      },
    ],
    formulas: [
      { label: "Standardised mean", formula: "Zₙ = (X̄ₙ − μ) / (σ / √n)" },
      { label: "The theorem", formula: "Zₙ → N(0, 1) in distribution as n → ∞" },
      { label: "Approximate form", formula: "X̄ₙ ≈ N(μ, σ² / n) for large n" },
      { label: "Sums", formula: "X₁ + … + Xₙ ≈ N(nμ, nσ²)" },
    ],
    tryThis: [
      "Start at n = 1. Each histogram is just the source distribution, standardised. Then slide n up slowly and watch them all morph into the same bell.",
      "Compare **Uniform** and **Exponential** at n = 5. The uniform already looks normal; the exponential is still leaning right.",
      "Look at the **Coin (p = 0.2)** panel at small n. Averages of coin flips can only take a few values, so the histogram is spiky until n gets large.",
    ],
  },
];

export const getConcepts = () => CONCEPTS;

export const getConcept = (slug: string) => CONCEPTS.find((c) => c.slug === slug);
