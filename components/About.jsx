export default function About() {
  return (
    <section id="about" className="py-20 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-[var(--dark-bg)] flex items-center justify-center">
              <div className="text-center text-white/60">
                <p className="text-lg">Your fleet photo here</p>
                <p className="text-sm">Replace /about-image.jpg</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">500+</div>
              <div className="font-semibold">Happy Customers</div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Why Choose AgadirDriver.com?</h2>
            <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">
              With years of experience serving visitors and locals in Agadir, we combine comfort, reliability, and local expertise.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Professional Drivers', desc: 'Licensed and courteous drivers who know Agadir inside out.' },
                { title: 'Modern Fleet', desc: 'Well-maintained, air-conditioned vehicles with WiFi and GPS.' },
                { title: 'Best Rates', desc: 'Transparent pricing with no hidden fees.' },
                { title: '24/7 Support', desc: 'Round-the-clock customer service via WhatsApp and phone.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--primary)] text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--dark-bg)]">{item.title}</h4>
                    <p className="text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
