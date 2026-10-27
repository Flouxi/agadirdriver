import { Check } from "lucide-react";
import { useCopy } from "../lib/copy";
export default function BookingProgress({ step = 1 }: { step?: number }) {
  const c = useCopy();
  return (
    <nav className="ad-progress" aria-label={c("Booking progress", "Étapes de réservation")}>
      {[
        c("Your ride", "Votre trajet"),
        c("Your details", "Vos coordonnées"),
        c("Confirmation", "Confirmation"),
      ].map((label, i) => (
        <span
          key={label}
          aria-current={step === i + 1 ? "step" : undefined}
          className={step >= i + 1 ? "ad-progress-active" : ""}
        >
          <b>{step > i + 1 ? <Check size={12} /> : i + 1}</b>
          {label}
        </span>
      ))}
    </nav>
  );
}
