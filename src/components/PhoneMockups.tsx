import React, { useState } from 'react';
import { Wifi, Battery, MapPin, Calendar, Clock, Phone, MessageSquare, CreditCard, CheckCircle, Award, Compass, FileText } from 'lucide-react';
import { BookingState } from '../types';

interface PhoneMockupsProps {
  bookingState: BookingState;
}

export default function PhoneMockups({ bookingState }: PhoneMockupsProps) {
  const [payByCard, setPayByCard] = useState(false);

  // Formatting date for mobile view
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tomorrow';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Mock static values that enhance realism
  const driver = {
    name: "Youssef Ait-Ali",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", // Premium driver avatar
    carName: bookingState.passengers > 4 ? "Mercedes V-Class Minivan" : "Skoda Superb Elegance",
    plate: bookingState.passengers > 4 ? "98274 | A | 8" : "41529 | B | 8",
    rating: "4.9 ★",
    tripsCount: "1,240+ runs"
  };

  return (
    <div className="w-full bg-dark-sky px-4 py-20 md:px-8 border-b border-secondary-gold/10" id="tours">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-[11px] font-mono font-bold text-secondary-gold uppercase tracking-widest">
            PASSENGER APP DEMO FLOW
          </div>
          <h3 className="text-2xl md:text-4xl font-display font-extrabold text-warm-sand">
            YOUR TRANSFERS, <span className="text-primary-terracotta">FULLY LOGGED</span>
          </h3>
          <p className="font-sans text-sm text-muted-brown leading-relaxed">
            See how your reservation syncs instantly into our real-time driver dispatch flow. Try booking above to see these interactive mobile mockups update live!
          </p>
        </div>

        {/* 4-Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* SCREEN 1: My Rides */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-muted-brown mb-4 block">
              1. My Rides
            </span>
            {/* Phone Container */}
            <div className="w-full max-w-[280px] bg-[#121A16] border-[8px] border-[#2c3d33] rounded-[40px] shadow-2xl relative overflow-hidden aspect-[9/18] flex flex-col ring-2 ring-secondary-gold/5">
              
              {/* Device Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2c3d33] rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <div className="w-8 h-1 bg-black/40 rounded-full"></div>
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-6 pb-2 text-[10px] font-mono text-warm-sand/80 z-40">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1 space-y-4 text-warm-sand">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h5 className="font-display font-bold text-sm">My Bookings</h5>
                  <span className="text-[9px] font-mono text-secondary-gold bg-secondary-gold/10 px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>

                {/* Main Ride Card */}
                <div className="bg-white/5 border border-primary-terracotta/15 rounded-2xl p-4.5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-brown">
                      Booking ID: AD-{bookingState.passengers > 4 ? 'VN' : 'SD'}-2026
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      bookingState.isConfirmed 
                        ? 'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 animate-pulse'
                        : 'bg-secondary-gold/15 text-secondary-gold border border-secondary-gold/20'
                    }`}>
                      {bookingState.isConfirmed ? 'CONFIRMED' : 'QUOTED'}
                    </span>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3 relative">
                    <div className="absolute left-2.5 top-3 bottom-3 w-[1.5px] bg-dashed bg-white/10" />
                    <div className="flex items-start space-x-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary-terracotta/20 flex items-center justify-center text-primary-terracotta text-[9px] font-bold relative z-10 shrink-0">
                        A
                      </div>
                      <div>
                        <p className="text-[9px] text-muted-brown uppercase font-bold tracking-wider">Pickup</p>
                        <p className="text-[11px] font-semibold truncate max-w-[170px]">{bookingState.fromLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <div className="w-5 h-5 rounded-full bg-secondary-gold/20 flex items-center justify-center text-secondary-gold text-[9px] font-bold relative z-10 shrink-0">
                        B
                      </div>
                      <div>
                        <p className="text-[9px] text-muted-brown uppercase font-bold tracking-wider">Drop-off</p>
                        <p className="text-[11px] font-semibold truncate max-w-[170px]">{bookingState.toLocation || "Agadir Beach..."}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Vehicle */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px]">
                    <div>
                      <span className="block text-muted-brown">DATE / TIME</span>
                      <span className="font-semibold">{formatDate(bookingState.pickupDate)}</span>
                      <span className="block text-secondary-gold font-mono">{bookingState.pickupTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-muted-brown">VEHICLE</span>
                      <span className="font-semibold block">{bookingState.passengers > 4 ? 'Minivan' : 'Sedan'}</span>
                      <span className="text-[9px] text-muted-brown">({bookingState.passengers} pax)</span>
                    </div>
                  </div>
                </div>

                {/* Driver Preview */}
                <div className="bg-white/5 rounded-xl p-3 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-gold/10 border border-secondary-gold/20 flex items-center justify-center text-xl">
                    🧔🏽
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-brown uppercase font-bold">DRIVER ASSIGNED</p>
                    <p className="text-xs font-bold truncate">{driver.name}</p>
                  </div>
                  <CheckCircle className="w-4.5 h-4.5 text-[#25D366] shrink-0" />
                </div>
              </div>

              {/* Bottom Indicator */}
              <div className="h-6 w-full flex items-center justify-center pb-2">
                <div className="w-24 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* SCREEN 2: Trip Details Timeline */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-muted-brown mb-4 block">
              2. Trip Details
            </span>
            <div className="w-full max-w-[280px] bg-[#121A16] border-[8px] border-[#2c3d33] rounded-[40px] shadow-2xl relative overflow-hidden aspect-[9/18] flex flex-col ring-2 ring-secondary-gold/5">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2c3d33] rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <div className="w-8 h-1 bg-black/40 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center px-6 pt-6 pb-2 text-[10px] font-mono text-warm-sand/80 z-40">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1 space-y-4 text-warm-sand">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h5 className="font-display font-bold text-sm">Ride Timeline</h5>
                  <Clock className="w-4 h-4 text-primary-terracotta" />
                </div>

                {/* Timeline flow chart */}
                <div className="space-y-5 relative pl-4 pt-2">
                  <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-primary-terracotta/30" />

                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-[14px] top-1 w-2 h-2 rounded-full bg-primary-terracotta border border-white" />
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-warm-sand">Flight Landing</span>
                        <span className="text-[9px] font-mono text-secondary-gold">{bookingState.pickupTime}</span>
                      </div>
                      <p className="text-[10px] text-muted-brown leading-normal">
                        Our dispatcher monitors flight progress on radar. Perfect landing coordination.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-[14px] top-1 w-2 h-2 rounded-full bg-secondary-gold border border-white" />
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-warm-sand">Meet & Greet</span>
                        <span className="text-[9px] font-mono text-muted-brown">+15 mins</span>
                      </div>
                      <p className="text-[10px] text-muted-brown leading-normal">
                        Driver waits with a sign labeled <strong className="text-secondary-gold">"ATT-33" / {bookingState.passengers > 4 ? 'Group' : 'Family'}</strong> at Terminal 1 Arrivals gate.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-[14px] top-1 w-2 h-2 rounded-full bg-primary-terracotta border border-white" />
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-warm-sand">Boarding Van</span>
                        <span className="text-[9px] font-mono text-muted-brown">+25 mins</span>
                      </div>
                      <p className="text-[10px] text-muted-brown leading-normal">
                        Baggage loaded into private {bookingState.passengers > 4 ? 'minivan' : 'sedan'} trunk, chilled mineral water bottles served.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <div className="absolute -left-[14px] top-1 w-2 h-2 rounded-full bg-[#25D366] border border-white" />
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-warm-sand">Hotel Arrival</span>
                        <span className="text-[9px] font-mono text-[#25D366]">+55 mins</span>
                      </div>
                      <p className="text-[10px] text-muted-brown leading-normal">
                        Safe drop-off directly at Riad reception or hotel lobby in {bookingState.toLocation || 'Agadir Beach Hotels'}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-6 w-full flex items-center justify-center pb-2">
                <div className="w-24 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* SCREEN 3: Driver Info */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-muted-brown mb-4 block">
              3. Driver Info
            </span>
            <div className="w-full max-w-[280px] bg-[#121A16] border-[8px] border-[#2c3d33] rounded-[40px] shadow-2xl relative overflow-hidden aspect-[9/18] flex flex-col ring-2 ring-secondary-gold/5">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2c3d33] rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <div className="w-8 h-1 bg-black/40 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center px-6 pt-6 pb-2 text-[10px] font-mono text-warm-sand/80 z-40">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1 space-y-4 text-warm-sand flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2 shrink-0">
                  <h5 className="font-display font-bold text-sm">Assigned Driver</h5>
                  <span className="text-[9px] font-mono text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded">
                    ON TIMELINE
                  </span>
                </div>

                {/* Driver Profile Summary */}
                <div className="text-center py-2 space-y-2 shrink-0">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full bg-secondary-gold/10 border-2 border-secondary-gold overflow-hidden mx-auto flex items-center justify-center text-3xl">
                      🧔🏽
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary-terracotta text-[9px] font-bold text-warm-sand px-1.5 py-0.5 rounded-full border border-dark-sky">
                      PRO
                    </div>
                  </div>
                  <div>
                    <h6 className="font-display font-bold text-sm">{driver.name}</h6>
                    <p className="text-[10px] text-muted-brown">Agadir Driver Partner</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-secondary-gold font-bold mt-1">
                      <span>4.95 ★★★★★</span>
                      <span className="text-[9px] text-muted-brown">({driver.tripsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Car Details Card */}
                <div className="bg-white/5 rounded-2xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-brown font-medium">VEHICLE</span>
                    <span className="font-semibold">{driver.carName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-brown font-medium">LICENSE PLATE</span>
                    <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-[10px] font-semibold text-secondary-gold">
                      {driver.plate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-brown font-medium">STATUS</span>
                    <span className="text-[#25D366] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" /> Dispatch Assigned
                    </span>
                  </div>
                </div>

                {/* Interaction Button */}
                <a
                  href={`https://wa.me/212661234567?text=Hi,%20I'm%20the%20traveler%20for%20transfer%20AD-2026%20with%20Youssef.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-center text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-[#25D366]/20 mt-2 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP CHAT</span>
                </a>
              </div>

              <div className="h-6 w-full flex items-center justify-center pb-2">
                <div className="w-24 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* SCREEN 4: Trip Summary / Receipt */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-muted-brown mb-4 block">
              4. Trip Summary
            </span>
            <div className="w-full max-w-[280px] bg-[#121A16] border-[8px] border-[#2c3d33] rounded-[40px] shadow-2xl relative overflow-hidden aspect-[9/18] flex flex-col ring-2 ring-secondary-gold/5">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2c3d33] rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <div className="w-8 h-1 bg-black/40 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center px-6 pt-6 pb-2 text-[10px] font-mono text-warm-sand/80 z-40">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1 space-y-4 text-warm-sand flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h5 className="font-display font-bold text-sm">Transfer Fare</h5>
                    <span className="font-mono text-xs text-secondary-gold font-bold">€{bookingState.calculatedPrice}</span>
                  </div>

                  {/* Fare breakdown */}
                  <div className="space-y-2.5 py-3 text-xs">
                    <div className="flex justify-between text-muted-brown">
                      <span>Base route rate</span>
                      <span className="font-semibold text-warm-sand">€{bookingState.calculatedPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-brown">
                      <span>Airport Meet & Greet</span>
                      <span className="font-semibold text-[#25D366]">FREE</span>
                    </div>
                    <div className="flex justify-between text-muted-brown">
                      <span>Luggage & Board racks</span>
                      <span className="font-semibold text-[#25D366]">FREE</span>
                    </div>
                    <div className="flex justify-between text-muted-brown">
                      <span>Flight delay guarantee</span>
                      <span className="font-semibold text-[#25D366]">FREE</span>
                    </div>
                    <div className="border-t border-white/5 pt-2.5 flex justify-between font-bold text-sm">
                      <span>Total (Fixed)</span>
                      <span className="text-secondary-gold">€{bookingState.calculatedPrice}</span>
                    </div>
                  </div>

                  {/* Payment toggle */}
                  <div className="bg-white/5 rounded-2xl p-3 space-y-2">
                    <span className="text-[10px] text-muted-brown uppercase font-bold tracking-wider block">
                      PAYMENT OPTION
                    </span>
                    <div className="flex bg-black/45 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setPayByCard(false)}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                          !payByCard ? 'bg-primary-terracotta text-warm-sand' : 'text-warm-sand/60'
                        }`}
                      >
                        Cash (EUR/MAD)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayByCard(true)}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                          payByCard ? 'bg-primary-terracotta text-warm-sand' : 'text-warm-sand/60'
                        }`}
                      >
                        Credit Card
                      </button>
                    </div>
                    <p className="text-[9px] text-muted-brown text-center leading-relaxed">
                      {!payByCard 
                        ? 'Pay cash directly to the driver at destination. No deposit needed.' 
                        : 'Secure card terminal inside the car or online invoice before departure.'
                      }
                    </p>
                  </div>
                </div>

                {/* View Receipt Button */}
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-xl border border-secondary-gold/20 hover:bg-secondary-gold/10 text-secondary-gold text-center text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 mt-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>VIEW RECEIPT</span>
                </button>
              </div>

              <div className="h-6 w-full flex items-center justify-center pb-2">
                <div className="w-24 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
