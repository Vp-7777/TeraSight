import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "ai" | "gold";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "border-[color:var(--color-border-2)] bg-[color:var(--color-surface-2)] text-foreground",
  success:
    "border-emerald-400/25 bg-[color:var(--color-badge-success-bg)] text-[color:var(--color-badge-success-text)]",
  warning:
    "border-amber-400/25 bg-[color:var(--color-badge-warning-bg)] text-[color:var(--color-badge-warning-text)]",
  danger:
    "border-rose-400/25 bg-[color:var(--color-badge-danger-bg)] text-[color:var(--color-badge-danger-text)]",
  ai: "border-sky-400/25 bg-[color:var(--color-badge-ai-bg)] text-[color:var(--color-badge-ai-text)]",
  gold:
    "border-amber-300/25 bg-[color:var(--color-badge-gold-bg)] text-[color:var(--color-badge-gold-text)]",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium capitalize backdrop-blur-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
