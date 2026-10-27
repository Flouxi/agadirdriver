import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Plane, Building2, Hotel, Search, X, ArrowRight } from "lucide-react";
import { ALL_LOCATIONS, type LocationCategory } from "../data/locations";
import { useCopy } from "../lib/copy";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title?: string;
}
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export default function LocationPicker({
  open,
  onClose,
  onSelect,
  title = "Choose a location",
}: Props) {
  const c = useCopy();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<LocationCategory | "all">("all");
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCategory("all");
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key === "Tab") {
        const focusable = Array.from(
          panel.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input, a[href]") ??
            [],
        );
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", key);
      previousFocus?.focus();
    };
  }, [open]);
  const results = useMemo(
    () =>
      ALL_LOCATIONS.filter((location) => {
        if (location.id === "h-hotel-not-listed") return false;
        return (
          (category === "all" || location.category === category) &&
          normalize(location.label + " " + location.sublabel).includes(normalize(query.trim()))
        );
      }),
    [category, query],
  );
  if (!open) return null;
  const choose = (value: string) => {
    onSelect(value);
    onClose();
  };
  return (
    <div
      className="ad-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="ad-location-dialog"
      >
        <div className="ad-dialog-title">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label={c("Close", "Fermer")}>
            <X size={20} />
          </button>
        </div>
        <label className="ad-location-search">
          <Search size={19} />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c(
              "Search airport, city or hotel…",
              "Rechercher un aéroport, une ville, un hôtel…",
            )}
            aria-label={c("Search locations", "Rechercher un lieu")}
          />
        </label>
        <div className="ad-location-tabs">
          {(
            [
              { id: "all", label: c("All", "Tous") },
              { id: "airport", label: c("Airports", "Aéroports") },
              { id: "city", label: c("Cities", "Villes") },
              { id: "hotel", label: c("Hotels", "Hôtels") },
            ] as const
          ).map((tab) => (
            <button
              type="button"
              key={tab.id}
              aria-pressed={category === tab.id}
              onClick={() => setCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ad-location-results">
          {results.slice(0, 80).map((location) => (
            <button type="button" key={location.id} onClick={() => choose(location.label)}>
              {location.category === "airport" ? (
                <Plane size={18} />
              ) : location.category === "hotel" ? (
                <Hotel size={18} />
              ) : (
                <Building2 size={18} />
              )}
              <span>
                <strong>{location.label}</strong>
                <small>{location.sublabel}</small>
              </span>
              <ArrowRight size={15} />
            </button>
          ))}
          {!results.length && (
            <p className="ad-empty">
              {c(
                "No matching places. Enter the complete address below.",
                "Aucun lieu trouvé. Saisissez l'adresse complète ci-dessous.",
              )}
            </p>
          )}
          {query.trim().length >= 5 && (
            <button type="button" onClick={() => choose(query.trim())}>
              <MapPin size={18} />
              <span>
                <strong>{c("Use this exact address", "Utiliser cette adresse")}</strong>
                <small>
                  {query.trim()} · {c("price to be confirmed", "prix à confirmer")}
                </small>
              </span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
        <p className="ad-dialog-note">
          {c(
            "Can't find your address? Type it above. Our team will confirm the pickup point.",
            "Vous ne trouvez pas votre adresse ? Saisissez-la ci-dessus. Notre équipe confirmera le lieu de prise en charge.",
          )}
        </p>
      </div>
    </div>
  );
}
