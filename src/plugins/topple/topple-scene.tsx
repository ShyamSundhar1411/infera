"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeVersion } from "@/hooks/useThemeVersion";
import type { CodeBlockProps } from "../types";
import { TOPPLE_PLUGIN } from "./config";

// The player is large (it brings three.js), so the script is fetched once,
// and only when a scene is about to scroll into view.
let loading: Promise<void> | null = null;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function loadPlayer() {
  if (customElements.get("topple-player")) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const src = TOPPLE_PLUGIN.playerSrc;
    script.src = src.startsWith("/") ? `${basePath}${src}` : src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("Topple player failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

const parseMeta = (meta = "") =>
  Object.fromEntries([...meta.matchAll(/(\w[\w-]*)=("[^"]*"|\S+)/g)].map(([, k, v]) => [k, v.replace(/^"|"$/g, "")]));

type PlayerElement = HTMLElement & { source: string };

/**
 * A ```topple code block, played live. The scene is written in the page
 * itself, so it needs nothing from Topple's catalogue.
 */
export default function ToppleScene({ source, meta }: CodeBlockProps) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"waiting" | "ready" | "failed">("waiting");
  const themeVersion = useThemeVersion();
  const options = parseMeta(meta);
  const height = Number(options.height) || TOPPLE_PLUGIN.height;
  const caption = options.caption;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadPlayer().then(
          () => setState("ready"),
          () => setState("failed"),
        );
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = host.current;
    if (state !== "ready" || !el) return;
    let player = el.querySelector("topple-player") as PlayerElement | null;
    if (!player) {
      player = document.createElement("topple-player") as PlayerElement;
      player.style.setProperty("--topple-height", `${height}px`);
      player.style.display = "block";
      if (TOPPLE_PLUGIN.shareBase) player.setAttribute("share-base", TOPPLE_PLUGIN.shareBase);
      for (const [name, value] of Object.entries(options)) if (!["height", "caption"].includes(name)) player.setAttribute(name, value);
      el.appendChild(player);
    }
    player.setAttribute("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
    if (player.source !== source) player.source = source;
    // options is derived from meta, which is fixed for a given block.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, source, height, themeVersion]);

  return (
    <figure className="wide my-10">
      <div ref={host} className="overflow-hidden rounded-2xl border border-line bg-surface" style={{ minHeight: height }}>
        {state === "waiting" && <div className="animate-pulse" style={{ height }} />}
        {state === "failed" && (
          <pre className="overflow-x-auto p-4 font-mono text-xs text-muted" style={{ maxHeight: height }}>
            {source}
          </pre>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
