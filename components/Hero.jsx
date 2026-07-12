export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline poster="/hero-poster.jpg" className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark-bg)]/90 via-[var(--dark-bg)]/70 to-[var(--dark-bg)]/50 z-10" />
      </div>
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="inline-block bg-[var(--secondary)]/20 backdrop-blur-sm text-[var(--secondary)] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Premium Taxi Service in Agadir
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Your Trusted <span className="text-[var(--secondary)]">Agadir</span> Driver
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl">
            Reliable airport transfers, city tours, and private rides across Agadir. Book online or via WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
              Book via WhatsApp
            </a>
            <a href="#book" className="btn-secondary">Book Online</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--light-bg)] to-transparent z-10" />
    </section>
  )
}
