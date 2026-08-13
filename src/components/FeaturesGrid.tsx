import React, { useState } from 'react';
import { Globe, Users, Clock, ShieldCheck, ArrowRight, X } from 'lucide-react';
import Reveal from './Reveal';

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedInfo: string;
  icon: React.ReactNode;
}

export default function FeaturesGrid() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  const features: FeatureCard[] = [
    {
      id: 'local',
      title: "Service Local & Régional",
      subtitle: "La région de Souss-Massa",
      description: "Où que vous alliez à Agadir, Taghazout, Essaouira ou Marrakech, Agadir Driver garantit votre confort tout au long du trajet.",
      detailedInfo: "Notre service couvre l'intégralité d'Agadir, la zone balnéaire de Taghazout Bay, les liaisons de surf ainsi que l'arrière-pays du Souss. Nos chauffeurs connaissent parfaitement les raccourcis locaux et les emplacements des grands resorts pour vous assurer une arrivée rapide et sans stress.",
      icon: <Globe size={22} strokeWidth={1.5} />
    },
    {
      id: 'chauffeurs',
      title: "Chauffeurs professionnels",
      subtitle: "Chauffeurs bilingues certifiés",
      description: "Nos chauffeurs professionnels, bilingues (français, anglais, arabe), discrets et attentionnés, assurent des courses irréprochables.",
      detailedInfo: "Tous nos conducteurs sont agréés pour le transport touristique de luxe par le Ministère du Transport marocain. Ils possèdent une assurance spéciale passagers illimitée, portent une tenue formelle soignée et sont formés pour s'adapter à toutes vos demandes de discrétion ou d'accompagnement.",
      icon: <Users size={22} strokeWidth={1.5} />
    },
    {
      id: 'hourly',
      title: "Chauffeur à l'heure",
      subtitle: "Mise à disposition flexible",
      description: "Réservez un chauffeur privé à l'heure pour vos besoins de shopping, réunions d'affaires ou excursions touristiques.",
      detailedInfo: "La mise à disposition horaire vous permet d'avoir un véhicule haut de gamme et son chauffeur dédié restant à votre entière disposition. Idéal pour visiter la Kasbah d'Agadir Oufella, flâner au Souk El Had ou enchaîner des rendez-vous d'affaires sans vous soucier de chercher un nouveau taxi à chaque arrêt.",
      icon: <Clock size={22} strokeWidth={1.5} />
    },
    {
      id: 'intercity',
      title: "Transferts intervilles",
      subtitle: "Liaisons longue distance",
      description: "Explorez le Maroc à tout moment, en tout lieu — voyages sécurisés entre Agadir, Marrakech, Casablanca ou Essaouira.",
      detailedInfo: "Évitez la fatigue des transports en commun ou de la location de voiture. Nos transferts longue distance par l'autoroute vous permettent de voyager de porte-à-porte dans un confort absolu. Bouteilles d'eau fraîche, connexion Wi-Fi haut débit et chargeurs de téléphones sont mis à votre disposition à bord.",
      icon: <ShieldCheck size={22} strokeWidth={1.5} />
    }
  ];

  return (
    <section className="section-y-sm bg-surface lg:section-y">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="text-[1.9rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            Nos services
          </h2>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink/55 sm:mt-3 sm:text-[16px]">
            Un chauffeur privé pour chaque trajet, de l'aéroport aux longues distances.
          </p>
        </Reveal>

        <div
          className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {features.map((feat, i) => (
            <Reveal key={feat.id} delay={i * 70} className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink">
              <div className="card-lift flex h-full flex-col justify-between rounded-3xl border-line bg-surface-alt p-6 sm:rounded-xl sm:border sm:bg-surface sm:shadow-soft">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink sm:rounded-xl sm:bg-surface-alt">
                    {feat.icon}
                  </div>

                  <h3 className="mt-5 text-[18px] font-bold tracking-[-0.01em] text-ink sm:mt-6 sm:text-[17px] sm:font-semibold">
                    {feat.title}
                  </h3>
                  <span className="mt-1 block text-[13px] font-medium text-accent-strong">
                    {feat.subtitle}
                  </span>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
                    {feat.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFeature(feat)}
                  className="mt-6 flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-[14px] font-semibold text-ink shadow-soft transition-colors hover:text-accent-strong sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none"
                >
                  <span>Détails</span>
                  <ArrowRight size={16} strokeWidth={1.75} className="hidden sm:block" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Details Dialog */}
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-7 shadow-float">
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-ink/40 transition-colors hover:bg-surface-alt hover:text-ink"
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.75} />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-alt text-ink">
                  {selectedFeature.icon}
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-ink">{selectedFeature.title}</h4>
                  <span className="text-[13px] font-medium text-accent-strong">{selectedFeature.subtitle}</span>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-[14px] leading-relaxed">
                <p className="font-medium text-ink">{selectedFeature.description}</p>
                <p className="rounded-xl bg-surface-alt p-4 text-ink/60">{selectedFeature.detailedInfo}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-ink-soft"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
