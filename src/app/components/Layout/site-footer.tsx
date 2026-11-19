import { SITE_NAME } from "@/lib/constants";
import { AUTHOR, AUTHOR_PROJECTS } from "@/lib/data/author.data";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-display text-lg text-ink">{SITE_NAME}</span> · every model is
          written from scratch and runs in your browser.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {AUTHOR_PROJECTS.map((p) => (
            <a key={p.url} href={p.url} className="hover:text-ink">
              Also by me: <span className="text-ink">{p.name}</span>, {p.blurb}
            </a>
          ))}
          <a href={AUTHOR.url} rel="author" className="hover:text-ink">
            Built by {AUTHOR.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
