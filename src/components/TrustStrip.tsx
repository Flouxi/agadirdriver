import React from 'react';
import { ShieldCheck, PlaneTakeoff, MessageSquareCode, StarHalf } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Fixed Price',
      desc: 'No hidden fees, no night surcharge',
      accent: 'text-primary-terracotta'
    },
    {
      icon: PlaneTakeoff,
      title: 'Flight Tracking',
      desc: 'We wait, however late you land',
      accent: 'text-secondary-gold'
    },
    {
      icon: MessageSquareCode,
      title: '24/7 WhatsApp Support',
      desc: 'Real local drivers, real answers',
      accent: 'text-primary-terracotta'
    },
    {
      icon: StarHalf,
      title: 'Secure Booking',
      desc: 'Pay by card or cash, your choice',
      accent: 'text-secondary-gold'
    }
  ];

  return (
    <div className="w-full bg-dark-sky px-4 py-12 md:px-8 border-b border-secondary-gold/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {trustItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-secondary-gold/5"
            >
              <div className={`p-3 rounded-xl bg-white/5 ${item.accent} ring-1 ring-white/10 shrink-0`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-warm-sand tracking-wide uppercase">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-muted-brown leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
