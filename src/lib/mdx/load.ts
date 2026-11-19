import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { MDXContent } from "mdx/types";

/** Explainer content lives in /content/<section>/<slug>.mdx. */
export type ContentSection = "algorithms" | "distributions" | "concepts";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MdxDocument<T> {
  slug: string;
  frontmatter: T;
  body: string;
}

const fileOf = (section: ContentSection, slug: string) =>
  path.join(CONTENT_ROOT, section, `${slug}.mdx`);

export function readMdx<T>(section: ContentSection, slug: string): MdxDocument<T> | null {
  const file = fileOf(section, slug);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { slug, frontmatter: data as T, body: content };
}

/** Every document in a section, sorted by an optional `order` frontmatter key. */
export function listMdx<T extends { order?: number }>(section: ContentSection): MdxDocument<T>[] {
  const dir = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readMdx<T>(section, f.replace(/\.mdx$/, ""))!)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

/** Keep the text after a code fence's language (```topple height=520) so plugins can read it. */
const remarkCodeMeta = () => (tree: { children?: unknown[] }) => {
  const visit = (node: { type?: string; meta?: string | null; data?: { hProperties?: Record<string, unknown> }; children?: unknown[] }) => {
    if (node.type === "code" && node.meta) {
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, "data-meta": node.meta } };
    }
    node.children?.forEach((child) => visit(child as typeof node));
  };
  visit(tree);
};

/** Compile MDX with GitHub-flavoured Markdown and KaTeX maths. */
export async function compileMdx(source: string): Promise<MDXContent> {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath, remarkCodeMeta],
    rehypePlugins: [[rehypeKatex, { strict: "ignore" }]],
  });
  return Content;
}
