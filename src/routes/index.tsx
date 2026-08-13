import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Star, Clock } from "lucide-react";
import heroDesktop from "../assets/hero-desktop-v2.jpg.asset.json";
import heroMobile from "../assets/hero-mobile-v2.jpg.asset.json";
import Header from "../components/Header";
import BookingWidget from "../components/BookingWidget";
import BookingBar from "../components/BookingBar";
import AppPromo from "../components/AppPromo";
import FeaturesGrid from "../components/FeaturesGrid";
import InfoSection from "../components/InfoSection";
import VehicleCarousel from "../components/VehicleCarousel";
import ReviewGrid from "../components/ReviewGrid";
import DestinationsSection from "../components/DestinationsSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import type { VehicleClass } from "../types";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agadir Driver — Chauffeur privé & transferts premium à Agadir" },
      {
        name: "description",
        content:
          "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      { property: "og:title", content: "Agadir Driver — Chauffeur privé & transferts premium à Agadir" },
      {
        property: "og:description",
        content: "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const [toLocation, setToLocation] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [bookingKey, setBookingKey] = useState(0);

  const handleSelectDestination = (destinationName: string) => {
    setToLocation(destinationName);
    setVehicleId("");
    setBookingKey((prev) => prev + 1);
  };

  const handleSelectVehicle = (vehicle: VehicleClass) => {
    setToLocation("Taghazout (Hôtel / Surf Camp)");
    setVehicleId(vehicle.id);
    setBookingKey((prev) => prev + 1);
  };

  const handleNavScroll = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    let targetElement: HTMLElement | null = null;
    if (sectionId === "airport" || sectionId === "intercity" || sectionId === "hourly") {
      targetElement =
        (window.innerWidth >= 1024 ? document.getElementById("booking-bar") : null) ??
        document.getElementById("booking-interface");
    } else if (sectionId === "help" || sectionId === "business") {
      targetElement = document.getElementById("footer-anchor");
    }
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-surface">
      <Header onNavClick={handleNavScroll} />

      <main className="flex-1">
        {/* Hero — full-bleed photography, dark gradient overlay, floating booking card */}
        <section className="relative isolate overflow-hidden bg-ink">
          {/* Desktop: full-bleed background on the right */}
          <picture className="absolute inset-0 hidden lg:block">
            <img
              src={heroDesktop.url}
              alt="Passagère élégante à l'arrière d'une berline avec chauffeur privé"
              className="h-full w-full object-cover object-[70%_22%]"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-linear-to-b from-ink/75 via-ink/45 to-ink/85 lg:block"
          />

          {/* Mobile: smaller top banner so the model's face shows above the form */}
          <div className="relative h-[52vh] min-h-[360px] w-full lg:hidden">
            <img
              src={heroMobile.url}
              alt="Passagère élégante à l'arrière d'une berline avec chauffeur privé"
              className="h-full w-full object-cover object-[68%_12%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-ink/20 via-ink/5 to-ink"
            />
            <div className="shell absolute bottom-0 left-0 right-0 pb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t("hero.badge")}
              </span>
              <h1 className="mt-3 text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-white sm:text-5xl sm:leading-[1]">
                {t("hero.title1")}
                <br />
                <span className="text-accent">{t("hero.title2")}</span> {t("hero.title3")}
              </h1>
              <p className="mt-3 max-w-[520px] text-[14px] leading-relaxed text-white/70 sm:text-base">
                {t("hero.subMobile")}
              </p>
            </div>
          </div>

          {/* Mobile / tablet: stacked card */}
          <div className="shell relative py-8 sm:py-12 lg:hidden">
            <BookingWidget
              key={bookingKey}
              initialToLocation={toLocation}
              initialVehicleId={vehicleId}
            />
            <p className="mt-5 flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-white/60">
              <span>{t("hero.fixedPrice")}</span>
              <span className="text-accent">·</span>
              <span>{t("hero.freeCancel")}</span>
              <span className="text-accent">·</span>
              <span>4.9/5</span>
            </p>
          </div>

          {/* Desktop: centered headline over a full-width booking bar */}
          <div className="shell relative hidden lg:block lg:pt-24 lg:pb-14">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t("hero.badge")}
              </span>
              <h1 className="mt-6 text-[3.5rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-white">
                {t("hero.title1")}
                <br />
                <span className="text-accent">{t("hero.title2")}</span> {t("hero.title3")}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                {t("hero.subDesktop")}
              </p>
            </div>

            <div className="mt-10">
              <BookingBar />
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-[13px] font-medium text-white/65">
              {[
                { icon: Star, value: "4.9/5", label: t("hero.reviews") },
                { icon: ShieldCheck, value: t("hero.insured"), label: t("hero.fleet") },
                { icon: Clock, value: "24/7", label: t("hero.support") },
              ].map(({ icon: Icon, value, label }) => (
                <span key={value} className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} className="text-accent" />
                  <span className="text-white">{value}</span>
                  <span className="text-white/50">{label}</span>
                </span>
              ))}
            </div>
          </div>
        </section>


        <AppPromo />
        <FeaturesGrid />
        <InfoSection />
        <VehicleCarousel onSelectVehicle={handleSelectVehicle} />
        <ReviewGrid />
        <DestinationsSection onSelectDestination={handleSelectDestination} />
        <NewsletterSection />
      </main>

      <div id="footer-anchor">
        <Footer />
      </div>
    </div>
  );
}
