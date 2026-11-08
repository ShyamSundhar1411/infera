import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/** A labelled formula card. Put display maths ($$ … $$) inside. */
function Formula({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <div className="mt-1 overflow-x-auto [&_.katex-display]:my-1">{children}</div>
    </div>
  );
}

/** Lays out a set of <Formula> cards in a grid. */
function Formulas({ children }: { children: React.ReactNode }) {
  return <div className="not-first:mt-5 grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="mt-5 rounded-xl border-l-4 border-accent bg-surface-2/60 px-5 py-4 text-[15px] leading-relaxed">
      {title && <p className="mb-1 font-medium">{title}</p>}
      {children}
    </aside>
  );
}

/** Two side-by-side lists: what the method is good at, and where it struggles. */
function ProsCons({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 grid gap-4 sm:grid-cols-2 [&_h3]:mt-0">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-surface p-5">{children}</div>;
}

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-14 font-display text-3xl tracking-tight first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-muted" {...props} />,
  p: (props) => <p className="mt-4 text-[15px] leading-relaxed text-ink/85" {...props} />,
  ul: (props) => <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/85 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-[0.6em] [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-muted" {...props} />,
  ol: (props) => (
    <ol
      className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/85 [counter-reset:step] [&>li]:relative [&>li]:pl-9 [&>li]:[counter-increment:step] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:grid [&>li]:before:size-6 [&>li]:before:place-items-center [&>li]:before:rounded-full [&>li]:before:bg-surface-2 [&>li]:before:font-mono [&>li]:before:text-xs [&>li]:before:text-muted [&>li]:before:content-[counter(step)]"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  a: ({ className, ...props }) => <a className={cn("underline decoration-line underline-offset-4 hover:decoration-ink", className)} {...props} />,
  blockquote: (props) => <blockquote className="mt-5 border-l-4 border-line pl-4 text-muted" {...props} />,
  code: (props) => <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px]" {...props} />,
  table: (props) => (
    <div className="mt-5 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-line bg-surface-2 px-4 py-2 font-medium" {...props} />,
  td: (props) => <td className="border-b border-line px-4 py-2.5 align-top last:border-r-0" {...props} />,
  Formula,
  Formulas,
  Callout,
  ProsCons,
  Card,
};
