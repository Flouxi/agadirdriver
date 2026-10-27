import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingBar from "../components/BookingBar";
import { VEHICLES, DESTINATIONS, REVIEWS } from "../data";
import { AIRPORTS, CITIES } from "../data/locations";
import { BUSINESS } from "../data/seo";
import { useCopy } from "../lib/copy";
import { useVehicleText } from "../lib/vehicle-copy";
import { type BookingSearch } from "../lib/booking";
import {
  HOMEPAGE_HERO_IMAGE_URL,
  INFO_SECTION_PRIMARY_IMAGE_URL,
  INFO_SECTION_SECONDARY_IMAGE_URL,
} from "../lib/brand-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agadir Airport Transfer & Private Driver | AgadirDriver.com" },
      {
        name: "description",
        content:
          "Private airport transfers, city rides and hourly chauffeurs in Agadir and across Morocco. Compare vehicle fares and request your ride with Agadir Driver.",
      },
      { property: "og:title", content: "Your private driver in Morocco | Agadir Driver" },
      {
        property: "og:image",
        content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg",
      },
      { property: "og:url", content: "https://agadirdriver.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://agadirdriver.com/" },
      { rel: "preload", as: "image", href: HOMEPAGE_HERO_IMAGE_URL },
    ],
  }),
  component: Home,
});
function Home() {
  const c = useCopy();
  const vehicleText = useVehicleText();
  const [mode, setMode] = useState<"transfer" | "hourly">("transfer");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("service") === "hourly") setMode("hourly");
  }, []);
  const [initial, setInitial] = useState<Partial<BookingSearch>>({});
  const [formKey, setFormKey] = useState(0);
  const [tab, setTab] = useState("all");
  const fleet = useRef<HTMLDivElement>(null);
  const focusBooking = () =>
    document
      .getElementById("booking-interface")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  const prefill = (value: Partial<BookingSearch>) => {
    setInitial(value);
    setFormKey((k) => k + 1);
    focusBooking();
  };
  const nav = (section: string) => {
    if (section === "help") {
      document.getElementById("help")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setMode(section === "hourly" ? "hourly" : "transfer");
    focusBooking();
  };
  const services = [
    {
      title: c("Across Morocco", "Partout au Maroc"),
      text: c(
        "From the Atlantic coast to Marrakech. A private ride, all the way.",
        "De la côte Atlantique à Marrakech. Votre trajet privé de porte à porte.",
      ),
      image: INFO_SECTION_PRIMARY_IMAGE_URL,
      href: "/agadir-airport-transfer",
    },
    {
      title: c("Professional drivers", "Chauffeurs professionnels"),
      text: c(
        "Local knowledge and a personal welcome at every pickup.",
        "Une connaissance locale et un accueil personnalisé à chaque départ.",
      ),
      image: INFO_SECTION_SECONDARY_IMAGE_URL,
      href: "/private-driver-agadir",
    },
    {
      title: c("Chauffeur by the hour", "Chauffeur à l'heure"),
      text: c(
        "Your schedule. Your stops. A driver dedicated to your day.",
        "Vos horaires, vos arrêts. Un chauffeur dédié à votre journée.",
      ),
      image: HOMEPAGE_HERO_IMAGE_URL,
      href: "/?service=hourly#booking-interface",
    },
    {
      title: c("City rides", "Trajets entre villes"),
      text: c(
        "Agadir, Taghazout, Essaouira or Marrakech. Travel at your own pace.",
        "Agadir, Taghazout, Essaouira ou Marrakech. Voyagez à votre rythme.",
      ),
      image: INFO_SECTION_SECONDARY_IMAGE_URL,
      href: "/agadir-taxi",
    },
  ];
  return (
    <div className="ad-site">
      <a className="ad-skip" href="#main-content">
        {c("Skip to content", "Aller au contenu")}
      </a>
      <div className="ad-hero-wrap">
        <img className="ad-hero-image" src={HOMEPAGE_HERO_IMAGE_URL} alt="" fetchPriority="high" />
        <Header overlay onNavClick={nav} />
        <main id="main-content" className="ad-shell ad-hero">
          <div className="ad-hero-copy">
            <h1>
              {c("Your reliable private", "Votre chauffeur privé")}
              <br />
              {c("driver in Morocco", "de confiance au Maroc")}
            </h1>
            <p>
              {c(
                "Airport transfers. City rides. A better way to arrive.",
                "Transferts aéroport. Trajets entre villes. Voyagez sereinement.",
              )}
            </p>
          </div>
          <BookingBar key={formKey} initial={initial} mode={mode} />
          <div className="ad-hero-proof">
            <span>
              {c(
                "Local expertise · Private vehicles · Clear pricing",
                "Expertise locale · Véhicules privés · Tarifs transparents",
              )}
            </span>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              {c("A real team, here to help", "Une équipe à votre écoute")}
            </a>
          </div>
        </main>
      </div>
      <section className="ad-section ad-how">
        <div className="ad-shell">
          <div className="ad-section-heading">
            <span className="ad-eyebrow">
              {c("From booking to arrival", "Du départ à l'arrivée")}
            </span>
            <h2>{c("How it works", "Comment ça marche")}</h2>
            <p>
              {c(
                "A few simple steps. A smoother journey.",
                "Quelques étapes simples. Un voyage plus serein.",
              )}
            </p>
          </div>
          <div className="ad-three-grid">
            {[
              [
                c("Choose your ride", "Choisissez votre trajet"),
                c(
                  "Enter your route and compare vehicles for your group.",
                  "Indiquez votre itinéraire et comparez les véhicules adaptés.",
                ),
              ],
              [
                c("Confirm with our team", "Confirmez avec notre équipe"),
                c(
                  "Send your request. We confirm the fare, availability and pickup details.",
                  "Envoyez votre demande. Nous confirmons le tarif, la disponibilité et le départ.",
                ),
              ],
              [
                c("Enjoy the journey", "Profitez du voyage"),
                c(
                  "Meet your driver and settle in, all the way to your destination.",
                  "Retrouvez votre chauffeur et profitez du trajet jusqu'à destination.",
                ),
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <span className="ad-step-number">{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-services" id="services">
        <div className="ad-shell">
          <h2>{c("Core services", "Nos services")}</h2>
          <div className="ad-service-grid">
            {services.map((service) => (
              <a className="ad-service-card" key={service.title} href={service.href}>
                <div className="ad-service-photo">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span>
                    {c("Details", "Découvrir")}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section">
        <div className="ad-shell">
          <div className="ad-heading-row">
            <div>
              <h2>{c("Comfort for every kind of journey", "Le confort pour chaque voyage")}</h2>
              <p>
                {c(
                  "A private vehicle, with room for everyone.",
                  "Un véhicule privé, de la place pour tous.",
                )}
              </p>
            </div>
            <div className="ad-carousel-controls">
              <button
                aria-label={c("Previous vehicles", "Véhicules précédents")}
                onClick={() => fleet.current?.scrollBy({ left: -340, behavior: "smooth" })}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                aria-label={c("Next vehicles", "Véhicules suivants")}
                onClick={() => fleet.current?.scrollBy({ left: 340, behavior: "smooth" })}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="ad-fleet-track" ref={fleet}>
            {VEHICLES.map((vehicle) => (
              <button
                className="ad-fleet-card"
                key={vehicle.id}
                onClick={() => prefill({ vehicleId: vehicle.id })}
              >
                <img src={vehicle.image} alt={vehicleText(vehicle.name)} loading="lazy" />
                <h3>{vehicleText(vehicle.name)}</h3>
                <p>{vehicleText(vehicle.carModels)}</p>
                <div>
                  <span>
                    <Users size={15} />
                    {vehicle.passengers}
                  </span>
                  <span>
                    <Briefcase size={15} />
                    {vehicle.luggage}
                  </span>
                  <span className="ad-fleet-link">
                    {c("Choose", "Choisir")}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-soft">
        <div className="ad-shell">
          <div className="ad-heading-row">
            <div>
              <h2>{c("Customer stories", "Nos voyageurs témoignent")}</h2>
              <p>
                {c(
                  "Experiences shared by our passengers.",
                  "Des expériences partagées par nos passagers.",
                )}
              </p>
              <small>
                {c(
                  "Testimonials supplied by Agadir Driver.",
                  "Témoignages fournis par Agadir Driver.",
                )}
              </small>
            </div>
            <ShieldCheck className="ad-gold" size={36} />
          </div>
          <div className="ad-three-grid ad-reviews">
            {REVIEWS.slice(0, 3).map((review) => (
              <article key={review.id}>
                <span className="ad-quote-mark" aria-hidden="true">
                  “
                </span>
                <h3>{review.title}</h3>
                <p>{review.comment}</p>
                <strong>{review.author}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section">
        <div className="ad-shell">
          <div className="ad-heading-row">
            <div>
              <h2>{c("Destinations", "Destinations")}</h2>
              <p>
                {c(
                  "From the airport to the coast, the city and beyond.",
                  "De l'aéroport à la côte, aux villes et au-delà.",
                )}
              </p>
            </div>
            <div className="ad-filter-tabs">
              {[
                { id: "all", label: c("All", "Tous") },
                { id: "airport", label: c("Airports", "Aéroports") },
                { id: "city", label: c("Cities & resorts", "Villes et resorts") },
                { id: "ski", label: c("Mountains", "Montagnes") },
              ].map((item) => (
                <button
                  key={item.id}
                  aria-pressed={tab === item.id}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="ad-destination-grid">
            {DESTINATIONS.filter((d) => tab === "all" || d.type === tab).map((destination) => (
              <button
                className="ad-destination-card"
                key={destination.id}
                onClick={() => {
                  const airport = AIRPORTS.find((a) => a.label.includes(destination.name));
                  const city = CITIES.find((a) => a.label.includes(destination.name));
                  prefill(
                    destination.type === "airport"
                      ? { from: airport?.label || destination.airport }
                      : { from: AIRPORTS[0].label, to: city?.label || destination.name },
                  );
                }}
              >
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <div>
                  <small>
                    {destination.type === "airport"
                      ? c("Airport transfers", "Transferts aéroport")
                      : c("Private rides", "Trajets privés")}
                  </small>
                  <h3>{destination.name}</h3>
                  <span>
                    {destination.airport}
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-soft">
        <div className="ad-shell ad-mobile-promo">
          <div>
            <span className="ad-eyebrow">
              {c("Your journey, at your fingertips", "Votre trajet, à portée de main")}
            </span>
            <h2>{c("Take it easy.", "Voyagez l'esprit léger.")}</h2>
            <p>
              {c(
                "Arrange your ride, share your flight details or ask a question. Our team is just a message away.",
                "Organisez votre trajet, partagez votre numéro de vol ou posez une question. Notre équipe est à un message de vous.",
              )}
            </p>
            <a className="ad-primary" href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              {c("Chat on WhatsApp", "Discuter sur WhatsApp")}
            </a>
          </div>
          <img
            src="/assets/agadir88/app-mockup-v2.png"
            loading="lazy"
            alt={c("Agadir Driver on mobile", "Agadir Driver sur mobile")}
          />
        </div>
      </section>
      <section className="ad-section" id="help">
        <div className="ad-shell">
          <div className="ad-section-heading">
            <h2>{c("Good to know before you go", "Tout savoir avant de partir")}</h2>
          </div>
          <div className="ad-faq">
            {[
              [
                c("How is my booking confirmed?", "Comment ma réservation est-elle confirmée ?"),
                c(
                  "After you send your request on WhatsApp, our team confirms the fare, vehicle availability and meeting point. Your request is not a confirmed booking until you receive our reply.",
                  "Après l'envoi de votre demande sur WhatsApp, notre équipe confirme le tarif, la disponibilité et le lieu de rendez-vous. Votre demande devient une réservation après notre confirmation.",
                ),
              ],
              [
                c("What if my flight is delayed?", "Et si mon vol est retardé ?"),
                c(
                  "Include your flight number with your request. Airport pickups include flight monitoring and up to 60 minutes of waiting for international flights (45 minutes for domestic flights).",
                  "Ajoutez votre numéro de vol. Les départs aéroport incluent le suivi du vol et jusqu'à 60 minutes d'attente pour les vols internationaux (45 minutes pour les vols intérieurs).",
                ),
              ],
              [
                c(
                  "Can I add a return or book for a group?",
                  "Puis-je ajouter un retour ou réserver pour un groupe ?",
                ),
                c(
                  "Yes. Add your return date in the booking form. Choose up to 17 passengers and we will show vehicles that fit your group. Please tell us about child seats, surfboards and oversized luggage.",
                  "Oui. Ajoutez la date de retour au formulaire. Choisissez jusqu'à 17 passagers : seuls les véhicules adaptés s'affichent. Précisez les sièges enfants, planches de surf et bagages volumineux.",
                ),
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <PlusIcon />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-contact-banner">
        <div className="ad-shell">
          <div>
            <h2>
              {c("A journey worth looking forward to.", "Un voyage qui commence sereinement.")}
            </h2>
            <p>
              {c(
                "Need a custom itinerary? Let's plan it together.",
                "Besoin d'un itinéraire sur mesure ? Préparons-le ensemble.",
              )}
            </p>
          </div>
          <a
            className="ad-primary"
            href={"mailto:support@agadirdriver.com?subject=Custom%20journey"}
          >
            {c("Plan my journey", "Organiser mon voyage")}
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
function PlusIcon() {
  return <span aria-hidden="true">+</span>;
}
