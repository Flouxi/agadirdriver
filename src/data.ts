import { VehicleClass, Review, Destination, ServiceItem } from './types';
import { VEHICLE_IMAGE_URLS } from './lib/brand-images';

// Official AgadirDriver.com vehicle line-up.
// Capacity is stated conservatively so customers never book a vehicle
// that is too small for their luggage. Prices are per vehicle, not per person.
export const VEHICLES: VehicleClass[] = [
  {
    id: 'economy-sedan',
    tier: 'economy',
    name: 'Economy Sedan',
    description: 'The lowest private-vehicle price. Air-conditioned, door-to-door, driven by a professional local driver.',
    passengers: 3,
    luggage: 2,
    luggageNote: '2 medium suitcases plus small hand luggage',
    bestFor: 'Solo travellers and couples',
    basePrice: 15,
    image: VEHICLE_IMAGE_URLS.standard,
    carModels: 'Dacia Logan, Skoda Octavia',
  },
  {
    id: 'comfort-sedan',
    tier: 'comfort-sedan',
    name: 'Comfort Sedan',
    description: 'Our recommended option. Extra legroom and boot space for families and business travellers.',
    passengers: 4,
    luggage: 3,
    luggageNote: '3 medium suitcases',
    bestFor: 'Families and customers wanting extra comfort',
    basePrice: 18,
    image: VEHICLE_IMAGE_URLS.standard,
    carModels: 'Skoda Superb, Peugeot 508',
  },
  {
    id: 'comfort-van',
    tier: 'comfort-van',
    name: 'Comfort Van',
    description: 'Spacious van for families, surf groups and heavy luggage. Up to two standard surfboards when they fit safely.',
    passengers: 7,
    luggage: 7,
    luggageNote: 'Up to 7 medium suitcases',
    bestFor: 'Families, surf groups and larger luggage',
    basePrice: 22,
    image: VEHICLE_IMAGE_URLS.vanStandard,
    carModels: 'Mercedes Vito, Hyundai H1',
  },
  {
    id: 'suv',
    tier: 'suv',
    name: 'SUV',
    description: 'Premium comfort for mountain routes and uneven roads. Shown only when the vehicle is actually available.',
    passengers: 4,
    luggage: 3,
    luggageNote: 'Up to 3 medium suitcases',
    bestFor: 'Premium comfort, mountain routes and uneven roads',
    basePrice: 24,
    image: VEHICLE_IMAGE_URLS.suv,
    carModels: 'Confirmed at booking',
    onRequest: true,
  },
  {
    id: 'luxury-sedan',
    tier: 'luxury-sedan',
    name: 'Luxury Sedan',
    description: 'VIP and executive travel. The exact vehicle is confirmed before payment.',
    passengers: 3,
    luggage: 3,
    luggageNote: 'Up to 3 medium suitcases',
    bestFor: 'VIP, executive and special-occasion travel',
    basePrice: 32,
    image: VEHICLE_IMAGE_URLS.first,
    carModels: 'Premium sedan',
    onRequest: true,
  },
  {
    id: 'minibus-14',
    tier: 'minibus-14',
    name: 'Minibus 14',
    description: 'Group tariff for retreats, events and surf camps. Luggage volume is confirmed before booking.',
    passengers: 14,
    luggage: 14,
    luggageNote: 'Confirm luggage before booking',
    bestFor: 'Groups, retreats, events and surf camps',
    basePrice: 30,
    image: VEHICLE_IMAGE_URLS.vanFirst,
    carModels: 'Mercedes Sprinter',
  },
  {
    id: 'minibus-17',
    tier: 'minibus-17',
    name: 'Minibus 17',
    description: 'Our largest vehicle for big groups and corporate travel, with a dedicated group tariff.',
    passengers: 17,
    luggage: 17,
    luggageNote: 'Confirm luggage before booking',
    bestFor: 'Large groups and corporate travel',
    basePrice: 35,
    image: VEHICLE_IMAGE_URLS.vanFirst,
    carModels: 'Mercedes Sprinter 17',
  },
];


export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Très bien',
    rating: 5,
    title: 'Très bien',
    comment: 'Très bien, service impeccable, chauffeur ponctuel, courtois et conduite très sécurisante de l\'aéroport d\'Agadir à Taghazout.',
    verified: true,
    author: 'bissieres philippe',
    timeAgo: 'il y a 4 heures'
  },
  {
    id: 'rev-2',
    name: 'belle expérience',
    rating: 5,
    title: 'belle expérience',
    comment: 'Le fait d\'être à l\'heure, l\'espace généreux dans le véhicule Mercedes, la courtoisie exceptionnelle du chauffeur et sa discrétion ont rendu le trajet parfait.',
    verified: true,
    author: 'Crottaz Yvan',
    timeAgo: 'il y a 3 jours'
  },
  {
    id: 'rev-3',
    name: 'Tout s\'est bien déroulé',
    rating: 5,
    title: 'Tout s\'est bien déroulé',
    comment: 'Réservation simple, service client réactif par WhatsApp et chauffeur extrêmement serviable pour notre transfert de Marrakech à Agadir.',
    verified: true,
    author: 'PASTOR',
    timeAgo: 'il y a 5 jours'
  },
  {
    id: 'rev-4',
    name: 'Très bon véhicule avec un chauffeur...',
    rating: 5,
    title: 'Excellent véhicule et service premium',
    comment: 'Chauffeur d\'une gentillesse rare, bouteilles d\'eau à bord et recharge de téléphone disponible. Un vrai service 5 étoiles à un prix très compétitif.',
    verified: true,
    author: 'Bruttin',
    timeAgo: 'il y a 8 jours'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    name: 'Agadir',
    airport: 'Aéroport Agadir Al Massira (AGA)',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80', // Moroccan beach/coast
    type: 'airport'
  },
  {
    id: 'dest-2',
    name: 'Marrakech',
    airport: 'Aéroport Marrakech Ménara (RAK)',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80', // Medina/Marrakech
    type: 'airport'
  },
  {
    id: 'dest-3',
    name: 'Casablanca',
    airport: 'Aéroport Mohammed V (CMN)',
    image: 'https://images.unsplash.com/photo-1552423814-147cb2238370?auto=format&fit=crop&w=600&q=80', // Casablanca Hassan II
    type: 'airport'
  },
  {
    id: 'dest-4',
    name: 'Taghazout',
    airport: 'Paradis du Surf, Hôtels & Resorts',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', // Ocean beach/surf
    type: 'city'
  },
  {
    id: 'dest-5',
    name: 'Essaouira',
    airport: 'Aéroport Essaouira Mogador (ESU) / Médina',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80', // Coastal fortifications
    type: 'city'
  },
  {
    id: 'dest-6',
    name: 'Taroudant',
    airport: 'Joyau du Souss & La Petite Marrakech',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80', // Moroccan walls
    type: 'city'
  },
  {
    id: 'dest-7',
    name: 'Oukaïmeden',
    airport: 'Station de Ski de l\'Atlas',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=600&q=80', // Snowy mountain
    type: 'ski'
  },
  {
    id: 'dest-8',
    name: 'Mischliffen',
    airport: 'Station d\'Ifrane, le Moyen-Atlas',
    image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80', // Snowy pine trees
    type: 'ski'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Sécurité Maximale',
    description: 'Tous nos véhicules sont rigoureusement entretenus et assurés. Nos chauffeurs sont certifiés professionnels, formés à la conduite préventive.',
    icon: 'ShieldCheck'
  },
  {
    id: 'srv-2',
    title: 'Chauffeurs Professionnels',
    description: 'Chauffeurs discrets, bilingues (Français, Anglais, Arabe), accueillants et ayant une excellente connaissance des routes marocaines.',
    icon: 'UserCheck'
  },
  {
    id: 'srv-3',
    title: 'Prise en charge à l\'heure',
    description: 'Que ce soit pour un vol à l\'aube ou un retour tardif, nous garantissons la ponctualité. Suivi des vols en temps réel pour ajuster les horaires.',
    icon: 'Clock'
  },
  {
    id: 'srv-4',
    title: 'Transferts Intervilles',
    description: 'Déplacez-vous confortablement d\'une ville à une autre (Agadir, Marrakech, Casablanca, Essaouira) dans un calme absolu.',
    icon: 'Car'
  }
];

export const MOROCCAN_AIRPORTS = [
  'Aéroport Agadir-Al Massira (AGA)',
  'Aéroport Marrakech-Ménara (RAK)',
  'Aéroport Casablanca-Mohammed V (CMN)',
  'Aéroport Essaouira-Mogador (ESU)',
  'Aéroport Ouarzazate (OZZ)',
  'Taghazout (Hôtel / Surf Camp)',
  'Agadir Centre-Ville (Hôtel / Adresse de votre choix)',
  'Marrakech Centre-Ville (Riad / Hôtel)',
  'Essaouira Médina',
  'Taroudant'
];
