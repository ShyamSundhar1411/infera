import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "KNN regression predicts a value by looking up the k training points with the closest x and averaging their y. There is no equation to fit: the data itself is the model.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Guessing the price of a house? Look at the few most similar houses that sold recently and take their average. That is the whole algorithm.",
        "Here similarity means distance along the x-axis. The number of neighbours, k, controls the trade-off: a few neighbours copy local detail, many neighbours blur it into a smooth trend.",
      ],
    },
    {
      title: "How it works",
      steps: [
        "Store every training point. That is the entire training phase.",
        "To predict at some x, measure the horizontal distance to every stored point.",
        "Keep the k closest ones.",
        "Average their y values, either equally or weighting closer neighbours more heavily.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The curve is the prediction at every x across the canvas. With Equal weighting it is a staircase: the prediction only changes when a new point enters the set of k nearest. With By distance weighting the steps soften and the curve passes through each training point.",
        "Turn on Show residuals to see the vertical gaps between points and the curve. Training MSE in the stats is the mean of their squares.",
      ],
    },
  ],
  tryThis: [
    "On **Wave**, set Neighbours (k) to 1. The curve jumps to every point's height and copies all the noise.",
    "Now slide Neighbours (k) up to 30. The wave flattens out, because each prediction now averages over a big chunk of the axis.",
    "Switch Weighting to By distance with k around 10. The curve goes through every point again but stays smooth in between.",
    "Load **Outliers** and compare k = 1 with k = 9. Larger k quietly outvotes the strays.",
  ],
  maths: [
    { label: "Neighbours", formula: "N_k(x) = the k training points with smallest |x − xᵢ|" },
    { label: "Equal weights", formula: "ŷ(x) = (1/k) Σᵢ∈N_k yᵢ" },
    { label: "Distance weights", formula: "ŷ(x) = Σ wᵢyᵢ / Σ wᵢ,   wᵢ = 1 / |x − xᵢ|" },
    { label: "Training MSE", formula: "MSE = (1/n) Σᵢ (yᵢ − ŷ(xᵢ))²" },
  ],
  strengths: [
    "No assumptions about the shape of the curve.",
    "One intuitive knob: k.",
    "Adding data is instant, with no retraining.",
  ],
  weaknesses: [
    "Every prediction scans the whole dataset.",
    "Flattens out beyond the edges of the data.",
    "Struggles when there are many input features.",
  ],
};
