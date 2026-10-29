import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Briefcase, MessageCircle, Star, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingBar from "../components/BookingBar";
import JourneySteps from "../components/JourneySteps";
import BookingFaqs from "../components/BookingFaqs";
import { seoHead } from "../lib/seo-head";
import { VEHICLES, DESTINATIONS, REVIEWS } from "../data";
import { AIRPORTS, CITIES } from "../data/locations";
import { BUSINESS } from "../data/seo";
import { useCopy } from "../lib/copy";
import { useVehicleText } from "../lib/vehicle-copy";
import type { BookingSearch } from "../lib/booking";
import {
  HOMEPAGE_HERO_IMAGE_URL,
  HOMEPAGE_HERO_SRCSET,
  INFO_SECTION_PRIMARY_IMAGE_URL,
  INFO_SECTION_SECONDARY_IMAGE_URL,
} from "../lib/brand-images";
export const Route = createFileRoute("/")({
  head: () => {
    const head = seoHead({
      title: "Agadir Transfers & Private Drivers | Agadir Driver",
      description:
        "Arrange Agadir transfers, airport pickups and private transport to your hotel, Taghazout or Tamraght. Compare vehicles and confirm with our local team.",
      path: "/",
    });
    return {
      ...head,
      links: [
        ...head.links,
        {
          rel: "preload",
          as: "image",
          href: HOMEPAGE_HERO_IMAGE_URL,
          imageSrcSet: HOMEPAGE_HERO_SRCSET,
          imageSizes: "100vw",
        },
      ],
    };
  },
  component: Home,
});
function Home() {
  const c = useCopy(),
    vt = useVehicleText();
  const [mode, setMode] = useState<"transfer" | "hourly">("transfer"),
    [initial, setInitial] = useState<Partial<BookingSearch>>({}),
    [formKey, setFormKey] = useState(0),
    [tab, setTab] = useState("all");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("service") === "hourly") setMode("hourly");
  }, []);
  const focusBooking = () =>
    document
      .getElementById("booking-interface")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  const prefill = (value: Partial<BookingSearch>) => {
    setInitial(value);
    setFormKey((k) => k + 1);
    focusBooking();
  };
  const chooseDestination = (name: string, type: string, fallback: string) => {
    const airport = AIRPORTS.find((a) => a.label.includes(name)),
      city = CITIES.find((a) => a.label.includes(name));
    prefill(
      type === "airport"
        ? { from: airport?.label || fallback }
        : { from: AIRPORTS[0].label, to: city?.label || name },
    );
  };
  const services = [
    {
      title: c("Across Morocco", "Partout au Maroc"),
      text: c(
        "From the coast to the city. A private ride wherever your journey takes you.",
        "De la côte à la ville. Un trajet privé partout où votre voyage vous mène.",
      ),
      image: INFO_SECTION_PRIMARY_IMAGE_URL,
      href: "/agadir-airport-transfer",
    },
    {
      title: c("Professional drivers", "Chauffeurs professionnels"),
      text: c(
        "Local knowledge, a personal welcome and a comfortable journey.",
        "Une connaissance locale, un accueil personnel et un trajet confortable.",
      ),
      image: INFO_SECTION_SECONDARY_IMAGE_URL,
      href: "/private-driver-agadir",
    },
    {
      title: c("Chauffeur by the hour", "Chauffeur à l'heure"),
      text: c(
        "Your schedule. Your stops. A private driver for business or leisure.",
        "Vos horaires, vos arrêts. Un chauffeur privé pour vos journées.",
      ),
      image: HOMEPAGE_HERO_IMAGE_URL,
      href: "/?service=hourly#booking-interface",
    },
    {
      title: c("City rides", "Trajets entre villes"),
      text: c(
        "Agadir, Marrakech and beyond. Travel from door to door at your pace.",
        "Agadir, Marrakech et au-delà. Voyagez de porte à porte à votre rythme.",
      ),
      image: INFO_SECTION_SECONDARY_IMAGE_URL,
      href: "/agadir-taxi",
    },
  ];
  const destinations = DESTINATIONS.slice(0, 4).filter((d) => tab === "all" || d.type === tab);
  return (
    <div className="ad-site ad-reference-home">
      <a className="ad-skip" href="#main-content">
        {c("Skip to content", "Aller au contenu")}
      </a>
      <div className="ad-hero-wrap">
        <img
          className="ad-hero-image"
          src={HOMEPAGE_HERO_IMAGE_URL}
          srcSet={HOMEPAGE_HERO_SRCSET}
          sizes="100vw"
          width="1280"
          height="856"
          alt=""
          fetchPriority="high"
        />
        <Header
          overlay
          onNavClick={(section) => {
            if (section === "help") {
              document.getElementById("help")?.scrollIntoView({ behavior: "smooth" });
              return;
            }
            setMode(section === "hourly" ? "hourly" : "transfer");
            focusBooking();
          }}
        />
        <main id="main-content" className="ad-shell ad-hero">
          <div className="ad-hero-copy">
            <h1>
              {c("Agadir transfers", "Transferts à Agadir")}
              <br />
              {c("& private transport", "et transport privé")}
            </h1>
            <p>
              {c(
                "Airport pickups, hotel transfers and private drivers. Compare vehicles for Agadir, Taghazout or Tamraght, then confirm with our local team.",
                "Départs aéroport, transferts hôtel et chauffeurs privés. Comparez les véhicules vers Agadir, Taghazout ou Tamraght, puis confirmez avec notre équipe.",
              )}
            </p>
          </div>
          <BookingBar key={formKey} initial={initial} mode={mode} />
          <div className="ad-hero-proof">
            <span>
              {c(
                "Price per vehicle · No payment online · Booking confirmed by our team",
                "Prix par véhicule · Aucun paiement en ligne · Réservation confirmée par notre équipe",
              )}
            </span>
            <a href="#reviews">
              <span className="ad-hero-stars" aria-hidden="true">
                ★★★★★
              </span>
              {c("Stories from our passengers", "Les expériences de nos voyageurs")}
              <ArrowUpRight size={13} />
            </a>
          </div>
        </main>
      </div>
      <section className="ad-section ad-how" aria-labelledby="how-heading">
        <div className="ad-shell">
          <div className="ad-section-heading">
            <div>
              <span className="ad-eyebrow">
                {c("From booking to arrival", "De la réservation à l'arrivée")}
              </span>
              <h2 id="how-heading">{c("How it works", "Comment ça marche")}</h2>
            </div>
            <p>
              {c(
                "A few simple steps. A smoother journey.",
                "Quelques étapes simples. Un voyage serein.",
              )}
            </p>
          </div>
          <JourneySteps />
        </div>
      </section>
      <section className="ad-section ad-services" id="services">
        <div className="ad-shell">
          <h2>{c("Core services", "Nos services")}</h2>
          <div className="ad-service-grid">
            {services.map((s, i) => (
              <a className={"ad-service-card ad-service-card-" + i} key={s.href} href={s.href}>
                <div className="ad-service-photo">
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    width={s.image === HOMEPAGE_HERO_IMAGE_URL ? 1280 : 720}
                    height={s.image === HOMEPAGE_HERO_IMAGE_URL ? 856 : 538}
                  />
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span>
                    {c("Details", "Découvrir")}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-home-fleet">
        <div className="ad-shell">
          <div className="ad-section-heading">
            <h2>
              {c("Maximum comfort for every kind of journey", "Le confort pour tous vos voyages")}
            </h2>
            <p>
              {c(
                "Private vehicles, professional local drivers",
                "Véhicules privés, chauffeurs professionnels locaux",
              )}
            </p>
          </div>
          <div className="ad-home-fleet-grid">
            {VEHICLES.map((v) => (
              <button
                className="ad-fleet-card"
                key={v.id}
                onClick={() => prefill({ vehicleId: v.id })}
              >
                <img src={v.image} alt={vt(v.name)} loading="lazy" width="640" height="426" />
                <h3>{vt(v.name)}</h3>
                <p>{vt(v.carModels)}</p>
                <div>
                  <span>
                    <Users size={14} />
                    {v.passengers}
                  </span>
                  <span>
                    <Briefcase size={14} />
                    {v.luggage}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-home-reviews" id="reviews">
        <div className="ad-shell ad-home-reviews-layout">
          <div className="ad-reviews-intro">
            <h2>{c("Reviews", "Avis voyageurs")}</h2>
            <div className="ad-reviews-summary">
              <strong>
                5<span>/5</span>
              </strong>
              <div className="ad-review-stars" role="img" aria-label="5 / 5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={19} fill="currentColor" />
                ))}
              </div>
              <p>
                {c(
                  "Experiences shared by our passengers.",
                  "Des expériences partagées par nos voyageurs.",
                )}
              </p>
              <small>
                {c(
                  "Based on the 4 testimonials supplied by Agadir Driver.",
                  "Sur les 4 témoignages fournis par Agadir Driver.",
                )}
              </small>
            </div>
          </div>
          <div className="ad-home-review-cards">
            {REVIEWS.slice(0, 3).map((review) => (
              <article key={review.id}>
                <div className="ad-review-stars" role="img" aria-label={review.rating + " / 5"}>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <h3>{review.title}</h3>
                <p>{review.comment}</p>
                <strong>{review.author}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-home-destinations" id="destinations">
        <div className="ad-shell">
          <h2>{c("Destinations", "Destinations")}</h2>
          <p className="ad-section-subtitle">
            {c(
              "Private airport transfers, coastal escapes and city journeys across Morocco.",
              "Transferts aéroport, escapades sur la côte et trajets entre villes au Maroc.",
            )}
          </p>
          <nav
            className="ad-destination-nav"
            aria-label={c("Explore destinations", "Explorer les destinations")}
          >
            {[
              { id: "all", label: c("All Morocco", "Tout le Maroc") },
              { id: "airport", label: c("Airports", "Aéroports") },
              { id: "city", label: c("Cities & coast", "Villes et côte") },
              { id: "ski", label: c("Mountains", "Montagnes") },
            ].map((item) => (
              <button key={item.id} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}>
                {item.label}
                <ArrowRight size={15} />
              </button>
            ))}
          </nav>
          <div className="ad-destination-grid">
            {destinations.slice(0, 4).map((d) => (
              <button
                className="ad-destination-card"
                key={d.id}
                onClick={() => chooseDestination(d.name, d.type, d.airport)}
              >
                <img src={d.image} alt={d.name} loading="lazy" />
                <div>
                  <small>{c("Private transfers in ", "Transferts privés à ") + d.name}</small>
                  <h3>{d.name}</h3>
                  <span>
                    {d.airport}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="ad-destination-links">
            {(tab === "airport"
              ? AIRPORTS
              : tab === "city"
                ? CITIES
                : tab === "ski"
                  ? DESTINATIONS.filter((d) => d.type === "ski").map((d) => ({
                      id: d.id,
                      label: d.name,
                      category: "city",
                    }))
                  : [...CITIES.slice(0, 8), ...AIRPORTS.slice(0, 4)]
            ).map((place) => (
              <button
                key={place.id}
                onClick={() =>
                  prefill(
                    place.category === "airport"
                      ? { from: place.label }
                      : { from: AIRPORTS[0].label, to: place.label },
                  )
                }
              >
                <span>
                  <strong>{place.label.split(" (")[0]}</strong>
                  <small>
                    {place.category === "airport"
                      ? c("Airport transfers", "Transferts aéroport")
                      : c("Private rides in Morocco", "Trajets privés au Maroc")}
                  </small>
                </span>
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="ad-section ad-home-promo">
        <div className="ad-shell ad-mobile-promo">
          <div>
            <h2>{c("Take it easy!", "Voyagez sereinement !")}</h2>
            <p>
              {c(
                "Arrange your ride, share your flight details or ask a question. Our local team is just a message away.",
                "Organisez votre trajet, partagez votre numéro de vol ou posez une question. Notre équipe est à un message de vous.",
              )}
            </p>
            <div className="ad-promo-actions">
              <a className="ad-primary" href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={20} />
                {c("Chat on WhatsApp", "Discuter sur WhatsApp")}
              </a>
              <button className="ad-secondary" onClick={focusBooking}>
                {c("Book online", "Réserver en ligne")}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <img
            src="/assets/agadir88/app-mockup-v2.png"
            width="500"
            height="500"
            loading="lazy"
            alt={c("Agadir Driver on mobile", "Agadir Driver sur mobile")}
          />
        </div>
      </section>
      <BookingFaqs />
      <section className="ad-home-contact">
        <div className="ad-shell">
          <div>
            <h2>{c("Your next journey starts here.", "Votre prochain voyage commence ici.")}</h2>
            <p>
              {c(
                "Airport pickup, a day on the coast or a custom itinerary. Let's plan it together.",
                "Un transfert aéroport, une journée sur la côte ou un itinéraire sur mesure. Préparons-le ensemble.",
              )}
            </p>
          </div>
          <a className="ad-primary" href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
            {c("Plan my journey", "Organiser mon voyage")}
            <ArrowRight size={18} />
          </a>
          <small>
            {c(
              "A real team in Agadir. Tell us your route and we'll confirm the details with you.",
              "Une équipe à Agadir. Indiquez votre trajet et nous confirmerons les détails ensemble.",
            )}
          </small>
        </div>
      </section>
      <Footer />
    </div>
  );
}
