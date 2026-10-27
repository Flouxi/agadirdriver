import { useI18n } from "./i18n";

const french: Record<string, string> = {
  "Economy Sedan": "Berline économique",
  "Comfort Sedan": "Berline confort",
  "Comfort Van": "Van confort",
  "Luxury Sedan": "Berline de luxe",
  "Confirmed at booking": "Modèle confirmé à la réservation",
  "Premium sedan": "Berline haut de gamme",
  "2 medium suitcases plus small hand luggage": "2 valises moyennes et petits bagages à main",
  "3 medium suitcases": "3 valises moyennes",
  "Up to 7 medium suitcases": "Jusqu’à 7 valises moyennes",
  "Up to 3 medium suitcases": "Jusqu’à 3 valises moyennes",
  "Confirm luggage before booking": "Bagages à confirmer avant réservation",
};

export function useVehicleText() {
  const { lang } = useI18n();
  return (text: string) => (lang === "FR" ? (french[text] ?? text) : text);
}
