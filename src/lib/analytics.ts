"use client";

import { sendGAEvent } from "@next/third-parties/google";

/** Whether analytics is configured for this build. Set NEXT_PUBLIC_GA_ID to turn it on. */
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/**
 * Records an event in Google Analytics when it is configured, and does nothing
 * otherwise. Event names are snake_case, as GA4 expects.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!ANALYTICS_ID || typeof window === "undefined") return;
  try {
    sendGAEvent("event", event, params);
  } catch {
    // Analytics must never break the page.
  }
}
