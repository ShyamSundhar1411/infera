export const SITE_NAME = "Infera";
export const SITE_TAGLINE = "Machine learning and statistics you can play with.";
export const SITE_DESCRIPTION =
  "Interactive explainers for machine learning algorithms and probability distributions. Add points, drag them around, change parameters and watch everything redraw live.";
export const REPO_URL = "https://github.com/ShyamSundhar1411/infera";

/** Class and cluster colours as RGB, shared by the canvas and the UI. */
export const CLASS_COLORS: [number, number, number][] = [
  [240, 101, 84], // coral
  [38, 166, 154], // teal
  [108, 117, 240], // indigo
  [232, 170, 50], // amber
  [190, 92, 200], // orchid
  [92, 160, 220], // sky
];

export const NOISE_COLOR: [number, number, number] = [150, 150, 150];

export const rgb = ([r, g, b]: [number, number, number], alpha = 1) =>
  `rgba(${r}, ${g}, ${b}, ${alpha})`;

export const CLASS_NAMES = ["A", "B", "C"];
