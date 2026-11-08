import katex from "katex";

/** Renders a LaTeX string with KaTeX. Safe on the server and the client. */
export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false, strict: "ignore" });
  return <span className={display ? "block overflow-x-auto py-1" : undefined} dangerouslySetInnerHTML={{ __html: html }} />;
}
