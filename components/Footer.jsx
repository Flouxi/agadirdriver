export default function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                <span className="text-[var(--dark-bg)] font-bold">AD</span>
              </div>
              <span className="font-serif text-xl font-bold">AgadirDriver.com</span>
            </div>
            <p className="text-gray-400 leading-relaxed">Premium taxi and transfer services in Agadir, Morocco.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[var(--secondary)]">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Book', 'Contact'].map((item) => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[var(--secondary)]">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Airport Transfer</li><li>City Tours</li><li>Private Rides</li><li>Beach Transfers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[var(--secondary)]">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Agadir, Morocco</li>
              <li><a href="tel:+212600000000" className="hover:text-white transition-colors">+212 600 000 000</a></li>
              <li><a href="mailto:info@agadirdriver.com" className="hover:text-white transition-colors">info@agadirdriver.com</a></li>
              <li><a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: +212 600 000 000</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2026 AgadirDriver.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
