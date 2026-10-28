import { ArrowUpRight, Briefcase, Check, MapPin, Plane, Users } from "lucide-react";
import { VEHICLES } from "../data";
import { AGADIR_DRIVER_LOGO_URL } from "../lib/brand-images";
import { useCopy } from "../lib/copy";
export default function JourneySteps() {
  const c = useCopy();
  return (
    <div className="ad-journey-steps">
      <article>
        <div className="ad-step-scene ad-step-scene-book">
          <div className="ad-step-mini-booking">
            <div className="ad-step-mini-route">
              <i />
              <strong>Agadir Al Massira Airport</strong>
              <i />
              <strong>Taghazout Bay</strong>
            </div>
            <p>
              13:45 · <Users size={10} /> 2
            </p>
            <div className="ad-step-mini-vehicles">
              {VEHICLES.slice(0, 3).map((v, i) => (
                <div key={v.id}>
                  <img src={v.image} alt="" />
                  <span>
                    <strong>
                      {c(
                        ["Economy", "Comfort Sedan", "Comfort Van"][i],
                        ["Économique", "Berline confort", "Van confort"][i],
                      )}
                    </strong>
                    <small>
                      <Users size={9} />
                      {v.passengers}
                      <Briefcase size={9} />
                      {v.luggage}
                    </small>
                  </span>
                  <b>€{[30, 32, 38][i]}</b>
                </div>
              ))}
            </div>
            <small>
              {c("Private ride · Price per vehicle", "Trajet privé · Prix par véhicule")}
            </small>
          </div>
        </div>
        <h3>
          <span>1.</span> {c("Book your ride", "Réservez votre trajet")}
        </h3>
        <p>
          {c(
            "Choose your route and vehicle, then send your request to our local team for confirmation.",
            "Choisissez votre trajet et votre véhicule, puis envoyez votre demande à notre équipe.",
          )}
        </p>
      </article>
      <article>
        <div className="ad-step-scene ad-step-scene-arrival">
          <div className="ad-step-arrivals">
            <header>
              <span>{c("Arrivals", "Arrivées")}</span>
              <time>13:36</time>
            </header>
            <p>
              FR 1244 PARIS <b>LANDED</b>
            </p>
            <p>
              AT 422 CASABLANCA <b>13:50</b>
            </p>
            <p>
              U2 218 AGADIR <b>14:05</b>
            </p>
          </div>
          <div className="ad-step-name-board">
            <img src={AGADIR_DRIVER_LOGO_URL} alt="" />
            <strong>{c("Your name", "Votre nom")}</strong>
            <small>{c("A personal welcome at arrivals", "Un accueil personnel à l'arrivée")}</small>
          </div>
        </div>
        <h3>
          <span>2.</span> {c("Meet your driver", "Retrouvez votre chauffeur")}
        </h3>
        <p>
          {c(
            "Find your driver at the agreed meeting point and let them take care of your luggage.",
            "Retrouvez votre chauffeur au point de rendez-vous convenu et laissez-le s'occuper de vos bagages.",
          )}
        </p>
      </article>
      <article>
        <div className="ad-step-scene ad-step-scene-map">
          <svg viewBox="0 0 360 360" aria-hidden="true">
            <defs>
              <pattern id="street-grid" width="75" height="70" patternUnits="userSpaceOnUse">
                <rect width="75" height="70" fill="#e6e4de" />
                <rect x="5" y="5" width="59" height="54" rx="5" fill="#dddbd4" />
                <path d="M70 0V70M0 65H75" stroke="#f6f5ef" strokeWidth="7" />
              </pattern>
            </defs>
            <rect width="360" height="360" fill="url(#street-grid)" />
            <path d="M70 290V225H215V85H290V55" fill="none" stroke="#ffe8ad" strokeWidth="12" />
            <path d="M70 290V225H215V85H290V55" fill="none" stroke="#f8bb42" strokeWidth="4" />
            <circle cx="70" cy="290" r="13" fill="#161815" />
            <circle cx="290" cy="55" r="10" fill="#ffbf36" />
            <circle cx="290" cy="55" r="18" fill="#ffbf36" opacity=".2" />
          </svg>
          <Plane className="ad-step-map-plane" size={16} />
          <div>
            <strong>Taghazout Bay</strong>
            <small>{c("The coast is calling.", "La côte vous attend.")}</small>
          </div>
        </div>
        <h3>
          <span>3.</span> {c("Enjoy your journey", "Profitez du voyage")}
        </h3>
        <p>
          {c(
            "Settle in and enjoy a comfortable private ride, all the way to your destination.",
            "Installez-vous et profitez d'un trajet privé confortable jusqu'à votre destination.",
          )}
        </p>
      </article>
    </div>
  );
}
