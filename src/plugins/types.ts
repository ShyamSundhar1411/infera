import type { ComponentType } from "react";

/** What a fenced code block hands to the plugin that claims its language. */
export interface CodeBlockProps {
  /** The text between the fences. */
  source: string;
  /** Anything written after the language on the opening fence, e.g. ```topple height=520 → "height=520". */
  meta?: string;
}

/**
 * An Infera plugin. Plugins add to the MDX vocabulary without the rest of the
 * site knowing about them: remove one from src/plugins/index.ts and its code
 * blocks fall back to plain code.
 */
export interface InferaPlugin {
  name: string;
  /** Fenced code blocks this plugin renders, keyed by language. */
  codeBlocks?: Record<string, ComponentType<CodeBlockProps>>;
  /** Extra components available in MDX. */
  components?: Record<string, ComponentType<never>>;
}
