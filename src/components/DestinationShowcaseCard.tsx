import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Compass, ArrowRight } from 'lucide-react';

interface DestinationSlide {
  title: string;
  category: string;
  price: number;
  image: string;
  rating: string;
  reviewsCount: string;
  description: string;
  routeType: 'airport' | 'city' | 'long';
  toLocation: string;
}

interface DestinationShowcaseCardProps {
  onBookRoute: (type: 'airport' | 'city' | 'long', to: string, price: number) => void;
}

export default function DestinationShowcaseCard({ onBookRoute }: DestinationShowcaseCardProps) {
  const slides: DestinationSlide[] = [
    {
      title: "Agadir Al Massira Airport",
      category: "Airport Transfer",
      price: 22,
      image: "/src/assets/images/agadir_airport_taxi_1783778788704.jpg",
      rating: "4.9",
      reviewsCount: "184 reviews",
      description: "Direct premium transfer from Al Massira arrivals hall straight to your beach resort or hotel.",
      routeType: "airport",
      toLocation: "Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)"
    },
    {
      title: "Taghazout Bay Surf Villages",
      category: "Coastal Shuttle",
      price: 35,
      image: "/src/assets/images/agadir_coastline_hero_1783778774951.jpg",
      rating: "5.0",
      reviewsCount: "96 reviews",
      description: "Scenic private ride along the northern coastline to the premier surf spots, Riads, and Taghazout resorts.",
      routeType: "airport",
      toLocation: "Taghazout Bay / Surf Villages"
    },
    {
      title: "Marrakech Imperial City",
      category: "Long Distance Express",
      price: 110,
      image: "/src/assets/images/agadir_coastline_hero_1783778774951.jpg", // with warm theme overlay
      rating: "4.9",
      reviewsCount: "112 reviews",
      description: "Comfortable high-speed highway transfer across the High Atlas mountains to Marrakech Medina.",
      routeType: "airport",
      toLocation: "Marrakech City Centre / Medina"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto cycle slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div className="w-full max-w-[440px] mx-auto" id="showcase-card">
      <div className="bg-[#FBF6EF] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(31,42,36,0.35)] overflow-hidden border border-[#E8DCC8] flex flex-col transition-all duration-500">
        
        {/* Photo Container */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden group">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Golden/Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#241C15]/75 via-[#241C15]/10 to-transparent" />
          
          {/* Top Pill - Category */}
          <div className="absolute top-5 left-5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1F2A24]/90 backdrop-blur-md border border-[#E4A93A]/30 text-[10px] font-bold font-display uppercase tracking-widest text-[#E4A93A] shadow-md">
              {currentSlide.category}
            </span>
          </div>

          {/* Top Right - Rating Badge */}
          <div className="absolute top-5 right-5">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FBF6EF] text-[#241C15] text-xs font-bold font-display shadow-lg">
              <Star className="w-3.5 h-3.5 text-[#E4A93A] fill-[#E4A93A]" />
              {currentSlide.rating} ★
            </span>
          </div>

          {/* Location Title Overlaid on bottom of image */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#E4A93A]">
              <Compass className="w-3 h-3" />
              <span>MOROCCO DESTINATIONS</span>
            </div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#FBF6EF] mt-1 leading-tight drop-shadow">
              {currentSlide.title}
            </h3>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-4">
          
          {/* Price Tag Line & Highlight */}
          <div className="flex items-baseline justify-between border-b border-[#E8DCC8] pb-3">
            <div className="text-[11px] font-bold font-display uppercase tracking-widest text-[#8A7A68]">
              Fixed Route Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#C1502E] font-display">
                from €{currentSlide.price}
              </span>
              <span className="text-[10px] text-[#8A7A68] font-semibold">/ All-Inc</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#241C15]/85 leading-relaxed font-sans h-12 overflow-hidden">
            {currentSlide.description}
          </p>

          {/* Bottom Interactive Block: Book Route Action */}
          <div className="pt-2">
            <button
              onClick={() => onBookRoute(currentSlide.routeType, currentSlide.toLocation, currentSlide.price)}
              className="w-full py-4 px-6 rounded-2xl bg-[#C1502E] hover:bg-[#1F2A24] text-[#FBF6EF] font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg shadow-[#C1502E]/20"
            >
              <span>BOOK THIS ROUTE</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Carousel Manual Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DCC8]/50">
            <span className="text-[10px] font-mono text-[#8A7A68] uppercase font-semibold">
              Verified {currentSlide.reviewsCount}
            </span>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-[#E8DCC8] hover:bg-[#C1502E]/5 text-[#241C15] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Carousel Indicators */}
              <div className="flex items-center gap-1.5 px-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
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
                aria-label="Next slide"
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
