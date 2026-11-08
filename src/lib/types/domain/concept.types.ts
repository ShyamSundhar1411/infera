/** Frontmatter of content/concepts/<slug>.mdx. */
export interface ConceptFrontmatter {
  name: string;
  tagline: string;
  summary: string;
  /** Position in listings; lower comes first. */
  order?: number;
  /** Short LaTeX shown large on the concept's card. */
  glyph?: string;
}

export interface Concept extends ConceptFrontmatter {
  slug: string;
}
