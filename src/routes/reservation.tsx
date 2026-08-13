import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Users,
  Briefcase,
  Pencil,
  Plus,
  ArrowLeftRight,
  Check,
  ShieldCheck,
  MapPin,
  Star,
  HelpCircle,
} from "lucide-react";
import { z } from "zod";
import Header from "../components/Header";
import RouteMap from "../components/RouteMap";
import { VEHICLES } from "../data";
import { calculateRoutePrice } from "../lib/pricing";

const searchSchema = z.object({
  from: z.string().optional().default("Aéroport Agadir-Al Massira (AGA)"),
  to: z.string().optional().default("Taghazout (Hôtel / Surf Camp)"),
  date: z.string().optional().default("2026-07-19"),
  time: z.string().optional().default("13:45"),
  pax: z.coerce.number().optional().default(2),
});

export const Route = createFileRoute("/reservation")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Votre réservation — Agadir Driver" },
      { name: "description", content: "Choisissez votre véhicule et confirmez votre transfert." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReservationPage,
});

// Format helpers
const shortCity = (s: string) => {
  if (/agadir/i.test(s)) return "Agadir, Maroc";
  if (/marrakech/i.test(s)) return "Marrakech, Maroc";
  if (/casablanca/i.test(s)) return "Casablanca, Maroc";
  if (/essaouira/i.test(s)) return "Essaouira, Maroc";
  if (/taghazout/i.test(s)) return "Taghazout, Maroc";
  if (/taroudant/i.test(s)) return "Taroudant, Maroc";
  return "Maroc";
};

const addHours = (time: string, hoursDecimal: number) => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + Math.round(hoursDecimal * 60);
  const nh = Math.floor((total / 60) % 24);
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
};

const formatDateFr = (iso: string) => {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
};

const minusHours = (dateIso: string, time: string, hoursBefore: number) => {
  try {
    const d = new Date(`${dateIso}T${time}:00`);
    d.setHours(d.getHours() - hoursBefore);
    const day = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${hh}:${mm}`;
  } catch {
    return "";
  }
};

function ReservationPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { from, to, date, time, pax } = search;

  const durationHours = 1.516;
  const arrivalTime = useMemo(() => addHours(time, durationHours), [time]);
  const estimatedPricing = useMemo(() => {
    return calculateRoutePrice({
      from,
      to,
      vehicle: VEHICLES[0],
      bookingType: "transfer",
    });
  }, [from, to]);

  const vehiclesWithPricing = useMemo(() => {
    return VEHICLES.map((v) => {
      const pricing = calculateRoutePrice({
        from,
        to,
        vehicle: v,
        bookingType: "transfer",
      });
      const original = Math.round((pricing.eur * 1.1) * 100) / 100;
      return {
        vehicle: v,
        original,
        price: pricing.eur,
        popular: v.id === "standard",
        premium: v.id === "first" || v.id === "van-first",
      };
    });
  }, [from, to]);

  const [selectedId, setSelectedId] = useState<string>(vehiclesWithPricing[0].vehicle.id);
  const selected = vehiclesWithPricing.find((x) => x.vehicle.id === selectedId)!;

  const fromCity = shortCity(from);
  const toCity = shortCity(to);
  const cancellationDeadline = minusHours(date, time, 24);

  const goToCheckout = (vehicleId: string) => {
    const chosen = vehiclesWithPricing.find((v) => v.vehicle.id === vehicleId) ?? selected;
    navigate({
      to: "/checkout",
      search: {
        from,
        to,
        date,
        time,
        pax,
        vehicleId: chosen.vehicle.id,
        price: chosen.price,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header />

      <main className="flex-1 bg-[#f7f7f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-4">
              {/* Map */}
              <div className="relative">
                <RouteMap from={from} to={to} pickupTime={time} dropoffTime={arrivalTime} />

                {/* Thin bar under map */}
                <div className="mt-3 flex justify-center">
                  <p className="text-[13px] text-gray-700">
                    <Check className="inline w-3.5 h-3.5 mr-1 text-gray-700" strokeWidth={3} />
                    <span className="italic">Tous les prix incluent TVA, taxes et péages</span>
                  </p>
                </div>

              </div>

              {/* Currency chip — mobile only */}
              <div className="flex items-center gap-2 lg:hidden">
                <button className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-900 text-[13px] font-semibold px-3 py-1.5 rounded">
                  EUR
                </button>
                <span className="w-6 h-6 rounded-full border border-gray-200" aria-hidden="true" />
              </div>

              {/* Aller-retour section — desktop only (mobile version lives in sticky bottom / sidebar) */}
              <div className="hidden lg:flex bg-white rounded-lg border border-gray-100 p-4 items-center gap-4">
                <ArrowLeftRight className="w-5 h-5 text-gray-700 shrink-0" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] text-gray-900">
                    Aller-retour ? Voyagez plus futé.
                  </div>
                  <div className="text-[13px] text-gray-500 mt-0.5">
                    Ajoutez le retour maintenant pour gagner du temps et économiser de l'argent.
                  </div>
                </div>
                <button
                  aria-label="Ajouter un retour"
                  className="shrink-0 w-9 h-9 rounded border-2 border-[#f0a500] text-[#f0a500] hover:bg-[#fff7e6] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Vehicle cards list */}
              <div className="space-y-3">
                {vehiclesWithPricing.map(({ vehicle, original, price, popular, premium }) => {
                  const active = vehicle.id === selectedId;
                  return (
                    <button
                      type="button"
                      key={vehicle.id}
                      onClick={() => setSelectedId(vehicle.id)}
                      className={`w-full text-left bg-white rounded-lg border transition-all p-4 sm:p-5 flex items-center gap-4 sm:gap-6 cursor-pointer ${
                        active
                          ? "border-black shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-black"
                          : "border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {/* Vehicle image */}
                      <div className="w-28 sm:w-40 shrink-0">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-20 sm:h-24 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Middle info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-[15px] sm:text-[16px] text-gray-900">
                            {vehicle.name}
                          </h3>
                          {popular && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#ffe4ec] text-[#e91e63] px-2 py-0.5 rounded">
                              Le plus populaire
                            </span>
                          )}
                          {premium && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-[#fff3d6] text-[#b7791f] px-2 py-0.5 rounded">
                              <Star size={10} className="fill-[#b7791f] text-[#b7791f]" />
                              Haut de gamme
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-700">
                          <span className="flex items-center gap-1.5">
                            <Users size={14} className="text-gray-500" />
                            Jusqu'à {vehicle.passengers}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-gray-500" />
                            {vehicle.luggage}
                          </span>
                          <span
                            title="Nombre indicatif : bagages cabine + valise standard"
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <HelpCircle size={13} />
                          </span>
                        </div>

                        <p className="mt-2 text-[12px] text-gray-500 line-clamp-1">
                          {vehicle.carModels} ou similaire.
                        </p>
                      </div>

                      {/* Price block */}
                      <div className="text-right shrink-0">
                        <div className="text-[13px] text-gray-400 line-through">
                          EUR {original.toFixed(2)}
                        </div>
                        <div className="text-[18px] sm:text-[20px] font-bold text-[#e11d29] mt-0.5">
                          EUR {price.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">Prix total</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDEBAR — desktop only */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="lg:sticky lg:top-24 bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                <h2 className="font-semibold text-[15px] text-gray-900">Votre réservation</h2>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-[#f0f4ff] text-[#3355ff] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                    Aller simple
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 font-medium">
                    <Users size={13} /> {pax} Passagers
                  </span>
                </div>

                <div className="flex items-center justify-between text-[13px] border-b border-gray-100 pb-3">
                  <span className="text-gray-700">Aller · {formatDateFr(date)}</span>
                  <button className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 cursor-pointer">
                    <Pencil size={12} /> Edit
                  </button>
                </div>

                {/* Route block */}
                <div className="relative pl-5">
                  {/* vertical dotted line */}
                  <div
                    className="absolute left-[6px] top-2 bottom-2 border-l-2 border-dotted border-gray-300"
                    aria-hidden="true"
                  />
                  {/* pickup */}
                  <div className="relative">
                    <span className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-black" />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-gray-900 truncate">
                          {from}
                        </div>
                        <div className="text-[12px] text-gray-500">{fromCity}</div>
                      </div>
                      <div className="text-[13px] font-bold text-gray-900">{time}</div>
                    </div>
                  </div>

                  {/* duration */}
                  <div className="my-2 text-[12px] text-gray-400 flex items-center gap-2 pl-0">
                    <span>~1h 31min</span>
                    <span>·</span>
                    <span>~{estimatedPricing.distanceKm} km</span>
                  </div>

                  {/* dropoff */}
                  <div className="relative">
                    <span className="absolute -left-[20px] top-1 w-3.5 h-3.5 text-gray-800">
                      <MapPin size={14} strokeWidth={2.5} />
                    </span>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-gray-900 truncate">{to}</div>
                        <div className="text-[12px] text-gray-500">{toCity}</div>
                      </div>
                      <div className="text-[13px] font-bold text-gray-900">{arrivalTime}</div>
                    </div>
                  </div>
                </div>

                {/* Add return */}
                <button className="w-full py-2.5 rounded border border-gray-300 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer">
                  <ArrowLeftRight size={14} />
                  Ajouter un retour
                </button>

                {/* Price details */}
                <div className="pt-2">
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Détails du prix</h3>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-gray-700">Total</span>
                    <span className="font-bold text-gray-900">
                      EUR {selected.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Included features grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-1">
                  {[
                    "Annulation gratuite",
                    "Service porte-à-porte",
                    "Meet & Greet",
                    "Suivi de vol",
                    "Chauffeurs agréés",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-1.5 text-[12px] text-gray-700"
                    >
                      <Check size={12} className="text-[#00B67A]" strokeWidth={3} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Payment icons */}
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                  {["VISA", "MC", "AMEX", "JCB", "PP", "AP", "GP"].map((p) => (
                    <PayBadge key={p} kind={p} />
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Green cancellation box (full width below both columns) */}
          <div className="mt-6 bg-[#eafaf0] border border-[#c9edd5] rounded-lg p-4 lg:col-span-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#c9edd5]">
                <ShieldCheck size={16} className="text-[#00A65A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[14px] text-gray-900">
                    Annulation gratuite 24H
                  </h4>
                  <span className="text-[10px] font-bold bg-white border border-[#c9edd5] text-[#00A65A] px-1.5 py-0.5 rounded">
                    24H
                  </span>
                </div>
                <p className="text-[13px] text-gray-700 mt-1 leading-relaxed">
                  Réservez aujourd'hui, verrouillez le prix. Vous pouvez annuler gratuitement
                  jusqu'au{" "}
                  <span className="font-semibold text-gray-900">{cancellationDeadline}</span> et
                  recevoir un remboursement complet.
                </p>
              </div>
            </div>
          </div>

          {/* Trustpilot strip */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[13px]">
            <span className="font-bold tracking-wide text-gray-900">EXCELLENT</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className="w-4 h-4 bg-[#00B67A] flex items-center justify-center text-white text-[10px] rounded-sm font-bold"
                >
                  ★
                </div>
              ))}
            </div>
            <span className="font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-500 underline underline-offset-2">38 036</span>
            <span className="text-gray-500">avis sur</span>
            <span className="inline-flex items-center gap-1 text-gray-900 font-semibold">
              <span className="text-[#00B67A]">★</span>Trustpilot
            </span>
          </div>
        </div>
      </main>

      {/* Thin footer */}
      <footer className="bg-white border-t border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-[11px] text-gray-400">
          © 2026 AGADIR DRIVER™ | Tous droits réservés · Chauffeur privé & transferts premium au
          Maroc
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[12px] text-gray-500">Total</span>
              <span className="text-[17px] font-bold text-gray-900">
                EUR {selected.price.toFixed(2)}
              </span>
            </div>
            <button className="inline-flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-900 cursor-pointer">
              <HelpCircle size={13} /> Prix et itinéraire
            </button>
          </div>
          <button
            onClick={() => goToCheckout(selected.vehicle.id)}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold text-[15px] py-3.5 rounded-lg cursor-pointer transition-colors"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}





// Minimal payment badge blocks
function PayBadge({ kind }: { kind: string }) {
  const label: Record<string, string> = {
    VISA: "VISA",
    MC: "MC",
    AMEX: "AMEX",
    JCB: "JCB",
    PP: "PayPal",
    AP: "Pay",
    GP: "GPay",
  };
  const cls =
    kind === "AP" || kind === "GP"
      ? "bg-white border border-gray-200 text-gray-800"
      : "bg-white border border-gray-200 text-gray-700";
  return (
    <div
      className={`h-6 min-w-[36px] px-1.5 rounded flex items-center justify-center text-[10px] font-bold tracking-wide ${cls}`}
    >
      {label[kind]}
    </div>
  );
}
