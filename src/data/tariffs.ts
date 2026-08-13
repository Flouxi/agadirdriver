// AgadirDriver.com official tariff structure.
// All prices are PER VEHICLE, one-way, in EUR. Never per person.
// Fixed route tariffs always win over the generic distance bands.

export type VehicleTier =
  | 'economy'
  | 'comfort-sedan'
  | 'comfort-van'
  | 'suv'
  | 'luxury-sedan'
  | 'minibus-14'
  | 'minibus-17';

/** The five published price columns of the tariff tables. */
export interface TariffRow {
  economy: number;
  comfortSedan: number;
  comfortVan: number;
  minibus14: number;
  minibus17: number;
}

/** SUV and Luxury Sedan are upgrades quoted from the published columns. */
export const UPGRADE_FACTORS = {
  suv: 1.1, // priced from the Comfort Van column
  luxury: 1.45, // priced from the Comfort Van column
} as const;

export function priceForTier(row: TariffRow, tier: VehicleTier): number {
  switch (tier) {
    case 'economy':
      return row.economy;
    case 'comfort-sedan':
      return row.comfortSedan;
    case 'comfort-van':
      return row.comfortVan;
    case 'suv':
      return Math.round(row.comfortVan * UPGRADE_FACTORS.suv);
    case 'luxury-sedan':
      return Math.round(row.comfortVan * UPGRADE_FACTORS.luxury);
    case 'minibus-14':
      return row.minibus14;
    case 'minibus-17':
      return row.minibus17;
  }
}

/** Tariff zones. A pickup/drop-off text is matched to one of these. */
export type ZoneId =
  | 'agadir-airport'
  | 'agadir-city'
  | 'aourir'
  | 'tamraght'
  | 'taghazout'
  | 'taghazout-bay'
  | 'imi-ouaddar'
  | 'paradise-valley'
  | 'taroudant'
  | 'mirleft'
  | 'tiznit'
  | 'imsouane'
  | 'sidi-ifni'
  | 'essaouira'
  | 'marrakech-airport'
  | 'marrakech-city'
  | 'agafay'
  | 'ourika';

interface Zone {
  id: ZoneId;
  label: string;
  /** Lowercase keywords matched against the free-text location. */
  keywords: string[];
}

/** Order matters: the most specific zones are tested first. */
export const ZONES: Zone[] = [
  { id: 'agadir-airport', label: 'Agadir Al Massira Airport', keywords: ['agadir al massira', 'al massira', 'aga)', 'agadir airport', 'aéroport agadir', 'aeroport agadir'] },
  { id: 'marrakech-airport', label: 'Marrakech Menara Airport', keywords: ['marrakech ménara', 'marrakech menara', 'rak)', 'marrakech airport', 'aéroport marrakech', 'aeroport marrakech'] },
  { id: 'taghazout-bay', label: 'Taghazout Bay', keywords: ['taghazout bay', 'hyatt', 'fairmont'] },
  { id: 'taghazout', label: 'Taghazout', keywords: ['taghazout'] },
  { id: 'tamraght', label: 'Tamraght', keywords: ['tamraght'] },
  { id: 'aourir', label: 'Aourir / Banana Village', keywords: ['aourir', 'banana village', 'banana point'] },
  { id: 'imi-ouaddar', label: 'Imi Ouaddar', keywords: ['imi ouaddar', 'imi-ouaddar'] },
  { id: 'paradise-valley', label: 'Paradise Valley', keywords: ['paradise valley', 'paradis'] },
  { id: 'imsouane', label: 'Imsouane', keywords: ['imsouane'] },
  { id: 'sidi-ifni', label: 'Sidi Ifni', keywords: ['sidi ifni', 'legzira'] },
  { id: 'mirleft', label: 'Mirleft', keywords: ['mirleft'] },
  { id: 'tiznit', label: 'Tiznit', keywords: ['tiznit'] },
  { id: 'taroudant', label: 'Taroudant', keywords: ['taroudant'] },
  { id: 'essaouira', label: 'Essaouira', keywords: ['essaouira', 'mogador', 'esu)'] },
  { id: 'agafay', label: 'Agafay Desert', keywords: ['agafay'] },
  { id: 'ourika', label: 'Ourika Valley', keywords: ['ourika'] },
  { id: 'marrakech-city', label: 'Marrakech', keywords: ['marrakech'] },
  { id: 'agadir-city', label: 'Agadir', keywords: ['agadir', 'anza', 'inezgane', 'founty'] },
];

export function findZone(location: string): ZoneId | null {
  const value = (location || '').toLowerCase();
  if (!value.trim()) return null;
  for (const zone of ZONES) {
    if (zone.keywords.some((k) => value.includes(k))) return zone.id;
  }
  return null;
}

export function zoneLabel(id: ZoneId): string {
  return ZONES.find((z) => z.id === id)?.label ?? id;
}

export interface FixedRoute {
  from: ZoneId;
  to: ZoneId;
  /** Approximate journey time shown to the customer (estimate, not a guarantee). */
  duration: string;
  prices: TariffRow;
}

const row = (
  economy: number,
  comfortSedan: number,
  comfortVan: number,
  minibus14: number,
  minibus17: number,
): TariffRow => ({ economy, comfortSedan, comfortVan, minibus14, minibus17 });

/** Section 3 & 4 — Agadir Airport, Agadir city and the surf coast. */
export const AGADIR_ROUTES: FixedRoute[] = [
  { from: 'agadir-airport', to: 'agadir-city', duration: '30–35 min', prices: row(22, 25, 30, 45, 55) },
  { from: 'agadir-airport', to: 'aourir', duration: '35–45 min', prices: row(25, 28, 35, 50, 60) },
  { from: 'agadir-airport', to: 'tamraght', duration: '45–50 min', prices: row(30, 32, 38, 55, 65) },
  { from: 'agadir-airport', to: 'taghazout', duration: '45–55 min', prices: row(30, 32, 38, 55, 65) },
  { from: 'agadir-airport', to: 'taghazout-bay', duration: '45–55 min', prices: row(30, 32, 38, 55, 65) },
  { from: 'agadir-airport', to: 'imi-ouaddar', duration: 'about 1h10', prices: row(40, 45, 55, 75, 90) },
  { from: 'agadir-airport', to: 'taroudant', duration: 'about 1h', prices: row(45, 50, 60, 85, 100) },
  { from: 'agadir-airport', to: 'paradise-valley', duration: 'about 1h15', prices: row(50, 55, 65, 90, 105) },
  { from: 'agadir-airport', to: 'mirleft', duration: 'about 1h30', prices: row(50, 55, 65, 90, 105) },
  { from: 'agadir-airport', to: 'tiznit', duration: 'about 1h45', prices: row(70, 75, 90, 110, 130) },
  { from: 'agadir-airport', to: 'imsouane', duration: 'about 2h', prices: row(75, 80, 95, 115, 135) },
  { from: 'agadir-airport', to: 'sidi-ifni', duration: 'about 2h30', prices: row(80, 85, 100, 120, 145) },
  { from: 'agadir-airport', to: 'essaouira', duration: 'about 3h', prices: row(100, 110, 125, 160, 190) },
  { from: 'agadir-airport', to: 'marrakech-city', duration: 'about 3h', prices: row(120, 130, 145, 175, 210) },

  { from: 'agadir-city', to: 'aourir', duration: '20–25 min', prices: row(25, 28, 35, 50, 60) },
  { from: 'agadir-city', to: 'tamraght', duration: '25–30 min', prices: row(25, 30, 35, 50, 60) },
  { from: 'agadir-city', to: 'taghazout', duration: '30–35 min', prices: row(25, 30, 35, 50, 60) },
  { from: 'agadir-city', to: 'taghazout-bay', duration: '30–35 min', prices: row(25, 30, 35, 50, 60) },
  { from: 'agadir-city', to: 'paradise-valley', duration: 'about 1h', prices: row(50, 55, 65, 90, 105) },
  { from: 'agadir-city', to: 'taroudant', duration: 'about 1h', prices: row(45, 50, 60, 85, 100) },
  { from: 'agadir-city', to: 'imsouane', duration: 'about 1h45', prices: row(75, 80, 95, 115, 135) },
  { from: 'agadir-city', to: 'mirleft', duration: 'about 1h30', prices: row(50, 55, 65, 90, 105) },
  { from: 'agadir-city', to: 'tiznit', duration: 'about 1h30', prices: row(70, 75, 90, 110, 130) },
  { from: 'agadir-city', to: 'essaouira', duration: 'about 3h', prices: row(100, 110, 125, 160, 190) },
  { from: 'agadir-city', to: 'marrakech-city', duration: 'about 3h', prices: row(120, 130, 145, 175, 210) },

  { from: 'taghazout', to: 'marrakech-city', duration: 'about 3h45', prices: row(130, 140, 160, 210, 250) },
  { from: 'tamraght', to: 'marrakech-city', duration: 'about 3h45', prices: row(130, 140, 160, 210, 250) },
  { from: 'taghazout', to: 'essaouira', duration: 'about 2h45', prices: row(105, 115, 130, 165, 195) },
  { from: 'tamraght', to: 'essaouira', duration: 'about 2h45', prices: row(105, 115, 130, 165, 195) },
  { from: 'taghazout', to: 'agafay', duration: 'about 4h', prices: row(140, 150, 165, 220, 260) },
];

/** Section 5 — Marrakech and the main tourist routes. */
export const MARRAKECH_ROUTES: FixedRoute[] = [
  { from: 'marrakech-airport', to: 'marrakech-city', duration: '15–25 min', prices: row(15, 18, 22, 30, 35) },
  { from: 'marrakech-city', to: 'agafay', duration: '45–60 min', prices: row(60, 65, 75, 90, 105) },
  { from: 'marrakech-city', to: 'ourika', duration: 'about 1h', prices: row(60, 70, 85, 100, 120) },
  { from: 'marrakech-city', to: 'essaouira', duration: 'about 2h45', prices: row(90, 100, 120, 160, 190) },
  { from: 'marrakech-airport', to: 'essaouira', duration: 'about 2h45', prices: row(95, 105, 125, 165, 195) },
  { from: 'marrakech-city', to: 'agadir-city', duration: 'about 3h', prices: row(120, 130, 145, 175, 210) },
  { from: 'marrakech-airport', to: 'agadir-city', duration: 'about 3h15', prices: row(125, 135, 150, 180, 215) },
  { from: 'marrakech-airport', to: 'agadir-airport', duration: 'about 3h15', prices: row(125, 135, 150, 180, 215) },
  { from: 'marrakech-city', to: 'taghazout', duration: 'about 3h45', prices: row(130, 140, 160, 210, 250) },
  { from: 'marrakech-city', to: 'tamraght', duration: 'about 3h45', prices: row(130, 140, 160, 210, 250) },
  { from: 'marrakech-airport', to: 'taghazout', duration: 'about 3h45', prices: row(135, 145, 165, 215, 255) },
  { from: 'marrakech-airport', to: 'tamraght', duration: 'about 3h45', prices: row(135, 145, 165, 215, 255) },
];

export const FIXED_ROUTES: FixedRoute[] = [...AGADIR_ROUTES, ...MARRAKECH_ROUTES];

/** Routes are bidirectional when both ends fall in approved zones. */
export function findFixedRoute(from: ZoneId | null, to: ZoneId | null): FixedRoute | null {
  if (!from || !to) return null;
  return (
    FIXED_ROUTES.find(
      (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from),
    ) ?? null
  );
}

/** Section 6 — fallback distance bands, used only when no fixed route exists. */
export interface DistanceBand {
  maxKm: number;
  label: string;
  prices: TariffRow | null; // null = manual quote required
}

export const DISTANCE_BANDS: DistanceBand[] = [
  { maxKm: 25, label: 'Local zone (up to 25 km)', prices: row(22, 25, 30, 45, 55) },
  { maxKm: 60, label: 'Coastal short distance (26–60 km)', prices: row(30, 35, 42, 65, 80) },
  { maxKm: 120, label: 'Regional (61–120 km)', prices: row(50, 60, 75, 100, 125) },
  { maxKm: 180, label: 'Intercity (121–180 km)', prices: row(75, 85, 105, 140, 175) },
  { maxKm: 250, label: 'Long distance (181–250 km)', prices: row(100, 115, 140, 180, 220) },
  { maxKm: 350, label: 'Major intercity (251–350 km)', prices: row(125, 140, 165, 220, 270) },
  { maxKm: Infinity, label: 'Above 350 km', prices: null },
];

export function findDistanceBand(distanceKm: number): DistanceBand {
  return DISTANCE_BANDS.find((b) => distanceKm <= b.maxKm) ?? DISTANCE_BANDS[DISTANCE_BANDS.length - 1];
}

/** Section 7 — private driver hire (not a one-way transfer). */
export const HOURLY_HIRE = {
  halfDay: { hours: 4, includedKm: 100, fromEur: 90 },
  fullDay: { hours: 8, includedKm: 200, fromEur: 150 },
  extraHourEur: 20,
} as const;

/** Section 8 — included services, waiting and extras. */
export const INCLUDED_SERVICES = [
  'Fixed price confirmed before payment',
  'Price is for the entire vehicle, not per passenger',
  'Door-to-door private service',
  'Airport meet and greet',
  'Flight monitoring for airport pickups',
  'Fuel, standard parking and motorway tolls',
  'No night surcharge for normal pre-booked transfers',
];

export const WAITING_RULES = [
  { item: 'Airport waiting (international flights)', rule: 'Up to 60 minutes after actual landing, included' },
  { item: 'Airport waiting (domestic flights)', rule: 'Up to 45 minutes after actual landing, included' },
  { item: 'Hotel pickup waiting', rule: '15 minutes included' },
  { item: 'Extra waiting caused by the customer', rule: '€10 per 30 min (sedan/van), €15 per 30 min (minibus), after approval' },
  { item: 'Flight delay', rule: 'No charge when the delay is tracked from the flight number' },
  { item: 'Remote, unpaved or mountain access', rule: 'Manual quote before payment' },
];

/** Optional combined-booking discount on a return trip. */
export const RETURN_DISCOUNT = 0.08;

/** Display-only exchange rates. The tariff itself is stored in EUR. */
export const EXCHANGE_RATES = {
  MAD: 10.7,
  GBP: 0.85,
  USD: 1.08,
} as const;
