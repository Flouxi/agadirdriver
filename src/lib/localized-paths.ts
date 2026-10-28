export const LANGUAGE_PAIRS = [
  ["/agadir-airport-transfer", "/fr/transfert-aeroport-agadir"],
  ["/agadir-taxi", "/fr/taxi-agadir"],
  ["/private-driver-agadir", "/fr/chauffeur-prive-agadir"],
  ["/airport-transfer-taghazout", "/fr/transfert-aeroport-taghazout"],
  ["/blog/agadir-airport-transfer-prices-and-booking-guide", "/fr/prix-transfert-aeroport-agadir"],
  ["/blog/agadir-to-taghazout-transport-options", "/fr/guides/agadir-taghazout"],
] as const;

export function languagePair(path: string) {
  return LANGUAGE_PAIRS.find((pair) => pair.some((url) => url === path));
}

export function localizedPath(path: string, lang: "EN" | "FR"): string | undefined {
  return languagePair(path)?.[lang === "FR" ? 1 : 0];
}

export function localizedHref(href: string, lang: "EN" | "FR"): string {
  const boundary = href.search(/[?#]/);
  const path = boundary < 0 ? href : href.slice(0, boundary);
  return (localizedPath(path, lang) ?? path) + (boundary < 0 ? "" : href.slice(boundary));
}

export function languageForPath(path: string): "EN" | "FR" | undefined {
  if (path.startsWith("/fr/")) return "FR";
  return languagePair(path) ? "EN" : undefined;
}
