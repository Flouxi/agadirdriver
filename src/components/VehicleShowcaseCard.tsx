import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Users, Briefcase, ShieldCheck } from 'lucide-react';

interface VehicleClass {
  id: 'economic' | 'comfort' | 'minivan' | 'minibus';
  name: string;
  category: string;
  basePrice: number;
  image: string;
  capacity: string;
  luggage: string;
  rating: string;
  description: string;
  vehiclesUsed: string;
}

interface VehicleShowcaseCardProps {
  selectedVehicleId?: 'economic' | 'comfort' | 'minivan' | 'minibus';
  onSelectVehicle: (id: 'economic' | 'comfort' | 'minivan' | 'minibus') => void;
}

export default function VehicleShowcaseCard({ selectedVehicleId, onSelectVehicle }: VehicleShowcaseCardProps) {
  const vehicles: VehicleClass[] = [
    {
      id: "economic",
      name: "Economic Class",
      category: "Compact Hatchback/Sedan",
      basePrice: 20,
      image: "/src/assets/images/agadir_airport_taxi_1783778788704.jpg", // Pre-generated high-quality taxi asset
      capacity: "Max 3 passengers",
      luggage: "2 bags",
      rating: "4.9",
      description: "Quiet, climate-controlled compact vehicles. Ideal for solo business travelers or couples looking for efficiency.",
      vehiclesUsed: "Dacia Logan, Peugeot 301, or similar"
    },
    {
      id: "comfort",
      name: "Comfort Sedan",
      category: "Executive Sedan",
      basePrice: 25,
      image: "/src/assets/images/agadir_airport_taxi_1783778788704.jpg", // Pre-generated asset
      capacity: "Max 4 passengers",
      luggage: "3 bags",
      rating: "4.9",
      description: "Generous legroom, premium sound insulation, and high-end leather seating. Our absolute standard for comfortable travel.",
      vehiclesUsed: "Skoda Superb, Mercedes C-Class, or similar"
    },
    {
      id: "minivan",
      name: "Private Minivan",
      category: "Luxury Van & MPV",
      basePrice: 35,
      image: "/src/assets/images/agadir_airport_taxi_1783778788704.jpg", // Pre-generated asset
      capacity: "Max 8 passengers",
      luggage: "8 bags / Surfboards",
      rating: "5.0",
      description: "Spacious multi-passenger van with fully adjustable seats, local WiFi, and custom surf-rack configurations. Ideal for groups & surf boards.",
      vehiclesUsed: "Mercedes-Benz Vito, Hyundai H-1, or similar"
    },
    {
      id: "minibus",
      name: "Executive Minibus",
      category: "Premium Group Coach",
      basePrice: 60,
      image: "/src/assets/images/agadir_airport_taxi_1783778788704.jpg", // Pre-generated asset
      capacity: "Max 15 passengers",
      luggage: "15 bags",
      rating: "4.9",
      description: "The ultimate option for large surf team expeditions, luxury private groups, golf trips, or corporate summits.",
      vehiclesUsed: "Mercedes-Benz Sprinter or similar"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync state if selectedVehicleId updates from parent form selection
  useEffect(() => {
    if (selectedVehicleId) {
      const idx = vehicles.findIndex(v => v.id === selectedVehicleId);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    }
  }, [selectedVehicleId]);

  const handlePrev = () => {
    const idx = (activeIndex - 1 + vehicles.length) % vehicles.length;
    setActiveIndex(idx);
    onSelectVehicle(vehicles[idx].id);
  };

  const handleNext = () => {
    const idx = (activeIndex + 1) % vehicles.length;
    setActiveIndex(idx);
    onSelectVehicle(vehicles[idx].id);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    onSelectVehicle(vehicles[index].id);
  };

  const currentVehicle = vehicles[activeIndex];

  return (
    <div className="w-full max-w-[440px] mx-auto" id="vehicle-showcase-card">
      <div className="bg-[#FBF6EF] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(31,42,36,0.35)] overflow-hidden border border-[#E8DCC8] flex flex-col transition-all duration-500">
        
        {/* Photo Area */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden group">
          {/* We use our pre-generated taxi asset but style it with modern brand overlays for the luxurious vehicle type */}
          <img
            src={currentVehicle.image}
            alt={currentVehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Premium Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#241C15]/80 via-[#241C15]/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#C1502E]/20 to-[#E4A93A]/10 mix-blend-color" />
          
          {/* Vehicle Category Label */}
          <div className="absolute top-5 left-5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1F2A24]/95 backdrop-blur-md border border-[#E4A93A]/30 text-[10px] font-bold font-display uppercase tracking-widest text-[#E4A93A] shadow-md">
              {currentVehicle.category}
            </span>
          </div>

          {/* Star Rating Badge */}
          <div className="absolute top-5 right-5">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FBF6EF] text-[#241C15] text-xs font-bold font-display shadow-lg">
              <Star className="w-3.5 h-3.5 text-[#E4A93A] fill-[#E4A93A]" />
              {currentVehicle.rating} ★
            </span>
          </div>

          {/* Vehicle Name Overlaid */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#E4A93A]">
              <ShieldCheck className="w-3 h-3" />
              <span>MOROCCO TRANSPORT PERMITTED</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#FBF6EF] mt-1 leading-none">
              {currentVehicle.name}
            </h3>
            <p className="text-[11px] font-sans text-[#FBF6EF]/85 mt-1.5">
              Featuring: {currentVehicle.vehiclesUsed}
            </p>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-4">
          
          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 border-b border-[#E8DCC8] pb-4">
            <div className="flex items-center space-x-2 text-[#241C15]">
              <div className="p-2 rounded-lg bg-[#C1502E]/10 text-[#C1502E]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold font-display uppercase tracking-wider text-[#8A7A68]">
                  Capacity
                </span>
                <span className="block text-xs font-semibold font-sans">
                  {currentVehicle.capacity}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[#241C15]">
              <div className="p-2 rounded-lg bg-[#E4A93A]/10 text-[#E4A93A]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold font-display uppercase tracking-wider text-[#8A7A68]">
                  Luggage Limit
                </span>
                <span className="block text-xs font-semibold font-sans">
                  {currentVehicle.luggage}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#241C15]/85 leading-relaxed font-sans h-12 overflow-hidden">
            {currentVehicle.description}
          </p>

          {/* Vehicle Select Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onSelectVehicle(currentVehicle.id)}
              className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedVehicleId === currentVehicle.id
                  ? 'bg-[#1F2A24] text-[#FBF6EF] border-2 border-[#E4A93A]'
                  : 'bg-[#C1502E] hover:bg-[#1F2A24] text-[#FBF6EF] shadow-md shadow-[#C1502E]/20'
              }`}
            >
              <span>{selectedVehicleId === currentVehicle.id ? 'SELECTED CLASS' : 'SELECT THIS VEHICLE'}</span>
            </button>
          </div>

          {/* Manual Carousel Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DCC8]/50">
            <span className="text-[10px] font-mono text-[#8A7A68] uppercase font-semibold">
              BASE RATE FROM €{currentVehicle.basePrice}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-[#E8DCC8] hover:bg-[#C1502E]/5 text-[#241C15] transition-colors"
                aria-label="Previous vehicle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1.5 px-1">
                {vehicles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'w-4 bg-[#C1502E]' : 'bg-[#E8DCC8]'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-[#E8DCC8] hover:bg-[#C1502E]/5 text-[#241C15] transition-colors"
                aria-label="Next vehicle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
