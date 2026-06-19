"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import {
  INDIA_DEFAULT_ZOOM,
  INDIA_MAP_CENTER,
  type MapSite,
} from "@/lib/data/india-demo";

const DARK_TILES =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_TILES =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

function createPulseIcon(status: MapSite["status"], selected: boolean) {
  const color =
    status === "Critical"
      ? "#f43f5e"
      : status === "High"
        ? "#f59e0b"
        : status === "Medium"
          ? "#10b981"
          : "#38bdf8";

  return L.divIcon({
    className: "terasight-marker",
    html: `
      <div class="terasight-marker-inner ${selected ? "selected" : ""}" style="--marker-color:${color}">
        <span class="terasight-marker-pulse"></span>
        <span class="terasight-marker-dot"></span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function MapLayers({
  sites,
  activeLayers,
  selectedId,
  onSelect,
  enableFlyTo,
}: {
  sites: MapSite[];
  activeLayers: string[];
  selectedId: string;
  onSelect: (site: MapSite) => void;
  enableFlyTo: boolean;
}) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const heatRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const prevSelectedRef = useRef<string | null>(null);

  onSelectRef.current = onSelect;

  const activeLayersKey = activeLayers.join(",");

  const visibleSites = useMemo(
    () =>
      sites.filter((site) => {
        if (activeLayers.includes("waste")) return true;
        return site.layers.some((layer) => activeLayers.includes(layer));
      }),
    [sites, activeLayersKey, activeLayers],
  );

  const markerSyncKey = `${visibleSites.map((site) => site.id).join(",")}:${selectedId}`;

  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 48,
        spiderfyOnMaxZoom: true,
      });
      map.addLayer(clusterRef.current);
    }

    const cluster = clusterRef.current;
    cluster.clearLayers();

    visibleSites.forEach((site) => {
      const marker = L.marker([site.lat, site.lng], {
        icon: createPulseIcon(site.status, site.id === selectedId),
      });

      marker.bindPopup(`
        <div style="font-family:system-ui,sans-serif;min-width:180px">
          <strong>${site.label}</strong><br/>
          <span style="opacity:0.75">${site.city}, ${site.region}</span><br/>
          <span style="color:#10b981">ERI ${site.risk}</span> · ${site.wasteKg} kg
        </div>
      `);

      marker.on("click", () => onSelectRef.current(site));
      cluster.addLayer(marker);
    });

    return () => {
      cluster.clearLayers();
    };
  }, [map, markerSyncKey, visibleSites, selectedId]);

  useEffect(() => {
    if (!heatRef.current) {
      heatRef.current = L.layerGroup();
      map.addLayer(heatRef.current);
    }

    const heat = heatRef.current;
    heat.clearLayers();

    if (!activeLayersKey.includes("heatmap") && !activeLayersKey.includes("risk")) {
      return;
    }

    visibleSites.forEach((site) => {
      const intensity = site.risk / 100;
      L.circle([site.lat, site.lng], {
        radius: 35000 + site.risk * 400,
        color: "transparent",
        fillColor: site.risk >= 70 ? "#f43f5e" : "#f59e0b",
        fillOpacity: 0.12 + intensity * 0.18,
        weight: 0,
      }).addTo(heat);
    });

    return () => {
      heat.clearLayers();
    };
  }, [map, visibleSites, activeLayersKey]);

  useEffect(() => {
    if (!enableFlyTo) return;

    if (prevSelectedRef.current === null) {
      prevSelectedRef.current = selectedId;
      return;
    }

    if (prevSelectedRef.current === selectedId) return;
    prevSelectedRef.current = selectedId;

    const site = sites.find((s) => s.id === selectedId);
    if (site) {
      map.flyTo([site.lat, site.lng], Math.max(map.getZoom(), 7), { duration: 0.8 });
    }
  }, [map, selectedId, sites, enableFlyTo]);

  return null;
}

function ThemeTileLayer() {
  const { resolvedTheme } = useTheme();
  const url = resolvedTheme === "light" ? LIGHT_TILES : DARK_TILES;

  return (
    <TileLayer
      key={url}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      url={url}
    />
  );
}

interface InteractiveIndiaMapProps {
  sites: MapSite[];
  activeLayers: string[];
  selectedId: string;
  onSelect: (site: MapSite) => void;
  className?: string;
  enableFlyTo?: boolean;
}

export function InteractiveIndiaMap({
  sites,
  activeLayers,
  selectedId,
  onSelect,
  className,
  enableFlyTo = false,
}: InteractiveIndiaMapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[INDIA_MAP_CENTER.lat, INDIA_MAP_CENTER.lng]}
        zoom={INDIA_DEFAULT_ZOOM}
        className="h-full w-full rounded-2xl"
        zoomControl={false}
        scrollWheelZoom={enableFlyTo}
        preferCanvas
      >
        <ThemeTileLayer />
        <MapLayers
          sites={sites}
          activeLayers={activeLayers}
          selectedId={selectedId}
          onSelect={onSelect}
          enableFlyTo={enableFlyTo}
        />
      </MapContainer>
    </div>
  );
}
