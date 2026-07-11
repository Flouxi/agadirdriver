import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Car, Compass, Clock, CheckCircle } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  reviews: string;
  description: string;
  image: string;
  tag: string;
  type: 'airport' | 'city' | 'long';
  toLocation: string;
}

interface SecondaryShowcaseProps {
  onSelectRoute: (type: 'airport' | 'city' | 'long', to: string) => void;
  airportTaxiImg: string; // pre-generated image
  coastlineHeroImg: string; // pre-generated image
}

export default function SecondaryShowcase({ onSelectRoute, airportTaxiImg, coastlineHeroImg }: SecondaryShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items: ShowcaseItem[] = [
    {
      id: '1',
      title: 'Agadir Airport Transfer',
      subtitle: 'To Agadir Beach Hotels',
      price: 'From €22',
      rating: '4.9',
      reviews: '178+ reviews',
      description: 'Private door-to-door shuttle. Includes flight tracking, sign meet-and-greet in Arrivals, and zero wait time.',
      image: airportTaxiImg,
      tag: 'MOST POPULAR',
      type: 'airport',
      toLocation: 'Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)'
    },
    {
      id: '2',
      title: 'Taghazout Surf Transfer',
      subtitle: 'Coastline Surf Villages',
      price: 'From €35',
      rating: '4.9',
      reviews: '85+ reviews',
      description: 'Comfortable private minivan with surfboard racks. Perfect for surf crews heading to Taghazout, Tamraght, or Anchor Point.',
      image: coastlineHeroImg,
      tag: 'COASTAL RIDE',
      type: 'airport',
      toLocation: 'Taghazout Bay / Surf Villages'
    },
    {
      id: '3',
      title: 'Paradise Valley Day Trip',
      subtitle: 'Atlas Mountain Gorge Pools',
      price: 'From €40',
      rating: '4.8',
      reviews: '62+ reviews',
      description: 'Day outing with roundtrip private driver, scenic stops at argan cooperatives, and 3-hour wait while you swim and hike.',
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80', // Beautiful Moroccan town/desert gorge
      tag: 'POPULAR EXCURSION',
      type: 'city',
      toLocation: 'Paradise Valley (Atlas Foothills)'
    },
    {
      id: '4',
      title: 'Marrakech Highway Cruiser',
      subtitle: 'Direct Intercity Transfer',
      price: 'From €110',
      rating: '5.0',
      reviews: '46+ reviews',
      description: 'Luxury sedan highway transfer connecting Agadir to Marrakech. Premium air conditioning, complimentary bottled water, and high-speed WiFi.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', // Moroccan riad/Medina highway vibe
      tag: 'LONG DISTANCE',
      type: 'airport',
      toLocation: 'Marrakech City Centre / Medina'
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div 
      className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 py-16 md:px-8 border-b border-secondary-gold/10"
      id="showcase"
    >
      {/* Left Column: Context & Copy */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary-terracotta/10 border border-primary-terracotta/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary-terracotta uppercase tracking-wider">
          <Compass className="w-4.5 h-4.5 animate-spin-slow" />
          <span>AGADIR'S PREMIER TRANSFER</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-warm-sand tracking-tight leading-tight">
          YOUR JOURNEY <br />
          <span className="text-secondary-gold">STARTS HERE</span>
        </h2>

        <p className="font-sans text-base text-warm-sand/80 leading-relaxed">
          Arrive in comfort and style. Whether you are landing at Agadir Al Massira Airport, heading down to the surf breaks in Taghazout, or planning a custom day-trip into the Atlas Mountains, we guarantee premium service and fixed, uninflated prices.
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-3 text-sm text-warm-sand/90">
            <CheckCircle className="w-5 h-5 text-secondary-gold shrink-0" />
            <span>Guaranteed english/french speaking professional drivers</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-warm-sand/90">
            <CheckCircle className="w-5 h-5 text-secondary-gold shrink-0" />
            <span>No extra charges for delayed flights (we track arrivals)</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-warm-sand/90">
            <CheckCircle className="w-5 h-5 text-secondary-gold shrink-0" />
            <span>Clean, modern vehicles with air conditioning & leather seats</span>
          </div>
        </div>

        {/* Carousel controls embedded nicely */}
        <div className="flex items-center space-x-4 pt-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-secondary-gold/20 flex items-center justify-center text-warm-sand hover:bg-secondary-gold hover:text-dark-sky hover:border-secondary-gold transition-all duration-300"
            aria-label="Previous destination"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-secondary-gold/20 flex items-center justify-center text-warm-sand hover:bg-secondary-gold hover:text-dark-sky hover:border-secondary-gold transition-all duration-300"
            aria-label="Next destination"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs text-muted-brown">
            0{currentIndex + 1} / 0{items.length}
          </span>
        </div>
      </div>

      {/* Right Column: Large Carousel Card */}
      <div className="lg:col-span-7">
        <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-secondary-gold/10 bg-dark-sky aspect-[4/3] md:aspect-[16/10] transition-all duration-500">
          
          {/* Image */}
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            referrerPolicy="no-referrer"
          />

          {/* Gradients Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-sky via-dark-sky/20 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-sky/40 to-transparent" />

          {/* Rating Badge Top-Right */}
          <div className="absolute top-4 right-4 bg-dark-sky/80 backdrop-filter backdrop-blur-md px-3.5 py-1.5 rounded-full border border-secondary-gold/20 flex items-center space-x-1.5">
            <Star className="w-3.5 h-3.5 text-secondary-gold fill-current" />
            <span className="font-mono text-xs font-bold text-warm-sand">{currentItem.rating}</span>
            <span className="font-mono text-[9px] text-muted-brown">({currentItem.reviews})</span>
          </div>

          {/* Label Tag Top-Left */}
          <div className="absolute top-4 left-4 bg-primary-terracotta px-3 py-1 rounded-md text-[10px] font-bold font-display uppercase tracking-widest text-warm-sand">
            {currentItem.tag}
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3.5">
            <div>
              <p className="text-secondary-gold font-mono text-xs font-semibold uppercase tracking-wider mb-0.5">
                {currentItem.subtitle}
              </p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl md:text-3xl font-display font-extrabold text-warm-sand">
                  {currentItem.title}
                </h3>
                <span className="text-lg md:text-2xl font-display font-bold text-primary-terracotta bg-warm-sand/90 px-3 py-1 rounded-xl">
                  {currentItem.price}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-warm-sand/80 font-sans leading-relaxed line-clamp-2 md:line-clamp-none">
              {currentItem.description}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-muted-brown">
                <Clock className="w-3.5 h-3.5 text-secondary-gold" />
                <span>Instant Booking · Free Cancellation</span>
              </div>
              
              <button
                onClick={() => onSelectRoute(currentItem.type, currentItem.toLocation)}
                className="px-5 py-2.5 rounded-xl bg-secondary-gold text-dark-sky font-display font-bold text-xs tracking-wider uppercase hover:bg-primary-terracotta hover:text-warm-sand transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-secondary-gold/10"
              >
                <span>BOOK THIS</span>
                <Car className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
