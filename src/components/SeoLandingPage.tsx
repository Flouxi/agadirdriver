import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { BUSINESS, SERVICE_PAGES, type ServicePage } from "../data/seo";

export default function SeoLandingPage({ page, path }: { page: ServicePage; path: keyof typeof SERVICE_PAGES }) {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <section className="bg-ink px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-sm text-white/60 transition hover:text-white">← Back to AgadirDriver.com</Link>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">AgadirDriver.com · {page.service}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">{page.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{page.intro}</p>
          <a href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi AgadirDriver.com, I would like to book ${page.service}.`)}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-ink transition hover:brightness-110"><MessageCircle size={18} /> Book via WhatsApp</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_0.8fr] lg:py-24">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">What this service includes</h2>
          <p className="mt-4 leading-8 text-ink/70">Your driver collects the journey details, confirms the route and pickup information, and helps you plan a straightforward ride between Agadir, the airport, and nearby destinations.</p>
          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Booking process</h2>
          <ol className="mt-5 space-y-4 text-ink/75">
            {['Send your pickup and destination details on WhatsApp.', 'Include your date, time, passengers, luggage, and flight number when relevant.', 'Receive the current route information and confirm the booking directly.'].map((step, index) => <li key={step} className="flex gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">{index + 1}</span><span>{step}</span></li>)}
          </ol>
          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Vehicles and capacity</h2>
          <p className="mt-4 leading-8 text-ink/70">Tell us how many people are travelling and how much luggage you have so the appropriate vehicle can be arranged for your journey.</p>
          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">What to mention when booking</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">{['Passenger count', 'Luggage and surfboards', 'Flight number and arrival time', 'Hotel or accommodation address'].map((item) => <li key={item} className="flex items-center gap-2 text-ink/75"><Check size={17} className="text-accent" />{item}</li>)}</ul>
        </div>
        <aside className="h-fit rounded-3xl bg-ink p-7 text-white shadow-xl lg:sticky lg:top-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Need a ride?</p>
          <h2 className="mt-3 text-2xl font-bold">Ask for your route</h2>
          <p className="mt-3 text-sm leading-7 text-white/65">Send your travel details and receive booking guidance for {page.service.toLowerCase()}.</p>
          <a href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi AgadirDriver.com, I would like to book ${page.service}.`)}`} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-center font-semibold text-ink"><MessageCircle size={17} /> WhatsApp {BUSINESS.phone}</a>
          <div className="mt-7 border-t border-white/10 pt-6"><p className="text-xs uppercase tracking-wider text-white/45">Also available</p><div className="mt-3 space-y-2">{Object.entries(SERVICE_PAGES).filter(([url]) => url !== path).slice(0, 4).map(([url, related]) => <Link key={url} to={url as any} className="flex items-center justify-between text-sm text-white/75 hover:text-accent"><span>{related.service}</span><ArrowRight size={15} /></Link>)}</div></div>
        </aside>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20"><div className="mx-auto max-w-5xl"><h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{[['How do I book?', 'Send your route, date, time, passenger count, and accommodation details on WhatsApp.'], ['Can I request an airport pickup?', 'Yes. Include your flight number and arrival time so the pickup can be planned around your journey.'], ['Can I travel to Taghazout or Tamraght?', 'Yes. These are common routes from Agadir and Agadir Al Massira Airport.'], ['What if I have surfboards or extra luggage?', 'Mention all luggage and equipment when you request the booking so the suitable vehicle can be considered.']].map(([question, answer]) => <div key={question} className="rounded-2xl border border-ink/10 p-5"><h3 className="font-semibold">{question}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{answer}</p></div>)}</div></div></section>
    </main>
  );
}
