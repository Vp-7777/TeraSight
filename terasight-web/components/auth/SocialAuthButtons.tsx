"use client";

import { Button } from "@/components/ui/button";

const providers = [
  { label: "Continue with Google", icon: "G" },
  { label: "Continue with Microsoft", icon: "M" },
  { label: "Continue with GitHub", icon: "GH" },
];

export function SocialAuthButtons() {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <Button key={provider.label} variant="secondary" className="w-full justify-center" type="button">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold">
            {provider.icon}
          </span>
          {provider.label}
        </Button>
      ))}
    </div>
  );
}
