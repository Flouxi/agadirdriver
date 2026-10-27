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
  assert.equal(localDate(new Date("2030-07-01T23:30:00Z")), "2030-07-02");
});
