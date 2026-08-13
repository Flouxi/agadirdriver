import { VehicleClass, Review, Destination, ServiceItem } from './types';
import { VEHICLE_IMAGE_URLS } from './lib/brand-images';

// Tarifs alignés sur les prix réels du marché marocain (chauffeur privé, EUR).
// Réf. : 1€ ≈ 10,7 MAD — trajets type Marrakech→Essaouira (~175 km) ≈ 800-1000 MAD ≈ 74-92€.
export const VEHICLES: VehicleClass[] = [
  {
    id: 'standard',
    name: 'Standard Class',
    description: 'Une option de voyage confortable et économique pour vos déplacements quotidiens ou professionnels.',
    passengers: 3,
    luggage: 3,
    pricePerKm: 0.55,
    basePrice: 15,
    image: VEHICLE_IMAGE_URLS.standard,
    carModels: 'Mercedes Classe E, BMW Série 5, Audi A6 ou similaire'
  },
  {
    id: 'first',
    name: 'First Class',
    description: 'Le summum du luxe et du raffinement. Parfait pour les occasions spéciales ou les clients VIP.',
    passengers: 3,
    luggage: 3,
    pricePerKm: 0.95,
    basePrice: 30,
    image: VEHICLE_IMAGE_URLS.first,
    carModels: 'Mercedes Classe S, BMW Série 7, Audi A8 ou similaire'
  },
  {
    id: 'suv',
    name: 'SUV Executive',
    description: 'Spacieux et robuste. Idéal pour les longs trajets confortables en famille ou avec de nombreux bagages.',
    passengers: 6,
    luggage: 6,
    pricePerKm: 0.70,
    basePrice: 20,
    image: VEHICLE_IMAGE_URLS.suv,
    carModels: 'Mercedes GLE, Range Rover, Cadillac Escalade ou similaire'
  },
  {
    id: 'van-standard',
    name: 'Van Standard',
    description: 'Idéal pour les petits groupes ou les familles nombreuses recherchant un transport pratique et spacieux.',
    passengers: 7,
    luggage: 7,
    pricePerKm: 0.65,
    basePrice: 20,
    image: VEHICLE_IMAGE_URLS.vanStandard,
    carModels: 'Mercedes Vito, Ford Transit Custom, Hyundai H1 ou similaire'
  },
  {
    id: 'van-first',
    name: 'Van First Class',
    description: 'Luxe de niveau supérieur pour les voyages en groupe. Sièges en cuir face-à-face, climatisation multizone.',
    passengers: 7,
    luggage: 7,
    pricePerKm: 1.05,
    basePrice: 35,
    image: VEHICLE_IMAGE_URLS.vanFirst,
    carModels: 'Mercedes Classe V, Volkswagen Multivan Business ou similaire'
  }
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
