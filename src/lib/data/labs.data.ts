/**
 * Every interactive lab that can be placed with <Lab id="…" /> in MDX or
 * embedded on another site from /embed/<id>/. `path` is the page the lab
 * lives on, which embeds link back to.
 */
export const LABS = [
  { id: "bayes-theorem", title: "Bayes' theorem: a medical test", path: "/concepts/bayes-theorem/" },
  { id: "ball-bag", title: "Bayes' theorem: two bags of balls", path: "/concepts/bayes-theorem/" },
  { id: "monty-hall", title: "The Monty Hall problem", path: "/concepts/monty-hall/" },
  { id: "bayesian-updating", title: "Bayesian updating with a coin", path: "/concepts/bayesian-updating/" },
  { id: "law-of-large-numbers", title: "The law of large numbers", path: "/concepts/law-of-large-numbers/" },
  { id: "dice", title: "A fair or loaded die", path: "/concepts/law-of-large-numbers/" },
  { id: "central-limit-theorem", title: "The central limit theorem", path: "/concepts/central-limit-theorem/" },
  { id: "galton-board", title: "A Galton board", path: "/concepts/central-limit-theorem/" },
  { id: "monte-carlo", title: "Monte Carlo: estimating pi with darts", path: "/concepts/monte-carlo/" },
  { id: "markov-chains", title: "Markov chains", path: "/concepts/markov-chains/" },
  { id: "mcmc", title: "Markov chain Monte Carlo", path: "/concepts/mcmc/" },
  { id: "hypothesis-testing", title: "Hypothesis testing: is this coin fair?", path: "/concepts/hypothesis-testing/" },
  { id: "confidence-intervals", title: "Confidence intervals", path: "/concepts/confidence-intervals/" },
  { id: "ab-testing", title: "A/B testing and statistical power", path: "/concepts/ab-testing/" },
  { id: "bootstrap", title: "The bootstrap", path: "/concepts/bootstrap/" },
  { id: "simpsons-paradox", title: "Simpson's paradox", path: "/concepts/simpsons-paradox/" },
  { id: "regression-to-the-mean", title: "Regression to the mean", path: "/concepts/regression-to-the-mean/" },
  { id: "birthday-problem", title: "The birthday problem", path: "/concepts/birthday-problem/" },
  { id: "random-walk", title: "Random walks and gambler's ruin", path: "/concepts/random-walk/" },
  { id: "queues", title: "Queues: why busy servers get slow", path: "/concepts/queues/" },
  { id: "maximum-likelihood", title: "Maximum likelihood", path: "/concepts/maximum-likelihood/" },
  { id: "bias-variance", title: "The bias-variance trade-off", path: "/concepts/bias-variance/" },
  { id: "naive-bayes-cards", title: "Naive Bayes with playing cards", path: "/algorithms/naive-bayes/" },
  { id: "coin-flips", title: "Flipping a biased coin: the binomial", path: "/distributions/binomial/" },
  { id: "single-coin", title: "One flip at a time: the Bernoulli", path: "/distributions/bernoulli/" },
  { id: "first-heads", title: "Flip until heads: the geometric", path: "/distributions/geometric/" },
  { id: "arrivals", title: "Random arrivals: Poisson and exponential", path: "/distributions/poisson/" },
] as const;

export type LabId = (typeof LABS)[number]["id"];

export const getLab = (id: string) => LABS.find((lab) => lab.id === id);
