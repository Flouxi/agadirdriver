import BookingBar from "./BookingBar";
import type { VehicleClass } from "../types";
interface Props {
  initialToLocation?: string;
  initialVehicleId?: string;
  onBookingComplete?: (details: unknown) => void;
  onVehicleSelected?: (vehicle: VehicleClass) => void;
}
export default function BookingWidget({ initialToLocation = "", initialVehicleId = "" }: Props) {
  return (
    <BookingBar
      initial={{
        from: initialToLocation ? "Aéroport Agadir Al Massira (AGA)" : "",
        to: initialToLocation,
        vehicleId: initialVehicleId,
      }}
    />
  );
}
