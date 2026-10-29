import { useCopy } from "../lib/copy";

// External transport facts come from the operator's own published route information.
const AEROBUS_URL = "https://www.alsa.ma/en/navette-aeroport";

export default function AirportTransportOptions() {
  const c = useCopy();
  return (
    <section
      className="ad-section ad-service-details ad-airport-options"
      aria-labelledby="airport-options-heading"
    >
      <div className="ad-shell">
        <section>
          <h2 id="airport-options-heading">
            {c(
              "Agadir airport transport: private transfer or bus?",
              "Transport à l'aéroport d'Agadir : transfert privé ou bus ?",
            )}
          </h2>
          <p>
            {c(
              "Agadir Al Massira (AGA) is the airport for these pickups. A private vehicle takes your party to the agreed accommodation; a scheduled bus follows its published stops. Compare the whole journey, including how you will reach your hotel from the bus stop.",
              "Ces départs concernent l'aéroport Agadir Al Massira (AGA). Un véhicule privé conduit votre groupe à l'hébergement convenu ; un bus suit ses arrêts programmés. Comparez le trajet complet, y compris l'accès à votre hôtel depuis l'arrêt de bus.",
            )}
          </p>
          <dl className="ad-transport-options">
            <div>
              <dt>{c("Private airport transfer", "Transfert aéroport privé")}</dt>
              <dd>
                {c(
                  "Choose a vehicle for your passengers and bags. Compare the published one-way EUR fare for the whole vehicle, then confirm the exact drop-off, airport meeting point and final price with our team.",
                  "Choisissez un véhicule adapté aux passagers et bagages. Comparez le tarif publié en EUR pour le véhicule entier, en aller simple, puis confirmez l'arrivée exacte, le rendez-vous et le prix final avec notre équipe.",
                )}
              </dd>
            </div>
            <div>
              <dt>{c("AeroBus to Agadir city", "AeroBus vers Agadir ville")}</dt>
              <dd>
                {c(
                  "ALSA publishes an airport-to-city shuttle at 50 MAD one way or 80 MAD return per person. Check the operator's current stops, timetable and ticket conditions for your arrival; the bus ticket is separate from our private-transfer service.",
                  "ALSA publie une navette aéroport–ville à 50 MAD l'aller ou 80 MAD l'aller-retour par personne. Vérifiez les arrêts, horaires et conditions actuels auprès de l'opérateur ; le billet de bus est distinct de notre service de transfert privé.",
                )}{" "}
                <a href={AEROBUS_URL} target="_blank" rel="noreferrer">
                  {c(
                    "Check ALSA's airport shuttle information",
                    "Consulter les informations de la navette ALSA",
                  )}
                </a>
              </dd>
            </div>
          </dl>
        </section>
        <section>
          <h2>
            {c(
              "Plan your arrival and your airport return",
              "Prévoyez l'arrivée et le retour aéroport",
            )}
          </h2>
          <p>
            {c(
              "For a hotel transfer, select the property name or enter the full address. Taghazout village, Taghazout Bay and Tamraght are different destinations; include your exact accommodation and any surfboard or child-seat requests.",
              "Pour un transfert hôtel, sélectionnez l'établissement ou indiquez son adresse complète. Taghazout village, Taghazout Bay et Tamraght sont des destinations différentes ; précisez l'hébergement et les besoins de planches ou de sièges enfants.",
            )}
          </p>
          <p>
            {c(
              "For a transfer back to the airport, use the pickup time from your accommodation rather than the flight departure time. Share the flight details and ask our team to confirm the pickup plan against your airline's check-in requirements.",
              "Pour retourner à l'aéroport, indiquez l'heure de prise en charge à l'hébergement plutôt que l'heure du vol. Communiquez les détails du vol et faites confirmer le départ en tenant compte des consignes d'enregistrement de la compagnie.",
            )}
          </p>
          <a className="ad-text-button" href="#booking-interface">
            {c(
              "Choose your airport pickup and destination",
              "Choisir le départ aéroport et la destination",
            )}
          </a>
        </section>
      </div>
    </section>
  );
}
