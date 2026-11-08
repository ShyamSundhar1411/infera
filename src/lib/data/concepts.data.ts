import type { Concept, ConceptFrontmatter } from "../types/domain/concept.types";
import { listMdx, readMdx } from "../mdx/load";

/** Concepts are defined entirely by their MDX files in content/concepts. */
export const getConcepts = (): Concept[] =>
  listMdx<ConceptFrontmatter>("concepts").map((doc) => ({ slug: doc.slug, ...doc.frontmatter }));

export const getConceptDocument = (slug: string) => readMdx<ConceptFrontmatter>("concepts", slug);
