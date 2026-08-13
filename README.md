# Royal Ride Redesign

I'm redesigning my chauffeur/transfer booking website (agadirdriver.com) to match 

the visual quality and UX patterns of Uber.com and Transfeero.com. I'm uploading 

the full codebase — please redesign it in place, keeping all existing content, 

copy (French), functionality, and data (services, fleet classes, destinations, 

testimonials) exactly as they are. This is a visual/UX redesign, not a rewrite 

of the business logic or text.

DESIGN DIRECTION (Uber + Transfeero hybrid):

- Clean, confident, minimal — lots of whitespace, no clutter

- Bold, oversized sans-serif headlines (Uber-style: tight tracking, high contrast)

- Primary palette: black/near-black + white, with ONE accent color used sparingly 

  for CTAs and highlights (pick a premium accent — deep gold, emerald, or electric 

  blue — something that fits a "premium Morocco chauffeur" brand, not generic teal)

- Generous padding/margins between sections (80-120px vertical rhythm on desktop)

- Cards with soft shadows, subtle borders, rounded corners (8-12px radius), and 

  a gentle lift/scale on hover

- Sticky, prominent booking widget — should feel like the hero of the page, 

  similar to Uber's ride request box: floating card with soft shadow, clear 

  From/To inputs, big legible CTA button

- Real, high-quality photography — no stock-photo feel. Full-bleed hero image 

  with a dark gradient overlay so white text stays legible

- Typography hierarchy: one distinct display font weight for H1/H2, clean body 

  font (Inter, Söhne, or similar) for everything else

- Icons: simple line icons, consistent stroke weight, not mismatched icon packs

- Fleet/vehicle class cards: image-forward, minimal text, price emphasized, 

  clear "Choisir" CTA — similar to how Uber displays ride tiers (UberX, 

  Comfort, Black) side by side

- Testimonials: clean quote cards, star ratings prominent, avoid clutter

- Destinations grid: image cards with hover zoom effect and location pin overlay

- Footer: organized into clear columns, muted colors, no visual noise

- Smooth micro-interactions: hover states, button press feedback, subtle 

  scroll-triggered fade-ins (nothing flashy or slow)

- Fully responsive — mobile-first, with the booking widget adapting to a 

  full-width stacked layout on small screens

TECHNICAL REQUIREMENTS:

- Preserve all current routes, components, and functional logic

- Keep the booking form fields, validation, and behavior identical unless 

  restyling requires structural changes

- Use CSS custom properties (variables) for the new color palette and spacing 

  scale so the theme is easy to adjust later

- Optimize for fast load — no heavy unnecessary animation libraries

- Keep accessibility in mind: sufficient color contrast, readable font sizes, 

  proper alt text on images

Please go section by section (header/nav, hero + booking widget, app promo 

section, services, "how it works," fleet classes, testimonials, destinations, 

newsletter, footer) and redesign each to match this direction, explaining 

briefly what changed and why before showing the code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf6d0eee-41cc-4ff4-a32f-c47a8b9d9cac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
