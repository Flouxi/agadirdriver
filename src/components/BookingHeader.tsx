import { Globe, ChevronDown, MessageCircle } from "lucide-react";
import { AGADIR_DRIVER_LOGO_URL } from "../lib/brand-images";
import { BUSINESS } from "../data/seo";
import { useI18n } from "../lib/i18n";
import { useCopy } from "../lib/copy";
import BookingProgress from "./BookingProgress";

export default function BookingHeader({ step = 1 }: { step?: number }) {
  const c = useCopy();
  const { lang, setLang } = useI18n();
  return (
    <header className="ad-booking-header">
      <a className="ad-booking-logo" href="/" aria-label="Agadir Driver">
        <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" width="218" height="56" />
      </a>
      <BookingProgress step={step} />
      <div className="ad-booking-header-actions">
        <details className="ad-booking-language">
          <summary>
            <Globe size={15} /> {lang} <span>€</span>
            <ChevronDown size={12} />
          </summary>
          <div>
            {(["EN", "FR"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={(event) => {
                  setLang(code);
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                {code === "EN" ? "English" : "Français"}
              </button>
            ))}
            <small>{c("Prices in EUR", "Prix en EUR")}</small>
          </div>
        </details>
        <a
          className="ad-booking-help"
          aria-label={c("Help", "Aide")}
          href={BUSINESS.whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} />
          <span>{c("Help", "Aide")}</span>
        </a>
      </div>
    </header>
  );
}
