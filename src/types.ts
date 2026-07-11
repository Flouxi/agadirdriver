/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BookingType = 'airport' | 'city' | 'long';

export interface BookingState {
  bookingType: BookingType;
  fromLocation: string;
  toLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  calculatedPrice: number;
  isConfirmed: boolean;
  isBookingInProgress: boolean;
}

export interface DriverInfo {
  name: string;
  photoUrl: string;
  rating: number;
  carModel: string;
  licensePlate: string;
  phoneNumber: string;
  liveEta: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  route: string;
}
