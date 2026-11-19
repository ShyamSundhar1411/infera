import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ConceptLab from "@/app/components/Concepts/concept-lab";
import EmbedView from "@/app/components/Concepts/embed-view";
import { SITE_NAME } from "@/lib/constants";
import { LABS, getLab } from "@/lib/data/labs.data";

interface PageProps {
  params: Promise<{ lab: string }>;
}

export const generateStaticParams = () => LABS.map((lab) => ({ lab: lab.id }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lab = getLab((await params).lab);
  if (!lab) return {};
  return {
    title: lab.title,
    // The lab's own page is the one to index; this is the same lab inside other sites.
    robots: { index: false, follow: true },
    alternates: { canonical: lab.path, types: { "application/json+oembed": `/oembed/${lab.id}.json` } },
  };
}

export default async function EmbedPage({ params }: PageProps) {
  const lab = getLab((await params).lab);
  if (!lab) notFound();
  return (
    <>
      <EmbedView lab={lab.id} />
      <ConceptLab slug={lab.id} />
      <p className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted">
        <span>{lab.title}</span>
        <a href={`${lab.path}?ref=embed`} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-ink">
          Explained on <span className="font-display text-sm text-ink">{SITE_NAME}</span> <ArrowUpRight className="size-3" />
        </a>
      </p>
    </>
  );
}
