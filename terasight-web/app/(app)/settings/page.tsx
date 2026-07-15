"use client";

import { useEffect, useState } from "react";
import { ModuleShell } from "@/components/workspace/ModuleShell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session/session-context";
import { CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { user, login } = useSession();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // [Vishal] Interactive toggle switch states
  const [alerts, setAlerts] = useState(true);
  const [missions, setMissions] = useState(true);
  const [digest, setDigest] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setOrganization(user.organization);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name,
      organization,
      email,
      avatarInitials: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "VS",
    });
    setSaveSuccess(true);
    const timer = window.setTimeout(() => setSaveSuccess(false), 3000);
    return () => window.clearTimeout(timer);
  };

  // Custom premium toggle component
  const renderToggle = (checked: boolean, onChange: () => void) => (
    <div
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full p-0.5 cursor-pointer transition-all duration-250 ease-out flex items-center shrink-0 select-none ${
        checked ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-[color:var(--color-surface-3)] border border-[color:var(--color-border-2)]"
      }`}
    >
      <div
        className={`w-3.5 h-3.5 rounded-full bg-white shadow-md transform transition-transform duration-250 ease-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
  );

  return (
    <ModuleShell
      eyebrow="Workspace"
      title="Settings"
      description="Configure your profile, notifications, API access, and platform preferences."
    >
      <form onSubmit={handleSave} className="space-y-6">
        {saveSuccess ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Workspace profile updated successfully.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassPanel className="space-y-5 p-6">
            <p className="font-medium text-foreground">Profile Settings</p>
            <Input
              label="Display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vishal Sharma"
              required
            />
            <Input
              label="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Surat Municipal Corporation"
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. you@organization.org"
              required
            />
            <div className="pt-2">
              <Button type="submit">Save Profile</Button>
            </div>
          </GlassPanel>

          <GlassPanel className="space-y-5 p-6">
            <p className="font-medium text-foreground">Notifications</p>
            <div 
              onClick={() => setAlerts(!alerts)}
              className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm text-foreground-muted cursor-pointer hover:bg-[color:var(--color-surface-1)] transition"
            >
              <span>AI analysis alerts</span>
              {renderToggle(alerts, () => {})}
            </div>
            <div 
              onClick={() => setMissions(!missions)}
              className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm text-foreground-muted cursor-pointer hover:bg-[color:var(--color-surface-1)] transition"
            >
              <span>Mission updates</span>
              {renderToggle(missions, () => {})}
            </div>
            <div 
              onClick={() => setDigest(!digest)}
              className="flex items-center justify-between rounded-xl border border-[color:var(--color-border-1)] px-4 py-3 text-sm text-foreground-muted cursor-pointer hover:bg-[color:var(--color-surface-1)] transition"
            >
              <span>Weekly intelligence digest</span>
              {renderToggle(digest, () => {})}
            </div>
          </GlassPanel>
        </div>
      </form>
    </ModuleShell>
  );
}
