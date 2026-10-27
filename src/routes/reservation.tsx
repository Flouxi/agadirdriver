import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Briefcase,
  Check,
  Clock3,
  Pencil,
  ShieldCheck,
  Users,
  MapPin,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingBar from "../components/BookingBar";
import BookingProgress from "../components/BookingProgress";
import RouteMap from "../components/RouteMap";
import { VEHICLES } from "../data";
import {
  bookingSearchSchema,
  validateBooking,
  fitsPassengers,
  type BookingSearch,
} from "../lib/booking";
import { calculateRoutePrice } from "../lib/pricing";
import { useCopy } from "../lib/copy";
import { useI18n } from "../lib/i18n";
import { BUSINESS } from "../data/seo";

export const Route = createFileRoute("/reservation")({
  validateSearch: (search) => bookingSearchSchema.parse(search),
  head: () => ({
    meta: [{ title: "Pick your ride | Agadir Driver" }, { name: "robots", content: "noindex" }],
  }),
  component: Reservation,
});
function Reservation() {
  const booking = Route.useSearch();
  const navigate = useNavigate();
  const c = useCopy();
  const { lang } = useI18n();
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (editing)
      document
        .getElementById("booking-interface")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [editing]);
  const [selectedId, setSelectedId] = useState(booking.vehicleId);
  const [filter, setFilter] = useState("all");
  const eligible = VEHICLES.filter((v) => fitsPassengers(v, booking.pax));
  const options = eligible.map((vehicle) => ({
    vehicle,
    pricing: calculateRoutePrice({
      from: booking.from,
      to: booking.to,
      vehicle,
      bookingType: booking.type,
      durationHours: booking.hours,
      hasReturn: booking.hasReturn,
    }),
  }));
  const selected = options.find((option) => option.vehicle.id === selectedId) ?? options[0];
  const visible = options.filter(
    ({ vehicle }) =>
      filter === "all" ||
      (filter === "sedan" && vehicle.passengers <= 4) ||
      (filter === "group" && vehicle.passengers > 4),
  );
  const invalid = validateBooking(booking);
  const money = (amount: number) =>
    new Intl.NumberFormat(lang === "FR" ? "fr-FR" : "en-GB", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  const day = (value: string) =>
    new Date(value + "T12:00:00").toLocaleDateString(lang === "FR" ? "fr-FR" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const update = (next: BookingSearch) => {
    setEditing(false);
    setSelectedId("");
    void navigate({ to: "/reservation", search: next });
  };
  const proceed = () => {
    if (selected && !invalid)
      void navigate({ to: "/checkout", search: { ...booking, vehicleId: selected.vehicle.id } });
  };
  return (
    <div className="ad-site ad-reservation">
      <Header />
      <BookingProgress />
      <main className="ad-shell ad-reservation-main">
        <div className="ad-heading-row">
          <div>
            <a href="/" className="ad-back">
              <ArrowLeft size={15} />
              {c("Back to home", "Retour à l'accueil")}
            </a>
            <h1>{c("Pick your ride.", "Choisissez votre véhicule.")}</h1>
            <p>
              {c(
                "Your journey. Your space. Your comfort.",
                "Votre trajet. Votre espace. Votre confort.",
              )}
            </p>
          </div>
          <span className="ad-currency">EUR · {c("per vehicle", "par véhicule")}</span>
        </div>
        <div className="ad-trip-strip">
          <div>
            <MapPin size={18} />
            <span>
              <strong>{booking.from || c("Choose pickup", "Choisir le départ")}</strong>
              <small>
                {booking.type === "hourly"
                  ? booking.hours + " " + c("hours with your driver", "heures avec chauffeur")
                  : booking.to || c("Choose destination", "Choisir la destination")}
              </small>
            </span>
          </div>
          <div>
            <Clock3 size={17} />
            <span>
              {day(booking.date)} · {booking.time}
            </span>
            <span>
              <Users size={16} />
              {booking.pax}
            </span>
          </div>
          <button
            className="ad-text-button"
            onClick={() => setEditing(!editing)}
            aria-expanded={editing}
          >
            <Pencil size={14} />
            {c("Edit ride", "Modifier le trajet")}
          </button>
        </div>
        {(editing || !!invalid) && (
          <div className="ad-edit-booking">
            {invalid && (
              <p role="alert" className="ad-form-error">
                {c(
                  "Please complete your route and choose a future pickup time before continuing.",
                  "Complétez votre trajet et choisissez une date de départ future pour continuer.",
                )}
              </p>
            )}
            <BookingBar key={JSON.stringify(booking)} initial={booking} onSearch={update} light />
          </div>
        )}
        <div className="ad-reservation-grid">
          <div className="ad-vehicle-column">
            <div className="ad-route-preview">
              {booking.type === "transfer" && booking.from && booking.to ? (
                <RouteMap
                  from={booking.from}
                  to={booking.to}
                  pickupTime={booking.time}
                  dropoffTime={c("Estimated route", "Itinéraire estimé")}
                />
              ) : (
                <div className="ad-hourly-preview">
                  <Clock3 size={32} />
                  <h2>{c("A driver for your day", "Un chauffeur pour votre journée")}</h2>
                  <p>
                    {booking.hours}{" "}
                    {c(
                      "hours · Stops and mileage confirmed with our team",
                      "heures · Arrêts et kilométrage confirmés avec notre équipe",
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="ad-vehicle-list-heading">
              <h2>
                {c("Choose your vehicle", "Choisissez votre véhicule")}
                <small>
                  {options.length} {c("options for your group", "options pour votre groupe")}
                </small>
              </h2>
              <div className="ad-filter-tabs">
                {[
                  { id: "all", label: c("All", "Tous") },
                  { id: "sedan", label: c("Sedans", "Berlines") },
                  { id: "group", label: c("Vans & groups", "Vans et groupes") },
                ].map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="ad-vehicle-list"
              role="radiogroup"
              aria-label={c("Vehicle class", "Catégorie de véhicule")}
            >
              {visible.map(({ vehicle, pricing }) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected?.vehicle.id === vehicle.id}
                  className={
                    "ad-vehicle-option " +
                    (selected?.vehicle.id === vehicle.id ? "ad-selected" : "")
                  }
                  key={vehicle.id}
                  onClick={() => setSelectedId(vehicle.id)}
                >
                  <div className="ad-vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                  </div>
                  <div className="ad-vehicle-description">
                    <div className="ad-vehicle-title">
                      <h3>{vehicle.name}</h3>
                      {vehicle.id === "comfort-sedan" && (
                        <span className="ad-recommended">{c("Recommended", "Recommandé")}</span>
                      )}
                      {vehicle.onRequest && (
                        <span className="ad-request-badge">{c("On request", "Sur demande")}</span>
                      )}
                    </div>
                    <p>{vehicle.carModels}</p>
                    <div className="ad-capacity">
                      <span>
                        <Users size={15} />
                        {c("Up to", "Jusqu'à")} {vehicle.passengers}
                      </span>
                      <span>
                        <Briefcase size={15} />
                        {vehicle.luggage} {c("bags", "bagages")}
                      </span>
                    </div>
                    <small>{vehicle.luggageNote}</small>
                  </div>
                  <div className="ad-vehicle-price">
                    {pricing.quoteRequired ? (
                      <strong>{c("Get a quote", "Sur devis")}</strong>
                    ) : (
                      <>
                        <strong>{money(pricing.eur)}</strong>
                        <small>
                          {booking.hasReturn
                            ? c("Total, return included", "Total avec retour")
                            : c("Total per vehicle", "Total par véhicule")}
                        </small>
                        {(pricing.source !== "fixed-route" || vehicle.onRequest) && (
                          <small>{c("Subject to confirmation", "À confirmer")}</small>
                        )}
                      </>
                    )}
                    <span className="ad-radio-dot">
                      {selected?.vehicle.id === vehicle.id && <Check size={12} />}
                    </span>
                  </div>
                </button>
              ))}
              {!visible.length && (
                <div className="ad-empty">
                  <h3>
                    {c(
                      "No vehicles in this category fit your group.",
                      "Aucun véhicule de cette catégorie ne convient à votre groupe.",
                    )}
                  </h3>
                  <button className="ad-text-button" onClick={() => setFilter("all")}>
                    {c("Show all suitable vehicles", "Voir les véhicules adaptés")}
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
            {booking.type === "transfer" && (
              <div className="ad-return-banner">
                <ArrowLeftRight size={24} />
                <div>
                  <h3>
                    {booking.hasReturn
                      ? c("Your return is included.", "Votre retour est inclus.")
                      : c(
                          "Round trip? Make it effortless.",
                          "Un aller-retour ? Simplifiez-vous la vie.",
                        )}
                  </h3>
                  <p>
                    {booking.hasReturn
                      ? day(booking.returnDate) + " · " + booking.returnTime
                      : c(
                          "Set your return pickup now and keep both journeys together.",
                          "Ajoutez votre retour pour organiser les deux trajets ensemble.",
                        )}
                  </p>
                </div>
                <button
                  className="ad-secondary"
                  onClick={() => {
                    setEditing(true);
                    document
                      .getElementById("booking-interface")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {booking.hasReturn ? c("Edit", "Modifier") : c("Add return", "Ajouter retour")}
                </button>
              </div>
            )}
            <div className="ad-inclusions">
              <ShieldCheck size={24} />
              <div>
                <h3>{c("Know what you're booking.", "Voyagez en toute transparence.")}</h3>
                <p>
                  {c(
                    "Private door-to-door service. Airport meet & greet and flight tracking for airport pickups. Fuel, standard parking and tolls included in published transfer fares. Exact address, luggage and availability confirmed before booking.",
                    "Service privé de porte à porte. Accueil et suivi du vol pour les départs aéroport. Carburant, parking standard et péages inclus dans les tarifs de transfert publiés. Adresse exacte, bagages et disponibilité confirmés avant réservation.",
                  )}
                </p>
              </div>
            </div>
          </div>
          <aside className="ad-booking-summary">
            <div className="ad-summary-card">
              <h2>{c("Your booking", "Votre trajet")}</h2>
              <div className="ad-summary-meta">
                <span>
                  {booking.type === "hourly"
                    ? c("Hourly hire", "À l'heure")
                    : booking.hasReturn
                      ? c("Round trip", "Aller-retour")
                      : c("One way", "Aller simple")}
                </span>
                <span>
                  <Users size={14} />
                  {booking.pax} {c("passengers", "passagers")}
                </span>
              </div>
              <p className="ad-summary-date">
                {day(booking.date)} · {booking.time}
                <small>{c("Morocco local time", "Heure locale du Maroc")}</small>
              </p>
              <div className="ad-summary-route">
                <div>
                  <small>{c("Pickup", "Départ")}</small>
                  <strong>{booking.from || "—"}</strong>
                </div>
                <div>
                  <small>
                    {booking.type === "hourly" ? c("Duration", "Durée") : c("Drop-off", "Arrivée")}
                  </small>
                  <strong>
                    {booking.type === "hourly" ? booking.hours + " h" : booking.to || "—"}
                  </strong>
                </div>
              </div>
              {selected?.pricing.duration && (
                <p className="ad-summary-estimate">
                  <Clock3 size={14} />
                  {c("Approximate journey", "Trajet approximatif")} · {selected.pricing.duration}
                </p>
              )}
              {booking.hasReturn && (
                <p className="ad-summary-return">
                  <ArrowLeftRight size={15} />
                  {c("Return", "Retour")} · {day(booking.returnDate)} · {booking.returnTime}
                </p>
              )}
              {selected && (
                <div className="ad-selected-summary">
                  <img src={selected.vehicle.image} alt="" />
                  <span>
                    <small>{c("Selected vehicle", "Véhicule sélectionné")}</small>
                    <strong>{selected.vehicle.name}</strong>
                  </span>
                </div>
              )}
              <div className="ad-summary-total">
                <span>{c("Total", "Total")}</span>
                <strong>
                  {!selected || invalid
                    ? "—"
                    : selected.pricing.quoteRequired
                      ? c("On quotation", "Sur devis")
                      : money(selected.pricing.eur)}
                </strong>
              </div>
              <p className="ad-fine-print">
                {c(
                  "For your entire group. Final fare and availability confirmed by our team.",
                  "Pour tout votre groupe. Tarif final et disponibilité confirmés par notre équipe.",
                )}
              </p>
              <button
                className="ad-primary ad-full"
                onClick={proceed}
                disabled={!selected || !!invalid}
              >
                {c("Continue", "Continuer")}
                <ArrowRight size={18} />
              </button>
              <div className="ad-summary-perks">
                {[
                  c("Private vehicle", "Véhicule privé"),
                  c("Door-to-door service", "Service porte à porte"),
                  c("Local support", "Assistance locale"),
                ].map((text) => (
                  <span key={text}>
                    <Check size={14} />
                    {text}
                  </span>
                ))}
              </div>
              <a
                className="ad-summary-help"
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                {c(
                  "Need help choosing? Chat with us.",
                  "Besoin d'aide pour choisir ? Contactez-nous.",
                )}
              </a>
            </div>
          </aside>
        </div>
      </main>
      <div className="ad-mobile-booking-bar">
        <div>
          <small>{selected?.vehicle.name}</small>
          <strong>
            {invalid
              ? "—"
              : selected?.pricing.quoteRequired
                ? c("On quotation", "Sur devis")
                : money(selected?.pricing.eur ?? 0)}
          </strong>
        </div>
        <button className="ad-primary" disabled={!selected || !!invalid} onClick={proceed}>
          {c("Continue", "Continuer")}
          <ArrowRight size={17} />
        </button>
      </div>
      <Footer />
    </div>
  );
}
