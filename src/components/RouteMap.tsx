import { useEffect, useRef, useState } from "react";
import { LATLNG_POSITIONS } from "../data/mapPositions";
import { findLocationByLabel } from "../data/locations";
import { useCopy } from "../lib/copy";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
interface Props {
  from: string;
  to: string;
  pickupTime: string;
  dropoffTime: string;
  expanded?: boolean;
}
export default function RouteMap({ from, to, pickupTime, expanded = false }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const [status, setStatus] = useState<"loading" | "road" | "estimate" | "unavailable">("loading");
  const c = useCopy();
  const coordinate = (label: string) =>
    findLocationByLabel(label) ??
    Object.entries(LATLNG_POSITIONS).find(
      ([name]) => name.toLowerCase() === label.trim().toLowerCase(),
    )?.[1];
  const known = !!coordinate(from) && !!coordinate(to);
  useEffect(() => {
    if (!known || !host.current) return;
    const controller = new AbortController();
    let disposed = false;
    let map: import("leaflet").Map | undefined;
    const timer = window.setTimeout(() => controller.abort(), 6000);
    setStatus("loading");
    void (async () => {
      try {
        const L = (await import("leaflet")).default;
        if (disposed || !host.current) return;
        const start = coordinate(from)!;
        const end = coordinate(to)!;
        map = L.map(host.current, { scrollWheelZoom: false, zoomControl: true });
        mapRef.current = map;
        if (expanded) map.zoomControl.setPosition("topright");
        L.tileLayer(
          import.meta.env.VITE_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              import.meta.env.VITE_MAP_TILE_ATTRIBUTION ||
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ).addTo(map);
        const startPoint: [number, number] = [start.lat, start.lng],
          endPoint: [number, number] = [end.lat, end.lng];
        const pickupMarker = L.circleMarker(startPoint, {
          radius: 6,
          color: "#fff",
          weight: 3,
          fillColor: "#181c16",
          fillOpacity: 1,
        }).addTo(map);
        const dropoffMarker = L.circleMarker(endPoint, {
          radius: 6,
          color: "#fff",
          weight: 3,
          fillColor: "#e8ac2a",
          fillOpacity: 1,
        }).addTo(map);
        if (expanded) {
          const label = (title: string, place: string, time: string, gold: boolean) => {
            const element = document.createElement("div");
            element.className = "ad-map-station " + (gold ? "ad-map-station-gold" : "");
            const text = document.createElement("span");
            const small = document.createElement("small");
            small.textContent = title;
            const strong = document.createElement("strong");
            strong.textContent = place;
            text.append(small, strong);
            element.append(text);
            if (time) {
              const badge = document.createElement("b");
              badge.textContent = time;
              element.append(badge);
            }
            return element;
          };
          pickupMarker
            .bindTooltip(label(c("Pick up", "Départ"), from, pickupTime, false), {
              permanent: true,
              direction: "bottom",
              offset: [0, 10],
              className: "ad-map-station-tooltip",
            })
            .openTooltip();
          dropoffMarker
            .bindTooltip(label(c("Drop-off", "Arrivée"), to, "", true), {
              permanent: true,
              direction: "top",
              offset: [0, -10],
              className: "ad-map-station-tooltip",
            })
            .openTooltip();
        }
        const fallback = L.polyline([startPoint, endPoint], {
          color: "#727c66",
          weight: 3,
          dashArray: "6 8",
        }).addTo(map);
        map.fitBounds(L.latLngBounds([startPoint, endPoint]), {
          padding: expanded ? [80, 105] : [35, 40],
          maxZoom: 13,
        });
        setStatus("estimate");
        try {
          const response = await fetch(
            "https://router.project-osrm.org/route/v1/driving/" +
              start.lng +
              "," +
              start.lat +
              ";" +
              end.lng +
              "," +
              end.lat +
              "?overview=full&geometries=geojson",
            { signal: controller.signal },
          );
          if (!response.ok) return;
          const json = await response.json();
          const coordinates = json.routes?.[0]?.geometry?.coordinates as number[][] | undefined;
          if (disposed || !map || !coordinates?.length) return;
          const route: [number, number][] = coordinates
            .filter((p) => p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]))
            .map((p) => [p[1], p[0]]);
          if (route.length < 2) return;
          fallback.remove();
          L.polyline(route, { color: "#fff", weight: 7 }).addTo(map);
          L.polyline(route, { color: "#283421", weight: 4 }).addTo(map);
          map.fitBounds(L.latLngBounds(route), {
            padding: expanded ? [80, 105] : [30, 35],
            maxZoom: 13,
          });
          setStatus("road");
        } catch {
          /* The visible dashed estimate remains usable when routing is offline. */
        }
      } catch {
        if (!disposed) setStatus("unavailable");
      } finally {
        window.clearTimeout(timer);
      }
    })();
    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timer);
      mapRef.current = null;
      map?.remove();
    };
  }, [from, to, known, expanded, pickupTime, c]);
  if (!known)
    return (
      <div className="ad-map-placeholder">
        <MapPin size={26} />
        <strong>
          {c("Your route, confirmed personally.", "Votre itinéraire, confirmé personnellement.")}
        </strong>
        <p>
          {c(
            "Our team will confirm the exact pickup point and route for this address.",
            "Notre équipe confirmera le lieu exact et l'itinéraire pour cette adresse.",
          )}
        </p>
      </div>
    );
  return (
    <div className={"ad-map " + (expanded ? "ad-map-expanded" : "")}>
      <div
        ref={host}
        className="ad-map-canvas"
        aria-label={c("Indicative route map", "Carte indicative du trajet")}
      />
      <span className="ad-map-label">
        {status === "road"
          ? c("Indicative driving route", "Itinéraire routier indicatif")
          : status === "unavailable"
            ? c(
                "Map unavailable · journey details are shown below",
                "Carte indisponible · détails du trajet ci-dessous",
              )
            : c(
                "Approximate route · not live navigation",
                "Trajet approximatif · sans navigation en temps réel",
              )}
      </span>
      {!expanded && <span className="ad-map-time">{pickupTime}</span>}
      {expanded && (
        <button
          className="ad-map-recenter"
          aria-label={c("Recenter route", "Recentrer le trajet")}
          onClick={() => {
            const start = coordinate(from),
              end = coordinate(to);
            if (start && end)
              mapRef.current?.fitBounds(
                [
                  [start.lat, start.lng],
                  [end.lat, end.lng],
                ],
                { padding: [80, 105], maxZoom: 13 },
              );
          }}
        >
          <MapPin size={16} />
        </button>
      )}
    </div>
  );
}
