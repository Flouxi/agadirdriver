import { Check } from 'lucide-react';
import { INFO_SECTION_PRIMARY_IMAGE_URL, INFO_SECTION_SECONDARY_IMAGE_URL } from '../lib/brand-images';
import Reveal from './Reveal';

const STATS = [
  { value: '12+', label: 'Régions' },
  { value: '50+', label: 'Villes' },
  { value: '10+', label: 'Aéroports' },
  { value: '∞', label: 'Itinéraires' },
];

const GUARANTEES = [
  "Annulation gratuite 24h à l'avance",
  '60 minutes d\u2019attente gratuite aux aéroports',
  'Chauffeurs locaux certifiés bilingues',
  'Pas de frais cachés, prix garantis',
];

const STEPS = [
  {
    n: '1',
    title: 'Indiquez votre itinéraire',
    body: "Saisissez vos adresses de départ et d'arrivée, dates, heures et choisissez la classe de véhicule idéale.",
  },
  {
    n: '2',
    title: 'Complétez la réservation',
    body: 'Saisissez les coordonnées du passager principal, le numéro de vol pour le suivi et procédez au paiement sécurisé.',
  },
  {
    n: '3',
    title: 'Rencontrez votre chauffeur',
    body: 'Recevez le contact de votre chauffeur 6h avant la course. Il vous attend avec une pancarte nominative à l\u2019aéroport.',
  },
];

export default function InfoSection() {
  return (
    <>
      {/* Block 1 — coverage */}
      <section className="section-y-sm bg-surface-alt lg:section-y lg:bg-surface">
        <div className="shell grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <img
              src={INFO_SECTION_PRIMARY_IMAGE_URL}
              alt="Chauffeur accueillant un couple de voyageurs élégants à Agadir"
              loading="lazy"
              className="aspect-4/5 w-full rounded-3xl object-cover shadow-soft sm:aspect-4/3 sm:rounded-xl"
              referrerPolicy="no-referrer"
            />
          </Reveal>

          <Reveal delay={90} className="lg:col-span-7">
            <span className="text-[12px] font-semibold tracking-wide text-accent-strong uppercase sm:text-[13px]">
              Votre chauffeur personnel, à portée de main
            </span>
            <h2 className="mt-3 text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:mt-4 sm:text-4xl">
              Couverture nationale marocaine
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/55 sm:mt-6 sm:text-[16px]">
              <p>
                Réservez votre chauffeur privé en quelques secondes et profitez d'une expérience de voyage haut de gamme adaptée à votre emploi du temps marocain. Un transport fiable, confortable et sans stress est désormais plus facile que jamais de Casablanca à Dakhla. Arrivez à destination reposé, détendu et toujours à la minute près.
              </p>
              <p>
                Que vous voyagiez pour affaires à Marrakech, pour le plaisir à Essaouira, ou pour dompter les vagues à Taghazout, nos chauffeurs professionnels fournissent un service d'exception pour garantir que votre trajet soit fluide et serein. Réservez simplement en ligne et laissez-nous gérer le reste.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3 border-t border-line pt-6 sm:mt-10 sm:gap-8 sm:pt-8">
              {STATS.map((s) => (
                <div key={s.label} className="min-w-0">
                  <span className="block text-[12px] text-ink/50 sm:hidden">{s.label}</span>
                  <span className="block text-[22px] font-bold tracking-[-0.03em] text-ink sm:text-[28px]">{s.value}</span>
                  <span className="mt-0.5 hidden text-[13px] text-ink/50 sm:block">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Block 2 — comfort */}
      <section className="section-y-sm bg-surface lg:section-y lg:bg-surface-alt">
        <div className="shell grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <span className="text-[12px] font-semibold tracking-wide text-accent-strong uppercase sm:text-[13px]">
              Voyagez confortablement, arrivez en toute confiance
            </span>
            <h2 className="mt-3 text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:mt-4 sm:text-4xl">
              Sans le moindre accroc
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/55 sm:mt-6 sm:text-[16px]">
              <p>
                Profitez du luxe d'un service de chauffeur privé conçu exclusivement pour répondre à vos exigences. Notre outil de réservation en ligne instantané rend vos trajets sans stress, vous permettant de vous concentrer sur vos loisirs ou vos impératifs professionnels.
              </p>
              <p>
                Nos chauffeurs d'élite offrent une fiabilité hors pair et une attention personnalisée à chaque passager. Des rafraîchissements, des lingettes hydroalcooliques, et un réseau Wi-Fi haut débit sécurisé transforment votre trajet en un véritable salon roulant.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {GUARANTEES.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-[14px] font-medium text-ink/70">
                  <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-accent-strong" />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2 lg:col-span-5">
            <img
              src={INFO_SECTION_SECONDARY_IMAGE_URL}
              alt="Mercedes Classe V haut de gamme garée devant un complexe hôtelier à Agadir"
              loading="lazy"
              className="aspect-4/5 w-full rounded-3xl object-cover shadow-soft sm:aspect-4/3 sm:rounded-xl"
              referrerPolicy="no-referrer"
            />
          </Reveal>
        </div>
      </section>

      {/* Block 3 — how it works */}
      <section className="section-y-sm bg-surface lg:section-y">
        <div className="shell">
          <div className="rounded-3xl bg-surface-alt p-6 sm:rounded-none sm:bg-transparent sm:p-0">
            <Reveal className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-[1.65rem] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
                Comment ça marche
              </h2>
            </Reveal>

            <div className="mt-7 grid grid-cols-1 divide-y divide-line sm:mt-14 sm:grid-cols-1 sm:divide-y-0 md:grid-cols-3 md:gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 90} className="py-6 first:pt-0 last:pb-0 sm:py-0">
                  <div className="relative">
                    <span className="block text-[13px] font-bold text-accent-strong sm:hidden">0{step.n}</span>
                    <span className="hidden h-11 w-11 items-center justify-center rounded-full bg-ink text-[16px] font-semibold text-white sm:flex">
                      {step.n}
                    </span>
                    <h3 className="mt-2.5 text-[17px] font-semibold tracking-[-0.015em] text-ink sm:mt-6 sm:text-[18px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink/55 sm:mt-2.5 sm:text-[15px]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
