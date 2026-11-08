import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "The perceptron is the simplest learning machine: a straight line that separates two classes. Every time it misclassifies a point, it nudges the line towards getting that point right.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Imagine a referee drawing a chalk line between two teams. Whenever a player is standing on the wrong side, the referee shifts the line a little towards fixing that one mistake. Eventually, if a clean line exists, nobody is on the wrong side.",
        "It only ever reacts to mistakes. Points already on the correct side are ignored, no matter how close to the line they are. That makes it fast, but it also means the final line is just the first one that works, not the best one.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Start with a blank line (all weights zero).",
        "Visit the points in a shuffled order.",
        "If a point is on the wrong side, add it (scaled by the learning rate) to the weights, pointing the line towards its class.",
        "After a full pass, count the mistakes.",
        "Stop when a pass has zero mistakes, or give up after 300 passes.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The line is the current boundary, with class A on one side and class B on the other. The background shading fades near the line and strengthens with distance from it. It is a visual cue, not a true probability: the perceptron only knows which side you are on.",
        "Each animation step is one pass through the data. Mistakes last pass in the stats counts the corrections made; when it hits zero the data has been separated and training stops.",
      ],
    },
  ],
  tryThis: [
    "On **Separable**, press step repeatedly and watch the line jerk into place after a handful of passes.",
    "Load **XOR** and press play. No straight line can separate it, so the line keeps flipping until it hits the pass limit.",
    "On **Separable**, change Learning rate and retrain. Starting from zero, the rate only rescales the weights, so the line follows the same path.",
    "Add a single class A point deep inside class B's side. One mislabelled point is enough to stop convergence.",
  ],
  maths: [
    { label: "Prediction", formula: "ŷ = sign(wᵀx + b),   y ∈ {−1, +1}" },
    { label: "Mistake", formula: "yᵢ (wᵀxᵢ + b) ≤ 0" },
    { label: "Update", formula: "w ← w + η yᵢ xᵢ,   b ← b + η yᵢ" },
    { label: "Distance to line", formula: "d(x) = (wᵀx + b) / ‖w‖" },
  ],
  strengths: [
    "Tiny, fast and easy to understand.",
    "Guaranteed to converge if the classes are linearly separable.",
    "The ancestor of every modern neural network.",
  ],
  weaknesses: [
    "Only straight boundaries, only two classes.",
    "Never settles if the data is not separable.",
    "Stops at any working line, not the widest-margin one.",
  ],
};
