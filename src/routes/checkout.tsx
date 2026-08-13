import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Info,
  Banknote,
} from "lucide-react";
import Header from "../components/Header";
import { VEHICLES } from "../data";

const searchSchema = z.object({
  from: z.string().default("Aéroport Agadir-Al Massira (AGA)"),
  to: z.string().default("Taghazout (Hôtel / Surf Camp)"),
  date: z.string().default("2026-07-19"),
  time: z.string().default("13:45"),
  pax: z.coerce.number().default(2),
  vehicleId: z.string().default("standard"),
  price: z.coerce.number().default(0),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Paiement — Agadir Driver" },
      { name: "description", content: "Finalisez votre réservation en toute sécurité." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const formatDateFr = (iso: string) => {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const genRef = () =>
  "AGD-" +
  Math.random().toString(36).slice(2, 6).toUpperCase() +
  "-" +
  Date.now().toString(36).slice(-4).toUpperCase();

function CheckoutPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { from, to, date, time, pax, vehicleId, price } = search;

  const vehicle = useMemo(
    () => VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0],
    [vehicleId],
  );
  const total = price || vehicle.basePrice;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { ref: string }>(null);
  const [payMethod, setPayMethod] = useState<"online" | "pickup">("pickup");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "cardNumber") {
      v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    } else if (k === "cvc") {
      v = v.replace(/\D/g, "").slice(0, 4);
    }
    setForm((s) => ({ ...s, [k]: v }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Nom complet requis";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email invalide";
    if (form.phone.replace(/\D/g, "").length < 8) e.phone = "Téléphone invalide";
    if (payMethod === "online") {
      if (form.cardNumber.replace(/\s/g, "").length < 15) e.cardNumber = "Numéro de carte invalide";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/AA";
      if (form.cvc.length < 3) e.cvc = "CVC";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, payMethod === "online" ? 1200 : 600));
    setSubmitting(false);
    setConfirmed({ ref: genRef() });
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#eafaf0] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={40} className="text-[#00A65A]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Réservation confirmée ✅</h1>
              <p className="text-gray-600 mt-2">
                Merci ! Votre réservation a bien été enregistrée.
              </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-700">
                  {payMethod === "online" ? (
                    <><CreditCard size={13} /> Payé en ligne</>
                  ) : (
                    <><Banknote size={13} /> Paiement à la prise en charge</>
                  )}
                </div>
              <div className="mt-6 inline-block bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                  Référence de réservation
                </div>
                <div className="text-lg font-mono font-bold text-gray-900 mt-1">
                  {confirmed.ref}
                </div>
              </div>
                <p className="text-sm text-gray-600 mt-6">
                  Une lettre de confirmation a été envoyée à{" "}
                  <span className="font-semibold text-gray-900">{form.email}</span>.
                  {payMethod === "pickup" && (
                    <> Vous réglerez <b>EUR {total.toFixed(2)}</b> directement au chauffeur (espèces ou carte).</>
                  )}
                </p>
              <div className="mt-8 flex justify-center gap-3">
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded bg-black hover:bg-gray-900 text-white text-sm font-semibold"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate({ to: "/reservation", search: { from, to, date, time, pax } })}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <ArrowLeft size={14} /> Retour à la réservation
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FORM */}
            <form onSubmit={submit} className="lg:col-span-2 space-y-4">
              {/* Payment method selector */}
              <section className="bg-white rounded-lg border border-gray-100 p-5">
                <h2 className="font-semibold text-[15px] text-gray-900 mb-3">
                  Mode de paiement
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayMethod("online")}
                    className={`text-left rounded-lg border p-4 transition-colors cursor-pointer ${
                      payMethod === "online"
                        ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                      <CreditCard size={16} /> Payer sur le site
                    </div>
                    <p className="text-[12px] text-gray-600 mt-1">
                      Paiement sécurisé par carte bancaire maintenant.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("pickup")}
                    className={`text-left rounded-lg border p-4 transition-colors cursor-pointer ${
                      payMethod === "pickup"
                        ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                      <Banknote size={16} /> Payer à la prise en charge
                    </div>
                    <p className="text-[12px] text-gray-600 mt-1">
                      Réglez le chauffeur en espèces ou par carte à l'arrivée.
                    </p>
                  </button>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-white rounded-lg border border-gray-100 p-5">
                <h2 className="font-semibold text-[15px] text-gray-900 mb-4">
                  Coordonnées du passager
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet"
                    value={form.fullName}
                    onChange={set("fullName")}
                    error={errors.fullName}
                    placeholder="Prénom Nom"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    placeholder="support@agadirdriver.com"
                  />
                  <Field
                    label="Téléphone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                    placeholder="+212 6 12 34 56 78"
                  />
                </div>
                <p className="text-[12px] text-gray-500 mt-3 flex items-center gap-1.5">
                  <Info size={12} /> Votre téléphone est utilisé pour la coordination avec le chauffeur.
                </p>
              </section>

              {/* Payment */}
              {payMethod === "online" ? (
              <section className="bg-white rounded-lg border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-[15px] text-gray-900 flex items-center gap-2">
                    <CreditCard size={16} /> Paiement
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Lock size={12} /> Paiement sécurisé
                  </div>
                </div>

                <div className="space-y-4">
                  <Field
                    label="Numéro de carte"
                    value={form.cardNumber}
                    onChange={set("cardNumber")}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Expiration"
                      value={form.expiry}
                      onChange={set("expiry")}
                      error={errors.expiry}
                      placeholder="MM/AA"
                      inputMode="numeric"
                    />
                    <Field
                      label="CVC"
                      value={form.cvc}
                      onChange={set("cvc")}
                      error={errors.cvc}
                      placeholder="123"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {/* Stripe setup notice */}
                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-md p-3 text-[12px] text-amber-900">
                  <div className="font-semibold mb-1">⚠️ Stripe pas encore connecté</div>
                  <p className="leading-relaxed">
                    Ce formulaire est fonctionnel côté UI mais ne débite pas encore de vraie carte. Pour activer les paiements réels :
                  </p>
                  <ol className="list-decimal ml-5 mt-2 space-y-1">
                    <li>Créez un compte sur <code className="bg-white px-1 rounded">stripe.com</code>.</li>
                    <li>
                      Récupérez votre <b>Publishable key</b> (<code>pk_…</code>) et votre <b>Secret key</b> (<code>sk_…</code>).
                    </li>
                    <li>
                      Ajoutez <code className="bg-white px-1 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code> côté client et <code className="bg-white px-1 rounded">STRIPE_SECRET_KEY</code> côté serveur (jamais dans le code frontend).
                    </li>
                    <li>
                      Le débit réel doit être effectué depuis une fonction serveur (Stripe Checkout ou Payment Intents) — la clé secrète ne doit jamais être exposée au navigateur.
                    </li>
                  </ol>
                </div>
              </section>
              ) : (
                <section className="bg-white rounded-lg border border-gray-100 p-5">
                  <h2 className="font-semibold text-[15px] text-gray-900 flex items-center gap-2 mb-3">
                    <Banknote size={16} /> Paiement à la prise en charge
                  </h2>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    Aucune carte requise. Votre réservation sera confirmée immédiatement et vous réglerez le montant total de{" "}
                    <b className="text-gray-900">EUR {total.toFixed(2)}</b> directement au chauffeur (espèces ou carte) au moment de la prise en charge.
                  </p>
                  <div className="mt-4 bg-[#eafaf0] border border-[#bfe8cf] rounded-md p-3 text-[12px] text-[#0a6b3a] flex items-start gap-2">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                    <span>Annulation gratuite jusqu'à 24h avant le trajet — sans frais ni caution.</span>
                  </div>
                </section>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-gray-900 disabled:opacity-60 text-white font-semibold py-3.5 rounded transition-colors cursor-pointer"
              >
                {submitting
                  ? "Traitement…"
                  : payMethod === "online"
                  ? `Payer maintenant · EUR ${total.toFixed(2)}`
                  : `Confirmer la réservation · EUR ${total.toFixed(2)}`}
              </button>

              <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} className="text-[#00A65A]" />
                Annulation gratuite jusqu'à 24h avant le trajet
              </p>
            </form>

            {/* SUMMARY */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                <h2 className="font-semibold text-[15px] text-gray-900">Récapitulatif</h2>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-20 h-14 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">{vehicle.name}</div>
                    <div className="text-[11px] text-gray-500 truncate">{vehicle.carModels}</div>
                  </div>
                </div>

                <div className="space-y-3 text-[13px]">
                  <Row icon={<MapPin size={14} />} label="Départ" value={from} />
                  <Row icon={<MapPin size={14} className="text-[#f0a500]" />} label="Arrivée" value={to} />
                  <Row icon={<Calendar size={14} />} label="Date" value={formatDateFr(date)} />
                  <Row icon={<Clock size={14} />} label="Heure" value={time} />
                  <Row icon={<Users size={14} />} label="Passagers" value={String(pax)} />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-700">Total</span>
                  <span className="text-lg font-bold text-gray-900">EUR {total.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-gray-500">TVA, taxes et péages inclus.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  error,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[12px] font-semibold text-gray-700 mb-1">{label}</span>
      <input
        {...rest}
        className={`w-full px-3 py-2.5 text-sm rounded border ${
          error ? "border-red-400" : "border-gray-200"
        } focus:outline-none focus:border-gray-900 bg-white`}
      />
      {error && <span className="block text-[11px] text-red-500 mt-1">{error}</span>}
    </label>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-gray-500 uppercase tracking-wide">{label}</div>
        <div className="text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}
