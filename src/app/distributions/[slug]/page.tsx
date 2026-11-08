import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DistributionLab from "../../components/Distributions/distribution-lab";
import DistributionExplainer from "../../components/Distributions/distribution-explainer";
import { getDistribution, getDistributions } from "@/lib/data/distributions.data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => getDistributions().map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const d = getDistribution((await params).slug);
  return d ? { title: `${d.name} distribution`, description: d.content.summary } : {};
}

export default async function DistributionPage({ params }: PageProps) {
  const { slug } = await params;
  const distribution = getDistribution(slug);
  if (!distribution) notFound();

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
          <span className="rounded-full border border-line px-3 py-1 font-mono text-sm text-muted">
            {distribution.notation}
          </span>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-muted">{distribution.content.summary}</p>
      </header>

      <DistributionLab slug={slug} />

      <div className="mt-20">
        <DistributionExplainer distribution={distribution} />
      </div>

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
