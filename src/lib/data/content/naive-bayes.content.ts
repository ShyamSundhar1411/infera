import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "Gaussian Naive Bayes models each feature of each class with its own bell curve and treats the features as independent. Bayes' rule then turns those curves into class probabilities.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Suppose you guess someone's sport from their height and weight, but you judge each measurement separately: how typical is this height for a rower, how typical is this weight? Multiply the two answers and you have a score. That shortcut is the \"naive\" part.",
        "In pictures, it means every class gets an ellipse that is lined up with the axes. It can be wide or tall, but never tilted, because tilt would mean the two features move together.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "For each class, compute the mean of x and the mean of y.",
        "Compute the variance of x and of y separately, ignoring any correlation.",
        "Add a little variance smoothing so no bell curve becomes a spike.",
        "Set each class prior to its share of the points.",
        "Score a new point by multiplying the prior with each feature's likelihood, then normalise.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "With Show class Gaussians on, each class shows axis-aligned ellipses: stretched horizontally or vertically, never diagonally. The background shows the most likely class, shaded by confidence.",
        "Because each class has its own variances, the boundaries can curve, just like QDA. The difference is that a diagonal streak of points still gets an upright ellipse.",
      ],
    },
  ],
  tryThis: [
    "On **Blobs**, drag a class into a diagonal line. Its ellipse refuses to tilt; compare with QDA on the same points.",
    "Load **Circles**. Even with the independence assumption, different variances let it draw a closed boundary around the inner class.",
    "Try **XOR**. Each class has two lobes that a single axis-aligned Gaussian cannot capture, so the fit suffers.",
    "Push Variance smoothing to its maximum. Every ellipse swells and the boundaries straighten.",
  ],
  maths: [
    { label: "Bayes' rule", formula: "P(k | x) ∝ πₖ · p(x | k)" },
    { label: "Naive assumption", formula: "p(x | k) = p(x₁ | k) · p(x₂ | k)" },
    { label: "Per-feature Gaussian", formula: "p(xⱼ | k) = 𝒩(xⱼ; μₖⱼ, σ²ₖⱼ + ε)" },
    { label: "Log score", formula: "log πₖ − Σⱼ [ ½ log σ²ₖⱼ + (xⱼ − μₖⱼ)² / (2σ²ₖⱼ) ]" },
  ],
  strengths: [
    "Extremely fast and needs very little data.",
    "Scales gracefully to many features.",
    "A strong baseline, especially for text.",
  ],
  weaknesses: [
    "Ignores correlations between features.",
    "Probabilities are often overconfident.",
    "One Gaussian per class misses multi-lobed shapes.",
  ],
};
