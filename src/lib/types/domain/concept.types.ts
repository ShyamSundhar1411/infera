import type { ContentSection, MathLine } from "./algorithm.types";

export interface Concept {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  sections: ContentSection[];
  formulas: MathLine[];
  tryThis: string[];
}
