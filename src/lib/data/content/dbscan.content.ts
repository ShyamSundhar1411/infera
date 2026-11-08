import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "DBSCAN finds clusters as regions where points are packed closely together. It works with any shape, decides the number of clusters for you, and labels isolated points as noise.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Picture a crowd at a festival seen from above. Groups of friends stand close together; a few people wander alone. If you can walk from person to person in small steps without crossing empty ground, those people belong to the same group.",
        "Two settings define \"close\": the radius ε and the minimum number of neighbours inside it. A point with enough neighbours is a core point. Clusters grow outwards from core points, and anything unreachable is noise.",
      ],
    },
    {
      title: "How it works",
      steps: [
        "For each point, count the points within radius ε (including itself).",
        "Mark points with at least Min neighbours as core points.",
        "Start a cluster at an unvisited core point and add everything within ε of it.",
        "Keep expanding through any core points you reach.",
        "Points reached but not core are border points; points never reached are noise.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "Each cluster gets its own colour, and noise points are shown in grey. The stats count clusters, core points and noise points.",
        "Turn on Show ε around core points to see the circle each core point uses. Overlapping circles chain into one cluster; a gap wider than ε splits clusters apart.",
      ],
    },
  ],
  tryThis: [
    "On **Moons**, use the defaults. Both crescents are found perfectly, something k-means cannot do.",
    "Shrink Radius (ε) to 0.05. Clusters fragment and most points turn grey.",
    "Grow Radius (ε) to 0.3. The gap between the moons gets bridged and everything merges into one cluster.",
    "On **Circles**, turn on Show ε around core points and tune Radius (ε) until the ring and the centre separate.",
  ],
  maths: [
    { label: "Neighbourhood", formula: "N_ε(p) = { q : ‖p − q‖ ≤ ε }" },
    { label: "Core point", formula: "|N_ε(p)| ≥ minPts" },
    { label: "Reachable", formula: "q is reachable from p if a chain of core points links them, each step ≤ ε" },
    { label: "Noise", formula: "points not reachable from any core point" },
  ],
  strengths: [
    "Finds clusters of any shape.",
    "No need to choose the number of clusters.",
    "Flags outliers as noise automatically.",
  ],
  weaknesses: [
    "Struggles when clusters have different densities.",
    "Sensitive to ε, which depends on the data's scale.",
    "Distance becomes less meaningful in high dimensions.",
  ],
};
