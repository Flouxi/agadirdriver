import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, MapPin, Plane, Building2, Hotel, Search, X, ArrowRight } from "lucide-react";
import { ALL_LOCATIONS, type LocationCategory } from "../data/locations";
import { useCopy } from "../lib/copy";
import { matchesLocation, normalizeLocation as normalize } from "../lib/location-search";
interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title?: string;
  exclude?: string;
  context?: string;
  onBack?: () => void;
}
const suggestions = [
  "Aéroport Agadir Al Massira (AGA)",
  "Agadir Centre-Ville",
  "Hyatt Place Taghazout Bay",
  "Hyatt Regency Taghazout",
  "Fairmont Taghazout Bay",
  "Aéroport Marrakech Ménara (RAK)",
  "Marrakech Centre-Ville",
  "Essaouira Médina",
];
export default function LocationPicker({
  open,
  onClose,
  onSelect,
  title = "Choose a location",
  exclude,
  context,
  onBack,
}: Props) {
  const c = useCopy(),
    listId = "places-" + useId().replace(/\W/g, "");
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState<LocationCategory | "all">("all"),
    [active, setActive] = useState(-1);
  const panel = useRef<HTMLDivElement>(null),
    input = useRef<HTMLInputElement>(null),
    close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCategory("all");
    setActive(-1);
    const previous = document.activeElement as HTMLElement | null,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close.current();
      }
      if (event.key === "Tab") {
        const items = Array.from(
            panel.current?.querySelectorAll<HTMLElement>("button:not([disabled]),input,a[href]") ??
              [],
          ),
          first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [open, title]);
  const results = useMemo(
    () =>
      ALL_LOCATIONS.filter(
        (place) =>
          place.id !== "h-hotel-not-listed" &&
          normalize(place.label) !== normalize(exclude ?? "") &&
          (category === "all" || place.category === category) &&
          matchesLocation(place, query),
      ).sort((a, b) => {
        if (query.trim())
          return (
            Number(normalize(b.label).startsWith(normalize(query.trim()))) -
            Number(normalize(a.label).startsWith(normalize(query.trim())))
          );
        const rank = (name: string) => {
          const i = suggestions.indexOf(name);
          return i < 0 ? 99 : i;
        };
        return rank(a.label) - rank(b.label);
      }),
    [category, query, exclude],
  );
  const shown = results.slice(0, query.trim() ? 12 : 8);
  const choices = shown.map((place) => ({
    id: place.id,
    value: place.label,
    label: place.label,
    note: place.sublabel ?? "",
    category: place.category as string,
  }));
  if (
    query.trim().length >= 5 &&
    !results.some(
      (place) =>
        normalize(place.label) === normalize(query.trim()) ||
        (place.category === "airport" &&
          (normalize(query).includes("airport") ||
            normalize(query).includes("aeroport") ||
            normalize(query) === place.id)),
    ) &&
    normalize(query.trim()) !== normalize(exclude ?? "")
  )
    choices.push({
      id: "custom",
      value: query.trim(),
      label: c("Use this address", "Utiliser cette adresse"),
      note: query.trim() + " · " + c("we'll confirm the fare", "tarif à confirmer"),
      category: "custom",
    });
  useEffect(() => {
    if (active >= 0)
      document.getElementById(listId + "-" + active)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);
  if (!open) return null;
  return (
    <div
      className="ad-modal-backdrop ad-location-sheet"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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
        {context && (
          <div className="ad-location-context">
            <span>{context}</span>
            {onBack && (
              <button type="button" onClick={onBack}>
                <ArrowLeft size={13} />
                {c("Change", "Modifier")}
              </button>
            )}
          </div>
        )}
        <label className="ad-location-search">
          <Search size={18} />
          <input
            ref={input}
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(-1);
            }}
            role="combobox"
            aria-expanded={true}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={active >= 0 ? listId + "-" + active : undefined}
            aria-label={c("Search locations", "Rechercher un lieu")}
            placeholder={c("Airport, hotel or address…", "Aéroport, hôtel ou adresse…")}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) =>
                  choices.length
                    ? i < 0
                      ? event.key === "ArrowDown"
                        ? 0
                        : choices.length - 1
                      : (i + (event.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length
                    : -1,
                );
              }
              if (event.key === "Enter") {
                event.preventDefault();
                const choice = choices[active] ?? (choices.length === 1 ? choices[0] : undefined);
                if (choice) onSelect(choice.value);
                else setActive(choices.length ? 0 : -1);
              }
            }}
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
              onClick={() => {
                setCategory(tab.id);
                setActive(-1);
                input.current?.focus();
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="ad-location-list-title">
          {query.trim()
            ? c("Matching places", "Lieux correspondants")
            : c("Suggested places", "Suggestions")}
        </p>
        <div
          className="ad-location-results"
          id={listId}
          role="listbox"
          aria-label={c("Places", "Lieux")}
        >
          {choices.map((choice, index) => (
            <button
              type="button"
              role="option"
              id={listId + "-" + index}
              key={choice.id}
              aria-selected={active === index}
              onClick={() => onSelect(choice.value)}
              onMouseEnter={() => setActive(index)}
            >
              {choice.category === "airport" ? (
                <Plane size={18} />
              ) : choice.category === "hotel" ? (
                <Hotel size={18} />
              ) : choice.category === "custom" ? (
                <MapPin size={18} />
              ) : (
                <Building2 size={18} />
              )}
              <span>
                <strong>{choice.label}</strong>
                <small>{choice.note}</small>
              </span>
              <ArrowRight size={14} />
            </button>
          ))}
        </div>
        {!choices.length && (
          <p className="ad-location-no-results">
            {c(
              "No match yet. Try the hotel name or a complete address.",
              "Aucun résultat. Essayez le nom de l'hôtel ou une adresse complète.",
            )}
          </p>
        )}
        <p className="ad-dialog-note">
          {results.length > shown.length
            ? c("Keep typing to narrow the list.", "Continuez à saisir pour affiner la liste.")
            : c(
                "Exact meeting point confirmed with your booking.",
                "Lieu de rendez-vous confirmé avec votre réservation.",
              )}
        </p>
      </div>
    </div>
  );
}
