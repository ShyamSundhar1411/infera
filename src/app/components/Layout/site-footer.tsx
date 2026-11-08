import { SITE_NAME } from "@/lib/constants";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-display text-lg text-ink">{SITE_NAME}</span> · every model is
          written from scratch and runs in your browser.
        </p>
        <p>Built by Shyam Sundhar</p>
      </div>
    </footer>
  );
}
