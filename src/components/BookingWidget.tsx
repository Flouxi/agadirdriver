import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Users, ArrowRight, CheckCircle2, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';
import { BookingType, BookingState } from '../types';

interface BookingWidgetProps {
  onBookingUpdate: (state: BookingState) => void;
  bookingState: BookingState;
}

// Fixed pricing database for authentic Agadir routes
const ROUTES_DB = {
  airport: [
    { to: "Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)", price: 22, distance: "24 km", duration: "30 mins" },
    { to: "Taghazout Bay / Surf Villages", price: 35, distance: "42 km", duration: "45 mins" },
    { to: "Tamraght / Banana Village", price: 30, distance: "36 km", duration: "40 mins" },
    { to: "Imsouane Beach (Surf Bay)", price: 55, distance: "90 km", duration: "1h 30m" },
    { to: "Marrakech City Centre / Medina", price: 110, distance: "250 km", duration: "2h 45m" },
    { to: "Taroudant (The Walled City)", price: 60, distance: "80 km", duration: "1h 10m" },
    { to: "Mirleft / Legzira Beach", price: 85, distance: "140 km", duration: "2h" }
  ],
  city: [
    { to: "Agadir Marina & Beach Promenade", price: 10, distance: "5 km", duration: "10 mins" },
    { to: "Souk El Had (Local Grand Market)", price: 8, distance: "4 km", duration: "8 mins" },
    { to: "Agadir Oufella Kasbah (Cable Car)", price: 12, distance: "8 km", duration: "15 mins" },
    { to: "Crocopark Agadir", price: 15, distance: "14 km", duration: "20 mins" },
    { to: "Paradise Valley (Atlas Foothills)", price: 40, distance: "34 km", duration: "50 mins" }
  ],
  long: [
    { to: "Marrakech Menara Airport (RAK)", price: 120, distance: "255 km", duration: "2h 50m" },
    { to: "Essaouira Port & Historic Medina", price: 90, distance: "175 km", duration: "2h 30m" },
    { to: "Tafraout (Anti-Atlas Painted Rocks)", price: 95, distance: "160 km", duration: "2h 40m" },
    { to: "Casablanca Mohammed V Airport (CMN)", price: 220, distance: "460 km", duration: "4h 30m" }
  ]
};

export default function BookingWidget({ onBookingUpdate, bookingState }: BookingWidgetProps) {
  const [activeTab, setActiveTab] = useState<BookingType>('airport');
  const [fromLoc, setFromLoc] = useState("Agadir Airport (AGA)");
  const [toLoc, setToLoc] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [showRoutesDropdown, setShowRoutesDropdown] = useState(false);
  const [priceResult, setPriceResult] = useState<number | null>(null);
  const [durationStr, setDurationStr] = useState("");
  const [distanceStr, setDistanceStr] = useState("");

  // Initialize dates with safe defaults
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // tomorrow
    const tomorrowStr = today.toISOString().split('T')[0];
    setPickupDate(tomorrowStr);
    setPickupTime("14:30");
  }, []);

  // Update starting location automatically based on tabs
  useEffect(() => {
    if (activeTab === 'airport') {
      setFromLoc("Agadir Airport (AGA)");
      const defaultDest = ROUTES_DB.airport[0];
      setToLoc(defaultDest.to);
      calculateInstantPrice('airport', defaultDest.to, passengers);
    } else if (activeTab === 'city') {
      setFromLoc("Agadir City Center / Marina");
      const defaultDest = ROUTES_DB.city[0];
      setToLoc(defaultDest.to);
      calculateInstantPrice('city', defaultDest.to, passengers);
    } else {
      setFromLoc("Agadir Hotel / Riad");
      const defaultDest = ROUTES_DB.long[0];
      setToLoc(defaultDest.to);
      calculateInstantPrice('long', defaultDest.to, passengers);
    }
    // Reset confirmation status upon tab change to allow re-booking
    if (bookingState.isConfirmed) {
      onBookingUpdate({
        ...bookingState,
        isConfirmed: false
      });
    }
  }, [activeTab]);

  const calculateInstantPrice = (type: BookingType, destination: string, passengerCount: number) => {
    const routes = ROUTES_DB[type];
    const match = routes.find(r => r.to === destination);
    if (match) {
      // Calculate multiplier for vehicles (Minivan for > 4 passengers)
      const basePrice = match.price;
      const finalPrice = passengerCount > 4 ? basePrice + 12 : basePrice; // minivans add small surcharge
      setPriceResult(finalPrice);
      setDurationStr(match.duration);
      setDistanceStr(match.distance);

      // Keep parent app in sync
      onBookingUpdate({
        ...bookingState,
        bookingType: type,
        fromLocation: type === 'airport' ? "Agadir Airport (AGA)" : (type === 'city' ? "Agadir City Center" : "Agadir Hotel"),
        toLocation: destination,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        passengers: passengerCount,
        calculatedPrice: finalPrice,
      });
    }
  };

  const handleDestinationSelect = (dest: string) => {
    setToLoc(dest);
    setShowRoutesDropdown(false);
    calculateInstantPrice(activeTab, dest, passengers);
  };

  const handlePassengersChange = (val: number) => {
    setPassengers(val);
    calculateInstantPrice(activeTab, toLoc, val);
  };

  const handleDateChange = (val: string) => {
    setPickupDate(val);
    onBookingUpdate({ ...bookingState, pickupDate: val });
  };

  const handleTimeChange = (val: string) => {
    setPickupTime(val);
    onBookingUpdate({ ...bookingState, pickupTime: val });
  };

  const handleGetPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toLoc) return;

    onBookingUpdate({
      ...bookingState,
      isBookingInProgress: true
    });

    // Simulate luxury Moroccan pricing engine check
    setTimeout(() => {
      const routes = ROUTES_DB[activeTab];
      const match = routes.find(r => r.to === toLoc);
      const basePrice = match ? match.price : 25;
      const finalPrice = passengers > 4 ? basePrice + 12 : basePrice;

      setPriceResult(finalPrice);
      onBookingUpdate({
        ...bookingState,
        bookingType: activeTab,
        fromLocation: fromLoc,
        toLocation: toLoc,
        pickupDate,
        pickupTime,
        passengers,
        calculatedPrice: finalPrice,
        isBookingInProgress: false
      });
    }, 700);
  };

  const handleInstantConfirm = () => {
    onBookingUpdate({
      ...bookingState,
      isConfirmed: true
    });
  };

  // Generate WhatsApp text for direct messaging
  const getWhatsAppLink = () => {
    const text = `Hello AgadirDriver.com! I would like to book a private transfer:%0A%0A` +
      `*Type:* ${activeTab === 'airport' ? 'Airport Transfer' : activeTab === 'city' ? 'City Ride' : 'Long Distance'}%0A` +
      `*From:* ${fromLoc}%0A` +
      `*To:* ${toLoc}%0A` +
      `*Date:* ${pickupDate}%0A` +
      `*Time:* ${pickupTime}%0A` +
      `*Passengers:* ${passengers} (${passengers > 4 ? 'Minivan' : 'Sedan'})%0A` +
      `*Quoted Price:* €${priceResult}%0A%0A` +
      `Please confirm availability. Thank you!`;
    return `https://wa.me/212661234567?text=${text}`;
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto glass-light rounded-3xl shadow-2xl p-6 md:p-8 border border-primary-terracotta/10 relative z-30"
      id="booking-widget"
    >
      {/* Tab Switcher - Pill Style */}
      <div className="flex bg-dark-sky/5 p-1.5 rounded-full mb-8 max-w-md mx-auto border border-primary-terracotta/5">
        {(['airport', 'city', 'long'] as BookingType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs md:text-sm font-display font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
              activeTab === tab
                ? 'bg-primary-terracotta text-warm-sand shadow-lg shadow-primary-terracotta/25'
                : 'text-charcoal-text/70 hover:text-primary-terracotta hover:bg-primary-terracotta/5'
            }`}
          >
            {tab === 'airport' ? 'Airport Transfer' : tab === 'city' ? 'City Ride' : 'Long Distance'}
          </button>
        ))}
      </div>

      <form onSubmit={handleGetPriceSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FROM FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold font-display uppercase tracking-widest text-muted-brown flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-terracotta" /> Pickup Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={fromLoc}
                disabled
                className="w-full px-4 py-3.5 bg-dark-sky/5 rounded-xl text-sm font-sans font-medium text-charcoal-text/80 border border-primary-terracotta/10 cursor-not-allowed"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-primary-terracotta/10 text-primary-terracotta px-2 py-0.5 rounded">
                FIXED
              </span>
            </div>
          </div>

          {/* TO FIELD */}
          <div className="flex flex-col space-y-1.5 relative">
            <label className="text-[11px] font-bold font-display uppercase tracking-widest text-muted-brown flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-secondary-gold" /> Destination
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoutesDropdown(!showRoutesDropdown)}
                className="w-full text-left px-4 py-3.5 bg-white rounded-xl text-sm font-sans font-semibold text-charcoal-text border border-primary-terracotta/15 hover:border-secondary-gold transition-all duration-200 flex items-center justify-between"
              >
                <span className="truncate">{toLoc || "Select Destination..."}</span>
                <span className="text-xs text-secondary-gold font-bold">▾</span>
              </button>

              {showRoutesDropdown && (
                <div className="absolute top-full left-0 w-full bg-white mt-1.5 rounded-xl shadow-2xl border border-primary-terracotta/10 z-40 max-h-60 overflow-y-auto p-1.5">
                  <div className="text-[10px] text-muted-brown font-semibold font-display uppercase tracking-widest px-3 py-1.5 border-b border-dark-sky/5 mb-1">
                    Popular Routes
                  </div>
                  {ROUTES_DB[activeTab].map((r) => (
                    <button
                      key={r.to}
                      type="button"
                      onClick={() => handleDestinationSelect(r.to)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-sans font-medium hover:bg-primary-terracotta/5 text-charcoal-text hover:text-primary-terracotta flex items-center justify-between transition-colors"
                    >
                      <span className="truncate pr-2">{r.to}</span>
                      <span className="text-secondary-gold font-bold shrink-0">€{passengers > 4 ? r.price + 12 : r.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PICKUP DATE & TIME */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold font-display uppercase tracking-widest text-muted-brown flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary-terracotta" /> Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => handleDateChange(e.target.value)}
                required
                className="w-full px-3 py-3.5 bg-white rounded-xl text-sm font-sans font-medium text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold font-display uppercase tracking-widest text-muted-brown flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary-terracotta" /> Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                required
                className="w-full px-3 py-3.5 bg-white rounded-xl text-sm font-sans font-medium text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold"
              />
            </div>
          </div>

          {/* PASSENGERS FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold font-display uppercase tracking-widest text-muted-brown flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-secondary-gold" /> Passengers
            </label>
            <div className="flex items-center bg-white rounded-xl border border-primary-terracotta/15 p-1">
              <button
                type="button"
                onClick={() => handlePassengersChange(Math.max(1, passengers - 1))}
                className="w-10 h-10 flex items-center justify-center text-charcoal-text hover:bg-primary-terracotta/5 rounded-lg font-bold text-lg"
              >
                -
              </button>
              <span className="flex-1 text-center font-mono text-sm font-bold text-charcoal-text">
                {passengers} {passengers > 4 ? '🚐' : '🚗'}
              </span>
              <button
                type="button"
                onClick={() => handlePassengersChange(Math.min(8, passengers + 1))}
                className="w-10 h-10 flex items-center justify-center text-charcoal-text hover:bg-primary-terracotta/5 rounded-lg font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Vehicle Info based on Passenger Selection */}
        <div className="flex items-center space-x-3 bg-primary-terracotta/5 border border-primary-terracotta/10 rounded-2xl p-4">
          <div className="text-2xl">
            {passengers > 4 ? '🚐' : '🚗'}
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-terracotta font-display">
              Vehicle Type Assigned: {passengers > 4 ? 'Private Luxury Minivan' : 'Private Comfort Sedan'}
            </div>
            <div className="text-[11px] text-muted-brown font-sans">
              {passengers > 4 
                ? 'Spacious multi-passenger minivan (up to 8 passengers + large baggage). Ideal for families/surf gear.' 
                : 'Premium standard sedan (Skoda Superb, Mercedes C-Class or similar). Fits up to 4 passengers.'
              }
            </div>
          </div>
          {distanceStr && (
            <div className="text-right hidden sm:block">
              <span className="block font-mono text-xs font-semibold text-charcoal-text">Est. {distanceStr}</span>
              <span className="block text-[10px] text-muted-brown font-medium">Time: {durationStr}</span>
            </div>
          )}
        </div>

        {/* Submission / Price Presentation */}
        <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex-1">
            {priceResult !== null ? (
              <div className="animate-fadeIn">
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-brown font-display">
                  Guaranteed Fixed Price
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl md:text-4xl font-display font-extrabold text-primary-terracotta">
                    €{priceResult}
                  </span>
                  <span className="text-sm font-sans font-medium text-muted-brown">
                    all-inclusive, no hidden surcharges
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs font-sans text-muted-brown italic">
                Select your route and passenger count to view the guaranteed price instantly.
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:w-auto w-full">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-primary-terracotta hover:bg-dark-sky text-warm-sand font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary-terracotta/20 flex items-center justify-center space-x-2"
              id="get-price-btn"
            >
              {bookingState.isBookingInProgress ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CALCULATING...</span>
                </>
              ) : (
                <>
                  <span>GET QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Drawer - Shown when pricing is active */}
      {priceResult !== null && (
        <div className="mt-8 border-t border-primary-terracotta/10 pt-6 animate-slideUp flex flex-col md:flex-row items-center justify-between bg-white/50 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 md:p-8 rounded-b-3xl gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-secondary-gold/10 text-secondary-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-charcoal-text font-display">
                Ready to confirm your ride?
              </div>
              <div className="text-xs text-muted-brown font-sans">
                Book instantly below to sync with the simulated ride flow.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* Real confirmation link */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-[#25D366]/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>BOOK VIA WHATSAPP</span>
            </a>

            {/* Instant UI confirmation */}
            <button
              type="button"
              onClick={handleInstantConfirm}
              className={`flex-1 md:flex-initial px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                bookingState.isConfirmed 
                  ? 'bg-secondary-gold text-dark-sky border border-secondary-gold cursor-default' 
                  : 'bg-dark-sky text-warm-sand hover:bg-primary-terracotta hover:text-warm-sand border border-dark-sky'
              }`}
            >
              {bookingState.isConfirmed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BOOKED SUCCESSFULLY!</span>
                </>
              ) : (
                <span>BOOK INSTANTLY (DEMO)</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
