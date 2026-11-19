export const SITE_NAME = "Infera";
export const SITE_TAGLINE = "Machine learning and statistics you can play with.";
export const SITE_DESCRIPTION =
  "Learn machine learning and statistics by playing with them: 20 algorithms that train on points you place, 13 distributions, and simulations from Bayes to MCMC.";
export const REPO_URL = "https://github.com/ShyamSundhar1411/infera";

/** Public address of the site, used for canonical links, the sitemap and link previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://infera.shyamsundhar.com").replace(/\/$/, "");

/** Topics the whole site covers, for search engines. */
export const SITE_KEYWORDS = [
  "interactive machine learning",
  "machine learning visualization",
  "explorable explanations",
  "learn machine learning interactively",
  "probability distributions visualizer",
  "statistics simulator",
  "decision boundary visualization",
  "PDF and CDF calculator",
  "Bayes theorem explained",
  "central limit theorem simulation",
  "Monte Carlo simulation",
  "MCMC visualization",
  "machine learning in the browser",
];

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
