import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MdxArticle from "../../components/Mdx/mdx-article";
import LabEmbed from "../../components/Concepts/lab-embed";
import { getConceptDocument, getConcepts } from "@/lib/data/concepts.data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => getConcepts().map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = getConceptDocument((await params).slug);
  return doc ? { title: doc.frontmatter.name, description: doc.frontmatter.summary } : {};
}

export default async function ConceptPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getConceptDocument(slug);
  if (!doc) notFound();

  const all = getConcepts();
  const index = all.findIndex((c) => c.slug === slug);
  const prev = all[index - 1];
  const next = all[index + 1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/concepts/" className="hover:text-ink">
          Concepts
        </Link>
      </nav>
      <header className="mb-8 max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{doc.frontmatter.name}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{doc.frontmatter.summary}</p>
      </header>

      <MdxArticle source={doc.body} components={{ Lab: LabEmbed }} />

      <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/concepts/${prev.slug}/`} className="rounded-2xl border border-line p-4 hover:border-ink/30">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3" /> Previous
            </span>
            <span className="mt-1 block font-medium">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/concepts/${next.slug}/`} className="rounded-2xl border border-line p-4 text-right hover:border-ink/30">
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
