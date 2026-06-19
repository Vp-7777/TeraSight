"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400",
  secondary:
    "bg-[color:var(--color-surface-2)] text-foreground border border-[color:var(--color-border-1)] hover:bg-[color:var(--color-surface-3)]",
  ghost:
    "text-foreground-muted hover:text-foreground hover:bg-[color:var(--color-surface-2)]",
  outline:
    "border border-[color:var(--color-border-2)] text-foreground hover:border-emerald-500/40 hover:bg-[color:var(--color-accent-soft)]",
  gold: "bg-gradient-to-r from-amber-500/90 to-yellow-600/90 text-slate-950 font-semibold shadow-lg shadow-amber-500/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-7 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
