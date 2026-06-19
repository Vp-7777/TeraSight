import { PageHeader } from "@/components/layout/PageHeader";
import type { ReactNode } from "react";

interface ModuleShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
}

export function ModuleShell({
  eyebrow,
  title,
  description,
  badge,
  children,
}: ModuleShellProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        badge={badge}
      />
      {children}
    </div>
  );
}
