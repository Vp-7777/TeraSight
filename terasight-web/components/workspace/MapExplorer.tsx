"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Satellite } from "lucide-react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import type { MapLibreIndiaMapHandle } from "@/components/map/MapLibreIndiaMap";
import { MapIntelligenceDrawer } from "@/components/map/MapIntelligenceDrawer";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { mapSites, type MapSite } from "@/lib/data/intelligence-mock";
import {
  DEFAULT_ACTIVE_LAYERS,
  generateLiveEvent,
  INITIAL_LIVE_EVENTS,
  toggleLayer,
  type LiveMapEvent,
  type MapLayerId,
} from "@/lib/data/map-intelligence";

const MapLibreIndiaMap = dynamic(
  () => import("@/components/map/MapLibreIndiaMap").then((m) => m.MapLibreIndiaMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#06080f]">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 rounded-full skeleton-shimmer" />
          <p className="text-xs text-foreground-muted">Initializing geospatial intelligence...</p>
        </div>
      </div>
    ),
  },
);

interface MapExplorerProps {
  embedded?: boolean;
}

export function MapExplorer({ embedded = false }: MapExplorerProps) {
  const mapRef = useRef<MapLibreIndiaMapHandle>(null);
  const [selectedId, setSelectedId] = useState(mapSites[0].id);
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>(DEFAULT_ACTIVE_LAYERS);
  const [drawerOpen, setDrawerOpen] = useState(!embedded);
  const [mapReady, setMapReady] = useState(!embedded);
  const [liveEvents, setLiveEvents] = useState<LiveMapEvent[]>(INITIAL_LIVE_EVENTS);
  const [playback, setPlayback] = useState(false);

  useEffect(() => {
    if (embedded) return;
    const siteParam = new URLSearchParams(window.location.search).get("site");
    if (siteParam && mapSites.some((s) => s.id === siteParam)) {
      setSelectedId(siteParam);
      setDrawerOpen(true);
    }
  }, [embedded]);

  const selectedSite = useMemo(
    () => mapSites.find((s) => s.id === selectedId) ?? mapSites[0],
    [selectedId],
  );

  const stats = useMemo(
    () => ({
      total: mapSites.length,
      critical: mapSites.filter((s) => s.status === "Critical").length,
      highRisk: mapSites.filter((s) => s.status === "Critical" || s.status === "High").length,
      activeMissions: mapSites.filter((s) => s.mission.status === "Active").length,
    }),
    [],
  );

  const handleSelect = useCallback((site: MapSite) => {
    setSelectedId(site.id);
    setDrawerOpen(true);
  }, []);

  const handleToggleLayer = useCallback((layer: MapLayerId) => {
    setActiveLayers((prev) => toggleLayer(prev, layer));
  }, []);

  const handleEventSelect = useCallback((siteId: string) => {
    const site = mapSites.find((s) => s.id === siteId);
    if (site) handleSelect(site);
  }, [handleSelect]);

  useEffect(() => {
    if (!embedded) return;
    const timer = window.setTimeout(() => setMapReady(true), 600);
    return () => window.clearTimeout(timer);
  }, [embedded]);

  useEffect(() => {
    if (!playback || embedded) return;
    const interval = window.setInterval(() => {
      setSelectedId((current) => {
        const idx = mapSites.findIndex((s) => s.id === current);
        const next = mapSites[(idx + 1) % mapSites.length];
        setDrawerOpen(true);
        return next.id;
      });
    }, 6000);
    return () => window.clearInterval(interval);
  }, [playback, embedded]);

  useEffect(() => {
    if (embedded) return;
    const interval = window.setInterval(() => {
      setLiveEvents((prev) => {
        const next = generateLiveEvent();
        return [next, ...prev].slice(0, 12);
      });
    }, 12000);
    return () => window.clearInterval(interval);
  }, [embedded]);

  return (
    <div
      className={
        embedded
          ? "relative h-full min-h-[280px] overflow-hidden rounded-xl"
          : "relative h-[calc(100vh-7.5rem)] min-h-[640px] overflow-hidden rounded-2xl border border-[color:var(--color-border-1)]"
      }
    >
      {!embedded ? (
        <>
          <AmbientGlow variant="mixed" />
          <FloatingParticles count={18} className="z-10 opacity-60" />
        </>
      ) : null}

      {mapReady ? (
        <MapLibreIndiaMap
          ref={mapRef}
          sites={mapSites}
          activeLayers={activeLayers}
          selectedId={selectedId}
          onSelect={handleSelect}
          enableFlyTo={!embedded}
          className="absolute inset-0 z-0"
        />
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#06080f]">
          <div className="h-8 w-8 rounded-full skeleton-shimmer" />
        </div>
      )}

      {!embedded ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="pointer-events-none absolute left-4 top-4 z-20 md:left-6"
          >
            <GlassPanel glow="emerald" border="gradient" className="pointer-events-auto inline-flex flex-col gap-1 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Satellite className="h-4 w-4 text-emerald-400" />
                <h1 className="text-sm font-semibold">Map Explorer</h1>
                <Badge variant="ai" className="px-1 py-0 text-[9px]">{stats.total} Sites</Badge>
              </div>
              <p className="text-[10px] text-foreground-muted">
                Geospatial env-intelligence console
              </p>
            </GlassPanel>
          </motion.div>

          <MapIntelligenceDrawer
            site={selectedSite}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sites={mapSites}
            onSelectSite={handleSelect}
            activeLayers={activeLayers}
            onToggleLayer={handleToggleLayer}
            events={liveEvents}
            onEventSelect={handleEventSelect}
            playback={playback}
            onTogglePlayback={() => setPlayback((p) => !p)}
            onFitIndia={() => mapRef.current?.fitAllSites()}
            onResetView={() => mapRef.current?.resetView()}
          />

          {!drawerOpen ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="pointer-events-auto absolute right-4 top-4 z-20 flex items-center gap-2 rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)]/90 px-4 py-2.5 text-xs backdrop-blur-xl transition hover:border-emerald-500/30 md:right-6"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              Show Sidebar ({selectedSite.city})
            </motion.button>
          ) : null}
        </>
      ) : (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <GlassPanel className="flex flex-wrap items-center justify-between gap-4 px-5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="ai">{mapSites.length} Active Sites</Badge>
              <Badge variant="warning">
                {mapSites.filter((s) => s.status === "High" || s.status === "Critical").length} High
                Risk
              </Badge>
            </div>
            <Link href="/map">
              <Button variant="secondary" size="sm">
                Open Full Explorer
              </Button>
            </Link>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
