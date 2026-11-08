import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "LDA models each class as a bell-shaped Gaussian cloud, with every class sharing the same shape and tilt. A new point goes to the class whose cloud explains it best, which gives straight boundaries.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Imagine stamping the same oval cookie cutter onto the plane once per class, centred on that class's average point. To classify a new point, ask which stamp it sits most comfortably inside, allowing for how common each class is.",
        "Because every class uses the identical oval, the curved parts cancel when you compare two classes. What is left is a straight-line boundary, even though the model is built from Gaussians.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Compute the mean of each class.",
        "Measure how points spread around their own class mean, and pool that spread into one shared covariance.",
        "Optionally shrink the shared covariance towards a circle.",
        "Set each class prior to its share of the points.",
        "Classify with Bayes' rule: pick the class with the highest prior × likelihood.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "With Show class Gaussians on, each class gets ellipses around its mean. They all have the same shape and orientation, only the centres differ. The background shows the most probable class, shaded by confidence.",
        "The boundaries are always straight lines. They are not simply halfway between the means: the shared tilt of the ellipses rotates them, and class priors shift them towards the rarer class.",
      ],
    },
  ],
  tryThis: [
    "On **Blobs**, drag the points of one class into a long streak. Every class's ellipse changes shape together, because they all share one covariance.",
    "Load **Circles**. LDA can only draw straight lines, so it fails. Compare with QDA on the same data.",
    "Erase most points from one class until only three or four remain, then raise Shrinkage. The ellipses become rounder and the boundary steadier.",
    "Add many extra points to class A on **Blobs**. The boundary slides towards B as A's prior grows.",
  ],
  maths: [
    { label: "Class model", formula: "p(x | k) = 𝒩(x; μₖ, Σ)" },
    { label: "Shared covariance", formula: "Σ = Σₖ Σᵢ∈k (xᵢ − μₖ)(xᵢ − μₖ)ᵀ / (n − K)" },
    { label: "Shrinkage", formula: "Σ_α = (1 − α) Σ + α · (tr Σ / 2) · I" },
    { label: "Discriminant", formula: "δₖ(x) = xᵀΣ⁻¹μₖ − ½ μₖᵀΣ⁻¹μₖ + log πₖ" },
    { label: "Posterior", formula: "P(k | x) = softmax over k of δₖ(x)" },
  ],
  strengths: [
    "Few parameters, so it works with little data.",
    "Fast, closed-form fit with no tuning loop.",
    "Gives probabilities and interpretable class shapes.",
  ],
  weaknesses: [
    "Boundaries are always straight.",
    "Assumes every class has the same spread.",
    "Sensitive to outliers that distort the means.",
  ],
};
