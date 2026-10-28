import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock3,
  Info,
  MapPin,
  Pencil,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import BookingHeader from "../components/BookingHeader";
import BookingDialog from "../components/BookingDialog";
import BookingBar from "../components/BookingBar";
import RouteMap from "../components/RouteMap";
import { VEHICLES } from "../data";
import {
  bookingSearchSchema,
  validateBooking,
  fitsPassengers,
  nextDate,
  type BookingSearch,
} from "../lib/booking";
import { calculateRoutePrice } from "../lib/pricing";
import { useCopy } from "../lib/copy";
import { useVehicleText } from "../lib/vehicle-copy";
import { useI18n } from "../lib/i18n";
import { findLocationByLabel } from "../data/locations";
import { routeDuration, type RoadRoute } from "../lib/road-route";
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
  const vt = useVehicleText();
  const { lang } = useI18n();
  const invalid = validateBooking(booking);
  const [editing, setEditing] = useState(!!invalid);
  const [editingReturn, setEditingReturn] = useState(false);
  const [selectedId, setSelectedId] = useState(booking.vehicleId);
  const [detailId, setDetailId] = useState("");
  const [mobileSummary, setMobileSummary] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [road, setRoad] = useState<RoadRoute | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const options = VEHICLES.filter((v) => fitsPassengers(v, booking.pax)).map((vehicle) => ({
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
  const selected = options.find((o) => o.vehicle.id === selectedId) ?? options[0];
  const detail = VEHICLES.find((v) => v.id === detailId);
  const money = (amount: number) =>
    new Intl.NumberFormat(lang === "FR" ? "fr-FR" : "en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  const date = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString(lang === "FR" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
  const edit = (withReturn = false) => {
    setMobileSummary(false);
    setEditingReturn(withReturn);
    setEditing(true);
  };
  const update = (next: BookingSearch) => {
    setEditing(false);
    setSelectedId(next.vehicleId);
    void navigate({ to: "/reservation", search: next });
  };
  const chooseVehicle = (id: string) => {
    setSelectedId(id);
    void navigate({
      to: "/reservation",
      search: { ...booking, vehicleId: id },
      replace: true,
      resetScroll: false,
    });
  };
  const proceed = () => {
    if (selected && !invalid)
      void navigate({ to: "/checkout", search: { ...booking, vehicleId: selected.vehicle.id } });
  };
  useEffect(() => {
    setMobileSummary(false);
  }, [booking.from, booking.to, booking.date, booking.time, booking.pax]);
  const total =
    invalid || !selected
      ? "—"
      : selected.pricing.quoteRequired
        ? c("On quotation", "Sur devis")
        : money(selected.pricing.eur);
  const currentRoad =
    road &&
    road.fromId === findLocationByLabel(booking.from)?.id &&
    road.toId === findLocationByLabel(booking.to)?.id
      ? road
      : null;
  const travelTime = currentRoad ? routeDuration(currentRoad.durationSeconds) : null;
  const journeyEstimate =
    booking.type === "hourly"
      ? booking.hours + " h"
      : travelTime
        ? (travelTime.hours ? travelTime.hours + " h " : "") +
          (travelTime.minutes ? travelTime.minutes + " min" : "") +
          " · " +
          Math.round(currentRoad!.distanceMeters / 1000) +
          " km"
        : selected?.pricing.duration
          ? "~ " + selected.pricing.duration
          : c("Route confirmed with our team", "Trajet confirmé avec notre équipe");
  const summary = (
    <>
      <div className="ad-booking-side-title">
        <h2>{c("Your Booking", "Votre trajet")}</h2>
        <button onClick={() => edit()} aria-label={c("Edit trip", "Modifier le trajet")}>
          <Pencil size={18} />
        </button>
      </div>
      <p className="ad-booking-side-meta">
        {date}
        <span>
          <Users size={13} />
          {booking.pax} {c("Passengers", "Passagers")}
        </span>
      </p>
      <div className="ad-booking-total">
        <span>{c("Total", "Total")}</span>
        <strong>{total}</strong>
        {!invalid && !selected?.pricing.quoteRequired && <small>EUR</small>}
      </div>
      <p className="ad-booking-price-caption">
        {booking.hasReturn
          ? c("Both journeys · Price per vehicle", "Aller-retour · Prix par véhicule")
          : c("Entire group · Price per vehicle", "Tout le groupe · Prix par véhicule")}
      </p>
      <div className="ad-booking-route">
        <div>
          <span className="ad-route-square" />
          <strong>{booking.from || c("Choose pickup", "Choisir le départ")}</strong>
          <p>
            <span>{c("Morocco local time", "Heure locale du Maroc")}</span>
            <time>{booking.time}</time>
          </p>
        </div>
        <p className="ad-booking-route-estimate">
          <Clock3 size={12} />
          {journeyEstimate}
        </p>
        <div>
          <span className="ad-route-square ad-route-square-gold" />
          <strong>
            {booking.type === "hourly"
              ? c("Private driver by the hour", "Chauffeur privé à l'heure")
              : booking.to || c("Choose destination", "Choisir la destination")}
          </strong>
          <p>
            {booking.type === "hourly"
              ? c("Your stops, your schedule", "Vos arrêts, vos horaires")
              : c("Door-to-door service", "Service porte à porte")}
          </p>
        </div>
      </div>
      {booking.type === "transfer" && (
        <button className="ad-booking-add-return" onClick={() => edit(true)}>
          <ArrowLeftRight size={15} />
          {booking.hasReturn
            ? c("Edit return", "Modifier le retour")
            : c("Add return", "Ajouter un retour")}
        </button>
      )}
      {booking.hasReturn && (
        <p className="ad-booking-return-date">
          {booking.returnDate} · {booking.returnTime}
        </p>
      )}
      <details className="ad-booking-price-details">
        <summary>
          {c("Price details", "Détail du prix")}
          <ChevronDown size={14} />
        </summary>
        <p>
          {selected?.pricing.quoteRequired
            ? c(
                "The exact route needs a personal quotation.",
                "Le trajet exact nécessite un devis personnalisé.",
              )
            : c(
                "Published transfer fares include fuel, standard parking and tolls. Our team confirms the final fare and availability before booking.",
                "Les tarifs de transfert publiés incluent carburant, parking standard et péages. Notre équipe confirme le tarif final et la disponibilité.",
              )}
        </p>
        {booking.hasReturn && (
          <p>
            {c(
              "The combined return tariff includes an 8% discount.",
              "Le tarif aller-retour comprend une réduction de 8 %.",
            )}
          </p>
        )}
      </details>
      <div className="ad-booking-assurance">
        <ShieldCheck size={18} />
        {c("Confirmed personally by our team", "Confirmé par notre équipe")}
      </div>
      <details className="ad-booking-benefits">
        <summary>
          {c("Included with your ride", "Inclus dans votre trajet")}
          <ChevronDown size={14} />
        </summary>
        <div className="ad-booking-included">
          <span>
            <Check size={13} />
            {c("Door-to-door service", "Porte à porte")}
          </span>
          <span>
            <Check size={13} />
            {c("Meet & greet", "Accueil à l'arrivée")}
          </span>
          <span>
            <Plane size={13} />
            {c("Flight tracking", "Suivi du vol")}
          </span>
          <span>
            <Users size={13} />
            {c("Local drivers", "Chauffeurs locaux")}
          </span>
        </div>
      </details>
      <a className="ad-booking-contact" href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
        {c("Questions? We're here to help.", "Une question ? Nous sommes là.")}
        <ArrowRight size={14} />
      </a>
      <p className="ad-booking-payment-note">
        {c(
          "No payment taken online. Fare and payment arrangements confirmed with your booking.",
          "Aucun paiement en ligne. Tarif et modalités de paiement confirmés avec votre réservation.",
        )}
      </p>
    </>
  );
  return (
    <div className="ad-site ad-booking-workspace">
      <BookingHeader />
      <main className="ad-booking-layout">
        <section className="ad-booking-map" aria-label={c("Your route", "Votre itinéraire")}>
          {desktop &&
            (booking.type === "transfer" && booking.from && booking.to ? (
              <RouteMap
                from={booking.from}
                to={booking.to}
                pickupTime={booking.time}
                dropoffTime=""
                expanded
                onRoute={setRoad}
                onExpand={() => setMapOpen(true)}
              />
            ) : (
              <div className="ad-booking-map-empty">
                <MapPin size={30} />
                <h2>{c("Your journey starts here", "Votre voyage commence ici")}</h2>
                <p>
                  {booking.type === "hourly"
                    ? booking.hours +
                      " " +
                      c("hours with your private driver", "heures avec votre chauffeur privé")
                    : c(
                        "Choose your pickup and destination to see your route.",
                        "Choisissez votre départ et votre destination pour voir le trajet.",
                      )}
                </p>
                <button className="ad-secondary" onClick={() => edit()}>
                  {c("Edit trip", "Modifier le trajet")}
                  <Pencil size={14} />
                </button>
              </div>
            ))}
        </section>
        <section className="ad-booking-vehicles" aria-labelledby="vehicle-heading">
          <div className="ad-ride-heading">
            <span>{c("PRIVATE TRAVEL · MOROCCO", "VOYAGES PRIVÉS · MAROC")}</span>
            <h1 id="vehicle-heading">{c("Choose your ride", "Choisissez votre véhicule")}</h1>
            <p>
              {c(
                "A private vehicle for your whole group.",
                "Un véhicule privé pour tout votre groupe.",
              )}
            </p>
            {booking.type === "transfer" && booking.from && booking.to && (
              <button type="button" className="ad-tablet-route" onClick={() => setMapOpen(true)}>
                <MapPin size={14} />
                {c("View route", "Voir le trajet")}
              </button>
            )}
          </div>
          <div className="ad-mobile-journey">
            <button
              className="ad-booking-mobile-trip"
              onClick={() => setMobileSummary(true)}
              aria-haspopup="dialog"
            >
              <span>
                <strong>
                  <b>A</b>
                  {booking.from || c("Choose pickup", "Choisir le départ")}
                </strong>
                <strong>
                  <b>B</b>
                  {booking.type === "hourly"
                    ? booking.hours + " h"
                    : booking.to || c("Choose destination", "Choisir la destination")}
                </strong>
                <small>
                  {date} · {booking.time} · {booking.pax} {c("passengers", "passagers")}
                </small>
              </span>
              <ChevronDown size={18} />
            </button>
            <div>
              <button type="button" onClick={() => edit()}>
                <Pencil size={13} />
                {c("Edit trip", "Modifier")}
              </button>
              {booking.type === "transfer" && booking.from && booking.to && (
                <button type="button" onClick={() => setMapOpen(true)}>
                  <MapPin size={13} />
                  {c("View route", "Voir le trajet")}
                </button>
              )}
            </div>
          </div>
          {invalid ? (
            <div className="ad-booking-no-route">
              <MapPin size={28} />
              <h2>{c("Where would you like to go?", "Où souhaitez-vous aller ?")}</h2>
              <p>
                {c(
                  "Set your route and a future pickup to compare vehicles and prices.",
                  "Indiquez votre trajet et un départ futur pour comparer les véhicules et tarifs.",
                )}
              </p>
              <button className="ad-primary" onClick={() => edit()}>
                {c("Choose my route", "Choisir mon trajet")}
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div
              className="ad-booking-vehicle-scroll"
              role="radiogroup"
              aria-label={c("Vehicle class", "Catégorie de véhicule")}
            >
              {options.map(({ vehicle, pricing }) => (
                <article
                  key={vehicle.id}
                  className={
                    "ad-book-vehicle " +
                    (selected?.vehicle.id === vehicle.id ? "ad-book-vehicle-selected" : "")
                  }
                >
                  <input
                    className="ad-sr-only"
                    id={"vehicle-" + vehicle.id}
                    type="radio"
                    name="vehicle"
                    value={vehicle.id}
                    checked={selected?.vehicle.id === vehicle.id}
                    onChange={() => chooseVehicle(vehicle.id)}
                    aria-label={
                      vt(vehicle.name) +
                      " · " +
                      (pricing.quoteRequired
                        ? c("On quotation", "Sur devis")
                        : "EUR " + money(pricing.eur))
                    }
                  />
                  <label className="ad-book-vehicle-hit" htmlFor={"vehicle-" + vehicle.id}>
                    <span className="ad-sr-only">
                      {c("Select", "Choisir")} {vt(vehicle.name)}
                    </span>
                  </label>
                  <span className="ad-vehicle-selection" aria-hidden="true">
                    {selected?.vehicle.id === vehicle.id && <Check size={12} strokeWidth={3} />}
                  </span>
                  <img className="ad-book-vehicle-image" src={vehicle.image} alt="" />
                  <div className="ad-book-vehicle-copy">
                    <h2>
                      {vt(vehicle.name)}
                      <button
                        type="button"
                        className="ad-book-vehicle-info"
                        aria-label={c("Details: ", "Détails : ") + vt(vehicle.name)}
                        onClick={() => setDetailId(vehicle.id)}
                      >
                        <Info size={15} />
                      </button>
                    </h2>
                    {vehicle.id === "economy-sedan" && (
                      <span className="ad-book-vehicle-badge">
                        {c("Best value", "Meilleur prix")}
                      </span>
                    )}
                    {vehicle.id === "comfort-sedan" && (
                      <span className="ad-book-vehicle-badge">
                        {c("Most popular", "Le plus populaire")}
                      </span>
                    )}
                    {vehicle.onRequest && (
                      <span className="ad-book-vehicle-badge">
                        {c("On request", "Sur demande")}
                      </span>
                    )}
                    <p>{vt(vehicle.carModels)}</p>
                    <div className="ad-book-capacity">
                      <span title={c("Passengers", "Passagers")}>
                        <Users size={15} />
                        {vehicle.passengers}
                      </span>
                      <span title={vt(vehicle.luggageNote)}>
                        <Briefcase size={14} />
                        {vehicle.luggage}
                      </span>
                    </div>
                  </div>
                  <div className="ad-book-vehicle-fare">
                    {pricing.quoteRequired ? (
                      <strong className="ad-book-quote">{c("Get a quote", "Sur devis")}</strong>
                    ) : (
                      <>
                        <small>EUR</small>
                        <strong>{money(pricing.eur)}</strong>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="ad-booking-continue">
            <div className="ad-selected-trip-price" aria-live="polite">
              <span>{selected ? vt(selected.vehicle.name) : c("Your ride", "Votre trajet")}</span>
              <strong>
                {total}
                {!invalid && !selected?.pricing.quoteRequired && <small> EUR</small>}
              </strong>
            </div>
            <button
              className="ad-primary ad-full"
              disabled={!!invalid || !selected}
              onClick={proceed}
            >
              {c("Continue", "Continuer")}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
        <aside className="ad-booking-side" aria-label={c("Your booking", "Votre trajet")}>
          {summary}
        </aside>
      </main>
      <BookingDialog
        open={mobileSummary}
        onOpenChange={setMobileSummary}
        title={c("Your booking", "Votre trajet")}
        description={c(
          "Review your journey and fare before continuing.",
          "Vérifiez votre trajet et le tarif avant de continuer.",
        )}
      >
        <div className="ad-booking-side ad-booking-side-dialog">{summary}</div>
      </BookingDialog>
      <BookingDialog
        open={mapOpen}
        onOpenChange={setMapOpen}
        title={c("Your route", "Votre itinéraire")}
        description={c(
          "A is your pickup. B is your destination. Travel times are approximate.",
          "A : votre départ. B : votre destination. Temps de trajet indicatifs.",
        )}
        wide
      >
        <div className="ad-route-dialog-map">
          <RouteMap
            from={booking.from}
            to={booking.to}
            pickupTime={booking.time}
            expanded
            onRoute={setRoad}
          />
        </div>
      </BookingDialog>
      <BookingDialog
        open={editing}
        onOpenChange={setEditing}
        title={c("Edit your trip", "Modifier votre trajet")}
        description={c(
          "Choose your route, pickup and passengers. All times are local to Morocco.",
          "Choisissez votre trajet, le départ et les passagers. Horaires locaux du Maroc.",
        )}
        wide
      >
        <BookingBar
          key={JSON.stringify(booking) + String(editingReturn)}
          initial={
            editingReturn
              ? {
                  ...booking,
                  vehicleId: selected?.vehicle.id || booking.vehicleId,
                  hasReturn: true,
                  returnDate: booking.returnDate || nextDate(booking.date),
                }
              : { ...booking, vehicleId: selected?.vehicle.id || booking.vehicleId }
          }
          onSearch={update}
          light
        />
      </BookingDialog>
      <BookingDialog
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetailId("");
        }}
        title={detail ? vt(detail.name) : ""}
        description={c("Find the right space for your journey.", "L'espace adapté à votre voyage.")}
      >
        {detail && (
          <div className="ad-booking-vehicle-detail">
            <img src={detail.image} alt={vt(detail.name)} />
            <p>{vt(detail.carModels)}</p>
            <div>
              <span>
                <Users size={18} />
                {detail.passengers} {c("passengers", "passagers")}
              </span>
              <span>
                <Briefcase size={18} />
                {detail.luggage} {c("bags", "bagages")}
              </span>
            </div>
            <p>{vt(detail.luggageNote)}</p>
            <p>
              {c(
                "Vehicle model and any special luggage or child seats are confirmed by our team.",
                "Le modèle du véhicule, les bagages spéciaux et les sièges enfants sont confirmés par notre équipe.",
              )}
            </p>
            <button
              className="ad-primary ad-full"
              disabled={!fitsPassengers(detail, booking.pax)}
              onClick={() => {
                chooseVehicle(detail.id);
                setDetailId("");
              }}
            >
              {c("Choose this vehicle", "Choisir ce véhicule")}
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </BookingDialog>
    </div>
  );
}
