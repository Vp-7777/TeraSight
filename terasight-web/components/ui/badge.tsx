import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "ai" | "gold";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "border-[color:var(--color-border-2)] bg-[color:var(--color-surface-2)] text-foreground",
  success:
    "border-emerald-400/25 bg-emerald-500/12 text-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.05)]",
  warning:
    "border-amber-400/25 bg-amber-500/12 text-amber-200 shadow-[0_0_0_1px_rgba(245,158,11,0.05)]",
  danger:
    "border-rose-400/25 bg-rose-500/12 text-rose-200 shadow-[0_0_0_1px_rgba(244,63,94,0.05)]",
  ai: "border-sky-400/25 bg-sky-500/12 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.05)]",
  gold:
    "border-amber-300/25 bg-gradient-to-r from-amber-500/14 to-yellow-500/10 text-amber-200 shadow-[0_0_0_1px_rgba(245,158,11,0.05)]",
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
