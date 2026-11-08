import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A support vector machine finds the boundary that leaves the widest possible gap between two classes. With a kernel, that boundary can bend into curves and rings.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Picture building a road between two villages and making it as wide as you can without bulldozing any houses. The houses touching the kerb fix where the road goes; every other house could move and nothing would change. Those kerb houses are the support vectors.",
        "A kernel lets the SVM measure similarity in a richer way, as if the points had been lifted into extra dimensions where a straight road works. Back on the flat canvas, that straight road shows up as a curve.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Give every point a weight αᵢ, starting at zero.",
        "Pick a pair of points that break the optimality conditions.",
        "Adjust their two weights together so the margin improves while the constraints still hold (this is SMO).",
        "Repeat until a few full passes make no changes.",
        "Points left with non-zero weight are the support vectors; only they shape the boundary.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The solid line is the decision boundary. With Show margins on, two fainter lines mark the edges of the street, where the decision score is +1 and −1. Support vectors are the points on or inside those edges, and the stats count them.",
        "The background colour shows which side you are on, shaded by how far from the boundary. With the Linear kernel the stats also report the margin width.",
      ],
    },
  ],
  tryThis: [
    "Switch to **Separable** and set Kernel to Linear. Drag a point that is far from the boundary: nothing changes. Drag a support vector and the whole street moves.",
    "On **Circles**, compare Linear with RBF (Gaussian). The RBF boundary wraps neatly around the inner ring.",
    "With RBF, push Gamma (γ) up to 50. Each point gets a tiny bubble of influence and the boundary turns blobby and overfitted.",
    "Lower C (softness) to 0.05 on **Moons**. The street widens and lets some points sit inside it. Raise C to 100 and it fights every mistake.",
  ],
  maths: [
    { label: "Decision", formula: "f(x) = Σᵢ αᵢ yᵢ K(xᵢ, x) + b,   ŷ = sign f(x)" },
    { label: "Constraints", formula: "0 ≤ αᵢ ≤ C,   Σᵢ αᵢ yᵢ = 0" },
    { label: "RBF kernel", formula: "K(x, x′) = exp(−γ ‖x − x′‖²)" },
    { label: "Polynomial kernel", formula: "K(x, x′) = (γ xᵀx′ + 1)ᵈ" },
    { label: "Margin width", formula: "2 / ‖w‖,   w = Σᵢ αᵢ yᵢ xᵢ (linear kernel)" },
  ],
  strengths: [
    "Maximum margin gives good generalisation.",
    "Kernels give flexible boundaries without explicit features.",
    "Only the support vectors matter at prediction time.",
  ],
  weaknesses: [
    "C and γ need careful tuning.",
    "Training scales poorly to very large datasets.",
    "No native probabilities, and this version is two-class only.",
  ],
};
