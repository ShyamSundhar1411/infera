import type { Category } from "../types/domain/algorithm.types";

export const getCategories = (): Category[] => [
  {
    id: "regression",
    name: "Regression",
    blurb: "Predict a number. Fit a curve through points and see how flexible each model is.",
  },
  {
    id: "linear",
    name: "Linear classifiers",
    blurb: "Separate classes with a line, or with a line in a richer feature space.",
  },
  {
    id: "probabilistic",
    name: "Probabilistic classifiers",
    blurb: "Model each class as a Gaussian and let Bayes' rule pick the winner.",
  },
  {
    id: "instance",
    name: "Instance-based",
    blurb: "No training at all. Look at the neighbours and copy their answer.",
  },
  {
    id: "trees",
    name: "Trees and ensembles",
    blurb: "Ask yes/no questions about the features, then combine many trees into one strong model.",
  },
  {
    id: "kernels-nets",
    name: "Kernels and neural networks",
    blurb: "Bend the boundary with kernels or learn the features with a network.",
  },
  {
    id: "unsupervised",
    name: "Unsupervised",
    blurb: "No labels. Find groups and directions hiding in the data.",
  },
];
