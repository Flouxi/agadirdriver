import { useCopy } from "../lib/copy";
import { BUSINESS } from "../data/seo";

export default function BookingFaqs() {
  const c = useCopy();
  const questions = [
    [
      c(
        "Is my ride confirmed when I finish the form?",
        "Mon trajet est-il confirmé après le formulaire ?",
      ),
      c(
        "Your request becomes a booking after our team confirms the final fare and availability. Review your journey, open WhatsApp and press Send to reach us.",
        "Votre demande devient une réservation après confirmation du tarif final et de la disponibilité par notre équipe. Vérifiez le trajet, ouvrez WhatsApp et appuyez sur Envoyer pour nous joindre.",
      ),
    ],
    [
      c("Is the price per person or per vehicle?", "Le prix est-il par personne ou par véhicule ?"),
      c(
        "The displayed price is for the entire vehicle. Published transfer fares include fuel, standard parking and tolls. Our team confirms the final fare before booking; routes without a published price are quoted individually.",
        "Le prix affiché est pour le véhicule entier. Les tarifs de transfert publiés comprennent le carburant, le stationnement standard et les péages. Notre équipe confirme le tarif final avant réservation ; les trajets sans tarif publié sont chiffrés sur devis.",
      ),
    ],
    [
      c("Do I pay on this website?", "Dois-je payer sur ce site ?"),
      c(
        "No payment is taken online. Our team confirms payment arrangements with your booking.",
        "Aucun paiement n'est prélevé en ligne. Notre équipe confirme les modalités de paiement avec votre réservation.",
      ),
    ],
    [
      c("What if my flight is delayed?", "Que faire si mon vol est retardé ?"),
      c(
        "Include your flight number when requesting an airport pickup and tell our team about any changes. Ask us to confirm the waiting arrangements for your journey before booking.",
        "Indiquez votre numéro de vol pour un départ aéroport et prévenez notre équipe de tout changement. Demandez confirmation des conditions d'attente pour votre trajet avant de réserver.",
      ),
    ],
    [
      c(
        "Can I bring surfboards or request a child seat?",
        "Puis-je apporter une planche de surf ou demander un siège enfant ?",
      ),
      c(
        "Tell us how many bags and boards you have, and any child-seat requirements, in the request notes. Our team will confirm the suitable vehicle and arrangements before you book.",
        "Précisez le nombre de bagages et de planches, ainsi que tout besoin de siège enfant, dans les remarques. Notre équipe confirme le véhicule adapté et les modalités avant réservation.",
      ),
    ],
    [
      c("Can I request a ride without WhatsApp?", "Puis-je demander un trajet sans WhatsApp ?"),
      c(
        "Yes. After reviewing your request, choose the email option to open your email app with the same journey details. You can also call our team.",
        "Oui. Après vérification de votre demande, choisissez l'option e-mail pour ouvrir votre messagerie avec les mêmes détails. Vous pouvez aussi appeler notre équipe.",
      ),
    ],
  ];
  return (
    <section className="ad-section ad-booking-faq" id="help" aria-labelledby="booking-faq-heading">
      <div className="ad-shell">
        <div className="ad-section-heading">
          <h2 id="booking-faq-heading">{c("Before you book", "Avant de réserver")}</h2>
          <p>
            {c(
              "Clear answers for a smoother arrival.",
              "Des réponses claires pour préparer votre arrivée.",
            )}
          </p>
        </div>
        <div className="ad-faq-list">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a className="ad-text-button" href={BUSINESS.phoneHref}>
          {c(
            "Still have a question? Call our Agadir team",
            "Une autre question ? Appelez notre équipe à Agadir",
          )}{" "}
          · {BUSINESS.phone}
        </a>
      </div>
    </section>
  );
}
