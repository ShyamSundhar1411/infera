import type { MDXComponents } from "mdx/types";
import { compileMdx } from "@/lib/mdx/load";
import { mdxComponents } from "./mdx-components";

/** Compiles and renders an MDX body at build time. */
export default async function MdxArticle({
  source,
  components,
}: {
  source: string;
  components?: MDXComponents;
}) {
  const Content = await compileMdx(source);
  return (
    <article className="max-w-3xl [&_.katex-display]:my-4 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden">
      <Content components={{ ...mdxComponents, ...components }} />
    </article>
  );
}
