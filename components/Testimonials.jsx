'use client'
import { useState } from 'react'

const testimonials = [
  { name: 'Sarah Johnson', location: 'United Kingdom', text: 'Excellent service! The driver was waiting for us at the airport despite our flight being delayed.', rating: 5 },
  { name: 'Mohammed Al-Rashid', location: 'Saudi Arabia', text: 'Best taxi service in Agadir. Always on time, very polite drivers, and great prices.', rating: 5 },
  { name: 'Emma Dubois', location: 'France', text: 'The city tour was amazing! Highly recommended for tourists.', rating: 5 },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by travelers from around the world</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[var(--light-bg)] rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i} className="text-[var(--secondary)] text-2xl">★</span>
              ))}
            </div>
            <p className="text-lg md:text-xl text-[var(--text-dark)] mb-8 leading-relaxed italic">
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {testimonials[activeIndex].name[0]}
              </div>
              <div>
                <div className="font-bold text-[var(--dark-bg)]">{testimonials[activeIndex].name}</div>
                <div className="text-sm text-[var(--text-muted)]">{testimonials[activeIndex].location}</div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[var(--primary)] w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
