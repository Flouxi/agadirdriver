export interface BookingDetails {
  type: 'transfer' | 'hourly';
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  durationHours?: number; // for 'hourly'
  hasReturn: boolean;
  returnDate?: string;
  returnTime?: string;
}

export interface VehicleClass {
  id: string;
  name: string;
  description: string;
  passengers: number;
  luggage: number;
  pricePerKm: number; // in EUR/MAD
  basePrice: number; // in EUR/MAD
  image: string; // car icon/photo
  carModels: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  author: string;
  timeAgo: string;
}

export interface Destination {
  id: string;
  name: string;
  airport: string;
  image: string;
  type: 'airport' | 'city' | 'ski';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}
