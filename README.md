# Infera

Machine learning and statistics you can play with.

Infera is a set of interactive explainers. Every algorithm page opens on a live canvas: click to add points, drag them around, switch datasets and change parameters, and the model retrains and redraws instantly. Every distribution page lets you move the parameters, shade an interval to read off a probability, and draw samples to watch the histogram (or the Central Limit Theorem) take shape.

All models are written from scratch in TypeScript and run in the browser. No ML libraries, no backend.

## What's inside

**Algorithms (20)**

- Regression: linear and polynomial (ridge), KNN regression, regression tree, gradient boosting
- Linear classifiers: logistic regression (softmax, polynomial features), perceptron
- Probabilistic: LDA, QDA, Gaussian naive Bayes
- Instance-based: k-nearest neighbours
- Trees and ensembles: decision tree (with tree diagram), random forest (out-of-bag accuracy), AdaBoost
- Kernels and networks: SVM (linear, RBF, polynomial kernels via SMO), neural network (backprop + Adam)
- Unsupervised: k-means, Gaussian mixture (EM), DBSCAN, hierarchical clustering (with dendrogram), PCA

**Distributions (13)**

- Discrete: Bernoulli, binomial, geometric, Poisson, discrete uniform
- Continuous: uniform, normal, exponential, gamma, beta, chi-squared, Student's t, log-normal

Each has its PMF/PDF, CDF, expectation, variance, formulas, a sampler and a sample-means (CLT) mode.

**Concepts (7)**

- Bayes' theorem: a medical-test simulator on a grid of 1,000 people, with the formula filled in live
- Bayesian updating: flip a hidden coin and watch a Beta posterior and its credible interval sharpen
- Law of large numbers: running averages converging on E[X], and the Cauchy distribution refusing to
- Central limit theorem: standardised averages of four very different distributions turning into N(0, 1), plus a Galton board
- Monty Hall: find the ace among face-down cards, with a host who does or does not know where it is
- Monte Carlo: estimate pi and an integral by throwing random darts, with the error funnel shrinking like 1/sqrt(n)
- MCMC: a Metropolis-Hastings random walk over three 2-D targets, with trace plot, acceptance rate and burn-in

**Hands-on scenarios**, embedded in the pages they explain:

- Two bags of red and blue balls picked by a weighted coin (Bayes' theorem)
- A standard deck and a trick deck shuffled together, sorted by a card-counting classifier (naive Bayes)
- A biased coin flipped n times (binomial and Bernoulli), or until the first head (geometric)
- A fair or loaded die (discrete uniform, law of large numbers)
- A Galton board of pegs and bins (central limit theorem, normal)
- A live stream of random arrivals, counted per minute and timed between (Poisson, exponential)

## Running locally

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # static export to ./out
yarn lint
yarn typecheck
```

## Deploying

The site is a fully static export (`output: "export"`), so it runs anywhere.

- **Vercel:** import the repo with the default settings. Nothing else is needed.
- **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo settings, set Pages to deploy from GitHub Actions. The workflow reads the base path from Pages, so it works both on a custom domain and on `<user>.github.io/infera`.

## Writing content

Every explainer is an MDX file in `content/`:

```
content/
  algorithms/<slug>.mdx      text under each algorithm playground
  distributions/<slug>.mdx   text under each distribution lab
  concepts/<slug>.mdx        whole concept pages (a new file = a new page)
```

Each file starts with frontmatter and then plain Markdown. Maths is LaTeX, rendered by KaTeX: `$\sigma/\sqrt{n}$` inline, `$$ … $$` for display.

```mdx
---
summary: "One or two sentences shown under the page title."
---

## The idea

The spread of the average shrinks like $\sigma/\sqrt{n}$.

<Formulas>
<Formula label="Sample mean">

$$
\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i
$$

</Formula>
</Formulas>
```

Concept files also need `name`, `tagline` and `order` in the frontmatter, and can embed a live lab anywhere with `<Lab id="bayes-theorem" />`. `<Lab>` works in algorithm and distribution files too; the ids are listed in `src/app/components/Concepts/concept-lab.tsx`. Other components available in MDX: `<Formulas>`, `<Formula label>`, `<Callout title>`, `<ProsCons>` and `<Card>`.

Run `yarn check:content` after editing. It compiles every file with strict KaTeX and flags maths written as plain Unicode instead of LaTeX.

The playground can hold out 30% of points as a test set (shown hollow). **Test model** compares training and test scores against a nearest-neighbour baseline and calls the fit good, underfitting or overfitting.

## Project structure

```
src/
  app/                    routes and page components
    algorithms/[slug]/    one page per algorithm
    distributions/[slug]/ one page per distribution
    concepts/[slug]/      one page per concept
    components/           Playground, Distributions, Concepts, Catalog, Explainer, Landing, Layout
  components/ui/          shared primitives (slider, segmented control, toggle, panel)
  hooks/                  playground state, training loop, distribution lab
  lib/
    ml/                   every model, plus the engine registry
    stats/                densities, exact CDFs, samplers, special functions
    plot/                 canvas renderer and marching-squares contours
    data/                 algorithm and distribution catalogues, datasets
    mdx/                  MDX loader (KaTeX, GFM)
    types/domain/         shared types
```

Adding an algorithm means writing an `Engine` in `src/lib/ml`, registering it in `engines.ts`, adding its entry and parameters to `algorithms.data.ts`, and writing its explanation in `content/algorithms/<slug>.mdx`.
