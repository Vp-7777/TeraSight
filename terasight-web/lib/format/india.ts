const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const INR_COMPACT = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const INDIAN_DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const INDIAN_DATETIME = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function formatINR(amount: number, compact = false): string {
  return compact ? INR_COMPACT.format(amount) : INR_FORMATTER.format(amount);
}

export function formatIndianDate(date: Date = new Date()): string {
  return INDIAN_DATE.format(date);
}

export function formatIndianDateTime(date: Date = new Date()): string {
  return INDIAN_DATETIME.format(date);
}

export function formatLakh(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return formatINR(amount);
}
