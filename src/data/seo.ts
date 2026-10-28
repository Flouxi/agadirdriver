export const BUSINESS = {
  name: "AgadirDriver",
  url: "https://agadirdriver.com",
  phone: "+212 673 787 604",
  phoneHref: "tel:+212673787604",
  whatsapp: "https://wa.me/212673787604",
  address: "Anza, Agadir 80000, Morocco",
  areas: ["Agadir", "Agadir Al Massira Airport", "Taghazout", "Tamraght", "Souss-Massa region"],
};

export const SERVICE_PAGES = {
  "/agadir-airport-transfer": {
    title: "Agadir Airport Transfer & Taxi | Agadir Driver",
    description:
      "Compare private Agadir airport transfers to Agadir, Taghazout and Tamraght. See per-vehicle fares and confirm your ride with our local team.",
    h1: "Agadir Airport Transfers",
    intro:
      "Arrange a private transfer from Agadir Al Massira Airport to your hotel, apartment, surf camp, or final destination.",
    service: "Agadir Airport Transfer",
  },
  "/agadir-taxi": {
    title: "Agadir Taxi & Private City Rides | Agadir Driver",
    description:
      "Compare Agadir private city ride fares and arrange pickup from your hotel or address. Our team confirms the route, vehicle and final price.",
    h1: "Agadir Taxi",
    intro:
      "Book a local taxi for Agadir hotels, the city centre, the airport, and nearby Atlantic-coast destinations.",
    service: "Agadir Taxi",
  },
  "/private-driver-agadir": {
    title: "Chauffeur in Agadir | Private Driver Hire | Agadir Driver",
    description:
      "Hire a private driver in Agadir for airport transfers, day trips, business travel, and local rides.",
    h1: "Private Driver in Agadir",
    intro:
      "Travel around Agadir with a private driver for airport pickups, day trips, business journeys, or flexible local transport.",
    service: "Private Driver in Agadir",
  },
  "/airport-transfer-taghazout": {
    title: "Agadir Airport to Taghazout Transfer | Agadir Driver",
    description:
      "Book a private airport transfer from Agadir Airport to Taghazout for hotels and surf camps.",
    h1: "Agadir Airport to Taghazout Transfer",
    intro:
      "Arrange a direct transfer from Agadir Al Massira Airport to Taghazout hotels, apartments, and surf camps.",
    service: "Airport Transfer to Taghazout",
  },
  "/airport-transfer-tamraght": {
    title: "Agadir Airport to Tamraght Transfer | Agadir Driver",
    description:
      "Arrange a private airport transfer from Agadir Airport to Tamraght with your flight details.",
    h1: "Agadir Airport to Tamraght Transfer",
    intro:
      "Travel directly from Agadir Al Massira Airport to your Tamraght accommodation with a pre-arranged private ride.",
    service: "Airport Transfer to Tamraght",
  },
} as const;

export type ServicePage = (typeof SERVICE_PAGES)[keyof typeof SERVICE_PAGES];

export const BLOG_POSTS = [
  {
    path: "/blog/how-to-get-from-agadir-airport-to-taghazout",
    category: "Airport Transfers",
    title: "How to Get From Agadir Airport to Taghazout",
    description:
      "Compare private transfers, taxis, and buses for the journey from Agadir Al Massira Airport to Taghazout.",
    sections: [
      [
        "The easiest option after landing",
        "A pre-arranged private transfer takes you from Agadir Al Massira Airport to your exact hotel, surf camp, or apartment in Taghazout. Send your flight number and accommodation address before travelling.",
      ],
      [
        "Taxi, bus, or private transfer?",
        "A bus can suit travellers on a tight budget, while a private ride is useful for families, surf groups, luggage, and direct hotel drop-off. The right choice depends on your budget, arrival time, and destination.",
      ],
      [
        "What to send when booking",
        "Include your flight number, landing time, destination or map pin, passenger count, luggage, surfboards, and return-flight details if you need an airport drop-off.",
      ],
    ],
  },
  {
    path: "/blog/agadir-airport-transfer-prices-and-booking-guide",
    category: "Travel Planning",
    title: "Agadir Airport Taxi Prices: Private Transfer Guide",
    description:
      "Compare Agadir Driver's private airport-transfer fares per vehicle. See what is included and which journey details are needed to confirm a quote.",
    sections: [
      [
        "Why route details affect the quote",
        "A transfer quote depends on the destination, passengers, luggage, vehicle size, and any special equipment. Send the exact address or map pin for a clear request.",
      ],
      [
        "How to book by WhatsApp",
        "Send your flight number, arrival date and time, destination, passengers, bags, and any child-seat or surfboard requirements. Ask for the current quote and keep the confirmation message.",
      ],
      [
        "Plan the return journey too",
        "If you know your departure details, include the pickup address, pickup time, flight time, and number of passengers in the first message.",
      ],
    ],
  },
  {
    path: "/blog/agadir-to-taghazout-transport-options",
    category: "Agadir Guides",
    title: "Agadir to Taghazout: Taxi, Bus, or Private Driver?",
    description:
      "Compare practical transport options for travelling from Agadir to Taghazout, including taxis, buses, and private drivers.",
    sections: [
      [
        "Choose based on your travel style",
        "The bus is often the budget choice, a local taxi can suit a flexible short trip, and a private driver is convenient for families, surf groups, multiple bags, or direct pickup.",
      ],
      [
        "When a private driver makes sense",
        "A private ride is useful when you want hotel pickup, a fixed plan, extra luggage space, or a return journey arranged in advance.",
      ],
      [
        "Helpful details for a smoother journey",
        "Use the exact accommodation name, ask about luggage and boards, and confirm the pickup time. A map pin is useful for surf camps and apartments outside Taghazout centre.",
      ],
    ],
  },
] as const;
