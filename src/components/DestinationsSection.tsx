import { useState } from 'react';
import { DESTINATIONS } from '../data';
import { Destination } from '../types';
import { Plane, MapPin, Snowflake, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

interface DestinationsSectionProps {
  onSelectDestination?: (name: string, isAirport: boolean) => void;
}

const TABS: { id: 'all' | 'airport' | 'city' | 'ski'; label: string }[] = [
  { id: 'all', label: 'Tout voir' },
  { id: 'airport', label: 'Aéroports' },
  { id: 'city', label: 'Villes & Resorts' },
  { id: 'ski', label: 'Stations de ski' },
];

export default function DestinationsSection({ onSelectDestination }: DestinationsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'airport' | 'city' | 'ski'>('all');

  const filteredDestinations = activeTab === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.type === activeTab);

  const handleSelect = (dest: Destination) => {
    if (onSelectDestination) {
      onSelectDestination(dest.name + (dest.type === 'airport' ? ' - ' + dest.airport : ''), dest.type === 'airport');
    }
    const element = document.getElementById('booking-interface');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="section-y-sm bg-surface lg:section-y">
      <div className="shell">
        <Reveal className="grid grid-cols-1 gap-5 sm:gap-8 lg:flex lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[1.9rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
              Destinations phares au Maroc
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink/55 sm:mt-3 sm:text-[16px]">
              Réservez votre transfert privé d'élite vers les aéroports, ports et resorts du Royaume.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-surface text-ink/65 hover:border-ink/30 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {filteredDestinations.map((dest, i) => (
            <Reveal key={dest.id} delay={(i % 4) * 60}>
              <button
                type="button"
                onClick={() => handleSelect(dest)}
                className="card-lift group block w-full cursor-pointer overflow-hidden rounded-2xl border-line bg-surface text-left shadow-soft sm:rounded-xl sm:border"
              >
                <div className="relative h-44 overflow-hidden bg-surface-alt sm:h-52">
                  <img
                    src={dest.image}
                    alt={`Transfert privé vers ${dest.name}, ${dest.airport}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent"
                  />

                  <div className="absolute bottom-3.5 left-4 right-4 text-white sm:bottom-4">
                    <span className="block text-[17px] font-bold tracking-[-0.01em] sm:text-[15px] sm:font-semibold">{dest.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-white/75 sm:hidden">
                      {dest.type === 'airport' && <Plane size={13} strokeWidth={1.75} className="text-white/70" />}
                      {dest.type === 'city' && <MapPin size={13} strokeWidth={1.75} className="text-white/70" />}
                      {dest.type === 'ski' && <Snowflake size={13} strokeWidth={1.75} className="text-white/70" />}
                      <span className="truncate">{dest.airport}</span>
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 hidden rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm sm:block">
                    {dest.type === 'airport' ? 'Aéroport' : dest.type === 'city' ? 'Hôtel/Surf' : 'Ski'}
                  </span>
                </div>

                <div className="hidden items-center justify-between gap-3 p-5 sm:flex">
                  <div className="min-w-0">
                    <span className="block text-[12px] text-ink/45">Lieu desservi</span>
                    <span className="block truncate text-[14px] font-medium text-ink">{dest.airport}</span>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-alt text-ink/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-ink/45 sm:mt-10">
          Conseil : Cliquez sur une destination pour la renseigner automatiquement dans le formulaire de réservation !
        </p>
      </div>
    </section>
  );
}
