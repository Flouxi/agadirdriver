import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Plus, Minus, ArrowRight, RefreshCw } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import LocationPicker from './LocationPicker';
import { useI18n } from '../lib/i18n';

/**
 * Desktop-only horizontal booking bar (Transfeero-style single row).
 * Mobile keeps the stacked <BookingWidget /> card.
 */
export default function BookingBar() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [bookingType, setBookingType] = useState<'transfer' | 'hourly'>('transfer');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('2026-07-19');
  const [time, setTime] = useState('13:45');
  const [passengers, setPassengers] = useState(2);
  const [durationHours, setDurationHours] = useState(3);
  const [hasReturn, setHasReturn] = useState(false);
  const [returnDate, setReturnDate] = useState('2026-07-26');
  const [returnTime, setReturnTime] = useState('15:00');
  const [pickerFor, setPickerFor] = useState<null | 'from' | 'to'>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation || (bookingType === 'transfer' && !toLocation)) {
      document.getElementById('booking-bar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setPickerFor(!fromLocation ? 'from' : 'to');
      return;
    }
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      navigate({
        to: '/reservation',
        search: { from: fromLocation, to: toLocation, date, time, pax: passengers },
      } as never);
    }, 600);
  };

  return (
    <div className="w-full">
      <LocationPicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onSelect={(val) => {
          if (pickerFor === 'from') setFromLocation(val);
          else if (pickerFor === 'to') setToLocation(val);
        }}
        title={pickerFor === 'from' ? t('booking.from') : t('booking.to')}
      />

      {/* Type switch */}
      <div className="mb-4 flex justify-start">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-ink/60 p-1 backdrop-blur-md">
          {([
            ['transfer', ArrowRight, t('booking.transfer')],
            ['hourly', Clock, t('booking.hourly')],
          ] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setBookingType(key)}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all ${
                bookingType === key ? 'bg-white text-ink shadow-soft' : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <form
        id="booking-bar"
        onSubmit={handleSearch}
        className="rounded-2xl border border-line bg-surface p-2 shadow-float"
      >
        <div className="flex items-stretch">
          {/* From */}
          <button
            type="button"
            onClick={() => setPickerFor('from')}
            className="group flex min-w-0 flex-[1.25] cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-alt"
          >
            <MapPin size={18} strokeWidth={1.75} className="shrink-0 text-ink/35" />
            <span className="block min-w-0">
              <span className="block text-[12px] text-ink/45">{t('booking.from')}</span>
              <span className={`block truncate text-[15px] font-medium ${fromLocation ? 'text-ink' : 'text-ink/40'}`}>
                {fromLocation || t('booking.placeholder')}
              </span>
            </span>
          </button>

          <span aria-hidden className="my-2 w-px shrink-0 bg-line" />

          {/* To or duration */}
          {bookingType === 'transfer' ? (
            <button
              type="button"
              onClick={() => setPickerFor('to')}
              className="group flex min-w-0 flex-[1.25] cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-alt"
            >
              <MapPin size={18} strokeWidth={1.75} className="shrink-0 text-ink/35" />
              <span className="block min-w-0">
                <span className="block text-[12px] text-ink/45">{t('booking.to')}</span>
                <span className={`block truncate text-[15px] font-medium ${toLocation ? 'text-ink' : 'text-ink/40'}`}>
                  {toLocation || t('booking.placeholder')}
                </span>
              </span>
            </button>
          ) : (
            <div className="flex min-w-0 flex-[1.25] items-center gap-3 px-4 py-3">
              <Clock size={18} strokeWidth={1.75} className="shrink-0 text-ink/35" />
              <div className="min-w-0">
                <span className="block text-[12px] text-ink/45">{t('booking.duration')}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDurationHours(Math.max(2, durationHours - 1))}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-line text-ink hover:border-ink/30"
                  >
                    <Minus size={12} strokeWidth={2} />
                  </button>
                  <span className="text-[15px] font-semibold text-ink">{durationHours} h</span>
                  <button
                    type="button"
                    onClick={() => setDurationHours(Math.min(24, durationHours + 1))}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-line text-ink hover:border-ink/30"
                  >
                    <Plus size={12} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <span aria-hidden className="my-2 w-px shrink-0 bg-line" />

          {/* Date + time */}
          <div className="flex min-w-0 flex-[1.35] items-center gap-3 px-4 py-3">
            <Calendar size={18} strokeWidth={1.75} className="shrink-0 text-ink/35" />
            <div className="min-w-0">
              <span className="block text-[12px] text-ink/45">{t('booking.date')}</span>
              <div className="flex items-center gap-1">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-[116px] cursor-pointer bg-transparent text-[14px] font-medium text-ink focus:outline-none"
                  required
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-[96px] cursor-pointer bg-transparent text-[14px] font-medium text-ink focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <span aria-hidden className="my-2 w-px shrink-0 bg-line" />

          {/* Return */}
          {bookingType === 'transfer' && (
            <>
              <button
                type="button"
                onClick={() => setHasReturn(!hasReturn)}
                className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-[14px] font-semibold transition-colors ${
                  hasReturn ? 'text-ink' : 'text-ink/60 hover:bg-surface-alt hover:text-ink'
                }`}
              >
                {hasReturn ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                <span className="whitespace-nowrap">{t('booking.addReturn')}</span>
              </button>
              <span aria-hidden className="my-2 w-px shrink-0 bg-line" />
            </>
          )}

          {/* Passengers */}
          <div className="flex shrink-0 items-center gap-3 px-4 py-3">
            <div>
              <span className="block text-[12px] text-ink/45">{t('booking.passengers')}</span>
              <div className="mt-0.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-all hover:border-ink/30 active:scale-95"
                  aria-label="-"
                >
                  <Minus size={13} strokeWidth={2} />
                </button>
                <span className="w-4 text-center text-[15px] font-semibold text-ink">{passengers}</span>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(16, passengers + 1))}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-all hover:border-ink/30 active:scale-95"
                  aria-label="+"
                >
                  <Plus size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={searching}
            className="ml-1 flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink px-8 text-[15px] font-semibold text-white transition-all hover:bg-ink-soft active:scale-[0.99] disabled:opacity-50"
          >
            {searching ? (
              <RefreshCw className="animate-spin" size={18} strokeWidth={1.75} />
            ) : (
              <>
                <span className="whitespace-nowrap">{t('booking.seePrices')}</span>
                <ArrowRight size={18} strokeWidth={2} />
              </>
            )}
          </button>
        </div>

        {/* Return row */}
        {bookingType === 'transfer' && hasReturn && (
          <div className="mt-1 flex items-center gap-6 border-t border-line px-4 py-3">
            <span className="text-[12px] font-semibold text-ink/55">Retour planifié (-10%)</span>
            <div className="flex items-center gap-3">
              <Calendar size={16} strokeWidth={1.75} className="text-ink/35" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="cursor-pointer bg-transparent text-[14px] font-medium text-ink focus:outline-none"
              />
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="cursor-pointer bg-transparent text-[14px] font-medium text-ink focus:outline-none"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
