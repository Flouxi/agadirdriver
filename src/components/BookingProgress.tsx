import { Check } from "lucide-react";
import { useCopy } from "../lib/copy";
export default function BookingProgress({ step = 1 }: { step?: number }) {
  const c = useCopy();
  return (
    <nav className="ad-progress" aria-label={c("Booking progress", "Étapes de réservation")}>
      {[
        c("Vehicle", "Véhicule"),
        c("Details", "Coordonnées"),
        c("Review & send", "Vérifier et envoyer"),
      ].map((label, i) => (
        <span
          key={label}
          aria-current={step === i + 1 ? "step" : undefined}
          className={step >= i + 1 ? "ad-progress-active" : ""}
        >
          <b>{step > i + 1 ? <Check size={12} /> : String(i + 1).padStart(2, "0")}</b>
          {label}
        </span>
      ))}
    </nav>
  );
}
