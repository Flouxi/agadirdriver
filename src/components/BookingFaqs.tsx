import { useCopy } from "../lib/copy";
import { BUSINESS } from "../data/seo";
import { jsonLd } from "../lib/seo-head";

export default function BookingFaqs({
  context,
}: {
  context?: "airport" | "coast" | "city" | "hourly";
}) {
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
  if (context === "airport") {
    questions[5] = [
      c(
        "Where will I meet my driver at Agadir airport?",
        "Où retrouver mon chauffeur à l'aéroport d'Agadir ?",
      ),
      c(
        "Our team confirms the exact airport meeting point with your booking. Keep the confirmation message and contact number available after landing. If your arrival changes, contact the team before travelling to the pickup point.",
        "Notre équipe confirme le point de rendez-vous exact avec votre réservation. Gardez le message de confirmation et le numéro de contact accessibles après l'atterrissage. En cas de changement, contactez l'équipe avant de rejoindre le rendez-vous.",
      ),
    ];
  } else if (context === "coast") {
    questions[5] = [
      c(
        "Can I arrange a return transfer to Agadir airport?",
        "Puis-je prévoir le retour vers l'aéroport d'Agadir ?",
      ),
      c(
        "Yes. Select Add return and enter the pickup time at your accommodation, then share your departure-flight details. Ask our team to confirm the pickup address, timing, vehicle and final fare for both journeys.",
        "Oui. Sélectionnez Ajouter retour et indiquez l'heure de prise en charge à l'hébergement, puis communiquez les détails du vol de départ. Faites confirmer l'adresse, les horaires, le véhicule et le tarif final des deux trajets par notre équipe.",
      ),
    ];
  } else if (context === "city") {
    questions[3] = [
      c(
        "Are these Agadir taxi-meter prices?",
        "S'agit-il des prix au compteur des taxis d'Agadir ?",
      ),
      c(
        "The prices on this page are Agadir Driver's pre-arranged private-vehicle fares. They are not public taxi-meter tariffs. Enter your exact pickup and destination so our team can confirm the appropriate route and final quote.",
        "Les prix de cette page sont les tarifs de véhicules privés réservés auprès d'Agadir Driver. Ce ne sont pas les tarifs au compteur des taxis publics. Indiquez le départ et l'arrivée exacts afin de confirmer le parcours et le devis final.",
      ),
    ];
  } else if (context === "hourly") {
    questions[1] = [
      c(
        "How do I arrange a driver for several stops?",
        "Comment prévoir un chauffeur pour plusieurs arrêts ?",
      ),
      c(
        "Choose By the hour, select your pickup and duration, and describe your intended stops in the notes. Our team confirms the itinerary, vehicle, final fare and any extra-time arrangements before booking.",
        "Choisissez À l'heure, indiquez le départ et la durée, puis décrivez les arrêts dans les remarques. Notre équipe confirme l'itinéraire, le véhicule, le tarif final et les conditions de temps supplémentaire avant réservation.",
      ),
    ];
    questions[3] = [
      c(
        "Should I choose hourly hire or a transfer?",
        "Choisir une mise à disposition ou un transfert ?",
      ),
      c(
        "Hourly hire suits a schedule with several stops. For one journey from one address to another, select Transfer to compare the route fare. Tell the team about longer distances or special access before confirming your plan.",
        "La mise à disposition convient à un programme avec plusieurs arrêts. Pour un trajet entre deux adresses, choisissez Transfert pour comparer le tarif du parcours. Précisez les longues distances ou accès particuliers avant confirmation.",
      ),
    ];
  }
  return (
    <section className="ad-section ad-booking-faq" id="help" aria-labelledby="booking-faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: questions.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          }),
        }}
      />
      <div className="ad-shell">
        <div className="ad-section-heading">
          <h2 id="booking-faq-heading">
            {context === "airport"
              ? c(
                  "Agadir airport transfer questions",
                  "Questions sur les transferts aéroport d'Agadir",
                )
              : c("Before you book", "Avant de réserver")}
          </h2>
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
