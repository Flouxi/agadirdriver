import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cache = join(root, ".quality-cache");
const sources = [
  "src/lib/booking.ts",
  "src/lib/pricing.ts",
  "src/data/locations.ts",
  "src/data/tariffs.ts",
  "src/lib/location-search.ts",
  "src/lib/enquiry.ts",
  "src/lib/conversion.ts",
];
for (const source of sources) {
  const destination = join(cache, source.replace(/\.ts$/, ".mjs"));
  mkdirSync(dirname(destination), { recursive: true });
  const output = ts
    .transpileModule(readFileSync(join(root, source), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace(
      /(from\s+["'])(\.[^"']+)(["'])/g,
      (_, before, name, after) => before + name.replace(/\.ts$/, "") + ".mjs" + after,
    );
  writeFileSync(destination, output);
}
process.on("exit", () => rmSync(cache, { recursive: true, force: true }));
const { bookingSearchSchema, validateBooking, fitsPassengers, bookingHref, localDate } =
  await import(pathToFileURL(join(cache, "src/lib/booking.mjs")).href);
const { calculateRoutePrice } = await import(
  pathToFileURL(join(cache, "src/lib/pricing.mjs")).href
);
const { FIXED_ROUTES, priceForTier, RETURN_DISCOUNT, ZONES } = await import(
  pathToFileURL(join(cache, "src/data/tariffs.mjs")).href
);
const valid = () =>
  bookingSearchSchema.parse({
    from: "Agadir Airport",
    to: "Taghazout",
    date: "2030-11-04",
    time: "12:00",
    pax: 2,
  });
const now = new Date("2030-11-01T10:00:00Z");
const vehicle = { id: "economy-sedan", tier: "economy", passengers: 3 };

test("future pickup, invalid calendar dates, identical endpoints and past dates", () => {
  assert.equal(validateBooking(valid(), now), null);
  assert.equal(validateBooking({ ...valid(), date: "2030-02-30" }, now), "past");
  assert.equal(validateBooking({ ...valid(), date: "2020-01-01" }, now), "past");
  assert.equal(validateBooking({ ...valid(), to: " agadir airport " }, now), "same");
  assert.equal(validateBooking({ ...valid(), from: "" }, now), "from");
});
test("return requires an actual later pickup, including its time", () => {
  const trip = { ...valid(), hasReturn: true, returnDate: "2030-11-04", returnTime: "11:59" };
  assert.equal(validateBooking(trip, now), "return");
  assert.equal(validateBooking({ ...trip, returnTime: "12:00" }, now), "return");
  assert.equal(validateBooking({ ...trip, returnDate: "2030-11-05" }, now), null);
  assert.equal(validateBooking({ ...trip, returnDate: "2030-02-30" }, now), "return");
});
test("hourly, return, passenger count and vehicle survive navigation; URL price is ignored", () => {
  const trip = { ...valid(), pax: 17, type: "hourly", hours: 8, vehicleId: "minibus-17" };
  const url = new URL(bookingHref("/checkout", trip), "https://agadirdriver.com");
  const parsed = bookingSearchSchema.parse(Object.fromEntries(url.searchParams));
  assert.deepEqual(parsed, trip);
  assert.equal(bookingSearchSchema.parse({ ...trip, price: 0.01 }).price, undefined);
  const back = { ...valid(), hasReturn: true, returnDate: "2030-11-05", returnTime: "15:00" };
  const backUrl = new URL(bookingHref("/reservation", back), "https://agadirdriver.com");
  assert.deepEqual(bookingSearchSchema.parse(Object.fromEntries(backUrl.searchParams)), back);
});
test("capacity boundaries cannot select a sedan for a group", () => {
  assert.equal(fitsPassengers(vehicle, 3), true);
  assert.equal(fitsPassengers(vehicle, 4), false);
  assert.equal(fitsPassengers(vehicle, 0), false);
  assert.equal(fitsPassengers(vehicle, 2.5), false);
  assert.equal(bookingSearchSchema.parse({ pax: 900 }).pax, 2);
  assert.equal(bookingSearchSchema.parse({ pax: "17" }).pax, 17);
});
test("published tariffs and return discount stay consistent in both directions", () => {
  for (const route of FIXED_ROUTES) {
    const label = (id) => ZONES.find((z) => z.id === id).label;
    const fixed = calculateRoutePrice({ from: label(route.from), to: label(route.to), vehicle });
    // Duplicate bidirectional rows are equivalent; every published route resolves to a fixed fare.
    assert.equal(fixed.source, "fixed-route");
    const reverse = calculateRoutePrice({ from: label(route.to), to: label(route.from), vehicle });
    assert.equal(reverse.eur, fixed.eur);
    const back = calculateRoutePrice({
      from: label(route.from),
      to: label(route.to),
      vehicle,
      hasReturn: true,
    });
    assert.equal(back.eur, Math.round(fixed.eur * 2 * (1 - RETURN_DISCOUNT)));
    assert.ok(fixed.eur > 0);
  }
  const airport = calculateRoutePrice({ from: "Agadir Airport", to: "Taghazout", vehicle });
  assert.equal(airport.eur, 30);
});
test("unknown custom addresses require a quotation instead of a fabricated local fare", () => {
  const result = calculateRoutePrice({
    from: "Unknown place 123",
    to: "Unknown place 456",
    vehicle,
  });
  assert.equal(result.quoteRequired, true);
  assert.equal(result.source, "quote");
});
test("Morocco calendar date is used at UTC midnight boundaries", () => {
  assert.equal(localDate(new Date("2024-07-01T23:30:00Z")), "2024-07-02");
});

const { findLocationByLabel } = await import(
  pathToFileURL(join(cache, "src/data/locations.mjs")).href
);
test("airport pickup coordinates stay at Al Massira rather than the city", () => {
  const airport = findLocationByLabel("Aéroport Agadir Al Massira (AGA)");
  assert.ok(airport);
  assert.ok(airport.lat > 30.31 && airport.lat < 30.34);
  assert.ok(airport.lng > -9.44 && airport.lng < -9.4);
});

const { matchesLocation } = await import(
  pathToFileURL(join(cache, "src/lib/location-search.mjs")).href
);
const { AIRPORTS, ALL_LOCATIONS } = await import(
  pathToFileURL(join(cache, "src/data/locations.mjs")).href
);
const { validateEnquiryContact, enquiryEmailHref } = await import(
  pathToFileURL(join(cache, "src/lib/enquiry.mjs")).href
);
const { trackBookingEvent } = await import(
  pathToFileURL(join(cache, "src/lib/conversion.mjs")).href
);

test("English airport searches, IATA codes and reordered names match canonical locations", () => {
  for (const query of [
    "Agadir airport",
    "airport Agadir",
    "AGA",
    "Al Massira Agadir",
    "aeroport agadir",
  ]) {
    assert.ok(matchesLocation(AIRPORTS[0], query), query);
  }
  assert.ok(matchesLocation(AIRPORTS[1], "Marrakesh airport"));
  assert.ok(matchesLocation(AIRPORTS[5], "Tangier airport"));
  assert.deepEqual(
    ALL_LOCATIONS.filter((place) => matchesLocation(place, "AGA")).map((place) => place.id),
    ["aga"],
  );
  assert.equal(matchesLocation(AIRPORTS[0], "Marrakech airport"), false);
  const hotel = ALL_LOCATIONS.find((place) => place.label === "Riu Palace Tikida Taghazout");
  assert.ok(matchesLocation(hotel, "Taghazout Tikida Palace"));
});

test("WhatsApp enquiries need a name but not duplicate contact details", () => {
  const contact = { name: "QA Traveller", email: "", phone: "" };
  assert.equal(validateEnquiryContact(contact), null);
  assert.equal(validateEnquiryContact({ ...contact, name: " " }), "name");
  assert.equal(validateEnquiryContact({ ...contact, email: "not-an-email" }), "email");
  assert.equal(validateEnquiryContact({ ...contact, email: " qa@example.com " }), null);
  assert.equal(validateEnquiryContact({ ...contact, phone: "call me tomorrow" }), "phone");
  assert.equal(validateEnquiryContact({ ...contact, phone: "+44 7700 900123" }), null);
  assert.equal(validateEnquiryContact({ ...contact, phone: "123" }), "phone");
});

test("email fallback keeps the complete journey and encodes special characters", () => {
  const message =
    "Départ: Aéroport Agadir\nNotes: 2 bags & surfboard + child seat?\nReturn: 2030-11-05 15:00";
  const email = new URL(enquiryEmailHref(message));
  assert.equal(email.protocol, "mailto:");
  assert.equal(email.pathname, "support@agadirdriver.com");
  assert.equal(email.searchParams.get("body"), message);
  assert.equal(email.searchParams.get("subject"), "Agadir Driver — Booking request");
});

test("conversion hooks send only event and service and never block the journey", () => {
  trackBookingEvent("booking_search", "transfer"); // Server rendering has no window.
  const events = [];
  const original = globalThis.window;
  globalThis.window = { dataLayer: events, dispatchEvent: (event) => events.push(event.detail) };
  try {
    trackBookingEvent("whatsapp_outbound_click", "transfer");
    assert.deepEqual(events, [
      { event: "whatsapp_outbound_click", service: "transfer" },
      { event: "whatsapp_outbound_click", service: "transfer" },
    ]);
    globalThis.window.dataLayer = {
      push() {
        throw new Error("Analytics unavailable");
      },
    };
    assert.doesNotThrow(() => trackBookingEvent("request_prepared", "hourly"));
  } finally {
    if (original === undefined) delete globalThis.window;
    else globalThis.window = original;
  }
});
