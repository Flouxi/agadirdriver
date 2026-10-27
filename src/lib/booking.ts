import { z } from "zod";
import type { VehicleClass } from "../types";

export const MAX_PASSENGERS = 17;
export function localDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export function defaultPickupDate(): string {
  return localDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
}
export function nextDate(iso: string): string {
  const date = new Date(iso + "T12:00:00Z");
  if (!Number.isFinite(date.getTime())) return nextDate(defaultPickupDate());
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}
export const bookingSearchSchema = z.object({
  from: z.string().max(240).catch(""),
  to: z.string().max(240).catch(""),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .catch(defaultPickupDate),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .catch("13:45"),
  pax: z.coerce.number().int().min(1).max(MAX_PASSENGERS).catch(2),
  type: z.enum(["transfer", "hourly"]).catch("transfer"),
  hours: z.coerce.number().int().min(2).max(24).catch(4),
  hasReturn: z.preprocess((v) => v === true || v === "true", z.boolean()).catch(false),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .catch(""),
  returnTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .catch("13:45"),
  vehicleId: z.string().max(80).catch(""),
});
export type BookingSearch = z.infer<typeof bookingSearchSchema>;
export function validateBooking(booking: BookingSearch, now = new Date()): string | null {
  if (!booking.from.trim()) return "from";
  if (booking.type === "transfer" && !booking.to.trim()) return "to";
  if (
    booking.type === "transfer" &&
    booking.from.trim().toLowerCase() === booking.to.trim().toLowerCase()
  )
    return "same";
  // Compare wall-clock time in Morocco; booking times always refer to the pickup location.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Casablanca",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const stamp = booking.date + "T" + booking.time;
  const parsed = new Date(stamp + ":00Z");
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 16) !== stamp ||
    stamp <= localDate(now) + "T" + parts
  )
    return "past";
  if (booking.type === "transfer" && booking.hasReturn) {
    const back = booking.returnDate + "T" + booking.returnTime;
    const parsedBack = new Date(back + ":00Z");
    if (
      !Number.isFinite(parsedBack.getTime()) ||
      parsedBack.toISOString().slice(0, 16) !== back ||
      back <= stamp
    )
      return "return";
  }
  return null;
}
export function fitsPassengers(vehicle: VehicleClass, pax: number): boolean {
  return Number.isInteger(pax) && pax >= 1 && pax <= vehicle.passengers;
}
export function bookingHref(path: string, booking: BookingSearch): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(booking)) params.set(key, String(value));
  return path + "?" + params.toString();
}
