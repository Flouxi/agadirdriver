import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShieldCheck, Users } from "lucide-react";
import BookingHeader from "../components/BookingHeader";
import Footer from "../components/Footer";

import { VEHICLES } from "../data";
import { BUSINESS } from "../data/seo";
import { bookingSearchSchema, bookingHref, validateBooking, fitsPassengers } from "../lib/booking";
import { calculateRoutePrice } from "../lib/pricing";
import { useCopy } from "../lib/copy";
import { useVehicleText } from "../lib/vehicle-copy";
import { useI18n } from "../lib/i18n";
import { validateEnquiryContact, enquiryEmailHref } from "../lib/enquiry";
import { trackBookingEvent } from "../lib/conversion";

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
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const optionalDetails = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (message) {
      reviewHeading.current?.focus({ preventScroll: true });
      reviewHeading.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [message]);
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
    const contactError = validateEnquiryContact(form);
    if (contactError) {
      if (contactError !== "name" && optionalDetails.current) {
        optionalDetails.current.open = true;
        optionalDetails.current
          .querySelector<HTMLInputElement>(
            `input[type="${contactError === "email" ? "email" : "tel"}"]`,
          )
          ?.focus();
      }
      setError(
        c(
          contactError === "name"
            ? "Enter your name to prepare your request."
            : "Check the optional email or phone number, or leave it blank.",
          contactError === "name"
            ? "Indiquez votre nom pour préparer votre demande."
            : "Vérifiez l'e-mail ou le téléphone facultatif, ou laissez le champ vide.",
        ),
      );
      return;
    }
    trackBookingEvent("request_prepared", booking.type);
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
        ...(form.email.trim() ? [c("Email: ", "E-mail : ") + form.email.trim()] : []),
        ...(form.phone.trim() ? [c("Phone: ", "Téléphone : ") + form.phone.trim()] : []),
        ...(form.flight.trim() ? [c("Flight: ", "Vol : ") + form.flight.trim()] : []),
        ...(form.notes.trim() ? [c("Notes: ", "Précisions : ") + form.notes.trim()] : []),
      ].join("\n"),
    );
  };
  return (
    <div className="ad-site">
      <BookingHeader step={message ? 3 : 2} />
      <main className="ad-shell ad-checkout-main">
        <a className="ad-back" href={bookingHref("/reservation", booking)}>
          <ArrowLeft size={15} />
          {c("Back to your ride", "Retour à votre trajet")}
        </a>
        <h1>
          {c("Request your ride. No payment now.", "Demandez votre trajet. Aucun paiement ici.")}
        </h1>
        <p>
          {c(
            "Add your name, review your journey, then send it on WhatsApp or by email. Our team confirms your fare and availability.",
            "Indiquez votre nom, vérifiez votre trajet, puis envoyez-le par WhatsApp ou e-mail. Notre équipe confirme le tarif et la disponibilité.",
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
          <form className="ad-details-card" onSubmit={submit} noValidate>
            <h2>{c("Lead passenger", "Passager principal")}</h2>
            <p>
              {c(
                "We can reply in the WhatsApp conversation you start. Additional contact details are optional.",
                "Nous pouvons vous répondre dans la conversation WhatsApp que vous ouvrez. Les autres coordonnées sont facultatives.",
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
                ] as const
              ).map((field) => (
                <label key={field.key}>
                  {field.label}
                  <input
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.key === "name"}
                    maxLength={150}
                    value={form[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                  />
                </label>
              ))}
              <label>
                {c("Flight number (optional)", "Numéro de vol (facultatif)")}
                <input
                  maxLength={30}
                  value={form.flight}
                  onChange={(e) => update("flight", e.target.value)}
                  placeholder="FR 1234"
                />
              </label>
            </div>
            <details className="ad-contact-options" ref={optionalDetails}>
              <summary>
                {c(
                  "Add contact details or special requests (optional)",
                  "Ajouter des coordonnées ou demandes particulières (facultatif)",
                )}
              </summary>
              <div className="ad-form-grid">
                <label>
                  {c("Email (optional)", "E-mail (facultatif)")}
                  <input
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </label>
                <label>
                  {c("Phone for pickup (optional)", "Téléphone pour le trajet (facultatif)")}
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+212 …"
                    maxLength={40}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
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
            </details>
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
                <h3 ref={reviewHeading} tabIndex={-1}>
                  <Check size={18} />
                  {c("Your request is ready to send.", "Votre demande est prête à être envoyée.")}
                </h3>
                <pre>{message}</pre>
                <a
                  className="ad-primary ad-full"
                  href={BUSINESS.whatsapp + "?text=" + encodeURIComponent(message)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackBookingEvent("whatsapp_outbound_click", booking.type)}
                >
                  <MessageCircle size={18} />
                  {c("Send request on WhatsApp", "Envoyer sur WhatsApp")}
                </a>
                <a
                  className="ad-secondary ad-full ad-email-alternative"
                  href={enquiryEmailHref(message)}
                  onClick={() => trackBookingEvent("email_outbound_click", booking.type)}
                >
                  {c("Send the same request by email", "Envoyer la même demande par e-mail")}
                  <ArrowRight size={16} />
                </a>
                <p>
                  {c(
                    "Your chosen app opens with your request. Press Send there to reach our team. Preparing this message does not confirm a booking.",
                    "L'application choisie s'ouvre avec votre demande. Appuyez sur Envoyer pour joindre notre équipe. Préparer ce message ne confirme pas une réservation.",
                  )}
                </p>
              </div>
            )}
            <p className="ad-fine-print">
              {c(
                "Your journey and any contact details you add are included in the request you choose to send to Agadir Driver. Please do not include payment card details.",
                "Votre trajet et les coordonnées ajoutées sont inclus dans la demande que vous choisissez d'envoyer à Agadir Driver. N'incluez pas de données de carte bancaire.",
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
