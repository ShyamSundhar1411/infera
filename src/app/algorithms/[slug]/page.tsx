import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AlgorithmPlayground from "../../components/Playground/algorithm-playground";
import LabEmbed from "../../components/Concepts/lab-embed";
import MdxArticle from "../../components/Mdx/mdx-article";
import { readMdx } from "@/lib/mdx/load";
import type { ExplainerFrontmatter } from "@/lib/types/domain/algorithm.types";
import { getAlgorithm, getAlgorithms } from "@/lib/data/algorithms.data";
import { getCategories } from "@/lib/data/categories.data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => getAlgorithms().map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  const doc = readMdx<ExplainerFrontmatter>("algorithms", slug);
  return algorithm ? { title: algorithm.name, description: doc?.frontmatter.summary } : {};
}

export default async function AlgorithmPage({ params }: PageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) notFound();
  const doc = readMdx<ExplainerFrontmatter>("algorithms", slug);

  const all = getAlgorithms();
  const index = all.findIndex((a) => a.slug === slug);
  const prev = all[index - 1];
  const next = all[index + 1];
  const category = getCategories().find((c) => c.id === algorithm.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/algorithms/" className="hover:text-ink">
          Algorithms
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/algorithms/#${algorithm.category}`} className="hover:text-ink">
          {category?.name}
        </Link>
      </nav>
      <header className="mb-8 max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{algorithm.name}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{doc?.frontmatter.summary ?? algorithm.tagline}</p>
      </header>

      <AlgorithmPlayground slug={slug} />

      {doc && (
        <div className="mt-20">
          <MdxArticle source={doc.body} components={{ Lab: LabEmbed }} />
        </div>
      )}

      <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/algorithms/${prev.slug}/`} className="group rounded-2xl border border-line p-4 hover:border-ink/30">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3" /> Previous
            </span>
            <span className="mt-1 block font-medium">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/algorithms/${next.slug}/`} className="group rounded-2xl border border-line p-4 text-right hover:border-ink/30">
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              Next <ArrowRight className="size-3" />
            </span>
            <span className="mt-1 block font-medium">{next.name}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
