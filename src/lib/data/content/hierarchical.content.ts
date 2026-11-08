import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "Hierarchical clustering starts with every point on its own and repeatedly merges the two closest groups. The full merge history forms a tree called a dendrogram, which you can cut at any height to get clusters.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Think of a family tree in reverse. Siblings join first, then cousins, then whole branches of the family, until everyone is one big clan. Nothing is decided up front; you build the whole tree and choose afterwards how coarsely to group.",
        "The linkage rule decides what \"closest groups\" means. Measure from the nearest pair of points, the furthest pair, the average pair, or by how much merging would increase the spread (Ward), and you get very different trees.",
      ],
    },
    {
      title: "How it works",
      steps: [
        "Put every point in its own cluster and compute all pairwise distances.",
        "Find the two closest clusters and merge them, recording the merge height.",
        "Update the distances from the new cluster to every other one using the Lance-Williams formula.",
        "Repeat until a single cluster remains.",
        "Cut the dendrogram at the height that leaves the chosen number of clusters.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "Points are coloured by the cluster they fall into after the cut. Alongside the canvas, the dendrogram shows every merge: the height of each join is how far apart the two groups were, and the horizontal cut line marks where the tree is sliced.",
        "Long vertical gaps in the dendrogram are a hint that a natural cluster boundary exists there. The stats show the cut height and the total number of merges.",
      ],
    },
  ],
  tryThis: [
    "On **Blobs** with Ward linkage, slide Clusters (cut) from 1 to 8 and watch the cut line move down the dendrogram.",
    "Switch to **Moons** and set Linkage to Single. It chains along each crescent and separates them where Ward cannot.",
    "Still on **Moons**, add one point in the gap between the crescents. Single linkage may now merge them: one bridge is enough.",
    "Compare Complete and Average on **Stretched**. Complete prefers compact groups and may chop a long cluster in two.",
  ],
  maths: [
    { label: "Single", formula: "d(A, B) = min ‖a − b‖" },
    { label: "Complete", formula: "d(A, B) = max ‖a − b‖" },
    { label: "Average", formula: "d(A, B) = (1 / |A||B|) Σ ‖a − b‖" },
    { label: "Lance-Williams (Ward)", formula: "d(i∪j, k) = [(nᵢ+nₖ) dᵢₖ + (nⱼ+nₖ) dⱼₖ − nₖ dᵢⱼ] / (nᵢ+nⱼ+nₖ)" },
    { label: "Cut", formula: "k clusters = undo the last k − 1 merges" },
  ],
  strengths: [
    "No need to fix k before clustering.",
    "The dendrogram shows structure at every scale.",
    "Linkage choice adapts it to different cluster shapes.",
  ],
  weaknesses: [
    "Slow: at least quadratic in the number of points.",
    "Merges are greedy and never undone.",
    "Single linkage chains; Ward assumes compact blobs.",
  ],
};
