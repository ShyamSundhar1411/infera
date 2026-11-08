import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "Principal component analysis finds the directions along which the data varies most. Keeping only the top direction lets you describe each point with a single number while losing as little as possible.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Imagine photographing a long, thin pencil. From the side you see its full length; from the end you see a dot. PCA finds the side-on view: the angle that shows the most spread.",
        "That best direction is the first principal component, PC1. The second, PC2, is at right angles to it and captures whatever spread is left. Dropping PC2 squashes every point onto a line, the simplest possible summary.",
      ],
    },
    {
      title: "How it works",
      steps: [
        "Centre the data by subtracting the mean point.",
        "Compute the 2 × 2 covariance matrix of x and y.",
        "Find its eigenvectors (the directions) and eigenvalues (the variance along each).",
        "Sort them: the largest eigenvalue gives PC1, the other gives PC2.",
        "Project each point onto PC1 to get its one-number summary.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "Two arrows start at the mean: PC1 along the longest spread and PC2 at right angles to it. Their lengths reflect how much variance each direction holds.",
        "With Project onto PC1 on, each point is joined to its shadow on the PC1 line. Those short segments are the information PCA throws away; the stats show what share of the variance PC1 keeps.",
      ],
    },
  ],
  tryThis: [
    "On **Ellipse**, drag points to rotate the cloud and watch PC1 turn with it. The PC1 angle in the stats follows along.",
    "Make the cloud rounder by dragging points outwards along PC2. PC1 explains less and less as the shape approaches a circle.",
    "Try **Blobs**. PC1 runs through the clusters, showing PCA ignores labels and only cares about spread.",
    "Drag one point far away from the rest. A single outlier can swing PC1 towards it.",
  ],
  maths: [
    { label: "Covariance", formula: "Σ = (1/(n − 1)) Σᵢ (xᵢ − μ)(xᵢ − μ)ᵀ" },
    { label: "Components", formula: "Σ vⱼ = λⱼ vⱼ,   λ₁ ≥ λ₂" },
    { label: "Explained variance", formula: "λ₁ / (λ₁ + λ₂)" },
    { label: "Projection", formula: "zᵢ = v₁ᵀ (xᵢ − μ)" },
    { label: "Reconstruction", formula: "x̂ᵢ = μ + zᵢ v₁" },
  ],
  strengths: [
    "Fast, exact and has no hyperparameters.",
    "Compresses data while keeping the most variance.",
    "Useful for visualising and de-noising.",
  ],
  weaknesses: [
    "Only finds straight-line directions.",
    "Sensitive to outliers and to feature scaling.",
    "Most spread is not always most useful.",
  ],
};
