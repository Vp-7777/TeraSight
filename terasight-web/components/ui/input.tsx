import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/10",
            error && "border-rose-500/40 focus:border-rose-500/40 focus:ring-rose-500/10",
            className,
          )}
          {...props}
        />
        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";
