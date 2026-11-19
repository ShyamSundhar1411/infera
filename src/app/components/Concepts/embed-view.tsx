"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Records that a lab was viewed inside another site, and which one. */
export default function EmbedView({ lab }: { lab: string }) {
  useEffect(() => {
    let host = "direct";
    try {
      if (document.referrer) host = new URL(document.referrer).host;
    } catch {}
    track("embed_view", { lab, host });
  }, [lab]);
  return null;
}
