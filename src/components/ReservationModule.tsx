import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Users, ShieldCheck, CreditCard, Banknote, RefreshCw, CheckCircle } from 'lucide-react';
import { BookingType } from '../types';

interface ReservationModuleProps {
  initialType?: BookingType;
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  initialPassengers?: number;
  initialPrice?: number;
  onVehicleSelected: (vehicleId: 'economic' | 'comfort' | 'minivan' | 'minibus') => void;
  selectedVehicleId: 'economic' | 'comfort' | 'minivan' | 'minibus';
  onConfirmBooking: (bookingDetails: any) => void;
}

const ROUTES_DB = {
  airport: [
    { to: "Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)", price: 22 },
    { to: "Taghazout Bay / Surf Villages", price: 35 },
    { to: "Tamraght / Banana Village", price: 30 },
    { to: "Imsouane Beach (Surf Bay)", price: 55 },
    { to: "Marrakech City Centre / Medina", price: 110 },
    { to: "Taroudant (The Walled City)", price: 60 },
    { to: "Mirleft / Legzira Beach", price: 85 }
  ],
  city: [
    { to: "Agadir Marina & Beach Promenade", price: 10 },
    { to: "Souk El Had (Local Grand Market)", price: 8 },
    { to: "Agadir Oufella Kasbah (Cable Car)", price: 12 },
    { to: "Crocopark Agadir", price: 15 },
    { to: "Paradise Valley (Atlas Foothills)", price: 40 }
  ],
  long: [
    { to: "Marrakech Menara Airport (RAK)", price: 120 },
    { to: "Essaouira Port & Historic Medina", price: 90 },
    { to: "Tafraout (Anti-Atlas Painted Rocks)", price: 95 },
    { to: "Casablanca Mohammed V Airport (CMN)", price: 220 }
  ]
};

export default function ReservationModule({
  initialType = 'airport',
  initialFrom = "Agadir Airport (AGA)",
  initialTo = "",
  initialDate = "",
  initialPassengers = 2,
  initialPrice = 22,
  onVehicleSelected,
  selectedVehicleId,
  onConfirmBooking
}: ReservationModuleProps) {
  const [activeTab, setActiveTab] = useState<BookingType>(initialType);
  const [fromLoc, setFromLoc] = useState(initialFrom);
  const [toLoc, setToLoc] = useState(initialTo);
  const [pickupDate, setPickupDate] = useState(initialDate);
  const [pickupTime, setPickupTime] = useState("14:30");
  const [passengers, setPassengers] = useState(initialPassengers);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('cash');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Sync with initial state once on mount/change
  useEffect(() => {
    setActiveTab(initialType);
    setFromLoc(initialFrom);
    setPassengers(initialPassengers);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPickupDate(initialDate || tomorrow.toISOString().split('T')[0]);

    const routes = ROUTES_DB[initialType];
    const defaultTo = initialTo || (routes.length > 0 ? routes[0].to : "");
    setToLoc(defaultTo);
  }, [initialType, initialFrom, initialTo, initialDate, initialPassengers]);

  // Adjust starting location when tab updates manually
  useEffect(() => {
    const routes = ROUTES_DB[activeTab];
    if (activeTab === 'airport') {
      setFromLoc("Agadir Airport (AGA)");
    } else if (activeTab === 'city') {
      setFromLoc("Agadir City Center");
    } else {
      setFromLoc("Agadir Hotel / Riad");
    }
    
    // Select first route as fallback if current destination is not in list
    const hasDest = routes.some(r => r.to === toLoc);
    if (!hasDest && routes.length > 0) {
      setToLoc(routes[0].to);
    }
  }, [activeTab]);

  // Handle passenger updates and suggest vehicle sizes automatically
  const handlePassengersChange = (val: number) => {
    setPassengers(val);
    if (val > 8) {
      onVehicleSelected('minibus');
    } else if (val > 4) {
      onVehicleSelected('minivan');
    } else if (val === 4) {
      onVehicleSelected('comfort');
    } else {
      onVehicleSelected('economic');
    }
  };

  // Live Price Calculator
  const calculateLivePrice = (): number => {
    const routes = ROUTES_DB[activeTab];
    const match = routes.find(r => r.to === toLoc);
    const basePrice = match ? match.price : 22;

    // Vehicle Surcharges
    let premium = 0;
    if (selectedVehicleId === 'comfort') {
      premium = 5;
    } else if (selectedVehicleId === 'minivan') {
      premium = 15;
    } else if (selectedVehicleId === 'minibus') {
      premium = 40;
    }

    return basePrice + premium;
  };

  const calculatedPrice = calculateLivePrice();

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setBookingConfirmed(true);
      onConfirmBooking({
        bookingType: activeTab,
        fromLocation: fromLoc,
        toLocation: toLoc,
        pickupDate,
        pickupTime,
        passengers,
        vehicleClass: selectedVehicleId,
        paymentMethod,
        price: calculatedPrice
      });
    }, 1500);
  };

  const getWhatsAppReservationLink = () => {
    const text = `Hello AgadirDriver.com! I want to confirm my booking reservation:%0A%0A` +
      `*Type:* ${activeTab === 'airport' ? 'Airport Transfer' : activeTab === 'city' ? 'City Ride' : 'Long Distance'}%0A` +
      `*From:* ${fromLoc}%0A` +
      `*To:* ${toLoc}%0A` +
      `*Date/Time:* ${pickupDate} @ ${pickupTime}%0A` +
      `*Passengers:* ${passengers} pax%0A` +
      `*Vehicle Type:* ${selectedVehicleId.toUpperCase()}%0A` +
      `*Payment Choice:* Pay by ${paymentMethod === 'card' ? 'Online Card' : 'Cash to Driver'}%0A` +
      `*Amount due:* €${calculatedPrice}%0A%0A` +
      `Please provide booking voucher. Thank you!`;
    return `https://wa.me/212661234567?text=${text}`;
  };

  return (
    <div className="w-full bg-[#FBF6EF] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(31,42,36,0.25)] border border-[#E8DCC8] p-6 sm:p-8 md:p-10">
      
      {/* Tab Switcher */}
      <div className="flex bg-[#1F2A24]/5 p-1 rounded-full mb-8 border border-[#E8DCC8]/30 max-w-md mx-auto">
        {(['airport', 'city', 'long'] as BookingType[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-display font-extrabold uppercase tracking-widest rounded-full transition-all duration-300 ${
              activeTab === tab
                ? 'bg-[#C1502E] text-[#FBF6EF] shadow-lg shadow-[#C1502E]/25'
                : 'text-[#241C15]/70 hover:text-[#C1502E] hover:bg-[#C1502E]/5'
            }`}
          >
            {tab === 'airport' ? 'Airport Transfer' : tab === 'city' ? 'City Ride' : 'Long Distance'}
          </button>
        ))}
      </div>

      {bookingConfirmed ? (
        <div className="text-center py-12 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl text-[#241C15]">Reservation Registered!</h3>
            <p className="text-sm text-[#8A7A68] max-w-md mx-auto font-sans leading-relaxed">
              Your pickup booking from <strong>{fromLoc}</strong> to <strong>{toLoc}</strong> has been registered. Our premium dispatch team is ready to synchronize with your itinerary.
            </p>
          </div>

          <div className="bg-[#1F2A24]/5 rounded-2xl p-6 max-w-sm mx-auto space-y-3 border border-[#E8DCC8]/70">
            <div className="flex justify-between text-xs font-semibold text-[#8A7A68]">
              <span>Assigned Driver class:</span>
              <span className="text-[#241C15] uppercase font-mono">{selectedVehicleId}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-[#8A7A68]">
              <span>Payment Type Selected:</span>
              <span className="text-[#241C15] font-mono">{paymentMethod === 'card' ? 'Online Card' : 'Cash to Driver'}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#241C15] border-t border-[#E8DCC8] pt-3">
              <span>Total Guaranteed Price:</span>
              <span className="text-[#C1502E] font-display text-lg">€{calculatedPrice}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto pt-4">
            <a
              href={getWhatsAppReservationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-bold text-xs tracking-widest uppercase transition-colors text-center shadow-lg flex items-center justify-center gap-2"
            >
              <span>SEND TO WHATSAPP</span>
            </a>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="px-6 py-4 rounded-xl border border-[#E8DCC8] text-[#241C15] hover:bg-white font-display font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              <span>NEW BOOKING</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirmSubmit} className="space-y-6">
          
          {/* LOCATIONS FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* PICKUP LOCATION */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C1502E]" /> Pickup Point
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fromLoc}
                  disabled
                  className="w-full px-4 py-4 bg-[#1F2A24]/5 rounded-xl text-xs sm:text-sm font-sans font-semibold text-[#241C15]/75 border border-[#E8DCC8] cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono bg-[#C1502E]/10 text-[#C1502E] px-2 py-0.5 rounded font-extrabold">
                  LOCKED
                </span>
              </div>
            </div>

            {/* DROP-OFF / DESTINATION */}
            <div className="flex flex-col space-y-1.5 relative">
              <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#E4A93A]" /> Drop-off / Destination
              </label>
              <div>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full text-left px-4 py-4 bg-white rounded-xl text-xs sm:text-sm font-sans font-semibold text-[#241C15] border border-[#E8DCC8] hover:border-[#E4A93A] transition-all duration-200 flex items-center justify-between shadow-sm"
                >
                  <span className="truncate">{toLoc || "Where to?"}</span>
                  <span className="text-xs text-[#E4A93A] font-extrabold">▼</span>
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 w-full bg-white mt-1.5 rounded-xl shadow-2xl border border-[#E8DCC8] z-40 max-h-56 overflow-y-auto p-1.5">
                    <div className="text-[9px] text-[#8A7A68] font-bold font-display uppercase tracking-widest px-3 py-1.5 border-b border-[#E8DCC8]/50 mb-1">
                      Morocco Transfer Routes
                    </div>
                    {ROUTES_DB[activeTab].map((r) => (
                      <button
                        key={r.to}
                        type="button"
                        onClick={() => {
                          setToLoc(r.to);
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-3 py-3 rounded-lg text-xs font-sans font-medium hover:bg-[#C1502E]/5 text-[#241C15] hover:text-[#C1502E] flex items-center justify-between transition-colors"
                      >
                        <span className="truncate pr-2">{r.to}</span>
                        <span className="text-[#E4A93A] font-bold shrink-0">from €{r.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* DATE & TIME & PASSENGERS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* DATE */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C1502E]" /> Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
                className="w-full px-3 py-3.5 bg-white rounded-xl text-xs sm:text-sm font-sans font-semibold text-[#241C15] border border-[#E8DCC8] focus:outline-none focus:border-[#C1502E]"
              />
            </div>

            {/* TIME */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C1502E]" /> Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
                className="w-full px-3 py-3.5 bg-white rounded-xl text-xs sm:text-sm font-sans font-semibold text-[#241C15] border border-[#E8DCC8] focus:outline-none focus:border-[#C1502E]"
              />
            </div>

            {/* PASSENGERS */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#E4A93A]" /> Passengers
              </label>
              <div className="flex items-center bg-white rounded-xl border border-[#E8DCC8] p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => handlePassengersChange(Math.max(1, passengers - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#241C15] hover:bg-[#C1502E]/5 rounded-lg font-bold text-lg"
                >
                  -
                </button>
                <span className="flex-1 text-center font-mono text-sm font-bold text-[#241C15]">
                  {passengers} {passengers > 4 ? '🚐' : '🚗'}
                </span>
                <button
                  type="button"
                  onClick={() => handlePassengersChange(Math.min(15, passengers + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#241C15] hover:bg-[#C1502E]/5 rounded-lg font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* VEHICLE CLASS SELECTOR GRID */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C1502E]" /> Choose Vehicle Type
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'economic', name: 'Economic', desc: 'Fits 3p / 2 bags', pricing: 'Standard' },
                { id: 'comfort', name: 'Comfort Sedan', desc: 'Fits 4p / 3 bags', pricing: '+ €5' },
                { id: 'minivan', name: 'Luxury Minivan', desc: 'Fits 8p / 8 bags', pricing: '+ €15' },
                { id: 'minibus', name: 'Executive Coach', desc: 'Fits 15p / 15 bags', pricing: '+ €40' }
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onVehicleSelected(v.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between h-24 ${
                    selectedVehicleId === v.id
                      ? 'border-[#C1502E] bg-[#C1502E]/5 ring-1 ring-[#C1502E]'
                      : 'border-[#E8DCC8] bg-white hover:border-[#C1502E]/50'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold font-display text-[#241C15]">{v.name}</span>
                    <span className="block text-[10px] text-[#8A7A68] mt-0.5">{v.desc}</span>
                  </div>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#C1502E] bg-[#C1502E]/10 px-2 py-0.5 rounded">
                      {v.pricing}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* PAYMENT METHOD TOGGLE */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#E4A93A]" /> Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  paymentMethod === 'cash'
                    ? 'border-[#C1502E] bg-[#C1502E]/5 ring-1 ring-[#C1502E]'
                    : 'border-[#E8DCC8] bg-white hover:border-[#E8DCC8]/80'
                }`}
              >
                <div className="p-2 bg-[#E4A93A]/10 text-[#E4A93A] rounded-lg">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold font-display text-[#241C15]">Cash to Driver</span>
                  <span className="block text-[10px] text-[#8A7A68]">Pay on arrival in EUR or MAD</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'border-[#C1502E] bg-[#C1502E]/5 ring-1 ring-[#C1502E]'
                    : 'border-[#E8DCC8] bg-white hover:border-[#E8DCC8]/80'
                }`}
              >
                <div className="p-2 bg-[#C1502E]/10 text-[#C1502E] rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold font-display text-[#241C15]">Pay Online by Card</span>
                  <span className="block text-[10px] text-[#8A7A68]">Secure checkout via Stripe</span>
                </div>
              </button>
            </div>
          </div>

          {/* LIVE PRICE ESTIMATE AREA */}
          <div className="p-4 sm:p-5 bg-[#C1502E]/5 rounded-2xl border border-[#C1502E]/15 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="block text-[10px] font-bold font-display uppercase tracking-widest text-[#8A7A68]">
                Guaranteed Fixed Ride Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-[#C1502E]">
                  €{calculatedPrice}
                </span>
                <span className="text-[11px] font-sans text-[#8A7A68]">
                  Includes tax, driver toll roads, and flight waiting
                </span>
              </div>
            </div>
          </div>

          {/* SUBMIT CONFIRMATION BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 rounded-2xl bg-[#E4A93A] hover:bg-[#C1502E] text-[#1F2A24] hover:text-[#FBF6EF] font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>REGISTERING DETAILS...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM RESERVATION</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
