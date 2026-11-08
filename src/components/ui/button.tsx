import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "accent";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:opacity-90",
  accent: "bg-accent text-accent-ink hover:brightness-95",
  outline: "border border-line bg-surface text-ink hover:bg-surface-2",
  ghost: "text-muted hover:bg-surface-2 hover:text-ink",
};

export function Button({
  variant = "outline",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition disabled:pointer-events-none disabled:opacity-40",
        size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
