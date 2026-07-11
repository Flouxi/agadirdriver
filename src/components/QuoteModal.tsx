import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail, Phone, Calendar, Clock, MapPin } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Moroccan reservation dispatcher sync
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const getWhatsAppQuoteLink = () => {
    const text = `Hi AgadirDriver.com! I want a custom quote:%0A%0A` +
      `*Name:* ${name}%0A` +
      `*WhatsApp:* ${whatsapp}%0A` +
      `*Email:* ${email}%0A` +
      `*My Itinerary details:* ${details}`;
    return `https://wa.me/212661234567?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-sky/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden glass-light rounded-3xl shadow-2xl border border-secondary-gold/25 text-charcoal-text">
        
        {/* Banner header pattern */}
        <div className="bg-primary-terracotta text-warm-sand p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-secondary-gold uppercase">
              AGADIRDRIVER.COM
            </span>
            <h4 className="font-display font-bold text-lg">Request a Custom Quote</h4>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-warm-sand hover:text-secondary-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-slideUp">
              <div className="inline-flex p-4 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h5 className="font-display font-extrabold text-xl text-primary-terracotta">
                  Quote Request Sent!
                </h5>
                <p className="font-sans text-xs text-muted-brown leading-relaxed max-w-sm mx-auto">
                  Choukrane (Thank you)! Our local Moroccan dispatch office has received your request. We will message you on WhatsApp or email within 5 minutes.
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={getWhatsAppQuoteLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>SPEED UP VIA WHATSAPP</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-dark-sky text-warm-sand hover:bg-primary-terracotta rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all"
                >
                  CLOSE WINDOW
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-sans text-xs text-muted-brown leading-relaxed">
                Need multiple vehicles, custom day excursions to Paradise Valley, Tafraout, or a direct desert safari? Complete the details below, and get a tailored flat-rate quote in minutes.
              </p>

              {/* Full Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold font-display uppercase tracking-wider text-muted-brown flex items-center gap-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full pl-4 pr-4 py-3 bg-white rounded-xl text-xs font-sans text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold"
                  />
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold font-display uppercase tracking-wider text-muted-brown flex items-center gap-1">
                    WhatsApp (with country code)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+44 7123 456789"
                      className="w-full pl-4 pr-4 py-3 bg-white rounded-xl text-xs font-sans text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold font-display uppercase tracking-wider text-muted-brown flex items-center gap-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full pl-4 pr-4 py-3 bg-white rounded-xl text-xs font-sans text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Details */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold font-display uppercase tracking-wider text-muted-brown flex items-center gap-1">
                  What is your itinerary or custom request?
                </label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us what you need: dates, passenger counts, number of luggage pieces, desired tour destinations..."
                  className="w-full p-4 bg-white rounded-xl text-xs font-sans text-charcoal-text border border-primary-terracotta/15 focus:outline-none focus:border-secondary-gold resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-dark-sky/5 hover:bg-dark-sky/10 text-charcoal-text rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all border border-dark-sky/10"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3.5 bg-primary-terracotta hover:bg-dark-sky text-warm-sand rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-md shadow-primary-terracotta/20"
                >
                  {isLoading ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <>
                      <span>SUBMIT QUOTE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
