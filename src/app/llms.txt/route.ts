import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { AUTHOR } from "@/lib/data/author.data";
import { getAlgorithms } from "@/lib/data/algorithms.data";
import { getCategories } from "@/lib/data/categories.data";
import { getConcepts } from "@/lib/data/concepts.data";
import { getDistributions } from "@/lib/data/distributions.data";

export const dynamic = "force-static";

/** A plain summary of the site for AI assistants and crawlers, following the llms.txt convention. */
export function GET() {
  const algorithms = getAlgorithms();
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Made by ${AUTHOR.name} (${AUTHOR.url}). Every model is written from scratch in TypeScript and runs in the browser, with no backend. Each page pairs a live lab with a written explanation and the maths.`,
    "",
    "## Concepts",
    "",
    ...getConcepts().map((c) => `- [${c.name}](${SITE_URL}/concepts/${c.slug}/): ${c.tagline}`),
    "",
    ...getCategories().flatMap((category) => {
      const items = algorithms.filter((a) => a.category === category.id);
      return items.length
        ? [`## Algorithms: ${category.name}`, "", ...items.map((a) => `- [${a.name}](${SITE_URL}/algorithms/${a.slug}/): ${a.tagline}`), ""]
        : [];
    }),
    "## Probability distributions",
    "",
    ...getDistributions().map((d) => `- [${d.name} distribution](${SITE_URL}/distributions/${d.slug}/): ${d.tagline}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
