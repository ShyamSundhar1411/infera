"use client";

import { useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Wraps a lab or playground and records one event the first time a reader
 * clicks, drags or types inside it, so the reports show which labs get used,
 * not just which pages get opened.
 */
export default function TrackInteraction({
  event,
  params,
  children,
  className,
}: {
  event: string;
  params: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}) {
  const sent = useRef(false);
  const once = () => {
    if (sent.current) return;
    sent.current = true;
    track(event, params);
  };
  return (
    <div className={className} onPointerDownCapture={once} onKeyDownCapture={once}>
      {children}
    </div>
  );
}
