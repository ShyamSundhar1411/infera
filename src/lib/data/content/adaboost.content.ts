import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "AdaBoost combines many weak learners, usually one-split trees, into a strong classifier. Each new learner pays extra attention to the points the previous ones got wrong.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Think of revising for an exam with flashcards. After each round you move the cards you missed to the front, so the next round focuses on them. You only stop worrying about a card once you keep getting it right.",
        "AdaBoost does this with point weights. Misclassified points get heavier, so the next learner is pushed to fix them. Each learner also gets a say in the final vote that grows with its accuracy.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Give every point the same weight.",
        "Fit a small tree that minimises the weighted error.",
        "Compute its weighted error ε and its voting power α (scaled by the learning rate).",
        "Increase the weights of misclassified points, decrease the rest, and renormalise.",
        "Repeat for the chosen number of learners; predict with a weighted vote.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "With Size points by weight on, each point's size shows how much the current round cares about it. Watch the hard points near the boundary swell while easy ones shrink.",
        "The background shows the sign of the weighted vote, shaded by its strength. Because each learner is a stump or a shallow tree, the boundary is built from axis-aligned steps that become finer as learners are added.",
      ],
    },
  ],
  tryThis: [
    "On **Circles** with Learner depth 1, press step a few times. Each stump is a single straight cut, yet together they start to enclose the ring.",
    "Keep Size points by weight on and play to the end. The biggest points are the ones the ensemble still finds hardest.",
    "Set Learning rate to 0.1. Learners get a smaller say, so you need many more of them to reach the same boundary.",
    "Try **XOR** with Learner depth 1 and then 2. A single stump has weighted error near 50% here, so depth 2 helps a lot.",
  ],
  maths: [
    { label: "Weighted error", formula: "ε_m = Σᵢ wᵢ · 1[h_m(xᵢ) ≠ yᵢ]" },
    { label: "Learner weight", formula: "α_m = η · ½ ln((1 − ε_m) / ε_m)" },
    { label: "Reweight", formula: "wᵢ ← wᵢ · exp(α_m · 1[miss] − α_m · 1[hit]),  then normalise" },
    { label: "Final vote", formula: "H(x) = sign(Σₘ α_m h_m(x)),   h_m(x) ∈ {−1, +1}" },
  ],
  strengths: [
    "Turns very weak learners into a strong classifier.",
    "Few hyperparameters and no feature scaling.",
    "Point weights reveal which examples are hard.",
  ],
  weaknesses: [
    "Very sensitive to label noise and outliers.",
    "Learners are sequential, so it is hard to parallelise.",
    "This version handles two classes only.",
  ],
};
