import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";
import { AGADIR_DRIVER_LOGO_URL } from "../lib/brand-images";
import { BUSINESS } from "../data/seo";
import { useCopy } from "../lib/copy";
export default function Footer() {
  const c = useCopy();
  const groups = [
    {
      title: c("Popular routes", "Trajets populaires"),
      links: [
        [c("Agadir airport transfer", "Transfert aéroport Agadir"), "/agadir-airport-transfer"],
        [c("Airport to Taghazout", "Aéroport vers Taghazout"), "/airport-transfer-taghazout"],
        [c("Airport to Tamraght", "Aéroport vers Tamraght"), "/airport-transfer-tamraght"],
        [c("Agadir airport taxi", "Taxi aéroport Agadir"), "/agadir-airport-taxi"],
      ],
    },
    {
      title: c("Our services", "Nos services"),
      links: [
        [c("Private driver", "Chauffeur privé"), "/private-driver-agadir"],
        [c("City rides", "Trajets en ville"), "/agadir-taxi"],
        [c("Chauffeur by the hour", "Chauffeur à l'heure"), "/?service=hourly#booking-interface"],
        [c("Travel journal", "Carnet de voyage"), "/blog"],
      ],
    },
    {
      title: c("Let's talk", "Contactez-nous"),
      links: [
        [c("Help & frequently asked questions", "Aide et questions fréquentes"), "/#help"],
        [
          c("Business & group travel", "Entreprises et groupes"),
          BUSINESS.whatsapp +
            "?text=" +
            encodeURIComponent("Hello, I would like to arrange business or group travel."),
        ],
        [
          c("Become a driver partner", "Devenir chauffeur partenaire"),
          "mailto:support@agadirdriver.com?subject=Driver%20partnership",
        ],
        [
          c("Travel agency enquiries", "Demandes des agences de voyages"),
          "mailto:support@agadirdriver.com?subject=Travel%20agency%20partnership",
        ],
      ],
    },
  ];
  return (
    <footer className="ad-footer" id="footer-anchor">
      <div className="ad-shell">
        <div className="ad-footer-grid">
          <div>
            <a href="/">
              <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" width="235" height="60" />
            </a>
            <p>
              {c(
                "Your local connection to Morocco. Private airport transfers, city rides and journeys made personal.",
                "Votre partenaire local au Maroc. Transferts aéroport, trajets entre villes et voyages sur mesure.",
              )}
            </p>
            <a href={BUSINESS.phoneHref}>
              <Phone size={15} />
              {BUSINESS.phone}
            </a>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a href="mailto:support@agadirdriver.com">
              <Mail size={15} />
              support@agadirdriver.com
            </a>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>
                      {label}
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ad-footer-bottom">
          <span>
            © {new Date().getFullYear()} Agadir Driver.{" "}
            {c("All rights reserved.", "Tous droits réservés.")}
          </span>
          <span>{BUSINESS.address}</span>
          <a href={BUSINESS.phoneHref}>
            {c("A local team. A personal welcome.", "Une équipe locale. Un accueil personnalisé.")}
          </a>
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
