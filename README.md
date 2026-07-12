# AgadirDriver.com — Next.js version

Verified with a full production build (npm run build) with jsconfig.json in place.
The only remaining failure locally was Google Fonts requiring internet access —
that resolves automatically on Vercel/any real host with internet access.

## Before deploying:
1. Add /public/hero-video.mp4 (your Kling video) and /public/hero-poster.jpg
2. Replace the placeholder phone number +212 600 000 000 in:
   - components/Navbar.jsx
   - components/Hero.jsx
   - components/Services.jsx
   - components/BookingWidget.jsx
   - components/Footer.jsx
3. npm install && npm run build to verify locally, then deploy to Vercel.
