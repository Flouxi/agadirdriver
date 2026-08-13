import appMockup from '../assets/app-mockup-v2.png.asset.json';

/* Procedural "city map" backdrop — grid streets + faint blocks + a route line */
function MapBackdrop() {
  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const hLines = Array.from({ length: 40 }, (_, i) => -320 + i * 33 + Math.round(rand(i) * 8));
  const vLines = Array.from({ length: 40 }, (_, i) => -440 + i * 58 + Math.round(rand(i + 99) * 12));

  const blocks = Array.from({ length: 150 }, (_, i) => {
    const x = -300 + Math.round(rand(i * 3.1) * 1700);
    const y = -200 + Math.round(rand(i * 7.7) * 900);
    const w = 20 + Math.round(rand(i * 5.3) * 45);
    const h = 18 + Math.round(rand(i * 2.9) * 30);
    return { x, y, w, h };
  });

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1400 620"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="adMapFade" cx="50%" cy="48%" r="74%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="58%" stopColor="#fff" stopOpacity=".9" />
          <stop offset="88%" stopColor="#fff" stopOpacity=".25" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="adMapMask">
          <rect width="1400" height="620" fill="url(#adMapFade)" />
        </mask>
        <linearGradient id="adMapFadeX" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="26%" stopColor="#fff" stopOpacity="1" />
          <stop offset="74%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="adMapMaskX">
          <rect width="1400" height="620" fill="url(#adMapFadeX)" />
        </mask>
      </defs>

      <g mask="url(#adMapMask)">
        <g mask="url(#adMapMaskX)">
          <g transform="rotate(-21 700 310)">
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.9">
              {hLines.map((y) => (
                <path key={`h${y}`} d={`M-460 ${y} H1860`} />
              ))}
            </g>
            <g stroke="rgba(255,255,255,0.15)" strokeWidth="1.25">
              {vLines.map((x) => (
                <path key={`v${x}`} d={`M${x} -340 V980`} />
              ))}
            </g>
            <g stroke="rgba(255,255,255,0.21)" strokeWidth="2.1">
              <path d="M-180 -340 V980" />
              <path d="M232 -340 V980" />
              <path d="M700 -340 V980" />
              <path d="M1128 -340 V980" />
              <path d="M1560 -340 V980" />
              <path d="M-460 -40 H1860" />
              <path d="M-460 310 H1860" />
              <path d="M-460 660 H1860" />
            </g>
            <g fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth=".75">
              {blocks.map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} />
              ))}
            </g>

            <path
              d="M232 545 L232 470 L468 470 L468 400 L586 400 L586 310 L700 310"
              stroke="rgba(249,175,0,.92)"
              strokeWidth="3.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="232" cy="545" r="4.6" fill="rgba(249,175,0,.85)" />
          </g>

          <circle cx="700" cy="310" r="20" fill="rgba(249,175,0,.12)" />
          <circle cx="700" cy="310" r="12" fill="rgba(249,175,0,.26)" />
          <circle cx="700" cy="310" r="6.5" fill="#f9b442" stroke="#0a0a0a" strokeWidth="2.2" />
        </g>
      </g>
    </svg>
  );
}

export default function AppPromo() {
  return (
    <section id="app-download" className="shell relative pb-10 pt-12 sm:pt-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-neutral-950 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <MapBackdrop />
        </div>

        <div className="relative grid items-end gap-6 px-6 sm:px-10 md:grid-cols-2 md:gap-10 lg:px-20">
          <div className="order-1 flex flex-col items-center pt-12 text-center md:order-1 md:items-start md:py-16 md:text-left">
            <h2 className="text-pretty text-4xl leading-tight font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Prenez la route sereinement&nbsp;!
            </h2>
            <p className="mt-4 max-w-xl text-neutral-300 md:text-lg">
              Réservez, suivez votre chauffeur, modifiez la date et l’heure ou annulez vos trajets.
            </p>

            <div className="order-3 mt-10 hidden flex-wrap items-center gap-5 md:flex">
              <figure className="flex flex-col items-center gap-2">
                <img
                  src="/app-qr.svg"
                  alt="QR code — télécharger l'application Agadir Driver"
                  loading="lazy"
                  className="h-36 w-36 rounded-lg border border-white/10 bg-white/5 object-contain p-1 sm:h-44 sm:w-44"
                />
                <figcaption className="text-xs text-neutral-400">
                  Télécharger l’application
                </figcaption>
              </figure>

              <div className="flex flex-col items-center gap-3">
                <a
                  href="#"
                  className="rounded-md transition hover:opacity-85"
                  title="Télécharger sur l'App Store"
                >
                  <span className="sr-only">Télécharger sur l'App Store</span>
                  <img src="/apple-store.svg" alt="" loading="lazy" className="h-12 w-auto" />
                </a>
                <a
                  href="#"
                  className="rounded-md transition hover:opacity-85"
                  title="Télécharger sur Google Play"
                >
                  <span className="sr-only">Télécharger sur Google Play</span>
                  <img src="/play-store.svg" alt="" loading="lazy" className="h-12 w-auto" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative order-2 flex items-end justify-center md:justify-end">
            <div className="relative w-[260px] pt-8 sm:w-[320px] md:w-[280px] md:pt-0 lg:w-[500px]">
              <img
                src={appMockup.url}
                alt="Application Agadir Driver sur smartphone"
                loading="lazy"
                className="w-full object-contain"
              />
            </div>
          </div>

          {/* Mobile: QR + store badges stacked, centered */}
          <div className="order-3 flex flex-col items-center gap-3 pb-12 md:hidden">
            <img
              src="/app-qr.svg"
              alt="QR code — télécharger l'application Agadir Driver"
              loading="lazy"
              className="h-44 w-44 rounded-lg bg-white object-contain p-2"
            />
            <p className="text-sm text-neutral-400">Télécharger l’application</p>
            <div className="flex flex-col items-center gap-3">
              <a href="#" className="block transition hover:opacity-85" title="App Store">
                <span className="sr-only">Télécharger sur l'App Store</span>
                <img
                  src="/apple-store.svg"
                  alt=""
                  loading="lazy"
                  className="block h-12 w-auto"
                />
              </a>
              <a href="#" className="block transition hover:opacity-85" title="Google Play">
                <span className="sr-only">Télécharger sur Google Play</span>
                <img src="/play-store.svg" alt="" loading="lazy" className="block h-12 w-auto" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
