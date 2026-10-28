import { ALL_LOCATIONS } from "../data/locations";
import { parseRoadRoute, type RoadRoute } from "./road-route";

const TTL = 30 * 60 * 1000;
const MAX_ROUTES = 100;
const places = new Map(
  ALL_LOCATIONS.filter((place) => place.id !== "h-hotel-not-listed").map((place) => [
    place.id,
    place,
  ]),
);

export function createRouteHandler(fetchRoute: typeof fetch = fetch) {
  const cache = new Map<string, { route: RoadRoute; expires: number }>();
  const pending = new Map<string, Promise<RoadRoute>>();
  return async function routeHandler(request: Request): Promise<Response> {
    if (request.method !== "GET")
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: { Allow: "GET", "Cache-Control": "no-store" } },
      );
    const url = new URL(request.url),
      from = places.get(url.searchParams.get("from") ?? ""),
      to = places.get(url.searchParams.get("to") ?? "");
    if (!from || !to || (from.lat === to.lat && from.lng === to.lng))
      return Response.json(
        { error: "Choose two different listed places" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    const key = from.id + ":" + to.id;
    const cached = cache.get(key);
    const headers = {
      "Cache-Control": "public, max-age=600",
      "Vercel-CDN-Cache-Control": "public, max-age=1800",
      "X-Content-Type-Options": "nosniff",
    };
    if (cached && cached.expires > Date.now()) return Response.json(cached.route, { headers });
    cache.delete(key);
    try {
      let task = pending.get(key);
      if (!task) {
        // The upstream and coordinates are fixed by our catalog, never supplied as arbitrary URLs.
        task = (async () => {
          const response = await fetchRoute(
            "https://router.project-osrm.org/route/v1/driving/" +
              from.lng +
              "," +
              from.lat +
              ";" +
              to.lng +
              "," +
              to.lat +
              "?overview=simplified&geometries=geojson&steps=false",
            { signal: AbortSignal.timeout(9000), headers: { Accept: "application/json" } },
          );
          if (!response.ok) throw new Error("Routing service unavailable");
          const route = parseRoadRoute(await response.json(), from.id, to.id);
          if (!route) throw new Error("Invalid road route");
          if (cache.size >= MAX_ROUTES) cache.delete(cache.keys().next().value!);
          cache.set(key, { route, expires: Date.now() + TTL });
          return route;
        })();
        pending.set(key, task);
        void task.finally(() => pending.delete(key)).catch(() => {});
      }
      return Response.json(await task, { headers });
    } catch {
      return Response.json(
        { error: "Road route temporarily unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  };
}
export const handleRouteRequest = createRouteHandler();
