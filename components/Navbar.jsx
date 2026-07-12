'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Book', href: '#book' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center">
              <span className="text-[var(--dark-bg)] font-bold text-lg">AD</span>
            </div>
            <span className={`font-serif text-xl font-bold ${scrolled ? 'text-[var(--dark-bg)]' : 'text-white'}`}>
              AgadirDriver.com
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${scrolled ? 'text-[var(--text-dark)] hover:text-[var(--primary)]' : 'text-white/80 hover:text-white'}`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://wa.me/212600000000?text=Hi%20AgadirDriver.com%2C%20I%27d%20like%20to%20book%20a%20ride"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm flex items-center gap-2"
            >
              WhatsApp
            </a>
          </div>

          <button className="md:hidden relative w-8 h-8" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <div className={`absolute top-2 left-0 w-full h-0.5 transition-all duration-300 ${scrolled ? 'bg-[var(--text-dark)]' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`absolute top-4 left-0 w-full h-0.5 transition-all duration-300 ${scrolled ? 'bg-[var(--text-dark)]' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`absolute top-6 left-0 w-full h-0.5 transition-all duration-300 ${scrolled ? 'bg-[var(--text-dark)]' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-[var(--text-dark)] hover:text-[var(--primary)] font-medium border-b border-gray-100 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://wa.me/212600000000?text=Hi%20AgadirDriver.com%2C%20I%27d%20like%20to%20book%20a%20ride"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
