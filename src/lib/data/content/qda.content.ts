import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "QDA fits a separate bell-shaped Gaussian to each class, each with its own size, stretch and tilt. Comparing differently shaped clouds produces curved boundaries.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "LDA uses one cookie cutter for every class. QDA gives each class its own: a tight circle for one, a long tilted oval for another. A point belongs to whichever class finds it least surprising.",
        "When a narrow class sits next to a wide one, the wide one wins far out in every direction, and the narrow one only wins close to home. The boundary between them curls into an ellipse, a parabola or a hyperbola.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Compute each class's mean.",
        "Compute each class's own covariance from its points.",
        "Add a small amount to the diagonal (covariance regularisation) so no ellipse collapses.",
        "Set each class prior to its share of the points.",
        "Classify with Bayes' rule using each class's own Gaussian.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "With Show class Gaussians on, every class draws its own ellipses, so you can see one class is round while another is stretched. The background shows the most likely class, shaded by confidence.",
        "Boundaries are quadratic curves. Watch for regions that wrap around a tight class, or for a wide class reappearing far away on the other side of a narrow one.",
      ],
    },
  ],
  tryThis: [
    "On **Circles**, see how the inner class gets a small round Gaussian and the outer a big one. The boundary becomes a ring.",
    "Switch to **Blobs** and drag points of one class into a long diagonal streak. Its ellipse rotates to match and the boundary bends.",
    "Remove points from a class until only three remain, then raise Covariance regularisation. The fragile, thin ellipse inflates to something sensible.",
    "Try **Spiral**. A single Gaussian per class cannot describe a spiral, so QDA's limits show.",
  ],
  maths: [
    { label: "Class model", formula: "p(x | k) = 𝒩(x; μₖ, Σₖ)" },
    { label: "Covariance", formula: "Σₖ = (1/(nₖ − 1)) Σᵢ∈k (xᵢ − μₖ)(xᵢ − μₖ)ᵀ + εI" },
    { label: "Discriminant", formula: "δₖ(x) = −½ log|Σₖ| − ½ (x − μₖ)ᵀ Σₖ⁻¹ (x − μₖ) + log πₖ" },
    { label: "Posterior", formula: "P(k | x) = softmax over k of δₖ(x)" },
  ],
  strengths: [
    "Curved boundaries with no feature engineering.",
    "Adapts to classes with very different spreads.",
    "Closed-form and fast to fit.",
  ],
  weaknesses: [
    "Needs more data than LDA: three covariance numbers per class.",
    "Unstable when a class has very few points.",
    "Still assumes each class is one Gaussian blob.",
  ],
};
