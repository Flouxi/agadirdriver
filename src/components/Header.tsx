import { useState } from "react";
import { Globe, Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { AGADIR_DRIVER_LOGO_URL } from "../lib/brand-images";
import { useI18n } from "../lib/i18n";
import { useCopy } from "../lib/copy";
import { BUSINESS } from "../data/seo";

interface Props {
  onNavClick?: (section: string) => void;
  overlay?: boolean;
}
export default function Header({ onNavClick, overlay = false }: Props) {
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState(false);
  const { lang, setLang } = useI18n();
  const c = useCopy();
  const items = [
    {
      id: "airport",
      label: c("Airport ride", "Transfert aéroport"),
      href: "/agadir-airport-transfer",
    },
    { id: "intercity", label: c("City rides", "Entre villes"), href: "/agadir-taxi" },
    {
      id: "hourly",
      label: c("By the hour", "À l'heure"),
      href: "/?service=hourly#booking-interface",
    },
    { id: "help", label: c("Help", "Aide"), href: "/#help" },
    {
      id: "business",
      label: c("Business", "Entreprises"),
      href:
        BUSINESS.whatsapp +
        "?text=" +
        encodeURIComponent(
          c(
            "Hello, I would like to arrange business transfers.",
            "Bonjour, je souhaite organiser des transferts professionnels.",
          ),
        ),
    },
  ];
  return (
    <header className={"ad-header " + (overlay ? "ad-header-overlay" : "")}>
      <div className="ad-shell ad-header-inner">
        <a href="/" aria-label="Agadir Driver">
          <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" width="235" height="60" />
        </a>
        <nav
          aria-label={c("Main navigation", "Navigation principale")}
          className={open ? "ad-nav ad-nav-open" : "ad-nav"}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(event) => {
                if (onNavClick && item.id !== "business") {
                  event.preventDefault();
                  onNavClick(item.id);
                }
                setOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ad-header-actions">
          <div className="ad-language">
            <button
              type="button"
              aria-expanded={languages}
              aria-label={c("Choose language", "Choisir la langue")}
              onClick={() => setLanguages(!languages)}
            >
              <Globe size={16} />
              {lang}
              <ChevronDown size={12} />
            </button>
            {languages && (
              <div className="ad-language-menu">
                {(["EN", "FR"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setLanguages(false);
                    }}
                    aria-pressed={lang === code}
                  >
                    {code === "EN" ? "English" : "Français"}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            className="ad-header-contact"
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} />
            <span>{c("Contact us", "Contactez-nous")}</span>
          </a>
          <button
            className="ad-mobile-trigger"
            type="button"
            aria-label={c("Toggle navigation", "Ouvrir le menu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
