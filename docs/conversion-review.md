# Agadir Driver conversion improvements

Reviewed on 28 October 2026 (Africa/Casablanca). Scope: conversion from existing visitors to genuine received enquiries and confirmed rides. The supplied SEO Rank-One Playbook was adapted to this narrower brief: factual copy, clear service intent, useful FAQs, a usable booking journey and honest measurement. No search-ranking work, keyword expansion or traffic-generation scheme was included.

## Observed problems and implemented changes

| Priority | Observed on the live site | Change in this branch | Verification |
| --- | --- | --- | --- |
| High | Searching `Agadir airport` returned only a custom-address option, although the airport existed in the catalog. | Token matching supports English/French airport terms, reordered names, common city spellings and IATA codes. Airport-code searches resolve to the canonical airport alone. Known airport searches no longer show a competing custom-address option. | Automated alias regression checks; browser search found and selected Al Massira airport. |
| High | Checkout required name, email and telephone before preparing a WhatsApp message. | Only the name is required. Flight number is optional; email, pickup phone and special requests are in an optional disclosure. Supplied optional contact details are still validated. | Browser completed the review with a name alone; tests cover blank and invalid optional fields. |
| High | The final step required WhatsApp; the email link did not carry the prepared journey. | The review offers WhatsApp and a mailto link containing the same route, pickup, vehicle, fare and notes. Nothing is sent automatically. | Decoded email body matched the prepared request in browser and unit tests. |
| High | At 375 x 667, the homepage price button started around y=760 and ended around y=813, below the visible area. | Reduced empty hero space and adjusted mobile type/spacing while retaining the logo, photograph, gold action and existing controls. | In the tested English preview, the full button was visible (a measured intermediate revision ended at y=645). Narrow 320px layout had no horizontal overflow. Actual browser chrome can reduce available height. |
| High | Airport, taxi and driver service pages were separate text-only templates with a generic WhatsApp link and no price-comparison form. | All six existing service pages reuse the actual booking form, brand header/footer and confirmation guidance. Airport pages start at the airport; local rides start in Agadir; private-driver pages start in hourly mode. Route-specific pages ask for the actual accommodation. | Type check and production rendering; airport page visually inspected in browser. |
| Medium | Homepage messaging presented a broad Morocco offer; the WhatsApp confirmation requirement appeared later. | Headline identifies Agadir and Morocco. Supporting text explains the local-team WhatsApp handoff. Per-vehicle pricing and no online payment are visible beside the booking form. | Desktop and English/French mobile copy inspected. |
| Medium | Main Help navigation went to another promotional contact block. | Help now reaches six booking questions on confirmation, per-vehicle prices, payment, flight changes, equipment and the email option. | Native expandable details; component review found no deterministic issues. |
| Medium | Preparing a message could look like a completed action unless a visitor read the next instruction. | Review keeps explicit request/confirmation wording, focuses the new review heading, and tells customers to press Send in the chosen app. | Browser review showed the journey and both outbound links. No test messages sent. |
| Medium | A WhatsApp click alone cannot establish a received enquiry or booking. | Added small conversion hooks for search, prepared request and outbound channel clicks; payload is only event + service. | Tests verify payload and non-blocking behavior. No analytics collector was added. |

## Measurement baseline

The actual visitor count, received-enquiry rate, confirmed-booking rate, revenue per visitor, device mix and response time were **not available** in the connected source/deployment tools. They are unknown, not zero. No conversion uplift, competitive lead or number-one position is claimed.

Events emitted by the app:

| Event | What it means | What it does not prove |
| --- | --- | --- |
| `booking_search` | A valid route/duration search was submitted; also emitted for valid edited searches. | Unique visitor, purchase or qualified lead. |
| `request_prepared` | The passenger prepared a reviewable request. | The team received it. |
| `whatsapp_outbound_click` | The passenger chose the WhatsApp handoff. | The passenger pressed Send in WhatsApp. |
| `email_outbound_click` | The passenger chose the email handoff. | An email was sent or delivered. |

Hooks dispatch as `agadir:conversion` CustomEvents and push into an **existing** `window.dataLayer` when present. No analytics account, script, cookie, database or collector is installed. No contact details, addresses, message bodies or URL queries enter these event payloads. Analytics receipt and campaign attribution must be configured and verified separately before reporting rates.

Measure genuine business outcomes using the team's actual received messages and booking confirmations. For a reliable website conversion rate, add a non-personal reference that joins a request to a received lead and confirmed booking in an approved operational workflow; that workflow is not implemented here.

## Follow-up plan

1. After publication, verify the same route on the live domain at desktop and mobile widths; check both outbound message bodies without sending a fake enquiry.
2. Verify analytics receives the four intent events once per intended action; do not turn a WhatsApp click into a `purchase` or confirmed-booking event.
3. Record genuine received enquiries, confirmed rides, cancellations, payment outcomes and first-response times for at least two comparable weeks. Exclude staff and QA activity. Compare visitor cohorts by device, language and traffic source only where attribution is valid.
4. Primary business metric: confirmed rides / eligible website sessions. Supporting metric: genuine received enquiries / eligible sessions. Funnel diagnostics: sessions reaching vehicle comparison and request preparation. Guardrails: wrong-route enquiries, incomplete pickup details, customer confusion, cancellations and fare misunderstandings.
5. Test optional contact details against the previous required-contact flow only if sufficient traffic supports a properly sized experiment. Agree minimum meaningful change and sample size from the measured baseline; do not declare a winner from a handful of enquiries.
6. Ask the operator to verify waiting/cancellation terms, response hours, exact pickup instructions, child-seat availability and the source of supplied testimonials. Add stronger operational promises only when confirmed.

## Boundaries and remaining limits

- Prices, tariff calculations, discounts, fleet capacities and business contact destinations were preserved.
- No claim of instant confirmation, free cancellation, unlimited waiting, guaranteed availability, 24/7 support or independently verified ratings was added.
- Existing testimonials remain attributed to the business. No new reviews or external review totals were invented.
- No payment gateway, booking database, server email delivery or CRM was added. A customer must send the request in their chosen app and receive team confirmation.
- The email alternative needs an email application configured on the customer's device; the existing telephone and support-email links remain available.
- A click-through was completed only as far as the prepared request. Message delivery, operator response and fulfilment were not tested.
- A ranking cannot be guaranteed and was outside this conversion-only brief.

## Checks

- TypeScript type check passed.
- 17 booking, tariff, route and conversion regression checks passed.
- Production build passed; bundled server rendered homepage, reservation and checkout and handled the routing API smoke check.
- 21st deterministic review: six components/routes reviewed, zero errors, warnings or suggestions. Catalog search required authentication, so existing project components and brand tokens were reused.
- Browser QA: English airport/hotel selection, price comparison, unchanged EUR 30 sample route, name-only request preparation, complete email link, desktop airport landing page, English small-phone CTA visibility, French copy and 320px overflow check. Final publication status is reported in the chat/PR, not inferred from a local build.
