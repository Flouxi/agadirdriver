import React from 'react';
import { Star, MessageSquare, Quote, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

export default function Reviews() {
  const reviewsData: Review[] = [
    {
      id: '1',
      author: 'Sophie Dumont',
      rating: 5,
      date: 'June 2026',
      route: 'Agadir Airport (AGA) ➔ Riu Palace Tikida',
      comment: 'Absolutely exceptional service! Our flight from Paris was delayed by over an hour, but our driver Youssef was waiting patiently at arrivals with our name on a sign. The Mercedes sedan was immaculate and air-conditioned. Booking was seamless via WhatsApp. 10/10!'
    },
    {
      id: '2',
      author: 'Marcus & Liam',
      rating: 5,
      date: 'May 2026',
      route: 'Agadir Airport (AGA) ➔ Taghazout Bay Surf Lodge',
      comment: 'Perfect transfer for surfers. We had 3 massive boardbags and a lot of luggage. We booked the private minivan—it arrived with proper surf racks and plenty of space. Friendly local driver, gave us great restaurant tips on the way. Paid the fixed price in cash Euro, no stress.'
    },
    {
      id: '3',
      author: 'Richard Henderson',
      rating: 5,
      date: 'April 2026',
      route: 'Agadir City ➔ Marrakech Medina (Riad)',
      comment: 'Booked the intercity transfer to Marrakech. Excellent driving, safe highway speeds, and a very comfortable ride with high-speed WiFi and chilled bottled waters on board. A much better experience than renting a car or dealing with public transit. Professional and courteous.'
    }
  ];

  return (
    <div className="w-full bg-warm-sand text-charcoal-text px-4 py-20 md:px-8" id="reviews">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-primary-terracotta font-mono text-xs font-bold uppercase tracking-widest bg-primary-terracotta/10 px-3.5 py-1 rounded-full">
              <MessageSquare className="w-4 h-4" />
              <span>TESTIMONIALS</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight">
              LOVED BY <span className="text-primary-terracotta">INTERNATIONAL</span> TRAVELERS
            </h3>
            <p className="font-sans text-sm text-muted-brown max-w-2xl leading-relaxed">
              Real feedback from verified guests who have experienced our professional airport pickups, city tours, and private long-distance Moroccan highway transfers.
            </p>
          </div>

          {/* Average Rating Banner */}
          <div className="bg-dark-sky text-warm-sand rounded-2xl p-4 flex items-center space-x-4 border border-secondary-gold/15 shrink-0">
            <div className="text-3xl font-display font-extrabold text-secondary-gold">4.9</div>
            <div>
              <div className="flex text-secondary-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[10px] font-mono text-muted-brown uppercase tracking-wider mt-0.5">
                178+ Verified Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl border border-primary-terracotta/5 relative group transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-terracotta/10 group-hover:text-primary-terracotta/20 transition-colors" />
              
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex text-secondary-gold">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-xs md:text-sm text-charcoal-text/85 leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="pt-4 border-t border-dark-sky/5 space-y-2">
                  {/* Route badge */}
                  <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-primary-terracotta bg-primary-terracotta/5 px-2 py-1 rounded">
                    <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                    <span className="truncate max-w-[200px]">{review.route}</span>
                  </div>

                  {/* Reviewer name and metadata */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-display font-bold text-charcoal-text">{review.author}</span>
                    <span className="text-muted-brown font-mono text-[10px]">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 pt-6 text-xs text-muted-brown font-semibold uppercase tracking-widest text-center">
          <span>🛡️ Verified Tripadvisor Excellence</span>
          <span>⭐ 5-Star Average Google reviews</span>
          <span>✈️ Registered Tourist Driver Permit No: 884-A</span>
        </div>

      </div>
    </div>
  );
}
