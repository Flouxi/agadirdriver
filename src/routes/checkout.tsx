import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShieldCheck, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingProgress from "../components/BookingProgress";
import { VEHICLES } from "../data";
import { BUSINESS } from "../data/seo";
import { bookingSearchSchema, bookingHref, validateBooking, fitsPassengers } from "../lib/booking";
import { calculateRoutePrice } from "../lib/pricing";
import { useCopy } from "../lib/copy";
import { useVehicleText } from "../lib/vehicle-copy";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search) => bookingSearchSchema.parse(search),
  head: () => ({
    meta: [{ title: "Request your ride | Agadir Driver" }, { name: "robots", content: "noindex" }],
  }),
  component: Checkout,
});
function Checkout() {
  const booking = Route.useSearch();
  const c = useCopy();
  const vehicleText = useVehicleText();
  const { lang } = useI18n();
  const vehicle = VEHICLES.find(
    (v) => v.id === booking.vehicleId && fitsPassengers(v, booking.pax),
  );
  const pricing = vehicle
    ? calculateRoutePrice({
        from: booking.from,
        to: booking.to,
        vehicle,
        bookingType: booking.type,
        durationHours: booking.hours,
        hasReturn: booking.hasReturn,
      })
    : null;
  const invalid = validateBooking(booking);
  const [form, setForm] = useState({ name: "", email: "", phone: "", flight: "", notes: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const money = pricing
    ? new Intl.NumberFormat(lang === "FR" ? "fr-FR" : "en-GB", {
        style: "currency",
        currency: "EUR",
      }).format(pricing.eur)
    : "—";
  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage("");
    setError("");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!vehicle || !pricing || invalid) return;
    if (
      form.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
      form.phone.replace(/\D/g, "").length < 8
    ) {
      setError(
        c(
          "Enter your full name, a valid email and a phone number with country code.",
          "Saisissez votre nom, un e-mail valide et un téléphone avec indicatif.",
        ),
      );
      return;
    }
    setMessage(
      [
        "AGADIR DRIVER — " + c("Booking request", "Demande de réservation"),
        c("Service: ", "Service : ") +
          (booking.type === "hourly"
            ? booking.hours + " h"
            : booking.hasReturn
              ? c("Round trip", "Aller-retour")
              : c("One-way transfer", "Transfert simple")),
        c("From: ", "Départ : ") + booking.from,
        ...(booking.type === "transfer" ? [c("To: ", "Arrivée : ") + booking.to] : []),
        c("Pickup: ", "Prise en charge : ") +
          booking.date +
          " " +
          booking.time +
          " (Morocco local time)",
        ...(booking.hasReturn
          ? [c("Return: ", "Retour : ") + booking.returnDate + " " + booking.returnTime]
          : []),
        c("Passengers: ", "Passagers : ") + booking.pax,
        c("Vehicle: ", "Véhicule : ") + vehicle.name,
        pricing.quoteRequired
          ? c("Please quote this route.", "Merci de chiffrer ce trajet.")
          : c("Displayed fare: ", "Tarif affiché : ") +
            money +
            " — " +
            c(
              "please confirm final price and availability.",
              "merci de confirmer le prix final et la disponibilité.",
            ),
        c("Name: ", "Nom : ") + form.name.trim(),
        c("Email: ", "E-mail : ") + form.email.trim(),
        c("Phone: ", "Téléphone : ") + form.phone.trim(),
        ...(form.flight.trim() ? [c("Flight: ", "Vol : ") + form.flight.trim()] : []),
        ...(form.notes.trim() ? [c("Notes: ", "Précisions : ") + form.notes.trim()] : []),
      ].join("\n"),
    );
  };
  return (
    <div className="ad-site">
      <Header />
      <BookingProgress step={message ? 3 : 2} />
      <main className="ad-shell ad-checkout-main">
        <a className="ad-back" href={bookingHref("/reservation", booking)}>
          <ArrowLeft size={15} />
          {c("Back to your ride", "Retour à votre trajet")}
        </a>
        <h1>{c("A few details. Then you're ready.", "Quelques détails avant de partir.")}</h1>
        <p>
          {c(
            "Send your request to our local team for confirmation.",
            "Envoyez votre demande à notre équipe locale pour confirmation.",
          )}
        </p>
        {(!vehicle || invalid) && (
          <div role="alert" className="ad-inclusions">
            <ShieldCheck size={24} />
            <div>
              <h2>
                {c("Please check your ride details.", "Vérifiez les détails de votre trajet.")}
              </h2>
              <p>
                {c(
                  "Choose a future pickup and a vehicle that fits everyone before sending a request.",
                  "Choisissez un départ futur et un véhicule adapté à votre groupe avant d'envoyer une demande.",
                )}
              </p>
              <a className="ad-text-button" href={bookingHref("/reservation", booking)}>
                {c("Edit my ride", "Modifier mon trajet")}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
        <div className="ad-checkout-grid">
          <form className="ad-details-card" onSubmit={submit}>
            <h2>{c("Lead passenger", "Passager principal")}</h2>
            <p>
              {c(
                "Use the details where we can reach you about this journey.",
                "Indiquez les coordonnées auxquelles vous joindre pour ce trajet.",
              )}
            </p>
            <div className="ad-form-grid">
              {(
                [
                  {
                    key: "name",
                    label: c("Full name", "Nom complet"),
                    type: "text",
                    autoComplete: "name",
                  },
                  {
                    key: "email",
                    label: c("Email", "E-mail"),
                    type: "email",
                    autoComplete: "email",
                  },
                  {
                    key: "phone",
                    label: c("Phone with country code", "Téléphone avec indicatif"),
                    type: "tel",
                    autoComplete: "tel",
                  },
                ] as const
              ).map((field) => (
                <label key={field.key}>
                  {field.label}
                  <input
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    maxLength={150}
                    value={form[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.key === "phone" ? "+212 …" : undefined}
                  />
                </label>
              ))}
              <label>
                {c("Flight number (for airport pickups)", "Numéro de vol (départs aéroport)")}
                <input
                  maxLength={30}
                  value={form.flight}
                  onChange={(e) => update("flight", e.target.value)}
                  placeholder="FR 1234"
                />
              </label>
              <label className="ad-form-span">
                {c(
                  "Luggage, child seats, exact address or other requests",
                  "Bagages, sièges enfants, adresse exacte ou autres demandes",
                )}
                <textarea
                  maxLength={1000}
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </label>
            </div>
            <div className="ad-inclusions">
              <ShieldCheck size={21} />
              <p>
                {c(
                  "No payment is taken here. We will confirm your final fare, availability and payment arrangements directly. Your request becomes a booking only after our confirmation.",
                  "Aucun paiement n'est prélevé ici. Nous confirmons directement le tarif final, la disponibilité et les modalités de paiement. Votre demande devient une réservation après notre confirmation.",
                )}
              </p>
            </div>
            {error && (
              <p role="alert" className="ad-form-error">
                {error}
              </p>
            )}
            {!message ? (
              <button className="ad-primary ad-full" disabled={!vehicle || !!invalid} type="submit">
                {c("Review my request", "Vérifier ma demande")}
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="ad-request-review" role="status">
                <h3>
                  <Check size={18} />
                  {c("Your request is ready to send.", "Votre demande est prête à être envoyée.")}
                </h3>
                <pre>{message}</pre>
                <a
                  className="ad-primary ad-full"
                  href={BUSINESS.whatsapp + "?text=" + encodeURIComponent(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  {c("Send request on WhatsApp", "Envoyer sur WhatsApp")}
                </a>
                <p>
                  {c(
                    "WhatsApp opens with your message. Press Send there to reach our team. This page does not save a booking or send an email.",
                    "WhatsApp s'ouvre avec votre message. Appuyez sur Envoyer pour joindre notre équipe. Cette page n'enregistre pas de réservation et n'envoie pas d'e-mail.",
                  )}
                </p>
              </div>
            )}
            <p className="ad-fine-print">
              {c(
                "Your contact and journey details are included in the message you choose to send to Agadir Driver on WhatsApp. Please do not include payment card details.",
                "Vos coordonnées et les détails du trajet sont inclus dans le message que vous choisissez d'envoyer à Agadir Driver sur WhatsApp. N'incluez pas de données de carte bancaire.",
              )}
            </p>
          </form>
          <aside>
            <div className="ad-summary-card">
              <h2>{c("Your journey", "Votre trajet")}</h2>
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
              <p className="ad-summary-date">
                {booking.date} · {booking.time}
              </p>
              {booking.hasReturn && (
                <p className="ad-summary-return">
                  {c("Return", "Retour")} · {booking.returnDate} · {booking.returnTime}
                </p>
              )}
              <p className="ad-summary-estimate">
                <Users size={15} />
                {booking.pax} {c("passengers", "passagers")}
              </p>
              {vehicle && (
                <div className="ad-selected-summary">
                  <img src={vehicle.image} alt="" />
                  <span>
                    <small>{c("Vehicle", "Véhicule")}</small>
                    <strong>{vehicleText(vehicle.name)}</strong>
                  </span>
                </div>
              )}
              <div className="ad-summary-total">
                <span>{c("Displayed total", "Total affiché")}</span>
                <strong>{pricing?.quoteRequired ? c("On quotation", "Sur devis") : money}</strong>
              </div>
              <p className="ad-fine-print">
                {c(
                  "Price for the vehicle, subject to confirmation. Return included when selected.",
                  "Prix par véhicule, à confirmer. Retour inclus si sélectionné.",
                )}
              </p>
              <a className="ad-summary-help" href={"mailto:support@agadirdriver.com"}>
                {c(
                  "Prefer email? Contact our team.",
                  "Vous préférez l'e-mail ? Contactez notre équipe.",
                )}
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
