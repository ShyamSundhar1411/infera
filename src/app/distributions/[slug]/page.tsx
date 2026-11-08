import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DistributionLab from "../../components/Distributions/distribution-lab";
import MdxArticle from "../../components/Mdx/mdx-article";
import { Tex } from "@/components/ui/tex";
import { readMdx } from "@/lib/mdx/load";
import type { ExplainerFrontmatter } from "@/lib/types/domain/algorithm.types";
import { getDistribution, getDistributions } from "@/lib/data/distributions.data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => getDistributions().map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const d = getDistribution(slug);
  const doc = readMdx<ExplainerFrontmatter>("distributions", slug);
  return d ? { title: `${d.name} distribution`, description: doc?.frontmatter.summary } : {};
}

export default async function DistributionPage({ params }: PageProps) {
  const { slug } = await params;
  const distribution = getDistribution(slug);
  if (!distribution) notFound();
  const doc = readMdx<ExplainerFrontmatter>("distributions", slug);

  const all = getDistributions();
  const index = all.findIndex((d) => d.slug === slug);
  const prev = all[index - 1];
  const next = all[index + 1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/distributions/" className="hover:text-ink">
          Distributions
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/distributions/#${distribution.type}`} className="capitalize hover:text-ink">
          {distribution.type}
        </Link>
      </nav>
      <header className="mb-8 max-w-3xl">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{distribution.name}</h1>
          <span className="rounded-full border border-line px-3 py-1 text-sm text-muted">
            <Tex>{distribution.notation}</Tex>
          </span>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-muted">{doc?.frontmatter.summary ?? distribution.tagline}</p>
      </header>

      <DistributionLab slug={slug} />

      {doc && (
        <div className="mt-20">
          <MdxArticle source={doc.body} />
        </div>
      )}

      <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/distributions/${prev.slug}/`} className="rounded-2xl border border-line p-4 hover:border-ink/30">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3" /> Previous
            </span>
            <span className="mt-1 block font-medium">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/distributions/${next.slug}/`} className="rounded-2xl border border-line p-4 text-right hover:border-ink/30">
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
