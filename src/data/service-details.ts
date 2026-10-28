// Route-specific guidance uses existing destinations, fleet and booking behavior.
export const SERVICE_DETAILS = {
  "/agadir-airport-transfer": [
    {
      title: [
        "Airport pickup or a taxi to Agadir?",
        "Prise en charge aéroport ou taxi vers Agadir ?",
      ],
      body: [
        "Arrange a private vehicle from Agadir Al Massira Airport (AGA) to Agadir city, Taghazout or Tamraght. Your request goes to our local team; the pickup point, availability and final fare are confirmed before the journey. An airport taxi search and a private airport transfer lead to the same booking service here.",
        "Organisez un véhicule privé depuis l'aéroport Agadir Al Massira (AGA) vers Agadir, Taghazout ou Tamraght. Notre équipe confirme le rendez-vous, la disponibilité et le tarif final avant le trajet. Le taxi aéroport et le transfert privé correspondent ici au même service de réservation.",
      ],
    },
    {
      title: ["Choose the vehicle for your luggage, too", "Choisissez aussi selon vos bagages"],
      body: [
        "Economy Sedan accommodates up to 3 passengers and 2 medium suitcases; Comfort Sedan up to 4 passengers and 3 medium suitcases. Comfort Van is the larger option for up to 7 passengers. Mention surfboards, large bags and child-seat requests so the team can confirm a suitable arrangement.",
        "La berline économique accueille jusqu'à 3 passagers et 2 valises moyennes ; la berline confort jusqu'à 4 passagers et 3 valises moyennes. Le van confort convient aux groupes jusqu'à 7 passagers. Précisez les planches, grands bagages et sièges enfants pour confirmer une solution adaptée.",
      ],
    },
  ],
  "/agadir-taxi": [
    {
      title: [
        "Private hotel pickups and local journeys",
        "Départs d'hôtel et trajets locaux privés",
      ],
      body: [
        "Use this service for a pre-arranged private ride from your hotel, apartment or other address in Agadir. Enter both ends of the journey to compare vehicles. These are Agadir Driver's private-vehicle fares, not a public taxi-meter quotation; our team confirms the actual pickup and final price.",
        "Organisez un trajet privé depuis votre hôtel, appartement ou autre adresse à Agadir. Indiquez les deux étapes pour comparer les véhicules. Il s'agit des tarifs de véhicules privés Agadir Driver, pas d'un devis au compteur de taxi public ; notre équipe confirme le départ et le prix final.",
      ],
    },
    {
      title: ["Agadir city to the coast", "D'Agadir vers la côte"],
      body: [
        "A ride starting in Agadir city is a different route from a pickup at Al Massira Airport. Select your actual hotel or address for journeys to Taghazout, Tamraght or Taghazout Bay. Add a return if you already know when you want to travel back; both legs appear in the request for confirmation.",
        "Un départ d'Agadir ville est différent d'une prise en charge à l'aéroport Al Massira. Sélectionnez votre hôtel ou adresse exacte vers Taghazout, Tamraght ou Taghazout Bay. Ajoutez un retour si vous connaissez déjà vos horaires ; les deux trajets figurent dans la demande à confirmer.",
      ],
    },
  ],
  "/private-driver-agadir": [
    {
      title: ["Hourly hire or a single transfer?", "Mise à disposition ou transfert simple ?"],
      body: [
        "Choose By the hour when you need a driver around a schedule with several stops. Select the pickup and duration, then describe the intended itinerary in the notes. For one journey between two addresses, switch to Transfer and compare the route fare instead.",
        "Choisissez À l'heure pour un programme avec plusieurs arrêts. Sélectionnez le départ et la durée, puis décrivez l'itinéraire dans les remarques. Pour un seul trajet entre deux adresses, passez à Transfert pour comparer le tarif du parcours.",
      ],
    },
    {
      title: ["Confirm the itinerary before you travel", "Confirmez l'itinéraire avant le départ"],
      body: [
        "Tell our team the places you want to visit, expected stops, passenger count and luggage. Our team confirms the route, vehicle availability, final fare and payment arrangements. Extra time, longer distances and special access should be agreed before you confirm; selecting hours alone does not confirm an itinerary.",
        "Indiquez les lieux à visiter, les arrêts, les passagers et les bagages. Notre équipe confirme le parcours, le véhicule, le tarif final et le paiement. Le temps supplémentaire, les longues distances et les accès particuliers sont à convenir avant confirmation ; choisir une durée ne confirme pas l'itinéraire.",
      ],
    },
  ],
  "/airport-transfer-taghazout": [
    {
      title: ["Taghazout village or Taghazout Bay?", "Taghazout village ou Taghazout Bay ?"],
      body: [
        "Choose the exact accommodation rather than only Taghazout. The booking catalog includes village stays and Taghazout Bay hotels such as Hyatt Place and Fairmont. A precise property name lets the team confirm the correct drop-off; for an apartment or surf camp, add the address or meeting instructions in the notes.",
        "Choisissez l'hébergement exact plutôt que seulement Taghazout. Le catalogue propose des hébergements du village et des hôtels de Taghazout Bay, dont Hyatt Place et Fairmont. Un nom précis facilite la confirmation de l'arrivée ; ajoutez l'adresse ou le rendez-vous pour un appartement ou surf camp.",
      ],
    },
    {
      title: [
        "Plan surfboards and the airport return",
        "Prévoyez les planches et le retour aéroport",
      ],
      body: [
        "Include the number of passengers, bags and surfboards before the vehicle is confirmed. If you also need a departure transfer, select Add return and use the pickup time from your accommodation, not the flight departure time. Our team confirms the meeting point and final arrangements for each leg.",
        "Précisez les passagers, bagages et planches avant de confirmer le véhicule. Pour le trajet de départ, sélectionnez Ajouter retour et indiquez l'heure de prise en charge à l'hébergement, pas l'heure du vol. Notre équipe confirme le rendez-vous et les modalités de chaque trajet.",
      ],
    },
  ],
  "/airport-transfer-tamraght": [
    {
      title: [
        "A direct request for your Tamraght accommodation",
        "Une demande directe vers votre hébergement à Tamraght",
      ],
      body: [
        "Select Agadir Al Massira Airport as pickup and the actual Tamraght hotel, apartment or surf house as destination. If the property is missing from the list, enter its full address and add meeting instructions. Custom addresses without a published fare need an individual quote; our team confirms the destination before booking.",
        "Sélectionnez l'aéroport Agadir Al Massira au départ et l'hôtel, appartement ou surf house exact à Tamraght. Si le lieu manque, saisissez son adresse complète et précisez le rendez-vous. Les adresses sans tarif publié sont chiffrées sur devis ; notre équipe confirme l'arrivée avant réservation.",
      ],
    },
    {
      title: ["Make the request fit your arrival", "Adaptez la demande à votre arrivée"],
      body: [
        "Send your flight number, Morocco-local pickup date and time, passenger count and luggage details. For surfboards or a child seat, use the optional request notes so suitability can be confirmed. Your transfer is booked only after the team confirms availability and the final fare; preparing the message alone does not reserve a vehicle.",
        "Indiquez le vol, la date et l'heure locale du Maroc, les passagers et les bagages. Utilisez les remarques facultatives pour les planches ou sièges enfants afin d'en confirmer la faisabilité. Le transfert est réservé après confirmation du tarif et de la disponibilité ; préparer le message ne réserve pas de véhicule.",
      ],
    },
  ],
} as const;
