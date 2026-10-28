import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BUSINESS, SERVICE_PAGES, type ServicePage } from "../data/seo";
import { AIRPORTS } from "../data/locations";
import { useCopy } from "../lib/copy";
import Header from "./Header";
import Footer from "./Footer";
import BookingBar from "./BookingBar";
import BookingFaqs from "./BookingFaqs";
import RouteFareTable from "./RouteFareTable";
import { SERVICE_DETAILS } from "../data/service-details";
import { jsonLd } from "../lib/seo-head";

export default function SeoLandingPage({
  page,
  path,
}: {
  page: ServicePage;
  path: keyof typeof SERVICE_PAGES;
}) {
  const c = useCopy();
  const hourly = path === "/private-driver-agadir";
  const city = path === "/agadir-taxi";
  const destination = path.includes("taghazout")
    ? "Taghazout"
    : path.includes("tamraght")
      ? "Tamraght"
      : "";
  const initial = { from: city || hourly ? "Agadir Centre-Ville" : AIRPORTS[0].label };
  const heading = c(
    page.h1,
    hourly
      ? "Chauffeur privé à Agadir"
      : city
        ? "Taxi à Agadir"
        : destination
          ? `Transfert aéroport vers ${destination}`
          : "Transfert aéroport d'Agadir",
  );
  const intro = hourly
    ? c(
        "Your schedule, your stops. Choose your pickup, hours and vehicle, then confirm your itinerary with our local team.",
        "Vos horaires, vos arrêts. Choisissez votre départ, la durée et le véhicule, puis confirmez votre itinéraire avec notre équipe.",
      )
    : city
      ? c(
          "A private ride from your hotel to your next stop. Enter your route to compare vehicles and request your journey.",
          "Un trajet privé de votre hôtel à votre prochaine étape. Indiquez votre itinéraire pour comparer les véhicules et demander votre trajet.",
        )
      : destination
        ? c(
            `From Agadir Al Massira Airport to your accommodation in ${destination}. Choose your hotel or enter its address to see your vehicle options.`,
            `De l'aéroport Agadir Al Massira à votre hébergement à ${destination}. Choisissez votre hôtel ou indiquez son adresse pour comparer les véhicules.`,
          )
        : c(
            page.intro,
            "Organisez votre transfert privé depuis l'aéroport Agadir Al Massira vers votre hôtel, appartement ou surf camp.",
          );
  const whatsapp =
    BUSINESS.whatsapp +
    "?text=" +
    encodeURIComponent(
      c(
        `Hello, I would like help arranging ${page.service}.`,
        `Bonjour, je souhaite organiser un trajet : ${heading}.`,
      ),
    );
  return (
    <div className="ad-site ad-service-landing">
      <a className="ad-skip" href="#main-content">
        {c("Skip to content", "Aller au contenu")}
      </a>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Service",
                  "@id": BUSINESS.url + path + "#service",
                  name: heading,
                  description: intro,
                  url: BUSINESS.url + path,
                  provider: { "@id": BUSINESS.url + "/#business" },
                  areaServed: destination || "Agadir",
                },
                {
                  "@type": "WebPage",
                  "@id": BUSINESS.url + path + "#webpage",
                  url: BUSINESS.url + path,
                  name: heading,
                  description: intro,
                  mainEntity: { "@id": BUSINESS.url + path + "#service" },
                  breadcrumb: { "@id": BUSINESS.url + path + "#breadcrumb" },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": BUSINESS.url + path + "#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Agadir Driver",
                      item: BUSINESS.url + "/",
                    },
                    { "@type": "ListItem", position: 2, name: heading, item: BUSINESS.url + path },
                  ],
                },
              ],
            }),
          }}
        />
        <section className="ad-service-hero">
          <div className="ad-shell">
            <nav className="ad-breadcrumbs" aria-label={c("Breadcrumb", "Fil d'Ariane")}>
              <Link to="/">Agadir Driver</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{heading}</span>
            </nav>
            <p className="ad-eyebrow">
              Agadir Driver ·{" "}
              {c("Private vehicles. Local team.", "Véhicules privés. Équipe locale.")}
            </p>
            <h1>{heading}</h1>
            <p className="ad-service-intro">{intro}</p>
            <BookingBar initial={initial} mode={hourly ? "hourly" : "transfer"} />
            <p className="ad-service-reassurance">
              {c(
                "Price per vehicle · No payment online · Final fare and availability confirmed by our team",
                "Prix par véhicule · Aucun paiement en ligne · Tarif final et disponibilité confirmés par notre équipe",
              )}
            </p>
            <a className="ad-service-chat" href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              {c(
                "Need help with your route? Ask on WhatsApp",
                "Besoin d'aide pour votre trajet ? Contactez-nous sur WhatsApp",
              )}
            </a>
          </div>
        </section>
        {!hourly && (
          <RouteFareTable
            city={city}
            destination={
              destination === "Taghazout"
                ? "taghazout"
                : destination === "Tamraght"
                  ? "tamraght"
                  : undefined
            }
          />
        )}
        <section className="ad-section ad-service-details">
          <div className="ad-shell">
            {SERVICE_DETAILS[path].map((section) => (
              <section key={section.title[0]}>
                <h2>{c(section.title[0], section.title[1])}</h2>
                <p>{c(section.body[0], section.body[1])}</p>
              </section>
            ))}
          </div>
        </section>
        <section className="ad-section">
          <div className="ad-shell">
            <div className="ad-section-heading">
              <h2>
                {hourly
                  ? c("A driver around your plans", "Un chauffeur selon vos projets")
                  : destination
                    ? c(`Your arrival in ${destination}`, `Votre arrivée à ${destination}`)
                    : c(
                        "From your request to your destination",
                        "De votre demande à votre destination",
                      )}
              </h2>
            </div>
            <div className="ad-conversion-steps">
              {[
                [
                  c("1. Choose your journey", "1. Choisissez votre trajet"),
                  hourly
                    ? c(
                        "Select your pickup and hire duration. Add your intended stops in the request notes so our team can confirm the itinerary.",
                        "Choisissez le départ et la durée. Ajoutez les arrêts prévus dans les remarques pour que notre équipe confirme l'itinéraire.",
                      )
                    : c(
                        "Enter your pickup, accommodation, date and group size. Choose a vehicle with room for everyone and their luggage.",
                        "Indiquez le départ, l'hébergement, la date et la taille du groupe. Choisissez un véhicule adapté aux passagers et aux bagages.",
                      ),
                ],
                [
                  c("2. Confirm the details", "2. Confirmez les détails"),
                  c(
                    "Send your request on WhatsApp or by email. Our team confirms the final fare, availability, pickup and payment arrangements.",
                    "Envoyez votre demande par WhatsApp ou e-mail. Notre équipe confirme le tarif final, la disponibilité, le départ et les modalités de paiement.",
                  ),
                ],
                [
                  c("3. Meet your driver", "3. Retrouvez votre chauffeur"),
                  city || hourly
                    ? c(
                        "Meet at the agreed pickup point. Share your exact address and any luggage requirements before the journey.",
                        "Retrouvez votre chauffeur au point convenu. Communiquez l'adresse exacte et vos besoins de bagages avant le trajet.",
                      )
                    : c(
                        "Share your flight number and meet at the agreed airport pickup point. Tell us about surfboards or child-seat requirements before booking.",
                        "Indiquez votre numéro de vol et retrouvez votre chauffeur au point de rendez-vous convenu. Précisez vos besoins de planches ou sièges enfants avant réservation.",
                      ),
                ],
              ].map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <BookingFaqs />
        <section className="ad-section ad-related-services">
          <div className="ad-shell">
            <h2>{c("Planning another journey?", "Un autre trajet à organiser ?")}</h2>
            <div>
              {Object.entries(SERVICE_PAGES)
                .filter(([url]) => url !== path)
                .map(([url, related]) => (
                  <Link key={url} to={url}>
                    <span>{related.service}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
