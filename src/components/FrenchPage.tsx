import { BUSINESS, SERVICE_PAGES } from "../data/seo";
import { frenchPage, type FrenchPath } from "../data/french-pages";
import { jsonLd } from "../lib/seo-head";
import Header from "./Header";
import Footer from "./Footer";
import BookingFaqs from "./BookingFaqs";
import RouteFareTable from "./RouteFareTable";
import SeoLandingPage from "./SeoLandingPage";

export default function FrenchPage({ path }: { path: FrenchPath }) {
  const page = frenchPage(path);
  if (page.kind === "service") {
    return (
      <SeoLandingPage path={page.source} canonicalPath={path} page={SERVICE_PAGES[page.source]} />
    );
  }
  const pricing = path === "/fr/prix-transfert-aeroport-agadir";
  const url = BUSINESS.url + path;
  return (
    <div className="ad-site">
      <a className="ad-skip" href="#main-content">
        Aller au contenu
      </a>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Article",
                  "@id": url + "#article",
                  url,
                  headline: page.heading,
                  description: page.description,
                  inLanguage: "fr",
                  mainEntityOfPage: url,
                  author: { "@type": "Organization", name: "Agadir Driver", url: BUSINESS.url },
                  publisher: { "@id": BUSINESS.url + "/#business" },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": url + "#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Agadir Driver",
                      item: BUSINESS.url + "/",
                    },
                    { "@type": "ListItem", position: 2, name: page.heading, item: url },
                  ],
                },
              ],
            }),
          }}
        />
        <article className="ad-section ad-localized-guide">
          <div className="ad-shell">
            <nav className="ad-breadcrumbs" aria-label="Fil d'Ariane">
              <a href="/">Agadir Driver</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.heading}</span>
            </nav>
            <p className="ad-eyebrow">Agadir Driver · Préparer votre trajet</p>
            <h1>{page.heading}</h1>
            <p className="ad-service-intro">{page.intro}</p>
            <div className="ad-localized-guide-sections">
              {page.sections.map(([heading, body]) => (
                <section key={heading}>
                  <h2>{heading}</h2>
                  <p>{body}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
        <RouteFareTable city={!pricing} destination={pricing ? undefined : "taghazout"} />
        <section className="ad-section ad-related-services">
          <div className="ad-shell">
            <h2>Préparer la prochaine étape</h2>
            <div>
              <a href="/fr/transfert-aeroport-agadir">Transfert privé à l'aéroport d'Agadir</a>
              <a href="/fr/transfert-aeroport-taghazout">De l'aéroport à Taghazout</a>
              <a href="/fr/taxi-agadir">Trajets privés depuis Agadir ville</a>
            </div>
            <p>
              Comparez les véhicules, puis vérifiez le trajet et envoyez votre demande. Notre équipe
              confirme le tarif final et la disponibilité avant réservation.
            </p>
          </div>
        </section>
        <BookingFaqs />
      </main>
      <Footer />
    </div>
  );
}
