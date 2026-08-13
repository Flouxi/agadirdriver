import { useEffect, useMemo, useRef, useState } from "react";
import { Plane, Building2, Hotel, ArrowLeft, Search, X, MapPin, ChevronRight } from "lucide-react";
import { AIRPORTS, CITIES, HOTELS, type LocationCategory, type LocationOption } from "../data/locations";

interface LocationPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title?: string;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

const CATEGORIES: {
  id: LocationCategory;
  label: string;
  desc: string;
  icon: React.ReactNode;
  list: LocationOption[];
}[] = [
  { id: "airport", label: "Aéroport", desc: "Transferts depuis/vers les aéroports", icon: <Plane size={18} />, list: AIRPORTS },
  { id: "city", label: "Ville", desc: "Centres-villes & adresses principales", icon: <Building2 size={18} />, list: CITIES },
  { id: "hotel", label: "Hôtel", desc: "Hôtels, resorts & surf camps", icon: <Hotel size={18} />, list: HOTELS },
];

export default function LocationPicker({ open, onClose, onSelect, title = "Choisir un lieu" }: LocationPickerProps) {
  const [cat, setCat] = useState<LocationCategory | null>(null);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setCat(null);
    setQuery("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Prevent background scroll on mobile
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const activeCat = useMemo(() => CATEGORIES.find((c) => c.id === cat) ?? null, [cat]);

  const filtered = useMemo(() => {
    if (!activeCat) return [];
    const q = query.trim().toLowerCase();
    if (!q) return activeCat.list;
    return activeCat.list.filter(
      (l) => l.label.toLowerCase().includes(q) || (l.sublabel ?? "").toLowerCase().includes(q),
    );
  }, [activeCat, query]);

  if (!open) return null;

  const handlePick = (l: LocationOption) => {
    onSelect(l.label);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — bottom sheet on mobile, centered dialog on desktop */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          {activeCat && (
            <button
              type="button"
              onClick={() => { setCat(null); setQuery(""); }}
              className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer -ml-1 px-1.5 py-1 rounded hover:bg-gray-50"
            >
              <ArrowLeft size={14} /> Retour
            </button>
          )}
          <div className="flex-1 text-sm font-bold text-gray-900 truncate">
            {activeCat ? activeCat.label : title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        {!activeCat ? (
          <div className="p-3 space-y-2 overflow-y-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-900 hover:bg-gray-50 text-left transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F1115] text-[#EAB308] flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900">{c.label}</div>
                  <div className="text-[12px] text-gray-500">{c.desc}</div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="p-3 border-b border-gray-100">
              <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200/80 focus-within:border-gray-900">
                <Search size={16} className="absolute left-3 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Rechercher un ${activeCat.label.toLowerCase()}...`}
                  className="w-full pl-9 pr-3 py-2.5 bg-transparent rounded-xl text-sm font-medium text-gray-900 focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="text-center text-xs text-gray-400 py-8">Aucun résultat.</div>
              ) : (
                filtered.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handlePick(l)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer ${
                      l.vip ? "bg-gradient-to-r from-amber-50 to-transparent" : ""
                    }`}
                  >
                    <MapPin size={14} className={l.vip ? "text-amber-500 shrink-0" : "text-[#EAB308] shrink-0"} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-gray-900 truncate flex items-center gap-1.5">
                        <span className="truncate">{l.label}</span>
                        {l.vip && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-white tracking-wider shrink-0">
                            VIP
                          </span>
                        )}
                      </div>
                      {l.sublabel && (
                        <div className="text-[11px] text-gray-500 truncate">{l.sublabel}</div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
