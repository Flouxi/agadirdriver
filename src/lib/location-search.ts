import { AIRPORTS, type LocationOption } from "../data/locations";

export const normalizeLocation = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// Search aliases never replace canonical labels used by tariffs and routing.
const tokens = (value: string) =>
  normalizeLocation(value)
    .replace(/\bairports?\b/g, "aeroport")
    .replace(/\bmarrakesh\b/g, "marrakech")
    .replace(/\btangier\b/g, "tanger")
    .replace(/\bfez\b/g, "fes")
    .replace(/\b(?:downtown|city\s+cent(?:er|re))\b/g, "centre ville")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

export function matchesLocation(place: LocationOption, query: string): boolean {
  const airportCode = AIRPORTS.find((airport) => airport.id === normalizeLocation(query));
  if (airportCode) return place.id === airportCode.id;
  const haystack = tokens(`${place.label} ${place.sublabel ?? ""} ${place.id}`).join(" ");
  return tokens(query).every((token) => haystack.includes(token));
}
