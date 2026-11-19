/**
 * Infera's mark: a separating line between two point clouds, in the brand
 * colours shared with shyamsundhar.com and Topple (magenta into orange).
 */
export const BRAND = { magenta: "#b8005c", pink: "#e0287d", coral: "#ee5c27", orange: "#f6731f" };

export function LogoMark({ className, tile = "var(--ink)", size }: { className?: string; tile?: string; size?: number }) {
  return (
    // `size` is for image rendering (link previews, app icons), where CSS classes do not apply.
    <svg viewBox="0 0 32 32" className={className} width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id="infera-brand" x1="0" y1="4" x2="0" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0.1" stopColor={BRAND.magenta} />
          <stop offset="0.58" stopColor={BRAND.coral} />
          <stop offset="1" stopColor={BRAND.orange} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={tile} />
      <circle cx="9.5" cy="11" r="2.8" fill={BRAND.pink} />
      <circle cx="12.5" cy="19.5" r="2.8" fill={BRAND.pink} />
      <circle cx="21.5" cy="11.5" r="2.8" fill={BRAND.orange} />
      <circle cx="22.5" cy="20.5" r="2.8" fill={BRAND.orange} />
      <path d="M19 4.5 L13 27.5" stroke="url(#infera-brand)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
