import React, { useState } from 'react';
import { Car, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'reserve';
  onPageChange: (page: 'home' | 'reserve') => void;
  onOpenQuoteModal: () => void;
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ currentPage, onPageChange, onOpenQuoteModal, onScrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string, page: 'home' | 'reserve' = 'home') => {
    onPageChange(page);
    setIsOpen(false);
    
    // Give state transition a microsecond to render homepage before scrolling
    setTimeout(() => {
      onScrollTo(id);
    }, 50);
  };

  return (
    <nav className="relative z-50 bg-[#1F2A24]/95 border-b border-[#E4A93A]/10 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick('hero', 'home')} 
          className="flex items-center space-x-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="p-1.5 rounded-lg bg-primary-terracotta text-warm-sand group-hover:bg-secondary-gold transition-colors duration-300">
            <Car className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-warm-sand group-hover:text-secondary-gold transition-colors duration-300">
            Agadir<span className="text-secondary-gold group-hover:text-primary-terracotta">Driver</span>
            <span className="text-xs font-mono align-super text-muted-brown">.com</span>
          </span>
        </div>

        {/* Desktop Menu - Exact center links as requested */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Home', id: 'hero', page: 'home' as const },
            { label: 'Prices', id: 'showcase', page: 'home' as const },
            { label: 'Trips & Tours', id: 'tours', page: 'home' as const },
            { label: 'Reviews', id: 'reviews', page: 'home' as const },
            { label: 'Reserve Now', id: 'reservation-top', page: 'reserve' as const }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.id, item.page)}
              className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-terracotta hover:after:w-full after:transition-all after:duration-300 ${
                (item.page === currentPage) 
                  ? 'text-secondary-gold after:w-full after:bg-secondary-gold' 
                  : 'text-warm-sand/80 hover:text-secondary-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Top-Right Action CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="https://wa.me/212661234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-secondary-gold hover:text-primary-terracotta transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold">+212 661-234567</span>
          </a>
          <button
            onClick={onOpenQuoteModal}
            className="px-5 py-2.5 rounded-full bg-secondary-gold text-dark-sky font-display font-bold text-xs tracking-wider uppercase hover:bg-primary-terracotta hover:text-warm-sand transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md shadow-secondary-gold/10"
            id="nav-cta-quote"
          >
            GET A QUOTE
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <a 
            href="https://wa.me/212661234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-secondary-gold hover:bg-warm-sand/5"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-warm-sand hover:text-secondary-gold hover:bg-warm-sand/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1F2A24]/98 border-b border-[#E4A93A]/15 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fadeIn z-50">
          {[
            { label: 'Home', id: 'hero', page: 'home' as const },
            { label: 'Prices', id: 'showcase', page: 'home' as const },
            { label: 'Trips & Tours', id: 'tours', page: 'home' as const },
            { label: 'Reviews', id: 'reviews', page: 'home' as const },
            { label: 'Reserve Now', id: 'reservation-top', page: 'reserve' as const }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.id, item.page)}
              className="text-left font-display font-bold text-lg text-warm-sand hover:text-secondary-gold py-2 border-b border-warm-sand/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-brown font-mono">
              <span>SUPPORT 24/7 WHATSAPP</span>
              <span className="text-secondary-gold font-semibold">+212 661-234567</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-xl bg-secondary-gold text-dark-sky font-display font-bold text-center text-xs tracking-widest uppercase hover:bg-primary-terracotta hover:text-warm-sand transition-all duration-300"
            >
              GET A QUOTE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
