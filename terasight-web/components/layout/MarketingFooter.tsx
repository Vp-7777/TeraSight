import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/8 bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold">TeraSight</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Turning environmental imagery into actionable intelligence.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-foreground-muted">
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/analyze" className="hover:text-foreground">
            Analyze
          </Link>
        </div>
        <p className="text-xs text-foreground-muted">© 2026 TeraSight · Powered by PrithviQ AI</p>
      </div>
    </footer>
  );
}
