import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "K-nearest neighbours classifies a point by finding the k closest training points and letting them vote. There is no training step: the stored data is the model.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Moving to a new town and wondering which football team to support? Ask your nearest neighbours and go with the majority. KNN does exactly that for every spot on the canvas.",
        "The choice of k sets the personality. With k = 1 the model trusts the single closest point and copies every quirk. With a large k it consults a crowd and only sees the broad picture.",
      ],
    },
    {
      title: "How it works",
      steps: [
        "Store all labelled points.",
        "For a query point, measure its distance to every stored point using the chosen metric.",
        "Keep the k closest.",
        "Count their votes per class, optionally weighting closer neighbours more.",
        "Predict the class with the most votes; the vote shares act as probabilities.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "Every pixel of the background is classified by its own neighbour vote. Strong colour means a unanimous vote; pale colour means a split decision. Small k gives jagged boundaries and little islands; large k gives smooth ones.",
        "Leave-one-out accuracy in the stats judges each point by its neighbours with the point itself removed. It is a fairer score than training accuracy, which would be perfect at k = 1.",
      ],
    },
  ],
  tryThis: [
    "On **Moons**, set Neighbours (k) to 1 and look for tiny islands around noisy points. Then raise k to 15 and watch them dissolve.",
    "Change Distance from Euclidean to Manhattan, then Chebyshev. The boundary turns more angular, because the \"circle\" of equal distance becomes a diamond and then a square.",
    "With k = 15, set Vote weighting to By distance. Points right next to a training point now follow it, even inside enemy territory.",
    "Push k to 30 on **Spiral**. The arms blur together and Leave-one-out accuracy drops.",
  ],
  maths: [
    { label: "Euclidean", formula: "d = √(Δx² + Δy²)" },
    { label: "Manhattan", formula: "d = |Δx| + |Δy|" },
    { label: "Chebyshev", formula: "d = max(|Δx|, |Δy|)" },
    { label: "Vote", formula: "P(k | x) = Σᵢ∈N wᵢ · 1[yᵢ = k] / Σᵢ∈N wᵢ" },
    { label: "Weights", formula: "wᵢ = 1 (equal)   or   wᵢ = 1 / dᵢ (by distance)" },
  ],
  strengths: [
    "No training and no assumptions about boundary shape.",
    "Naturally handles any number of classes.",
    "Easy to explain: look at the neighbours.",
  ],
  weaknesses: [
    "Prediction is slow: every query scans all the data.",
    "Sensitive to feature scaling and the choice of metric.",
    "Degrades badly in high dimensions.",
  ],
};
