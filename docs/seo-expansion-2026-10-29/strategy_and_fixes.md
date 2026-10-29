# Agadir Driver — airport and transport expansion

29 October 2026. UK/English and France/French. This extends the fifteen primary targets already approved by the owner; it adds relevant secondary coverage to existing pages, with no new keyword doorway pages.

## Measured demand and targeting

| Query | Market | Monthly range | Decision |
|---|---|---|---|
| airport transfer | UK | 10K–100K | Broad discovery seed. Not a primary target for a local Agadir page; the query includes demand for other airports. |
| agadir airport | UK | 1K–10K | Broader informational topic. Answer ground-transport questions on the existing airport page; flight-status intent remains different. |
| agadir airport transfers | UK | 100–1K | Approved primary commercial target for /agadir-airport-transfer. |
| agadir airport taxi | UK | 100–1K | Closely related secondary phrase on the same airport page. |
| agadir airport to taghazout | UK | 100–1K | Approved destination page; preselect the advertised destination in its booking form. |
| agadir transport | UK | 10–100 | Secondary coverage on the Agadir transfers overview. |
| aeroport agadir | France | 1K–10K | Broader arrival/ground-transport coverage on the approved French airport page. |
| taxi aeroport agadir | France | 100–1K | Approved primary French airport target. |
| taxi agadir | France | 100–1K | Approved French city-ride page; clearly describe private fares. |
| transport agadir | France | 10–100 | Related secondary wording on the approved city-ride page. |

Source: the signed-in Google Ads Keyword Planner, Google network, Oct 2025–Sep 2026, captured 29 October 2026. Ranges are estimates, and close variants can share demand. Do not add the ranges together or use advertising competition as an organic-difficulty score.

The two discovery results returned **279 UK and 193 France rows**, all captured from the rendered tables. Combined with the earlier research, after deduplicating by market and normalized keyword, there are **556 records**: 111 mapped phrases, 2 supporting broad topics, 332 excluded and 111 deferred. There are 342 additional unique records compared with the earlier 216-row research. A final intent review excluded hotel-name-only searches, named transport operators, public-taxi-specific requests and low-demand ranges so they are not misreported as private-transfer opportunities. The new discovery samples overlap the earlier samples; 472 plus 216 is not the unique total.

## Implemented website improvements

- Distinguish the homepage's Agadir-transfer/private-transport overview from the dedicated Agadir airport-transfer page's commercial intent. Preserve the approved primary phrases and stable URLs.
- Preselect Taghazout or Tamraght on the corresponding service landing page. Previously, the visitor still had to enter the destination advertised by the page.
- Add vehicle-selection links directly to published fare rows. These pass the actual departure, destination and transfer mode into the existing booking flow. The visitor still reviews date, time, vehicle and final confirmation.
- Add English/French airport-transport guidance: private vehicle versus AeroBus, hotel-address details, airport meeting-point confirmation and the return pickup time. Public-bus information is attributed to ALSA; no public-bus service is claimed as Agadir Driver's product.
- Tailor the six visible FAQs and matching JSON-LD to airport, coast, city and hourly intent. Preserve the explicit team-confirmation step and avoid unsupported guarantees about waiting, child seats or cancellation.
- Add crawlable footer links to the existing airport, Taghazout, Tamraght and private-driver pages. Language links retain the existing paired French routes where available.
- Increase contrast for the specific small review, destination and footer text flagged by the preceding Lighthouse run, while retaining existing brand styles.
- Add truthful sitemap last-modified dates for the 29 October content/navigation changes. This is a content-change date, not an automatically advancing ranking signal.

The UI uses the project's existing BookingBar, fare table, FAQ, header/footer and design tokens. The 21st catalog search still returned an authentication error; its component review found no issues in the six changed component/page files. No external component or new design direction was substituted.

## Validation

Type checking, production build, seventeen booking/tariff/routing regressions, production smoke, and all sixteen sitemap-page SEO checks passed locally. Added checks verify that the advertised coast destination is present in the initial booking form, fare links contain distinct valid endpoints, and every FAQ answer is present in visible content as well as JSON-LD.

The actual built Vercel app was checked at a mobile viewport. A French Taghazout service-page search retained French, the airport departure, Taghazout, tomorrow's date and vehicle prices in the booking flow. The new English fare-table link also reached the correct airport–Taghazout vehicle selection. No enquiry was sent. The page had no document-level horizontal overflow; the wider price table scrolls inside its labelled region.

## Indexing and measurements

On 29 October, Search Console still reported the airport URL as not indexed; this inspection said Google did not recognize the URL, rather than yesterday's discovered/currently-not-indexed wording. The manual indexing request was retried once and again failed with an inability to connect to Google's reCAPTCHA service. No successful indexing request is claimed.

The sitemap table showed a successful fetch dated 28 October and ten discovered URLs at the time of inspection, while the live sitemap contains sixteen URLs. That older count is not proof of current sixteen-page indexing. Re-submit the updated sitemap after deployment, then record the actual receipt and processing status separately.

Search Console's overview showed zero clicks while other data was still processing, and no field Core Web Vitals data. No number-one position, booking lift or AI-answer citation has been established. Analytics destination configuration is still unverified. The previous lab score remains a dated observation, not a new measurement for this release.

## Research and method limits

The 100,000-input historical-metrics test is **not completed**. Today's 472 discovery rows and the combined 556-row dataset are not a substitute for that count. Completing a genuine larger pass requires a relevant, sourced candidate dataset and supported bulk historical-metrics processing; no fabricated combinations, invented demand or duplicate-count inflation is included.

The supplied skill permits reusable templates on the current CMS. This release uses that portable path on the working React/Vercel site. Claude access and a Webflow migration have not been performed or reported as completed. The first batch was published yesterday, so its two-to-four-week measurement window has not elapsed; improve its answers and booking path before creating large new page batches.

## Sources and competitive context

- [ALSA's own airport-shuttle page](https://www.alsa.ma/en/navette-aeroport) publishes the Agadir airport/city route and 50 MAD one-way or 80 MAD return fares per person. The site links to its current timetable rather than copying a timetable that could become stale.
- [Agadir Mobilité's AeroBus description](https://www.agadirmobilite.ma/activites/reseau-des-bus-conventionnels/navette-aerobus/) independently documents that route and fare basis.
- [Agadir Discovery Tours' transfer page](https://agadirdiscoverytours.com/transfers) visibly offers vehicle prices and pickup/booking guidance. [Trans Agadir's airport page](https://www.trans-agadir.com/taxi-aeroport/) publishes route/group fare tables. These public pages show that relevant competitors already address prices and pickup concerns; this run does not label the niche uncompetitive or promise to outrank them.
- [Google's historical-metrics documentation](https://developers.google.com/google-ads/api/docs/keyword-planning/generate-historical-metrics) explains supported batches and close-variant merging. [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) explains that changes take time and do not automatically produce first place.

The public research search was not a controlled, signed-out UK/France mobile ranking test. It establishes examples of competing content, not precise positions.
