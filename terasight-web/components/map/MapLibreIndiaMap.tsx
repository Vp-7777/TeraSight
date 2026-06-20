"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import {
  INDIA_DEFAULT_ZOOM,
  INDIA_MAP_CENTER,
  formatInr,
  riskColor,
  type MapSite,
} from "@/lib/data/india-demo";
import {
  primaryHeatmapLayer,
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
  el.setAttribute("aria-label", `${site.city}: ERI ${site.risk}, ${site.wasteKg} kg waste`);
  el.title = [
    site.city,
    `ERI: ${site.risk}/100`,
    `Waste: ${site.wasteKg} kg`,
    `Carbon recovery: ${site.carbonRecoveryPct}%`,
    `Cleanup: ${formatInr(site.cleanupCostInr)}`,
    `Last scan: ${site.lastScanAt}`,
  ].join(" · ");
  el.innerHTML = `
    <span class="maplibregl-pulse-marker__ring" style="--marker-color:${color}"></span>
    <span class="maplibregl-pulse-marker__dot" style="--marker-color:${color}"></span>
  `;
  if (selected) el.classList.add("maplibregl-pulse-marker--selected");
  return el;
}

export interface MapLibreIndiaMapHandle {
  fitAllSites: () => void;
  resetView: () => void;
}

interface MapLibreIndiaMapProps {
  sites: MapSite[];
  activeLayers: MapLayerId[];
  selectedId: string;
  onSelect: (site: MapSite) => void;
  className?: string;
  enableFlyTo?: boolean;
}

export const MapLibreIndiaMap = forwardRef<MapLibreIndiaMapHandle, MapLibreIndiaMapProps>(
  function MapLibreIndiaMap(
    { sites, activeLayers, selectedId, onSelect, className, enableFlyTo = true },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);
    const onSelectRef = useRef(onSelect);
    const prevSelectedRef = useRef<string | null>(null);
    const sitesRef = useRef(sites);

    onSelectRef.current = onSelect;
    sitesRef.current = sites;

    useImperativeHandle(ref, () => ({
      fitAllSites: () => {
        const map = mapRef.current;
        if (!map || sitesRef.current.length === 0) return;
        const bounds = new maplibregl.LngLatBounds();
        sitesRef.current.forEach((site) => bounds.extend([site.lng, site.lat]));
        map.fitBounds(bounds, {
          padding: { top: 120, bottom: 80, left: 280, right: 420 },
          duration: 1600,
          essential: true,
        });
      },
      resetView: () => {
        const map = mapRef.current;
        if (!map) return;
        map.flyTo({
          center: [INDIA_MAP_CENTER.lng, INDIA_MAP_CENTER.lat],
          zoom: INDIA_DEFAULT_ZOOM,
          pitch: 0,
          bearing: 0,
          duration: 1400,
          essential: true,
          curve: 1.42,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      },
    }));

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
                "raster-brightness-min": 0.04,
                "raster-brightness-max": 0.42,
                "raster-contrast": 0.4,
                "raster-saturation": -0.55,
                "raster-hue-rotate": 200,
              },
            },
          ],
        },
        center: [INDIA_MAP_CENTER.lng, INDIA_MAP_CENTER.lat],
        zoom: INDIA_DEFAULT_ZOOM - 0.3,
        minZoom: 3.5,
        maxZoom: 14,
        attributionControl: false,
        pitch: 0,
        bearing: 0,
      });

      map.scrollZoom.setWheelZoomRate(1 / 450);
      map.dragPan.enable({ linearity: 0.3, maxSpeed: 1400, deceleration: 2500 });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "bottom-right",
      );
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

      map.on("load", () => {
        map.addSource("sites", {
          type: "geojson",
          data: sitesToGeoJSON(sites, activeLayers),
        });

        map.addLayer({
          id: "environmental-heatmap",
          type: "heatmap",
          source: "sites",
          paint: {
            "heatmap-weight": ["get", "weight"],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 4, 0.9, 8, 1.8],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 4, 32, 8, 52],
            "heatmap-opacity": 0.75,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              HEATMAP_COLORS[primaryHeatmapLayer(activeLayers)][0],
              0.25,
              HEATMAP_COLORS[primaryHeatmapLayer(activeLayers)][1],
              0.5,
              HEATMAP_COLORS[primaryHeatmapLayer(activeLayers)][2],
              0.75,
              HEATMAP_COLORS[primaryHeatmapLayer(activeLayers)][3],
              1,
              HEATMAP_COLORS[primaryHeatmapLayer(activeLayers)][4],
            ],
          },
        });

        map.addLayer({
          id: "plastic-zones",
          type: "circle",
          source: "sites",
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["get", "plastic"], 0, 10, 35, 36],
            "circle-color": "#38bdf8",
            "circle-opacity": 0.14,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#7dd3fc",
            "circle-stroke-opacity": 0.4,
          },
          layout: { visibility: "none" },
        });

        map.addLayer({
          id: "cleanup-zones",
          type: "circle",
          source: "sites",
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["get", "cleanup"], 0, 12, 100, 32],
            "circle-color": "#10b981",
            "circle-opacity": 0.12,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#34d399",
            "circle-stroke-opacity": 0.4,
          },
          layout: { visibility: "none" },
        });

        map.addLayer({
          id: "carbon-zones",
          type: "circle",
          source: "sites",
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["get", "carbon"], 0, 8, 100, 30],
            "circle-color": "#a78bfa",
            "circle-opacity": 0.14,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#c4b5fd",
            "circle-stroke-opacity": 0.45,
          },
          layout: { visibility: "none" },
        });

        map.easeTo({
          zoom: INDIA_DEFAULT_ZOOM,
          duration: 1200,
          easing: (t) => 1 - Math.pow(1 - t, 3),
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

        const heatLayer = primaryHeatmapLayer(activeLayers);
        const source = map.getSource("sites") as maplibregl.GeoJSONSource | undefined;
        if (source) {
          source.setData(sitesToGeoJSON(sites, activeLayers));
        }

        if (map.getLayer("environmental-heatmap")) {
          map.setLayoutProperty(
            "environmental-heatmap",
            "visibility",
            activeLayers.length > 0 ? "visible" : "none",
          );
          map.setPaintProperty("environmental-heatmap", "heatmap-color", [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            HEATMAP_COLORS[heatLayer][0],
            0.25,
            HEATMAP_COLORS[heatLayer][1],
            0.5,
            HEATMAP_COLORS[heatLayer][2],
            0.75,
            HEATMAP_COLORS[heatLayer][3],
            1,
            HEATMAP_COLORS[heatLayer][4],
          ]);
        }

        if (map.getLayer("plastic-zones")) {
          map.setLayoutProperty(
            "plastic-zones",
            "visibility",
            activeLayers.includes("plastic") ? "visible" : "none",
          );
        }

        if (map.getLayer("cleanup-zones")) {
          map.setLayoutProperty(
            "cleanup-zones",
            "visibility",
            activeLayers.includes("cleanup") ? "visible" : "none",
          );
        }

        if (map.getLayer("carbon-zones")) {
          map.setLayoutProperty(
            "carbon-zones",
            "visibility",
            activeLayers.includes("carbon") ? "visible" : "none",
          );
        }
      };

      syncLayers();
      map.on("styledata", syncLayers);
      return () => {
        map.off("styledata", syncLayers);
      };
    }, [sites, activeLayers]);

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
        <div className="map-scan-overlay pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="scan-line absolute inset-x-0 h-24 opacity-20" />
        </div>
      </div>
    );
  },
);
