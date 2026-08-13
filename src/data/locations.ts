// Editable location catalog for the booking picker.
// Add or remove entries here without touching component logic.

export type LocationCategory = "airport" | "city" | "hotel";

export interface LocationOption {
  id: string;
  label: string;      // Shown in the field and the list
  sublabel?: string;  // Optional secondary line (city / area)
  category: LocationCategory;
  vip?: boolean;      // Highlighted VIP partner
  // Coordinates used by the reservation map preview.
  lat: number;
  lng: number;
}

export const AIRPORTS: LocationOption[] = [
  { id: "aga", label: "Aéroport Agadir Al Massira (AGA)", sublabel: "Agadir, Maroc", category: "airport", lat: 30.3810, lng: -9.5464 },
  { id: "rak", label: "Aéroport Marrakech Ménara (RAK)", sublabel: "Marrakech, Maroc", category: "airport", lat: 31.6069, lng: -8.0363 },
  { id: "cmn", label: "Aéroport Casablanca Mohammed V (CMN)", sublabel: "Casablanca, Maroc", category: "airport", lat: 33.3675, lng: -7.5898 },
  { id: "esu", label: "Aéroport Essaouira Mogador (ESU)", sublabel: "Essaouira, Maroc", category: "airport", lat: 31.3975, lng: -9.6817 },
  { id: "fez", label: "Aéroport Fès Saïss (FEZ)", sublabel: "Fès, Maroc", category: "airport", lat: 33.9273, lng: -4.9779 },
  { id: "tng", label: "Aéroport Tanger Ibn Battouta (TNG)", sublabel: "Tanger, Maroc", category: "airport", lat: 35.7269, lng: -5.9169 },
  { id: "rba", label: "Aéroport Rabat-Salé (RBA)", sublabel: "Rabat, Maroc", category: "airport", lat: 34.0515, lng: -6.7515 },
  { id: "ozz", label: "Aéroport Ouarzazate (OZZ)", sublabel: "Ouarzazate, Maroc", category: "airport", lat: 30.9391, lng: -6.9094 },
];

export const CITIES: LocationOption[] = [
  { id: "c-agadir", label: "Agadir Centre-Ville", sublabel: "Agadir, Maroc", category: "city", lat: 30.4278, lng: -9.5981 },
  { id: "c-marrakech", label: "Marrakech Centre-Ville", sublabel: "Marrakech, Maroc", category: "city", lat: 31.6295, lng: -7.9811 },
  { id: "c-casablanca", label: "Casablanca Centre-Ville", sublabel: "Casablanca, Maroc", category: "city", lat: 33.5731, lng: -7.5898 },
  { id: "c-essaouira", label: "Essaouira Médina", sublabel: "Essaouira, Maroc", category: "city", lat: 31.5085, lng: -9.7595 },
  { id: "c-taroudant", label: "Taroudant Centre", sublabel: "Taroudant, Maroc", category: "city", lat: 30.4703, lng: -8.8770 },
  { id: "c-rabat", label: "Rabat Centre-Ville", sublabel: "Rabat, Maroc", category: "city", lat: 34.0209, lng: -6.8416 },
  { id: "c-fes", label: "Fès Médina", sublabel: "Fès, Maroc", category: "city", lat: 34.0331, lng: -5.0003 },
  { id: "c-tanger", label: "Tanger Centre-Ville", sublabel: "Tanger, Maroc", category: "city", lat: 35.7595, lng: -5.8340 },
  { id: "c-chefchaouen", label: "Chefchaouen", sublabel: "Rif, Maroc", category: "city", lat: 35.1688, lng: -5.2636 },
  { id: "c-ouarzazate", label: "Ouarzazate", sublabel: "Sud, Maroc", category: "city", lat: 30.9200, lng: -6.9100 },
  { id: "c-merzouga", label: "Merzouga (Dunes)", sublabel: "Sahara, Maroc", category: "city", lat: 31.0994, lng: -4.0128 },
];

export const HOTELS: LocationOption[] = [
  // VIP partners — always shown first
  { id: "h-riad-boya-surf", label: "Riad Boya Surf - Lodge", sublabel: "Rue Bahreine, 80000 Agadir, Maroc", category: "hotel", vip: true, lat: 30.4278, lng: -9.5981 },
  { id: "h-anker-surf-house", label: "Anker Surf House", sublabel: "Av. Ibn Baja, 80000 Agadir, Maroc", category: "hotel", vip: true, lat: 30.4278, lng: -9.5981 },

  { id: "h-hotel-not-listed", label: "Mon hôtel n'est pas dans la liste", sublabel: "Autre — précisez l'adresse", category: "hotel", lat: 30.4278, lng: -9.5981 },
  { id: "h-aferni", label: "Aferni Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4210, lng: -9.5980 },
  { id: "h-agyad", label: "Agyad Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.5990 },
  { id: "h-allegro", label: "Allegro Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.5990 },
  { id: "h-amadil-ocean", label: "Amadil Ocean Club Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-amda-taghazout", label: "Amda Residence Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-amouage", label: "Amouage by Surf Maroc", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-anezi-tower", label: "Anezi Tower Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4210, lng: -9.6000 },
  { id: "h-anza-surf", label: "Anza Surf House", sublabel: "Anza, Maroc", category: "hotel", lat: 30.4550, lng: -9.6400 },
  { id: "h-founty-beach", label: "Appart Hotel Founty Beach", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-sofines", label: "Appart Hotel Sofines", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-argana", label: "Argana Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4210, lng: -9.5990 },
  { id: "h-atlantic", label: "Atlantic Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-atlantic-palm", label: "Atlantic Palm Beach Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-bahia-city", label: "Bahia City Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4210, lng: -9.5990 },
  { id: "h-beach-club", label: "Beach Club Hotel Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-bianca-beach", label: "Bianca Beach Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-blue-waves", label: "Blue Waves Surf House Anza", sublabel: "Anza, Maroc", category: "hotel", lat: 30.4550, lng: -9.6400 },
  { id: "h-borjs-suites", label: "Borjs Hotel Suites Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-caribbean-agador", label: "Caribbean Village Agador", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-club-almoggar", label: "Club Al Moggar Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-club-marmara", label: "Club Marmara Les Jardins D'Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-dar-maktoub", label: "Dar Maktoub", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-decameron-tafoukt", label: "Decameron Tafoukt Beach Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-dfrost-almugar", label: "Dfrost Almugar Taghazout Villa - Surf & Yoga", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-dominium", label: "Dominium Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-dominium-palace", label: "Dominium Palace Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-dunes-dor", label: "Dunes d'Or Ocean Club", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-el-pueblo", label: "El Pueblo Tamlelt Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-fairmont-taghazout", label: "Fairmont Taghazout Bay", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5460, lng: -9.7080 },
  { id: "h-golden-beach", label: "Golden Beach Appart'Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-hamilton", label: "Hamilton Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-hilton-taghazout", label: "Hilton Taghazout Bay Beach Resort & Spa", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5470, lng: -9.7070 },
  { id: "h-hyatt-place-taghazout", label: "Hyatt Place Taghazout Bay", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5450, lng: -9.7092 },
  { id: "h-hyatt-regency-taghazout", label: "Hyatt Regency Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5470, lng: -9.7070 },
  { id: "h-iberostar-founty", label: "Iberostar Waves Founty Beach", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-ibis-budget", label: "Ibis Budget Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-kamal", label: "Kamal Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-kekai-surf", label: "Kekai Surf House", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-kenzi-europa", label: "Kenzi Europa TUI Sunseo Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-khalij", label: "Khalij Agadir Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-la-source", label: "La Source Beach Apartments", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-la-suite", label: "La Suite Hotel Boutique", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-les-omayades", label: "Les Omayades Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-mabrouk", label: "Mabrouk Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-manader", label: "Manader Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-marriott-taghazout", label: "Marriott Resort Taghazout Bay", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5460, lng: -9.7080 },
  { id: "h-marina-agadir", label: "Marina Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4260, lng: -9.6280 },
  { id: "h-munga", label: "Munga Guesthouse Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-new-farah", label: "New Farah Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-oasis", label: "Oasis Hotel & Spa", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-ocean-atlantic", label: "Ocean Atlantic View", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-odyssee", label: "Odyssee Park", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-omega", label: "Omega Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-palais-roses", label: "Palais Des Roses Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-palm-taghazout", label: "Palm Hotel Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-paradis-plage", label: "Paradis Plage Surf Yoga & Spa", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-petit-palace", label: "Petit Palace Suites Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-petite-suede", label: "Petite Suede Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-pickalbatros", label: "Pickalbatros White Beach Resort Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-radisson-blu-taghazout", label: "Radisson Blu Resort Taghazout Bay", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5460, lng: -9.7080 },
  { id: "h-radisson-residences", label: "Radisson Residences Taghazout Bay", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5460, lng: -9.7080 },
  { id: "h-residence-fleurie", label: "Residence Fleurie", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-residence-igoudar", label: "Residence Igoudar", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-residence-intouriste", label: "Residence Intouriste", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-residence-yasmina", label: "Residence Yasmina", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-riad-dar-haven", label: "Riad Dar Haven", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-riad-chtis", label: "Riad Les Chtis D'Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-riad-salam", label: "Riad Salam Hotel Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-riad-villa-blanche", label: "Riad Villa Blanche Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-rihab", label: "Rihab Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-riu-palace-tikida-agadir", label: "Riu Palace Tikida Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-riu-palace-tikida-taghazout", label: "Riu Palace Tikida Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-riu-tikida-beach", label: "Riu Tikida Beach Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-riu-tikida-dunas", label: "Riu Tikida Dunas Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-robinson", label: "Robinson Hotel Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-rofaida", label: "Rofaida Appart'Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-royal", label: "Royal Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-royal-mirage", label: "Royal Mirage Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-sable-dor", label: "Sable D'or Appart Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-sahara", label: "Sahara Hotel Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-sindibad", label: "Sindibad Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-sofitel-royal-bay", label: "Sofitel Agadir Royal Bay Resort", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4084, lng: -9.6280 },
  { id: "h-sofitel-thalassa", label: "Sofitel Agadir Thalassa Sea & Spa", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4084, lng: -9.6280 },
  { id: "h-studiotel-afoud", label: "Studiotel Afoud", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-suite-tilila", label: "Suite Hotel Tilila", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-sundesk", label: "SunDesk Coworking Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-surf-coast", label: "Surf Coast Morocco - Surf & Yoga House", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-surf-maroc-auberge", label: "Surf Maroc's Auberge", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-surf-one-tamraght", label: "Surf One Hotel Tamraght", sublabel: "Tamraght, Maroc", category: "hotel", lat: 30.5100, lng: -9.6800 },
  { id: "h-tagadirt", label: "Tagadirt Appart Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-taghazout-marriott", label: "Taghazout Bay Marriott Resort", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5460, lng: -9.7080 },
  { id: "h-taghazout-ocean-view", label: "Taghazout Ocean View", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-taghazout-palm", label: "Taghazout Palm Hotel", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-taghazout-pharmacy", label: "Taghazout Pharmacy (Taxi Bus station)", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-taghazout-villa-surfmaroc", label: "Taghazout Villa by Surf Maroc", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-tamraght-pharmacy", label: "Tamraght Pharmacy", sublabel: "Tamraght, Maroc", category: "hotel", lat: 30.5100, lng: -9.6800 },
  { id: "h-teddy-pirate", label: "Teddy Pirate Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-lunar-surf", label: "The Lunar Surf House Tamraght", sublabel: "Tamraght, Maroc", category: "hotel", lat: 30.5100, lng: -9.6800 },
  { id: "h-the-view", label: "The View Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-tikida-golf", label: "Tikida Golf Palace Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-tildi", label: "Tildi Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-timoulay", label: "Timoulay & Spa Hotel Agadir", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
  { id: "h-valeria-jardin", label: "Valeria Jardin D'Agadir Resort", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4180, lng: -9.6170 },
  { id: "h-white-beach", label: "White Beach Resort Taghazout", sublabel: "Taghazout, Maroc", category: "hotel", lat: 30.5445, lng: -9.7098 },
  { id: "h-zephyr", label: "Zephyr Hotel", sublabel: "Agadir, Maroc", category: "hotel", lat: 30.4200, lng: -9.6000 },
];

export const ALL_LOCATIONS: LocationOption[] = [...AIRPORTS, ...CITIES, ...HOTELS];

export function findLocationByLabel(label: string): LocationOption | undefined {
  if (!label) return undefined;
  const norm = label.trim().toLowerCase();
  return ALL_LOCATIONS.find((l) => l.label.toLowerCase() === norm);
}
