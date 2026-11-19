import { ArrowUpRight } from "lucide-react";
import { resolveEmbed } from "@/lib/embed/oembed";

/**
 * `<Embed url="…" caption="…" />` in MDX: any page that supports oEmbed,
 * resolved at build time. Pages that don't, or that can't be reached while
 * building, show up as a plain link card instead.
 */
export default async function Embed({ url, caption }: { url: string; caption?: string }) {
  const info = await resolveEmbed(url);
  const label = caption ?? info.title ?? url;
  const host = new URL(url).host;

  return (
    <figure className="wide my-10">
      {info.iframe ? (
        <div
          className="overflow-hidden rounded-2xl border border-line bg-surface"
          style={{ aspectRatio: `${info.iframe.width} / ${info.iframe.height}`, maxHeight: 620 }}
        >
          <iframe src={info.iframe.src} title={info.iframe.title} loading="lazy" allow="fullscreen" className="block size-full" />
        </div>
      ) : (
        <a href={url} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 hover:border-ink/30">
          {info.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={info.thumbnail} alt="" className="h-20 w-36 shrink-0 rounded-lg object-cover" loading="lazy" />
          )}
          <span className="min-w-0">
            <span className="block font-medium">{info.title ?? url}</span>
            <span className="text-sm text-muted">{host}</span>
          </span>
        </a>
      )}
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted">
        <span>{label}</span>
        <a href={url} className="inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Open on {info.provider ?? host} <ArrowUpRight className="size-3.5" />
        </a>
      </figcaption>
    </figure>
  );
}
