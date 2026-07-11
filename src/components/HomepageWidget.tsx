import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { BookingType } from '../types';

interface HomepageWidgetProps {
  onSearchSubmit: (searchParams: {
    bookingType: BookingType;
    fromLocation: string;
    toLocation: string;
    pickupDate: string;
    passengers: number;
    price: number;
  }) => void;
}

const ROUTES_DB = {
  airport: [
    { to: "Agadir Beach Hotels (Riu Palace, Kenzi, Iberostar, etc.)", price: 22 },
    { to: "Taghazout Bay / Surf Villages", price: 35 },
    { to: "Tamraght / Banana Village", price: 30 },
    { to: "Imsouane Beach (Surf Bay)", price: 55 },
    { to: "Marrakech City Centre / Medina", price: 110 }
  ],
  city: [
    { to: "Agadir Marina & Beach Promenade", price: 10 },
    { to: "Souk El Had (Local Grand Market)", price: 8 },
    { to: "Agadir Oufella Kasbah (Cable Car)", price: 12 },
    { to: "Paradise Valley (Atlas Foothills)", price: 40 }
  ],
  long: [
    { to: "Marrakech Menara Airport (RAK)", price: 120 },
    { to: "Essaouira Port & Historic Medina", price: 90 },
    { to: "Casablanca Mohammed V Airport (CMN)", price: 220 }
  ]
};

export default function HomepageWidget({ onSearchSubmit }: HomepageWidgetProps) {
  const [activeTab, setActiveTab] = useState<BookingType>('airport');
  const [fromLoc, setFromLoc] = useState("Agadir Airport (AGA)");
  const [toLoc, setToLoc] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);

  // Set default tomorrow date
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setPickupDate(today.toISOString().split('T')[0]);
  }, []);

  // Update pickup location based on tab change
  useEffect(() => {
    if (activeTab === 'airport') {
      setFromLoc("Agadir Airport (AGA)");
      setToLoc(ROUTES_DB.airport[0].to);
    } else if (activeTab === 'city') {
      setFromLoc("Agadir City Center");
      setToLoc(ROUTES_DB.city[0].to);
    } else {
      setFromLoc("Agadir Hotel / Riad");
      setToLoc(ROUTES_DB.long[0].to);
    }
  }, [activeTab]);

  const handleDropdownSelect = (dest: string) => {
    setToLoc(dest);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toLoc) return;

    // Calculate base price
    const match = ROUTES_DB[activeTab].find(r => r.to === toLoc);
    const basePrice = match ? match.price : 25;
    // Minivans (passengers > 4) add a premium surcharge
    const finalPrice = passengers > 4 ? basePrice + 12 : basePrice;

    onSearchSubmit({
      bookingType: activeTab,
      fromLocation: fromLoc,
      toLocation: toLoc,
      pickupDate,
      passengers,
      price: finalPrice
    });
  };

  return (
    <div className="w-full bg-[#FBF6EF] rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(31,42,36,0.3)] border border-[#E8DCC8] p-6 sm:p-8">
      {/* Search Type Tabs */}
      <div className="flex bg-[#1F2A24]/5 p-1 rounded-full mb-6 border border-[#E8DCC8]/30">
        {(['airport', 'city', 'long'] as BookingType[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[11px] font-display font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
              activeTab === tab
                ? 'bg-[#C1502E] text-[#FBF6EF] shadow-md shadow-[#C1502E]/20'
                : 'text-[#241C15]/70 hover:text-[#C1502E] hover:bg-[#C1502E]/5'
            }`}
          >
            {tab === 'airport' ? 'Airport' : tab === 'city' ? 'City' : 'Long Dist.'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* PICKUP LOCATION (Fixed/Locked based on type) */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C1502E]" /> Pickup Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={fromLoc}
              disabled
              className="w-full px-4 py-3 bg-[#1F2A24]/5 rounded-xl text-xs font-sans font-medium text-[#241C15]/70 border border-[#E8DCC8] cursor-not-allowed"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono bg-[#C1502E]/10 text-[#C1502E] px-2 py-0.5 rounded font-bold">
              LOCKED
            </span>
          </div>
        </div>

        {/* DROP-OFF / DESTINATION DROPDOWN */}
        <div className="flex flex-col space-y-1.5 relative">
          <label className="text-[10px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E4A93A]" /> Drop-Off / Destination
          </label>
          <div>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full text-left px-4 py-3 bg-white rounded-xl text-xs font-sans font-semibold text-[#241C15] border border-[#E8DCC8] hover:border-[#E4A93A] transition-all duration-200 flex items-center justify-between"
            >
              <span className="truncate">{toLoc || "Where to?"}</span>
              <span className="text-xs text-[#E4A93A] font-extrabold">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-xl shadow-2xl border border-[#E8DCC8] z-40 max-h-48 overflow-y-auto p-1.5">
                <div className="text-[9px] text-[#8A7A68] font-bold font-display uppercase tracking-widest px-3 py-1.5 border-b border-[#E8DCC8]/50 mb-1">
                  Available Destinations
                </div>
                {ROUTES_DB[activeTab].map((r) => (
                  <button
                    key={r.to}
                    type="button"
                    onClick={() => handleDropdownSelect(r.to)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-sans font-medium hover:bg-[#C1502E]/5 text-[#241C15] hover:text-[#C1502E] flex items-center justify-between transition-colors"
                  >
                    <span className="truncate pr-2">{r.to}</span>
                    <span className="text-[#E4A93A] font-bold shrink-0">from €{r.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DATE & PASSENGERS (Split Grid) */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* DATE FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C1502E]" /> Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-white rounded-xl text-xs font-sans font-semibold text-[#241C15] border border-[#E8DCC8] focus:outline-none focus:border-[#C1502E]"
            />
          </div>

          {/* PASSENGERS FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-extrabold font-display uppercase tracking-widest text-[#8A7A68] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#E4A93A]" /> Passengers
            </label>
            <div className="flex items-center bg-white rounded-xl border border-[#E8DCC8] p-0.5">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#241C15] hover:bg-[#C1502E]/5 rounded-lg font-bold text-sm"
              >
                -
              </button>
              <span className="flex-1 text-center font-mono text-xs font-bold text-[#241C15]">
                {passengers}p
              </span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(15, passengers + 1))}
                className="w-8 h-8 flex items-center justify-center text-[#241C15] hover:bg-[#C1502E]/5 rounded-lg font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic vehicle badge note */}
        <div className="text-[10px] text-[#8A7A68] font-sans bg-[#C1502E]/5 p-2.5 rounded-lg border border-[#C1502E]/10">
          <span className="font-bold text-[#C1502E]">
            {passengers > 4 ? "🚐 Private Minivan Assigned" : "🚗 Private Sedan Assigned"}
          </span>: Fits {passengers} passengers + luggage nicely.
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#E4A93A] hover:bg-[#C1502E] text-[#1F2A24] hover:text-[#FBF6EF] font-display font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>GET FIXED PRICE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
