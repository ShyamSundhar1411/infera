import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "K-means splits unlabelled points into k groups by placing k centres and assigning each point to its nearest one. It alternates between assigning points and moving centres until nothing changes.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Imagine opening k coffee shops in a town. Each resident walks to the nearest shop. Then each shop moves to the middle of its own customers. Some residents now have a closer shop, so they switch, and the shops move again.",
        "Eventually nobody switches and the shops stop moving. That settled state is the clustering. It is a good one, but not always the best possible one: it depends on where the shops started.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Choose k starting centres, either random points or spread out with k-means++.",
        "Assign every point to its nearest centre.",
        "Move each centre to the mean of the points assigned to it.",
        "Repeat until no point changes cluster.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "Each point is coloured by its cluster, and the large markers are the centres. The background shows which centre owns each region of the plane, forming straight-edged cells halfway between neighbouring centres.",
        "Step through training to see the two phases alternate. Inertia in the stats is the total squared distance from points to their centres; it can only go down.",
      ],
    },
  ],
  tryThis: [
    "On **Blobs**, set Starting centres to Random points and Clusters (k) to 3. Reset a few times: sometimes two centres end up sharing one blob.",
    "Switch to k-means++ and reset again. Spreading the starts out makes bad outcomes much rarer.",
    "Load **Moons**. K-means cuts the moons with a straight line because it only understands round, compact groups.",
    "On **Blobs**, slide Clusters (k) from 1 to 6 and note the Inertia each time. Look for the elbow where adding clusters stops helping much.",
  ],
  maths: [
    { label: "Assign", formula: "cᵢ = argminⱼ ‖xᵢ − μⱼ‖²" },
    { label: "Update", formula: "μⱼ = (1/|Sⱼ|) Σᵢ∈Sⱼ xᵢ" },
    { label: "Inertia", formula: "J = Σᵢ ‖xᵢ − μ_{cᵢ}‖²" },
    { label: "k-means++", formula: "P(choose x) ∝ D(x)²,   D(x) = distance to nearest chosen centre" },
  ],
  strengths: [
    "Simple, fast and scales to large datasets.",
    "Easy to explain and to visualise.",
    "Always converges, usually in a few steps.",
  ],
  weaknesses: [
    "You must choose k in advance.",
    "Assumes round clusters of similar size.",
    "Results depend on the starting centres.",
  ],
};
