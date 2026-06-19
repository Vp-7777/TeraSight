import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: "emerald" | "blue" | "none";
  border?: "plain" | "gradient";
}

export function GlassPanel({
  children,
  className,
  glow = "none",
  border = "plain",
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel surface-depth rounded-[var(--radius-lg)]",
        border === "gradient" && "surface-border-gradient",
        glow === "emerald" && "glow-emerald",
        glow === "blue" && "glow-blue",
        className,
      )}
    >
      {children}
    </div>
  );
}
