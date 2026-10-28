export interface RoadRoute {
  fromId: string;
  toId: string;
  coordinates: [number, number][];
  distanceMeters: number;
  durationSeconds: number;
}

// OSRM returns GeoJSON in longitude/latitude order; Leaflet needs latitude/longitude.
export function parseRoadRoute(value: unknown, fromId: string, toId: string): RoadRoute | null {
  const body = value as {
    code?: string;
    routes?: {
      distance?: number;
      duration?: number;
      geometry?: { type?: string; coordinates?: unknown };
    }[];
  } | null;
  const route = body?.code === "Ok" ? body.routes?.[0] : undefined;
  const points = route?.geometry?.coordinates;
  if (
    !route ||
    route.geometry?.type !== "LineString" ||
    !Array.isArray(points) ||
    points.length < 2 ||
    points.length > 50000 ||
    !Number.isFinite(route.distance) ||
    !Number.isFinite(route.duration) ||
    route.distance! <= 0 ||
    route.duration! <= 0
  )
    return null;
  const coordinates: [number, number][] = [];
  for (const point of points) {
    if (
      !Array.isArray(point) ||
      point.length < 2 ||
      !Number.isFinite(point[0]) ||
      !Number.isFinite(point[1]) ||
      Math.abs(point[0]) > 180 ||
      Math.abs(point[1]) > 90
    )
      return null;
    coordinates.push([point[1], point[0]]);
  }
  return {
    fromId,
    toId,
    coordinates,
    distanceMeters: route.distance!,
    durationSeconds: route.duration!,
  };
}

export function routeDuration(seconds: number): { hours: number; minutes: number } {
  const total = Math.max(1, Math.round(seconds / 60));
  return { hours: Math.floor(total / 60), minutes: total % 60 };
}
