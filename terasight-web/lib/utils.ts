import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConfidence(value: number) {
  const safe = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  return `${Math.round(safe * 100)}%`;
}
