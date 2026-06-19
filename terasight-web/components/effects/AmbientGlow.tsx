"use client";

import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  variant?: "emerald" | "blue" | "mixed";
}

export function AmbientGlow({ variant = "emerald" }: AmbientGlowProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={cn(
          "absolute -left-24 top-0 h-72 w-72 rounded-full blur-[100px]",
          variant === "emerald" && "bg-emerald-500/15",
          variant === "blue" && "bg-sky-500/15",
          variant === "mixed" && "bg-emerald-500/12",
        )}
      />
      <div
        className={cn(
          "absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-[100px]",
          variant === "emerald" && "bg-teal-500/10",
          variant === "blue" && "bg-indigo-500/10",
          variant === "mixed" && "bg-sky-500/12",
        )}
      />
    </div>
  );
}
