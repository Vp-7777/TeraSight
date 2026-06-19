import { ModuleShell } from "@/components/workspace/ModuleShell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <ModuleShell
      eyebrow="Workspace"
      title="Settings"
      description="Configure your profile, notifications, API access, and platform preferences."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="space-y-5 p-6">
          <p className="font-medium">Profile</p>
          <Input label="Display name" placeholder="Vishal Sharma" />
          <Input label="Organization" placeholder="Surat Municipal Corporation" />
          <Input label="Email" type="email" placeholder="you@organization.org" />
        </GlassPanel>
        <GlassPanel className="space-y-5 p-6">
          <p className="font-medium">Notifications</p>
          <label className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm">
            AI analysis alerts
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm">
            Mission updates
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm">
            Weekly intelligence digest
            <input type="checkbox" className="rounded" />
          </label>
        </GlassPanel>
      </div>
    </ModuleShell>
  );
}
