import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  CalendarDays,
  Car,
  Clock3,
  Minus,
  Plus,
  MapPin,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import LocationPicker from "./LocationPicker";
import {
  bookingSearchSchema,
  defaultPickupDate,
  localDate,
  nextDate,
  validateBooking,
  MAX_PASSENGERS,
  type BookingSearch,
} from "../lib/booking";
import { useCopy } from "../lib/copy";

interface Props {
  initial?: Partial<BookingSearch>;
  mode?: "transfer" | "hourly";
  onSearch?: (booking: BookingSearch) => void;
  light?: boolean;
}
export default function BookingBar({ initial, mode, onSearch, light = false }: Props) {
  const c = useCopy();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingSearch>(() =>
    bookingSearchSchema.parse({ date: defaultPickupDate(), ...initial }),
  );
  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (mode) setBooking((b) => ({ ...b, type: mode }));
  }, [mode]);
  const change = <K extends keyof BookingSearch>(key: K, value: BookingSearch[K]) => {
    setBooking((b) => ({ ...b, [key]: value }));
    setError("");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = validateBooking(booking);
    if (message) {
      const messages: Record<string, string> = {
        from: c("Choose your pickup location.", "Choisissez le lieu de départ."),
        to: c("Choose your destination.", "Choisissez la destination."),
        same: c(
          "Pickup and destination must be different.",
          "Le départ et l'arrivée doivent être différents.",
        ),
        past: c(
          "Choose a valid pickup date and time in the future (Morocco time).",
          "Choisissez une date et une heure futures valides (heure du Maroc).",
        ),
        return: c(
          "The return must be after your pickup. Please check its date and time.",
          "Le retour doit être après le départ. Vérifiez sa date et son heure.",
        ),
      };
      setError(messages[message]);
      if (message === "from" || message === "to") setPicker(message);
      return;
    }
    const next = { ...booking, hasReturn: booking.type === "transfer" && booking.hasReturn };
    if (onSearch) onSearch(next);
    else void navigate({ to: "/reservation", search: next });
  };
  return (
    <div className={"ad-booking " + (light ? "ad-booking-light" : "")} id="booking-interface">
      <div
        className="ad-service-tabs"
        role="tablist"
        aria-label={c("Service type", "Type de service")}
      >
        {(["transfer", "hourly"] as const).map((type) => (
          <button
            type="button"
            key={type}
            role="tab"
            aria-selected={booking.type === type}
            onClick={() => change("type", type)}
          >
            {type === "transfer" ? <Car size={16} /> : <Clock3 size={16} />}
            {type === "transfer" ? c("Transfer", "Transfert") : c("By the hour", "À l'heure")}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate className="ad-booking-card">
        <div className="ad-booking-fields">
          <button type="button" className="ad-place-field" onClick={() => setPicker("from")}>
            <MapPin size={18} />
            <span>
              <small>{c("From", "Départ")}</small>
              <strong>
                {booking.from || c("Address, airport, hotel…", "Adresse, aéroport, hôtel…")}
              </strong>
            </span>
          </button>
          {booking.type === "transfer" ? (
            <button type="button" className="ad-place-field" onClick={() => setPicker("to")}>
              <MapPin size={18} />
              <span>
                <small>{c("To", "Arrivée")}</small>
                <strong>
                  {booking.to || c("Address, airport, hotel…", "Adresse, aéroport, hôtel…")}
                </strong>
              </span>
            </button>
          ) : (
            <label className="ad-date-field">
              <Clock3 size={18} />
              <span>
                <small>{c("Duration", "Durée")}</small>
                <select
                  aria-label={c("Hire duration", "Durée de mise à disposition")}
                  value={booking.hours}
                  onChange={(e) => change("hours", Number(e.target.value))}
                >
                  {Array.from({ length: 23 }, (_, i) => i + 2).map((h) => (
                    <option value={h} key={h}>
                      {h} {c("hours", "heures")}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          )}
          <div className="ad-date-field">
            <CalendarDays size={18} />
            <div>
              <small>{c("Pickup date · Morocco time", "Date de départ · heure du Maroc")}</small>
              <div className="ad-date-inputs">
                <input
                  aria-label={c("Pickup date", "Date de départ")}
                  type="date"
                  min={localDate()}
                  value={booking.date}
                  onChange={(e) => change("date", e.target.value)}
                  required
                />
                <input
                  aria-label={c("Pickup time", "Heure de départ")}
                  type="time"
                  value={booking.time}
                  onChange={(e) => change("time", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {booking.type === "transfer" && (
            <button
              type="button"
              className="ad-return-toggle"
              aria-expanded={booking.hasReturn}
              onClick={() =>
                setBooking((b) => ({
                  ...b,
                  hasReturn: !b.hasReturn,
                  returnDate: b.returnDate || nextDate(b.date),
                }))
              }
            >
              {booking.hasReturn ? <Minus size={16} /> : <Plus size={16} />}{" "}
              {booking.hasReturn
                ? c("Remove return", "Sans retour")
                : c("Add return", "Ajouter retour")}
            </button>
          )}
          <div className="ad-pax">
            <small>{c("Passengers", "Passagers")}</small>
            <div>
              <button
                type="button"
                aria-label={c("Fewer passengers", "Moins de passagers")}
                disabled={booking.pax <= 1}
                onClick={() => change("pax", booking.pax - 1)}
              >
                <Minus size={12} />
              </button>
              <output aria-live="polite">{booking.pax}</output>
              <button
                type="button"
                aria-label={c("More passengers", "Plus de passagers")}
                disabled={booking.pax >= MAX_PASSENGERS}
                onClick={() => change("pax", booking.pax + 1)}
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
          <button className="ad-primary ad-search" type="submit">
            {onSearch ? c("Update ride", "Actualiser") : c("See prices", "Voir les prix")}
            <ArrowRight size={18} />
          </button>
        </div>
        {booking.type === "transfer" && booking.hasReturn && (
          <div className="ad-return-fields">
            <ArrowLeftRight size={18} />
            <strong>{c("Return pickup", "Départ du retour")}</strong>
            <label>
              {c("Date", "Date")}
              <input
                aria-label={c("Return date", "Date du retour")}
                type="date"
                min={booking.date}
                value={booking.returnDate}
                onChange={(e) => change("returnDate", e.target.value)}
              />
            </label>
            <label>
              {c("Time", "Heure")}
              <input
                aria-label={c("Return time", "Heure du retour")}
                type="time"
                value={booking.returnTime}
                onChange={(e) => change("returnTime", e.target.value)}
              />
            </label>
            <span>
              {c(
                "Both journeys included in the total.",
                "Les deux trajets sont inclus dans le total.",
              )}
            </span>
          </div>
        )}
        {error && (
          <p role="alert" className="ad-form-error">
            {error}
          </p>
        )}
      </form>
      <LocationPicker
        open={picker !== null}
        title={
          picker === "from"
            ? c("Pickup location", "Lieu de départ")
            : c("Destination", "Destination")
        }
        onClose={() => setPicker(null)}
        onSelect={(value) => {
          if (picker) change(picker, value);
        }}
      />
    </div>
  );
}
