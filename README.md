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

**Concepts (19)**

- Bayes' theorem: a medical-test simulator on a grid of 1,000 people, with the formula filled in live
- Bayesian updating: flip a hidden coin and watch a Beta posterior and its credible interval sharpen
- Law of large numbers: running averages converging on E[X], and the Cauchy distribution refusing to
- Central limit theorem: standardised averages of four very different distributions turning into N(0, 1), plus a Galton board
- Monty Hall: find the ace among face-down cards, with a host who does or does not know where it is
- Monte Carlo: estimate pi and an integral by throwing random darts, with the error funnel shrinking like 1/sqrt(n)
- MCMC: a Metropolis-Hastings random walk over three 2-D targets, with trace plot, acceptance rate and burn-in
- Markov chains: a weather chain and a mini PageRank, converging to the stationary distribution
- Hypothesis testing, confidence intervals and A/B testing: p-values under the null, interval coverage, power and the cost of peeking
- Bootstrap, maximum likelihood and the bias-variance trade-off
- Simpson's paradox, regression to the mean and the birthday problem
- Random walks and gambler's ruin, and queues: why waiting time explodes as a server gets busy

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

## Embedding labs

Every lab can be embedded on another site from `/embed/<lab>/`. Each lab on the site has an **Embed this lab** button with a ready-to-paste iframe, and `?theme=light` or `?theme=dark` forces a colour scheme to match the host page. Embed pages link back to the lab's explainer, are kept out of search results (`noindex`, disallowed in `robots.txt`, canonical to the explainer), and publish oEmbed at `/oembed/<lab>.json`, so pasting an embed link into Ghost, Notion and similar tools shows the live lab. The list of labs and the page each belongs to is `src/lib/data/labs.data.ts`.

## Analytics

Build with `NEXT_PUBLIC_GA_ID=G-XXXXXXX` to turn on Google Analytics; without it nothing is loaded. Besides page views (and GA's built-in outbound-click tracking), the site records `embed_view` and `embed_copied`, `playground_used`, `distribution_lab_used` and `lab_used` the first time a reader interacts with a lab, and forwards Topple scene actions as `scene_*` events (plays, finishes, what-ifs, breaks), from the `topple-action` events the player emits. The Topple plugin itself sends nothing.

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

Concept files also need `name`, `tagline` and `order` in the frontmatter, and can embed a live lab anywhere with `<Lab id="bayes-theorem" />`. `<Lab>` works in algorithm and distribution files too; the ids are listed in `src/app/components/Concepts/concept-lab.tsx`. Other components available in MDX: `<Formulas>`, `<Formula label>`, `<Callout title>`, `<ProsCons>`, `<Card>` and `<Embed url caption>`.

`<Embed url="…" />` embeds any page that publishes an oEmbed discovery link, such as a Topple scene. It is resolved at build time and only keeps an iframe that points back at the page's own site; anything that cannot be resolved becomes a link card, so a missing page never breaks the build.

### Plugins and Topple scenes

`src/plugins` holds optional plugins that add to the MDX vocabulary. A plugin can claim a fenced code block's language; remove it from `src/plugins/index.ts` and those blocks show as plain code.

The Topple plugin plays a [Topple](https://topple.shyamsundhar.com) scene written right in the page, so nothing has to exist in Topple's catalogue:

````mdx
```topple caption="One server, random arrivals." height=520
title: Why a busy server's queue explodes
node users "Visitors" icon=users
node app "App server" icon=server capacity=100
users -> app rate=50
```
````

Options after the language become player attributes (`height` and `caption` are handled by Infera). The player comes from the [`topple-player`](https://www.npmjs.com/package/topple-player) package and is loaded as its own chunk only when a scene scrolls near the viewport; update it with `yarn upgrade topple-player`.

Run `yarn check:content` after editing. It compiles every file with strict KaTeX and flags maths written as plain Unicode instead of LaTeX.

The playground can hold out 30% of points as a test set (shown hollow). **Test model** compares training and test scores against a nearest-neighbour baseline and calls the fit good, underfitting or overfitting.

## Project structure

```
src/
  app/                    routes and page components
    (site)/               pages with the header and footer
      algorithms/[slug]/    one page per algorithm
      distributions/[slug]/ one page per distribution
      concepts/[slug]/      one page per concept
    (embed)/embed/[lab]/  bare lab pages for embedding elsewhere
    og/                   link preview images, /og/<section>/<slug>.png
    oembed/               oEmbed JSON for each lab
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
