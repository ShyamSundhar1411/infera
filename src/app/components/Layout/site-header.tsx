import Link from "next/link";
import { Github } from "lucide-react";
import { REPO_URL, SITE_NAME } from "@/lib/constants";
import { LogoMark } from "./logo";
import ThemeToggle from "./theme-toggle";

const NAV = [
  { href: "/algorithms/", label: "Algorithms" },
  { href: "/distributions/", label: "Distributions" },
  { href: "/concepts/", label: "Concepts" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="size-7" />
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
