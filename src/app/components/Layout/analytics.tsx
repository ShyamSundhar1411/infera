"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ANALYTICS_ID, track } from "@/lib/analytics";

/**
 * Google Analytics, only when NEXT_PUBLIC_GA_ID is set. Topple scenes report
 * what readers do with them as bubbling `topple-action` events; they are
 * forwarded here, so the Topple plugin itself sends nothing anywhere.
 */
export default function Analytics() {
  useEffect(() => {
    if (!ANALYTICS_ID) return;
    const forward = (event: Event) => {
      const { action, ...rest } = (event as CustomEvent<{ action: string } & Record<string, unknown>>).detail ?? {};
      if (action) track(`scene_${action}`, { ...rest, page: location.pathname });
    };
    document.addEventListener("topple-action", forward);
    return () => document.removeEventListener("topple-action", forward);
  }, []);

  return ANALYTICS_ID ? <GoogleAnalytics gaId={ANALYTICS_ID} /> : null;
}
