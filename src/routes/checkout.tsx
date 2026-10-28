import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShieldCheck, Users } from "lucide-react";
import BookingHeader from "../components/BookingHeader";
import Footer from "../components/Footer";

import { VEHICLES } from "../data";
import { usePassengerDraft } from "../lib/passenger-draft";
import { BUSINESS } from "../data/seo";
import { bookingSearchSchema, validateBooking, fitsPassengers } from "../lib/booking";
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
  const formatDate = (value: string) =>
    new Date(value + "T12:00:00").toLocaleDateString(lang === "FR" ? "fr-FR" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const invalid = validateBooking(booking);
  const [form, setForm] = usePassengerDraft();
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone", string>>>({});
  const pageHeading = useRef<HTMLHeadingElement>(null);
  const optionalDetails = useRef<HTMLDetailsElement>(null);
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
    if (key === "name" || key === "email" || key === "phone")
      setErrors((previous) => ({ ...previous, [key]: undefined }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vehicle || !pricing || invalid) return;
    const contactError = validateEnquiryContact(form);
    const nextErrors: Partial<Record<"name" | "email" | "phone", string>> = {};
    if (contactError) {
      nextErrors[contactError] =
        contactError === "name"
          ? c("Enter the passenger's full name.", "Indiquez le nom complet du passager.")
          : c(
              "Check this optional contact detail, or leave it blank.",
              "Vérifiez cette coordonnée facultative, ou laissez le champ vide.",
            );
    }
    setErrors(nextErrors);
    if (contactError) {
      if (contactError !== "name" && optionalDetails.current) optionalDetails.current.open = true;
      (
        event.currentTarget.elements.namedItem(
          "passenger-" + contactError,
        ) as HTMLInputElement | null
      )?.focus();
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
    requestAnimationFrame(() => {
      pageHeading.current?.focus({ preventScroll: true });
      pageHeading.current?.scrollIntoView({ block: "start" });
    });
  };
  return (
    <div className="ad-site">
      <BookingHeader step={message ? 3 : 2} />
      <main className="ad-shell ad-checkout-main">
        <Link className="ad-back" to="/reservation" search={booking}>
          <ArrowLeft size={15} />
          {c("Back to your ride", "Retour à votre trajet")}
        </Link>
        <h1 ref={pageHeading} tabIndex={-1}>
          {message
            ? c("Review your request", "Vérifiez votre demande")
            : c("Request your ride. No payment now.", "Demandez votre trajet. Aucun paiement ici.")}
        </h1>
        <p>
          {c(
            "Review your journey, then send it on WhatsApp or by email. Our team confirms the final fare and availability.",
            "Vérifiez votre trajet, puis envoyez-le par WhatsApp ou e-mail. Notre équipe confirme le tarif final et la disponibilité.",
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
              <Link className="ad-text-button" to="/reservation" search={booking}>
                {c("Edit my ride", "Modifier mon trajet")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
        <div className="ad-checkout-grid">
          <form className="ad-details-card" onSubmit={submit} noValidate>
            <div hidden={!!message}>
              <h2>{c("Lead passenger", "Passager principal")}</h2>
              <p>
                {c(
                  "We can reply in the WhatsApp conversation you start. Additional contact details are optional.",
                  "Nous pouvons vous répondre dans la conversation WhatsApp que vous ouvrez. Les autres coordonnées sont facultatives.",
                )}
              </p>
              <div className="ad-form-grid">
                <label>
                  {c("Full name", "Nom complet")}
                  <input
                    id="passenger-name"
                    name="passenger-name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={150}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "passenger-error-name" : undefined}
                  />
                  {errors.name && (
                    <span className="ad-field-error" id="passenger-error-name">
                      {errors.name}
                    </span>
                  )}
                </label>
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
                  {(
                    [
                      {
                        key: "email",
                        label: c("Email (optional)", "E-mail (facultatif)"),
                        type: "email",
                        autoComplete: "email",
                      },
                      {
                        key: "phone",
                        label: c(
                          "Phone for pickup (optional)",
                          "Téléphone pour le trajet (facultatif)",
                        ),
                        type: "tel",
                        autoComplete: "tel",
                      },
                    ] as const
                  ).map((field) => (
                    <label key={field.key}>
                      {field.label}
                      <input
                        id={"passenger-" + field.key}
                        name={"passenger-" + field.key}
                        aria-invalid={!!errors[field.key]}
                        aria-describedby={
                          errors[field.key] ? "passenger-error-" + field.key : undefined
                        }
                        type={field.type}
                        autoComplete={field.autoComplete}
                        maxLength={150}
                        value={form[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        placeholder={field.key === "phone" ? "+212 …" : undefined}
                      />
                      {errors[field.key] && (
                        <span className="ad-field-error" id={"passenger-error-" + field.key}>
                          {errors[field.key]}
                        </span>
                      )}
                    </label>
                  ))}
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
            </div>
            {Object.values(errors).some(Boolean) && (
              <p role="alert" className="ad-form-error">
                {c("Please check the highlighted details.", "Vérifiez les champs signalés.")}
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
                <dl className="ad-passenger-review">
                  <div>
                    <dt>{c("Lead passenger", "Passager principal")}</dt>
                    <dd>{form.name.trim()}</dd>
                  </div>
                  {form.email.trim() && (
                    <div>
                      <dt>{c("Email", "E-mail")}</dt>
                      <dd>{form.email.trim()}</dd>
                    </div>
                  )}
                  {form.phone.trim() && (
                    <div>
                      <dt>{c("Phone", "Téléphone")}</dt>
                      <dd>{form.phone.trim()}</dd>
                    </div>
                  )}
                  {form.flight.trim() && (
                    <div>
                      <dt>{c("Flight", "Vol")}</dt>
                      <dd>{form.flight.trim()}</dd>
                    </div>
                  )}
                  {form.notes.trim() && (
                    <div>
                      <dt>{c("Your requests", "Vos demandes")}</dt>
                      <dd>{form.notes.trim()}</dd>
                    </div>
                  )}
                </dl>
                <button
                  type="button"
                  className="ad-edit-passenger"
                  onClick={() => {
                    setMessage("");
                    requestAnimationFrame(() => document.getElementById("passenger-name")?.focus());
                  }}
                >
                  {c("Edit passenger details", "Modifier les coordonnées")}
                </button>
                <a
                  className="ad-primary ad-full"
                  href={BUSINESS.whatsapp + "?text=" + encodeURIComponent(message)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackBookingEvent("whatsapp_outbound_click", booking.type)}
                >
                  <MessageCircle size={18} />
                  {c("Continue to WhatsApp", "Continuer sur WhatsApp")}
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
                {formatDate(booking.date)} · {booking.time}
                <small className="ad-morocco-time">
                  {c("Morocco local time", "Heure locale du Maroc")}
                </small>
              </p>
              {booking.hasReturn && (
                <p className="ad-summary-return">
                  {c("Return", "Retour")} · {formatDate(booking.returnDate)} · {booking.returnTime}
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
