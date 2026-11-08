import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "Logistic regression gives each class a linear score and turns those scores into probabilities. It learns the scores by gradient descent, making the true class more likely at every step.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Think of each class as a candidate in an election, with a score that rises as you move in its favoured direction across the plane. Softmax converts the scores into vote shares that add up to one. Where two candidates tie, you get the boundary.",
        "On its own the score is linear, so boundaries are straight lines. Feed it extra features like x², xy and y², and the same linear model can draw circles, ellipses and curves in the original plane.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Start with all weights at zero, so every class has equal probability everywhere.",
        "Compute each point's predicted probabilities with softmax.",
        "Measure the log loss: how surprised the model is by the true labels.",
        "Compute the gradient over all points at once and step the weights downhill by the learning rate.",
        "Repeat until the gradient is tiny or the epoch limit is reached.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The background colour shows the most likely class, and its strength shows confidence. Pale bands mark places where the model is unsure. The boundary line is where two classes are equally likely.",
        "Press play to watch the boundary rotate and slide into place. Log loss in the stats should fall steadily; if it bounces around, the learning rate is too high.",
      ],
    },
  ],
  tryThis: [
    "On **Blobs**, press play and watch the boundaries settle. Then add a class C point deep in A's territory and see how far it can pull the line.",
    "Switch to **Circles** with Feature degree 1. No straight line works. Set Feature degree to 2 and the boundary becomes a ring.",
    "Try **XOR** at Feature degree 2. The xy feature alone is enough to solve it.",
    "On **Moons**, set Feature degree to 6 and Regularisation (λ) to the far left, then slide λ up. Watch an overly twisty boundary smooth out.",
  ],
  maths: [
    { label: "Features", formula: "φ(x) = [1, x₁, x₂, x₁², x₁x₂, x₂², …]" },
    { label: "Scores", formula: "zₖ = wₖᵀ φ(x)" },
    { label: "Softmax", formula: "P(y = k | x) = e^{zₖ} / Σⱼ e^{zⱼ}" },
    { label: "Loss", formula: "L = −(1/n) Σᵢ log P(yᵢ | xᵢ) + (λ/2) Σ ‖wₖ‖²   (bias not penalised)" },
    { label: "Gradient step", formula: "wₖ ← wₖ − η [ (1/n) Σᵢ (pᵢₖ − 1[yᵢ = k]) φ(xᵢ) + λwₖ ]" },
  ],
  strengths: [
    "Outputs calibrated-looking probabilities, not just labels.",
    "Weights are interpretable and training is stable.",
    "Feature expansion makes it surprisingly flexible.",
  ],
  weaknesses: [
    "Linear in its features: curves need hand-made features.",
    "High feature degrees overfit without regularisation.",
    "Gradient descent can be slow with a poor learning rate.",
  ],
};
