# Agadir Driver template specification

The owner approved 15 primary targets and six French pages on 28 October 2026. The implementation retains the existing React/TanStack website and booking flow.

## Data and templates

| Template | Data source | Required visible content | Structured data |
|---|---|---|---|
| Airport/city/hourly/destination service | `src/data/seo.ts`, `src/data/service-details.ts`; French metadata in `src/data/french-pages.ts` | One H1, direct service answer, usable booking form, route-specific guidance, applicable real fares, booking steps, six factual booking FAQs, related services | Existing LocalBusiness plus Service, WebPage, BreadcrumbList and matching FAQPage |
| Price/route guide | English guide records in `src/data/seo.ts`; French guide records in `src/data/french-pages.ts` | One H1, direct opening answer, distinct practical sections, applicable tariff table, contextual service links, real next step, six factual booking FAQs | Existing LocalBusiness plus Article and matching FAQPage; French guides also include visible breadcrumbs and BreadcrumbList |
| Homepage | Existing homepage and shared booking components | Broad transfer overview, usable route selection, real fleet details and service links | Existing LocalBusiness and matching booking FAQPage |

Each selected page has one primary search intent. Synonyms are secondary terms on that page. French pages are language counterparts, not separate doorway pages for repeated phrases. No hotel-name-only landing pages were generated.

## Maintained fields and rules

- Unique title, description and canonical URL. Natural language takes priority over exact phrase repetition; no keyword-density quota.
- English/French pairs use self canonicals and reciprocal `hreflang` links for `en`, `fr` and `x-default`. Published French URLs return French text and `lang="fr"` in the initial server HTML.
- Navigation and visible language links connect the actual counterparts. A French page keeps French when the visitor moves into the shared booking flow.
- Service fields: real service name, location, introduction, useful sections, actual booking behavior, associated English source service and French canonical path.
- Guide fields: heading, introduction, factual sections, appropriate price table, service links and an actual contact/booking next step. No fabricated author identity or publication date.
- Price tables derive from `src/data/tariffs.ts`: EUR, whole vehicle, one way. Availability and final price need team confirmation. No public taxi-meter fare is invented.
- FAQ markup is generated from the same six visible question/answer records. Schema JSON is safely serialized and parsed in checks. Google discontinued FAQ rich results in May 2026; this markup is not a promise of a Google FAQ feature or ranking benefit. Source: https://developers.google.com/search/updates
- Images preserve existing brand subjects and transparency. Optimized WebP assets and self-hosted, licensed Poppins fonts reduce delivery cost. Original image files remain available.

## Verification

Checks cover TypeScript, the production build, 17 booking/routing regressions, server smoke checks, all sixteen sitemap pages, missing-page 404s, the airport alias 301, checkout noindex, unique metadata, French server output, reciprocal language references, local image existence and visible FAQ/schema consistency. Syntax tests are separate from external rich-result eligibility validation.
