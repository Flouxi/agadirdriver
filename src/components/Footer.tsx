import { Facebook, Instagram, Twitter, MessageCircle, Phone, Mail, Star } from 'lucide-react';
import { AGADIR_DRIVER_LOGO_URL } from '../lib/brand-images';

const AIRPORTS = [
  'Aéroport Agadir Al Massira (AGA)',
  'Aéroport Marrakech Ménara (RAK)',
  'Aéroport Casablanca Mohammed V (CMN)',
  'Aéroport Essaouira Mogador (ESU)',
  'Aéroport Fès Saïss (FEZ)',
  'Aéroport Tanger Ibn Battouta (TNG)',
  'Aéroport Rabat-Salé (RBA)',
];

const SERVICES = [
  'Transferts Aéroportuaires',
  'Transferts Ville à Ville',
  'Chauffeur à la demande (Horaire)',
  'Solutions pour Agences de Voyages',
  'Portail Entreprises & VIPs',
  'Espace Chauffeur Partenaire',
  'Devenir Chauffeur Agadir Driver',
  'Programme de Fidélité Elite',
];

const COMPANY = [
  'À propos de nous',
  'Recrutement / Careers',
  "Centre d'aide & FAQ",
  'Termes et Conditions',
  'Politique de Confidentialité',
  'Mentions Légales',
  'Blog Voyage Maroc',
];

export default function Footer() {
  const whatsappNumber = '2120606419700';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.`;
  const supportEmail = 'support@agadirdriver.com';

  return (
    <footer className="bg-ink text-white">
      <div className="shell pt-16 pb-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & assistance */}
          <div>
            <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" className="h-14 w-auto max-w-[240px] object-contain sm:h-16" />

            <p className="mt-5 text-[14px] leading-relaxed text-white/55">
              Votre partenaire d'élite pour vos déplacements d'affaires et touristiques à Agadir, Marrakech, Essaouira et dans tout le Maroc. Chauffeurs professionnels certifiés.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>

            <div className="mt-7 space-y-2.5 text-[14px] text-white/60">
              <span className="block text-[12px] font-semibold tracking-wide text-white/40 uppercase">Assistance 24/7</span>
              <div className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.75} className="text-accent" />
                <span>+212 060 641 9700</span>
              </div>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
                <MessageCircle size={14} strokeWidth={1.75} className="text-accent" />
                <span>WhatsApp : +212 060 641 9700</span>
              </a>
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail size={14} strokeWidth={1.75} className="text-accent" />
                <span>{supportEmail}</span>
              </a>
            </div>
          </div>

          {/* Airports */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-wide text-white/40 uppercase">Principaux Aéroports</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-white/60">
              {AIRPORTS.map((item) => (
                <li key={item}>
                  <a href="#booking-interface" className="transition-colors hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-wide text-white/40 uppercase">Nos Services</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-white/60">
              {SERVICES.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Trustpilot */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-wide text-white/40 uppercase">Société</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-white/60">
              {COMPANY.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">{item}</a>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-white">
                <Star size={14} className="fill-trust text-trust" strokeWidth={0} />
                Trustpilot Verified
              </div>
              <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-trust text-trust" strokeWidth={0} />
                ))}
              </div>
              <span className="mt-2 block text-[13px] text-white/50">Note de 4.9/5 | 38 036 avis</span>
            </div>
          </div>
        </div>

        {/* Lower footer */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 text-[13px] text-white/45 md:flex-row">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="block">2026 © AGADIR DRIVER™ | All rights reserved.</span>
            <span className="block text-[12px] text-white/35">
              S.A.R.L. au Capital de 100 000 MAD | Patente N° 3451S7 | RC Agadir 530419 | I.F. 4581971
            </span>
          </div>

          <button type="button" className="cursor-pointer transition-colors hover:text-white">
            Vos choix en matière de confidentialité
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'ApplePay', 'GooglePay'].map((brand) => (
              <span key={brand} className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white/45">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating support button */}
      <div className="fixed right-5 bottom-5 z-40 sm:right-6 sm:bottom-6">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-accent px-4 py-3.5 text-[14px] font-semibold text-accent-foreground shadow-float transition-all hover:bg-accent-strong active:scale-[0.98]"
          aria-label="Contacter le support WhatsApp"
        >
          <MessageCircle size={19} strokeWidth={1.75} />
          <span className="hidden sm:inline">Support 24/7</span>
          <span className="sm:hidden">Support</span>
        </a>
      </div>
    </footer>
  );
}
