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

## Project structure

```
src/
  app/                    routes and page components
    algorithms/[slug]/    one page per algorithm
    distributions/[slug]/ one page per distribution
    components/           Playground, Distributions, Catalog, Explainer, Landing, Layout
  components/ui/          shared primitives (slider, segmented control, toggle, panel)
  hooks/                  playground state, training loop, distribution lab
  lib/
    ml/                   every model, plus the engine registry
    stats/                densities, exact CDFs, samplers, special functions
    plot/                 canvas renderer and marching-squares contours
    data/                 algorithm and distribution catalogues, datasets, explanations
    types/domain/         shared types
```

Adding an algorithm means writing an `Engine` in `src/lib/ml`, registering it in `engines.ts`, adding its entry and parameters to `algorithms.data.ts`, and writing its explanation in `src/lib/data/content`.
