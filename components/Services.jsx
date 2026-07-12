const services = [
  { icon: '✈️', title: 'Airport Transfer', desc: 'Hassle-free pickup and drop-off at Agadir-Al Massira Airport.', features: ['Flight tracking', 'Meet & greet'], price: 'From 150 MAD' },
  { icon: '🏙️', title: 'City Tours', desc: 'Explore Agadir with a local expert driver.', features: ['Custom routes', 'Local guide'], price: 'From 200 MAD' },
  { icon: '🚗', title: 'Private Rides', desc: 'On-demand transportation for any occasion.', features: ['Instant booking', 'Clean vehicles'], price: 'From 80 MAD' },
  { icon: '🏖️', title: 'Beach Transfers', desc: 'Comfortable rides to Taghazout and Tamraght.', features: ['Surfboard space', 'Group options'], price: 'From 120 MAD' },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Premium Services</h2>
          <p className="section-subtitle">Professional transportation solutions tailored to your needs</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card group hover:border-[var(--primary)] border-2 border-transparent">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-[var(--dark-bg)] mb-3">{service.title}</h3>
              <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{service.desc}</p>
              <div className="text-lg font-bold text-[var(--primary)] mb-4">{service.price}</div>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--secondary)]">✦</span>{feature}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/212600000000?text=${encodeURIComponent('Hi AgadirDriver.com, I am interested in ' + service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block text-sm"
              >
                Book via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
