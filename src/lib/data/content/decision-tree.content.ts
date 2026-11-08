import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A decision tree classifies by asking a sequence of yes/no questions like \"is x below 0.2?\". Each answer narrows things down until a leaf gives the prediction.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "It works like a flowchart a doctor might follow: is the temperature high? Is there a rash? Each question splits the patients into two groups that are more alike than before.",
        "On the canvas every question is a vertical or horizontal cut. Stack enough cuts and you can carve out almost any shape, as long as you are happy to build it from rectangles.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Start with all points in one box.",
        "Try every cut on x and on y, halfway between neighbouring points.",
        "Score each cut by how pure the two sides are, using Gini impurity or entropy.",
        "Keep the best cut and repeat inside each half.",
        "Stop when Max depth is reached, a box is pure, or a cut would leave fewer than Min points per leaf.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The background is a patchwork of axis-aligned rectangles, one per leaf. Each is coloured by its majority class, and the shading reflects how mixed that leaf is: a leaf with 9 A points and 1 B point is less confident than a pure one.",
        "The stats report the depth actually used and the number of leaves. Training accuracy climbs towards 100% as the tree deepens, but that is often memorisation, not learning.",
      ],
    },
  ],
  tryThis: [
    "On **Moons**, set Max depth to 1. One straight cut. Increase it a level at a time and watch the staircase boundary form.",
    "Push Max depth to 12 and look for thin slivers wrapped around single noisy points. Raise Min points per leaf to 5 to prune them away.",
    "Load **Circles**. A round boundary has to be approximated with many little steps.",
    "Toggle Split criterion between Gini impurity and Entropy. The boundaries are usually almost identical.",
  ],
  maths: [
    { label: "Gini impurity", formula: "G = 1 − Σₖ pₖ²" },
    { label: "Entropy", formula: "H = −Σₖ pₖ log₂ pₖ" },
    { label: "Split score", formula: "(n_L · I(L) + n_R · I(R)) / n   (lower is better)" },
    { label: "Leaf prediction", formula: "P(k | leaf) = n_k / n_leaf" },
  ],
  strengths: [
    "Readable: you can follow the rules by hand.",
    "No feature scaling needed; handles mixed data types.",
    "Captures interactions and non-linear boundaries.",
  ],
  weaknesses: [
    "Overfits easily when grown deep.",
    "Unstable: a small data change can rebuild the tree.",
    "Boundaries are blocky and axis-aligned.",
  ],
};
