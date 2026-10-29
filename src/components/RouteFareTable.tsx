import { AGADIR_ROUTES, zoneLabel, type ZoneId } from "../data/tariffs";
import { useCopy } from "../lib/copy";
import { AIRPORTS } from "../data/locations";

export default function RouteFareTable({
  destination,
  city = false,
}: {
  destination?: ZoneId;
  city?: boolean;
}) {
  const c = useCopy();
  const from = city ? "agadir-city" : "agadir-airport";
  const rows = AGADIR_ROUTES.filter(
    (route) =>
      route.from === from &&
      (destination
        ? route.to === destination
        : ["agadir-city", "tamraght", "taghazout"].includes(route.to)),
  );
  if (!rows.length) return null;
  return (
    <section className="ad-section ad-seo-fares" id="transfer-prices">
      <div className="ad-shell">
        <h2>
          {city
            ? c(
                "Private rides from Agadir: one-way fares",
                "Trajets privés depuis Agadir : tarifs aller simple",
              )
            : c("Agadir airport transfer prices", "Prix des transferts aéroport d'Agadir")}
        </h2>
        <p>
          {c(
            "Published fares in EUR for the whole vehicle, one way. Choose your actual accommodation and group size in the booking form; our team confirms the final fare and availability.",
            "Tarifs publiés en EUR pour le véhicule entier, en aller simple. Indiquez votre hébergement exact et la taille du groupe ; notre équipe confirme le tarif final et la disponibilité.",
          )}
        </p>
        <div
          className="ad-seo-table-wrap"
          role="region"
          aria-label={c("Compare transfer fares", "Comparer les tarifs de transfert")}
          tabIndex={0}
        >
          <table className="ad-seo-table">
            <caption>
              {c("Per vehicle · one way · EUR", "Par véhicule · aller simple · EUR")}
            </caption>
            <thead>
              <tr>
                <th scope="col">{c("Destination", "Destination")}</th>
                <th scope="col">{c("Economy Sedan", "Berline économique")}</th>
                <th scope="col">{c("Comfort Sedan", "Berline confort")}</th>
                <th scope="col">{c("Comfort Van", "Van confort")}</th>
                <th scope="col">{c("Choose your ride", "Choisissez votre trajet")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((route) => (
                <tr key={route.to}>
                  <th scope="row">{zoneLabel(route.to)}</th>
                  <td>€{route.prices.economy}</td>
                  <td>€{route.prices.comfortSedan}</td>
                  <td>€{route.prices.comfortVan}</td>
                  <td>
                    <a
                      className="ad-fare-book"
                      href={
                        "/reservation?" +
                        new URLSearchParams({
                          from: city ? "Agadir Centre-Ville" : AIRPORTS[0].label,
                          to: zoneLabel(route.to),
                          type: "transfer",
                        }).toString()
                      }
                      aria-label={c(
                        `See vehicles for ${zoneLabel(route.to)}`,
                        `Voir les véhicules vers ${zoneLabel(route.to)}`,
                      )}
                    >
                      {c("See vehicles", "Voir les véhicules")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          {c(
            "Fuel, standard parking and tolls are included in published transfer fares. Mention extra luggage, surfboards, child seats and exact pickup details before confirmation.",
            "Le carburant, le stationnement standard et les péages sont inclus dans les tarifs de transfert publiés. Précisez les bagages supplémentaires, planches de surf, sièges enfants et détails du départ avant confirmation.",
          )}
        </p>
      </div>
    </section>
  );
}
