import React, { useState, useEffect } from 'react';
import { Car, Sparkles, ArrowDown } from 'lucide-react';
import Navbar from './components/Navbar';
import HomepageWidget from './components/HomepageWidget';
import ReservationModule from './components/ReservationModule';
import DestinationShowcaseCard from './components/DestinationShowcaseCard';
import VehicleShowcaseCard from './components/VehicleShowcaseCard';
import TrustStrip from './components/TrustStrip';
import SecondaryShowcase from './components/SecondaryShowcase';
import Reviews from './components/Reviews';
import PhoneMockups from './components/PhoneMockups';
import QuoteModal from './components/QuoteModal';
import { BookingType, BookingState } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'reserve'>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  
  // High fidelity booking states
  const [searchParams, setSearchParams] = useState({
    bookingType: 'airport' as BookingType,
    fromLocation: 'Agadir Airport (AGA)',
    toLocation: 'Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)',
    pickupDate: '',
    passengers: 2,
    price: 22
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState<'economic' | 'comfort' | 'minivan' | 'minibus'>('comfort');
  
  // General Booking Flow for phone screen simulation mockup
  const [bookingState, setBookingState] = useState<BookingState>({
    bookingType: 'airport',
    fromLocation: 'Agadir Airport (AGA)',
    toLocation: 'Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)',
    pickupDate: '',
    pickupTime: '14:30',
    passengers: 2,
    calculatedPrice: 22,
    isConfirmed: false,
    isBookingInProgress: false,
  });

  // Reference generated high quality images
  const coastlineHeroImg = '/src/assets/images/agadir_coastline_hero_1783778774951.jpg';
  const airportTaxiImg = '/src/assets/images/agadir_airport_taxi_1783778788704.jpg';

  // Hero background video: paste your hosted Kling/Cloudinary .mp4 URL here.
  // Previously this pointed to '/src/assets/images/kling_video.mp4', a file
  // that does not exist in this project, which made the hero video silently
  // fail to load (showing a black/frozen frame). Leave this empty until you
  // have a real hosted URL — the poster image below will show instead.
  const HERO_VIDEO_URL = '';

  // Smooth scrolling utility
  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top on page switches to ensure premium focus
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle homepage widget searches
  const handleHomepageSearchSubmit = (params: {
    bookingType: BookingType;
    fromLocation: string;
    toLocation: string;
    pickupDate: string;
    passengers: number;
    price: number;
  }) => {
    setSearchParams(params);
    // Suggest vehicle class automatically based on passenger count
    if (params.passengers > 8) {
      setSelectedVehicleId('minibus');
    } else if (params.passengers > 4) {
      setSelectedVehicleId('minivan');
    } else if (params.passengers === 4) {
      setSelectedVehicleId('comfort');
    } else {
      setSelectedVehicleId('economic');
    }
    
    // Seed general state for mockup
    setBookingState({
      bookingType: params.bookingType,
      fromLocation: params.fromLocation,
      toLocation: params.toLocation,
      pickupDate: params.pickupDate,
      pickupTime: '14:30',
      passengers: params.passengers,
      calculatedPrice: params.price,
      isConfirmed: false,
      isBookingInProgress: false,
    });

    setCurrentPage('reserve');
  };

  // Handle slide select from destination showcase card
  const handleBookRouteFromShowcase = (type: 'airport' | 'city' | 'long', to: string, price?: number) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    const from = type === 'airport' ? 'Agadir Airport (AGA)' : (type === 'city' ? 'Agadir City Center' : 'Agadir Hotel');
    const resolvedPrice = price || 22;
    
    setSearchParams({
      bookingType: type,
      fromLocation: from,
      toLocation: to,
      pickupDate: dateStr,
      passengers: 2,
      price: resolvedPrice
    });
    
    setSelectedVehicleId('comfort');

    // Seed general state for mockup
    setBookingState({
      bookingType: type,
      fromLocation: from,
      toLocation: to,
      pickupDate: dateStr,
      pickupTime: '14:30',
      passengers: 2,
      calculatedPrice: resolvedPrice,
      isConfirmed: false,
      isBookingInProgress: false,
    });

    setCurrentPage('reserve');
  };

  // Final confirmation from reservation page
  const handleFinalBookingConfirm = (details: any) => {
    setBookingState({
      bookingType: details.bookingType,
      fromLocation: details.fromLocation,
      toLocation: details.toLocation,
      pickupDate: details.pickupDate,
      pickupTime: details.pickupTime,
      passengers: details.passengers,
      calculatedPrice: details.price,
      isConfirmed: true,
      isBookingInProgress: false,
    });
    // Smooth scroll down to view tracking flow mockup
    setTimeout(() => {
      handleScrollTo('tracking-section');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1F2A24] text-[#FBF6EF] flex flex-col selection:bg-[#C1502E] selection:text-[#FBF6EF]">

      {/* PERSISTENT NAV — always visible at the top, sticky, transparent over
          the video so the logo/menu/WhatsApp are reachable immediately
          instead of only after scrolling past the whole hero */}
      <div id="nav-bar-container" className="sticky top-0 z-50 bg-[#1F2A24]/70 backdrop-blur-md">
        <Navbar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onScrollTo={handleScrollTo}
        />
      </div>

      {/* TIER 1 — Full-bleed banner (top of page, no card, no nav inside it) */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex flex-col justify-center items-center" id="hero">
        {/* Full-bleed video background, with a safe fallback to the poster
            image if no video URL is set yet, or if the video fails to load */}
        <div className="absolute inset-0 z-0">
          {HERO_VIDEO_URL && !videoFailed ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover brightness-[0.4] transition-all duration-[8000ms]"
              poster={coastlineHeroImg}
              onError={() => setVideoFailed(true)}
            >
              <source src={HERO_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <img
              src={coastlineHeroImg}
              alt="Agadir coastline"
              className="w-full h-full object-cover brightness-[0.4]"
            />
          )}
          {/* Authentic Moroccan Color Palette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A24]/90 via-[#1F2A24]/60 to-[#1F2A24]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24] via-transparent to-transparent" />
        </div>

        {/* Large bold headline directly on the video */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#FBF6EF] uppercase">
              YOUR RIDE
            </h1>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#E4A93A] uppercase">
              STARTS HERE
            </h2>
          </div>
          
          {/* Small script-style tagline */}
          <p className="font-script italic text-xl sm:text-2xl md:text-3xl text-[#FBF6EF]/95 tracking-wide font-medium">
            Explore Agadir your way.
          </p>

          {/* One CTA button: BOOK NOW */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => handleScrollTo('booking-panel')}
              className="px-8 py-4.5 rounded-full bg-[#E4A93A] text-[#1F2A24] font-display font-black text-xs md:text-sm tracking-widest uppercase hover:bg-[#C1502E] hover:text-[#FBF6EF] transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-[#E4A93A]/30 flex items-center space-x-2.5 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>BOOK NOW</span>
            </button>
          </div>
        </div>
      </section>

      {/* TIER 2 — Distinct card section (sitting on top of the page's cream/sand background) */}
      <section className="w-full bg-[#FBF6EF] pb-20 pt-1" id="booking-panel">
        
        {/* Slightly overlapping upward like a floating panel */}
        <div className="relative z-20 -mt-[12vh] sm:-mt-[15vh] max-w-7xl mx-auto px-4 md:px-8" id="reservation-top">
          <div className="bg-[#1F2A24] rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(31,42,36,0.5)] border border-[#E4A93A]/10 p-6 sm:p-8 md:p-10 lg:p-12 space-y-8">
            
            {/* Subtle Brand Message Strip inside the card */}
            <div className="bg-[#1F2A24]/90 rounded-xl py-2 px-4 text-center border border-[#E4A93A]/10">
              <p className="text-[10px] md:text-xs font-mono tracking-widest text-[#E4A93A] uppercase flex items-center justify-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#E4A93A]" />
                <span>OFFICIAL AGADIR AIRPORT TRANSFERS & SHUTTLES • PERMIT N° 1249/TP</span>
              </p>
            </div>

            {/* Inside this card: two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: Secondary Headline & Search Widget / Booking Module */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {currentPage === 'home' ? (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Tagline Badge */}
                    <div className="inline-block">
                      <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-[#E4A93A] bg-[#1F2A24]/90 border border-[#E4A93A]/20 px-4 py-2 rounded-full shadow-md">
                        Morocco's Five-Star Chauffeur Service
                      </span>
                    </div>

                    {/* Secondary Headline (Your Journey Starts Here style, keeping taxi copy) */}
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#FBF6EF] tracking-tight leading-tight uppercase">
                        Your Journey Starts Here
                      </h3>
                    </div>

                    {/* Taxi Copy */}
                    <p className="font-sans text-xs sm:text-sm text-[#FBF6EF]/80 max-w-lg leading-relaxed font-medium">
                      Private airport transfers and city rides across Agadir. Fixed price, no surprises. Experience luxury coast drives, tracked flight waitings, and certified professional drivers.
                    </p>

                    {/* Search Widget */}
                    <div className="pt-2 max-w-xl">
                      <HomepageWidget onSearchSubmit={handleHomepageSearchSubmit} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Back to Homepage Breadcrumb */}
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="text-xs font-mono text-[#E4A93A] hover:text-[#C1502E] flex items-center gap-1.5 transition-colors uppercase font-bold"
                    >
                      ← BACK TO HOMEPAGE
                    </button>

                    {/* Secondary Headline */}
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#FBF6EF] tracking-tight leading-tight uppercase">
                        Reserve Your Private Ride
                      </h3>
                    </div>

                    {/* Taxi Copy */}
                    <p className="font-sans text-xs sm:text-sm text-[#FBF6EF]/80 max-w-lg leading-relaxed font-medium">
                      Confirm your pickup details below — instant price, no hidden fees. All bookings feature automatic flight-synchronization and luxury climate-controlled cabins.
                    </p>

                    {/* Main Booking Module */}
                    <div className="pt-2 w-full">
                      <ReservationModule 
                        initialType={searchParams.bookingType}
                        initialFrom={searchParams.fromLocation}
                        initialTo={searchParams.toLocation}
                        initialDate={searchParams.pickupDate}
                        initialPassengers={searchParams.passengers}
                        initialPrice={searchParams.price}
                        selectedVehicleId={selectedVehicleId}
                        onVehicleSelected={setSelectedVehicleId}
                        onConfirmBooking={handleFinalBookingConfirm}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Destination or Vehicle Showcase with carousel arrows and rating badge */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end items-start pt-2">
                {currentPage === 'home' ? (
                  <div className="animate-fadeIn w-full flex justify-center">
                    <DestinationShowcaseCard onBookRoute={handleBookRouteFromShowcase} />
                  </div>
                ) : (
                  <div className="animate-fadeIn w-full flex justify-center">
                    <VehicleShowcaseCard 
                      selectedVehicleId={selectedVehicleId} 
                      onSelectVehicle={setSelectedVehicleId} 
                    />
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Scroll Indicator (Only shown on Homepage) */}
        {currentPage === 'home' && (
          <div className="absolute bottom-6 left-0 right-0 w-full flex justify-center z-20 animate-bounce">
            <button 
              onClick={() => handleScrollTo('trust-strip')}
              className="p-2.5 rounded-full border border-[#1F2A24]/20 hover:border-[#E4A93A] text-[#1F2A24] hover:text-[#E4A93A] transition-colors bg-white/40 shadow-sm"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </section>

      {/* 4. TRUST STRIP BADGES (Identical on both pages for consistency) */}
      <section className="w-full relative z-20 border-t border-[#E8DCC8]/10" id="trust-strip">
        <TrustStrip />
      </section>

      {/* 5. HOMEPAGE SECONDARY DETAILS (Only rendered on HomePage to keep Reservation Page ultra-clean, or rendered as modular panels) */}
      {currentPage === 'home' && (
        <>
          {/* Secondary Tours & Transfer Carousel */}
          <section className="w-full bg-[#1F2A24]" id="showcase">
            <SecondaryShowcase 
              onSelectRoute={handleBookRouteFromShowcase}
              airportTaxiImg={airportTaxiImg}
              coastlineHeroImg={coastlineHeroImg}
            />
          </section>

          {/* Customer Reviews Section */}
          <section className="w-full border-t border-[#E8DCC8]/5" id="reviews">
            <Reviews />
          </section>
        </>
      )}

      {/* 6. COHESIVE PHONE RIDE STATUS SECTION */}
      <section className="w-full bg-[#1F2A24] border-t border-[#E8DCC8]/5" id="tracking-section">
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#E4A93A] uppercase bg-[#1F2A24]/90 px-3 py-1.5 border border-[#E4A93A]/10 rounded-full">
              Real-Time Flight & Ride Status
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#FBF6EF]">
              Synchronized Chauffeur Dispatch
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8A7A68]">
              Your driver automatically monitors your flight details. See how your dispatch coordinates in the simulation tracker below once you confirm a reservation.
            </p>
          </div>
          <PhoneMockups bookingState={bookingState} />
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-[#121A16] border-t border-[#E4A93A]/15 py-12 px-4 md:px-8 text-xs text-[#8A7A68]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-[#C1502E] text-[#FBF6EF]">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-[#FBF6EF]">
                Agadir<span className="text-[#E4A93A]">Driver</span>.com
              </span>
            </div>
            <p className="font-sans text-xs text-[#8A7A68] leading-relaxed">
              Professional, fully-licensed, and permitted private tourist airport transport partner in Agadir, Morocco. Connecting travelers seamlessly with luxury beach hotels, Riads, and world-class surf villages.
            </p>
          </div>

          <div className="col-span-1">
            <h6 className="font-display font-bold text-[#FBF6EF] uppercase tracking-wider mb-4">Transfer Hubs</h6>
            <ul className="space-y-2 font-sans text-xs">
              <li><button onClick={() => { setCurrentPage('reserve'); handleScrollTo('reservation-top'); }} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Agadir Al Massira Airport (AGA)</button></li>
              <li><button onClick={() => { setCurrentPage('reserve'); handleScrollTo('reservation-top'); }} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Taghazout Bay Surf Coast Shuttles</button></li>
              <li><button onClick={() => { setCurrentPage('reserve'); handleScrollTo('reservation-top'); }} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Marrakech Imperial Transfers</button></li>
              <li><button onClick={() => { setCurrentPage('reserve'); handleScrollTo('reservation-top'); }} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Imsouane Beach Surf Shuttles</button></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h6 className="font-display font-bold text-[#FBF6EF] uppercase tracking-wider mb-4">Moroccan Hotspots</h6>
            <ul className="space-y-2 font-sans text-xs">
              <li><button onClick={() => handleBookRouteFromShowcase('airport', 'Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)', 22)} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Riu Palace Tikida Agadir</button></li>
              <li><button onClick={() => handleBookRouteFromShowcase('airport', 'Taghazout Bay / Surf Villages', 35)} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Fairmont Taghazout Bay</button></li>
              <li><button onClick={() => handleBookRouteFromShowcase('city', 'Paradise Valley (Atlas Foothills)', 40)} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Paradise Valley Rock Pools</button></li>
              <li><button onClick={() => handleBookRouteFromShowcase('airport', 'Marrakech City Centre / Medina', 110)} className="hover:text-[#E4A93A] text-[#8A7A68]/85 text-left transition-colors">Marrakech Medina & Souks</button></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-1">
            <h6 className="font-display font-bold text-[#FBF6EF] uppercase tracking-wider mb-4">Moroccan Dispatch Office</h6>
            <p className="font-sans text-xs leading-relaxed text-[#8A7A68]">
              Agadir Al Massira (AGA) Airport Terminal Road,<br />
              Agadir, Morocco 80000<br />
              Phone/WhatsApp: <strong className="text-[#E4A93A]">+212 661-234567</strong><br />
              Email: support@agadirdriver.com
            </p>
            <div className="flex space-x-3 text-[#E4A93A] font-mono text-[9px] font-bold">
              <span>Licensed Carrier</span>
              <span>•</span>
              <span>Active 24 Hours</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <p>© 2026 AgadirDriver.com. All rights reserved. Made for premium beach & surf travelers.</p>
          <div className="flex space-x-4">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-[#E4A93A]">Terms of Ride</button>
            <span>•</span>
            <button onClick={() => handleScrollTo('hero')} className="hover:text-[#E4A93A]">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleScrollTo('hero')} className="hover:text-[#E4A93A]">Legal Imprint</button>
          </div>
        </div>
      </footer>

      {/* 8. CUSTOM QUOTE REQUEST MODAL */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

    </div>
  );
}
