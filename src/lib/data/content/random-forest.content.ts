import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A random forest trains many decision trees, each on a slightly different version of the data, and averages their votes. Individual trees are noisy, but their errors largely cancel out.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Ask one person to guess the number of sweets in a jar and they may be way off. Ask a hundred people and average the guesses, and you are usually close. That only works if people make different mistakes.",
        "A forest forces its trees to disagree in two ways. Each tree may see a random resample of the data, and at each split it is only allowed to consider one randomly chosen feature (x or y). Diverse trees, averaged, give a steadier answer than any one of them.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "For each tree, draw a bootstrap sample: n points picked with replacement.",
        "Grow a decision tree on that sample using Gini impurity.",
        "At every split, pick x or y at random and find the best cut on that feature only.",
        "Repeat for the chosen number of trees.",
        "To predict, average the class probabilities from all trees.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The background blends the votes of every tree. Strong colour means the trees agree; pale bands show where they split their votes. The boundary is still built from axis-aligned pieces, but it is far smoother than a single tree's.",
        "With Bootstrap samples on, about a third of the points are left out of each tree. Out-of-bag accuracy scores each point using only the trees that never saw it, which gives a fair test score for free.",
      ],
    },
  ],
  tryThis: [
    "On **Moons**, set Number of trees to 1. You see one jagged tree. Slide it up to 60 and watch the boundary smooth out.",
    "Compare Training accuracy with Out-of-bag accuracy. Training is near perfect; out-of-bag tells you what to actually expect.",
    "Turn off Bootstrap samples. Trees now differ only in their random feature choices, so they agree more and the shading becomes harder-edged.",
    "Try **Spiral** with Max depth 12. Forests can follow complex shapes that would make a single tree overfit badly.",
  ],
  maths: [
    { label: "Bootstrap", formula: "Dₜ = n draws with replacement from D" },
    { label: "Left out", formula: "P(point not in Dₜ) = (1 − 1/n)ⁿ ≈ 1/e ≈ 37%" },
    { label: "Prediction", formula: "P(k | x) = (1/T) Σₜ Pₜ(k | x)" },
    { label: "Out-of-bag", formula: "score xᵢ with only the trees where xᵢ ∉ Dₜ" },
  ],
  strengths: [
    "Accurate out of the box with little tuning.",
    "Hard to overfit by adding more trees.",
    "Out-of-bag accuracy gives built-in validation.",
  ],
  weaknesses: [
    "Loses the readability of a single tree.",
    "Many trees cost memory and prediction time.",
    "Boundaries remain axis-aligned underneath.",
  ],
};
