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
    title: "Agadir Airport Transfer | Private Door-to-Door Ride",
    description: "Book an Agadir airport transfer to your hotel, Taghazout, Tamraght, or Agadir with a private driver and simple WhatsApp booking.",
    h1: "Agadir Airport Transfer",
    intro: "Arrange a private transfer from Agadir Al Massira Airport to your hotel, apartment, surf camp, or final destination.",
    service: "Agadir Airport Transfer",
  },
  "/agadir-airport-taxi": {
    title: "Agadir Airport Taxi | Book a Private Pickup",
    description: "Need an Agadir airport taxi? Send your flight and destination details to arrange a private pickup from Agadir Al Massira Airport.",
    h1: "Agadir Airport Taxi",
    intro: "Request a direct airport taxi from Agadir Al Massira Airport with pickup details confirmed before you travel.",
    service: "Agadir Airport Taxi",
  },
  "/agadir-taxi": {
    title: "Agadir Taxi | Local Rides and Hotel Transfers",
    description: "Book an Agadir taxi for hotel transfers, city rides, Taghazout trips, and local journeys with straightforward WhatsApp booking.",
    h1: "Agadir Taxi",
    intro: "Book a local taxi for Agadir hotels, the city centre, the airport, and nearby Atlantic-coast destinations.",
    service: "Agadir Taxi",
  },
  "/private-driver-agadir": {
    title: "Private Driver Agadir | Chauffeur for Your Trip",
    description: "Hire a private driver in Agadir for airport transfers, sightseeing, business travel, and flexible rides across Souss-Massa.",
    h1: "Private Driver in Agadir",
    intro: "Travel around Agadir with a private driver for airport pickups, day trips, business journeys, or flexible local transport.",
    service: "Private Driver in Agadir",
  },
  "/airport-transfer-taghazout": {
    title: "Airport Transfer Taghazout | Agadir Airport Pickup",
    description: "Book a private airport transfer from Agadir to Taghazout with room for luggage and surf equipment when arranged in advance.",
    h1: "Airport Transfer to Taghazout",
    intro: "Arrange a direct transfer from Agadir Al Massira Airport to Taghazout hotels, apartments, and surf camps.",
    service: "Airport Transfer to Taghazout",
  },
  "/airport-transfer-tamraght": {
    title: "Airport Transfer Tamraght | Private Agadir Pickup",
    description: "Arrange a private airport transfer from Agadir to Tamraght with your flight, accommodation, and passenger details.",
    h1: "Airport Transfer to Tamraght",
    intro: "Travel directly from Agadir Al Massira Airport to your Tamraght accommodation with a pre-arranged private ride.",
    service: "Airport Transfer to Tamraght",
  },
} as const;

export type ServicePage = (typeof SERVICE_PAGES)[keyof typeof SERVICE_PAGES];

export const BLOG_POSTS = [
  {
    path: "/blog/how-to-get-from-agadir-airport-to-taghazout",
    category: "Airport Transfers",
    title: "How to Get From Agadir Airport to Taghazout",
    description: "Compare private transfers, taxis, and buses for the journey from Agadir Al Massira Airport to Taghazout.",
    sections: [
      ["The easiest option after landing", "A pre-arranged private transfer takes you from Agadir Al Massira Airport to your exact hotel, surf camp, or apartment in Taghazout. Send your flight number and accommodation address before travelling."],
      ["Taxi, bus, or private transfer?", "A bus can suit travellers on a tight budget, while a private ride is useful for families, surf groups, luggage, and direct hotel drop-off. The right choice depends on your budget, arrival time, and destination."],
      ["What to send when booking", "Include your flight number, landing time, destination or map pin, passenger count, luggage, surfboards, and return-flight details if you need an airport drop-off."],
    ],
  },
  {
    path: "/blog/agadir-airport-transfer-prices-and-booking-guide",
    category: "Travel Planning",
    title: "Agadir Airport Transfer Prices and Booking Guide",
    description: "Learn what affects an Agadir airport transfer quote and which details to send when booking by WhatsApp.",
    sections: [
      ["Why route details affect the quote", "A transfer quote depends on the destination, passengers, luggage, vehicle size, and any special equipment. Send the exact address or map pin for a clear request."],
      ["How to book by WhatsApp", "Send your flight number, arrival date and time, destination, passengers, bags, and any child-seat or surfboard requirements. Ask for the current quote and keep the confirmation message."],
      ["Plan the return journey too", "If you know your departure details, include the pickup address, pickup time, flight time, and number of passengers in the first message."],
    ],
  },
  {
    path: "/blog/agadir-to-taghazout-transport-options",
    category: "Agadir Guides",
    title: "Agadir to Taghazout: Taxi, Bus, or Private Driver?",
    description: "Compare practical transport options for travelling from Agadir to Taghazout, including taxis, buses, and private drivers.",
    sections: [
      ["Choose based on your travel style", "The bus is often the budget choice, a local taxi can suit a flexible short trip, and a private driver is convenient for families, surf groups, multiple bags, or direct pickup."],
      ["When a private driver makes sense", "A private ride is useful when you want hotel pickup, a fixed plan, extra luggage space, or a return journey arranged in advance."],
      ["Helpful details for a smoother journey", "Use the exact accommodation name, ask about luggage and boards, and confirm the pickup time. A map pin is useful for surf camps and apartments outside Taghazout centre."],
    ],
  },
] as const;
