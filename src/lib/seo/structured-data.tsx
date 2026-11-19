import { REPO_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { AUTHOR, AUTHOR_SAME_AS } from "@/lib/data/author.data";

// schema.org data for search engines. Everything hangs off a few stable ids,
// so the site, every explainer and the author link up into one graph.

const SITE_ID = `${SITE_URL}/#website`;

const person = {
  "@type": "Person",
  "@id": AUTHOR.id,
  name: AUTHOR.name,
  alternateName: AUTHOR.alternateName,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  sameAs: AUTHOR_SAME_AS,
};

/** The site and its author. Goes on every page. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": AUTHOR.id },
        publisher: { "@id": AUTHOR.id },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any modern web browser",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Machine learning models trained live in the browser on points you place",
          "Probability distributions with PMF, PDF, CDF, intervals and sampling",
          "Simulations of Bayes' theorem, the law of large numbers, the central limit theorem, Monte Carlo and MCMC",
        ],
        codeRepository: REPO_URL,
        author: { "@id": AUTHOR.id },
        creator: { "@id": AUTHOR.id },
      },
    ],
  };
}

export interface ExplainerPage {
  /** Path from the site root, with a trailing slash, e.g. /algorithms/svm/. */
  path: string;
  title: string;
  description: string;
  /** The section it sits in, e.g. "Algorithms". */
  section: { name: string; path: string };
  keywords: string[];
}

/** One explainer: a free, interactive learning resource, and where it sits in the site. */
export function explainerGraph(page: ExplainerPage) {
  const url = `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "LearningResource"],
        "@id": `${url}#article`,
        url,
        headline: page.title,
        description: page.description,
        image: `${SITE_URL}/og${page.path.replace(/\/$/, "")}.png`,
        inLanguage: "en",
        isPartOf: { "@id": SITE_ID },
        mainEntityOfPage: url,
        author: { "@id": AUTHOR.id },
        publisher: { "@id": AUTHOR.id },
        articleSection: page.section.name,
        keywords: page.keywords.join(", "),
        learningResourceType: ["Interactive simulation", "Explainer"],
        interactivityType: "active",
        isAccessibleForFree: true,
        educationalLevel: "Beginner to intermediate",
        teaches: page.title,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.section.name, item: `${SITE_URL}${page.section.path}` },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
    ],
  };
}

/** A section index as an ordered list of its explainers. */
export function catalogueGraph(name: string, items: { path: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}${item.path}`,
      name: item.name,
    })),
  };
}

/** Structured data as a script tag's contents, safe to place inside HTML. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/** Renders structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
