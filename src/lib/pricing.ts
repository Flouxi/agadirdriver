import { findLocationByLabel } from '../data/locations';
import type { VehicleClass } from '../types';
import {
  EXCHANGE_RATES,
  HOURLY_HIRE,
  RETURN_DISCOUNT,
  findDistanceBand,
  findFixedRoute,
  findZone,
  priceForTier,
  zoneLabel,
} from '../data/tariffs';

export interface RoutePriceInput {
  from: string;
  to: string;
  vehicle: VehicleClass;
  bookingType?: 'transfer' | 'hourly';
  durationHours?: number;
  hasReturn?: boolean;
}

export interface RoutePriceResult {
  distanceKm: number;
  routeType: 'local' | 'airport' | 'intercity' | 'long-distance';
  /** Price source: an approved fixed tariff, a distance band fallback, or hourly hire. */
  source: 'fixed-route' | 'distance-band' | 'hourly' | 'quote';
  /** True when no price may be shown and the customer must request a confirmed quote. */
  quoteRequired: boolean;
  routeLabel: string;
  duration?: string;
  eur: number;
  mad: number;
  gbp: number;
  usd: number;
  note: string;
}

const roundCurrency = (value: number) => Math.round(value * 100) / 100;
const toRadians = (value: number) => (value * Math.PI) / 180;

const calculateDistanceKm = (from: string, to: string) => {
  const fromLocation = findLocationByLabel(from);
  const toLocation = findLocationByLabel(to);

  if (fromLocation && toLocation) {
    const earthRadiusKm = 6371;
    const dLat = toRadians(toLocation.lat - fromLocation.lat);
    const dLng = toRadians(toLocation.lng - fromLocation.lng);
    const lat1 = toRadians(fromLocation.lat);
    const lat2 = toRadians(toLocation.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Add a road factor: straight-line distance underestimates real Moroccan roads.
    return Math.round(earthRadiusKm * c * 1.25);
  }

  const normalized = `${from} ${to}`.toLowerCase();
  if (normalized.includes('marrakech') && normalized.includes('essaouira')) return 175;
  if (normalized.includes('casablanca') && normalized.includes('rabat')) return 90;
  if (normalized.includes('agadir') && normalized.includes('taghazout')) return 25;
  if (normalized.includes('airport') || normalized.includes('aéroport')) return 40;
  return 20;
};

const getRouteType = (distanceKm: number): RoutePriceResult['routeType'] => {
  if (distanceKm <= 25) return 'local';
  if (distanceKm <= 60) return 'airport';
  if (distanceKm <= 180) return 'intercity';
  return 'long-distance';
};

const withCurrencies = (eur: number) => ({
  eur: roundCurrency(eur),
  mad: Math.round(eur * EXCHANGE_RATES.MAD),
  gbp: roundCurrency(eur * EXCHANGE_RATES.GBP),
  usd: roundCurrency(eur * EXCHANGE_RATES.USD),
});

export function calculateRoutePrice(input: RoutePriceInput): RoutePriceResult {
  const tier = input.vehicle.tier;
  const distanceKm = calculateDistanceKm(input.from, input.to);
  const routeType = getRouteType(distanceKm);

  // 1. Private driver hire is a separate product, never a one-way transfer price.
  if (input.bookingType === 'hourly') {
    const hours = input.durationHours ?? HOURLY_HIRE.halfDay.hours;
    const base =
      hours <= HOURLY_HIRE.halfDay.hours
        ? HOURLY_HIRE.halfDay.fromEur
        : HOURLY_HIRE.fullDay.fromEur +
          Math.max(0, hours - HOURLY_HIRE.fullDay.hours) * HOURLY_HIRE.extraHourEur;
    const factor = tier === 'economy' ? 1 : tier === 'comfort-sedan' ? 1.12 : tier === 'comfort-van' ? 1.35 : tier === 'suv' ? 1.5 : tier === 'luxury-sedan' ? 1.8 : tier === 'minibus-14' ? 2 : 2.3;
    const eur = Math.round(base * factor);
    return {
      distanceKm,
      routeType,
      source: 'hourly',
      quoteRequired: false,
      routeLabel: 'Private driver hire',
      duration: `${hours}h`,
      note: `Private driver hire, ${hours}h with a mileage allowance. Long detours are quoted separately.`,
      ...withCurrencies(eur),
    };
  }

  const fromZone = findZone(input.from);
  const toZone = findZone(input.to);
  const fixed = findFixedRoute(fromZone, toZone);

  let eur: number | null = null;
  let source: RoutePriceResult['source'] = 'quote';
  let note = '';
  let duration: string | undefined;
  let routeLabel =
    fromZone && toZone ? `${zoneLabel(fromZone)} ↔ ${zoneLabel(toZone)}` : `${input.from} → ${input.to}`;

  // 2. Approved fixed route tariff always wins.
  if (fixed) {
    eur = priceForTier(fixed.prices, tier);
    source = 'fixed-route';
    duration = fixed.duration;
    routeLabel = `${zoneLabel(fixed.from)} ↔ ${zoneLabel(fixed.to)}`;
    note = 'Fixed price per vehicle, confirmed before payment. Tolls, parking and meet and greet included.';
  } else {
    // 3. Fallback distance band.
    const band = findDistanceBand(distanceKm);
    if (band.prices) {
      eur = priceForTier(band.prices, tier);
      source = 'distance-band';
      note = `Estimated from the ${band.label} tariff. The exact address is confirmed before payment.`;
    } else {
      note = 'This route is outside the published tariff zones. Request a confirmed quote and we will reply with a fixed price.';
    }
  }

  if (eur === null) {
    return {
      distanceKm,
      routeType,
      source: 'quote',
      quoteRequired: true,
      routeLabel,
      duration,
      note,
      eur: 0,
      mad: 0,
      gbp: 0,
      usd: 0,
    };
  }

  if (input.hasReturn) {
    eur = Math.round(eur * 2 * (1 - RETURN_DISCOUNT));
    note = `${note} Return trip: two one-way prices with an ${Math.round(RETURN_DISCOUNT * 100)}% combined-booking discount.`;
  }

  return {
    distanceKm,
    routeType,
    source,
    quoteRequired: false,
    routeLabel,
    duration,
    note,
    ...withCurrencies(eur),
  };
}
