import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A regression tree chops the x-axis into intervals and predicts the average y inside each one. The result is a staircase that can follow almost any shape.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Think of playing twenty questions with a number line. \"Is x below 0.3?\" Yes. \"Is it below −0.2?\" No. After a few questions you have narrowed x down to a slice, and you predict the typical y in that slice.",
        "Each question is chosen greedily: the tree picks whichever cut makes the two halves as internally consistent as possible, then asks again inside each half.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Start with all points in one group, predicting their mean y.",
        "Try every cut point on x and score it by the total squared error of the two halves.",
        "Keep the best cut and repeat inside each half.",
        "Stop when Max depth is reached or a split would leave fewer than Min points per leaf on a side.",
        "Each final group (a leaf) predicts the mean y of its points.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The curve is a set of flat steps, one per leaf. Every jump marks a split threshold. Count the steps and you get the Leaves figure in the stats.",
        "Turn on Show residuals to see how far each point sits from its step. Deeper trees make more, narrower steps, and the Training MSE drops towards zero as the tree starts memorising noise.",
      ],
    },
  ],
  tryThis: [
    "On **Wave**, set Max depth to 1. You get a single split: two flat steps. Add one level at a time and watch the steps double.",
    "Push Max depth to 10 with Min points per leaf at 1. The steps chase every noisy point. Now raise Min points per leaf to 8 and see the tree pull itself back together.",
    "Try **Line** at depth 3. A straight line becomes a staircase: trees cannot extrapolate a slope.",
    "Load **Outliers**. A stray point only affects its own leaf rather than tilting the whole curve.",
  ],
  maths: [
    { label: "Leaf prediction", formula: "ŷ = (1/|R|) Σᵢ∈R yᵢ" },
    { label: "Split cost", formula: "SSE(L) + SSE(R),   SSE(S) = Σᵢ∈S (yᵢ − ȳ_S)²" },
    { label: "Threshold", formula: "t = midpoint between neighbouring sorted xᵢ values" },
    { label: "Max leaves", formula: "leaves ≤ 2^depth" },
  ],
  strengths: [
    "Handles curves and jumps with no feature engineering.",
    "Robust to outliers: they only affect one leaf.",
    "Easy to explain as a list of rules.",
  ],
  weaknesses: [
    "Predictions are blocky, never smooth.",
    "Cannot extrapolate beyond the training range.",
    "Deep trees overfit and change a lot with small data changes.",
  ],
};
