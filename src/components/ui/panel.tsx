import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface p-4", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-2">
          {title && (
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</h3>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
