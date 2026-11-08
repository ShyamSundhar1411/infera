// Compiles every MDX file under /content with strict KaTeX so broken maths
// fails loudly. Run with `yarn check:content`.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const root = path.join(process.cwd(), "content");
let failures = 0;

// Maths should be LaTeX: plain ASCII inside $…$, and no bare maths symbols in prose.
const MATH = /\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g;
const MATH_SYMBOLS = /[σμλνθαβγδεξρπΣΓ√∞≤≥≈≠±×÷∑∏∫∝∈ℝ¬∪∩→ⁱ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿᵏʰᵀ₀₁₂₃₄₅₆₇₈₉ₙₖᵢⱼ₊‖⌊⌋̂̄−]/u;

const lintMaths = (rel, content) => {
  const problems = [];
  const lines = content.split("\n");
  for (const m of content.matchAll(MATH)) {
    const bad = [...m[0]].filter((c) => c.charCodeAt(0) > 127);
    if (bad.length) {
      const line = content.slice(0, m.index).split("\n").length;
      problems.push(`line ${line}: non-LaTeX characters in maths: ${[...new Set(bad)].join(" ")}`);
    }
  }
  lines.forEach((text, i) => {
    const prose = text.replace(MATH, "");
    const hit = prose.match(MATH_SYMBOLS);
    if (hit) problems.push(`line ${i + 1}: maths symbol "${hit[0]}" outside $…$`);
  });
  for (const p of problems) console.error(`✗ ${rel} ${p}`);
  return problems.length;
};
let count = 0;

for (const section of fs.readdirSync(root)) {
  const dir = path.join(root, section);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    count++;
    const rel = `${section}/${file}`;
    const { content, data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (!data.summary) {
      console.error(`✗ ${rel}: missing "summary" in frontmatter`);
      failures++;
    }
    failures += lintMaths(rel, content);
    try {
      await compile(content, {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: "error" }]],
      });
    } catch (error) {
      failures++;
      console.error(`✗ ${rel}: ${String(error.message ?? error).split("\n")[0]}`);
    }
  }
}

console.log(failures ? `\n${failures} problem(s) in ${count} files` : `✓ ${count} files compiled cleanly`);
process.exit(failures ? 1 : 0);
