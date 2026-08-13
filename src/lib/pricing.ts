import { findLocationByLabel } from '../data/locations';
import type { VehicleClass } from '../types';

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
  mad: number;
  eur: number;
  note: string;
}

const VEHICLE_MULTIPLIERS: Record<string, number> = {
  standard: 1,
  first: 1.24,
  suv: 1.1,
  'van-standard': 1.16,
  'van-first': 1.3,
};

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
    return roundCurrency(earthRadiusKm * c);
  }

  const normalized = `${from} ${to}`.toLowerCase();
  if (normalized.includes('marrakech') && normalized.includes('essaouira')) return 175;
  if (normalized.includes('casablanca') && normalized.includes('rabat')) return 70;
  if (normalized.includes('agadir') && normalized.includes('taghazout')) return 45;
  if (normalized.includes('aéroport') || normalized.includes('airport')) {
    if (normalized.includes('agadir')) return 30;
    return 40;
  }
  return 18;
};

const getRouteType = (distanceKm: number, from: string, to: string): RoutePriceResult['routeType'] => {
  if (distanceKm <= 20) return 'local';
  if (distanceKm <= 80) return 'airport';
  if (distanceKm <= 180) return 'intercity';
  return 'long-distance';
};

export function calculateRoutePrice(input: RoutePriceInput): RoutePriceResult {
  const distanceKm = calculateDistanceKm(input.from, input.to);
  const routeType = getRouteType(distanceKm, input.from, input.to);
  const vehicleMultiplier = VEHICLE_MULTIPLIERS[input.vehicle.id] ?? 1;
  const durationHours = input.durationHours ?? 3;

  let mad = 0;
  let note = 'Tarif calculé selon les standards de transport marocains';

  if (input.bookingType === 'hourly') {
    const dayRateMad = 800 + durationHours * 140;
    mad = Math.round(dayRateMad * vehicleMultiplier);
    note = 'Tarif à l’heure basé sur un forfait chauffeur privé à la journée';
  } else {
    switch (routeType) {
      case 'local': {
        const baseMad = 40 + distanceKm * 8;
        mad = Math.round(baseMad * vehicleMultiplier);
        note = 'Trajet urbain / court : formule proche du petit taxi + supplément chauffeur privé';
        break;
      }
      case 'airport': {
        const baseMad = 180 + distanceKm * 7;
        mad = Math.round(baseMad * vehicleMultiplier);
        note = 'Transfert aéroport : tarif de base plus distance réelle';
        break;
      }
      case 'intercity': {
        const baseMad = 260 + distanceKm * 5.2;
        mad = Math.round(baseMad * vehicleMultiplier);
        note = 'Trajet inter-villes : tarif basé sur la distance et le confort du véhicule';
        break;
      }
      case 'long-distance': {
        const baseMad = 420 + distanceKm * 4.6;
        mad = Math.round(baseMad * vehicleMultiplier);
        note = 'Trajet longue distance : tarif adapté aux routes nationales et aux trajets premium';
        break;
      }
    }
  }

  if (input.hasReturn) {
    mad = Math.round(mad * 1.8);
    note = `${note} • aller-retour`; 
  }

  const eur = roundCurrency(mad / 10.7);

  return {
    distanceKm,
    routeType,
    mad,
    eur,
    note,
  };
}
