import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import MiniPreview from "../Catalog/mini-preview";

const SHOWCASE = ["svm", "neural-network", "decision-tree", "gmm"];

export default function Hero({ algorithms, distributions }: { algorithms: number; distributions: number }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
          <span className="size-1.5 rounded-full bg-[rgb(38,166,154)]" />
          {algorithms} algorithms · {distributions} distributions · all interactive
        </p>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          See the maths <em className="italic">move</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {SITE_NAME} turns machine learning and statistics into things you can poke. Drop points,
          drag them around, change a parameter and watch every model and distribution redraw in
          real time, with plain-English explanations and the formulas right beside it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/algorithms/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition hover:opacity-90"
          >
            Explore algorithms <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/distributions/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium transition hover:bg-surface-2"
          >
            Explore distributions
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SHOWCASE.map((slug, i) => (
          <Link
            key={slug}
            href={`/algorithms/${slug}/`}
            className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 ${i % 2 ? "translate-y-6" : ""}`}
          >
            <MiniPreview slug={slug} />
          </Link>
        ))}
      </div>
    </section>
  );
}
