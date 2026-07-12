'use client'
import { useState } from 'react'

const vehicleTypes = [
  { id: 'standard', name: 'Standard Sedan', capacity: 3, pricePerKm: 8 },
  { id: 'comfort', name: 'Comfort SUV', capacity: 5, pricePerKm: 12 },
  { id: 'van', name: 'Minivan', capacity: 7, pricePerKm: 15 },
  { id: 'premium', name: 'Premium', capacity: 3, pricePerKm: 18 },
]

const locations = [
  'Agadir Airport (AGA)', 'Agadir City Center', 'Taghazout', 'Tamraght',
  'Aourir', 'Imlil', 'Taroudant', 'Essaouira', 'Marrakech',
]

export default function BookingWidget() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [vehicle, setVehicle] = useState('standard')
  const [estimatedPrice, setEstimatedPrice] = useState(null)

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return
    const baseDistance = 15
    const selectedVehicle = vehicleTypes.find(v => v.id === vehicle)
    const price = baseDistance * selectedVehicle.pricePerKm
    setEstimatedPrice({
      base: price,
      vehicle: selectedVehicle.name,
      distance: `${baseDistance} km`,
      total: Math.max(price, 80),
    })
  }

  const handleWhatsAppBooking = () => {
    const selected = vehicleTypes.find(v => v.id === vehicle)
    const message = `Hi AgadirDriver.com, I would like to book a ride. Pickup: ${pickup}. Drop-off: ${dropoff}. Date: ${date}. Passengers: ${passengers}. Vehicle: ${selected.name}.${estimatedPrice ? ` Estimated price: ${estimatedPrice.total} MAD.` : ''}`
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="book" className="py-20 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Book Your Ride</h2>
          <p className="section-subtitle">Fixed prices, no surprises. Get your instant estimate below.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-[var(--dark-bg)] mb-2">Pickup Location</label>
                <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--primary)] outline-none bg-white">
                  <option value="">Select pickup</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--dark-bg)] mb-2">Drop-off Location</label>
                <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--primary)] outline-none bg-white">
                  <option value="">Select drop-off</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--dark-bg)] mb-2">Date &amp; Time</label>
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--primary)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--dark-bg)] mb-2">Passengers</label>
                <input type="number" min="1" max="7" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--primary)] outline-none" />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-[var(--dark-bg)] mb-4">Vehicle Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicleTypes.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setVehicle(v.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${vehicle === v.id ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-gray-200 hover:border-[var(--secondary)]'}`}
                  >
                    <div className="font-semibold text-sm text-[var(--dark-bg)]">{v.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">Up to {v.capacity} pax</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculateEstimate} disabled={!pickup || !dropoff} className="btn-secondary w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed">
              Get Price Estimate
            </button>

            {estimatedPrice && (
              <div className="bg-[var(--light-bg)] rounded-xl p-6 mb-6">
                <h4 className="font-bold text-[var(--dark-bg)] mb-4">Price Estimate</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[var(--text-muted)]">Vehicle</span><span className="font-semibold">{estimatedPrice.vehicle}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)]">Estimated Distance</span><span className="font-semibold">{estimatedPrice.distance}</span></div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg"><span className="font-bold text-[var(--dark-bg)]">Total</span><span className="font-bold text-[var(--primary)]">{estimatedPrice.total} MAD</span></div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={handleWhatsAppBooking} disabled={!pickup || !dropoff || !date} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              Confirm Booking via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
