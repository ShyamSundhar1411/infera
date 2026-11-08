import Link from "next/link";
import { Github } from "lucide-react";
import { REPO_URL, SITE_NAME } from "@/lib/constants";
import ThemeToggle from "./theme-toggle";

const NAV = [
  { href: "/algorithms/", label: "Algorithms" },
  { href: "/distributions/", label: "Distributions" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="hidden font-display text-2xl leading-none tracking-tight min-[420px]:inline">{SITE_NAME}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2 py-1.5 text-muted sm:px-3 transition hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
            className="hidden sm:grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink"
          >
            <Github className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/** A tilted separating line between two point clouds. */
function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-ink" />
      <circle cx="10" cy="11" r="2.6" fill="rgb(240,101,84)" />
      <circle cx="13" cy="19" r="2.6" fill="rgb(240,101,84)" />
      <circle cx="21" cy="12" r="2.6" fill="rgb(38,166,154)" />
      <circle cx="22" cy="21" r="2.6" fill="rgb(38,166,154)" />
      <path d="M19 4 L13 28" stroke="#c8f169" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
