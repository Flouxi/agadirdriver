import { useEffect, useRef, useState } from "react";
import { LocateFixed, Maximize2, Minus, Plus, MapPin, RotateCw } from "lucide-react";
import { findLocationByLabel } from "../data/locations";
import { routeDuration, type RoadRoute } from "../lib/road-route";
import { useCopy } from "../lib/copy";
import "leaflet/dist/leaflet.css";

interface Props {
  from: string;
  to: string;
  pickupTime: string;
  dropoffTime?: string;
  expanded?: boolean;
  onRoute?: (route: RoadRoute | null) => void;
  onExpand?: () => void;
}
function mapPadding(canvas: HTMLDivElement | null) {
  const heading = canvas?.parentElement?.querySelector<HTMLElement>(".ad-map-heading");
  return {
    paddingTopLeft: [40, (heading?.offsetHeight ?? 55) + 38] as [number, number],
    paddingBottomRight: [60, 38] as [number, number],
  };
}
const routes = new Map<string, { route: RoadRoute; expires: number }>();
export default function RouteMap({
  from,
  to,
  pickupTime,
  expanded = false,
  onRoute,
  onExpand,
}: Props) {
  const c = useCopy();
  const start = findLocationByLabel(from),
    end = findLocationByLabel(to);
  const host = useRef<HTMLDivElement>(null),
    mapRef = useRef<import("leaflet").Map | null>(null),
    bounds = useRef<import("leaflet").LatLngBounds | null>(null);
  const interacted = useRef(false),
    retry = useRef<(() => void) | null>(null),
    callback = useRef(onRoute);
  callback.current = onRoute;
  const [status, setStatus] = useState<"loading" | "road" | "estimate" | "unavailable">("loading");
  const [road, setRoad] = useState<RoadRoute | null>(null);
  const known = !!start && !!end && !(start.lat === end.lat && start.lng === end.lng);

  useEffect(() => {
    if (!known || !host.current || !start || !end) {
      callback.current?.(null);
      return;
    }
    let disposed = false,
      map: import("leaflet").Map | undefined,
      resize: ResizeObserver | undefined,
      request: AbortController | undefined;
    const key = start.id + ":" + end.id;
    setStatus("loading");
    setRoad(null);
    callback.current?.(null);
    interacted.current = false;
    void (async () => {
      try {
        const L = (await import("leaflet")).default;
        if (disposed || !host.current) return;
        map = L.map(host.current, {
          scrollWheelZoom: false,
          zoomControl: false,
          doubleClickZoom: false,
          zoomSnap: 0.25,
          zoomAnimation: false,
          fadeAnimation: false,
          markerZoomAnimation: false,
          inertia: false,
        });
        mapRef.current = map;
        map.attributionControl.setPrefix(false);
        L.tileLayer(
          import.meta.env.VITE_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            updateWhenIdle: true,
            attribution:
              import.meta.env.VITE_MAP_TILE_ATTRIBUTION ||
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ).addTo(map);
        const a: [number, number] = [start.lat, start.lng],
          b: [number, number] = [end.lat, end.lng];
        const marker = (point: [number, number], name: string, gold = false) =>
          L.marker(point, {
            keyboard: true,
            title: name,
            icon: L.divIcon({
              className: "ad-route-pin " + (gold ? "ad-route-pin-gold" : ""),
              html: "<span>" + name + "</span>",
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            }),
          }).addTo(map!);
        marker(a, "A");
        marker(b, "B", true);
        const routeLayer = L.layerGroup().addTo(map);
        L.polyline([a, b], {
          color: "#687668",
          weight: 2,
          dashArray: "5 7",
          interactive: false,
        }).addTo(routeLayer);
        bounds.current = L.latLngBounds([a, b]);
        const fit = () => {
          if (map && bounds.current)
            map.fitBounds(bounds.current, {
              ...mapPadding(host.current),
              maxZoom: 14,
              animate: false,
            });
        };
        fit();
        map.on("dragstart", () => {
          interacted.current = true;
        });
        resize = new ResizeObserver(() => {
          if (!map || disposed) return;
          map.invalidateSize({ animate: false, pan: false });
          if (!interacted.current) fit();
        });
        resize.observe(host.current);
        const load = async () => {
          request?.abort();
          request = new AbortController();
          const active = request;
          setStatus("loading");
          const timeout = window.setTimeout(() => active.abort(), 12500);
          try {
            const cached = routes.get(key);
            let result: RoadRoute;
            if (cached && cached.expires > Date.now()) result = cached.route;
            else {
              const response = await fetch(
                "/api/route?" + new URLSearchParams({ from: start.id, to: end.id }),
                { signal: active.signal },
              );
              if (!response.ok) throw new Error("Route unavailable");
              result = (await response.json()) as RoadRoute;
              if (
                result.fromId !== start.id ||
                result.toId !== end.id ||
                !Array.isArray(result.coordinates) ||
                result.coordinates.length < 2 ||
                !Number.isFinite(result.distanceMeters) ||
                !Number.isFinite(result.durationSeconds)
              )
                throw new Error("Invalid route");
              if (routes.size >= 40) routes.delete(routes.keys().next().value!);
              routes.set(key, { route: result, expires: Date.now() + 1800000 });
            }
            if (disposed || active !== request || !map) return;
            routeLayer.clearLayers();
            L.polyline(result.coordinates, {
              color: "#fff",
              weight: 8,
              lineCap: "round",
              interactive: false,
            }).addTo(routeLayer);
            L.polyline(result.coordinates, {
              color: "#26302c",
              weight: 4,
              lineCap: "round",
              interactive: false,
            }).addTo(routeLayer);
            bounds.current = L.latLngBounds([...result.coordinates, a, b]);
            if (!interacted.current) fit();
            setRoad(result);
            setStatus("road");
            callback.current?.(result);
          } catch {
            if (!disposed && active === request) {
              setStatus("estimate");
              callback.current?.(null);
            }
          } finally {
            window.clearTimeout(timeout);
          }
        };
        retry.current = () => {
          void load();
        };
        void load();
      } catch {
        if (!disposed) setStatus("unavailable");
      }
    })();
    return () => {
      disposed = true;
      request?.abort();
      resize?.disconnect();
      retry.current = null;
      mapRef.current = null;
      bounds.current = null;
      map?.remove();
    };
    // Time, language, vehicle and price edits must not recreate or recenter the map.
  }, [start, end, known]);
  const fit = () => {
    interacted.current = false;
    if (bounds.current)
      mapRef.current?.fitBounds(bounds.current, {
        ...mapPadding(host.current),
        maxZoom: 14,
        animate: false,
      });
  };
  const duration = road ? routeDuration(road.durationSeconds) : null;
  return (
    <div className={"ad-map ad-clean-map " + (expanded ? "ad-map-expanded" : "")}>
      <div className="ad-map-stage">
        {known ? (
          <div
            ref={host}
            className="ad-map-canvas"
            onPointerDown={() => {
              interacted.current = true;
            }}
            onKeyDown={() => {
              interacted.current = true;
            }}
            role="region"
            aria-label={c(
              "Route map. A is pickup, B is destination.",
              "Carte du trajet. A : départ, B : destination.",
            )}
          />
        ) : (
          <div className="ad-clean-map-empty">
            <MapPin size={28} />
            <strong>{c("A journey made for you", "Un trajet sur mesure")}</strong>
            <p>
              {c(
                "Our team will confirm the exact route and meeting point.",
                "Notre équipe confirmera le trajet exact et le rendez-vous.",
              )}
            </p>
          </div>
        )}
        {known && (
          <>
            <div className="ad-map-heading">
              <span>{c("Your route", "Votre itinéraire")}</span>
              <strong aria-live="polite">
                {status === "loading"
                  ? c("Finding your road route…", "Recherche de votre itinéraire…")
                  : duration
                    ? (duration.hours ? duration.hours + " h " : "") +
                      (duration.minutes ? duration.minutes + " min" : "") +
                      " · " +
                      Math.round(road!.distanceMeters / 1000) +
                      " km"
                    : c("Route preview", "Aperçu du trajet")}
              </strong>
            </div>
            <div className="ad-clean-map-controls">
              <button
                type="button"
                aria-label={c("Zoom in", "Zoom avant")}
                title={c("Zoom in", "Zoom avant")}
                onClick={() => {
                  interacted.current = true;
                  mapRef.current?.zoomIn();
                }}
              >
                <Plus size={18} />
              </button>
              <button
                type="button"
                aria-label={c("Zoom out", "Zoom arrière")}
                title={c("Zoom out", "Zoom arrière")}
                onClick={() => {
                  interacted.current = true;
                  mapRef.current?.zoomOut();
                }}
              >
                <Minus size={18} />
              </button>
              <button
                type="button"
                aria-label={c("Fit entire route", "Voir tout le trajet")}
                title={c("Fit entire route", "Voir tout le trajet")}
                onClick={fit}
              >
                <LocateFixed size={17} />
              </button>
              {onExpand && (
                <button
                  type="button"
                  aria-label={c("Expand map", "Agrandir la carte")}
                  title={c("Expand map", "Agrandir la carte")}
                  onClick={onExpand}
                >
                  <Maximize2 size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="ad-map-journey-card">
        <div>
          <b>A</b>
          <span>
            <small>
              {c("Pickup", "Départ")} · {pickupTime}
            </small>
            <strong>{from}</strong>
          </span>
        </div>
        <div>
          <b>B</b>
          <span>
            <small>{c("Destination", "Arrivée")}</small>
            <strong>{to}</strong>
          </span>
        </div>
        {known && (
          <p>
            {status === "road"
              ? c(
                  "Approximate driving time · traffic may vary",
                  "Temps de trajet indicatif · selon la circulation",
                )
              : status === "loading"
                ? c("Preparing your route", "Préparation du trajet")
                : c(
                    "Preview only · road route could not load",
                    "Aperçu · itinéraire routier indisponible",
                  )}
            {(status === "estimate" || status === "unavailable") && (
              <button type="button" onClick={() => retry.current?.()}>
                <RotateCw size={12} />
                {c("Retry", "Réessayer")}
              </button>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
