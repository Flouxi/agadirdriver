import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";
import { AGADIR_DRIVER_LOGO_URL } from "../lib/brand-images";
import { BUSINESS } from "../data/seo";
import { AIRPORTS } from "../data/locations";
import { useCopy } from "../lib/copy";
import { useI18n } from "../lib/i18n";
import { useRouterState } from "@tanstack/react-router";
import { localizedHref, localizedPath } from "../lib/localized-paths";
export default function Footer() {
  const c = useCopy();
  const { lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const services = [
    [c("Airport transfers", "Transferts aéroport"), "/agadir-airport-transfer"],
    [c("City rides", "Trajets entre villes"), "/agadir-taxi"],
    [c("Chauffeur by the hour", "Chauffeur à l'heure"), "/private-driver-agadir"],
    [c("Private driver", "Chauffeur privé"), "/private-driver-agadir"],
    [c("Airport to Taghazout", "Aéroport vers Taghazout"), "/airport-transfer-taghazout"],
    [c("Airport to Tamraght", "Aéroport vers Tamraght"), "/airport-transfer-tamraght"],
    [
      c("For travel agencies", "Pour les agences de voyages"),
      "mailto:support@agadirdriver.com?subject=Travel%20agency%20enquiry",
    ],
    [
      c("Business travel", "Voyages professionnels"),
      BUSINESS.whatsapp +
        "?text=" +
        encodeURIComponent("Hello, I would like to arrange business travel."),
    ],
    [
      c("Become a driver partner", "Devenir chauffeur partenaire"),
      "mailto:support@agadirdriver.com?subject=Driver%20partnership",
    ],
  ];
  return (
    <footer className="ad-footer ad-reference-footer" id="footer-anchor">
      <div className="ad-shell">
        <div className="ad-footer-grid">
          <div className="ad-footer-brand">
            <a href="/">
              <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" width="218" height="56" />
            </a>
            <p>{c("Your local connection to Morocco.", "Votre partenaire local au Maroc.")}</p>
            <label className="ad-footer-language">
              {c("Change language", "Changer de langue")}
              <select
                value={lang}
                onChange={(e) => {
                  const next = e.target.value as "EN" | "FR";
                  setLang(next);
                  const target = localizedPath(pathname, next);
                  if (target && target !== pathname)
                    window.location.assign(target + window.location.search + window.location.hash);
                }}
              >
                <option value="EN">ENGLISH</option>
                <option value="FR">FRANÇAIS</option>
              </select>
            </label>
            {localizedPath(pathname, lang === "FR" ? "EN" : "FR") && (
              <a
                href={localizedPath(pathname, lang === "FR" ? "EN" : "FR")}
                hrefLang={lang === "FR" ? "en" : "fr"}
              >
                {lang === "FR" ? "Read this page in English" : "Lire cette page en français"}
              </a>
            )}
            <p>
              {c("Private rides. A personal welcome.", "Trajets privés. Un accueil personnel.")}
            </p>
          </div>
          <div>
            <h3>{c("Local support", "Assistance locale")}</h3>
            <small>{c("MOROCCO", "MAROC")}</small>
            <a href={BUSINESS.phoneHref}>
              <Phone size={13} />
              {BUSINESS.phone}
            </a>
            <small>WhatsApp</small>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={13} />
              {c("Chat with our team", "Discuter avec notre équipe")}
            </a>
            <small>{c("General enquiries", "Demandes générales")}</small>
            <a href="mailto:support@agadirdriver.com">
              <Mail size={13} />
              support@agadirdriver.com
            </a>
            <p>{BUSINESS.address}</p>
          </div>
          <div>
            <h3>{c("Top airports", "Aéroports populaires")}</h3>
            <ul>
              {AIRPORTS.slice(0, 7).map((a) => (
                <li key={a.id}>
                  <a
                    href={
                      a.id === "aga"
                        ? localizedHref("/agadir-airport-transfer", lang === "FR" ? "FR" : "EN")
                        : "/reservation?from=" + encodeURIComponent(a.label)
                    }
                  >
                    {a.label}
                    <ArrowUpRight size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{c("Agadir Driver services", "Services Agadir Driver")}</h3>
            <ul>
              {services.map(([label, href]) => (
                <li key={label}>
                  <a href={localizedHref(href, lang === "FR" ? "FR" : "EN")}>
                    {label}
                    <ArrowUpRight size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id="footer-help">
            <h3>{c("Good to know", "À savoir")}</h3>
            <a href={lang === "FR" ? "/fr/guides/agadir-taghazout" : "/blog"}>
              {c("Travel journal", "Guide Agadir–Taghazout")}
              <ArrowUpRight size={11} />
            </a>
            {[
              [
                c("Booking confirmation", "Confirmation du trajet"),
                c(
                  "Send your request on WhatsApp. Our team confirms the price, availability and pickup details before your booking is confirmed.",
                  "Envoyez votre demande sur WhatsApp. Notre équipe confirme le prix, la disponibilité et le départ avant de confirmer la réservation.",
                ),
              ],
              [
                c("Flight delays", "Retards de vol"),
                c(
                  "Include your flight number. Airport pickups include flight monitoring and up to 60 minutes of waiting for international flights, 45 minutes for domestic flights.",
                  "Indiquez votre numéro de vol. Suivi du vol et jusqu'à 60 minutes d'attente pour les vols internationaux, 45 minutes pour les vols intérieurs.",
                ),
              ],
              [
                c("Returns & groups", "Retours et groupes"),
                c(
                  "Add your return in the booking form. Vehicles fit groups of up to 17. Please confirm child seats, surfboards and oversized luggage with our team.",
                  "Ajoutez le retour au formulaire. Véhicules pour des groupes jusqu'à 17 personnes. Confirmez les sièges enfants, planches de surf et bagages spéciaux avec notre équipe.",
                ),
              ],
            ].map(([title, text]) => (
              <details key={title}>
                <summary>{title}</summary>
                <p>{text}</p>
              </details>
            ))}
            <a href="mailto:support@agadirdriver.com">
              {c("Contact us", "Contactez-nous")}
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
        <div className="ad-footer-assurances">
          <span>
            {c(
              "Private vehicles · Local expertise · Morocco",
              "Véhicules privés · Expertise locale · Maroc",
            )}
          </span>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
        <div className="ad-footer-bottom">
          <span>
            © {new Date().getFullYear()} Agadir Driver.{" "}
            {c("All rights reserved.", "Tous droits réservés.")}
          </span>
          <span>{BUSINESS.address}</span>
          <a href="/photo-credits.html">{c("Photo credits", "Crédits photos")}</a>
        </div>
      </div>
      <a
        className="ad-floating-help"
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={c("Contact Agadir Driver on WhatsApp", "Contacter Agadir Driver sur WhatsApp")}
      >
        <MessageCircle size={22} />
      </a>
    </footer>
  );
}
