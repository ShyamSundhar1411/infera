"use client";

import { useState } from "react";
import { Check, Code2, Copy } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

/** "Embed this lab": the iframe snippet for putting the lab on another site, ready to copy. */
export default function EmbedButton({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const snippet = `<iframe src="${SITE_URL}/embed/${id}/" width="100%" height="760" style="border:0;border-radius:16px" loading="lazy" title="${title.replace(/"/g, "&quot;")}"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      track("embed_copied", { lab: id });
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="mt-2 flex flex-col items-end">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-muted transition hover:bg-surface-2 hover:text-ink"
      >
        <Code2 className="size-3.5" /> Embed this lab
      </button>
      {open && (
        <div className="anim-pop-in mt-2 w-full max-w-xl rounded-xl border border-line bg-surface p-3">
          <p className="mb-2 text-xs text-muted">
            Paste this into a blog post or docs page. Add <code className="font-mono">?theme=dark</code> to the address to force dark mode.
          </p>
          <div className="flex items-start gap-2">
            <code className="block min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-surface-2 px-3 py-2 font-mono text-[11px]">{snippet}</code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs hover:bg-surface-2"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
