import { useEffect, useRef } from "react";
import { getLatLng } from "../data/mapPositions";
import "leaflet/dist/leaflet.css";

/**
 * Real Leaflet map with OpenStreetMap tiles.
 * - No API key required (uses public OSM tiles).
 * - Renders pickup + drop-off pins with time badges above the map.
 * - Draws a subtle curved route line between the two points.
 * - Auto-fits the viewport to the two points with padding.
 */
interface Props {
  from: string;
  to: string;
  pickupTime: string;
  dropoffTime: string;
}

export default function RouteMap({ from, to, pickupTime, dropoffTime }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  const a = getLatLng(from);
  const b = getLatLng(to);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      // Init map (only once)
      if (!mapRef.current) {
        const map = L.map(containerRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
        });
        mapRef.current = map;

        // Grayscale-friendly OSM-based tiles (CartoDB Positron)
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 19,
            subdomains: "abcd",
            attribution:
              '&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        ).addTo(map);

        L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
      }

      const map = mapRef.current;

      // Clear previous route/pins
      map.eachLayer((layer) => {
        // keep tile layer, remove markers / polylines
        if (
          layer instanceof L.Marker ||
          layer instanceof L.Polyline ||
          layer instanceof L.LayerGroup
        ) {
          map.removeLayer(layer);
        }
      });

      // Fetch the actual driving route from OSRM (public demo endpoint).
      // Falls back to a straight line if the request fails.
      let points: [number, number][] = [
        [a.lat, a.lng],
        [b.lat, b.lng],
      ];
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          const coords: [number, number][] | undefined =
            json?.routes?.[0]?.geometry?.coordinates;
          if (coords && coords.length > 1) {
            points = coords.map(([lng, lat]) => [lat, lng] as [number, number]);
          }
        }
      } catch {
        // network/CORS failure — keep straight fallback
      }
      if (cancelled) return;

      // White halo + dark line, following real roads
      L.polyline(points, { color: "#ffffff", weight: 8, opacity: 0.95 }).addTo(map);
      L.polyline(points, { color: "#111827", weight: 4, opacity: 1 }).addTo(map);

      const pickupIcon = L.divIcon({
        className: "",
        html: pinHtml("#111827"),
        iconSize: [22, 28],
        iconAnchor: [11, 28],
      });
      const dropIcon = L.divIcon({
        className: "",
        html: pinHtml("#f0a500"),
        iconSize: [22, 28],
        iconAnchor: [11, 28],
      });
      L.marker([a.lat, a.lng], { icon: pickupIcon }).addTo(map);
      L.marker([b.lat, b.lng], { icon: dropIcon }).addTo(map);

      // Fit bounds around the full route
      const bounds = L.latLngBounds(points.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(bounds, { padding: [60, 60] });
    })();

    return () => {
      cancelled = true;
    };
  }, [a.lat, a.lng, b.lat, b.lng]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[360px] rounded-lg overflow-hidden border border-gray-100 bg-[#e6ecf0]">
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Pickup label (top-left) */}
      <div className="absolute top-3 left-3 z-[500] flex items-center gap-1.5 whitespace-nowrap max-w-[70%]">
        <div className="bg-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] px-2 py-1 text-[11px] text-gray-900 overflow-hidden text-ellipsis">
          <span className="block text-[9px] font-semibold uppercase tracking-wide text-gray-500 leading-none mb-0.5">
            Pick up
          </span>
          <span className="font-medium block truncate max-w-[180px]">✈ {from}</span>
        </div>
        <div className="rounded px-2 py-1 text-[11px] font-bold text-white shadow-sm bg-[#111827]">
          {pickupTime}
        </div>
      </div>

      {/* Drop-off label (bottom-left) */}
      <div className="absolute bottom-3 left-3 z-[500] flex items-center gap-1.5 whitespace-nowrap max-w-[70%]">
        <div className="bg-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] px-2 py-1 text-[11px] text-gray-900 overflow-hidden text-ellipsis">
          <span className="block text-[9px] font-semibold uppercase tracking-wide text-gray-500 leading-none mb-0.5">
            Drop-off
          </span>
          <span className="font-medium block truncate max-w-[180px]">📍 {to}</span>
        </div>
        <div className="rounded px-2 py-1 text-[11px] font-bold text-white shadow-sm bg-[#f0a500]">
          {dropoffTime}
        </div>
      </div>
    </div>
  );
}

function pinHtml(color: string) {
  return `<svg width="22" height="28" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${color}"/><circle cx="14" cy="14" r="5" fill="#ffffff"/></svg>`;
}
