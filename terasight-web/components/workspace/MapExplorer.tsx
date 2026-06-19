"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { mapSites, type MapSite } from "@/lib/data/intelligence-mock";

const InteractiveIndiaMap = dynamic(
  () =>
    import("@/components/map/InteractiveIndiaMap").then((m) => m.InteractiveIndiaMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background/40">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 rounded-full skeleton-shimmer" />
          <p className="text-xs text-foreground-muted">Loading map...</p>
        </div>
      </div>
    ),
  },
);

interface MapExplorerProps {
  embedded?: boolean;
}

const DEFAULT_LAYERS = ["waste", "detections", "heatmap"] as const;

export function MapExplorer({ embedded = false }: MapExplorerProps) {
  const [selectedId, setSelectedId] = useState(mapSites[0].id);
  const [mapReady, setMapReady] = useState(!embedded);
  const activeLayers = useMemo(() => [...DEFAULT_LAYERS], []);

  const handleSelect = useCallback((site: MapSite) => {
    setSelectedId(site.id);
  }, []);

  useEffect(() => {
    if (!embedded) return;
    const timer = window.setTimeout(() => setMapReady(true), 800);
    return () => window.clearTimeout(timer);
  }, [embedded]);

  return (
    <div
      className={
        embedded
          ? "relative h-full min-h-[280px] overflow-hidden"
          : "relative min-h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-[color:var(--color-border-1)]"
      }
    >
      {mapReady ? (
        <InteractiveIndiaMap
          sites={mapSites}
          activeLayers={activeLayers}
          selectedId={selectedId}
          onSelect={handleSelect}
          enableFlyTo={!embedded}
          className="absolute inset-0 z-0"
        />
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-background/30">
          <div className="h-8 w-8 rounded-full skeleton-shimmer" />
        </div>
      )}

      {!embedded ? (
        <div className="absolute bottom-4 left-4 right-4 z-20 md:left-6 md:right-6">
          <GlassPanel className="flex flex-wrap items-center justify-between gap-4 px-5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="ai">{mapSites.length} Active Sites</Badge>
              <Badge variant="warning">
                {mapSites.filter((s) => s.status === "High" || s.status === "Critical").length} High
                Risk
              </Badge>
              <Badge variant="success">
                {mapSites.filter((s) => s.status === "Low" || s.status === "Medium").length} Stable
              </Badge>
            </div>
            <Link href="/map">
              <Button variant="secondary" size="sm">
                Open Full Explorer
              </Button>
            </Link>
          </GlassPanel>
        </div>
      ) : null}
    </div>
  );
}
