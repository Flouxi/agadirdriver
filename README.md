# Agadir Driver

Private airport transfers, city rides and hourly chauffeurs in Agadir and across Morocco.

## Development

Requires Node.js 22.12+ and pnpm 10.

```sh
git clone https://github.com/Flouxi/agadirdriver.git
cd agadirdriver
pnpm install --frozen-lockfile
pnpm dev
```

## Checks

```sh
pnpm exec tsc --noEmit
node --test tests/booking.test.mjs
pnpm build
```

## Booking flow

The responsive booking form carries the route, Morocco-local pickup time, group size, hourly duration, return schedule and selected vehicle through to the request page. Vehicles are filtered by passenger capacity. Prices are recalculated from the tariff catalog, never accepted from a URL price.

The final page prepares a WhatsApp request to the existing Agadir Driver business number. The passenger reviews it, opens WhatsApp and sends it. The team confirms availability, the final fare and payment arrangements directly.

There is currently no booking database, email delivery or online payment integration. The interface does not collect card details or claim a booking has been saved, paid or confirmed.

## Content and configuration

- Tariffs, return discount and vehicle tiers: src/data/tariffs.ts
- Location catalog: src/data/locations.ts
- Fleet and supplied testimonials: src/data.ts
- Business contact details: src/data/seo.ts
- English and French UI: src/lib/copy.ts and src/lib/i18n.tsx

Keep vehicle availability, passenger/luggage limits and tariff data up to date. Custom addresses without an approved tariff require a confirmed quote. Map routing is indicative and degrades to an estimate or an address-confirmation message when unavailable.

## Deployment

The TanStack Start application uses the existing Vercel/Nitro configuration. Review the branch preview and quality checks before merging into the production branch.

The route map uses standard OpenStreetMap tiles by default. For a configured map service, set VITE_MAP_TILE_URL and VITE_MAP_TILE_ATTRIBUTION together. Keep attribution visible and preserve browser caching and referrer behavior.
