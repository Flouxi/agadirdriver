import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'FR' | 'EN' | 'DE' | 'ES';

export const LANGUAGE_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'FR', label: 'Français' },
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'ES', label: 'Español' },
];

type Dict = Record<string, string>;

const FR: Dict = {
  'booking.passengers': "Passagers",
  'booking.infants': "Bébés et enfants compris",
  'booking.seePrices': "Voir les prix",
  'booking.footnote': "Tout le Maroc · Prix fixe · Annulation gratuite",
  'nav.airport': "Taxi d'aéroport",
  'nav.intercity': 'Transferts de ville à ville',
  'nav.hourly': "À l'heure",
  'nav.help': 'Aide',
  'nav.business': 'Business',
  'top.support': 'Assistance 24/7 disponible',
  'top.driver': 'Devenez Chauffeur Partenaire',
  'top.driverShort': 'Devenez Chauffeur',
  'top.agency': 'Connexion Agence',
  'header.login': 'Se connecter',
  'header.signup': "S'inscrire",
  'header.langAria': 'Choisir la langue',
  'hero.badge': "Partenaire Officiel Aéroport d'Agadir",
  'hero.title1': 'Chauffeur privé',
  'hero.title2': 'premium',
  'hero.title3': 'à Agadir',
  'hero.subMobile': 'Réservez votre trajet partout au Maroc',
  'hero.subDesktop':
    "Transferts aéroportuaires, trajets ville à ville et mise à disposition à l'heure. Prix fixes, chauffeurs multilingues, véhicules haut de gamme.",
  'hero.reviews': '+2 400 avis',
  'hero.insured': 'Assuré',
  'hero.fleet': 'Flotte certifiée',
  'hero.support': 'Assistance',
  'hero.fixedPrice': 'Prix fixe',
  'hero.freeCancel': 'Annulation gratuite',
  'booking.title': 'Réservez votre trajet',
  'booking.subtitle': 'Prix fixe garanti, confirmation immédiate.',
  'booking.transfer': 'Transfert',
  'booking.hourly': "À l'heure",
  'booking.from': 'De',
  'booking.to': 'À',
  'booking.placeholder': 'Adresse, aéroport, hôtel…',
  'booking.date': 'Date',
  'booking.time': 'Heure',
  'booking.addReturn': 'Ajouter un retour',
  'booking.duration': 'Durée de réservation',
  'booking.hoursRequested': 'Heures demandées',
};

const EN: Dict = {
  'booking.passengers': "Passengers",
  'booking.infants': "Babies and children included",
  'booking.seePrices': "See prices",
  'booking.footnote': "All Morocco · Fixed price · Free cancellation",
  'nav.airport': 'Airport taxi',
  'nav.intercity': 'City to city transfers',
  'nav.hourly': 'By the hour',
  'nav.help': 'Help',
  'nav.business': 'Business',
  'top.support': '24/7 support available',
  'top.driver': 'Become a Partner Driver',
  'top.driverShort': 'Become a Driver',
  'top.agency': 'Agency login',
  'header.login': 'Sign in',
  'header.signup': 'Sign up',
  'header.langAria': 'Choose language',
  'hero.badge': 'Official Agadir Airport Partner',
  'hero.title1': 'Premium private',
  'hero.title2': 'chauffeur',
  'hero.title3': 'in Agadir',
  'hero.subMobile': 'Book your ride anywhere in Morocco',
  'hero.subDesktop':
    'Airport transfers, city-to-city rides and hourly hire. Fixed prices, multilingual drivers, high-end vehicles.',
  'hero.reviews': '2,400+ reviews',
  'hero.insured': 'Insured',
  'hero.fleet': 'Certified fleet',
  'hero.support': 'Support',
  'hero.fixedPrice': 'Fixed price',
  'hero.freeCancel': 'Free cancellation',
  'booking.title': 'Book your ride',
  'booking.subtitle': 'Guaranteed fixed price, instant confirmation.',
  'booking.transfer': 'Transfer',
  'booking.hourly': 'By the hour',
  'booking.from': 'From',
  'booking.to': 'To',
  'booking.placeholder': 'Address, airport, hotel…',
  'booking.date': 'Date',
  'booking.time': 'Time',
  'booking.addReturn': 'Add return',
  'booking.duration': 'Booking duration',
  'booking.hoursRequested': 'Hours requested',
};

const DE: Dict = {
  'booking.passengers': "Passagiere",
  'booking.infants': "Babys und Kinder inklusive",
  'booking.seePrices': "Preise ansehen",
  'booking.footnote': "Ganz Marokko · Festpreis · Kostenlose Storno",
  'nav.airport': 'Flughafentaxi',
  'nav.intercity': 'Transfers von Stadt zu Stadt',
  'nav.hourly': 'Stundenweise',
  'nav.help': 'Hilfe',
  'nav.business': 'Business',
  'top.support': '24/7 Unterstützung verfügbar',
  'top.driver': 'Partnerfahrer werden',
  'top.driverShort': 'Fahrer werden',
  'top.agency': 'Agentur-Login',
  'header.login': 'Anmelden',
  'header.signup': 'Registrieren',
  'header.langAria': 'Sprache wählen',
  'hero.badge': 'Offizieller Partner des Flughafens Agadir',
  'hero.title1': 'Privater',
  'hero.title2': 'Premium-Chauffeur',
  'hero.title3': 'in Agadir',
  'hero.subMobile': 'Buchen Sie Ihre Fahrt in ganz Marokko',
  'hero.subDesktop':
    'Flughafentransfers, Fahrten von Stadt zu Stadt und stundenweise Anmietung. Festpreise, mehrsprachige Fahrer, hochwertige Fahrzeuge.',
  'hero.reviews': '+2.400 Bewertungen',
  'hero.insured': 'Versichert',
  'hero.fleet': 'Zertifizierte Flotte',
  'hero.support': 'Unterstützung',
  'hero.fixedPrice': 'Festpreis',
  'hero.freeCancel': 'Kostenlose Storno',
  'booking.title': 'Buchen Sie Ihre Fahrt',
  'booking.subtitle': 'Garantierter Festpreis, sofortige Bestätigung.',
  'booking.transfer': 'Transfer',
  'booking.hourly': 'Stundenweise',
  'booking.from': 'Von',
  'booking.to': 'Nach',
  'booking.placeholder': 'Adresse, Flughafen, Hotel…',
  'booking.date': 'Datum',
  'booking.time': 'Uhrzeit',
  'booking.addReturn': 'Rückfahrt hinzufügen',
  'booking.duration': 'Buchungsdauer',
  'booking.hoursRequested': 'Gewünschte Stunden',
};

const ES: Dict = {
  'booking.passengers': "Pasajeros",
  'booking.infants': "Bebés y niños incluidos",
  'booking.seePrices': "Ver precios",
  'booking.footnote': "Todo Marruecos · Precio fijo · Cancelación gratuita",
  'nav.airport': 'Taxi al aeropuerto',
  'nav.intercity': 'Traslados entre ciudades',
  'nav.hourly': 'Por horas',
  'nav.help': 'Ayuda',
  'nav.business': 'Business',
  'top.support': 'Asistencia 24/7 disponible',
  'top.driver': 'Hazte Chófer Asociado',
  'top.driverShort': 'Hazte Chófer',
  'top.agency': 'Acceso Agencia',
  'header.login': 'Iniciar sesión',
  'header.signup': 'Registrarse',
  'header.langAria': 'Elegir idioma',
  'hero.badge': 'Socio Oficial del Aeropuerto de Agadir',
  'hero.title1': 'Chófer privado',
  'hero.title2': 'premium',
  'hero.title3': 'en Agadir',
  'hero.subMobile': 'Reserva tu trayecto en todo Marruecos',
  'hero.subDesktop':
    'Traslados al aeropuerto, viajes entre ciudades y servicio por horas. Precios fijos, chóferes multilingües, vehículos de alta gama.',
  'hero.reviews': '+2.400 opiniones',
  'hero.insured': 'Asegurado',
  'hero.fleet': 'Flota certificada',
  'hero.support': 'Asistencia',
  'hero.fixedPrice': 'Precio fijo',
  'hero.freeCancel': 'Cancelación gratuita',
  'booking.title': 'Reserva tu trayecto',
  'booking.subtitle': 'Precio fijo garantizado, confirmación inmediata.',
  'booking.transfer': 'Traslado',
  'booking.hourly': 'Por horas',
  'booking.from': 'Desde',
  'booking.to': 'Hasta',
  'booking.placeholder': 'Dirección, aeropuerto, hotel…',
  'booking.date': 'Fecha',
  'booking.time': 'Hora',
  'booking.addReturn': 'Añadir regreso',
  'booking.duration': 'Duración de la reserva',
  'booking.hoursRequested': 'Horas solicitadas',
};

const DICTS: Record<Lang, Dict> = { FR, EN, DE, ES };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = 'agadir-driver-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('EN');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in DICTS) setLangState(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next.toLowerCase();
  }, []);

  const t = useCallback((key: string) => DICTS[lang][key] ?? DICTS.FR[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) return { lang: 'FR', setLang: () => {}, t: (key: string) => FR[key] ?? key };
  return ctx;
}
