import { useRef } from 'react';
import { VEHICLES } from '../data';
import { VehicleClass } from '../types';
import { ChevronLeft, ChevronRight, Users, Briefcase } from 'lucide-react';
import Reveal from './Reveal';

interface VehicleCarouselProps {
  onSelectVehicle?: (vehicle: VehicleClass) => void;
}

export default function VehicleCarousel({ onSelectVehicle }: VehicleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleSelect = (vehicle: VehicleClass) => {
    if (onSelectVehicle) {
      onSelectVehicle(vehicle);
    }
    const element = document.getElementById('booking-interface');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="section-y-sm bg-surface lg:section-y">
      <div className="shell">
        <Reveal className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6 lg:flex lg:justify-between">
          <div className="min-w-0 max-w-2xl text-center sm:text-left">
            <h2 className="text-[1.9rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
              Confort et sécurité pour votre voyage
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink/55 sm:mt-3 sm:text-[16px]">
              Véhicules récents avec licence, chauffeurs professionnels multilingues
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-all hover:border-ink/30 active:scale-95"
              aria-label="Véhicule précédent"
            >
              <ChevronLeft size={18} strokeWidth={1.75} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-all hover:border-ink/30 active:scale-95"
              aria-label="Véhicule suivant"
            >
              <ChevronRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </Reveal>

        <div
          ref={containerRef}
          className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:mt-12 sm:gap-6 sm:px-0 sm:pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="card-lift group flex w-[82%] max-w-[330px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-surface-alt sm:w-[330px] sm:rounded-xl sm:border sm:border-line sm:bg-surface sm:shadow-soft"
            >
              <div className="relative h-40 overflow-hidden bg-surface-alt sm:h-44">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} — ${vehicle.carModels}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                  {vehicle.id === 'first' || vehicle.id === 'van-first' ? 'VIP' : 'Premium'}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-[17px] font-bold tracking-[-0.015em] text-ink sm:text-[18px] sm:font-semibold">
                    {vehicle.name}
                  </h3>
                  <p className="mt-0.5 text-[12.5px] text-ink/45 sm:text-[13px]">{vehicle.carModels}</p>

                  <div className="mt-4 flex items-center gap-5 text-[13px] font-medium text-ink/60">
                    <span className="flex items-center gap-1.5">
                      <Users size={15} strokeWidth={1.75} />
                      Jusqu'à {vehicle.passengers} pax
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={15} strokeWidth={1.75} />
                      {vehicle.luggage} bagages
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-[13.5px] leading-relaxed text-ink/55 sm:line-clamp-3 sm:text-[14px]">
                    {vehicle.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 sm:mt-6">
                  <div>
                    <span className="block text-[12px] text-ink/45">À partir de</span>
                    <span className="text-[22px] font-bold tracking-[-0.02em] text-ink">{vehicle.basePrice} €</span>
                  </div>
                  <button
                    onClick={() => handleSelect(vehicle)}
                    className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-ink-soft active:scale-[0.97]"
                  >
                    Choisir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
