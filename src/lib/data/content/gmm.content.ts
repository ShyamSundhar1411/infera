import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A Gaussian mixture model explains the data as a blend of k bell-shaped clouds, each with its own centre, size and tilt. Points belong to clusters softly, with a probability for each.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "K-means draws hard borders and assumes round clusters. A mixture model is more diplomatic: a point halfway between two clouds can be 50% one and 50% the other, and each cloud can stretch and rotate to fit its points.",
        "Think of overlapping spotlights on a stage. Each point is lit by every spotlight to some degree, and the brightest one claims it. The model keeps adjusting the spotlights until they explain the points as well as possible.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Start with k round Gaussians placed by k-means++.",
        "E-step: for every point, compute how responsible each Gaussian is for it.",
        "M-step: refit each Gaussian's weight, mean and covariance to the points, weighted by those responsibilities.",
        "Repeat until the average log-likelihood stops improving.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "With Show ellipses on, each component draws ellipses that show its shape and orientation. Watch them start as small circles and stretch to fit the data as training runs.",
        "Points take the colour of their most responsible component. The background is shaded by responsibility, so pale bands show where components overlap and the model is genuinely unsure.",
      ],
    },
  ],
  tryThis: [
    "On **Stretched**, press play and watch round starting circles turn into long tilted ellipses. K-means would cut these clusters wrongly.",
    "Step one iteration at a time. Each step reassigns responsibilities, then refits every ellipse to its share of the points.",
    "Set Components (k) to 1, then 6. With too many components, some ellipses split a real cluster or shrink onto a handful of points.",
    "Try **Moons**. Each moon is not one Gaussian, so the model needs extra components to approximate the curve.",
  ],
  maths: [
    { label: "Mixture", formula: "p(x) = Σⱼ πⱼ 𝒩(x; μⱼ, Σⱼ)" },
    { label: "E-step", formula: "rᵢⱼ = πⱼ 𝒩(xᵢ; μⱼ, Σⱼ) / Σₗ πₗ 𝒩(xᵢ; μₗ, Σₗ)" },
    { label: "M-step", formula: "Nⱼ = Σᵢ rᵢⱼ,   πⱼ = Nⱼ/n,   μⱼ = (1/Nⱼ) Σᵢ rᵢⱼ xᵢ" },
    { label: "Covariance", formula: "Σⱼ = (1/Nⱼ) Σᵢ rᵢⱼ (xᵢ − μⱼ)(xᵢ − μⱼ)ᵀ" },
    { label: "Objective", formula: "(1/n) Σᵢ log p(xᵢ), never decreases" },
  ],
  strengths: [
    "Soft assignments express uncertainty.",
    "Handles stretched, tilted and overlapping clusters.",
    "Gives a full density model of the data.",
  ],
  weaknesses: [
    "You must choose k in advance.",
    "Can get stuck in poor local optima.",
    "Components can collapse onto a few points.",
  ],
};
