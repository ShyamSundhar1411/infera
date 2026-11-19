/** Embedded labs: just the lab, no site header or footer. */
export default function EmbedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-dvh bg-bg p-3 sm:p-4">{children}</main>;
}
