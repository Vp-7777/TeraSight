"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

import {
  INDIA_DEFAULT_ZOOM,
  INDIA_MAP_CENTER,
  riskColor,
  type MapSite,
} from "@/lib/data/india-demo";
import {
  sitesToGeoJSON,
  type MapLayerId,
} from "@/lib/data/map-intelligence";

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const HEATMAP_COLORS: Record<MapLayerId, string[]> = {
  risk: ["#0a1628", "#7f1d1d", "#dc2626", "#f43f5e", "#fecdd3"],
  plastic: ["#0a1628", "#0c4a6e", "#0284c7", "#38bdf8", "#bae6fd"],
  cleanup: ["#0a1628", "#064e3b", "#059669", "#10b981", "#a7f3d0"],
  carbon: ["#0a1628", "#3b0764", "#7c3aed", "#a78bfa", "#ddd6fe"],
};

function createMarkerElement(site: MapSite, selected: boolean) {
  const color = riskColor(site.status);
  const el = document.createElement("button");
  el.type = "button";
  el.className = "maplibregl-pulse-marker";
  el.setAttribute("aria-label", site.label);
  el.innerHTML = `
    <span class="maplibregl-pulse-marker__ring" style="--marker-color:${color}"></span>
    <span class="maplibregl-pulse-marker__dot" style="--marker-color:${color}"></span>
  `;
  if (selected) el.classList.add("maplibregl-pulse-marker--selected");
  return el;
}

interface MapLibreIndiaMapProps {
  sites: MapSite[];
  activeLayer: MapLayerId;
  selectedId: string;
  onSelect: (site: MapSite) => void;
  className?: string;
  enableFlyTo?: boolean;
}

export function MapLibreIndiaMap({
  sites,
  activeLayer,
  selectedId,
  onSelect,
  className,
  enableFlyTo = true,
}: MapLibreIndiaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  const prevSelectedRef = useRef<string | null>(null);

  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: OSM_ATTRIBUTION,
          },
        },
        layers: [
          {
            id: "osm-base",
            type: "raster",
            source: "osm",
            paint: {
              "raster-brightness-min": 0.05,
              "raster-brightness-max": 0.45,
              "raster-contrast": 0.35,
              "raster-saturation": -0.6,
              "raster-hue-rotate": 195,
            },
          },
        ],
      },
      center: [INDIA_MAP_CENTER.lng, INDIA_MAP_CENTER.lat],
      zoom: INDIA_DEFAULT_ZOOM,
      minZoom: 3.5,
      maxZoom: 14,
      attributionControl: false,
      pitch: 0,
      bearing: 0,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    map.on("load", () => {
      map.addSource("sites", {
        type: "geojson",
        data: sitesToGeoJSON(sites, activeLayer),
      });

      map.addLayer({
        id: "environmental-heatmap",
        type: "heatmap",
        source: "sites",
        paint: {
          "heatmap-weight": ["get", "weight"],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 4, 0.8, 8, 1.6],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 4, 28, 8, 48],
          "heatmap-opacity": 0.72,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            HEATMAP_COLORS[activeLayer][0],
            0.25,
            HEATMAP_COLORS[activeLayer][1],
            0.5,
            HEATMAP_COLORS[activeLayer][2],
            0.75,
            HEATMAP_COLORS[activeLayer][3],
            1,
            HEATMAP_COLORS[activeLayer][4],
          ],
        },
      });

      map.addLayer({
        id: "cleanup-zones",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "cleanup"], 0, 8, 100, 28],
          "circle-color": "#10b981",
          "circle-opacity": 0.12,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#34d399",
          "circle-stroke-opacity": 0.35,
        },
        layout: { visibility: activeLayer === "cleanup" ? "visible" : "none" },
      });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const syncLayers = () => {
      if (!map.isStyleLoaded()) return;

      const source = map.getSource("sites") as maplibregl.GeoJSONSource | undefined;
      if (source) {
        source.setData(sitesToGeoJSON(sites, activeLayer));
      }

      if (map.getLayer("environmental-heatmap")) {
        map.setPaintProperty("environmental-heatmap", "heatmap-color", [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          HEATMAP_COLORS[activeLayer][0],
          0.25,
          HEATMAP_COLORS[activeLayer][1],
          0.5,
          HEATMAP_COLORS[activeLayer][2],
          0.75,
          HEATMAP_COLORS[activeLayer][3],
          1,
          HEATMAP_COLORS[activeLayer][4],
        ]);
      }

      if (map.getLayer("cleanup-zones")) {
        map.setLayoutProperty(
          "cleanup-zones",
          "visibility",
          activeLayer === "cleanup" ? "visible" : "none",
        );
      }
    };

    syncLayers();
    map.on("styledata", syncLayers);
    return () => {
      map.off("styledata", syncLayers);
    };
  }, [sites, activeLayer]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    sites.forEach((site) => {
      const el = createMarkerElement(site, site.id === selectedId);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(site);
      });

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([site.lng, site.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [sites, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !enableFlyTo) return;

    if (prevSelectedRef.current === null) {
      prevSelectedRef.current = selectedId;
      return;
    }

    if (prevSelectedRef.current === selectedId) return;
    prevSelectedRef.current = selectedId;

    const site = sites.find((s) => s.id === selectedId);
    if (!site) return;

    map.flyTo({
      center: [site.lng, site.lat],
      zoom: Math.max(map.getZoom(), 7.2),
      duration: 1400,
      essential: true,
      curve: 1.42,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }, [selectedId, sites, enableFlyTo]);

  return (
    <div className={className}>
      <div ref={containerRef} className="maplibre-india-map h-full w-full" />
      <div className="maplibre-satellite-vignette pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
